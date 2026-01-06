
const CACHE_NAME = 'stroller-cache-v6';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
  // L'image externe est retirée du pré-cache 'install' pour éviter les erreurs CORS fatales.
  // Elle sera mise en cache dynamiquement lors de son premier chargement via le 'fetch' handler.
];

// Installation
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  // Navigation principale (HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then((response) => {
        return response || fetch(event.request).catch(() => {
           return caches.match('/index.html');
        });
      })
    );
    return;
  }

  // Autres ressources
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        // Support des réponses opaques (no-cors) pour les images externes
        if (!networkResponse || (networkResponse.status !== 200 && networkResponse.type !== 'opaque')) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          try {
            if (event.request.method === 'GET' && !event.request.url.startsWith('chrome-extension')) {
              cache.put(event.request, responseToCache);
            }
          } catch (err) {
            // Ignorer erreurs
          }
        });

        return networkResponse;
      }).catch(() => {
        return null;
      });
    })
  );
});
