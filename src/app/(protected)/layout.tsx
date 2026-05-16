import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { MobileShell } from "@/components/ui/mobile-shell";
import { PageTransitionProvider } from "@/components/system/page-transition-provider";
import { AppRefreshWrapper } from "@/components/system/app-refresh-wrapper";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MobileShell>
      <PageTransitionProvider>
        <AppRefreshWrapper>
          <div className="min-h-0 flex-1 pb-28">
            {children}
          </div>
        </AppRefreshWrapper>
      </PageTransitionProvider>
      <BottomNavigation />
    </MobileShell>
  );
}
