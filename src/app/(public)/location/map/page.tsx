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

export default function ConfirmLocationPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const storedLocationRef = useRef<StoredLocation | null>(null);

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

  useEffect(() => {
    const rawLocation = localStorage.getItem("user_location");
    logLocationData("map page raw user_location", rawLocation);

    if (!rawLocation) return;

    try {
      const parsedLocation = JSON.parse(rawLocation) as StoredLocation;
      storedLocationRef.current = parsedLocation;
      logLocationData("map page parsed user_location", parsedLocation);
    } catch (error) {
      logLocationData("map page user_location parse error", error);
    }
  }, []);

  return (
    <main className="flex flex-col min-h-dvh bg-white font-(--font-urbanist)">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-3 bg-white z-10">
        <button
          onClick={handleBack}
          className="p-1 -ml-1 text-black"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="text-[17px] font-semibold text-black">
          Confirm your location
        </span>
      </div>

      {/* ── Search Bar ── */}
      <div className="px-4 pb-3 bg-white">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          {/* Search icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search locality, sector, area"
            value={search}
            onChange={handleSearchChange}
            className="flex-1 text-[14px] text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>
      </div>

      {/* ── Map Placeholder ── */}
      <div className="relative flex-1 bg-[#e8e0f0] overflow-hidden">
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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
          <div className="bg-[#6C35FF] rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" fill="#6C35FF" stroke="#6C35FF" />
            </svg>
          </div>
          <div className="w-2 h-2 bg-[#6C35FF] rounded-full mt-0.5 opacity-60" />
        </div>

        {/* Tooltip */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[calc(50%-80px)]">
          <div className="bg-[#1a1a1a] text-white rounded-xl px-4 py-2.5 text-center shadow-lg whitespace-nowrap">
            <p className="text-[11px] text-gray-300 mb-0.5">Set this as your location</p>
            <p className="text-[14px] font-semibold">Lions Club Road</p>
          </div>
          <div className="flex justify-center">
            <div className="w-3 h-3 bg-[#1a1a1a] rotate-45 -mt-1.5" />
          </div>
        </div>

        {/* Go to current location */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <button className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 shadow-md text-[13px] font-semibold text-[#6C35FF] border border-gray-100 active:scale-[0.97] transition-transform">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#6C35FF" stroke="#6C35FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            Go to current location
          </button>
        </div>
      </div>

      {/* ── Bottom Sheet ── */}
      <div className="bg-white px-4 pt-4 pb-8 border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-start gap-3 mb-5">
          <div className="mt-0.5 w-9 h-9 rounded-full bg-[#f0ebff] flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#6C35FF" stroke="#6C35FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" fill="white" stroke="white" />
            </svg>
          </div>
          <div>
            <p className="text-[16px] font-semibold text-black leading-tight">
              {DISPLAYED_LOCATION.name}
            </p>
            <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">
              {DISPLAYED_LOCATION.address}
            </p>
          </div>
        </div>

        <button
          onClick={handleConfirmLocation}
          className="w-full h-[54px] rounded-full bg-[#6C35FF] text-white text-[16px] font-semibold shadow-sm active:scale-[0.98] transition-transform"
        >
          Confirm Location
        </button>
      </div>
    </main>
  );
}
