"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Status = "idle" | "loading" | "blocked" | "error";

type LocationSource = "gps" | "ip" | "default";

const IP_FALLBACK_URL = "https://ipapi.co/json/";

const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1);
  const isSafari =
    /Safari/i.test(userAgent) &&
    !/CriOS|FxiOS|EdgiOS|OPiOS|Chrome|Android/i.test(
      userAgent
    );

  return {
    isIOS,
    isSafari,
    isSecureContext: window.isSecureContext,
    userAgent,
  };
};

const getLocationOptions = () => {
  const { isSafari } = getBrowserInfo();

  return {
    enableHighAccuracy: !isSafari,
    timeout: isSafari ? 25000 : 30000,
    maximumAge: isSafari ? 300000 : 60000,
  };
};

export default function LocationAccessPage() {
  const router = useRouter();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const retryCountRef = useRef(0);
  const hasNavigatedRef = useRef(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestLocationRef = useRef<() => void>(() => {});

  // ───────────────── HELPERS ─────────────────

  const log = (label: string, data?: unknown) => {
    console.log(`[location] ${label}`, data || "");
  };

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
              ? "Accessing your location..."
              : "Still trying to get location..."
          );

          retryTimeoutRef.current = setTimeout(() => {
            requestLocationRef.current();
          }, browserInfo.isIOS ? 2500 : 1500);

          return;
        }

        if (browserInfo.isSafari || browserInfo.isIOS) {
          setErrorMessage(
            browserInfo.isSafari
              ? "Safari could not access GPS. Using approximate location..."
              : "This browser could not access GPS. Using approximate location..."
          );
          void fetchIPFallback();
          return;
        }

        // GPS unavailable

        if (error.code === 2) {
          setErrorMessage(
            "Please turn ON device location/GPS."
          );

          setStatus("error");

          return;
        }

        // Timeout

        if (error.code === 3) {
          setErrorMessage(
            "Location request timed out."
          );

          setStatus("error");

          return;
        }

        // Unknown

        setErrorMessage(
          "Unable to fetch your location."
        );

        setStatus("error");
      },

      locationOptions
    );
  }, [handleSuccess, fetchIPFallback]);

  useEffect(() => {
    requestLocationRef.current = requestLocation;
  }, [requestLocation]);

  // ───────────────── MAIN BUTTON ─────────────────

  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setErrorMessage(
        "Geolocation is not supported on this device."
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
        "This browser needs HTTPS for GPS. Using approximate location..."
      );
      void fetchIPFallback();
      return;
    }

    requestLocation();
  }, [requestLocation, fetchIPFallback]);

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
    <main className="flex min-h-dvh flex-col bg-[#f8f8f8]">
      {/* Title */}
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-medium tracking-tight text-black">
          What&apos;s your{" "}
          <span className="text-[#6C35FF]">
            location?
          </span>
        </h1>
      </div>

      {/* Image */}
      <div className="relative mt-6 flex-1">
        <Image
          src="/images/login/city.jpg"
          alt="city"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center px-6 pb-8 pt-7">
        <button
          onClick={handleGetLocation}
          disabled={isLoading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#6C35FF] text-base font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-70"
        >
          <Image
            alt="location logo"
            src="/images/login/location-fill.svg"
            width={20}
            height={20}
          />

          {isLoading
            ? "Fetching Location..."
            : "Use Current Location"}
        </button>

        <button
          onClick={handleSkip}
          disabled={isLoading}
          className="mt-3 text-sm text-gray-400 underline underline-offset-2"
        >
          Skip for now
        </button>

        {errorMessage && (
          <p className="mt-4 text-center text-sm text-red-500">
            {errorMessage}
          </p>
        )}
      </div>

      {/* Permission Modal */}
      {isBlocked && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40 backdrop-blur-sm">
          <div className="w-full rounded-t-3xl bg-white px-6 pb-10 pt-6">
            <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-gray-300" />

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6C35FF]/10">
                <Image
                  src="/images/login/location-fill.svg"
                  alt="location"
                  width={24}
                  height={24}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-black">
                  Location Access Needed
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  On iPhone Safari, allow Location
                  from Safari settings and return here.
                </p>
              </div>
            </div>

            <button
              onClick={() => setStatus("idle")}
              className="mt-6 h-14 w-full rounded-full bg-[#6C35FF] text-base font-semibold text-white"
            >
              I&apos;ll Enable It
            </button>

            <button
              onClick={handleSkip}
              className="mt-3 h-14 w-full rounded-full border border-gray-200 text-base font-medium text-gray-700"
            >
              Continue Without Location
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
