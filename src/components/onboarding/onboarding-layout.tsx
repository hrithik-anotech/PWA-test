type Props = {
  children: React.ReactNode;
};

export function OnboardingLayout({
  children,
}: Props) {
  return (
    <main className="min-h-screen min-h-dvh overflow-y-auto overflow-x-clip bg-[#FCFCFF]">
      <div className="flex min-h-screen min-h-dvh w-full flex-col">
        {children}
      </div>
    </main>
  );
}
