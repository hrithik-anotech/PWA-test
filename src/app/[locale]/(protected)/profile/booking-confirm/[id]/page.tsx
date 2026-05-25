"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/cn";

// ── Icon paths — point these to your actual files in /public/icons/ ───────────
const ICONS = {
  back:     "/images/icons/back-arrow.svg",
  check:    "/images/icons/badge-check.svg",
  calender: "/images/icons/calender-outline.svg",
  location: "/images/icons/location-pin.svg",
  rupee:    "/images/icons/rupee.svg",
  headset:  "/images/icons/headset.svg",
  share:    "/images/icons/share.svg",
  chevron:  "/images/icons/chevron-right.svg",
} as const;

// ── Sub-components ────────────────────────────────────────────────────────────

function OtpDigit({ digit }: { digit: string }) {
  return (
    <div className="w-8 h-9 rounded-md bg-[#1C1C1E] flex items-center justify-center [@media(min-height:720px)]:h-10 [@media(min-height:720px)]:w-9">
      <span className="text-white font-bold text-base leading-none tracking-tight [@media(min-height:720px)]:text-lg">
        {digit}
      </span>
    </div>
  );
}

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
        width={17}
        height={17}
        className="shrink-0 opacity-40"
      />
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const OTP_DIGITS = ["1", "2", "2", "9"];

export default function BookingConfirmedPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const bookingId = params.id;

  return (
    <div className="h-dvh max-h-dvh w-full overflow-hidden bg-[#F4F5FA] flex flex-col">

      {/* ── GREEN HEADER ──────────────────────────────────────────────────── */}
      <div className="bg-[#209D4E] relative flex shrink-0 flex-col items-center px-6 pt-9 pb-16 [@media(min-height:720px)]:pt-12 [@media(min-height:720px)]:pb-24">

        {/* back button */}
        <button
          aria-label="Go back"
          onClick={() => router.push("/profile/mybookings")}
          className="absolute left-4 top-9 p-1.5 rounded-full active:bg-white/20 transition-colors [@media(min-height:720px)]:top-12"
        >
          <Image
            src={ICONS.back}
            alt="Back"
            width={20}
            height={20}
            className="brightness-0 invert"
          />
        </button>

        {/* hero badge */}
        <div className="relative mb-3 mt-0 [@media(min-height:720px)]:mb-5 [@media(min-height:720px)]:mt-1">
          <div className="absolute inset-0 rounded-full bg-white/20 scale-[1.4] blur-md pointer-events-none" />
          <Image
            src={ICONS.check}
            alt="Booking confirmed"
            width={84}
            height={84}
            className="relative h-16 w-16 drop-shadow-md [@media(min-height:720px)]:h-[84px] [@media(min-height:720px)]:w-[84px]"
          />
        </div>

        <h1 className="text-white text-[22px] font-bold tracking-tight mb-1 [@media(min-height:720px)]:mb-2 [@media(min-height:720px)]:text-2xl">
          Booking Confirmed!
        </h1>
        <p className="text-white/85 text-center text-xs leading-snug max-w-xs [@media(min-height:720px)]:text-sm [@media(min-height:720px)]:leading-relaxed">
          You will be able to track your assigned Expert 15 min before your
          scheduled time
        </p>
        {bookingId ? (
          <p className="mt-2 text-xs font-semibold text-white/80 [@media(min-height:720px)]:mt-3">
            Booking ID #{bookingId}
          </p>
        ) : null}
      </div>

      {/* ── BOTTOM SHEET ──────────────────────────────────────────────────── */}
      <div className="z-10 -mt-10 flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[28px] bg-[#F9F8FD]">

        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-9 h-[5px] bg-gray-300 rounded-full" />
        </div>

        <div className="mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col gap-2 px-4 pt-2 pb-3 [@media(min-height:720px)]:gap-3 [@media(min-height:720px)]:pt-3 [@media(min-height:720px)]:pb-6">

          {/* ── CARD 1 – Check-in OTP ─────────────────────────────────────── */}
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm [@media(min-height:720px)]:py-[14px]">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-[#1C1C1E] leading-tight">
                  Check-in OTP
                </p>
                <p className="text-[11px] text-gray-400 mt-[3px] leading-tight [@media(min-height:720px)]:text-xs">
                  Share with expert to start service
                </p>
              </div>
              <div className="flex gap-[6px] shrink-0">
                {OTP_DIGITS.map((d, i) => (
                  <OtpDigit key={i} digit={d} />
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 mt-3 pt-2 flex items-center justify-between [@media(min-height:720px)]:mt-[14px] [@media(min-height:720px)]:pt-3">
              <span className="text-xs text-gray-500 [@media(min-height:720px)]:text-[13.5px]">
                Booked for someone else?
              </span>
              <button className="flex items-center gap-1.5 text-xs text-[#1C1C1E] font-semibold active:opacity-60 transition-opacity [@media(min-height:720px)]:text-[13.5px]">
                Share
                <Image
                  src={ICONS.share}
                  alt="Share"
                  width={15}
                  height={15}
                  className="opacity-70"
                />
              </button>
            </div>
          </div>

          {/* ── CARD 2 – Date & Location ──────────────────────────────────── */}
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm space-y-3 [@media(min-height:720px)]:space-y-[14px] [@media(min-height:720px)]:py-[14px]">
            <div className="flex items-center gap-3">
              <IconBubble src={ICONS.calender} alt="Date" size={20} />
              <span className="text-[14px] font-medium text-[#1C1C1E] leading-snug">
                16th May, 01:15 PM&nbsp;·&nbsp;60 min visit
              </span>
            </div>

            <div className="flex items-start gap-3">
              <IconBubble src={ICONS.location} alt="Location" size={20} />
              <a
                href="#"
                className={cn(
                  "overflow-hidden text-[13px] leading-snug text-[#4B6BE8] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [@media(min-height:720px)]:text-[14px] [@media(min-height:720px)]:leading-relaxed",
                  "underline underline-offset-[3px] decoration-[#4B6BE8]/50"
                )}
              >
                Genex Exotica, Grand Trunk Road, Kumarpur, Asansol, West
                Bengal, 713304, near Bhagat Singh More
              </a>
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
