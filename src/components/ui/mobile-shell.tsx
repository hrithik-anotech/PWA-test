import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MobileShellProps {
  children: ReactNode;
  className?: string;
}

export function MobileShell({
  children,
  className,
}: MobileShellProps) {
  return (
    <main
      className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[var(--app-background)] text-[var(--app-text)]"
      data-app-root
    >
      <div
        className={cn(
          "mx-auto flex h-full min-h-0 w-full max-w-[36rem] flex-col overflow-hidden bg-[var(--app-background)]",
          className
        )}
      >
        {children}
      </div>
    </main>
  );
}
