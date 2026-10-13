// Service worker of the admin app (registered by /admin/demandes with scope /admin/).
// Only handles push notifications: no offline cache, the list must always be live.

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {}
  event.waitUntil((async () => {
    await self.registration.showNotification(data.title || 'Nouvelle demande', {
      body: data.body || '',
      tag: data.tag,
      icon: '/app-icon/192',
      badge: '/app-icon/192',
      data: { url: data.url || '/admin/demandes' },
      requireInteraction: true,
    })
    // An open admin window refreshes its list right away.
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    windows.forEach(w => w.postMessage({ type: 'new-booking' }))
  })())
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  const url = new URL(event.notification.data?.url || '/admin/demandes', self.location.origin).href
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    const open = windows.find(w => new URL(w.url).pathname.startsWith('/admin'))
    if (open) {
      await open.focus()
      return open.navigate(url)
    }
    return self.clients.openWindow(url)
  })())
})
