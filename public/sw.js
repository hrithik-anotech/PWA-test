const CACHE_VERSION = "snibto-pwa-v16";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const STATIC_ASSETS = [
  "/offline.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-icon-512.png",
  "/icons/apple-touch-icon.png",
  "/images/logos/splash-logo.webp",
  "/images/logos/login-logo.webp",
  "/images/login/profile-placeholder.png",
  "/images/helper.webp",
  "/images/icons/nav-home.svg",
  "/images/icons/nav-book.svg",
  "/images/icons/nav-wallet.svg"
];

const isHttpRequest = (request) =>
  request.url.startsWith("http://") ||
  request.url.startsWith("https://");

const isRedirectResponse = (response) =>
  response && response.status >= 300 && response.status < 400;

const matchCache = async (request) => {
  const cacheNames = await caches.keys();

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const response = await cache.match(request);

    if (response == null) {
      continue;
    }

    if (isRedirectResponse(response)) {
      await cache.delete(request);
      continue;
    }

    return response;
  }

  return null;
};

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
      .then(async () => {
        const cleanupCaches = [STATIC_CACHE, RUNTIME_CACHE];

        await Promise.all(
          cleanupCaches.map(async (cacheName) => {
            const cache = await caches.open(cacheName);
            await cache.delete(new Request("/"));
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

const getPushNotificationPayload = (event) => {
  const fallbackPayload = {
    title: "Snibto",
    body: "You have a new update.",
    url: "/"
  };

  if (!event.data) {
    return fallbackPayload;
  }

  const text = event.data.text();

  try {
    return {
      ...fallbackPayload,
      ...JSON.parse(text)
    };
  } catch {
    return {
      ...fallbackPayload,
      body: text || fallbackPayload.body
    };
  }
};

self.addEventListener("push", (event) => {
  const payload = getPushNotificationPayload(event);

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: payload.icon || "/icons/icon-192.png",
      badge: payload.badge || "/icons/icon-192.png",
      data: {
        url: payload.url || "/"
      }
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const matchingClient = clientList.find((client) =>
          "focus" in client && new URL(client.url).origin === self.location.origin
        );

        if (matchingClient) {
          return matchingClient.focus();
        }

        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }

        return undefined;
      })
  );
});

const fetchNavigation = async (request) => {
  const cachedPage = await matchCache(request);

  try {
    const response = await fetch(request);

    if (response) {
      return response;
    }

    throw new Error("No response received");
  } catch {
    if (cachedPage) {
      return cachedPage;
    }

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
  const cachedResponse = await matchCache(request);
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
    event.respondWith(fetchNavigation(request));
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
