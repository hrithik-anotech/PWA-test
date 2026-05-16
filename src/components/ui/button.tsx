import { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  loading,
  fullWidth,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-primary-light text-white",

    secondary:
      "bg-primary-light text-white",

    outline:
      "border border-black/10 bg-white text-text",

    ghost:
      "bg-transparent text-text shadow-none",

    danger:
      "bg-danger text-white",
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center",

        "h-14 rounded-3xl px-5",

        "text-base font-semibold",

        "transition-all duration-200",

        "active:scale-[0.98]",

        "disabled:pointer-events-none disabled:opacity-50",

        "shadow-soft",

        variants[variant],

        fullWidth && "w-full",

        className
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}