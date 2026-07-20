const CACHE = 'beibei-202607200306';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('beibei-tracker.html')) {
    e.respondWith(
      fetch(e.request, {cache: 'no-cache'}).catch(() => caches.match(e.request))
    );
  }
});
