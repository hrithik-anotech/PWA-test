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
        "min-h-[20rem]",
        "flex-1",
        "rounded-t-[2.5rem]",
        "bg-gradient-to-br",
        "from-[#5B2FD1]",
        "via-[#6D3EF0]",
        "to-[#A78BFA]",
        "px-4",
        "pt-[clamp(1rem,3.5vw,2rem)]",
        "pb-[max(1rem,env(safe-area-inset-bottom))]",
        "sm:px-6",
        "text-white"
      )}
    >
      {children}
    </section>
  );
}
