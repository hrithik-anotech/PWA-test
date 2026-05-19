"use client";

export const PWA_DISMISS_DELAY_MS =
  24 * 60 * 60 * 1000;

export const PWA_STORAGE_KEYS = {
  dismissedAt: "snibto-pwa-install-dismissed-at",
  installed: "snibto-pwa-installed",
};

export type PWAAnalyticsEvent =
  | "sw_register_started"
  | "sw_register_success"
  | "sw_register_failed"
  | "install_prompt_available"
  | "install_prompt_opened"
  | "install_prompt_accepted"
  | "install_prompt_dismissed"
  | "install_prompt_unavailable"
  | "ios_install_guide_opened"
  | "app_installed";

export function isBrowser() {
  return typeof window !== "undefined";
}

export function isLocalhost(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]"
  );
}

export function isServiceWorkerSafeContext() {
  if (!isBrowser()) {
    return false;
  }

  return (
    window.isSecureContext ||
    isLocalhost(window.location.hostname)
  );
}

export function trackPWAEvent(
  event: PWAAnalyticsEvent,
  payload?: Record<string, unknown>
) {
  console.info("[pwa]", event, payload ?? {});

  // Analytics placeholder:
  // window.gtag?.("event", event, payload);
  // analytics.track(event, payload);
}

export function registerServiceWorker() {
  if (!isBrowser() || !("serviceWorker" in navigator)) {
    return () => {};
  }

  if (!isServiceWorkerSafeContext()) {
    trackPWAEvent("sw_register_failed", {
      reason: "insecure-context",
      origin: window.location.origin,
    });

    return () => {};
  }

  const register = () => {
    trackPWAEvent("sw_register_started");

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        trackPWAEvent("sw_register_success", {
          scope: registration.scope,
        });
      })
      .catch((error) => {
        trackPWAEvent("sw_register_failed", {
          message:
            error instanceof Error
              ? error.message
              : "Unknown service worker error",
        });
      });
  };

  if (document.readyState === "complete") {
    register();
    return () => {};
  }

  window.addEventListener("load", register, {
    once: true,
  });

  return () => {
    window.removeEventListener("load", register);
  };
}
