"use client";

import { useState } from "react";

import { AuthHeader } from "@/components/auth/auth-header";
import { AuthLayout } from "@/components/auth/auth-layout";
import { PrimaryButton } from "@/components/ui/primary-button";
import { useRouter } from "next/navigation";
import { markForwardNavigation } from "@/lib/navigation-transition";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");

  const handleContinue = () => {
    if (phone.length < 10) {
      return;
    }

    markForwardNavigation();
    localStorage.setItem("isLoggedIn", "true");
    router.push("/otp");
  };

  return (
    <AuthLayout>
      <div className="flex min-h-0 flex-1 flex-col justify-center py-2">
        <AuthHeader
          title="Enter your mobile number"
          description="We’ll send you a verification code to continue booking trusted home helpers."
        />

        <div className="mt-[clamp(1rem,4.5vw,2.5rem)]">
          <label className="mb-3 block text-sm font-semibold text-black/70">
            Mobile Number
          </label>

          <div className="flex items-center gap-[clamp(0.5rem,2.5vw,0.75rem)]">
            <div className="flex h-[clamp(3rem,12vw,4rem)] w-[clamp(3rem,12vw,4rem)] items-center justify-center rounded-[1.5rem] border border-black/10 bg-white text-2xl shadow-sm">
              🇮🇳
            </div>

            <input
              type="tel"
              inputMode="numeric"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(event) => {
                const value = event.target.value.replace(/\D/g, "");
                setPhone(value);
              }}
              className="h-[clamp(3rem,12vw,4rem)] flex-1 rounded-[1.5rem] border border-black/10 bg-white px-4 text-[clamp(1rem,3.8vw,1.125rem)] font-medium tracking-wide outline-none transition-all focus:border-[#5B2FD1]"
            />
          </div>

          <PrimaryButton
            fullWidth
            className="mt-[clamp(0.875rem,4vw,2rem)]"
            onClick={handleContinue}
          >
            Continue
          </PrimaryButton>

          <p className="mt-[clamp(0.75rem,3vw,1.5rem)] text-center text-sm leading-6 text-black/45">
            By proceeding, you agree to Snibto’s Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
