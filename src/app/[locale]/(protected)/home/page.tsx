
import type { Viewport } from "next";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import HomeServicesSection from "@/components/services/HomeServicesSection";
import { getIKUrl, HOME_SERVICE_IMAGE_TRANSFORM } from "@/lib/imagekit";
import LocationHeader from "@/components/location/LocationHeader";

export const viewport: Viewport = {
  themeColor: "#5F30CA",
  viewportFit: "cover",
};


// ── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    key: "cleaning",
    Icon: "/images/icons/spray.svg",
    image: getIKUrl("/services/cleaning.jpg", HOME_SERVICE_IMAGE_TRANSFORM),
    fallback: "/images/services/cleaning.png",
  },
  {
    key: "bathroom",
    Icon: "/images/icons/bath.svg",
    image: getIKUrl("/services/bathroom.jpg", HOME_SERVICE_IMAGE_TRANSFORM),
    fallback: "/images/services/bathroom.png",
  },
  {
    key: "laundry",
    Icon: "/images/icons/wash.svg",
    image: getIKUrl("/services/laundry.jpg", HOME_SERVICE_IMAGE_TRANSFORM),
    fallback: "/images/services/laundry.png",
  },
  {
    key: "utensils",
    Icon: "/images/icons/utensils.svg",
    image: getIKUrl("/services/utensils.jpg", HOME_SERVICE_IMAGE_TRANSFORM),
    fallback: "/images/services/utensils.png",
  },
] as const;

const serviceDrawerCopy = {
  cleaning: {
    included: [
      "Sweep and mop accessible floors",
      "Dust furniture and reachable surfaces",
      "Dispose household waste",
    ],
    notIncluded: [
      "Unsafe or inaccessible areas",
      "Moving heavy furniture",
      "Child, elderly, pet or medical care",
    ],
  },
  bathroom: {
    included: [
      "Scrub toilet, sink, and taps",
      "Clean mirrors and counters",
      "Mop bathroom floor",
    ],
    notIncluded: [
      "Drain unclogging or plumbing work",
      "Deep descaling fixtures",
      "Pest or mold remediation",
    ],
  },
  laundry: {
    included: [
      "Wash regular daily clothes",
      "Dry and fold clean laundry",
      "Sort lights and darks",
    ],
    notIncluded: [
      "Dry cleaning or delicate-only garments",
      "Stain removal guarantee",
      "Ironing heavy garments",
    ],
  },
  utensils: {
    included: [
      "Wash used utensils",
      "Clean sink area after washing",
      "Arrange cleaned dishes",
    ],
    notIncluded: [
      "Cleaning burnt cookware",
      "Appliance repair or maintenance",
      "Kitchen deep cleaning",
    ],
  },
} as const;

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const t = await getTranslations('Home');
  const serviceCards = services.map((service) => {
    const copy =
      serviceDrawerCopy[
        service.key as keyof typeof serviceDrawerCopy
      ];

    return {
      id: service.key,
      icon: service.Icon,
      image: service.image || service.fallback,
      fallbackImage: service.fallback,
      label: t(`services.list.${service.key}.title`),
      subtitle: t(`services.list.${service.key}.subtitle`),
      includedItems: copy.included.map((text) => ({
        text,
        icon: service.Icon,
      })),
      notIncludedItems: copy.notIncluded.map((text) => ({
        text,
        icon: service.Icon,
      })),
    };
  });

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--app-background)]">

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-[var(--app-background)] pb-2">
        <div aria-hidden="true" className="h-[env(safe-area-inset-top)] bg-[#5F30CA]" />
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
              <LocationHeader />
            </div>

            {/* Right: avatar — h-12 w-12 already rem-based */}
            <Link
              href="/profile"
              className="h-12 w-12 mt-4 overflow-hidden rounded-full border-2 border-white/25"
            >
              <Image
                src="/images/login/profile-placeholder.png"
                alt="Avatar"
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            </Link>
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
            className="relative overflow-hidden rounded-[1.25rem] bg-[linear-gradient(116.15deg,#815BE1_0%,#311782_100%)] p-4 shadow-[2px_2px_4px_1px_#000000/40]"
            style={{ aspectRatio: "1.45 / 1" }}
          >
            {/* Icon circle — h-9 w-9 already rem */}
            <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white">
              <Image
                alt="calender"
                src="/images/icons/calendar.svg"
                width={14}
                height={15}
                className="h-[1.125rem] w-auto"
              />
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
            <div className="pointer-events-none absolute bottom-5 right-1 md:right-3 z-0 w-20 sm:w-20 md:w-24 aspect-square">
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
          <Link
          href="/bookings/instant"
            className="relative rounded-[1.25rem] bg-[linear-gradient(110.16deg,#E1DBFD_0%,#E8D1F9_100%)] p-4 shadow-[2px_2px_4px_1px_#000000/40]"
            style={{ aspectRatio: "1.45 / 1" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-0.5 rounded-xl bg-[#E1D2F9] px-2 py-1">
              <Image
                alt="flash"
                src="/images/icons/flash-color.svg"
                width={11}
                height={14}
                className="h-2.5 w-auto"
              />
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
                src="/images/helper.webp"
                alt="Helper"
                fill
                sizes="(max-width: 640px) 24vw, 8rem"
                quality={85}
                priority
                className="object-cover object-top"
              />
            </div>
          </Link>
        </div>

        {/* ── SERVICES SECTION ────────────────────────────────────────────────── */}
        <HomeServicesSection
          services={serviceCards}
          title={t('services.title')}
          viewAllLabel={t('services.viewAll')}
        />

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
              src="/images/banners/how-to-book.webp"
              width={700}
              height={240}
              sizes="(max-width: 640px) calc(100vw - 2rem), 400px"
              quality={85}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
