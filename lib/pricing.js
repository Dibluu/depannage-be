// Price catalogue — single source for the booking flow, the SEO pages and the price pages.
// Ranges are TTC (TVA 6 % logement > 10 ans), déplacement, main-d'œuvre et petites fournitures inclus.
// Baseline aligned on the market leader's public Belgian grid (Depanneo, relevé 2026-09-28).
// Live values can be overridden per (trade, problem) from the Supabase `price_matrix` table.

// Keys match the `trade` column of price_matrix and the booking flow.
export const FEES = {
  Serrurerie:  { travel: 95,  surcharge: 90,  cancel: 50 },
  Plomberie:   { travel: 110, surcharge: 100, cancel: 50 },
  Électricité: { travel: 95,  surcharge: 90,  cancel: 50 },
  Chauffage:   { travel: 95,  surcharge: 90,  cancel: 50 },
}

// booking: shown as a tile in the booking flow. urgent: typical emergency job.
export const CATALOG = {
  Serrurerie: [
    { id: 'porte-claquee',        fr: 'Ouverture de porte claquée',            nl: 'Dichtgevallen deur openen',              min: 125, max: 165, duration: '15–45 min',  urgent: true,  booking: true,  sub: { fr: 'Clés restées à l’intérieur', nl: 'Sleutels binnen laten liggen' } },
    { id: 'porte-verrouillee',    fr: 'Ouverture de porte fermée à clé',       nl: 'Op slot gedraaide deur openen',          min: 150, max: 220, duration: '30 min–1h',  urgent: true,  booking: true,  sub: { fr: 'Clés perdues ou volées', nl: 'Sleutels verloren of gestolen' } },
    { id: 'porte-blindee',        fr: 'Ouverture d’une porte blindée',         nl: 'Veiligheidsdeur openen',                 min: 220, max: 420, duration: '45 min–2h',  urgent: true,  booking: false },
    { id: 'cle-cassee',           fr: 'Extraction d’une clé cassée',           nl: 'Afgebroken sleutel verwijderen',         min: 110, max: 190, duration: '20–45 min',  urgent: true,  booking: true,  sub: { fr: 'Morceau coincé dans le cylindre', nl: 'Stuk vast in de cilinder' } },
    { id: 'cylindre',             fr: 'Remplacement d’un cylindre européen',   nl: 'Europese cilinder vervangen',            min: 140, max: 260, duration: '30 min–1h',  urgent: false, booking: true,  sub: { fr: 'Nouveau jeu de clés inclus', nl: 'Nieuwe set sleutels inbegrepen' } },
    { id: 'cylindre-securite',    fr: 'Cylindre de sécurité certifié',         nl: 'Gecertificeerde veiligheidscilinder',    min: 220, max: 420, duration: '45 min–1h',  urgent: false, booking: false },
    { id: 'cylindre-perte-cles',  fr: 'Changement de cylindre après perte de clés', nl: 'Cilinder vervangen na sleutelverlies', min: 150, max: 290, duration: '30 min–1h', urgent: true, booking: false },
    { id: 'cylindre-grippe',      fr: 'Déblocage d’un cylindre grippé',        nl: 'Vastgelopen cilinder deblokkeren',       min: 110, max: 180, duration: '20–45 min',  urgent: true,  booking: false },
    { id: 'serrure-encastree',    fr: 'Remplacement d’une serrure encastrée',  nl: 'Inbouwslot vervangen',                   min: 180, max: 340, duration: '1h–2h',      urgent: false, booking: false },
    { id: 'serrure-multipoints',  fr: 'Pose d’une serrure multipoints',        nl: 'Meerpuntsslot plaatsen',                 min: 320, max: 680, duration: '2h–3h',      urgent: false, booking: true,  sub: { fr: '3 à 5 points de fermeture', nl: '3 tot 5 sluitpunten' } },
    { id: 'effraction',           fr: 'Mise en sécurité après effraction',     nl: 'Beveiliging na inbraak',                 min: 160, max: 340, duration: '1h–2h',      urgent: true,  booking: true,  sub: { fr: 'Rapport pour l’assurance', nl: 'Verslag voor de verzekering' } },
    { id: 'porte-garage',         fr: 'Ouverture d’une porte de garage',       nl: 'Garagepoort openen',                     min: 160, max: 320, duration: '30 min–1h30', urgent: true, booking: false },
    { id: 'boite-lettres',        fr: 'Ouverture d’une boîte aux lettres',     nl: 'Brievenbus openen',                      min: 80,  max: 140, duration: '15–30 min',  urgent: false, booking: false },
    { id: 'verrou',               fr: 'Pose d’un verrou de sûreté',            nl: 'Veiligheidsgrendel plaatsen',            min: 140, max: 260, duration: '45 min–1h30', urgent: false, booking: false },
    { id: 'volet-roulant',        fr: 'Dépannage d’un volet roulant bloqué',   nl: 'Vastzittend rolluik herstellen',         min: 130, max: 250, duration: '45 min–1h30', urgent: false, booking: false },
    { id: 'reglage-porte',        fr: 'Réglage d’une porte qui ferme mal',     nl: 'Slecht sluitende deur afstellen',        min: 95,  max: 180, duration: '30 min–1h',  urgent: false, booking: false },
  ],
  Plomberie: [
    { id: 'debouchage-wc',        fr: 'Débouchage d’un WC',                    nl: 'Wc ontstoppen',                          min: 130, max: 200, duration: '30 min–1h',  urgent: true,  booking: true,  sub: { fr: 'WC bouché ou qui déborde', nl: 'Verstopt of overlopend toilet' } },
    { id: 'debouchage-evier',     fr: 'Débouchage d’un évier ou lavabo',       nl: 'Gootsteen of lavabo ontstoppen',         min: 130, max: 200, duration: '30 min–1h',  urgent: true,  booking: true,  sub: { fr: 'L’eau ne s’écoule plus', nl: 'Water loopt niet meer weg' } },
    { id: 'debouchage-douche',    fr: 'Débouchage d’une douche ou baignoire',  nl: 'Douche of bad ontstoppen',               min: 130, max: 210, duration: '30 min–1h',  urgent: false, booking: false },
    { id: 'colonne',              fr: 'Débouchage d’une colonne d’évacuation', nl: 'Afvoerkolom ontstoppen',                 min: 290, max: 420, duration: '1h–2h',      urgent: true,  booking: false },
    { id: 'recherche-fuite',      fr: 'Recherche de fuite non destructive',    nl: 'Niet-destructief lekzoeken',             min: 180, max: 350, duration: '1h–2h',      urgent: true,  booking: true,  sub: { fr: 'Tache, compteur qui tourne', nl: 'Vlek, meter die draait' } },
    { id: 'fuite-apparente',      fr: 'Réparation d’une fuite apparente',      nl: 'Zichtbaar lek herstellen',               min: 120, max: 250, duration: '45 min–1h30', urgent: true, booking: true,  sub: { fr: 'Tuyau, raccord, robinet', nl: 'Leiding, koppeling, kraan' } },
    { id: 'fuite-chasse',         fr: 'Réparation d’une fuite de chasse d’eau', nl: 'Lekkende spoelbak herstellen',          min: 140, max: 220, duration: '30 min–1h',  urgent: false, booking: false },
    { id: 'robinet',              fr: 'Installation d’un robinet ou mitigeur', nl: 'Kraan of mengkraan plaatsen',            min: 140, max: 320, duration: '45 min–1h30', urgent: false, booking: true,  sub: { fr: 'Cuisine ou salle de bain', nl: 'Keuken of badkamer' } },
    { id: 'wc-complet',           fr: 'Remplacement d’un WC complet',          nl: 'Volledig toilet vervangen',              min: 280, max: 550, duration: '2h–3h',      urgent: false, booking: false },
    { id: 'chauffe-eau',          fr: 'Remplacement d’un chauffe-eau électrique', nl: 'Elektrische boiler vervangen',        min: 450, max: 900, duration: '2h–4h',      urgent: false, booking: true,  sub: { fr: 'Plus d’eau chaude', nl: 'Geen warm water meer' } },
    { id: 'groupe-securite',      fr: 'Remplacement d’un groupe de sécurité',  nl: 'Veiligheidsgroep vervangen',             min: 140, max: 260, duration: '45 min–1h',  urgent: false, booking: false },
    { id: 'hydrocurage',          fr: 'Hydrocurage haute pression',            nl: 'Hogedrukreiniging van leidingen',        min: 290, max: 420, duration: '1h–2h',      urgent: false, booking: false },
    { id: 'camera',               fr: 'Inspection caméra d’une canalisation',  nl: 'Camera-inspectie van een leiding',       min: 150, max: 250, duration: '45 min–1h',  urgent: false, booking: false },
    { id: 'degel',                fr: 'Dégel d’une canalisation',              nl: 'Bevroren leiding ontdooien',             min: 150, max: 320, duration: '1h–2h',      urgent: true,  booking: false },
  ],
  Électricité: [
    { id: 'panne',                fr: 'Recherche de panne électrique',         nl: 'Elektrische storing opsporen',           min: 110, max: 180, duration: '45 min–1h30', urgent: true, booking: true,  sub: { fr: 'Plus de courant, disjoncteur qui saute', nl: 'Geen stroom, zekering springt' } },
    { id: 'retablissement',       fr: 'Rétablissement du courant après disjonction', nl: 'Stroom herstellen na uitschakeling', min: 110, max: 220, duration: '45 min–1h30', urgent: true, booking: false },
    { id: 'court-circuit',        fr: 'Recherche d’un court-circuit encastré', nl: 'Kortsluiting in ingebouwde kring zoeken', min: 180, max: 380, duration: '1h–3h',     urgent: true,  booking: false },
    { id: 'differentiel',         fr: 'Remplacement d’un différentiel',        nl: 'Verliesstroomschakelaar vervangen',      min: 180, max: 360, duration: '1h–2h',      urgent: false, booking: true,  sub: { fr: 'Différentiel qui déclenche', nl: 'Differentieel dat afslaat' } },
    { id: 'disjoncteur',          fr: 'Remplacement d’un disjoncteur',         nl: 'Automaat vervangen',                     min: 110, max: 220, duration: '45 min–1h',  urgent: false, booking: false },
    { id: 'prise',                fr: 'Remplacement d’une prise ou d’un interrupteur', nl: 'Stopcontact of schakelaar vervangen', min: 90, max: 150, duration: '30 min–1h', urgent: false, booking: true,  sub: { fr: 'Prise grillée, interrupteur HS', nl: 'Verbrand stopcontact, defecte schakelaar' } },
    { id: 'point-lumineux',       fr: 'Installation d’un point lumineux',      nl: 'Lichtpunt plaatsen',                     min: 120, max: 240, duration: '1h–2h',      urgent: false, booking: true,  sub: { fr: 'Luminaire, spots, applique', nl: 'Armatuur, spots, wandlamp' } },
    { id: 'tableau',              fr: 'Remplacement d’un tableau électrique',  nl: 'Zekeringkast vervangen',                 min: 450, max: 1200, duration: '4h–1 jour', urgent: false, booking: true,  sub: { fr: 'Appartement ou maison', nl: 'Appartement of woning' } },
    { id: 'conformite',           fr: 'Mise en conformité avant contrôle RGIE', nl: 'Conformiteit vóór AREI-keuring',        min: 280, max: 900, duration: '3h–1 jour',  urgent: false, booking: true,  sub: { fr: 'Vente ou location du logement', nl: 'Verkoop of verhuur van de woning' } },
    { id: 'schema-unifilaire',    fr: 'Schéma unifilaire et plan de position', nl: 'Eendraadschema en situatieschema',       min: 180, max: 380, duration: '2h–4h',      urgent: false, booking: false },
    { id: 'terre',                fr: 'Mise à la terre d’une installation',    nl: 'Aarding van een installatie',            min: 380, max: 950, duration: '4h–1 jour',  urgent: false, booking: false },
    { id: 'plaque-cuisson',       fr: 'Raccordement d’une plaque de cuisson',  nl: 'Kookplaat aansluiten',                   min: 180, max: 380, duration: '1h–2h',      urgent: false, booking: false },
    { id: 'detecteurs',           fr: 'Pose de détecteurs de fumée',           nl: 'Rookmelders plaatsen',                   min: 80,  max: 160, duration: '30 min–1h', urgent: false, booking: false },
    { id: 'borne',                fr: 'Installation d’une borne de recharge',  nl: 'Laadpaal installeren',                   min: 1200, max: 2400, duration: '1 jour',   urgent: false, booking: false },
  ],
  Chauffage: [
    { id: 'panne-chaudiere',      fr: 'Dépannage d’une chaudière en panne',    nl: 'Defecte ketel herstellen',               min: 150, max: 320, duration: '1h–2h',      urgent: true,  booking: true,  sub: { fr: 'Plus de chauffage ni d’eau chaude', nl: 'Geen verwarming of warm water' } },
    { id: 'entretien-gaz',        fr: 'Entretien de chaudière gaz',            nl: 'Onderhoud gasketel',                     min: 120, max: 180, duration: '1h–1h30',    urgent: false, booking: true,  sub: { fr: 'Attestation réglementaire incluse', nl: 'Reglementair attest inbegrepen' } },
    { id: 'entretien-mazout',     fr: 'Entretien de chaudière mazout',         nl: 'Onderhoud stookolieketel',               min: 150, max: 220, duration: '1h30–2h',    urgent: false, booking: true,  sub: { fr: 'Attestation réglementaire incluse', nl: 'Reglementair attest inbegrepen' } },
    { id: 'pression',             fr: 'Réarmement et remise en pression',      nl: 'Herstarten en druk herstellen',          min: 95,  max: 170, duration: '30 min–1h', urgent: true,  booking: true,  sub: { fr: 'Chaudière en sécurité', nl: 'Ketel in veiligheid' } },
    { id: 'circulateur',          fr: 'Remplacement d’un circulateur',         nl: 'Circulatiepomp vervangen',               min: 260, max: 480, duration: '1h–2h',      urgent: false, booking: false },
    { id: 'vase-expansion',       fr: 'Remplacement d’un vase d’expansion',    nl: 'Expansievat vervangen',                  min: 220, max: 420, duration: '1h–2h',      urgent: false, booking: false },
    { id: 'thermostat',           fr: 'Installation d’un thermostat programmable', nl: 'Programmeerbare thermostaat plaatsen', min: 180, max: 380, duration: '1h–2h',     urgent: false, booking: true,  sub: { fr: 'Ou thermostat connecté', nl: 'Of slimme thermostaat' } },
    { id: 'radiateur-fuite',      fr: 'Réparation d’une fuite sur radiateur',  nl: 'Lekkende radiator herstellen',           min: 150, max: 320, duration: '45 min–1h30', urgent: true, booking: true,  sub: { fr: 'Radiateur qui fuit ou reste froid', nl: 'Radiator lekt of blijft koud' } },
    { id: 'purge',                fr: 'Purge complète et remise en eau',       nl: 'Volledig ontluchten en bijvullen',       min: 140, max: 280, duration: '1h–2h',      urgent: false, booking: false },
    { id: 'desembouage',          fr: 'Désembouage d’un circuit de chauffage', nl: 'Verwarmingscircuit ontslibben',          min: 450, max: 850, duration: '1 jour',     urgent: false, booking: false },
    { id: 'pac',                  fr: 'Dépannage d’une pompe à chaleur',       nl: 'Warmtepomp herstellen',                  min: 180, max: 420, duration: '1h–3h',      urgent: true,  booking: false },
    { id: 'chaudiere-condensation', fr: 'Remplacement d’une chaudière gaz à condensation', nl: 'Gascondensatieketel vervangen', min: 3200, max: 6500, duration: '1–2 jours', urgent: false, booking: false },
    { id: 'combustion',           fr: 'Analyse de combustion et réglage',      nl: 'Verbrandingsanalyse en afstelling',      min: 110, max: 190, duration: '45 min–1h', urgent: false, booking: false },
  ],
}

export const TRADE_KEYS = Object.keys(CATALOG)

export function prestation(trade, id) {
  return CATALOG[trade]?.find(p => p.id === id) || null
}

export function prestationByLabel(trade, label) {
  return CATALOG[trade]?.find(p => p.fr === label) || null
}

export function bookingPrestations(trade) {
  return (CATALOG[trade] || []).filter(p => p.booking)
}

export function tradeRange(trade) {
  const list = CATALOG[trade] || []
  return {
    low: Math.min(...list.map(p => p.min)),
    high: Math.max(...list.map(p => p.max)),
  }
}

// Night (20h–8h), weekend and Belgian public holidays → one surcharge, never cumulated.
const HOLIDAYS_FIXED = ['01-01', '05-01', '07-21', '08-15', '11-01', '11-11', '12-25']
function easterSunday(year) {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(Date.UTC(year, month - 1, day))
}
export function isBelgianHoliday(date) {
  const mmdd = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  if (HOLIDAYS_FIXED.includes(mmdd)) return true
  const easter = easterSunday(date.getFullYear())
  return [1, 39, 50].some(offset => {
    const d = new Date(easter)
    d.setUTCDate(d.getUTCDate() + offset) // Lundi de Pâques, Ascension, Lundi de Pentecôte
    return d.getUTCMonth() === date.getMonth() && d.getUTCDate() === date.getDate()
  })
}

// slot: { urgent } → based on `now`; otherwise { date: 'YYYY-MM-DD', time: 'matin'|'apres-midi'|'soir' }
export function surchargeFor(trade, slot, now = new Date()) {
  const fee = FEES[trade]?.surcharge ?? 0
  let when
  if (slot?.urgent) when = now
  else if (slot?.date) {
    const hour = { matin: 9, 'apres-midi': 14, soir: 18 }[slot.time] ?? 12
    when = new Date(`${slot.date}T${String(hour).padStart(2, '0')}:00:00`)
  } else return 0
  const h = when.getHours()
  const day = when.getDay()
  const night = h >= 20 || h < 8
  const weekend = day === 0 || day === 6
  return night || weekend || isBelgianHoliday(when) ? fee : 0
}

// Server-side: overlay live prices from Supabase price_matrix (trade + FR label) when configured.
export async function loadCatalog() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return CATALOG
  try {
    const res = await fetch(`${url}/rest/v1/price_matrix?select=trade,problem,price_min,price_max,duration,active`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 3600, tags: ['prices'] },
    })
    if (!res.ok) return CATALOG
    const rows = await res.json()
    const merged = {}
    for (const [trade, list] of Object.entries(CATALOG)) {
      merged[trade] = list
        .map(p => {
          const row = rows.find(r => r.trade === trade && r.problem === p.fr)
          if (!row) return p
          if (row.active === false) return null
          return { ...p, min: row.price_min, max: row.price_max, duration: row.duration || p.duration }
        })
        .filter(Boolean)
    }
    return merged
  } catch {
    return CATALOG
  }
}
