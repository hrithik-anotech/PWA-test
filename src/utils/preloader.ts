type ImageFetchPriority = "high" | "low" | "auto";

type PreloadImagesOptions = {
  concurrency?: number;
  fetchPriority?: ImageFetchPriority;
  timeoutMs?: number;
};

const DEFAULT_PRELOAD_TIMEOUT_MS = 2500;

const COMMON_WARM_IMAGES = [
  "/images/login/profile-placeholder.png",
  "/images/icons/nav-home.svg",
  "/images/icons/nav-book.svg",
  "/images/icons/nav-wallet.svg",
];

const HOME_WARM_IMAGES = [
  "/images/helper.webp",
  "/images/icons/spray.svg",
  "/images/icons/bath.svg",
  "/images/icons/wash.svg",
  "/images/icons/utensils.svg",
  "/images/icons/arrow-left-color.svg",
];

const LOGIN_WARM_IMAGES = [
  "/images/logos/login-logo.webp",
  "/images/login/login-1.webp",
  "/images/login/login-2.webp",
  "/images/login/login-3.webp",
  "/images/login/login-4.webp",
  "/images/login/login-5.webp",
  "/images/login/login-6.webp",
  "/images/login/flag-india.png",
];

const ONBOARDING_WARM_IMAGES = [
  "/images/onboarding/onboarding1.webp",
  "/images/onboarding/onboarding2.webp",
  "/images/onboarding/onboarding3.webp",
];

const LOCATION_WARM_IMAGES = [
  "/images/login/city.jpg",
  "/images/login/location-fill.svg",
];

const ADDRESS_WARM_IMAGES = [
  "/images/location/home.svg",
  "/images/location/friend.svg",
  "/images/location/other.svg",
  "/images/location/location-fill.svg",
];

function preloadImage(
  url: string,
  {
    fetchPriority = "auto",
    timeoutMs = DEFAULT_PRELOAD_TIMEOUT_MS,
  }: PreloadImagesOptions
) {
  return new Promise<void>((resolve) => {
    const img = new Image();

    let settled = false;
    const cleanup = () => {
      if (settled) {
        return;
      }

      settled = true;
      img.onload = null;
      img.onerror = null;
      window.clearTimeout(timeoutId);

      resolve();
    };

    img.decoding = "async";
    img.fetchPriority = fetchPriority;
    img.onload = cleanup;
    img.onerror = cleanup;
    const timeoutId = window.setTimeout(
      cleanup,
      timeoutMs
    );
    img.src = url;
  });
}

export async function preloadImages(
  urls: string[],
  options: PreloadImagesOptions = {}
): Promise<void[]> {
  if (urls.length === 0) {
    return [];
  }

  const concurrency = Math.max(
    1,
    Math.min(options.concurrency ?? 4, urls.length)
  );
  let nextIndex = 0;

  const workers = Array.from(
    { length: concurrency },
    async () => {
      while (nextIndex < urls.length) {
        const url = urls[nextIndex];
        nextIndex += 1;
        await preloadImage(url, options);
      }
    }
  );

  return Promise.all(workers);
}

export function runWhenIdle(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(callback, {
      timeout: 2500,
    });

    return () => window.cancelIdleCallback(idleId);
  }

  const timeoutId = globalThis.setTimeout(callback, 250);

  return () => globalThis.clearTimeout(timeoutId);
}

export function warmImages(
  urls: string[],
  options: PreloadImagesOptions = {}
) {
  return runWhenIdle(() => {
    void preloadImages(urls, {
      concurrency: 2,
      fetchPriority: "low",
      timeoutMs: 8000,
      ...options,
    });
  });
}

export function getWarmImagesForPath(pathname: string) {
  if (pathname.startsWith("/home")) {
    return [...COMMON_WARM_IMAGES, ...HOME_WARM_IMAGES];
  }

  if (pathname.startsWith("/login")) {
    return LOGIN_WARM_IMAGES;
  }

  if (pathname.startsWith("/onboarding")) {
    return ONBOARDING_WARM_IMAGES;
  }

  if (pathname.startsWith("/location")) {
    return LOCATION_WARM_IMAGES;
  }

  if (pathname.startsWith("/address-details")) {
    return ADDRESS_WARM_IMAGES;
  }

  if (pathname.startsWith("/profile")) {
    return COMMON_WARM_IMAGES;
  }

  return COMMON_WARM_IMAGES;
}

export const CRITICAL_IMAGES = [
  "/images/logos/splash-logo.webp",
];
