
// KILL SWITCH SERVICE WORKER PUBLIC

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => caches.delete(key)));
    }).then(() => {
      self.clients.claim();
      self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage({ type: 'FORCE_RELOAD' }));
      });
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
