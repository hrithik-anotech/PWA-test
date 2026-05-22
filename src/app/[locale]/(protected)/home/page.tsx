
import type { Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = {
  themeColor: "#FCFCFF",
  viewportFit: "cover",
};


// ── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    key: "cleaning",
    Icon: "/images/icons/spray.svg",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
  },
  {
    key: "bathroom",
    Icon: "/images/icons/bath.svg",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800&auto=format&fit=crop",
  },
  {
    key: "laundry",
    Icon: "/images/icons/wash.svg",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=800&auto=format&fit=crop",
  },
  {
    key: "utensils",
    Icon: "/images/icons/utensils.svg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
  },
] as const;

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const t = await getTranslations('Home');

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--app-background)]">

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-[var(--app-background)] pt-[env(safe-area-inset-top)]">
        <div className="rounded-b-[2.1rem] bg-[#5F30CA] px-5 pb-8 pt-3.5">
          <div className="flex items-start justify-between">
            {/* Left: text */}
            <div>
              <p className="text-base font-extralight tracking-wide text-white">
                {t('header.prefix')}
              </p>
              {/* ↓ was text-3xl (30px fixed) → now scales with viewport */}
              <h1 className="mt-0.5 text-[7.5vw] leading-none tracking-tight text-white">
                {t('header.time')}
              </h1>
              {/* Location */}
              <div className="mt-2 flex items-center gap-1">
                <Image alt="location" src="/images/icons/location-white.svg" height={12} width={12} />
                <span className="text-base text-white">
                  Genex Exotica, Asansol WB
                </span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Right: avatar — h-12 w-12 already rem-based */}
            <div className="h-12 w-12 mt-4 overflow-hidden rounded-full border-2 border-white/25">
              <Image
                src="/images/login/profile-placeholder.png"
                alt="Avatar"
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-0">

        {/* ── PAGE CONTENT ───────────────────────────────────────────────────── */}
        <div className="mx-4 mt-4 grid grid-cols-2 gap-3">

          {/* Schedule — dark purple with ghost calendar */}
          {/* ↓ minHeight:140 replaced with aspect-ratio so card scales with column width */}
          <Link
            href="/bookings/schedule"
            className="relative overflow-hidden rounded-[1.25rem] bg-[linear-gradient(116.15deg,#815BE1_0%,#311782_100%)] p-4 shadow-[2px_2px_4px_1px_#00000040]"
            style={{ aspectRatio: "1.45 / 1" }}
          >
            {/* Icon circle — h-9 w-9 already rem */}
            <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white">
              <Image alt="calender" src="/images/icons/calendar.svg" width={18} height={18} />
            </div>

            {/* Text */}
            <div className="relative z-10 mt-[4.5%]">
              <div className="flex items-center gap-1">
                {/* ↓ was text-[17px] */}
                <span className="text-[4.25vw] font-medium leading-tight text-white">
                  {t('quickActions.schedule.title')}
                </span>
                <span className="p-1.5 bg-[#6141B4] rounded-full">
                  <Image alt="->" src="/images/icons/arrow-left-white.svg" width={15} height={15} />
                </span>
              </div>
              {/* ↓ was text-[11px] */}
              <p className="mt-0.5 text-[2.75vw] text-white">
                {t('quickActions.schedule.subtitle')}
              </p>
            </div>

            {/* Ghost calendar — large, bottom-right */}
            <div className="pointer-events-none absolute bottom-3 right-3 z-0 w-20 sm:w-20 md:w-24 aspect-square">
              <Image
                src="/images/icons/calendar-bg.svg"
                alt="calendar"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Instant — gradient bg, person image right */}
          {/* ↓ minHeight:140 replaced with matching aspect-ratio */}
          <div
            className="relative rounded-[1.25rem] bg-[linear-gradient(110.16deg,#E1DBFD_0%,#E8D1F9_100%)] p-4 shadow-[2px_2px_4px_1px_#00000040]"
            style={{ aspectRatio: "1.45 / 1" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-0.5 rounded-xl bg-[#E1D2F9] px-2 py-1">
              <Image alt="flash" src="/images/icons/flash-color.svg" width={10} height={10} />
              {/* ↓ was text-[10px] */}
              <span className="text-[2.5vw] font-medium text-[#6C35DE]">
                {t('quickActions.instant.badge')}
              </span>
            </div>

            {/* Text — constrained to left 55% so image has room */}
            <div className="mt-2.5 w-[58%]">
              <div className="flex items-center gap-1.5">
                {/* ↓ was text-[17px] */}
                <span className="text-[4.25vw] font-medium leading-tight text-[#111]">
                  {t('quickActions.instant.title')}
                </span>
                {/* ↓ was h-[20px] w-[20px] → h-5 w-5 (rem) */}
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6C35DE]">
                  <Image alt="->" src="/images/icons/arrow-left-white.svg" width={15} height={15} />
                </div>
              </div>
              {/* ↓ was text-[11px] */}
              <p className="mt-0.5 text-[2.75vw] text-[#595959]">
                {t('quickActions.instant.subtitle')}
              </p>
            </div>

            {/* Person — right side, full card height */}
            <div className="absolute -top-5 bottom-0 right-0 w-[48%]">
              <Image
                src="/images/helper.png"
                alt="Helper"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* ── SERVICES SECTION ────────────────────────────────────────────────── */}
        <div className="px-4 pt-6">
          {/* Row header */}
          <div className="flex items-center justify-between">
            {/* ↓ was text-[26px] */}
            <h2 className="text-[6.5vw] font-semibold tracking-tight text-[#0D0D0D]">
              {t('services.title')}
            </h2>
            {/* ↓ was text-[13px] → text-sm (0.875rem) */}
            <button className="flex items-center gap-0.5 text-sm font-semibold text-[#6C35DE]">
              {t('services.viewAll')}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#6C35DE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Cards grid */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {services.map(({ key, Icon, image }) => (
              <div
                key={key}
                className="overflow-hidden rounded-xl bg-white"
                style={{ border: "1px solid rgba(0,0,0,0.05)" }}
              >
                {/* ↓ was h-[128px] fixed → aspect-ratio scales with card width */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    fill
                    sizes="(max-width: 640px) 50vw, 200px"
                    src={image}
                    alt={t(`services.list.${key}.title`)}
                    className="object-cover rounded-xl"
                  />
                  {/* Icon badge — h-8 w-8 already rem */}
                  <div className="absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                    <Image
                      src={Icon}
                      alt={t(`services.list.${key}.title`)}
                      width={18}
                      height={18}
                      className="h-[1.125rem] w-[1.125rem] object-contain"
                    />
                  </div>
                </div>

                {/* Body */}
                <div className="flex items-center justify-between p-3">
                  <div>
                    {/* ↓ was text-[16px] → text-base (1rem) */}
                    <h3 className="text-base font-medium text-[#111]">
                      {t(`services.list.${key}.title`)}
                    </h3>
                    {/* ↓ was text-[11px] */}
                    <p className="mt-0.5 whitespace-pre-line text-[2.75vw] leading-tight text-[#595959]">
                      {t(`services.list.${key}.subtitle`)}
                    </p>
                  </div>
                  <div className="aspect-square rounded-full bg-[#F3EDFE] p-1">
                    <Image alt="" src="/images/icons/arrow-left-color.svg" width={26} height={26} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOW TO BOOK ─────────────────────────────────────────────────────── */}
        <div className="px-4 pb-4 pt-7">
          {/* ↓ was text-[26px] */}
          <h2 className="text-[6.5vw] font-semibold tracking-tight text-black">
            How to book
          </h2>

          {/* Banner — rounded-[20px] → rounded-[1.25rem] */}
          <div
            className="relative mt-4 w-full overflow-hidden rounded-[1.25rem] shadow-md"
            style={{ background: "linear-gradient(135deg, #4921B2 0%, #6C35DE 60%, #7C3AED 100%)" }}
          >
            <Image
              alt="banner"
              src="/images/banners/how-to-book.png"
              width={700}
              height={240}
              sizes="(max-width: 640px) calc(100vw - 2rem), 400px"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
