type Props = {
  children: React.ReactNode;
};

export function OnboardingContent({
  children,
}: Props) {
  return (
    <section className="relative min-h-0 flex-1 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#E9D5FF] to-white" />

      <div className="relative z-10 flex h-full min-h-0 flex-col items-center px-4 pt-[clamp(0.375rem,1.4dvh,0.875rem)] sm:px-6">
        {children}
      </div>
    </section>
  );
}
