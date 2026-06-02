const CACHE = "securevault-v1";

const files = [
    "./",
    "./index.html",
    "./dashboard.html",
    "./users.html",
    "./generator.html",
    "./settings.html",
    "./style.css",
    "./app.js"
];

self.addEventListener("install", e => {

    e.waitUntil(

        caches.open(CACHE)

        .then(cache => {

            return cache.addAll(files);

        })

    );

});

self.addEventListener("fetch", e => {

    e.respondWith(

        caches.match(e.request)

        .then(response => {

            return response || fetch(e.request);

        })

    );

});