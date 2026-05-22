"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

// ── SVG icon components ──────────────────────────────────────────────────────

function HomeIcon({ active }: { active: boolean }) {
  return active ? (
    // Filled house for active state
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.707 2.293a1 1 0 011.586 0l8 8A1 1 0 0120 12h-1v8a1 1 0 01-1 1h-4v-5H10v5H6a1 1 0 01-1-1v-8H4a1 1 0 01-.707-1.707l8-8z"
        fill="#6C35DE"
      />
    </svg>
  ) : (
    // Outline house for inactive
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookingsIcon({ active }: { active: boolean }) {
  const color = active ? "#6C35DE" : "#9CA3AF";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {/* Calendar body */}
      <rect
        x="3"
        y="4"
        width="18"
        height="17"
        rx="2.5"
        stroke={color}
        strokeWidth="1.8"
      />
      {/* Top bar */}
      <path d="M3 9h18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Pin hooks */}
      <path
        d="M8 2v4M16 2v4"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Checkmark inside calendar */}
      <path
        d="M8.5 15l2 2 4-4"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WalletIcon({ active }: { active: boolean }) {
  const color = active ? "#6C35DE" : "#9CA3AF";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {/* Card/wallet body */}
      <rect
        x="2"
        y="6"
        width="20"
        height="14"
        rx="2.5"
        stroke={color}
        strokeWidth="1.8"
      />
      {/* Top flap */}
      <path
        d="M2 10h20"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Coin dot */}
      <circle cx="17" cy="15" r="1.5" fill={color} />
    </svg>
  );
}

// ── Tab config ───────────────────────────────────────────────────────────────

const tabs = [
  { label: "home",     href: "/home",     Icon: HomeIcon },
  { label: "bookings", href: "/bookings", Icon: BookingsIcon },
  { label: "wallet",   href: "/wallet",   Icon: WalletIcon },
] as const;

// ── Component ────────────────────────────────────────────────────────────────

export function BottomNavigation() {
  const t = useTranslations('Common');
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center bg-[var(--app-background)] px-5 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] pt-2">
      <nav
        className="flex h-14 w-full max-w-sm items-center justify-around rounded-[28px] bg-white px-5 shadow-[0_4px_16px_rgba(17,17,17,0.04)]"
      >
        {tabs.map(({ label, href, Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200"
            >
              <Icon active={isActive} />
              <span
                className={cn(
                  "text-[13px] font-semibold transition-colors duration-200",
                  isActive ? "text-[#6C35DE]" : "text-[#9CA3AF]"
                )}
              >
                {t(label)}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
