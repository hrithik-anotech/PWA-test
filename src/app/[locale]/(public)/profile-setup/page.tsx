"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { markForwardNavigation } from "@/lib/navigation-transition";
import { setAppState } from "@/lib/storage";

export default function ProfileSetupPage() {
  const t = useTranslations('ProfileSetup');
  const router = useRouter();
  const [name, setName] = useState("");

  const handleContinue = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    localStorage.setItem("userName", trimmedName);
    setAppState({
      profileCompleted: true,
      locationSelected: false,
      addressCompleted: false,
    });
    markForwardNavigation();
    router.replace("/location/access");
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start pt-16 font-(--font-urbanist) overflow-hidden">
      {/* Blurred gradient background layer only */}
      <div
        className="absolute inset-0 blur-2xl scale-110"
        style={{
          background:
            "radial-gradient(ellipse at top left, #651EC8 0%, white 40%, white 60%, #651EC8 100%)",
        }}
      />

      {/* All content sits above the blur — no blur applied here */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Avatar */}
        <div className="mb-10 mt-6">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full  shadow-lg">
            <div className="relative h-full w-full">
              <Image
                alt="profile placeholder"
                src="/images/login/profile-placeholder.png"
                fill
                sizes="86px"
                className="object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="w-full max-w-sm px-8 flex flex-col items-center gap-6">
          <h1 className="text-[1.75rem] font-semibold text-[#111111] text-center leading-snug">
            {t('title')}{" "}
            <span className="text-[#651EC8]">{t('you')}</span>?
          </h1>

          <input
            type="text"
            placeholder={t('placeholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl bg-white px-5 py-4 text-[#111111] placeholder-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-[#651EC8]/30 text-base"
            style={{ border: "none" }}
          />

          <button
            type="button"
            onClick={handleContinue}
            className="w-full flex items-center justify-center rounded-2xl py-4 text-white font-semibold tracking-widest text-sm uppercase shadow-md transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #8b5fd4 0%, #7c4bc8 50%, #8b6bd4 100%)",
            }}
          >
            {t('continue')}
          </button>
        </div>
      </div>
    </main>
  );
}
