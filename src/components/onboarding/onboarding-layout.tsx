type Props = {
  children: React.ReactNode;
};

export function OnboardingLayout({
  children,
}: Props) {
  return (
    <main className="h-screen max-h-dvh overflow-hidden bg-[#FCFCFF]">
      <div className="flex h-full min-h-0 w-full flex-col">
        {children}
      </div>
    </main>
  );
}
