const CACHE_NAME = 'iris-utilities.com-v1.1.0';

const URLS_TO_CACHE = [
    '/',
    '/root/css/style.css',
    '/root/js/script.js',
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed', event);

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Opened cache', CACHE_NAME, cache);
            console.log('Service Worker: Adding urls to cache', URLS_TO_CACHE);

            return cache.addAll(URLS_TO_CACHE);
        }).then((event) => {
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated', event);

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
    console.log("Service Worker: Fetched", event);

    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log('Service Worker: Found in cache', event.request.url, response);
                return response;
            }

            console.log('Service Worker: Fetching', event.request.url);
            return fetch(event.request);
        }).catch((error) => {
            console.log('Service Worker: Error fetching and caching', error);
        })
    );
});
