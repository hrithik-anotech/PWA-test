import type { Viewport } from "next";
import Image from "next/image";

export const viewport: Viewport = {
  themeColor: "transparent",
  viewportFit: "cover",
};

// ── SVG icons for service cards ──────────────────────────────────────────────

function SprayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M11 3h2v3h-2zM7 6h8v2H7z" fill="#6C35DE" />
      <path d="M9 8v10a2 2 0 002 2h2a2 2 0 002-2V8H9z" fill="#6C35DE" opacity="0.15" stroke="#6C35DE" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15 10h3l1 2h-4" stroke="#6C35DE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 10v4" stroke="#6C35DE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BathtubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14v4a3 3 0 01-3 3H8a3 3 0 01-3-3v-4z" stroke="#6C35DE" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 12V7a2 2 0 012-2h2a2 2 0 012 2v1" stroke="#6C35DE" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 19v1M17 19v1" stroke="#6C35DE" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12h18" stroke="#6C35DE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WashingMachineIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="2" width="18" height="20" rx="2" stroke="#6C35DE" strokeWidth="1.5" />
      <circle cx="12" cy="13" r="4" stroke="#6C35DE" strokeWidth="1.5" />
      <circle cx="12" cy="13" r="2" stroke="#6C35DE" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="7" cy="6" r="1" fill="#6C35DE" />
      <circle cx="10" cy="6" r="1" fill="#6C35DE" />
      <path d="M14 6h4" stroke="#6C35DE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UtensilsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 3v7a4 4 0 01-4 4M9 3H5M9 3v18M19 3v4a2 2 0 01-2 2v10" stroke="#6C35DE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    title: "Cleaning",
    subtitle: "Keep your space\nfresh & clean",
    Icon: SprayIcon,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Bathroom",
    subtitle: "Sparkling clean\nbathrooms",
    Icon: BathtubIcon,
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Laundry",
    subtitle: "Clean, fresh &\nfolded with care",
    Icon: WashingMachineIcon,
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Utensils",
    subtitle: "Hygienic &\nsparkling utensils",
    Icon: UtensilsIcon,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#F2F2F6]">

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div className="bg-[#F2F2F6] pt-[env(safe-area-inset-top)]">
        <div className="rounded-b-[2.25rem] bg-[#6C35DE] px-5 pb-8 pt-3.5">
        <div className="flex items-start justify-between">
          {/* Left: text */}
          <div>
            <p className="text-[12px] font-medium tracking-wide text-white/60">
              Snibto in
            </p>
            <h1 className="mt-0.5 text-[38px] font-black leading-none tracking-tight text-white">
              8 Minutes
            </h1>
            {/* Location */}
            <div className="mt-2 flex items-center gap-1">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-[13px] font-medium text-white">
                Genex Exotica, Asansol WB
              </span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M7 10l5 5 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Right: avatar */}
          <div className="h-[44px] w-[44px] overflow-hidden rounded-full border-2 border-white/25">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop&crop=face"
              alt="Avatar"
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        </div>
      </div>

      {/* ── SCROLLABLE BODY ─────────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 88px)",
        }}
      >

        {/* ── SCHEDULE / INSTANT CARDS ──────────────────────────────────────── */}
        <div className="mx-4 mt-4 grid grid-cols-2 gap-3">

          {/* Schedule — dark purple with ghost calendar */}
          <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#4921B2] to-[#6835DC] p-4 shadow-md"
               style={{ minHeight: 140 }}>
            {/* Icon circle */}
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/15">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="17" rx="2.5" stroke="white" strokeWidth="1.8" />
                <path d="M3 9h18" stroke="white" strokeWidth="1.8" />
                <path d="M8 2v4M16 2v4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>

            {/* Text */}
            <div className="mt-[18px]">
              <div className="flex items-center gap-1">
                <span className="text-[17px] font-bold leading-tight text-white">Schedule</span>
                <span className="text-[15px] text-white/75">→</span>
              </div>
              <p className="mt-0.5 text-[11px] text-white/60">Pick your time</p>
            </div>

            {/* Ghost calendar — large, bottom-right */}
            <div className="pointer-events-none absolute -bottom-2 -right-2 opacity-[0.18]">
              <svg width="88" height="88" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="17" rx="2.5" stroke="white" strokeWidth="1.2" />
                <path d="M3 9h18" stroke="white" strokeWidth="1.2" />
                <path d="M8 2v4M16 2v4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="7" cy="14" r="1.2" fill="white" />
                <circle cx="12" cy="14" r="1.2" fill="white" />
                <circle cx="17" cy="14" r="1.2" fill="white" />
                <circle cx="7" cy="18" r="1.2" fill="white" />
                <circle cx="12" cy="18" r="1.2" fill="white" />
              </svg>
            </div>
          </div>

          {/* Instant — white bg, person image right */}
          <div className="relative overflow-hidden rounded-[20px] bg-white p-4 shadow-sm"
               style={{ minHeight: 140 }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-0.5 rounded-full bg-[#F0E8FF] px-2 py-[3px]">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#6C35DE">
                <path d="M13 2L4.09 12.96A1 1 0 005 14.5h6.5L10 22l9.91-10.96A1 1 0 0019 9.5h-6.5L13 2z" />
              </svg>
              <span className="text-[10px] font-semibold text-[#6C35DE]">Instant Help</span>
            </div>

            {/* Text — constrained to left 55% so image has room */}
            <div className="mt-2.5 w-[58%]">
              <div className="flex items-center gap-1.5">
                <span className="text-[17px] font-bold leading-tight text-[#111]">Instant</span>
                <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#6C35DE]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <p className="mt-0.5 text-[11px] text-black/45">Get help now</p>
            </div>

            {/* Person — right side, full card height */}
            <div className="absolute bottom-0 right-0 top-0 w-[48%]">
              <Image
                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=300&auto=format&fit=crop&crop=top"
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
            <h2 className="text-[26px] font-black tracking-tight text-[#0D0D0D]">
              Services
            </h2>
            <button className="flex items-center gap-0.5 text-[13px] font-semibold text-[#6C35DE]">
              View all
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#6C35DE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Cards grid */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {services.map(({ title, subtitle, Icon, image }) => (
              <div
                key={title}
                className="overflow-hidden rounded-[18px] bg-white shadow-sm"
                style={{ border: "1px solid rgba(0,0,0,0.05)" }}
              >
                {/* Image area */}
                <div className="relative h-[128px] w-full overflow-hidden">
                  <Image
                    fill
                    sizes="(max-width: 640px) 50vw, 200px"
                    src={image}
                    alt={title}
                    className="object-cover"
                  />
                  {/* Icon badge — bottom-left over image */}
                  <div className="absolute bottom-2 left-2 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white shadow-sm">
                    <Icon />
                  </div>
                </div>

                {/* Body */}
                <div className="px-3 pb-3.5 pt-2.5">
                  <h3 className="text-[15px] font-bold tracking-tight text-[#0D0D0D]">
                    {title}
                  </h3>
                  <p className="mt-[3px] whitespace-pre-line text-[11px] leading-[1.55] text-black/40">
                    {subtitle}
                  </p>
                  {/* Arrow */}
                  <div className="mt-3 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#F0E8FF]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="#6C35DE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOW TO BOOK ─────────────────────────────────────────────────────── */}
        <div className="px-4 pt-7 pb-4">
          <h2 className="text-[26px] font-black tracking-tight text-[#0D0D0D]">
            How to book
          </h2>

          {/* Banner */}
          <div className="relative mt-4 overflow-hidden rounded-[20px] shadow-md"
               style={{ background: "linear-gradient(135deg, #4921B2 0%, #6C35DE 60%, #7C3AED 100%)", minHeight: 160 }}>

            {/* Left text */}
            <div className="relative z-10 p-5">
              <div className="flex items-center gap-1.5">
                <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white/20">
                  <span className="text-[10px] font-black text-white">S</span>
                </div>
                <span className="text-[11px] font-semibold text-white/70">Snibto</span>
              </div>
              <p className="mt-3 text-[30px] font-black leading-none tracking-wide text-white">
                HOUSE
                <br />
                HELP
              </p>
              <div className="mt-3 inline-flex items-center rounded-full bg-white px-3 py-1">
                <span className="text-[12px] font-black text-[#4921B2]">in 10 min</span>
              </div>
            </div>

            {/* Play button center */}
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Right branding */}
            <div className="absolute right-4 top-4 z-10 flex flex-col items-end gap-1">
              <div className="flex items-center gap-1">
                <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white/20">
                  <span className="text-[10px] font-black text-white">S</span>
                </div>
                <span className="text-[10px] font-semibold text-white/70">Snibto</span>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-white/[0.04]" />
            <div className="pointer-events-none absolute -bottom-4 right-12 h-28 w-28 rounded-full bg-white/[0.04]" />
          </div>
        </div>

      </div>
    </div>
  );
}
