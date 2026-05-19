"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Status = "idle" | "loading" | "blocked" | "error";

type LocationSource = "gps" | "ip" | "default";

const IP_FALLBACK_URL = "https://ipapi.co/json/";

export default function LocationAccessPage() {
  const router = useRouter();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const retryCountRef = useRef(0);
  const hasNavigatedRef = useRef(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ───────────────── HELPERS ─────────────────

  const isIOS = () => {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" &&
        navigator.maxTouchPoints > 1)
    );
  };

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

      localStorage.setItem(
        "user_location",
        JSON.stringify(payload)
      );

      setStatus("idle");

      router.push("/location/map");
    },
    [router]
  );

  // ───────────────── IP FALLBACK ─────────────────

  const useIPFallback = useCallback(async () => {
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
    log("requesting location");

    navigator.geolocation.getCurrentPosition(
      handleSuccess,

      (error) => {
        log("gps error", {
          code: error.code,
          message: error.message,
          retry: retryCountRef.current,
        });

        // Retry FIRST before trusting browser errors

        if (retryCountRef.current < 2) {
          retryCountRef.current += 1;

          setErrorMessage(
            retryCountRef.current === 1
              ? "Accessing your location..."
              : "Still trying to get location..."
          );

          retryTimeoutRef.current = setTimeout(() => {
            requestLocation();
          }, isIOS() ? 2500 : 1500);

          return;
        }

        // REAL permission blocked

        if (error.code === 1) {
          setStatus("blocked");
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

      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 60000,
      }
    );
  }, [handleSuccess]);

  // ───────────────── MAIN BUTTON ─────────────────

  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setErrorMessage(
        "Geolocation is not supported on this device."
      );

      setStatus("error");

      return;
    }

    retryCountRef.current = 0;

    hasNavigatedRef.current = false;

    setErrorMessage("");

    setStatus("loading");

    requestLocation();
  }, [requestLocation]);

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

    window.addEventListener(
      "visibilitychange",
      retryWhenVisible
    );

    window.addEventListener("focus", retryWhenVisible);

    return () => {
      window.removeEventListener(
        "visibilitychange",
        retryWhenVisible
      );

      window.removeEventListener(
        "focus",
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
          What's your{" "}
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
          onClick={useIPFallback}
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
                  src="/images/login/location-fill.png"
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
                  Please enable location permission
                  from browser settings.
                </p>
              </div>
            </div>

            <button
              onClick={() => setStatus("idle")}
              className="mt-6 h-14 w-full rounded-full bg-[#6C35FF] text-base font-semibold text-white"
            >
              I'll Enable It
            </button>

            <button
              onClick={useIPFallback}
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