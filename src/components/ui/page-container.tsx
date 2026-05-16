import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        "mx-auto",
        "flex",
        "h-dvh",
        "w-full",
        "max-w-[36rem]",
        "flex-col",
        "overflow-hidden",
        "px-4",
        "sm:px-5"
      )}
    >
      {children}
    </main>
  );
}
