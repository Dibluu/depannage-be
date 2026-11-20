#!/usr/bin/env python3
"""Weekly SEO snapshot from DataForSEO for one client site (stdlib only).

Usage:
  python3 scripts/seo/dataforseo_weekly.py kiverrou          # full run
  python3 scripts/seo/dataforseo_weekly.py kiverrou --dry    # print the plan and the estimated cost, no API call

Reads  seo/clients/<client>/config.json
Writes seo/clients/<client>/data/<YYYY-MM-DD>.json   (snapshot, compared with the previous one next week)
       seo/clients/<client>/rapports/<YYYY-MM-DD>.md  (readable report the agent analyses)

Credentials: DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD. In a Claude cloud session the proxy injects
the real credentials, so the defaults ("proxy-injected") are enough there.
"""
import base64
import datetime as dt
import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

API = "https://api.dataforseo.com/v3"
ROOT = Path(__file__).resolve().parents[2]
COST = {"total": 0.0}


# ---------------------------------------------------------------- API helpers
def _auth():
    login = os.environ.get("DATAFORSEO_LOGIN") or "proxy-injected"
    pwd = os.environ.get("DATAFORSEO_PASSWORD") or "proxy-injected"
    return "Basic " + base64.b64encode(f"{login}:{pwd}".encode()).decode()


def call(path, task=None):
    """One task per call (Labs and SERP live endpoints accept only one). Returns result[0] or None."""
    data = json.dumps([task]).encode() if task is not None else None
    req = urllib.request.Request(f"{API}/{path}", data=data, method="POST" if data else "GET",
                                 headers={"Authorization": _auth(), "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            body = json.load(r)
    except urllib.error.HTTPError as e:
        print(f"  ! {path}: HTTP {e.code}", file=sys.stderr)
        return None
    except Exception as e:  # network error: keep the rest of the run going
        print(f"  ! {path}: {e}", file=sys.stderr)
        return None
    COST["total"] += body.get("cost") or 0
    t = (body.get("tasks") or [{}])[0]
    if t.get("status_code") != 20000:
        print(f"  ! {path}: {t.get('status_code')} {t.get('status_message')}", file=sys.stderr)
        return None
    return (t.get("result") or [None])[0]


def check_budget(limit):
    if COST["total"] > limit:
        sys.exit(f"Budget dépassé ({COST['total']:.3f} $ > {limit} $) — arrêt.")


# ---------------------------------------------------------------- collectors
def overview(cfg):
    out = {}
    for lang in cfg["labs_languages"]:
        r = call("dataforseo_labs/google/domain_rank_overview/live",
                 {"target": cfg["domain"], "location_code": cfg["labs_location_code"], "language_code": lang})
        items = (r or {}).get("items") or []
        out[lang] = items[0]["metrics"]["organic"] if items else None
    return out


def ranked_keywords(domain, cfg, limit):
    """Merged over the Labs languages, best position kept per keyword."""
    best = {}
    for lang in cfg["labs_languages"]:
        r = call("dataforseo_labs/google/ranked_keywords/live",
                 {"target": domain, "location_code": cfg["labs_location_code"], "language_code": lang,
                  "limit": limit, "order_by": ["keyword_data.keyword_info.search_volume,desc"]})
        for it in (r or {}).get("items") or []:
            kd, s = it["keyword_data"], it["ranked_serp_element"]["serp_item"]
            kw = kd["keyword"]
            row = {"keyword": kw, "volume": (kd.get("keyword_info") or {}).get("search_volume") or 0,
                   "position": s.get("rank_group"), "url": s.get("relative_url") or s.get("url"),
                   "etv": round(s.get("etv") or 0, 2),
                   "intent": ((kd.get("search_intent_info") or {}).get("main_intent"))}
            if kw not in best or (row["position"] or 999) < (best[kw]["position"] or 999):
                best[kw] = row
    return sorted(best.values(), key=lambda r: -r["volume"])


def competitors(cfg):
    r = call("dataforseo_labs/google/competitors_domain/live",
             {"target": cfg["domain"], "location_code": cfg["labs_location_code"], "language_code": "fr",
              "limit": 20, "exclude_top_domains": True})
    out = []
    for it in (r or {}).get("items") or []:
        if it["domain"] == cfg["domain"] or it["domain"] in cfg.get("ignore_domains", []):
            continue
        org = (it.get("full_domain_metrics") or {}).get("organic") or {}
        out.append({"domain": it["domain"], "shared_keywords": it.get("intersections"),
                    "avg_position": round(it.get("avg_position") or 0, 1),
                    "etv": round(org.get("etv") or 0), "keywords": org.get("count")})
    return out


def load_locations():
    req = urllib.request.Request(f"{API}/serp/google/locations/be", headers={"Authorization": _auth()})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            res = json.load(r)["tasks"][0]["result"] or []
    except Exception as e:
        print(f"  ! locations: {e}", file=sys.stderr)
        return {}
    return {l["location_name"].split(",")[0].lower(): l["location_code"] for l in res
            if l["location_type"] in ("City", "Municipality", "Province")}


def _host(item):
    dom = item.get("domain") or ""
    if dom and "google." not in dom:
        return dom.removeprefix("www.")
    m = re.match(r"https?://([^/\s›]+)", item.get("breadcrumb") or "")
    return (m.group(1).removeprefix("www.") if m else dom)


def serp_tracking(cfg, locs):
    brand = cfg["brand_match"].lower()
    rows = []
    for t in cfg["tracked_keywords"]:
        loc = t.get("location")
        code = locs.get(loc.lower()) if isinstance(loc, str) else loc
        code = code or cfg["labs_location_code"]
        r = call("serp/google/organic/live/advanced",
                 {"keyword": t["keyword"], "location_code": code, "language_code": t.get("lang", "fr"),
                  "depth": cfg.get("serp_depth", 30)})
        if not r:
            rows.append({**t, "location_code": code, "error": True})
            continue
        organic, pack, top = None, None, []
        for it in r.get("items") or []:
            if it["type"] == "organic":
                host = _host(it)
                if len(top) < 3:
                    top.append(host)
                if organic is None and cfg["domain"] in host:
                    organic = {"position": it["rank_group"], "title": it.get("title")}
            elif it["type"] == "local_pack" and pack is None and brand in (it.get("title") or "").lower():
                pack = it["rank_group"]
        rows.append({"keyword": t["keyword"], "lang": t.get("lang", "fr"), "location": loc, "location_code": code,
                     "position": organic and organic["position"], "serp_title": organic and organic["title"],
                     "local_pack": pack, "top3": top,
                     "features": [x for x in (r.get("item_types") or []) if x != "organic"]})
    return rows


def backlinks(cfg):
    r = call("backlinks/summary/live", {"target": cfg["domain"], "include_subdomains": True})
    if not r:
        return None
    summary = {k: r.get(k) for k in ("rank", "backlinks", "referring_domains", "referring_main_domains",
                                     "backlinks_spam_score", "broken_backlinks", "broken_pages")}
    # Spam watch: links pointing to hacked/spam URLs on the client site (e.g. ?test=…html dumps).
    spam = call("backlinks/backlinks/live",
                {"target": cfg["domain"], "mode": "as_is", "limit": 100,
                 "filters": ["url_to", "like", "%?test=%"]})
    summary["spam_urls_to_test"] = (spam or {}).get("total_count")
    new = call("backlinks/referring_domains/live",
               {"target": cfg["domain"], "limit": 15, "order_by": ["first_seen,desc"]})
    summary["recent_referring_domains"] = [
        {"domain": i["domain"], "first_seen": (i.get("first_seen") or "")[:10], "rank": i.get("rank"),
         "spam_score": i.get("backlinks_spam_score")} for i in (new or {}).get("items") or []]
    return summary


def onpage(cfg, urls):
    out = []
    for u in urls:
        r = call("on_page/instant_pages", {"url": u, "enable_javascript": False})
        it = ((r or {}).get("items") or [None])[0]
        if not it:
            out.append({"url": u, "error": True})
            continue
        m = it.get("meta") or {}
        flags = [k for k, v in (it.get("checks") or {}).items() if v and k in BAD_CHECKS]
        out.append({"url": u, "status": it.get("status_code"), "score": round(it.get("onpage_score") or 0, 1),
                    "title": m.get("title"), "title_len": len(m.get("title") or ""),
                    "description": m.get("description"), "description_len": len(m.get("description") or ""),
                    "h1": (m.get("htags") or {}).get("h1"),
                    "words": (m.get("content") or {}).get("plain_text_word_count"),
                    "load_ms": (it.get("page_timing") or {}).get("duration_time"), "issues": flags})
    return out


BAD_CHECKS = {
    "no_title", "no_description", "title_too_long", "title_too_short", "no_h1_tag", "duplicate_title_tag",
    "duplicate_meta_tags", "low_content_rate", "high_loading_time", "is_broken", "is_4xx_code", "is_5xx_code",
    "is_redirect", "no_image_alt", "no_image_title", "large_page_size", "has_render_blocking_resources",
    "canonical_to_redirect", "canonical_to_broken", "is_orphan_page", "deprecated_html_tags", "no_favicon",
    "has_meta_refresh_redirect", "lorem_ipsum", "has_misspelling", "high_waiting_time",
}


# ---------------------------------------------------------------- analysis
def compare(cur, prev):
    if not prev:
        return None
    pk = {r["keyword"]: r for r in prev.get("ranked_keywords", [])}
    ck = {r["keyword"]: r for r in cur["ranked_keywords"]}
    moves = []
    for kw, r in ck.items():
        p = pk.get(kw)
        if p and p["position"] and r["position"] and p["position"] != r["position"]:
            moves.append({**r, "previous": p["position"], "delta": p["position"] - r["position"]})
    new = [r for k, r in ck.items() if k not in pk]
    lost = [r for k, r in pk.items() if k not in ck]
    ps = {(r["keyword"], r.get("location_code")): r for r in prev.get("serp", [])}
    serp_moves = []
    for r in cur["serp"]:
        p = ps.get((r["keyword"], r.get("location_code")))
        if p is not None:
            serp_moves.append({"keyword": r["keyword"], "location": r.get("location"),
                               "previous": p.get("position"), "position": r.get("position"),
                               "pack_previous": p.get("local_pack"), "pack": r.get("local_pack")})
    return {"previous_date": prev["date"],
            "gains": sorted([m for m in moves if m["delta"] > 0], key=lambda m: -m["delta"] * max(m["volume"], 10))[:20],
            "losses": sorted([m for m in moves if m["delta"] < 0], key=lambda m: m["delta"] * max(m["volume"], 10))[:20],
            "new": sorted(new, key=lambda r: -r["volume"])[:20],
            "lost": sorted(lost, key=lambda r: -r["volume"])[:20],
            "serp": serp_moves}


def gaps(cfg, own):
    """Keywords where a direct competitor is top 10 and the client is absent or beyond 20."""
    mine = {r["keyword"]: r["position"] for r in own}
    seen = {}
    for comp in cfg["gap_competitors"]:
        for r in ranked_keywords(comp, {**cfg, "labs_languages": ["fr"]}, cfg.get("gap_limit", 300)):
            if not r["position"] or r["position"] > 10 or r["volume"] < cfg.get("gap_min_volume", 50):
                continue
            pos = mine.get(r["keyword"])
            if pos and pos <= 20:
                continue
            g = seen.setdefault(r["keyword"], {"keyword": r["keyword"], "volume": r["volume"],
                                               "client_position": pos, "competitors": []})
            g["competitors"].append(f"{comp} #{r['position']}")
    return sorted(seen.values(), key=lambda g: (-len(g["competitors"]), -g["volume"]))[:30]


# ---------------------------------------------------------------- report
def table(rows, cols, heads=None):
    if not rows:
        return "_Aucune donnée._\n"
    heads = heads or cols
    fmt = lambda v: "—" if v in (None, "") else (", ".join(map(str, v)) if isinstance(v, list) else str(v).replace("|", "/"))
    return ("| " + " | ".join(heads) + " |\n|" + "---|" * len(cols) + "\n"
            + "".join("| " + " | ".join(fmt(r.get(c)) for c in cols) + " |\n" for r in rows))


def bucket(rk):
    b = {"top3": 0, "4-10": 0, "11-20": 0, "21-50": 0, "50+": 0}
    for r in rk:
        p = r["position"] or 999
        b["top3" if p <= 3 else "4-10" if p <= 10 else "11-20" if p <= 20 else "21-50" if p <= 50 else "50+"] += 1
    return b


def report(s, prev):
    rk, cmp_ = s["ranked_keywords"], s["comparison"]
    etv = round(sum(r["etv"] for r in rk), 1)
    petv = round(sum(r["etv"] for r in prev["ranked_keywords"]), 1) if prev else None
    b, pb = bucket(rk), bucket(prev["ranked_keywords"]) if prev else None
    bl, pbl = s.get("backlinks") or {}, (prev or {}).get("backlinks") or {}
    goal = s["config"].get("objectif") or {}

    def d(a, b_):
        return "" if b_ is None or a is None else f" ({a - b_:+})" if isinstance(a, int) else f" ({a - b_:+.1f})"

    md = [f"# Revue SEO hebdo — {s['config']['domain']} — {s['date']}\n",
          f"Source : DataForSEO (Labs Belgique fr+nl, SERP live, Backlinks, On-Page). "
          f"Comparé à : {cmp_['previous_date'] if cmp_ else '— (premier relevé)'}. Coût API : {s['cost_usd']} $.\n",
          "## Vue globale\n",
          "| Indicateur | Cette semaine | Évolution |\n|---|---|---|",
          f"| Trafic organique estimé (ETV / mois) | {etv} | {d(etv, petv)} |",
          f"| Mots-clés positionnés | {len(rk)} | {d(len(rk), len(prev['ranked_keywords']) if prev else None)} |"]
    for k in b:
        md.append(f"| Mots-clés {k} | {b[k]} | {d(b[k], pb[k] if pb else None)} |")
    for k, lab in (("referring_domains", "Domaines référents"), ("backlinks", "Backlinks"),
                   ("rank", "Rank DataForSEO"), ("backlinks_spam_score", "Spam score backlinks"),
                   ("spam_urls_to_test", "Liens spam vers ?test=")):
        if k in bl:
            md.append(f"| {lab} | {bl[k]} | {d(bl[k], pbl.get(k)) if isinstance(bl[k], int) and isinstance(pbl.get(k), int) else ''} |")
    if goal:
        md.append(f"\n**Objectif : {goal.get('label')}**")
    md.append("\n## Suivi des mots-clés prioritaires (SERP live, géolocalisé)\n")
    sp = {(m["keyword"], m["location"]): m for m in (cmp_ or {}).get("serp", [])}
    rows = []
    for r in s["serp"]:
        m = sp.get((r["keyword"], r.get("location")))
        evo = ""
        if m and m["previous"] and r["position"]:
            evo = f"{m['previous'] - r['position']:+}"
        elif m and r["position"] and not m["previous"]:
            evo = "entrée"
        elif m and m["previous"] and not r["position"]:
            evo = "sortie"
        rows.append({**r, "evo": evo, "pos": r["position"] or "> " + str(s["config"].get("serp_depth", 30))})
    md.append(table(rows, ["keyword", "location", "pos", "evo", "local_pack", "top3", "features"],
                    ["Mot-clé", "Lieu", "Position", "Évol.", "Local pack", "Top 3", "Éléments SERP"]))
    if cmp_:
        md += ["\n## Plus fortes progressions\n", table(cmp_["gains"], ["keyword", "volume", "previous", "position", "url"]),
               "\n## Plus fortes baisses\n", table(cmp_["losses"], ["keyword", "volume", "previous", "position", "url"]),
               "\n## Nouveaux mots-clés\n", table(cmp_["new"][:12], ["keyword", "volume", "position", "url"]),
               "\n## Mots-clés perdus\n", table(cmp_["lost"][:12], ["keyword", "volume", "position", "url"])]
    opp = sorted([r for r in rk if r["position"] and 4 <= r["position"] <= 20 and r["volume"] >= 70],
                 key=lambda r: -r["volume"])[:20]
    md += ["\n## Opportunités de rang (positions 4-20, volume ≥ 70)\n",
           table(opp, ["keyword", "volume", "position", "url", "intent"]),
           "\n## Écarts concurrents (concurrent top 10, client absent ou > 20)\n",
           table(s["gaps"], ["keyword", "volume", "client_position", "competitors"]),
           "\n## Concurrents organiques\n",
           table(s["competitors"][:12], ["domain", "shared_keywords", "avg_position", "etv", "keywords"]),
           "\n## Audit on-page (pages clés)\n",
           table(s["onpage"], ["url", "status", "score", "title_len", "description_len", "words", "load_ms", "issues"]),
           "\n## Backlinks — domaines référents récents\n",
           table(bl.get("recent_referring_domains") or [], ["domain", "first_seen", "rank", "spam_score"])]
    return "\n".join(md) + "\n"


# ---------------------------------------------------------------- main
def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args:
        sys.exit("Usage: dataforseo_weekly.py <client> [--dry]")
    client = args[0]
    base = ROOT / "seo" / "clients" / client
    cfg = json.loads((base / "config.json").read_text(encoding="utf-8"))
    today = dt.date.today().isoformat()

    n_serp = len(cfg["tracked_keywords"])
    est = 0.012 * 2 + 0.03 * 2 + 0.014 + 0.01 * n_serp + 0.03 * len(cfg["gap_competitors"]) + 0.1 + 0.0002 * 15
    print(f"{client}: {n_serp} mots-clés suivis, {len(cfg['gap_competitors'])} concurrents, coût estimé ≈ {est:.2f} $")
    if "--dry" in sys.argv:
        return

    budget = cfg.get("budget_usd", 1.5)
    data_dir = base / "data"
    data_dir.mkdir(parents=True, exist_ok=True)
    prev_files = sorted(p for p in data_dir.glob("*.json") if p.stem < today)
    prev = json.loads(prev_files[-1].read_text(encoding="utf-8")) if prev_files else None

    print("· vue d'ensemble"); ov = overview(cfg)
    print("· mots-clés positionnés"); rk = ranked_keywords(cfg["domain"], cfg, cfg.get("ranked_limit", 1000))
    check_budget(budget)
    print("· concurrents"); comps = competitors(cfg)
    print("· suivi SERP"); serp = serp_tracking(cfg, load_locations())
    check_budget(budget)
    print("· écarts concurrents"); gp = gaps(cfg, rk)
    check_budget(budget)
    print("· backlinks"); bl = backlinks(cfg)
    # On-page: configured key pages + the pages carrying the most estimated traffic.
    by_url = {}
    for r in rk:
        if r["url"]:
            by_url[r["url"]] = by_url.get(r["url"], 0) + r["etv"]
    top_urls = [u for u, _ in sorted(by_url.items(), key=lambda x: -x[1])]
    urls = list(dict.fromkeys(cfg.get("key_pages", []) + [f"https://{cfg['domain']}{u}" if u.startswith("/") else u
                                                            for u in top_urls]))[:cfg.get("onpage_pages", 12)]
    print("· audit on-page"); op = onpage(cfg, urls)

    snap = {"date": today, "config": cfg, "overview": ov, "ranked_keywords": rk, "competitors": comps,
            "serp": serp, "gaps": gp, "backlinks": bl, "onpage": op}
    snap["comparison"] = compare(snap, prev)
    snap["cost_usd"] = round(COST["total"], 3)

    (data_dir / f"{today}.json").write_text(json.dumps(snap, ensure_ascii=False, indent=1), encoding="utf-8")
    rdir = base / "rapports"
    rdir.mkdir(parents=True, exist_ok=True)
    md = report(snap, prev)
    (rdir / f"{today}.md").write_text(md, encoding="utf-8")
    print(md)
    print(f"RAPPORT=seo/clients/{client}/rapports/{today}.md COUT={snap['cost_usd']}$")


if __name__ == "__main__":
    main()
