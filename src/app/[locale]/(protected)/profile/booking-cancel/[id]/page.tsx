"use client";

import Image from "next/image";
import { useRouter } from "@/i18n/routing";

// ── Icon paths — place your files in /public/icons/ ───────────────────────────
const ICONS = {
  back: "/images/icons/back-black.svg",
  paymentFailed: "/images/icons/badge-cross.svg",
  hourglass: "/images/icons/hourglass.svg",
  calender: "/images/icons/calender-outline.svg",
  location: "/images/icons/location-pin.svg",
  rupee: "/images/icons/rupee.svg",
  headset: "/images/icons/headset.svg",
  chevron: "/images/icons/chevron-right.svg",
} as const;

// ── Sub-components ────────────────────────────────────────────────────────────

function IconBubble({
  src,
  alt,
  size = 20,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <div className="w-10 h-10 rounded-full bg-[#EDE9FF] flex items-center justify-center shrink-0 [@media(min-height:720px)]:h-11 [@media(min-height:720px)]:w-11">
      <Image src={src} alt={alt} width={size} height={size} />
    </div>
  );
}

function ListRow({
  iconSrc,
  iconAlt,
  title,
  subtitle,
}: {
  iconSrc: string;
  iconAlt: string;
  title: string;
  subtitle: string;
}) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-gray-50 transition-colors [@media(min-height:720px)]:py-[14px]">
      <IconBubble src={iconSrc} alt={iconAlt} size={20} />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-[#1C1C1E] leading-tight">
          {title}
        </p>
        <p className="text-[12px] text-gray-400 mt-[3px] leading-tight">
          {subtitle}
        </p>
      </div>
      <Image
        src={ICONS.chevron}
        alt=""
        width={10}
        height={10}
        className="shrink-0"
      />
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PaymentFailedPage() {
  const router = useRouter()
  return (
    <div className="h-dvh max-h-dvh w-full overflow-hidden bg-[#F4F5FA] flex flex-col">

      {/* ── LAVENDER HEADER ───────────────────────────────────────────────── */}
      <div className="bg-[#EAE4FF] relative flex shrink-0 flex-col items-center px-6 pt-9 pb-16 [@media(min-height:720px)]:pt-12 [@media(min-height:720px)]:pb-24">

        {/* back button */}
        <button
          aria-label="Go back"
          onClick={() => router.replace("/profile/mybookings")}
          className="absolute left-4 top-9 p-1.5 rounded-full active:bg-black/10 transition-colors [@media(min-height:720px)]:top-12"
        >
          {/*
            This icon is dark-coloured (not inverted white like on the green header).
            Remove the brightness/invert classes if your SVG is already dark.
          */}
          <Image
            src={ICONS.back}
            alt="Back"
            width={12}
            height={12}
          />
        </button>

        {/* hero — red receipt / payment-failed illustration */}
        <div className="relative mb-4 mt-0 [@media(min-height:720px)]:mb-6 [@media(min-height:720px)]:mt-1">
          {/* subtle glow behind the icon */}
          <div className="absolute inset-0 rounded-2xl bg-red-300/30 scale-[1.3] blur-lg pointer-events-none" />
          <Image
            src={ICONS.paymentFailed}
            alt="Payment failed"
            width={88}
            height={88}
            className="relative h-16 w-16 drop-shadow-md [@media(min-height:720px)]:h-[88px] [@media(min-height:720px)]:w-[88px]"
          />
        </div>

        <h1 className="text-[#1C1C1E] text-xl font-bold tracking-tight [@media(min-height:720px)]:text-[22px]">
          Payment failed
        </h1>
      </div>

      {/* ── BOTTOM SHEET ──────────────────────────────────────────────────── */}
      <div className="z-10 -mt-10 flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[28px] bg-[#F4F5FA]">

        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-9 h-[5px] bg-gray-300 rounded-full" />
        </div>

        <div className="mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col gap-2 px-4 pt-2 pb-3 [@media(min-height:720px)]:gap-3 [@media(min-height:720px)]:pt-3 [@media(min-height:720px)]:pb-6">

          {/* ── CARD 1 – Refund notice ────────────────────────────────────── */}
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm [@media(min-height:720px)]:py-[14px]">
            <div className="flex items-start gap-3">
              <IconBubble src={ICONS.hourglass} alt="Refund" size={20} />
              <p className="overflow-hidden text-[12.5px] text-gray-500 leading-snug pt-[2px] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [@media(min-height:720px)]:text-[13.5px] [@media(min-height:720px)]:leading-relaxed [@media(min-height:720px)]:[-webkit-line-clamp:3]">
                In case any amount was deducted for this booking, any deducted
                amount will be refunded back to your original payment source
              </p>
            </div>
          </div>

          {/* ── CARD 2 – Duration & Location ─────────────────────────────── */}
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm space-y-3 [@media(min-height:720px)]:space-y-[14px] [@media(min-height:720px)]:py-[14px]">

            {/* duration */}
            <div className="flex items-center gap-3">
              <IconBubble src={ICONS.calender} alt="Duration" size={20} />
              <span className="text-[14px] font-medium text-[#1C1C1E] leading-snug">
                60 min visit
              </span>
            </div>

            {/* location */}
            <div className="flex items-start gap-3">
              <IconBubble src={ICONS.location} alt="Location" size={20} />
              <p className="overflow-hidden text-[13px] text-[#1C1C1E] leading-snug [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [@media(min-height:720px)]:text-[14px] [@media(min-height:720px)]:leading-relaxed [@media(min-height:720px)]:[-webkit-line-clamp:3]">
                Genex Exotica, Grand Trunk Road, Kumarpur, Asansol, West
                Bengal, 713304, near Bhagat Singh More
              </p>
            </div>
          </div>

          {/* ── CARD 3 – Payment & Support ────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <ListRow
              iconSrc={ICONS.rupee}
              iconAlt="Payment"
              title="Payment Details"
              subtitle="View details"
            />
            <div className="border-t border-gray-100" />
            <ListRow
              iconSrc={ICONS.headset}
              iconAlt="Support"
              title="Contact Support"
              subtitle="Resolve your queries"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
