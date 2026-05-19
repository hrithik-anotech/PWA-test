import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
};

export function OnboardingFooter({
  children,
}: Props) {
  return (
    <section
      className={cn(
        "h-[30dvh]",
        "max-h-[30dvh]",
        "min-h-[30dvh]",
        "shrink-0",
        "overflow-hidden",
        "rounded-t-screen",
        "bg-linear-to-b",
        "from-[#5F30CA]",
        "via-[#6D3EF0]",
        "to-[#A78BFA]",
        "px-4",
        "pt-[clamp(0.75rem,1.8dvh,1.125rem)]",
        "pb-[max(0.875rem,env(safe-area-inset-bottom))]",
        "sm:px-6",
        "text-white"
      )}
    >
      {children}
    </section>
  );
}
