"use client";

import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <main
      className={cn(
        "min-h-dvh",
        "flex flex-col md:flex-row",
        "bg-[#FCFCFF]",
        "font-[var(--font-urbanist)]"
      )}
    >
      {/* TOP/LEFT VISUAL */}
      <section className="relative flex h-[50dvh] md:h-dvh md:flex-1 items-center justify-center overflow-hidden px-6">
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E9D5FF] via-white to-[#DDD6FE]" />

        {/* RADIAL GLOW */}
        <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] md:h-[30rem] md:w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/10 blur-3xl" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center">
          {/* ICON CONTAINER */}
          <div className="flex h-36 w-36 md:h-48 md:w-48 items-center justify-center rounded-full bg-white/70 shadow-[0_20px_60px_rgba(91,47,209,0.12)] backdrop-blur-xl">
            <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#5B2FD1] to-[#8B5CF6] text-4xl md:text-5xl font-bold text-white shadow-[0_10px_30px_rgba(91,47,209,0.35)]">
              404
            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center gap-2">
             <div className="h-1.5 w-12 rounded-full bg-[#5B2FD1]/20" />
             <div className="h-1.5 w-8 rounded-full bg-[#5B2FD1]/10" />
          </div>
        </div>
      </section>

      {/* BOTTOM/RIGHT CARD */}
      <section
        className={cn(
          "relative",
          "h-[50dvh] md:h-dvh md:flex-1",
          "overflow-hidden",
          "rounded-t-[2.5rem] md:rounded-t-none md:rounded-l-[3rem]",
          "bg-gradient-to-br",
          "from-[#5B2FD1]",
          "via-[#6D3EF0]",
          "to-[#B18BFF]",
          "px-7 md:px-12",
          "pt-9 md:pt-0",
          "pb-[calc(env(safe-area-inset-bottom,0px)+1.75rem)] md:pb-0",
          "text-white",
          "flex items-center"
        )}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]" />

        <div className="relative z-10 flex h-full md:h-auto w-full flex-col md:justify-center">
          {/* TEXT */}
          <div className="md:max-w-md md:mx-auto">
            <h1 className="text-center md:text-left text-[2rem] md:text-[3.5rem] font-bold leading-tight tracking-[-0.04em]">
              {t('title')}
            </h1>

            <p className="mt-5 text-center md:text-left text-[1rem] md:text-[1.25rem] font-medium leading-relaxed text-white/82">
              {t('message')}
            </p>
          </div>

          {/* ACTION */}
          <div className="mt-auto md:mt-10 md:max-w-md md:mx-auto w-full">
            <Link
              href="/"
              className={cn(
                "flex",
                "h-14 md:h-16",
                "w-full",
                "items-center",
                "justify-center",
                "rounded-full",
                "bg-white",
                "px-6",
                "text-[1.125rem] md:text-[1.25rem]",
                "font-bold",
                "text-[#5B2FD1]",
                "shadow-[0_10px_30px_rgba(255,255,255,0.18)]",
                "transition-transform",
                "active:scale-[0.98]",
                "hover:scale-[1.02] duration-200"
              )}
            >
              {t('button')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
