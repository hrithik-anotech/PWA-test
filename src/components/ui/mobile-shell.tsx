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
    <main className="min-h-screen min-h-dvh w-full overflow-x-hidden bg-[#FCFCFF] text-[#111111]">
      <div
        className={cn(
          "mx-auto flex min-h-screen min-h-dvh w-full max-w-[36rem] flex-col overflow-x-hidden",
          className
        )}
      >
        {children}
      </div>
    </main>
  );
}
