"use client";

import { cn } from "@/lib/cn";

type InstallButtonVariant = "banner" | "fab" | "inline";

type InstallButtonProps = {
  className?: string;
  disabled?: boolean;
  label?: string;
  onClick: () => void;
  supportingText?: string;
  variant?: InstallButtonVariant;
};

function InstallIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 3v10m0 0 4-4m-4 4-4-4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 15v3.25A2.75 2.75 0 0 0 7.75 21h8.5A2.75 2.75 0 0 0 19 18.25V15"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InstallButton({
  className,
  disabled = false,
  label = "Install App",
  onClick,
  supportingText = "Open Snibto faster from your home screen.",
  variant = "inline",
}: InstallButtonProps) {
  if (variant === "fab") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={cn(
          "fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full",
          "bottom-[calc(env(safe-area-inset-bottom)+6rem)]",
          "bg-[#6C35FF] text-white shadow-[0_16px_40px_rgba(108,53,255,0.32)]",
          "transition-transform active:scale-95 disabled:opacity-60",
          "dark:bg-[#8B5CF6] dark:shadow-[0_16px_40px_rgba(139,92,246,0.28)]",
          className
        )}
      >
        <InstallIcon />
      </button>
    );
  }

  if (variant === "banner") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "fixed left-4 right-4 top-[max(1rem,env(safe-area-inset-top))] z-40 mx-auto flex max-w-md items-center gap-3 rounded-2xl",
          "border border-white/70 bg-white/92 p-3 text-left text-[#111111] shadow-[0_18px_60px_rgba(22,18,43,0.14)] backdrop-blur-xl",
          "transition-transform active:scale-[0.98] disabled:opacity-60",
          "dark:border-white/10 dark:bg-[#171225]/92 dark:text-white dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
          className
        )}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6C35FF] text-white">
          <InstallIcon />
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] font-bold">
            {label}
          </span>
          <span className="block truncate text-xs font-medium text-black/55 dark:text-white/58">
            {supportingText}
          </span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#6C35FF] px-5 text-sm font-bold text-white",
        "shadow-[0_12px_30px_rgba(108,53,255,0.24)] transition-transform active:scale-[0.98] disabled:opacity-60",
        "dark:bg-[#8B5CF6]",
        className
      )}
    >
      <InstallIcon />
      {label}
    </button>
  );
}
