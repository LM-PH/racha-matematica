const CACHE_NAME = 'racha-mat-v4';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/home.mp3',
  '/game.mp3',
  '/favicon.svg'
];

// Install: Cache static assets and skip waiting
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

// Fetch: Strategy for different types of requests
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 1. Navigation requests (HTML pages) -> Network First, fallback to cached index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // 2. Static assets (images, music) -> Cache First
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
    return;
  }

  // 3. All other requests (JS, CSS, API) -> Network Only (or Cache then Network if desired)
  // We don't cache hashed JS/CSS here because we can't easily track their names without a build step tool.
  // However, browser's default cache will handle them.
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
