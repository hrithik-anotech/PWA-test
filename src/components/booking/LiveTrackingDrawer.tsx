"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

// ── Icon & image paths ────────────────────────────────────────────────────────
const ICONS = {
  close:          "/icons/close.svg",          // × close button
  scooter:        "/icons/scooter-small.svg",  // scooter on map route
  house:          "/icons/house-white.svg",    // house inside destination pin
  star:           "/icons/star.svg",           // filled star
  chat:           "/icons/chat-bubble.svg",    // message/chat icon
  phone:          "/icons/phone.svg",          // phone icon
  checkmark:      "/icons/check-white.svg",   // white tick inside done step
} as const;

const IMAGES = {
  map:         "/images/map.jpg",          // street map background
  workerPhoto: "/images/worker-photo.jpg", // worker profile photo
} as const;

// ── Timeline data type ────────────────────────────────────────────────────────
type StepStatus = "done" | "active" | "pending";

interface TimelineStep {
  label:     string;
  time:      string;
  status:    StepStatus;
  subLabel?: string;
}

// ── Sub-components ────────────────────────────────────────────────────────────

/** Circular icon-only button (chat / phone) */
function RoundIconBtn({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-11 h-11 rounded-xl",
        "border-2 border-gray-200",
        "flex items-center justify-center",
        "active:bg-gray-50 transition-colors"
      )}
    >
      <Image src={src} alt={alt} width={20} height={20} />
    </button>
  );
}

/** Single timeline row */
function TimelineRow({ step, isLast }: { step: TimelineStep; isLast: boolean }) {
  const isDone    = step.status === "done";
  const isActive  = step.status === "active";
  const isPending = step.status === "pending";

  return (
    <div className="flex gap-3">
      {/* dot + vertical line */}
      <div className="flex flex-col items-center">
        {/* dot */}
        {/* ↓ was w-[22px] h-[22px] */}
        <div
          className={cn(
            "w-[1.375rem] h-[1.375rem] rounded-full flex items-center justify-center shrink-0 z-10",
            isDone    && "bg-[#5B21B6]",
            isActive  && "bg-[#5B21B6] ring-[3px] ring-[#5B21B6]/25",
            isPending && "border-2 border-gray-300 bg-white"
          )}
        >
          {isDone && (
            <Image src={ICONS.checkmark} alt="✓" width={12} height={12} />
          )}
          {isActive && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>

        {!isLast && (
          <div
            className={cn(
              "w-[0.125rem] flex-1 mt-1", /* ↓ was w-[2px] */
              isDone   ? "bg-[#5B21B6]" : "bg-gray-200"
            )}
            style={{ minHeight: "1.5rem" }} /* ↓ was minHeight: 24 */
          />
        )}
      </div>

      {/* text */}
      <div className={cn("pb-5", isLast && "pb-0")}>
        <div className="flex items-center gap-3 flex-wrap">
          {/* ↓ was text-[14px] */}
          <span
            className={cn(
              "text-sm font-semibold leading-tight",
              isActive  ? "text-[#5B21B6]" : isPending ? "text-gray-400" : "text-[#1C1C1E]"
            )}
          >
            {step.label}
          </span>
          {/* ↓ was text-[12px] */}
          <span
            className={cn(
              "text-[3vw] sm:text-xs leading-tight",
              isPending ? "text-gray-300" : "text-gray-400"
            )}
          >
            {step.time}
          </span>
        </div>

        {step.subLabel && (
          <p className="text-[3vw] sm:text-xs text-gray-400 mt-[0.1875rem] leading-snug">
            {/* ↓ was text-[12px], mt-[3px] */}
            {step.subLabel}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface LiveTrackingDrawerProps {
  open:           boolean;
  onClose:        () => void;
  workerName?:    string;
  workerRole?:    string;
  workerPhoto?:   string;
  rating?:        number;
  reviewCount?:   number;
  arrivingInMins?: number;
  onChat?:        () => void;
  onCall?:        () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

const TIMELINE: TimelineStep[] = [
  {
    label:  "Booking Confirmed",
    time:   "10:24 AM",
    status: "done",
  },
  {
    label:  "Worker Assigned",
    time:   "10:25 AM",
    status: "done",
  },
  {
    label:    "On the way",
    time:     "10:26 AM",
    status:   "active",
    subLabel: "Riya is on the way to your location",
  },
  {
    label:  "Arriving Soon",
    time:   "10:32 AM (ETA)",
    status: "pending",
  },
];

export default function LiveTrackingDrawer({
  open,
  onClose,
  workerName    = "Riya Sharma",
  workerRole    = "Cleaning Expert",
  workerPhoto   = IMAGES.workerPhoto,
  rating        = 4.9,
  reviewCount   = 236,
  arrivingInMins = 6,
  onChat,
  onCall,
}: LiveTrackingDrawerProps) {
  return (
    <>
      {/* ── Backdrop ───────────────────────────────────────────────────── */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 bg-black/40 z-40",
          "transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* ── Drawer ─────────────────────────────────────────────────────── */}
      <div
        className={cn(
          // positioning
          "fixed bottom-0 left-0 right-0 z-50",
          // shape
          /* ↓ was rounded-t-[24px] */
          "bg-white rounded-t-3xl",
          // max width centred (matches phone layout from parent page)
          "max-w-lg mx-auto",
          // shadow
          "shadow-[0_-4px_32px_rgba(0,0,0,0.12)]",
          // slide animation
          "transition-[transform,visibility] duration-300 ease-out will-change-transform",
          open ? "translate-y-0 visible" : "translate-y-[calc(100%+40px)] invisible pointer-events-none"
        )}
      >
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          {/* ↓ was h-[5px] */}
          <div className="w-9 h-[0.3125rem] bg-gray-200 rounded-full" />
        </div>

        <div className="px-5 pt-2 pb-8 overflow-y-auto max-h-[88dvh]">

          {/* ── Header ─────────────────────────────────────────────────── */}
          <div className="flex items-start justify-between mb-1">
            {/* ↓ was text-[18px] */}
            <h2 className="text-lg font-bold text-[#1C1C1E] leading-tight">
              Live Tracking
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors -mt-0.5"
            >
              <Image src={ICONS.close} alt="Close" width={14} height={14} />
            </button>
          </div>

          <div className="flex items-center justify-between mb-3">
            {/* ↓ was text-[13px] */}
            <p className="text-sm text-gray-400 leading-tight">
              {workerName.split(" ")[0]} is on the way to your location
            </p>
            {/* ↓ was text-[13px] */}
            <span className="text-sm font-semibold text-[#5B21B6] leading-tight whitespace-nowrap ml-2">
              {arrivingInMins} mins away
            </span>
          </div>

          {/* ── Map ────────────────────────────────────────────────────── */}
          {/* ↓ was h-[200px] */}
          <div className="relative w-full h-[12.5rem] rounded-2xl overflow-hidden mb-4 bg-[#E8EAF0]">

            {/* map background image */}
            <Image
              src={IMAGES.map}
              alt="Map"
              fill
              className="object-cover"
            />

            {/* route overlay — SVG drawn on top of the map */}
            <svg
              viewBox="0 0 340 200"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              {/* route path */}
              <path
                d="M 48 148 C 80 130, 100 120, 150 105 C 200 90, 240 70, 295 52"
                fill="none"
                stroke="#5B21B6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* origin dot */}
            <div
              className="absolute w-4 h-4 rounded-full bg-[#5B21B6] ring-[4px] ring-[#5B21B6]/30"
              /* ↓ was left: 40, bottom: 48 */
              style={{ left: "2.5rem", bottom: "3rem" }}
            />

            {/* scooter + ETA bubble */}
            <div
              className="absolute flex flex-col items-center gap-1"
              /* ↓ was bottom: 56 */
              style={{ left: "38%", bottom: "3.5rem" }}
            >
              {/* "6 mins" label */}
              {/* ↓ was text-[11px] */}
              <div className="bg-[#5B21B6] text-white text-[2.75vw] sm:text-xs font-bold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap">
                {arrivingInMins} mins
              </div>
              {/* scooter icon */}
              <Image
                src={ICONS.scooter}
                alt="Worker"
                width={30}
                height={30}
                className="drop-shadow-md"
              />
            </div>

            {/* destination pin */}
            <div
              className="absolute w-9 h-9 rounded-full bg-[#5B21B6] flex items-center justify-center shadow-md"
              /* ↓ was right: 28, top: 36 */
              style={{ right: "1.75rem", top: "2.25rem" }}
            >
              <Image src={ICONS.house} alt="Destination" width={18} height={18} />
            </div>
          </div>

          {/* ── Worker strip ───────────────────────────────────────────── */}
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">

            {/* avatar */}
            {/* ↓ was w-[56px] h-[56px] */}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-[#EDE9FF] ring-2 ring-[#EDE9FF] shrink-0">
              <Image
                src={workerPhoto}
                alt={workerName}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>

            {/* name + role + rating */}
            <div className="flex-1 min-w-0">
              {/* ↓ was text-[15px] */}
              <p className="text-[3.75vw] sm:text-sm font-bold text-[#1C1C1E] leading-tight">
                {workerName}
              </p>
              {/* ↓ was text-[12px], mt-[2px] */}
              <p className="text-[3vw] sm:text-xs text-gray-400 mt-[0.125rem] leading-tight">
                {workerRole}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Image src={ICONS.star} alt="★" width={13} height={13} />
                {/* ↓ was text-[12px] */}
                <span className="text-[3vw] sm:text-xs font-bold text-[#1C1C1E] leading-none">
                  {rating.toFixed(1)}
                </span>
                {/* ↓ was text-[12px] */}
                <span className="text-[3vw] sm:text-xs text-gray-400 leading-none">
                  ({reviewCount})
                </span>
              </div>
            </div>

            {/* icon buttons */}
            <div className="flex gap-2 shrink-0">
              <RoundIconBtn src={ICONS.chat}  alt="Chat" onClick={onChat} />
              <RoundIconBtn src={ICONS.phone} alt="Call" onClick={onCall} />
            </div>
          </div>

          {/* ── Timeline ───────────────────────────────────────────────── */}
          <div>
            {TIMELINE.map((step, i) => (
              <TimelineRow
                key={step.label}
                step={step}
                isLast={i === TIMELINE.length - 1}
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}