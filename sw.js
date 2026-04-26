// ══════════════════════════════════════════════
//  SERVICE WORKER — Escala Ministério PWA
// ══════════════════════════════════════════════
const CACHE_NAME = 'escala-ministerio-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// ── INSTALL ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ── ACTIVATE ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── FETCH (cache-first for assets) ──
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        return response;
      }).catch(() => caches.match('/index.html'));
    })
  );
});

// ── PUSH NOTIFICATIONS ──
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title   = data.title   || 'Escala Ministério';
  const options = {
    body:    data.body    || 'Você tem uma nova notificação.',
    icon:    data.icon    || '/icons/icon-192.png',
    badge:   '/icons/icon-192.png',
    vibrate: [200, 100, 200],
    data:    { url: data.url || '/' },
    actions: [
      { action: 'open',    title: 'Ver agora' },
      { action: 'dismiss', title: 'Dispensar' },
    ],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// ── NOTIFICATION CLICK ──
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(all => {
      for (const client of all) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// ── BACKGROUND SYNC (check all availability ready) ──
self.addEventListener('sync', event => {
  if (event.tag === 'check-availability') {
    event.waitUntil(checkAvailabilitySync());
  }
});

async function checkAvailabilitySync() {
  // In a real backend, this would call an API endpoint
  // For now, we trigger a local notification
  const allClients = await clients.matchAll();
  allClients.forEach(client => {
    client.postMessage({ type: 'SYNC_CHECK' });
  });
}
