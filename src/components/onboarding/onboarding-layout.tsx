type Props = {
  children: React.ReactNode;
};

export function OnboardingLayout({
  children,
}: Props) {
  return (
    <main className="h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#FCFCFF]">
      <div className="flex h-full min-h-0 w-full flex-col">
        {children}
      </div>
    </main>
  );
}
