"use client";

import { InstallButton } from "@/components/pwa/InstallButton";

type InstallPromptProps = {
  isInstalling: boolean;
  onDismiss: () => void;
  onInstall: () => void;
  open: boolean;
};

function SparkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="m12 2 1.72 5.28L19 9l-5.28 1.72L12 16l-1.72-5.28L5 9l5.28-1.72L12 2Z"
        fill="currentColor"
      />
      <path
        d="m19 14 .82 2.18L22 17l-2.18.82L19 20l-.82-2.18L16 17l2.18-.82L19 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstallPrompt({
  isInstalling,
  onDismiss,
  onInstall,
  open,
}: InstallPromptProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm animate-[pwa-fade-in_180ms_ease-out]">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-app-title"
        className="w-full max-w-md rounded-[1.75rem] border border-white/70 bg-white p-5 text-[#111111] shadow-[0_24px_80px_rgba(0,0,0,0.28)] animate-[pwa-slide-up_260ms_cubic-bezier(0.22,1,0.36,1)] dark:border-white/10 dark:bg-[#171225] dark:text-white"
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-black/10 dark:bg-white/14" />

        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6C35FF] to-[#9F7AEA] text-white shadow-[0_16px_36px_rgba(108,53,255,0.3)]">
            <SparkIcon />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C35FF] dark:text-[#BBA7FF]">
              Progressive Web App
            </p>
            <h2
              id="install-app-title"
              className="mt-1 text-2xl font-bold tracking-[-0.03em]"
            >
              Install Snibto
            </h2>
            <p className="mt-2 text-sm leading-6 text-black/62 dark:text-white/64">
              Add Snibto to your home screen for a faster,
              standalone app experience with basic offline access.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {["Fast launch", "Offline shell", "No app store"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl bg-[#F5F0FF] px-3 py-3 text-center text-xs font-bold text-[#6C35FF] dark:bg-white/8 dark:text-[#D8CCFF]"
              >
                {item}
              </div>
            )
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <InstallButton
            label={isInstalling ? "Opening..." : "Install App"}
            onClick={onInstall}
            disabled={isInstalling}
            className="h-14 w-full"
          />

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
