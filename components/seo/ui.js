import Link from 'next/link'
import { UI } from '../../lib/i18n'
import { PHONE, PHONE_HREF, LEGAL } from '../../lib/site'
import { euro } from '../../lib/seo/content/shared'
import { TRADES } from '../../lib/trades'
import { REGIONS } from '../../lib/geo'
import { tradeUrl, regionUrl, pricesUrl, bookingUrl, legalUrl } from '../../lib/seo/routes'
import { activeRegions, activeTrades } from '../../lib/seo/rollout'

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}>{children}</div>
}

export function SiteHeader({ lang, altHref }) {
  const t = UI[lang]
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-3">
        <Link href={lang === 'nl' ? '/nl' : '/'} className="text-lg font-extrabold tracking-tight text-navy">
          Dépannage<span className="text-orange">.be</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-semibold sm:gap-4">
          <Link href={pricesUrl(lang)} className="hidden text-navy/70 hover:text-navy sm:inline">{t.prices}</Link>
          {altHref && (
            <Link href={altHref} hrefLang={lang === 'nl' ? 'fr-BE' : 'nl-BE'} className="text-navy/70 hover:text-navy">
              {lang === 'nl' ? 'FR' : 'NL'}
            </Link>
          )}
          {PHONE && (
            <a href={PHONE_HREF} className="hidden rounded-lg border border-navy/15 px-3 py-1.5 text-navy sm:inline">{PHONE}</a>
          )}
          <Link href={bookingUrl(lang)} className="rounded-lg bg-orange px-3 py-1.5 text-white shadow-sm">{t.bookShort}</Link>
        </nav>
      </Container>
    </header>
  )
}

export function SiteFooter({ lang }) {
  const t = UI[lang]
  const trades = activeTrades(lang)
  return (
    <footer className="mt-16 bg-navy text-white/80">
      <Container className="grid gap-8 py-10 sm:grid-cols-3">
        <div className="space-y-2">
          <div className="text-lg font-extrabold text-white">Dépannage<span className="text-orange">.be</span></div>
          <p className="text-sm">{lang === 'nl' ? 'Brussel, Waals-Brabant en Vlaams-Brabant.' : 'Bruxelles, Brabant wallon et Brabant flamand.'}</p>
          <address className="text-sm not-italic">
            {LEGAL.street}, {LEGAL.postcode} {LEGAL.city[lang]}
            {PHONE && <><br /><a href={PHONE_HREF} className="hover:text-white">{PHONE}</a></>}
          </address>
        </div>
        <div className="space-y-2 text-sm">
          <div className="font-bold text-white">{t.regions}</div>
          <ul className="list-none space-y-1">
            {trades.flatMap(tr => activeRegions(tr, lang).map(r => (
              <li key={`${tr}-${r}`}>
                <Link href={regionUrl(tr, r, lang)} className="hover:text-white">
                  {TRADES[tr].name[lang]} {REGIONS[r].in[lang]}
                </Link>
              </li>
            )))}
          </ul>
        </div>
        <div className="space-y-2 text-sm">
          <div className="font-bold text-white">{t.prices}</div>
          <ul className="list-none space-y-1">
            {Object.values(TRADES).map(tr => (
              <li key={tr.id}><Link href={pricesUrl(lang, tr.id)} className="hover:text-white">{t.priceTitle(tr.name[lang].toLowerCase())}</Link></li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="flex flex-wrap gap-4 border-t border-white/10 py-4 text-xs text-white/50">
        <span>© {new Date().getFullYear()} Dépannage.be · {LEGAL.owner} · {lang === 'nl' ? 'KBO' : 'BCE'} {LEGAL.bce}</span>
        <Link href={legalUrl(lang)} className="hover:text-white">{lang === 'nl' ? 'Wettelijke vermeldingen en privacy' : 'Mentions légales et vie privée'}</Link>
        <Link href={lang === 'nl' ? '/nl/partners' : '/partenaires'} className="hover:text-white">{lang === 'nl' ? 'Onze partners' : 'Nos artisans partenaires'}</Link>
      </Container>
    </footer>
  )
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs text-navy/60">
      <ol className="flex list-none flex-wrap gap-1">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden>›</span>}
            {i < items.length - 1 ? <Link href={it.path} className="hover:text-navy">{it.name}</Link> : <span className="text-navy/80">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function Hero({ lang, h1, lead, bookHref, trust = true }) {
  const t = UI[lang]
  return (
    <section className="bg-gradient-to-b from-[#FFF4EF] to-white">
      <Container className="py-8 sm:py-12">
        <h1 className="max-w-3xl text-3xl font-black leading-tight text-navy sm:text-4xl">{h1}</h1>
        <p className="mt-3 max-w-2xl text-base text-navy/75 sm:text-lg">{lead}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={bookHref} className="inline-flex items-center justify-center rounded-xl bg-orange px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-orange/25">
            {t.getPrice} →
          </Link>
          {PHONE && (
            <a href={PHONE_HREF} className="inline-flex items-center justify-center rounded-xl border-2 border-navy px-6 py-3 text-base font-bold text-navy">
              {t.call} {PHONE}
            </a>
          )}
        </div>
        {trust && (
          <ul className="mt-6 grid list-none grid-cols-2 gap-2 text-sm text-navy/80 sm:flex sm:flex-wrap sm:gap-5">
            {t.trust.map(item => (
              <li key={item} className="flex items-center gap-2"><span className="text-green">✓</span>{item}</li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  )
}

export function Section({ title, children, id, className = '' }) {
  return (
    <section id={id} className={`py-8 ${className}`}>
      <Container>
        {title && <h2 className="mb-4 text-2xl font-extrabold text-navy">{title}</h2>}
        {children}
      </Container>
    </section>
  )
}

export function PriceTable({ lang, rows, bookHref }) {
  const t = UI[lang]
  return (
    <div className="overflow-x-auto rounded-xl border border-black/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#F7F7F8] text-xs uppercase tracking-wide text-navy/60">
          <tr>
            <th className="px-4 py-3">{t.priceCol}</th>
            <th className="px-4 py-3 text-right">{t.rangeCol}</th>
            <th className="hidden px-4 py-3 sm:table-cell">{t.durationCol}</th>
            {bookHref && <th className="px-4 py-3"><span className="sr-only">{t.bookShort}</span></th>}
          </tr>
        </thead>
        <tbody>
          {rows.map(p => (
            <tr key={p.id} className="border-t border-black/5">
              <td className="px-4 py-3 font-medium text-navy">{lang === 'nl' ? p.nl : p.fr}</td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-bold tabular-nums text-navy">{euro(p.min)} – {euro(p.max)}</td>
              <td className="hidden px-4 py-3 text-navy/60 sm:table-cell">{p.duration}</td>
              {bookHref && (
                <td className="px-4 py-3 text-right">
                  <Link href={bookHref(p)} className="whitespace-nowrap font-semibold text-orange">{t.bookShort} →</Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function FeesBox({ lang, fees }) {
  const t = UI[lang]
  return (
    <div className="mt-4 rounded-xl bg-[#F7F7F8] p-4 text-sm text-navy/80">
      <div className="mb-2 font-bold text-navy">{t.feesTitle}</div>
      <ul className="list-none space-y-1">
        <li className="flex justify-between gap-4"><span>{t.surcharge} <span className="text-navy/50">({t.surchargeNote})</span></span><b className="tabular-nums">+ {euro(fees.surcharge)}</b></li>
        <li className="flex justify-between gap-4"><span>{t.travel}</span><b className="tabular-nums">{euro(fees.travel)}</b></li>
        <li className="flex justify-between gap-4"><span>{t.cancel}</span><b className="tabular-nums">{euro(fees.cancel)}</b></li>
      </ul>
      <p className="mt-3 text-xs text-navy/60">{t.vatNote}</p>
    </div>
  )
}

export function HowItWorks({ lang }) {
  const t = UI[lang]
  return (
    <ol className="grid list-none gap-3 sm:grid-cols-3">
      {t.how.map(([title, body], i) => (
        <li key={title} className="rounded-xl border border-black/10 p-4">
          <div className="text-sm font-black text-orange">{i + 1}</div>
          <div className="mt-1 font-bold text-navy">{title}</div>
          <p className="mt-1 text-sm text-navy/70">{body}</p>
        </li>
      ))}
    </ol>
  )
}

export function Faq({ faqs }) {
  return (
    <div className="divide-y divide-black/10 rounded-xl border border-black/10">
      {faqs.map(f => (
        <details key={f.q} className="group p-4">
          <summary className="cursor-pointer list-none font-semibold text-navy marker:hidden">
            <span className="flex items-center justify-between gap-4">{f.q}<span className="text-orange transition group-open:rotate-45">+</span></span>
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-navy/75">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export function LinkGrid({ links }) {
  return (
    <ul className="grid list-none grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {links.map(l => (
        <li key={l.href}>
          <Link href={l.href} className="block rounded-lg border border-black/10 px-3 py-2 text-sm font-medium text-navy hover:border-orange hover:text-orange">
            {l.label}{l.meta && <span className="block text-xs font-normal text-navy/50">{l.meta}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function CtaBand({ lang, title, href }) {
  const t = UI[lang]
  return (
    <section className="py-8">
      <Container>
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <div className="text-xl font-extrabold">{title}</div>
            <p className="mt-1 text-sm text-white/70">{t.ctaSub}</p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Link href={href} className="rounded-xl bg-orange px-6 py-3 text-center font-bold text-white">{t.book} →</Link>
            {PHONE && <a href={PHONE_HREF} className="rounded-xl border-2 border-white px-6 py-3 text-center font-bold">{t.call}</a>}
          </div>
        </div>
      </Container>
    </section>
  )
}

// Mobile bottom bar: the fastest path for emergencies.
export function MobileBar({ lang, href }) {
  const t = UI[lang]
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-black/10 bg-white p-3 sm:hidden" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}>
      {PHONE && <a href={PHONE_HREF} className="flex-1 rounded-xl border-2 border-navy py-3 text-center font-bold text-navy">{t.call}</a>}
      <Link href={href} className="flex-1 rounded-xl bg-orange py-3 text-center font-bold text-white">{t.bookShort}</Link>
    </div>
  )
}
