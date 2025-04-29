// Service Worker for NCPSS PWA
const CACHE_NAME = 'ncpss-cache-v2';
const OFFLINE_URL = '/static/pwa/offline.html';

// List of static assets to cache
// This list should include all the files that are needed for the app to work offline
// and should be updated whenever the app is updated.
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/pages/admission.html',
  '/pages/introduction.html',
  '/components/navbar.html',
  '/components/footer.html',
  '/css/style.css',
  '/js/script.js',
  '/manifest.json',
  OFFLINE_URL
];
// INSTALL
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});
//  ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});
// FETCH (dynamic caching + fallback)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then(cached => cached || caches.match(OFFLINE_URL)))
  );
});
