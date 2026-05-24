const CACHE_VERSION = "snibto-pwa-v11";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const STATIC_ASSETS = [
  "/",
  "/offline.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-icon-512.png",
  "/icons/apple-touch-icon.png"
];

const isHttpRequest = (request) =>
  request.url.startsWith("http://") ||
  request.url.startsWith("https://");

const addAssetsToCache = async () => {
  const cache = await caches.open(STATIC_CACHE);

  await Promise.allSettled(
    STATIC_ASSETS.map((url) =>
      cache.add(new Request(url, { cache: "reload" }))
    )
  );
};

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(addAssetsToCache());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) =>
              cacheName.startsWith("snibto-pwa-")
            )
            .filter(
              (cacheName) =>
                cacheName !== STATIC_CACHE &&
                cacheName !== RUNTIME_CACHE
            )
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

const staleWhileRevalidateNavigation = async (request) => {
  const cachedPage = await caches.match(request);

  const networkResponsePromise = fetch(request)
    .then(async (response) => {
      if (response && response.ok) {
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, response.clone());
      }

      return response;
    })
    .catch((error) => {
      if (cachedPage) {
        return cachedPage;
      }

      throw error;
    });

  if (cachedPage) {
    return cachedPage;
  }

  try {
    return await networkResponsePromise;
  } catch {
    const offlinePage = await caches.match("/offline.html");

    return (
      cachedPage ||
      offlinePage ||
      new Response("You are offline.", {
        status: 503,
        headers: { "Content-Type": "text/plain" }
      })
    );
  }
};

const staleWhileRevalidate = async (request) => {
  const cachedResponse = await caches.match(request);
  const cache = await caches.open(RUNTIME_CACHE);

  const networkResponsePromise = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone());
      }

      return response;
    })
    .catch(() => cachedResponse);

  return cachedResponse || networkResponsePromise;
};

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET" || !isHttpRequest(request)) {
    return;
  }

  const requestUrl = new URL(request.url);

  // Allow caching for both local origin and ImageKit domain
  if (
    requestUrl.origin !== self.location.origin &&
    requestUrl.hostname !== "ik.imagekit.io"
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(staleWhileRevalidateNavigation(request));
    return;
  }

  const shouldCache =
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image" ||
    request.destination === "font" ||
    requestUrl.pathname === "/manifest.json" ||
    requestUrl.pathname.startsWith("/icons/");

  if (!shouldCache) {
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
