import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { MobileShell } from "@/components/ui/mobile-shell";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MobileShell>
      <div className="min-h-0 flex-1 overflow-y-auto pb-28">{children}</div>
      <BottomNavigation />
    </MobileShell>
  );
}
