"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const tabs = [
  {
    label: "Home",
    href: "/home",
    icon: "🏠",
  },
  {
    label: "Bookings",
    href: "/bookings",
    icon: "📅",
  },
  {
    label: "Wallet",
    href: "/wallet",
    icon: "👛",
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed",
        "bottom-5",
        "left-1/2",
        "z-50",
        "w-[calc(100%-2.5rem)]",
        "max-w-[36rem]",
        "-translate-x-1/2"
      )}
    >
      <div
        className={cn(
          "flex",
          "items-center",
          "justify-around",
          "rounded-full",
          "border",
          "border-black/5",
          "bg-white/95",
          "px-4",
          "py-4",
          "shadow-[0_0.625rem_2.5rem_rgba(0,0,0,0.08)]",
          "backdrop-blur-xl"
        )}
      >
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex",
                "flex-col",
                "items-center",
                "gap-1"
              )}
            >
              <span className="text-xl">
                {tab.icon}
              </span>

              <span
                className={cn(
                  "text-xs",
                  "font-semibold",
                  "transition-colors",
                  isActive ? "text-[#5B2FD1]" : "text-black/45"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
