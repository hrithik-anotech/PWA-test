"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type IOSInstallGuideProps = {
  onClose: () => void;
  onDismiss: () => void;
  open: boolean;
};

function ShareIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 14V3m0 0 4 4m-4-4-4 4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10v8.25A2.75 2.75 0 0 0 8.75 21h6.5A2.75 2.75 0 0 0 18 18.25V10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 5v14m7-7H5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IOSInstallGuide({
  onClose,
  onDismiss,
  open,
}: IOSInstallGuideProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setIsVisible(true),
      16
    );

    return () => window.clearTimeout(timeout);
  }, []);

  if (!open) {
    return null;
  }

  const steps = [
    {
      icon: <ShareIcon />,
      title: "Tap the Share button",
      copy: "Use Safari's bottom toolbar share icon.",
    },
    {
      icon: <AddIcon />,
      title: "Tap Add to Home Screen",
      copy: "Confirm the Snibto icon on the next screen.",
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center bg-black/45 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm",
        "transition-opacity duration-300 ease-out",
        isVisible
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      )}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="ios-install-title"
        className={cn(
          "w-full max-w-md rounded-[1.75rem] border border-white/70 bg-white p-5 text-text shadow-[0_24px_80px_rgba(0,0,0,0.28)] dark:border-white/10 dark:bg-[#171225] dark:text-white",
          "transition-all duration-300 ease-out",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="h-1.5 w-12 rounded-full bg-black/10 dark:bg-white/14" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close install guide"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-xl leading-none text-black/54 dark:bg-white/8 dark:text-white/64"
          >
            x
          </button>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C35FF] dark:text-[#BBA7FF]">
          iPhone Safari
        </p>
        <h2
          id="ios-install-title"
          className="mt-1 text-2xl font-bold tracking-[-0.03em]"
        >
          Add Snibto to Home Screen
        </h2>
        <p className="mt-2 text-sm leading-6 text-black/62 dark:text-white/64">
          iOS uses Safari&apos;s home screen action instead of a
          native install prompt.
        </p>

        <div className="mt-6 space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex items-center gap-4 rounded-2xl bg-[#F7F4FF] p-4 dark:bg-white/8"
            >
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#6C35FF] shadow-sm dark:bg-white/10 dark:text-[#D8CCFF]">
                <span className="absolute inset-0 rounded-2xl bg-[#6C35FF]/10 animate-[pwa-soft-pulse_1.8s_ease-in-out_infinite]" />
                <span className="relative">{step.icon}</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#6C35FF] dark:text-[#BBA7FF]">
                  Step {index + 1}
                </p>
                <h3 className="text-base font-bold">
                  {step.title}
                </h3>
                <p className="mt-0.5 text-sm text-black/58 dark:text-white/58">
                  {step.copy}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-14 rounded-2xl bg-[#6C35FF] text-sm font-bold text-white shadow-[0_12px_30px_rgba(108,53,255,0.24)]"
          >
            Got it
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="h-12 rounded-2xl text-sm font-bold text-black/52 transition-colors hover:text-black dark:text-white/56 dark:hover:text-white"
          >
            Not now
          </button>
        </div>
      </section>
    </div>
  );
}
