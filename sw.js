const CACHE_NAME = 'jack-restaurant-v7';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap'
];

// Install event - cache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: Caching critical assets');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin and non-GET requests
  if (event.request.method !== 'GET' || event.request.url.includes('chrome-extension')) {
    return;
  }

  const urlNoQuery = new URL(event.request.url);
  urlNoQuery.search = '';
  const strippedRequest = new Request(urlNoQuery.toString(), { method: 'GET' });

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;

      // Try cache without query string (handles ?v= cache-busting)
      return caches.match(strippedRequest).then(resp2 => {
        if (resp2) return resp2;

        return fetch(event.request).then(networkResp => {
          if (!networkResp || networkResp.status !== 200 || networkResp.type !== 'basic') {
            return networkResp;
          }
          const respToCache = networkResp.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, respToCache);
          });
          return networkResp;
        }).catch(() => caches.match('/index.html'));
      });
    })
  );
});

// Message handler for cache updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
