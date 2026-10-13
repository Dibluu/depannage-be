import { NextResponse } from 'next/server'
import { isAdminRequest } from '../../../../lib/admin-session'
import { saveSubscription, deleteSubscription, pushConfigured, pushToAdmins } from '../../../../lib/push'

// Admin app: register this device for new-booking notifications, unregister it, or send a test.
export async function POST(request) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: 'auth' }, { status: 401 })
  if (!pushConfigured()) return NextResponse.json({ error: 'Notifications non configurées (clés VAPID).' }, { status: 503 })
  const body = await request.json().catch(() => ({}))
  if (body.test) {
    const sent = await pushToAdmins({ title: 'Notifications activées', body: 'Vous serez prévenu à chaque nouvelle demande.', url: '/admin/demandes', tag: 'test' })
    return NextResponse.json({ sent })
  }
  const ok = await saveSubscription(body.subscription, request.headers.get('user-agent'))
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Abonnement refusé.' }, { status: 422 })
}

export async function DELETE(request) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: 'auth' }, { status: 401 })
  const { endpoint } = await request.json().catch(() => ({}))
  if (typeof endpoint !== 'string') return NextResponse.json({ error: 'invalid' }, { status: 422 })
  return NextResponse.json({ ok: await deleteSubscription(endpoint) })
}
