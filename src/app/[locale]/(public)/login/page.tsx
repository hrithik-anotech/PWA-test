"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { markForwardNavigation } from "@/lib/navigation-transition";
import { setAppState } from "@/lib/storage";

export default function LoginPage() {
  const t = useTranslations('Login');
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsReady(true));
  }, []);

  const isButtonLoading = isLoading || isPending;

  const handleConfirm = async () => {
    if (phone.length < 10 || isButtonLoading) return;
    
    setIsLoading(true);
    
    // Simulate an API call to send OTP (Replace this with real fetch later)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    markForwardNavigation();
    localStorage.setItem("phone", phone);
    setAppState({
      isLoggedIn: false,
      profileCompleted: false,
      locationSelected: false,
      addressCompleted: false,
    });
    
    setIsLoading(false);
    
    startTransition(() => {
      router.push("/otp");
    });
  };

  const columns = [
    {
      images: ["/images/login/login-1.webp", "/images/login/login-4.webp"],
      wrapperClass: "-ml-3 -mt-4 sm:-ml-4 md:-ml-5",
      colAlign: "justify-start",
      imgW: "w-[clamp(6.5rem,14vh,10rem)]",
    },
    {
      images: ["/images/login/login-2.webp", "/images/login/login-5.webp"],
      wrapperClass: "-mt-20 sm:-mt-30 md:-mt-32",
      colAlign: "justify-start",
      imgW: "w-[clamp(7rem,15vh,10rem)]",
    },
    {
      images: ["/images/login/login-3.webp", "/images/login/login-6.webp"],
      wrapperClass: "-mr-3 -mt-4 sm:-mr-4 md:-mr-5",
      colAlign: "justify-start",
      imgW: "w-[clamp(6.5rem,14vh,10rem)]",
    },
  ];

  return (
    <div
      className={`relative flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-white transition-all duration-700 ease-out will-change-transform will-change-opacity ${
        isReady
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-95"
      }`}
    >
      {/* Top Gallery */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
        <div className="flex h-full items-stretch justify-between">
          {columns.map((col, ci) => (
            <div
              key={ci}
              className={`flex flex-col ${col.colAlign} gap-[2vh] ${col.wrapperClass}`}
            >
              {col.images.map((src, ii) => (
                <div
                  key={ii}
                  className={`relative shrink-0 overflow-hidden rounded-2xl ${col.imgW} aspect-3/4`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 34vw, 10rem"
                    quality={85}
                    priority={ii === 0}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex h-[55dvh] min-h-60 flex-none flex-col items-center overflow-hidden bg-white px-2 pt-[clamp(0.1rem,0.5dvh,0.75rem)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {/* Logo */}
        <div className="relative h-[clamp(6.5rem,25.5dvh,15.5rem)] w-[clamp(6.5rem,25.5dvh,15.5rem)] flex-none">
          <Image
            src="/images/logos/login-logo.webp"
            alt="Snibto"
            fill
            sizes="(max-width: 640px) 50vw, 15.5rem"
            quality={90}
            className="object-contain"
            priority
          />
        </div>

        {/* Phone Input */}
        <div className="mt-[clamp(0.5rem,1.5dvh,0.875rem)] w-full max-w-md">
          <div className="flex h-[clamp(2.75rem,6dvh,3.25rem)] items-center overflow-hidden rounded-2xl border border-[#e0d9f7] bg-white">
            <button
              type="button"

              className="flex h-full min-w-18 items-center gap-1.5 border-r border-[#e0d9f7] px-3 text-sm font-medium text-[#333]"
            >
              <Image
                src="/images/login/flag-india.png"
                alt="flag"
                height={20}
                width={20}
                className="shrink-0"
              />
              <span className="text-black">&#9660;</span>
            </button>

            <span className="pl-3 pr-1 text-base font-semibold">+91</span>

            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="numeric"
              placeholder={t('phonePlaceholder')}
              value={phone}
              onChange={(e) => {
                let digits = e.target.value.replace(/\D/g, "");

                // Remove India country code if present
                if (digits.startsWith("91") && digits.length > 10) {
                  digits = digits.slice(-10);
                }

                setPhone(digits.slice(0, 10));
              }}
              className="flex-1 bg-transparent pr-4 text-base font-semibold text-[#1a1a2e] outline-none placeholder:text-gray-400"
            />
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isButtonLoading}
            className={`mt-[clamp(0.5rem,1.4dvh,0.75rem)] flex h-[clamp(2.75rem,6dvh,3.15rem)] w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold uppercase tracking-[0.15em] text-white transition-opacity active:opacity-80 ${
              phone.length >= 10 && !isButtonLoading
                ? "bg-linear-to-br from-primary to-accent"
                : "bg-[#c4b5fd]"
            }`}
          >
            {isButtonLoading ? (
              <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {t('confirm')}
          </button>
        </div>

        <p className="mt-[clamp(0.5rem,5.5dvh,6rem)] max-w-sm text-center text-[0.7rem] leading-[1.35] text-[#888]">
          {t('termsPrefix')}
          <br />
          <button className="text-primary underline underline-offset-2">
            {t('termsOfUse')}
          </button>{" "}
          {t('and')}{" "}
          <button className="text-primary underline underline-offset-2">
            {t('privacyPolicy')}
          </button>
        </p>
      </div>
    </div>
  );
}
