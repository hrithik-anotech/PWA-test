"use client";

import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

type NavIconProps = {
  active: boolean;
  activeSrc: string;
  inactiveSrc: string;
  activeSize: { width: number; height: number };
  inactiveSize: { width: number; height: number };
  label: string;
};

function NavIcon({
  active,
  activeSrc,
  inactiveSrc,
  activeSize,
  inactiveSize,
  label,
}: NavIconProps) {
  const src = active ? activeSrc : inactiveSrc;
  const size = active ? activeSize : inactiveSize;

  return (
    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center">
      <Image
        src={src}
        alt={active ? `${label} active` : label}
        width={size.width}
        height={size.height}
        style={{ height: 22, width: "auto" }}
      />
    </span>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <NavIcon
      active={active}
      activeSrc="/images/icons/nav-home.svg"
      inactiveSrc="/images/icons/nav-home-1.svg"
      activeSize={{ width: 16, height: 18 }}
      inactiveSize={{ width: 16, height: 18 }}
      label="Home"
    />
  );
}

function BookingsIcon({ active }: { active: boolean }) {
  return (
    <NavIcon
      active={active}
      activeSrc="/images/icons/nav-book.svg"
      inactiveSrc="/images/icons/nav-book-1.svg"
      activeSize={{ width: 18, height: 19 }}
      inactiveSize={{ width: 19, height: 20 }}
      label="Bookings"
    />
  );
}

function WalletIcon({ active }: { active: boolean }) {
  return (
    <NavIcon
      active={active}
      activeSrc="/images/icons/nav-wallet.svg"
      inactiveSrc="/images/icons/nav-wallet-1.svg"
      activeSize={{ width: 20, height: 20 }}
      inactiveSize={{ width: 20, height: 20 }}
      label="Wallet"
    />
  );
}


const tabs = [
  { label: "home", href: "/home", Icon: HomeIcon },
  { label: "bookings", href: "/profile/mybookings", Icon: BookingsIcon },
  { label: "wallet", href: "/wallet", Icon: WalletIcon },
] as const;


export function BottomNavigation() {
  const t = useTranslations("Common");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 flex justify-center bg-transparent px-5 pb-[calc(env(safe-area-inset-bottom,0)+0.5rem)] pt-2">
      <nav className="flex h-[6vh] min-h-12.5 w-full max-w-sm items-center justify-around rounded-[1.75rem] bg-white px-5 shadow-[0_0.25rem_1rem_rgba(17,17,17,0.04)]">
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
                  "text-sm font-semibold transition-colors duration-200",
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
