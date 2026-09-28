'use client'
import { useState, useRef, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Lock, Droplets, Zap, Flame, Hammer, ArrowLeft, Check, Camera, Clock, ChevronRight, MapPin, Phone } from 'lucide-react'
import { FEES, surchargeFor } from '../../lib/pricing'
import { TRADES } from '../../lib/trades'
import { communeByPostcode, communeName } from '../../lib/geo'
import { PHONE, PHONE_HREF, WHATSAPP } from '../../lib/site'

/* ─── Copy ───────────────────────────────────────────────── */
const T = {
  fr: {
    steps: ['Problème', 'Prix', 'Créneau', 'Coordonnées', 'Confirmation'],
    stepOf: (s, n, l) => `Étape ${s} sur ${n} — ${l}`,
    back: 'Retour',
    q1: 'Quel est votre problème ?',
    q1sub: 'Choisissez l’intervention, le prix s’affiche tout de suite.',
    other: 'Autre',
    otherSub: 'Décrivez votre besoin',
    otherTitle: 'Décrivez votre besoin',
    otherPh: 'Ex. : la porte de ma cave ne ferme plus depuis ce matin…',
    otherTrade: 'Quel métier ?',
    continue: 'Continuer',
    priceTitle: 'Votre prix',
    priceSub: 'Fourchette fixe, annoncée avant le déplacement.',
    between: 'Entre',
    quote: 'Sur devis',
    quoteSub: 'Un conseiller vous rappelle avec une estimation avant tout déplacement.',
    duration: 'Durée estimée',
    included: 'Inclus dans le prix',
    includedList: ['Déplacement', 'Diagnostic', 'Main-d’œuvre', 'Petites fournitures'],
    vat: 'TVA 6 % comprise (logement de plus de 10 ans). 21 % pour un logement récent ou un local professionnel.',
    surchargeInfo: s => `Nuit (20h–8h), week-end et jours fériés : + ${s} €, une seule fois.`,
    extra: 'Si l’artisan constate un autre problème sur place, il vous fait un devis. Vous pouvez refuser : seuls le déplacement et le diagnostic sont dus.',
    cp: 'Code postal de l’intervention',
    cpPh: 'Ex. : 1050',
    covered: c => `${c} — zone couverte`,
    notCovered: 'Nous n’intervenons pas encore à ce code postal (Bruxelles, Brabant wallon et Brabant flamand uniquement).',
    choose: 'Choisir le créneau',
    when: 'Quand voulez-vous l’intervention ?',
    whenSub: 'Le prix final dépend uniquement de l’heure.',
    urgent: 'Dès que possible',
    urgentSub: 'L’artisan le plus proche vous rappelle dans les minutes qui suivent.',
    orPlan: 'ou planifier',
    today: 'Auj.',
    tomorrow: 'Dem.',
    slots: { matin: ['Matin', '8h–12h'], 'apres-midi': ['Après-midi', '12h–17h'], soir: ['Soir', '17h–20h'] },
    withSurcharge: s => `+ ${s} € (nuit, week-end ou jour férié)`,
    noSurcharge: 'Aucune majoration',
    confirmSlot: 'Confirmer ce créneau',
    who: 'Où et qui ?',
    whoSub: 'L’artisan vous appelle sur ce numéro pour confirmer l’heure.',
    name: 'Prénom et nom',
    phone: 'Téléphone',
    phoneHint: 'Pour que l’artisan vous rappelle',
    address: 'Rue et numéro',
    floor: 'Étage, sonnette',
    email: 'Email',
    emailHint: 'Pour recevoir le récapitulatif',
    desc: 'Précisions',
    descPh: 'Type de porte, depuis quand, ce que vous avez déjà essayé…',
    photo: 'Photo du problème',
    photoAdd: 'Ajouter une photo pour aider l’artisan',
    photoRemove: 'Supprimer',
    optional: '(facultatif)',
    summary: 'Récapitulatif',
    estimated: 'Prix annoncé',
    submit: 'Confirmer ma demande',
    sending: 'Envoi…',
    privacy: 'Vos données servent uniquement à organiser l’intervention. Elles ne sont jamais revendues.',
    error: 'La demande n’a pas pu être envoyée. Vérifiez votre connexion et réessayez.',
    errorCall: 'Ou appelez-nous directement :',
    done: 'Demande envoyée',
    doneSub: 'Un artisan vous rappelle pour confirmer l’heure. En urgence, comptez quelques minutes.',
    ref: 'Référence',
    next: ['Appel de confirmation de l’artisan', 'Intervention au prix annoncé', 'Paiement après l’intervention, facture détaillée'],
    whatsapp: 'Suivre ma demande sur WhatsApp',
    home: 'Retour à l’accueil',
    asap: 'Dès que possible',
    tradeNames: { Serrurerie: 'Serrurerie', Plomberie: 'Plomberie', Électricité: 'Électricité', Chauffage: 'Chauffage' },
  },
  nl: {
    steps: ['Probleem', 'Prijs', 'Tijdstip', 'Gegevens', 'Bevestiging'],
    stepOf: (s, n, l) => `Stap ${s} van ${n} — ${l}`,
    back: 'Terug',
    q1: 'Wat is uw probleem?',
    q1sub: 'Kies de interventie, de prijs verschijnt meteen.',
    other: 'Andere',
    otherSub: 'Beschrijf uw vraag',
    otherTitle: 'Beschrijf uw vraag',
    otherPh: 'Bv.: de kelderdeur sluit sinds vanochtend niet meer…',
    otherTrade: 'Welk vakgebied?',
    continue: 'Verder',
    priceTitle: 'Uw prijs',
    priceSub: 'Vaste prijsvork, gekend vóór de verplaatsing.',
    between: 'Tussen',
    quote: 'Op offerte',
    quoteSub: 'Een adviseur belt u terug met een schatting vóór elke verplaatsing.',
    duration: 'Geschatte duur',
    included: 'Inbegrepen',
    includedList: ['Verplaatsing', 'Diagnose', 'Werkuren', 'Klein materiaal'],
    vat: 'Incl. 6 % btw (woning ouder dan 10 jaar). 21 % voor een recente woning of beroepsruimte.',
    surchargeInfo: s => `Nacht (20u–8u), weekend en feestdagen: + ${s} €, één keer.`,
    extra: 'Stelt de vakman ter plaatse een ander probleem vast, dan krijgt u een offerte. U mag weigeren: dan betaalt u enkel verplaatsing en diagnose.',
    cp: 'Postcode van de interventie',
    cpPh: 'Bv.: 3000',
    covered: c => `${c} — binnen ons werkgebied`,
    notCovered: 'We zijn nog niet actief in deze postcode (enkel Brussel, Waals-Brabant en Vlaams-Brabant).',
    choose: 'Tijdstip kiezen',
    when: 'Wanneer wilt u de interventie?',
    whenSub: 'De eindprijs hangt enkel af van het tijdstip.',
    urgent: 'Zo snel mogelijk',
    urgentSub: 'De dichtstbijzijnde vakman belt u binnen enkele minuten terug.',
    orPlan: 'of plannen',
    today: 'Vand.',
    tomorrow: 'Morg.',
    slots: { matin: ['Ochtend', '8u–12u'], 'apres-midi': ['Namiddag', '12u–17u'], soir: ['Avond', '17u–20u'] },
    withSurcharge: s => `+ ${s} € (nacht, weekend of feestdag)`,
    noSurcharge: 'Geen toeslag',
    confirmSlot: 'Tijdstip bevestigen',
    who: 'Waar en wie?',
    whoSub: 'De vakman belt u op dit nummer om het uur te bevestigen.',
    name: 'Voor- en achternaam',
    phone: 'Telefoon',
    phoneHint: 'Zodat de vakman u kan terugbellen',
    address: 'Straat en nummer',
    floor: 'Verdieping, bel',
    email: 'E-mail',
    emailHint: 'Voor het overzicht',
    desc: 'Details',
    descPh: 'Type deur, sinds wanneer, wat u al geprobeerd hebt…',
    photo: 'Foto van het probleem',
    photoAdd: 'Voeg een foto toe om de vakman te helpen',
    photoRemove: 'Verwijderen',
    optional: '(optioneel)',
    summary: 'Overzicht',
    estimated: 'Aangekondigde prijs',
    submit: 'Mijn aanvraag bevestigen',
    sending: 'Verzenden…',
    privacy: 'Uw gegevens dienen enkel om de interventie te regelen. Ze worden nooit verkocht.',
    error: 'De aanvraag kon niet verzonden worden. Controleer uw verbinding en probeer opnieuw.',
    errorCall: 'Of bel ons rechtstreeks:',
    done: 'Aanvraag verzonden',
    doneSub: 'Een vakman belt u terug om het uur te bevestigen. Bij dringende gevallen binnen enkele minuten.',
    ref: 'Referentie',
    next: ['Bevestigingsoproep van de vakman', 'Interventie aan de aangekondigde prijs', 'Betalen na de interventie, gedetailleerde factuur'],
    whatsapp: 'Mijn aanvraag volgen via WhatsApp',
    home: 'Terug naar home',
    asap: 'Zo snel mogelijk',
    tradeNames: { Serrurerie: 'Slotenmaker', Plomberie: 'Loodgieter', Électricité: 'Elektricien', Chauffage: 'Verwarming' },
  },
}

const TRADE_TILES = [
  { key: 'Serrurerie', Icon: Lock },
  { key: 'Plomberie', Icon: Droplets },
  { key: 'Électricité', Icon: Zap },
  { key: 'Chauffage', Icon: Flame },
]

const DAYS = { fr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'], nl: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'] }

function nextDays(lang, t) {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    return { key, short: i === 0 ? t.today : i === 1 ? t.tomorrow : `${DAYS[lang][d.getDay()]} ${d.getDate()}`, date: d }
  })
}

function track(event, data = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...data })
}

// Resize photos client-side so the upload stays well under the 4.5 MB request limit.
function resizeImage(file, max = 1600) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.8))
      URL.revokeObjectURL(img.src)
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

/* ─── Main ───────────────────────────────────────────────── */
export default function BookingFlow({ lang = 'fr', catalog, initial = {} }) {
  const t = T[lang]
  const tradeFromParam = Object.values(TRADES).find(tr => tr.id === initial.metier)?.key || null
  const presetPrestation = tradeFromParam ? catalog[tradeFromParam]?.find(p => p.id === initial.prestation) : null

  const [step, setStep] = useState(presetPrestation ? 2 : 1)
  const [trade, setTrade] = useState(tradeFromParam || 'Serrurerie')
  const [prestation, setPrestation] = useState(presetPrestation || null)
  const [otherText, setOtherText] = useState('')
  const [postcode, setPostcode] = useState(initial.cp || '')
  const [slot, setSlot] = useState({ urgent: false, date: null, time: null })
  const [contact, setContact] = useState({ name: '', phone: '', address: '', floor: '', email: '', description: '' })
  const [photo, setPhoto] = useState(null)
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [bookingRef, setBookingRef] = useState(null)
  const [honey, setHoney] = useState('')
  const fileRef = useRef(null)
  const days = useMemo(() => nextDays(lang, t), [lang, t])

  const commune = communeByPostcode(postcode)
  const fees = FEES[trade]
  const surcharge = surchargeFor(trade, slot)
  const isQuote = !prestation
  const range = prestation ? { min: prestation.min + surcharge, max: prestation.max + surcharge } : null

  useEffect(() => { track('booking_step', { step, trade, lang }) }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  function go(s) { setStep(s); if (typeof window !== 'undefined') window.scrollTo({ top: 0 }) }

  async function onPhoto(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try { setPhoto(await resizeImage(file)) } catch { setPhoto(null) }
  }

  async function submit() {
    setStatus('sending')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang,
          trade,
          prestation: prestation?.id || null,
          otherText: prestation ? '' : otherText,
          postcode,
          slot,
          contact,
          photo,
          website: honey,
          source: typeof document !== 'undefined' ? document.referrer : '',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ref) throw new Error(data.error || 'failed')
      setBookingRef(data.ref)
      setStatus('idle')
      track('booking_submit', { trade, prestation: prestation?.id, urgent: slot.urgent, value: range?.min })
      go(5)
    } catch {
      setStatus('error')
    }
  }

  const slotLabel = slot.urgent
    ? t.asap
    : slot.date ? `${days.find(d => d.key === slot.date)?.short ?? slot.date} · ${t.slots[slot.time]?.[1] ?? ''}` : '—'

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#F7F7F8] text-navy">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="h-1 bg-black/5">
          <div className="h-full bg-orange transition-all" style={{ width: `${((step - 1) / 4) * 100}%` }} />
        </div>
        <div className="mx-auto flex max-w-lg items-center justify-between px-5 py-2 text-xs font-semibold">
          <Link href={lang === 'nl' ? '/nl' : '/'} className="text-sm font-extrabold">Dépannage<span className="text-orange">.be</span></Link>
          <span className="text-navy/60">{t.stepOf(step, 5, t.steps[step - 1])}</span>
          {PHONE ? <a href={PHONE_HREF} className="flex items-center gap-1 text-orange"><Phone size={14} />{PHONE}</a> : <span />}
        </div>
      </div>

      <div className="mx-auto w-full max-w-lg flex-1 px-5 pb-10">
        {step > 1 && step < 5 && (
          <button onClick={() => go(step - 1)} className="mt-4 flex items-center gap-1 border-0 bg-transparent p-0 text-sm font-semibold text-navy/50">
            <ArrowLeft size={15} /> {t.back}
          </button>
        )}

        {/* ── 1. Problem ── */}
        {step === 1 && (
          <>
            <Header title={t.q1} sub={t.q1sub} />
            <div className="mb-4 grid grid-cols-5 gap-2">
              {[...TRADE_TILES, { key: 'Autre', Icon: Hammer }].map(({ key, Icon }) => (
                <button key={key} onClick={() => { setTrade(key); setPrestation(null) }}
                  className={`flex flex-col items-center gap-1 rounded-xl border-2 bg-white px-1 py-3 text-[11px] font-bold ${trade === key ? 'border-orange bg-[#FFF4F0]' : 'border-transparent shadow-sm'}`}>
                  <Icon size={20} className="text-orange" />
                  {key === 'Autre' ? t.other : t.tradeNames[key]}
                </button>
              ))}
            </div>
            {trade === 'Autre' ? (
              <>
                <label className="mb-1 block text-sm font-bold">{t.otherTrade}</label>
                <textarea rows={4} value={otherText} onChange={e => setOtherText(e.target.value)} placeholder={t.otherPh}
                  className="mb-4 w-full rounded-xl border border-black/15 bg-white p-3 text-[15px] focus:border-orange focus:outline-none" />
                <Btn disabled={otherText.trim().length < 5} onClick={() => go(2)}>{t.continue} <ChevronRight size={18} /></Btn>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {catalog[trade].filter(p => p.booking).map(p => (
                  <button key={p.id} onClick={() => { setPrestation(p); go(2) }}
                    className={`rounded-xl border-2 bg-white p-3 text-left shadow-sm ${prestation?.id === p.id ? 'border-orange' : 'border-transparent'}`}>
                    <div className="text-[13px] font-bold leading-snug">{lang === 'nl' ? p.nl : p.fr}</div>
                    {p.sub && <div className="mt-0.5 text-[11px] text-navy/50">{p.sub[lang]}</div>}
                    <div className="mt-2 text-sm font-extrabold text-orange">{p.min} – {p.max} €</div>
                  </button>
                ))}
                <button onClick={() => { setPrestation(null); setTrade('Autre') }} className="rounded-xl border-2 border-dashed border-black/15 bg-white p-3 text-left text-[13px] font-bold text-navy/60">
                  {t.other}…<div className="text-[11px] font-normal">{t.otherSub}</div>
                </button>
              </div>
            )}
          </>
        )}

        {/* ── 2. Price + postcode ── */}
        {step === 2 && (
          <>
            <Header title={t.priceTitle} sub={t.priceSub} />
            <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-orange/10 px-3 py-1.5 text-sm font-bold text-orange">
              {trade === 'Autre' ? t.other : t.tradeNames[trade]} — {prestation ? (lang === 'nl' ? prestation.nl : prestation.fr) : otherText.slice(0, 40)}
            </div>
            {isQuote ? (
              <div className="mb-4 rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 text-center">
                <div className="text-lg font-bold">{t.quote}</div>
                <p className="mt-1 text-sm text-navy/60">{t.quoteSub}</p>
              </div>
            ) : (
              <div className="mb-4 rounded-2xl border-2 border-green bg-green/5 p-5 text-center">
                <div className="text-sm text-navy/50">{t.between}</div>
                <div className="text-4xl font-black tracking-tight">{prestation.min} € – {prestation.max} €</div>
                <div className="mt-2 flex items-center justify-center gap-1.5 text-sm font-semibold text-navy/70"><Clock size={15} className="text-orange" /> {t.duration} : {prestation.duration}</div>
              </div>
            )}
            {!isQuote && (
              <ul className="mb-4 grid grid-cols-2 gap-2 text-sm">
                {t.includedList.map(i => <li key={i} className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-green text-white"><Check size={11} /></span>{i}</li>)}
              </ul>
            )}
            {trade !== 'Autre' && <p className="mb-2 text-xs text-navy/60">{t.surchargeInfo(fees.surcharge)} {t.vat}</p>}
            <p className="mb-5 rounded-lg bg-amber-50 p-3 text-xs text-amber-900">{t.extra}</p>

            <label htmlFor="cp" className="mb-1 block text-sm font-bold">{t.cp}</label>
            <div className="relative mb-2">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
              <input id="cp" inputMode="numeric" maxLength={4} autoComplete="postal-code" value={postcode} placeholder={t.cpPh}
                onChange={e => setPostcode(e.target.value.replace(/\D/g, ''))}
                className="h-12 w-full rounded-xl border border-black/15 bg-white pl-9 pr-3 text-[16px] focus:border-orange focus:outline-none" />
            </div>
            {postcode.length === 4 && (commune
              ? <p className="mb-4 text-sm font-semibold text-green">✓ {t.covered(communeName(commune, lang))}</p>
              : <p className="mb-4 text-sm font-semibold text-red-600">{t.notCovered}</p>)}
            <Btn disabled={!commune} onClick={() => go(3)}>{t.choose} <ChevronRight size={18} /></Btn>
          </>
        )}

        {/* ── 3. Slot ── */}
        {step === 3 && (
          <>
            <Header title={t.when} sub={t.whenSub} />
            <button onClick={() => setSlot({ urgent: true, date: null, time: null })}
              className={`mb-4 flex w-full items-center justify-between rounded-xl border-2 border-orange bg-white p-4 text-left ${slot.urgent ? 'bg-[#FFF4F0] shadow-md' : ''}`}>
              <div>
                <div className="font-extrabold">⚡ {t.urgent}</div>
                <div className="text-sm text-navy/60">{t.urgentSub}</div>
                {trade !== 'Autre' && <div className="mt-1 text-xs font-bold text-orange">{surchargeFor(trade, { urgent: true }) ? t.withSurcharge(fees.surcharge) : t.noSurcharge}</div>}
              </div>
              <Radio on={slot.urgent} />
            </button>
            <div className="mb-3 flex items-center gap-3 text-xs font-semibold text-navy/40"><span className="h-px flex-1 bg-black/10" />{t.orPlan}<span className="h-px flex-1 bg-black/10" /></div>
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {days.map(d => (
                <button key={d.key} onClick={() => setSlot(s => ({ ...s, urgent: false, date: d.key }))}
                  className={`shrink-0 rounded-full border px-3.5 py-2 text-sm font-semibold ${slot.date === d.key && !slot.urgent ? 'border-orange bg-orange text-white' : 'border-black/15 bg-white'}`}>
                  {d.short}
                </button>
              ))}
            </div>
            {slot.date && !slot.urgent && (
              <div className="mb-4 grid grid-cols-3 gap-2">
                {Object.entries(t.slots).map(([id, [label, hours]]) => {
                  const extra = trade !== 'Autre' && surchargeFor(trade, { date: slot.date, time: id })
                  return (
                    <button key={id} onClick={() => setSlot(s => ({ ...s, time: id }))}
                      className={`rounded-xl border-2 bg-white p-3 text-center ${slot.time === id ? 'border-orange bg-[#FFF4F0]' : 'border-transparent shadow-sm'}`}>
                      <div className="text-sm font-extrabold">{label}</div>
                      <div className="text-xs font-bold text-orange">{hours}</div>
                      {extra ? <div className="mt-1 text-[10px] text-navy/50">+ {fees.surcharge} €</div> : null}
                    </button>
                  )
                })}
              </div>
            )}
            <Btn disabled={!(slot.urgent || (slot.date && slot.time))} onClick={() => go(4)}>{t.confirmSlot} <ChevronRight size={18} /></Btn>
          </>
        )}

        {/* ── 4. Contact ── */}
        {step === 4 && (
          <form onSubmit={e => { e.preventDefault(); submit() }}>
            <Header title={t.who} sub={t.whoSub} />
            <Field id="name" label={t.name}><Input id="name" autoComplete="name" value={contact.name} onChange={v => setContact(c => ({ ...c, name: v }))} required /></Field>
            <Field id="phone" label={t.phone} hint={t.phoneHint}><Input id="phone" type="tel" autoComplete="tel" placeholder="+32 4xx xx xx xx" value={contact.phone} onChange={v => setContact(c => ({ ...c, phone: v }))} required /></Field>
            <Field id="address" label={`${t.address} · ${postcode} ${commune ? communeName(commune, lang) : ''}`}><Input id="address" autoComplete="street-address" value={contact.address} onChange={v => setContact(c => ({ ...c, address: v }))} required /></Field>
            <Field id="floor" label={<>{t.floor} <Opt t={t} /></>}><Input id="floor" value={contact.floor} onChange={v => setContact(c => ({ ...c, floor: v }))} /></Field>
            <Field id="email" label={<>{t.email} <Opt t={t} /></>} hint={t.emailHint}><Input id="email" type="email" autoComplete="email" value={contact.email} onChange={v => setContact(c => ({ ...c, email: v }))} /></Field>
            <Field id="desc" label={<>{t.desc} <Opt t={t} /></>}>
              <textarea id="desc" rows={3} placeholder={t.descPh} value={contact.description} onChange={e => setContact(c => ({ ...c, description: e.target.value }))}
                className="w-full rounded-xl border border-black/15 bg-white p-3 text-[15px] focus:border-orange focus:outline-none" />
            </Field>
            <Field id="photo" label={<>{t.photo} <Opt t={t} /></>}>
              <input ref={fileRef} id="photo" type="file" accept="image/*" className="hidden" onChange={onPhoto} />
              {photo ? (
                <div className="relative">
                  <img src={photo} alt="" className="max-h-40 w-full rounded-xl object-cover" />
                  <button type="button" onClick={() => setPhoto(null)} className="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">{t.photoRemove}</button>
                </div>
              ) : (
                <button type="button" onClick={() => fileRef.current?.click()} className="flex w-full flex-col items-center gap-1 rounded-xl border-2 border-dashed border-black/15 bg-white p-4 text-sm text-navy/60">
                  <Camera size={22} className="text-orange" />{t.photoAdd}
                </button>
              )}
            </Field>
            {/* Honeypot: hidden from people, filled by bots */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honey} onChange={e => setHoney(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden="true" />

            <div className="mb-4 rounded-xl border border-black/10 bg-white p-4 text-sm">
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-orange">{t.summary}</div>
              <div className="font-semibold">{trade === 'Autre' ? t.other : t.tradeNames[trade]} — {prestation ? (lang === 'nl' ? prestation.nl : prestation.fr) : otherText.slice(0, 60)}</div>
              <div className="text-navy/70">{slotLabel} · {postcode} {commune ? communeName(commune, lang) : ''}</div>
              {range && <div className="mt-1 font-bold text-green">{t.estimated} : {range.min} € – {range.max} €{surcharge ? ` (${t.withSurcharge(surcharge)})` : ''}</div>}
            </div>
            {status === 'error' && (
              <div className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {t.error}{PHONE && <> {t.errorCall} <a href={PHONE_HREF} className="font-bold underline">{PHONE}</a></>}
              </div>
            )}
            <Btn type="submit" disabled={status === 'sending' || !contact.name.trim() || contact.phone.replace(/\D/g, '').length < 8 || !contact.address.trim()}>
              {status === 'sending' ? t.sending : `${t.submit} →`}
            </Btn>
            <p className="mt-2 text-center text-[11px] text-navy/40">{t.privacy}</p>
          </form>
        )}

        {/* ── 5. Done ── */}
        {step === 5 && (
          <div className="flex flex-col items-center pt-10 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green text-white"><Check size={34} /></div>
            <h1 className="text-2xl font-black">{t.done}</h1>
            <p className="mt-2 text-navy/60">{t.doneSub}</p>
            <div className="mt-5 w-full rounded-xl border border-black/10 bg-white p-4 text-left text-sm">
              <div className="font-semibold">{trade === 'Autre' ? t.other : t.tradeNames[trade]} — {prestation ? (lang === 'nl' ? prestation.nl : prestation.fr) : otherText.slice(0, 60)}</div>
              <div className="text-navy/70">{slotLabel} · {contact.address}, {postcode}</div>
              {range && <div className="font-bold text-green">{range.min} € – {range.max} €</div>}
              <div className="mt-2 inline-block rounded-md bg-black/5 px-2 py-1 text-xs font-bold text-navy/60">{t.ref} : {bookingRef}</div>
            </div>
            <ol className="mt-5 w-full list-none space-y-2 text-left text-sm">
              {t.next.map((n, i) => <li key={n} className="flex gap-3"><span className="font-black text-orange">{i + 1}</span>{n}</li>)}
            </ol>
            {WHATSAPP && (
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`${t.ref} ${bookingRef}`)}`} target="_blank" rel="noopener noreferrer"
                className="mt-6 w-full rounded-xl bg-green py-3.5 font-bold text-white">{t.whatsapp}</a>
            )}
            <Link href={lang === 'nl' ? '/nl' : '/'} className="mt-3 w-full rounded-xl border-2 border-navy py-3 font-bold">{t.home}</Link>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Small UI pieces ────────────────────────────────────── */
function Header({ title, sub }) {
  return (
    <div className="pb-4 pt-5">
      <h1 className="text-2xl font-black leading-tight">{title}</h1>
      {sub && <p className="mt-1 text-[15px] text-navy/55">{sub}</p>}
    </div>
  )
}

function Btn({ children, disabled, onClick, type = 'button' }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className="flex w-full items-center justify-center gap-2 rounded-xl border-0 bg-orange py-4 text-base font-bold text-white shadow-lg shadow-orange/25 transition disabled:opacity-40">
      {children}
    </button>
  )
}

function Radio({ on }) {
  return (
    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${on ? 'border-orange bg-orange' : 'border-black/20'}`}>
      {on && <Check size={13} className="text-white" />}
    </span>
  )
}

function Field({ id, label, hint, children }) {
  return (
    <div className="mb-3.5">
      <label htmlFor={id} className="mb-1 block text-[13px] font-bold">{label}</label>
      {children}
      {hint && <div className="mt-1 text-[11px] text-navy/45">{hint}</div>}
    </div>
  )
}

function Input({ id, value, onChange, type = 'text', ...rest }) {
  return (
    <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} {...rest}
      className="h-12 w-full rounded-xl border border-black/15 bg-white px-3.5 text-[16px] focus:border-orange focus:outline-none" />
  )
}

function Opt({ t }) {
  return <span className="font-normal text-navy/40">{t.optional}</span>
}
