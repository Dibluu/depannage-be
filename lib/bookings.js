import { communeByPostcode, communeName } from './geo'
import { prestation } from './pricing'

// Booking recap shared by the notification email, the push notification and the admin app.
const RECAP = {
  fr: {
    trades: { Serrurerie: 'Serrurerie', Plomberie: 'Plomberie', Électricité: 'Électricité', Chauffage: 'Chauffage', Autre: 'Intervention' },
    slots: { matin: 'matin (8h–12h)', 'apres-midi': 'après-midi (12h–17h)', soir: 'soir (17h–20h)' },
    urgent: 'dès que possible',
    hello: (name, ref) => `Bonjour ${name}, ici Dépannage.be. Nous avons bien reçu votre demande ${ref} :`,
    sep: ' : ', when: 'Quand', where: 'Adresse', price: 'Prix annoncé', quote: 'sur devis',
    next: 'L’artisan vous appelle pour confirmer l’heure de passage.',
  },
  nl: {
    trades: { Serrurerie: 'Slotenmaker', Plomberie: 'Loodgieter', Électricité: 'Elektricien', Chauffage: 'Verwarming', Autre: 'Interventie' },
    slots: { matin: 'ochtend (8u–12u)', 'apres-midi': 'namiddag (12u–17u)', soir: 'avond (17u–20u)' },
    urgent: 'zo snel mogelijk',
    hello: (name, ref) => `Goedendag ${name}, hier Dépannage.be. We hebben uw aanvraag ${ref} goed ontvangen:`,
    sep: ': ', when: 'Wanneer', where: 'Adres', price: 'Aangekondigde prijs', quote: 'op offerte',
    next: 'De vakman belt u om het uur van zijn bezoek te bevestigen.',
  },
}

// Belgian numbers as typed by customers (0470…, +32…, 0032…) → digits for wa.me.
export function waNumber(phone) {
  const d = phone.replace(/\D/g, '').replace(/^00/, '')
  return d.startsWith('0') ? `32${d.slice(1)}` : d
}

export function whatsappLink(b, label, communeLabel) {
  const r = RECAP[b.lang]
  const day = b.urgent ? r.urgent : `${new Date(`${b.slot_date}T12:00:00`).toLocaleDateString(b.lang === 'nl' ? 'nl-BE' : 'fr-BE', { weekday: 'long', day: 'numeric', month: 'long' })}, ${r.slots[b.slot_time]}`
  const text = [
    r.hello(b.name.split(' ')[0], b.ref),
    `• ${r.trades[b.trade]}${r.sep}${label}`,
    `• ${r.when}${r.sep}${day}`,
    `• ${r.where}${r.sep}${b.address}, ${b.postcode} ${communeLabel}`,
    `• ${r.price}${r.sep}${b.price_min ? `${b.price_min} – ${b.price_max} €` : r.quote}`,
    r.next,
  ].join('\n')
  return `https://wa.me/${waNumber(b.phone)}?text=${encodeURIComponent(text)}`
}

// Same link from a stored booking row (the row keeps the French label; the catalogue gives the NL one).
export function whatsappLinkFor(b) {
  const commune = communeByPostcode(b.postcode)
  const label = (b.prestation_id && prestation(b.trade, b.prestation_id)?.[b.lang]) || b.problem || ''
  return whatsappLink(b, label, commune ? communeName(commune, b.lang) : b.commune)
}

export const TRADE_LABELS = RECAP.fr.trades
