"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { markForwardNavigation } from "@/lib/navigation-transition";
import { cn } from "@/lib/cn";

import { OnboardingLayout } from "./onboarding-layout";
import { OnboardingContent } from "./onboarding-content";
import { OnboardingFooter } from "./onboarding-footer";

import { useTranslations } from "next-intl";
import { setAppState } from "@/lib/storage";

type OnboardingStep = {
  id: number;
  titleKey: "step1.title" | "step2.title" | "step3.title";
  descriptionKey:
    | "step1.description"
    | "step2.description"
    | "step3.description";
  image: string;
  next:
    | "/onboarding/step-2"
    | "/onboarding/step-3"
    | "/login";
  previous:
    | "/onboarding/step-1"
    | "/onboarding/step-2"
    | null;
};

type Props = {
  step: OnboardingStep;
};

export function OnboardingScreen({
  step,
}: Props) {
  const t = useTranslations('Onboarding');
  const isLastStep = step.id === 3;

  const handleComplete = () => {
    setAppState({
      onboardingCompleted: true,
      isLoggedIn: false,
      profileCompleted: false,
      locationSelected: false,
      addressCompleted: false,
    });
  };

  const handleForward = () => {
    markForwardNavigation();
  };

  return (
    <OnboardingLayout>
      {/* TOP CONTENT */}
      <OnboardingContent>
        {/* APP SCREEN MOCKUP */}
        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
          <div className="relative h-full max-h-full w-full max-w-[clamp(22rem,95vw,32rem)] overflow-hidden rounded-[clamp(1.25rem,5vw,2.5rem)]">
            <Image
              src={step.image}
              alt={t(step.titleKey)}
              fill
              sizes="(max-width: 640px) 95vw, 448px"
              priority
              className="object-contain mask-[linear-gradient(to_bottom,black_72%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]"
            />
          </div>
        </div>
      </OnboardingContent>

      {/* BOTTOM CONTENT */}
      <OnboardingFooter>
        <div className="mx-auto flex h-full w-full max-w-md flex-col justify-between gap-2">
          {/* DOTS */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((item) => {
              const isActive =
                item === step.id;

              return (
                <div
                  key={item}
                  className={cn(
                    "h-1.5",
                    "rounded-full",
                    "transition-all",
                    "duration-300",
                    isActive ? "w-7 bg-white" : "w-1.5 bg-white/35"
                  )}
                />
              );
            })}
          </div>
          {/* TEXT */}
          <div className="mx-auto w-full max-w-md px-2 pb-[clamp(0.75rem,2dvh,1.25rem)] text-center">
            <h1 className="text-[clamp(1.45rem,6vw,2.25rem)] font-bold leading-[1.12] tracking-[-0.02em] text-[#ffffff]">
              {t(step.titleKey)}
            </h1>

            <p className="mt-[clamp(0.375rem,1.1dvh,0.75rem)] text-[clamp(0.875rem,3.4vw,1.0625rem)] font-medium leading-[1.4] text-white/65">
              {t(step.descriptionKey)}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-between gap-3">
            <Link
              replace
              href="/login"
              onClick={() => {
                handleForward();
                handleComplete();
              }}
              className="text-[clamp(0.9375rem,3.6vw,1.125rem)] font-semibold text-white/55 transition-opacity active:opacity-60"
            >
              {t('skip')}
            </Link>

            <Link
              replace={isLastStep}
              href={step.next}
              onClick={() => {
                handleForward();

                if (isLastStep) {
                  handleComplete();
                }
              }}
              className={cn(
                "flex",
                "h-[clamp(2.375rem,6dvh,2.875rem)]",
                "min-w-[clamp(6rem,28vw,8.125rem)]",
                "items-center",
                "justify-center",
                "rounded-full",
                "bg-white",
                "px-[clamp(1rem,4vw,2rem)]",
                "text-[clamp(0.9375rem,3.6vw,1.125rem)]",
                "font-bold",
                "text-[#5B2FD1]",
                "shadow-[0_10px_30px_rgba(255,255,255,0.18)]",
                "transition-transform",
                "active:scale-[0.98]"
              )}
            >
              {step.id === 3 ? t('start') : t('next')}
            </Link>
          </div>
        </div>
      </OnboardingFooter>
    </OnboardingLayout>
  );
}
