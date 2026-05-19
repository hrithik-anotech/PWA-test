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
        "min-h-full",
        "w-full",
        "max-w-[36rem]",
        "flex-col",
        "px-4",
        "sm:px-5"
      )}
    >
      {children}
    </main>
  );
}
