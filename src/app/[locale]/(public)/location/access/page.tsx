"use client";

import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { markForwardNavigation } from "@/lib/navigation-transition";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "loading" | "blocked" | "error";
type LocationSource = "gps" | "ip" | "default";
type DeviceType = "ios" | "android" | "other";

const IP_FALLBACK_URL = "https://ipapi.co/json/";

const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1);
  const isSafari =
    /Safari/i.test(userAgent) &&
    !/CriOS|FxiOS|EdgiOS|OPiOS|Chrome|Android/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  let deviceType: DeviceType = "other";
  if (isIOS) deviceType = "ios";
  else if (isAndroid) deviceType = "android";

  return {
    isIOS,
    isSafari,
    isAndroid,
    deviceType,
    isSecureContext: window.isSecureContext,
    userAgent,
  };
};

const subscribeToDeviceType = () => () => {};

const getDeviceTypeSnapshot = () =>
  typeof window === "undefined"
    ? "other"
    : getBrowserInfo().deviceType;

const getServerDeviceTypeSnapshot = (): DeviceType =>
  "other";

const getLocationOptions = () => {
  const { isSafari } = getBrowserInfo();

  return {
    enableHighAccuracy: !isSafari,
    timeout: isSafari ? 25000 : 30000,
    maximumAge: isSafari ? 300000 : 60000,
  };
};

export default function LocationAccessPage() {
  const t = useTranslations('LocationAccess');
  const router = useRouter();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const deviceType = useSyncExternalStore(
    subscribeToDeviceType,
    getDeviceTypeSnapshot,
    getServerDeviceTypeSnapshot
  );

  const retryCountRef = useRef(0);
  const hasNavigatedRef = useRef(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestLocationRef = useRef<() => void>(() => { });

  // ───────────────── HELPERS ─────────────────

  const log = (label: string, data?: unknown) => {
    console.log(`[location] ${label}`, data || "");
  };

  // ───────────────── DETECT DEVICE & SCREEN ─────────────────

  // ───────────────── NAVIGATE ─────────────────

  const goToMap = useCallback(
    (
      latitude: number,
      longitude: number,
      source: LocationSource
    ) => {
      if (hasNavigatedRef.current) return;

      hasNavigatedRef.current = true;

      const payload = {
        latitude,
        longitude,
        source,
        timestamp: Date.now(),
      };

      log("saving location", payload);

      try {
        localStorage.setItem(
          "user_location",
          JSON.stringify(payload)
        );
      } catch (error) {
        log("location storage error", error);
      }

      setStatus("idle");

      markForwardNavigation();
      router.push("/location/map");
    },
    [router]
  );

  // ───────────────── IP FALLBACK ─────────────────

  const fetchIPFallback = useCallback(async () => {
    try {
      const res = await fetch(IP_FALLBACK_URL);

      const data = await res.json();

      log("ip fallback", data);

      if (data.latitude && data.longitude) {
        goToMap(
          Number(data.latitude),
          Number(data.longitude),
          "ip"
        );

        return;
      }
    } catch (error) {
      log("ip fallback error", error);
    }

    // India fallback
    goToMap(20.5937, 78.9629, "default");
  }, [goToMap]);

  // ───────────────── SUCCESS ─────────────────

  const handleSuccess = useCallback(
    (position: GeolocationPosition) => {
      log("gps success", position);

      retryCountRef.current = 0;

      setErrorMessage("");

      goToMap(
        position.coords.latitude,
        position.coords.longitude,
        "gps"
      );
    },
    [goToMap]
  );

  // ───────────────── REQUEST LOCATION ─────────────────

  const requestLocation = useCallback(() => {
    const browserInfo = getBrowserInfo();
    const locationOptions = getLocationOptions();

    log("requesting location", {
      browserInfo,
      locationOptions,
    });

    navigator.geolocation.getCurrentPosition(
      handleSuccess,

      (error) => {
        log("gps error", {
          code: error.code,
          message: error.message,
          retry: retryCountRef.current,
        });

        if (error.code === 1) {
          setStatus("blocked");
          return;
        }

        const maxRetries = browserInfo.isSafari ? 1 : 2;

        if (retryCountRef.current < maxRetries) {
          retryCountRef.current += 1;

          setErrorMessage(
            retryCountRef.current === 1
              ? t('errorAccessing')
              : t('errorRetrying')
          );

          retryTimeoutRef.current = setTimeout(() => {
            requestLocationRef.current();
          }, browserInfo.isIOS ? 2500 : 1500);

          return;
        }

        if (browserInfo.isSafari || browserInfo.isIOS) {
          setErrorMessage(
            browserInfo.isSafari
              ? t('errorSafari')
              : t('errorOtherBrowser')
          );
          void fetchIPFallback();
          return;
        }

        // GPS unavailable

        if (error.code === 2) {
          setErrorMessage(
            t('errorTurnOn')
          );

          setStatus("error");

          return;
        }

        // Timeout

        if (error.code === 3) {
          setErrorMessage(
            t('errorTimeout')
          );

          setStatus("error");

          return;
        }

        // Unknown

        setErrorMessage(
          t('errorUnable')
        );

        setStatus("error");
      },

      locationOptions
    );
  }, [handleSuccess, fetchIPFallback, t]);

  useEffect(() => {
    requestLocationRef.current = requestLocation;
  }, [requestLocation]);

  // ───────────────── MAIN BUTTON ─────────────────

  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setErrorMessage(
        t('errorSupported')
      );

      setStatus("error");

      return;
    }

    const browserInfo = getBrowserInfo();

    retryCountRef.current = 0;

    hasNavigatedRef.current = false;

    setErrorMessage("");

    setStatus("loading");

    if (!browserInfo.isSecureContext) {
      log("insecure context, using fallback", browserInfo);
      setErrorMessage(
        t('errorSecure')
      );
      void fetchIPFallback();
      return;
    }

    requestLocation();
  }, [requestLocation, fetchIPFallback, t]);

  const handleSkip = useCallback(() => {
    hasNavigatedRef.current = false;
    setErrorMessage("");
    setStatus("loading");
    void fetchIPFallback();
  }, [fetchIPFallback]);

  // ───────────────── RETURN FROM SETTINGS ─────────────────

  useEffect(() => {
    if (status !== "blocked") return;

    const retryWhenVisible = () => {
      if (document.visibilityState !== "visible") return;

      log("app visible again, retrying");

      retryCountRef.current = 0;

      setStatus("loading");

      requestLocation();
    };

    document.addEventListener(
      "visibilitychange",
      retryWhenVisible
    );

    window.addEventListener("focus", retryWhenVisible);
    window.addEventListener("pageshow", retryWhenVisible);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        retryWhenVisible
      );

      window.removeEventListener(
        "focus",
        retryWhenVisible
      );

      window.removeEventListener(
        "pageshow",
        retryWhenVisible
      );
    };
  }, [status, requestLocation]);

  // ───────────────── CLEANUP ─────────────────

  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  const isLoading = status === "loading";
  const isBlocked = status === "blocked";


  return (
    <main
      className="flex min-h-screen w-full flex-col bg-[#f8f8f8]"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with safe area */}
      <div
        className="flex-shrink-0 px-4 sm:px-6 pt-4"
        style={{
          paddingTop: `max(1.5rem, calc(env(safe-area-inset-top) + 1rem))`
        }}
      >
        <h1 className="text-xl sm:text-2xl font-medium tracking-tight text-black leading-tight">
          {t('title')}{" "}
          <span className="text-[#6C35FF]">
            {t('location')}
          </span>
        </h1>
      </div>

      {/* Image Container - Responsive */}
      <div
        className="relative flex-1 mt-4 sm:mt-6 w-full overflow-hidden min-h-[14rem]"
      >
        <Image
          src="/images/login/city.jpg"
          alt="city"
          fill
          priority
          className="object-cover w-full h-full"
          sizes="100vw"
        />
      </div>

      {/* Bottom Section - Flexes to fill remaining space */}
      <div
        className="flex-shrink-0 flex flex-col items-center justify-end px-4 sm:px-6 pb-4"
        style={{
          paddingBottom: `max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))`,
        }}
      >
        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3">
          {/* Primary Button - Increased touch target */}
          <button
            onClick={handleGetLocation}
            disabled={isLoading}
            className="flex h-14 sm:h-16 mt-2 w-full items-center justify-center gap-2 rounded-full bg-[#6C35FF] text-base sm:text-lg font-semibold text-white transition-all active:scale-95 disabled:opacity-60 disabled:active:scale-100 touch-highlight-transparent"
            style={{
              minHeight: "44px", // iOS minimum touch target
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <Image
              alt="location logo"
              src="/images/login/location-fill.svg"
              width={20}
              height={20}
            />

            <span className="truncate">
              {isLoading
                ? t('fetching')
                : t('useCurrent')}
            </span>
          </button>

          {/* Secondary Button */}
          <button
            onClick={handleSkip}
            disabled={isLoading}
            className="h-12 sm:h-14 w-full text-sm sm:text-base font-medium text-gray-500 underline underline-offset-2 transition-opacity active:opacity-60 disabled:opacity-40"
            style={{
              minHeight: "44px",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {t('skip')}
          </button>

          {/* Error Message - Responsive text */}
          {errorMessage && (
            <div className="mt-4 p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-center text-xs sm:text-sm text-red-600 leading-relaxed">
                {errorMessage}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Permission Modal - Responsive */}
      {isBlocked && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40 backdrop-blur-sm p-4 sm:p-6">
          <div className="w-full max-w-md mx-auto rounded-t-3xl sm:rounded-3xl bg-white px-4 sm:px-6 pb-6 sm:pb-8 pt-6">
            {/* Handle bar - visible only on mobile */}
            <div className="block sm:hidden mx-auto mb-5 h-1.5 w-14 rounded-full bg-gray-300" />

            {/* Content */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#6C35FF]/10">
                <Image
                  src="/images/login/location-fill.svg"
                  alt="location"
                  width={24}
                  height={24}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-black">
                  {t('modalTitle')}
                </h3>

                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  {deviceType === "ios"
                    ? t('modalDescIos')
                    : t('modalDescOther')}
                </p>
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setStatus("idle")}
                className="h-12 sm:h-14 w-full rounded-full bg-[#6C35FF] text-base sm:text-lg font-semibold text-white transition-all active:scale-95"
                style={{
                  minHeight: "44px",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {t('modalEnable')}
              </button>

              <button
                onClick={handleSkip}
                className="h-12 sm:h-14 w-full rounded-full border-2 border-gray-200 text-base sm:text-lg font-semibold text-gray-700 transition-all active:scale-95 bg-white"
                style={{
                  minHeight: "44px",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {t('modalSkip')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard spacer for iOS */}
      {deviceType === "ios" && (
        <div
          style={{
            height: "env(keyboard-inset-height)",
          }}
        />
      )}
    </main>
  );
}
