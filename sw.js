const CACHE_NAME = 'kasir-pempek-v1';

// Menggunakan pola Network-First: 
// Selalu ambil data terbaru dari internet agar tidak terjadi sinkronisasi yang gagal.
self.addEventListener('fetch', (event) => {
  // Abaikan request ke Google Script agar data selalu real-time
  if (event.request.url.includes("script.google.com")) {
    return;
  }
  
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
});