/* ==========================================================================
   sw.js — offline support.
   App shell is cached on install; Google Fonts are cached the first time they
   load. Bump CACHE_VERSION on every deploy or she keeps the old app.
   ========================================================================== */

const CACHE_VERSION = 'v5';
const SHELL_CACHE = `imona-shell-${CACHE_VERSION}`;
const FONT_CACHE = `imona-fonts-${CACHE_VERSION}`;

const SHELL_ASSETS = [
  './',
  './index.html',
  './app.css',
  './app.js',
  './lib/fx.js',
  './lib/i18n.js',
  './lib/store.js',
  './lib/keypad.js',
  './lib/learn.js',
  './lib/practice.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      // cache:'reload' is essential, not a nicety. GitHub Pages serves
      // Cache-Control: max-age=600, so a plain addAll() reads from the browser's
      // HTTP cache and fills the brand-new cache with up-to-10-minute-old files
      // -- bumping CACHE_VERSION would then ship nothing.
      .then(cache => cache.addAll(
        SHELL_ASSETS.map(url => new Request(url, { cache: 'reload' }))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== SHELL_CACHE && k !== FONT_CACHE)
            .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Google Fonts: cache-first, populated on the first online load.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then(async (cache) => {
        const hit = await cache.match(request);
        if (hit) return hit;
        try {
          const res = await fetch(request);
          cache.put(request, res.clone());
          return res;
        } catch (e) {
          return hit || Response.error();      // offline and never cached: fall back to system fonts
        }
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // App shell: cache-first, refresh the copy in the background.
  event.respondWith(
    caches.match(request).then((hit) => {
      const network = fetch(request, { cache: 'no-cache' }).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then(c => c.put(request, copy));
        }
        return res;
      }).catch(() => hit);

      return hit || network;
    })
  );
});
