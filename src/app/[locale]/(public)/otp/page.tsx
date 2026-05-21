"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { markForwardNavigation } from "@/lib/navigation-transition";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function OTPPage() {
  const t = useTranslations('OTP');
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(20);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Phone number from storage
  const phone =
    typeof window !== "undefined"
      ? localStorage.getItem("phone") || "9876 543 210"
      : "9876 543 210";

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next input
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(20);
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleContinue = () => {
    if (otp.every((d) => d !== "")) {
      markForwardNavigation();
      router.push("/profile-setup");
    }
  };

  const isComplete = otp.every((d) => d !== "");
  const canResend = timer === 0;

  return (
    <div className="flex min-h-screen flex-col bg-white px-6 pt-12">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex h-11 w-11 items-center justify-start rounded-full text-2xl text-black active:bg-gray-200"
      >
        <Image alt="back" src="/images/arrow-left.svg" height={22} width={22} />
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>

      {/* Subtitle */}
      <p className="mt-2 text-sm leading-6 text-gray-500">
        {t('subtitle')}
        <br />
        <span className="font-medium text-gray-800">+91 {phone}</span>
      </p>

      {/* OTP Inputs */}
      <div className="mt-8 flex justify-center gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="h-16 w-16 rounded-2xl border text-center text-2xl font-semibold outline-none transition-all"
            style={{
              borderColor: digit
                ? "#7c3aed"
                : index === otp.findIndex((d) => d === "")
                  ? "#7c3aed"
                  : "#e5e7eb",
              color: "#1a1a2e",
              background: "white",
              boxShadow:
                index === otp.findIndex((d) => d === "")
                  ? "0 0 0 2px #ede9fe"
                  : "none",
            }}
            autoFocus={index === 0}
          />
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="mt-8 w-full rounded-2xl py-4 text-sm font-bold uppercase tracking-widest text-white transition-opacity active:opacity-80"
        style={{
          background: isComplete
            ? "linear-gradient(135deg, #7c3aed 0%, #9f67f7 100%)"
            : "#c4b5fd",
          letterSpacing: "0.15em",
        }}
      >
        {t('continue')}
      </button>
      {/* Resend */}
      <p className="mt-4 text-center text-sm text-gray-500">
        {canResend ? (
          <button
            onClick={handleResend}
            className="font-semibold"
            style={{ color: "#7c3aed" }}
          >
            {t('resendButton')}
          </button>
        ) : (
          <>{t('resendText')} <span style={{ color: "#7c3aed" }} className="font-semibold">{timer}s</span></>
        )}
      </p>
    </div>
  );
}
