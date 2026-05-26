"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { useRouter } from "@/i18n/routing";

// ── Icon & image paths — place files in /public/ ──────────────────────────────
const ICONS = {
  scooterTitle: "/images/icons/figure.svg",       // scooter next to "Worker on the way"
  scooterTracker: "/images/icons/figure.svg", // smaller scooter on the progress bar
  house: "/images/icons/home-2.svg",          // home / destination marker
  trackLive: "/images/icons/location-pin-white.svg",    // location pin inside Track Live button
  phone: "/images/icons/call.svg",          // phone inside Call button
  star: "/images/icons/star.svg",           // filled star for rating
} as const;

const IMAGES = {
  workerPhoto: "/images/login/profile-placeholder.png",    // circular profile photo
} as const;

// ── Types ─────────────────────────────────────────────────────────────────────

interface ServiceTrackingCardProps {
  workerName?: string;
  workerRole?: string;
  workerPhoto?: string;
  rating?: number;
  reviewCount?: number;
  arrivingInMins?: number;
  /** 0–1 progress of the scooter along the tracker bar */
  progress?: number;
  onTrackLive?: () => void;
  onCall?: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ServiceTrackingCard({
  workerName = "Riya Sharma",
  workerRole = "Cleaning Expert",
  workerPhoto = IMAGES.workerPhoto,
  rating = 4.9,
  reviewCount = 236,
  arrivingInMins = 6,
  progress = 0.38,           // scooter sits at ~38% across the bar
  onTrackLive,
  onCall,
}: ServiceTrackingCardProps) {
  const router = useRouter();
  // clamp progress between 0 and 1
  const p = Math.min(1, Math.max(0, progress));

  return (
    <div
      onClick={() => router.push("/service")}
      className={cn(
        "cursor-pointer transition-opacity",
        // card shell
        "bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.08)]",
        // left accent border
        "border-l-[0.21875rem] border-l-[#5B21B6]",
        // inner padding + layout: stacked on small, two-column on sm+
        "px-5 py-4 flex flex-col items-start",
        "mx-4 w-[calc(100%-2rem)] mt-4"
      )}
    >
      {/* ── LEFT — tracking info ─────────────────────────────────────────── */}
      <div className="flex-1 min-w-full flex flex-col gap-1.5">

        {/* LIVE TRACKING badge */}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
          {/* ↓ was text-[11px] */}
          <span className="text-[2.75vw] sm:text-xs font-bold text-[#22C55E] tracking-widest uppercase leading-none">
            Live Tracking
          </span>
        </div>

        {/* title */}
        <div className="flex items-center gap-2 mt-0.5">
          {/* ↓ was text-[20px] */}
          <h2 className="text-xl font-extrabold text-[#1C1C1E] leading-tight tracking-tight">
            Worker on the way
          </h2>
          <Image
            src={ICONS.scooterTitle}
            alt="Scooter"
            width={28}
            height={28}
            className="shrink-0"
          />
        </div>

        {/* worker profile */}
        <div className="flex items-center gap-3">
          {/* avatar */}
          {/* ↓ was w-[72px] h-[72px] */}
          <div className="w-[4.5rem] h-[4.5rem] rounded-full overflow-hidden bg-[#EDE9FF] shrink-0 ring-2 ring-[#EDE9FF]">
            <Image
              src={workerPhoto}
              alt={workerName}
              width={72}
              height={72}
              className="w-full h-full object-cover"
            />
          </div>

          {/* name / rating / role */}
          <div className="flex flex-col gap-[3px]">
            {/* ↓ was text-[16px] */}
            <p className="text-base font-bold text-[#1C1C1E] leading-tight">
              {workerName}
            </p>

            {/* rating row */}
            <div className="flex items-center gap-1">
              <Image src={ICONS.star} alt="★" width={15} height={15} />
              {/* ↓ was text-[13px] */}
              <span className="text-sm font-bold text-[#1C1C1E] leading-none">
                {rating.toFixed(1)}
              </span>
              {/* ↓ was text-[12px] */}
              <span className="text-[3vw] sm:text-xs text-gray-400 leading-none">
                ({reviewCount})
              </span>
            </div>

            {/* ↓ was text-[12px] */}
            <p className="text-[3vw] sm:text-xs text-gray-400 leading-tight">
              {workerRole}
            </p>
          </div>
        </div>

        {/* action buttons */}
        <div className="flex items-center gap-2.5 w-full ">

          {/* Track Live — filled */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTrackLive?.();
            }}
            className={cn(
              "flex-1 ",
              "flex items-center justify-center gap-2",
              "bg-[#5B21B6] text-white",
              /* ↓ was py-[10px] */
              "px-4 py-2.5 rounded-xl",
              /* ↓ was text-[13.5px] */
              "text-sm font-bold leading-none",
              "active:opacity-80 transition-opacity"
            )}
          >
            <Image src={ICONS.trackLive} alt="" width={16} height={16} className="brightness-0 invert" />
            Track Live
          </button>

          {/* Call — outlined */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCall?.();
            }}
            className={cn(
              "flex-1",
              "flex items-center justify-center gap-2",
              "border-2 border-[#5B21B6] text-[#5B21B6] bg-white",
              /* ↓ was py-[9px] */
              "px-4 py-2.25 rounded-xl",
              /* ↓ was text-[13.5px] */
              "text-sm font-bold leading-none",
              "active:bg-[#5B21B6]/5 transition-colors"
            )}
          >
            <Image src={ICONS.phone} alt="" width={16} height={16} />
            Call
          </button>
        </div>

      </div>

      {/* ── RIGHT — worker info + buttons ───────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-full mt-2 sm:mt-0 ">

        {/* arriving in */}
        <div className="flex flex-col gap-0 mt-0.5 items-start">
          {/* ↓ was text-[13px] */}
          <span className="text-sm text-gray-400 leading-tight">
            Arriving in
          </span>
          {/* ↓ was text-[32px] */}
          <span className="text-3xl font-extrabold text-[#5B21B6] leading-none tracking-tight mt-0.5">
            {arrivingInMins} mins
          </span>
        </div>

        {/* ── Progress tracker ───────────────────────────────────────── */}
        <div className="mt-3 relative select-none">

          {/* scooter icon — floats above the bar, positioned by `progress` */}
          <div
            className="absolute -top-6 flex flex-col items-center"
            style={{
              /* ↓ was - 14px */
              left: `calc(${p * 100}% - 0.875rem)`,
              transition: "left 0.6s ease",
            }}
          >
            <Image
              src={ICONS.scooterTracker}
              alt=""
              width={28}
              height={28}
            />
          </div>

          {/* bar row: left dot — line — right circle */}
          <div className="flex items-center gap-0 mt-1">

            {/* origin dot */}
            <div className="w-4 h-4 rounded-full bg-[#5B21B6] ring-[3px] ring-[#5B21B6]/20 shrink-0 z-10" />

            {/* line */}
            <div className="flex-1 relative h-[2px] mx-1">
              {/* solid purple portion up to scooter */}
              <div
                className="absolute inset-y-0 left-0 bg-[#5B21B6] rounded-full"
                style={{ width: `${p * 100}%` }}
              />
              {/* dashed gray portion after scooter */}
              <div
                className="absolute inset-y-0 right-0"
                style={{ width: `${(1 - p) * 100}%` }}
              >
                {/* rendered as a repeating dot pattern */}
                <svg width="100%" height="2" className="overflow-visible">
                  <line
                    x1="0" y1="1" x2="100%" y2="1"
                    stroke="#D1D5DB"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* destination circle with house icon */}
            <div className="w-9 h-9 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center shrink-0">
              <Image src={ICONS.house} alt="Your location" width={18} height={18} className="opacity-50" />
            </div>
          </div>

          {/* labels */}
          <div className="flex items-center justify-between mt-1.5 px-0.5">
            {/* ↓ was text-[12px] */}
            <span className="text-[3vw] sm:text-xs font-semibold text-[#5B21B6] leading-none">
              On the way
            </span>
            {/* ↓ was text-[12px] */}
            <span className="text-[3vw] sm:text-xs text-gray-400 leading-none">
              Your location
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}