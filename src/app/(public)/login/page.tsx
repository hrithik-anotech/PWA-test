"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { markForwardNavigation } from "@/lib/navigation-transition";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handleConfirm = () => {
    if (phone.length < 10) return;
    markForwardNavigation();
    localStorage.setItem("isLoggedIn", "true");
    router.push("/otp");
  };

  const sideImages = [
    {
      src: "/images/login/login-1.png",
      className:
        "-left-3 top-[clamp(0.5rem,1.8dvh,1rem)] h-[clamp(7rem,21dvh,12.75rem)] w-[clamp(3.875rem,20vw,7rem)] scale-[1.04] sm:h-[clamp(8.5rem,24dvh,12.75rem)] sm:w-[clamp(4.75rem,24vw,7rem)] sm:scale-[1.08]",
    },
    {
      src: "/images/login/login-4.png",
      className:
        "-left-3 bottom-[clamp(1.25rem,8dvh,4.75rem)] h-[clamp(7rem,21dvh,12.75rem)] w-[clamp(3.875rem,20vw,7rem)] scale-[1.04] sm:h-[clamp(8.5rem,24dvh,12.75rem)] sm:w-[clamp(4.75rem,24vw,7rem)] sm:scale-[1.08]",
    },
    {
      src: "/images/login/login-3.png",
      className:
        "-right-3 top-[clamp(0.5rem,1.8dvh,1rem)] h-[clamp(7rem,21dvh,12.75rem)] w-[clamp(3.875rem,20vw,7rem)] scale-[1.04] sm:h-[clamp(8.5rem,24dvh,12.75rem)] sm:w-[clamp(4.75rem,24vw,7rem)] sm:scale-[1.08]",
    },
    {
      src: "/images/login/login-6.png",
      className:
        "-right-3 bottom-[clamp(1.25rem,8dvh,4.75rem)] h-[clamp(7rem,21dvh,12.75rem)] w-[clamp(3.875rem,20vw,7rem)] scale-[1.04] sm:h-[clamp(8.5rem,24dvh,12.75rem)] sm:w-[clamp(4.75rem,24vw,7rem)] sm:scale-[1.08]",
    },
  ];

  return (
    <div className="relative flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-white">
      {/* Top Gallery */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
        {/* Side Images */}
        {sideImages.map((item, index) => (
          <div
            key={index}
            className={`absolute overflow-hidden rounded-2xl ${item.className}`}
          >
            <Image
              src={item.src}
              alt=""
              fill
              sizes="(max-width: 640px) 28vw, 112px"
              className="object-cover"
            />
          </div>
        ))}

        {/* Top Center Image */}
        <div className="absolute left-1/2 top-[clamp(-2.25rem,-5dvh,-1rem)] h-[clamp(7.25rem,22dvh,13rem)] w-[clamp(5.5rem,29vw,10.5rem)] -translate-x-1/2 scale-[1.05] overflow-hidden rounded-2xl sm:h-[clamp(8.75rem,25dvh,13rem)] sm:w-[clamp(6.75rem,35vw,10.5rem)] sm:scale-[1.12]">
          <Image
            src="/images/login/login-2.png"
            alt=""
            fill
            sizes="(max-width: 640px) 30vw, 168px"
            className="object-cover"
          />
        </div>

        {/* Bottom Center Image */}
        <div className="absolute bottom-[clamp(2.5rem,9dvh,5rem)] left-1/2 h-[clamp(7.25rem,22dvh,13rem)] w-[clamp(5.5rem,29vw,10.5rem)] -translate-x-1/2 scale-[1.05] overflow-hidden rounded-2xl sm:h-[clamp(8.75rem,25dvh,13rem)] sm:w-[clamp(6.75rem,35vw,10.5rem)] sm:scale-[1.12]">
          <Image
            src="/images/login/login-5.png"
            alt=""
            fill
            sizes="(max-width: 640px) 30vw, 168px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex h-[45dvh] min-h-[15rem] flex-none flex-col items-center overflow-hidden bg-white px-6 pt-[clamp(0.5rem,1.4dvh,0.875rem)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {/* Logo */}
        <div className="relative h-[clamp(5.5rem,15dvh,8rem)] w-[clamp(5.5rem,15dvh,8rem)] flex-none">
          <Image
            src="/images/logos/login-logo.png"
            alt="Snibto"
            fill
            sizes="128px"
            className="object-contain"
            priority
          />
        </div>

        {/* Phone Input */}
        <div className="mt-[clamp(0.5rem,1.5dvh,0.875rem)] w-full max-w-sm">
          <div className="flex h-[clamp(2.75rem,6dvh,3.25rem)] items-center overflow-hidden rounded-2xl border border-[#e0d9f7] bg-white">
            {/* Country selector */}
            <button
              type="button"
              className="flex h-full min-w-[72px] items-center gap-1.5 border-r border-[#e0d9f7] px-3 text-sm font-medium text-[#333]"
            >
              <Image
                src="/images/login/flag-india.png"
                alt="flag"
                height={20}
                width={30}
              />
              <span className="text-black">&#9660;</span>
            </button>

            {/* +91 prefix */}
            <span className="pl-3 pr-1 text-base font-semibold">
              +91
            </span>

            {/* Number input */}
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Enter Mobile"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="flex-1 bg-transparent pr-4 text-base font-medium text-[#1a1a2e] outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Confirm Button */}
          <button
            type="button"
            onClick={handleConfirm}
            className={`mt-[clamp(0.5rem,1.4dvh,0.75rem)] h-[clamp(2.75rem,6dvh,3.15rem)] w-full rounded-2xl text-sm font-bold uppercase tracking-[0.15em] text-white transition-opacity active:opacity-80 ${
              phone.length >= 10
                ? "bg-gradient-to-br from-[#5b2fd1] to-[#7c3aed]"
                : "bg-[#c4b5fd]"
            }`}
          >
            Confirm
          </button>
        </div>

        {/* Footer */}
        <p className="mt-[clamp(0.5rem,1.3dvh,0.875rem)] max-w-sm text-center text-[0.7rem] leading-[1.35] text-[#888]">
          By proceeding, I accept the{" "}
          <button className="text-[#5b2fd1] underline underline-offset-2">
            Terms of use
          </button>{" "}
          &{" "}
          <button className="text-[#5b2fd1] underline underline-offset-2">
            Privacy policy
          </button>
        </p>
      </div>
    </div>
  );
}
