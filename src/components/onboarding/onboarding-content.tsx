type Props = {
  children: React.ReactNode;
};

export function OnboardingContent({
  children,
}: Props) {
  return (
    <section className="relative min-h-64 flex-[1.1] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E9D5FF] via-white to-[#DDD6FE]" />

      <div className="relative z-10 flex h-full flex-col items-center px-4 pt-[clamp(0.875rem,3vw,2rem)] sm:px-6">
        {children}
      </div>
    </section>
  );
}
