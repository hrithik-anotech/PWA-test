"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { markForwardNavigation } from "@/lib/navigation-transition";
import { cn } from "@/lib/cn";

import { OnboardingLayout } from "./onboarding-layout";
import { OnboardingContent } from "./onboarding-content";
import { OnboardingFooter } from "./onboarding-footer";

type OnboardingStep = {
  id: number;

  title: string;

  description: string;

  image: string;

  next: string;

  previous: string | null;
};

type Props = {
  step: OnboardingStep;
};

export function OnboardingScreen({
  step,
}: Props) {
  const isLastStep = step.id === 3;

  const handleComplete = () => {
    localStorage.setItem(
      "hasCompletedOnboarding",
      "true"
    );
  };

  const handleForward = () => {
    markForwardNavigation();
  };

  return (
    <OnboardingLayout>
      {/* TOP CONTENT */}
      <OnboardingContent>
        {/* APP SCREEN MOCKUP */}
        <div className="relative mt-[clamp(0.5rem,2.5vw,1rem)] w-full">
          <div className="relative mx-auto h-[clamp(18rem,52dvh,32.5rem)] max-h-[clamp(18rem,52dvh,32.5rem)] w-full max-w-[clamp(14rem,72vw,17.5rem)] overflow-hidden rounded-[clamp(1.5rem,6vw,2.625rem)]">
            <Image
              src={step.image}
              alt={step.title}
              fill
              sizes="(max-width: 640px) 78vw, 280px"
              priority
              className="object-contain"
            />
          </div>
        </div>
      </OnboardingContent>

      {/* BOTTOM CONTENT */}
      <OnboardingFooter>
        <div className="flex h-full min-h-0 flex-col">
          {/* TEXT */}
          <div>
            <h1 className="text-center text-[clamp(1.6rem,7vw,2.375rem)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
              {step.title}
            </h1>

            <p className="mt-[clamp(0.5rem,2.5vw,1.25rem)] text-center text-[clamp(0.9375rem,3.8vw,1.125rem)] font-medium leading-[1.6] text-white/80">
              {step.description}
            </p>
          </div>

          {/* DOTS */}
          <div className="mt-[clamp(0.5rem,2.8vw,1.5rem)] flex items-center justify-center gap-2">
            {[1, 2, 3].map((item) => {
              const isActive =
                item === step.id;

              return (
                <div
                  key={item}
                  className={cn(
                    "h-2",
                    "rounded-full",
                    "transition-all",
                    "duration-300",
                    isActive ? "w-8 bg-white" : "w-2 bg-white/35"
                  )}
                />
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="mt-auto flex items-center justify-between gap-3 pb-2">
            <Link
              replace
              href="/login"
              onClick={() => {
                handleForward();
                handleComplete();
              }}
              className="text-[clamp(1rem,4vw,1.25rem)] font-semibold text-white/55 transition-opacity active:opacity-60"
            >
              Skip
            </Link>

            <Link
              href={step.next}
              replace={isLastStep}
              onClick={() => {
                handleForward();

                if (isLastStep) {
                  handleComplete();
                }
              }}
              className={cn(
                "flex",
                "h-[clamp(2.875rem,9vw,3.5rem)]",
                "min-w-[clamp(6rem,28vw,8.125rem)]",
                "items-center",
                "justify-center",
                "rounded-full",
                "bg-white",
                "px-[clamp(1rem,4vw,2rem)]",
                "text-[clamp(1rem,4vw,1.25rem)]",
                "font-bold",
                "text-[#5B2FD1]",
                "shadow-[0_10px_30px_rgba(255,255,255,0.18)]",
                "transition-transform",
                "active:scale-[0.98]"
              )}
            >
              {step.id === 3 ? "Start" : "Next"}
            </Link>
          </div>
        </div>
      </OnboardingFooter>
    </OnboardingLayout>
  );
}
