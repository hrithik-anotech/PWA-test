import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { MobileShell } from "@/components/ui/mobile-shell";
import { PageTransitionProvider } from "@/components/system/page-transition-provider";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MobileShell>
      <PageTransitionProvider>
        <div className="min-h-0 flex-1 overflow-y-auto pb-28">
          {children}
        </div>
      </PageTransitionProvider>
      <BottomNavigation />
    </MobileShell>
  );
}
