"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/cn";

// ── Icon paths — /public/icons/ ───────────────────────────────────────────────
const ICONS = {
  back: "/images/icons/back-black.svg",
  scooter: "/images/icons/figure.svg",
  star: "/images/icons/star.svg",
  calendar: "/images/icons/calender-outline.svg",
  reschedule: "/images/icons/calender-outline.svg",    // calendar / reschedule icon
  cancel: "/images/icons/cross-circle.svg",      // X icon (red-tinted)
  mapPin: "/images/icons/map-pin.svg",       // small pin for "Your location"
  location: "/images/icons/location-pin.svg",  // purple-bubble location icon
  share: "/images/icons/share.svg",
  rupee: "/images/icons/rupee.svg",
  headset: "/images/icons/headset.svg",
  chevron: "/images/icons/chevron-right.svg",
} as const;

// ── Shared pieces ─────────────────────────────────────────────────────────────

function IconBubble({ src, alt, size = 20 }: { src: string; alt: string; size?: number }) {
  return (
    <div className="w-11 h-11 rounded-full bg-[#EDE9FF] flex items-center justify-center shrink-0">
      <Image src={src} alt={alt} width={size} height={size} />
    </div>
  );
}

function OtpDigit({ digit }: { digit: string }) {
  return (
    <div className="w-9 h-10 rounded-md bg-[#1C1C1E] flex items-center justify-center">
      <span className="text-white font-bold text-lg leading-none">{digit}</span>
    </div>
  );
}

function ListRow({ iconSrc, iconAlt, title, subtitle, onClick }: {
  iconSrc: string; iconAlt: string;
  title: string; subtitle: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-[14px] text-left active:bg-gray-50 transition-colors"
    >
      <IconBubble src={iconSrc} alt={iconAlt} size={20} />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-[#1C1C1E] leading-tight">{title}</p>
        <p className="text-[12px] text-gray-400 mt-[3px] leading-tight">{subtitle}</p>
      </div>
      <Image src={ICONS.chevron} alt="" width={10} height={10} className="shrink-0 " />
    </button>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface ServiceDetailPageProps {
  workerName?: string;
  workerRole?: string;
  workerImage?: string;
  rating?: number;
  reviewCount?: number;
  arrivingInMins?: number;
  eta?: string;
  progress?: number;
  serviceDate?: string;
  serviceTime?: string;
  duration?: number;
  location?: string;
  checkInOTP?: string;
  onReschedule?: () => void;
  onCancel?: () => void;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ServiceDetailPage({
  workerName = "Riya Sharma",
  workerRole = "Cleaning Expert",
  workerImage = "/images/login/profile-placeholder.png",
  rating = 4.9,
  reviewCount = 236,
  arrivingInMins = 6,
  eta = "6:21 PM",
  progress = 0.38,
  serviceDate = "16th May",
  serviceTime = "01:15 PM",
  duration = 60,
  location = "Genex Exotica, Grand Trunk Road, Kumarpur, Asansol, West Bengal, 713304, near Bhagat Singh More",
  checkInOTP = "1229",
  onReschedule,
  onCancel,
}: ServiceDetailPageProps) {
  const router = useRouter();
  const digits = checkInOTP.split("");
  const pct = `${Math.min(1, Math.max(0, progress)) * 100}%`;

  return (
    <div className="min-h-dvh w-full bg-[#F4F5FA]">

      {/* back arrow */}
      <div className="px-4 pt-2 pb-2">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="p-1 rounded-full active:bg-black/10 transition-colors inline-flex"
        >
          <Image src={ICONS.back} alt="Back" width={10} height={10} />
        </button>
      </div>

      <div className="px-4 pb-14 space-y-3 max-w-lg mx-auto w-full">

        {/* ══════════════════════════════════════════════════════════════════
            CARD 1 — Live Tracking + Worker
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className={cn(
            "cursor-pointer transition-opacity",
            // card shell
            "bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.08)]",
            // left accent border
            "border-l-[0.21875rem] border-l-[#5B21B6]",
            // inner padding + layout: stacked on small, two-column on sm+
            "px-5 py-4 flex items-start",
            "w-[calc(100%-1.5rem)] mt-4"
          )}
        >
          {/* ── TOP TWO-COLUMN SECTION ── */}
          <div className="flex flex-col gap-3 p-4 pb-3">

            {/* LEFT — tracking numbers */}
            <div className="flex-1 min-w-0 flex flex-col">

              {/* live badge */}
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-[7px] h-[7px] rounded-full bg-[#22C55E] animate-pulse shrink-0" />
                <span className="text-[10px] font-bold text-[#22C55E] tracking-[0.12em] uppercase">
                  Live Tracking
                </span>
              </div>

              {/* title + scooter icon inline */}
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className="text-[16px] font-extrabold text-[#1C1C1E] leading-tight tracking-tight">
                  Worker on the way
                </span>
                <Image src={ICONS.scooter} alt="" width={22} height={22} className="shrink-0" />
              </div>

              {/* arriving in label */}
              <p className="text-[11px] text-gray-500 leading-none mb-0.5">Arriving in</p>

              {/* 6 mins — large purple */}
              <p className="text-[32px] font-extrabold text-[#5B21B6] leading-none tracking-tight">
                {arrivingInMins} mins
              </p>

              {/* ETA */}
              <p className="text-[11px] text-gray-400 leading-none mt-1">ETA {eta}</p>

              {/* thin progress bar */}
              <div className="mt-2.5 w-full h-[5px] bg-[#D9D0F5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5B21B6] rounded-full transition-all duration-500"
                  style={{ width: pct }}
                />
              </div>
            </div>

            <div>

              {/* row: pin + label + "Open map >" */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image src={ICONS.mapPin} alt="" width={13} height={13} className="opacity-50 shrink-0" />
                  <span className="text-[12px] font-semibold text-gray-500">Your location</span>
                </div>
                <button className="text-[8px] font-semibold text-[#5B21B6] whitespace-nowrap ml-2">
                  Open map &rsaquo;
                </button>
              </div>

              {/* address */}
              <p className="text-xs text-gray-400">
                {location}
              </p>
            </div>
          </div>

          {/* ── YOUR LOCATION SECTION (full-width, below divider) ── */}
          {/* <div className="border-r border-[#ccc] mx-4" /> */}
          <div className="w-32.5 flex flex-col items-center gap-2 shrink-0">

            <div className="flex px-1 py-4">
              {/* avatar */}
              <div className="w-16 h-16 rounded-full overflow-hidden bg-[#D9D0F5] ring-[3px] ring-white shadow-sm">
                <Image
                  src={workerImage}
                  alt={workerName}
                  width={60}
                  height={60}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* name */}
              <div className="text-center w-full">
                <p className="text-[13px] font-bold text-[#1C1C1E] leading-tight">
                  {workerName}
                </p>

                {/* star rating */}
                <div className="flex items-center justify-center gap-[3px] mt-[3px]">
                  <Image src={ICONS.star} alt="★" width={12} height={12} />
                  <span className="text-[11px] font-bold text-[#1C1C1E] leading-none">
                    {rating.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-gray-400 leading-none">
                    ({reviewCount})
                  </span>
                </div>

                {/* role */}
                <p className="text-[11px] text-gray-400 mt-[3px] leading-tight">
                  {workerRole}
                </p>
              </div>
            </div>

            {/* Reschedule button */}
            <button
              onClick={onReschedule}
              className={cn(
                "w-full flex items-center justify-center gap-1.5",
                "bg-white border border-[#C4B5F4] rounded-lg py-1.75 px-2",
                "text-[11px] font-semibold text-[#5B21B6]",
                "active:bg-[#5B21B6]/5 transition-colors"
              )}
            >
              <Image src={ICONS.reschedule} alt="" width={12} height={12} />
              Reschedule
            </button>

            {/* Cancel button */}
            <button
              onClick={onCancel}
              className={cn(
                "w-full flex items-center justify-center gap-1.5",
                "bg-[#FFF0F0] border border-[#FECACA] rounded-lg py-1.75 px-2",
                "text-[11px] font-semibold text-[#EF4444]",
                "active:bg-red-100 transition-colors"
              )}
            >
              <Image src={ICONS.cancel} alt="" width={12} height={12} />
              Cancel
            </button>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CARD 2 — Check-in OTP
        ══════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl px-4 py-[14px] shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[15px] font-semibold text-[#1C1C1E] leading-tight">
                Check-in OTP
              </p>
              <p className="text-[12px] text-gray-400 mt-[3px] leading-tight">
                Share with expert to start service
              </p>
            </div>
            <div className="flex gap-[6px] shrink-0">
              {digits.map((d, i) => <OtpDigit key={i} digit={d} />)}
            </div>
          </div>

          <div className="border-t border-gray-100 mt-[14px] pt-3 flex items-center justify-between">
            <span className="text-[13.5px] text-gray-500">Booked for someone else?</span>
            <button className="flex items-center gap-1.5 text-[13.5px] text-[#1C1C1E] font-semibold active:opacity-60 transition-opacity">
              Share
              <Image src={ICONS.share} alt="Share" width={15} height={15} className="opacity-70" />
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CARD 3 — Date & Location
        ══════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl px-4 py-[14px] shadow-sm space-y-[14px]">
          <div className="flex items-center gap-3">
            <IconBubble src={ICONS.calendar} alt="Date" size={20} />
            <span className="text-[14px] font-medium text-[#1C1C1E] leading-snug">
              {serviceDate}, {serviceTime}&nbsp;·&nbsp;{duration} min visit
            </span>
          </div>
          <div className="flex items-start gap-3">
            <IconBubble src={ICONS.location} alt="Location" size={20} />
            <p className="text-[14px] text-[#1C1C1E] leading-relaxed pt-[2px]">
              {location}
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CARD 4 — Payment & Support
        ══════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <ListRow iconSrc={ICONS.rupee} iconAlt="Payment" title="Payment Details" subtitle="View details" />
          <div className="border-t border-gray-100" />
          <ListRow iconSrc={ICONS.headset} iconAlt="Support" title="Contact Support" subtitle="Resolve your queries" />
        </div>

      </div>
    </div>
  );
}