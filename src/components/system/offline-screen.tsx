"use client";

import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";

type OfflineScreenProps = {
  onRetry?: () => void;
};

export default function OfflineScreen({
  onRetry,
}: OfflineScreenProps) {
  const t = useTranslations('Offline');
  return (
    <main
      className={cn(
        "h-dvh",
        "overflow-hidden",
        "bg-[#FCFCFF]",
        "font-[var(--font-urbanist)]"
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-sm flex-col">
        {/* TOP VISUAL */}
        <section className="relative flex h-[58dvh] items-center justify-center overflow-hidden px-6">
          {/* BACKGROUND */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#E9D5FF] via-white to-[#DDD6FE]" />

          {/* RADIAL GLOW */}
          <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/10 blur-3xl" />

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col items-center">
            {/* ICON CONTAINER */}
            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white/70 shadow-[0_20px_60px_rgba(91,47,209,0.12)] backdrop-blur-xl">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#5B2FD1] to-[#8B5CF6] text-5xl shadow-[0_10px_30px_rgba(91,47,209,0.35)]">
                📡
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CARD */}
        <section
          className={cn(
            "relative",
            "h-[42dvh]",
            "overflow-hidden",
            "rounded-t-[2.5rem]",
            "bg-gradient-to-br",
            "from-[#5B2FD1]",
            "via-[#6D3EF0]",
            "to-[#B18BFF]",
            "px-7",
            "pt-9",
            "pb-[calc(env(safe-area-inset-bottom,0px)+1.75rem)]",
            "text-white"
          )}
        >
          {/* OVERLAY */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]" />

          <div className="relative z-10 flex h-full flex-col">
            {/* TEXT */}
            <div>
              <h1 className="text-center text-[2.375rem] font-bold leading-[3rem] tracking-[-0.04em]">
                {t('title')}
              </h1>

              <p className="mt-5 text-center text-[1.125rem] font-medium leading-9 text-white/82">
                {t('message')}
              </p>
            </div>

            {/* ACTION */}
            <div className="mt-auto">
              <button
                onClick={
                  onRetry ??
                  (() => window.location.reload())
                }
                className={cn(
                  "flex",
                  "h-14",
                  "w-full",
                  "items-center",
                  "justify-center",
                  "rounded-full",
                  "bg-white",
                  "px-6",
                  "text-[1.125rem]",
                  "font-bold",
                  "text-[#5B2FD1]",
                  "shadow-[0_10px_30px_rgba(255,255,255,0.18)]",
                  "transition-transform",
                  "active:scale-[0.98]"
                )}
              >
                {t('retry')}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
