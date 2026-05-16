import { ReactNode } from "react";
import { MobileShell } from "@/components/ui/mobile-shell";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <MobileShell className="px-5 py-[clamp(1rem,4vw,1.5rem)]">
      <div className="flex h-full min-h-0 flex-col overflow-y-auto">
        {children}
      </div>
    </MobileShell>
  );
}
