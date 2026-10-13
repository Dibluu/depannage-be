import { NextResponse } from 'next/server'
import { isAdminRequest } from '../../../../lib/admin-session'
import { whatsappLinkFor } from '../../../../lib/bookings'

// Admin app: list bookings and move them through the statuses. Service role key server-side;
// the bookings table has no public policy.
const STATUSES = ['nouveau', 'confirme', 'termine', 'annule']

function supabase(path, init = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return fetch(`${url}${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...init.headers },
    cache: 'no-store',
  })
}

// Private bucket: hand the app short-lived links to the photos.
async function signPhotos(rows) {
  const paths = rows.map(r => r.photo_url).filter(Boolean)
  if (!paths.length) return {}
  const res = await supabase('/storage/v1/object/sign/booking-photos', { method: 'POST', body: JSON.stringify({ expiresIn: 3600, paths }) })
  if (!res?.ok) return {}
  const signed = await res.json()
  return Object.fromEntries(signed.filter(s => s.signedURL).map(s => [s.path, `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1${s.signedURL}`]))
}

export async function GET(request) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: 'auth' }, { status: 401 })
  const res = await supabase('/rest/v1/bookings?select=*&order=created_at.desc&limit=200')
  if (!res) return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY non configurée.' }, { status: 503 })
  if (!res.ok) return NextResponse.json({ error: 'Erreur base de données.' }, { status: 502 })
  const rows = await res.json()
  const photos = await signPhotos(rows)
  return NextResponse.json(rows.map(r => ({ ...r, whatsapp: whatsappLinkFor(r), photo: photos[r.photo_url] || null })))
}

export async function PATCH(request) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: 'auth' }, { status: 401 })
  const { ref, status } = await request.json().catch(() => ({}))
  if (typeof ref !== 'string' || !STATUSES.includes(status)) return NextResponse.json({ error: 'invalid' }, { status: 422 })
  const res = await supabase(`/rest/v1/bookings?ref=eq.${encodeURIComponent(ref)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ status }),
  })
  if (!res) return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY non configurée.' }, { status: 503 })
  return res.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Erreur base de données.' }, { status: 502 })
}
