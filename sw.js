
// KILL SWITCH SERVICE WORKER
// Ce script force la désinstallation immédiate de tout cache existant

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        console.log('KILL SWITCH: Removing cache', key);
        return caches.delete(key);
      }));
    }).then(() => {
      return self.clients.claim();
    }).then(() => {
      // Force tous les clients (onglets ouverts) à recharger
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage({ type: 'FORCE_RELOAD' }));
      });
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Bypass total du cache : tout passe par le réseau
  e.respondWith(fetch(e.request));
});
