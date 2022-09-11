const CACHE_NAME = 'iris-utilities.com-v1.0.5';

const URLS_TO_CACHE = [
    '/',
    '/root/css/style.css',
    '/root/js/script.js'
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed', event);
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Opened Cache', CACHE_NAME);

            return cache.addAll(URLS_TO_CACHE);
        }).then((event) => {
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (CACHE_NAME.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // console.log("Service Worker: Fetched", event);

    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
