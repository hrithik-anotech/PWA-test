import { MobileShell } from "@/components/ui/mobile-shell";
import { PageTransitionProvider } from "@/components/system/page-transition-provider";
import { AppRefreshWrapper } from "@/components/system/app-refresh-wrapper";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MobileShell>
      <PageTransitionProvider>
        <AppRefreshWrapper>
          <div className="h-full min-h-0 flex-1 overflow-hidden">
            {children}
          </div>
        </AppRefreshWrapper>
      </PageTransitionProvider>
    </MobileShell>
  );
}
