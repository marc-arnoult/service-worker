
var cacheName = 'PWADemo-v1';

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        fromNetWork(e.request, 4000)
            .catch(function () {
                console.log('fromCache here');
                return fromCache(e.request)
            })
        /*caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })*/
    );
});

function fromNetWork(request, timeout) {
    return new Promise(function (fulfill, reject) {
        let timeoutID = setTimeout(reject, timeout)

        fetch(request)
            .then(function (response) {
                console.log('Network response received', response);
                clearTimeout(timeoutID);
                fulfill(response);

                updateCache(request, response.clone())
            }, reject)
    })
}

function fromCache(request) {
    console.log('request from the cache');
    return caches.open(cacheName)
        .then(function (cache) {
            return cache.match(request)
                .then(function (matching) {
                    console.log('matching', matching);
                    return matching || Promise.reject('no match');
                })
        })
}

function updateCache(request, response) {
    console.log('update cache');
    caches.open(cacheName)
        .then(function (cache) {
            cache.put(request.url, response);
        })
}