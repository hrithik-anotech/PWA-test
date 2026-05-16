// src/components/ui/primary-button.tsx
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export function PrimaryButton({
  children,
  className = "",
  fullWidth,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        "flex h-[clamp(2.875rem,9vw,3.5rem)] items-center justify-center rounded-full",
        "bg-gradient-to-r from-[#5B2FD1] to-[#8B5CF6]",
        "px-6 text-[clamp(1rem,3.8vw,1.125rem)] font-semibold text-white",
        "shadow-[0_10px_30px_rgba(91,47,209,0.25)]",
        "transition-all duration-200 active:scale-[0.98]",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
