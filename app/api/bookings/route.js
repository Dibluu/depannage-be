import { NextResponse } from 'next/server'
import { loadCatalog, FEES, surchargeFor } from '../../../lib/pricing'
import { communeByPostcode } from '../../../lib/geo'

// Booking intake. Prices are recomputed here from the catalogue — the client's numbers are never trusted.
// Storage: Supabase `bookings` (service role key if set, otherwise anon key + insert policy).
// Notification: Resend email to BOOKING_NOTIFY_EMAIL when RESEND_API_KEY is set.

const TRADES = ['Serrurerie', 'Plomberie', 'Électricité', 'Chauffage', 'Autre']
const clean = (v, max = 300) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max)

function makeRef() {
  const d = new Date()
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  return `DEP-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

async function supabaseFetch(path, init) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return fetch(`${url}${path}`, { ...init, headers: { apikey: key, Authorization: `Bearer ${key}`, ...init.headers } })
}

async function uploadPhoto(ref, dataUrl) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !dataUrl?.startsWith('data:image/jpeg;base64,')) return null
  const bytes = Buffer.from(dataUrl.split(',')[1], 'base64')
  if (bytes.length > 3 * 1024 * 1024) return null
  const path = `${ref}.jpg`
  const res = await supabaseFetch(`/storage/v1/object/booking-photos/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'image/jpeg', 'x-upsert': 'true' },
    body: bytes,
  })
  return res?.ok ? path : null
}

async function notify(b) {
  const key = process.env.RESEND_API_KEY
  const to = process.env.BOOKING_NOTIFY_EMAIL
  if (!key || !to) return false
  const lines = [
    `Réf. ${b.ref} — ${b.urgent ? 'URGENT' : `${b.slot_date} ${b.slot_time}`}`,
    `${b.trade} — ${b.problem}`,
    b.price_min ? `Prix annoncé : ${b.price_min}–${b.price_max} € (majoration incluse : ${b.surcharge} €)` : 'Sur devis',
    `${b.name} — ${b.phone}${b.email ? ` — ${b.email}` : ''}`,
    `${b.address}, ${b.postcode} ${b.commune}${b.floor ? ` (${b.floor})` : ''}`,
    b.description && `Précisions : ${b.description}`,
  ].filter(Boolean)
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // Without a verified domain, Resend's test sender only delivers to the account owner's address.
      from: process.env.BOOKING_FROM_EMAIL || 'Dépannage.be <onboarding@resend.dev>',
      to: [to],
      subject: `${b.urgent ? '⚡ ' : ''}Nouvelle demande ${b.trade} — ${b.commune} (${b.ref})`,
      text: lines.join('\n'),
    }),
  }).catch(() => null)
  return !!res?.ok
}

export async function POST(request) {
  let body
  try { body = await request.json() } catch { return NextResponse.json({ error: 'invalid' }, { status: 400 }) }

  // Honeypot filled → pretend success, store nothing.
  if (body.website) return NextResponse.json({ ref: makeRef() })

  const trade = TRADES.includes(body.trade) ? body.trade : null
  const commune = communeByPostcode(body.postcode)
  const name = clean(body.contact?.name, 120)
  const phone = clean(body.contact?.phone, 40)
  const address = clean(body.contact?.address, 200)
  if (!trade || !commune || !name || phone.replace(/\D/g, '').length < 8 || !address) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 422 })
  }

  const catalog = await loadCatalog()
  const prestation = trade !== 'Autre' ? catalog[trade]?.find(p => p.id === body.prestation) : null
  const slot = body.slot?.urgent
    ? { urgent: true }
    : { urgent: false, date: clean(body.slot?.date, 10), time: ['matin', 'apres-midi', 'soir'].includes(body.slot?.time) ? body.slot.time : null }
  if (!slot.urgent && !(/^\d{4}-\d{2}-\d{2}$/.test(slot.date) && slot.time)) {
    return NextResponse.json({ error: 'invalid_slot' }, { status: 422 })
  }
  const surcharge = prestation ? surchargeFor(trade, slot) : 0
  const ref = makeRef()

  const booking = {
    ref,
    lang: body.lang === 'nl' ? 'nl' : 'fr',
    trade,
    problem: prestation ? prestation.fr : clean(body.otherText, 500),
    prestation_id: prestation?.id || null,
    price_min: prestation ? prestation.min + surcharge : null,
    price_max: prestation ? prestation.max + surcharge : null,
    surcharge,
    travel_fee: FEES[trade]?.travel ?? null,
    urgent: !!slot.urgent,
    slot_date: slot.urgent ? 'urgent' : slot.date,
    slot_time: slot.urgent ? 'urgent' : slot.time,
    name,
    phone,
    email: clean(body.contact?.email, 160) || null,
    address,
    floor: clean(body.contact?.floor, 120) || null,
    postcode: commune.postcodes.includes(String(body.postcode)) ? String(body.postcode) : commune.postcodes[0],
    commune: commune.nameFr,
    region: commune.region,
    description: clean(body.contact?.description, 1000) || null,
    source: clean(body.source, 300) || null,
    status: 'nouveau',
  }

  const res = await supabaseFetch('/rest/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(booking),
  })
  if (!res) {
    // No database configured: the email is then the only record — fail loudly if it can't be sent.
    if (await notify(booking)) return NextResponse.json({ ref })
    console.error('bookings: neither Supabase nor Resend configured', ref)
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }
  if (!res.ok) {
    console.error('bookings: insert failed', res.status, await res.text().catch(() => ''))
    return NextResponse.json({ error: 'storage_failed' }, { status: 502 })
  }

  const photoPath = await uploadPhoto(ref, body.photo)
  if (photoPath) {
    await supabaseFetch(`/rest/v1/bookings?ref=eq.${encodeURIComponent(ref)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ photo_url: photoPath }),
    })
  }
  await notify({ ...booking })

  return NextResponse.json({ ref })
}
