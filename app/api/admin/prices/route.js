import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { isAdminRequest } from '../../../../lib/admin-session'

// Admin CRUD on price_matrix. Uses the service role key server-side, so the table can be
// read-only for the public (RLS) — see supabase/migrations/20260929_admin_rls.sql.
const TRADES = ['Plomberie', 'Électricité', 'Serrurerie', 'Chauffage']

function db(path, init = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return fetch(`${url}/rest/v1/price_matrix${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=representation', ...init.headers },
    cache: 'no-store',
  })
}

function validRow(b, partial = false) {
  const out = {}
  if (!partial || 'trade' in b) { if (!TRADES.includes(b.trade)) return null; out.trade = b.trade }
  if (!partial || 'problem' in b) { const p = String(b.problem || '').trim().slice(0, 120); if (!p) return null; out.problem = p }
  if (!partial || 'price_min' in b || 'price_max' in b) {
    const min = Number(b.price_min), max = Number(b.price_max)
    if (!Number.isInteger(min) || !Number.isInteger(max) || min < 0 || max <= min || max > 20000) return null
    out.price_min = min; out.price_max = max
  }
  if (!partial || 'duration' in b) out.duration = String(b.duration || '').trim().slice(0, 40)
  if ('active' in b) out.active = !!b.active
  return out
}

async function reply(res) {
  if (!res) return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY non configurée.' }, { status: 503 })
  const data = await res.json().catch(() => null)
  if (!res.ok) return NextResponse.json({ error: 'Erreur base de données.', detail: data }, { status: 502 })
  revalidateTag('prices') // public pages pick up the new grid on next request
  return NextResponse.json(data)
}

async function guard(request) {
  return (await isAdminRequest(request)) ? null : NextResponse.json({ error: 'Non autorisé.' }, { status: 401 })
}

export async function GET(request) {
  const denied = await guard(request); if (denied) return denied
  const res = db('?select=*&order=trade.asc,problem.asc')
  if (!res) return reply(null)
  const r = await res
  const data = await r.json().catch(() => null)
  return r.ok ? NextResponse.json(data) : NextResponse.json({ error: 'Erreur de chargement.' }, { status: 502 })
}

export async function POST(request) {
  const denied = await guard(request); if (denied) return denied
  const row = validRow(await request.json().catch(() => ({})))
  if (!row) return NextResponse.json({ error: 'Données invalides.' }, { status: 422 })
  return reply(await db('', { method: 'POST', body: JSON.stringify({ ...row, active: true }) }))
}

export async function PATCH(request) {
  const denied = await guard(request); if (denied) return denied
  const body = await request.json().catch(() => ({}))
  const id = String(body.id || '')
  const row = validRow(body, true)
  if (!/^[0-9a-f-]{36}$/.test(id) || !row) return NextResponse.json({ error: 'Données invalides.' }, { status: 422 })
  return reply(await db(`?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify({ ...row, updated_at: new Date().toISOString() }) }))
}

export async function DELETE(request) {
  const denied = await guard(request); if (denied) return denied
  const id = new URL(request.url).searchParams.get('id') || ''
  if (!/^[0-9a-f-]{36}$/.test(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 422 })
  return reply(await db(`?id=eq.${id}`, { method: 'DELETE' }))
}
