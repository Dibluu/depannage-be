import webpush from 'web-push'

// Web Push to the admin app (installed on the home screen). Subscriptions live in Supabase
// `push_subscriptions`, written only with the service role key — see
// supabase/migrations/20261013_push_subscriptions.sql.
// Env: NEXT_PUBLIC_VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT (mailto:…).

function db(query = '', init = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return fetch(`${url}/rest/v1/push_subscriptions${query}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...init.headers },
    cache: 'no-store',
  })
}

export function pushConfigured() {
  return !!(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

export async function saveSubscription(sub, userAgent) {
  if (!sub?.endpoint?.startsWith('https://') || !sub.keys?.p256dh || !sub.keys?.auth) return false
  const res = await db('?on_conflict=endpoint', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth, user_agent: String(userAgent || '').slice(0, 300) }),
  })
  return !!res?.ok
}

export async function deleteSubscription(endpoint) {
  const res = await db(`?endpoint=eq.${encodeURIComponent(endpoint)}`, { method: 'DELETE' })
  return !!res?.ok
}

// payload: { title, body, url, tag }. Never throws: a failed push must not fail a booking.
export async function pushToAdmins(payload) {
  if (!pushConfigured()) return 0
  try {
    const res = await db('?select=endpoint,p256dh,auth')
    if (!res?.ok) return 0
    const subs = await res.json()
    webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:admin@example.com', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY)
    const results = await Promise.all(subs.map(s =>
      webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify(payload), { TTL: 3600, urgency: 'high' })
        .then(() => true)
        .catch(async err => {
          // 404/410: the device unsubscribed or the app was removed — forget it.
          if (err.statusCode === 404 || err.statusCode === 410) await deleteSubscription(s.endpoint)
          else console.error('push: send failed', err.statusCode, err.body)
          return false
        })
    ))
    return results.filter(Boolean).length
  } catch (err) {
    console.error('push: failed', err)
    return 0
  }
}
