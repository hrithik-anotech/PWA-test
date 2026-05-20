// app/confirm-location/page.tsx
"use client";

import {
  type ChangeEvent,
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { markForwardNavigation } from "@/lib/navigation-transition";

type StoredLocation = {
  latitude: number;
  longitude: number;
  source: "gps" | "ip" | "default";
};

type DeviceType = "ios" | "android" | "other";

const logLocationData = (label: string, data: unknown) => {
  console.log(`[location] ${label}:`, data);
};

const DISPLAYED_LOCATION = {
  name: "Lions Club Road",
  address:
    "Lions Club Road, Kanyapur, Asansol, West Bengal, India, 713305",
};

const mapGridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(#c9b8e8 1px, transparent 1px), linear-gradient(90deg, #c9b8e8 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

const locationRippleStyle: CSSProperties = {
  width: 180,
  height: 180,
  background:
    "radial-gradient(circle, rgba(108,53,255,0.18) 0%, rgba(108,53,255,0.06) 60%, transparent 80%)",
};

const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(userAgent);

  let deviceType: DeviceType = "other";
  if (isIOS) deviceType = "ios";
  else if (isAndroid) deviceType = "android";

  return {
    isIOS,
    isAndroid,
    deviceType,
  };
};

export default function ConfirmLocationPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deviceType, setDeviceType] = useState<DeviceType>("other");
  const [windowHeight, setWindowHeight] = useState(0);
  const storedLocationRef = useRef<StoredLocation | null>(null);

  // ── DETECT DEVICE ──
  useEffect(() => {
    const browserInfo = getBrowserInfo();
    setDeviceType(browserInfo.deviceType);
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── LOAD STORED LOCATION ──
  useEffect(() => {
    const rawLocation = localStorage.getItem("user_location");
    logLocationData("confirm location page raw user_location", rawLocation);

    if (!rawLocation) return;

    try {
      const parsedLocation = JSON.parse(rawLocation) as StoredLocation;
      storedLocationRef.current = parsedLocation;
      logLocationData("confirm location page parsed user_location", parsedLocation);
    } catch (error) {
      logLocationData("confirm location page user_location parse error", error);
    }
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

  const handleConfirmLocation = useCallback(() => {
    logLocationData("confirm location clicked", {
      storedLocation: storedLocationRef.current,
      displayedLocation: DISPLAYED_LOCATION,
    });

    markForwardNavigation();
    router.push("/address-details");
  }, [router]);

  // Calculate responsive map height
  const mapHeightClass = 
    windowHeight < 700 ? "flex-1 min-h-[200px]" :
    "flex-1 min-h-[250px]";

  return (
    <main 
      className="flex flex-col w-full bg-white"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── HEADER ── */}
      <div 
        className="flex items-center gap-3 px-3 sm:px-4 pt-3 pb-3 bg-white z-10 border-b border-gray-100 flex-shrink-0"
        style={{
          paddingTop: `calc(env(safe-area-inset-top, 0px) + 12px)`,
        }}
      >
        <button
          onClick={handleBack}
          className="p-2 -ml-2 text-black rounded-lg hover:bg-gray-100 transition-colors active:bg-gray-200"
          aria-label="Go back"
          style={{
            minWidth: "44px",
            minHeight: "44px",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="text-base sm:text-lg font-semibold text-black">
          Confirm location
        </span>
      </div>

      {/* ── SEARCH BAR ── */}
      <div className="px-3 sm:px-4 py-3 bg-white border-b border-gray-50 flex-shrink-0">
        <div className="flex items-center gap-2 rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 sm:px-4 py-2.5 sm:py-3 shadow-sm active:border-[#6C35FF] transition-colors">
          {/* Search icon */}
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#9ca3af" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search locality, sector, area"
            value={search}
            onChange={handleSearchChange}
            className="flex-1 text-xs sm:text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          />
        </div>
      </div>

      {/* ── MAP PLACEHOLDER ── */}
      <div className={`relative ${mapHeightClass} bg-[#e8e0f0] overflow-hidden flex-shrink-0`}>
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={mapGridStyle}
        />

        {/* Fake road lines */}
        <div className="absolute inset-0">
          <div className="absolute top-[30%] left-0 right-0 h-[3px] bg-white opacity-80 rotate-[-8deg] translate-y-4" />
          <div className="absolute top-[55%] left-[40%] bottom-0 w-[3px] bg-white opacity-80" />
          <div className="absolute top-[20%] left-[60%] bottom-0 w-[2px] bg-white opacity-60 rotate-[5deg]" />
          <div className="absolute top-[45%] left-0 right-0 h-[2px] bg-white opacity-50 rotate-[3deg]" />
        </div>

        {/* Ripple circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="rounded-full"
            style={locationRippleStyle}
          />
        </div>

        {/* Pin */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none">
          <div className="bg-[#6C35FF] rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center shadow-lg flex-shrink-0">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="white" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" fill="#6C35FF" stroke="#6C35FF" />
            </svg>
          </div>
          <div className="w-2 h-2 bg-[#6C35FF] rounded-full mt-0.5 opacity-60" />
        </div>

        {/* Tooltip */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[calc(50%-100px)] sm:top-[calc(50%-90px)] pointer-events-none">
          <div className="bg-[#1a1a1a] text-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-center shadow-lg whitespace-nowrap">
            <p className="text-[10px] sm:text-[11px] text-gray-300 mb-0.5">Set this as your location</p>
            <p className="text-xs sm:text-sm font-semibold">Lions Club Road</p>
          </div>
          <div className="flex justify-center">
            <div className="w-3 h-3 bg-[#1a1a1a] rotate-45 -mt-1.5" />
          </div>
        </div>

        {/* Go to current location button */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto">
          <button 
            className="flex items-center gap-2 bg-white rounded-full px-3 sm:px-4 py-2 sm:py-2.5 shadow-md text-xs sm:text-sm font-semibold text-[#6C35FF] border border-gray-100 active:scale-95 transition-transform"
            style={{
              minHeight: "44px",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="#6C35FF" 
              stroke="#6C35FF" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            <span className="hidden xs:inline">Go to current location</span>
            <span className="inline xs:hidden">Current location</span>
          </button>
        </div>
      </div>

      {/* ── BOTTOM SHEET ── */}
      <div 
        className="bg-white px-3 sm:px-4 pt-4 border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex-shrink-0"
        style={{
          paddingBottom: `max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))`,
        }}
      >
        {/* Location Info */}
        <div className="flex items-start gap-3 mb-4 sm:mb-5">
          <div className="mt-0.5 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-[#f0ebff] flex items-center justify-center flex-shrink-0">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="#6C35FF" 
              stroke="#6C35FF" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" fill="white" stroke="white" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-semibold text-black leading-snug truncate">
              {DISPLAYED_LOCATION.name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-snug line-clamp-2">
              {DISPLAYED_LOCATION.address}
            </p>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirmLocation}
          className="w-full h-12 sm:h-14 rounded-full bg-[#6C35FF] text-white text-sm sm:text-base font-semibold shadow-sm active:scale-95 transition-transform"
          style={{
            minHeight: "44px",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          Confirm Location
        </button>
      </div>

      {/* ── iOS KEYBOARD SPACER ── */}
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