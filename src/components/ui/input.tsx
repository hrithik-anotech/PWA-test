import { InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/cn";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(({ label, error, className, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-text">
          {label}
        </label>
      )}

      <input
        ref={ref}
        className={cn(
          "h-14 w-full rounded-3xl",

          "border border-black/10",

          "bg-white px-5",

          "text-base text-text",

          "outline-none transition-all",

          "focus:border-primary",

          "placeholder:text-text-secondary",

          error && "border-danger",

          className
        )}
        {...props}
      />

      {error && (
        <p className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";