import { MobileShell } from "@/components/ui/mobile-shell";
import { PageTransitionProvider } from "@/components/system/page-transition-provider";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MobileShell>
      <PageTransitionProvider>
        {children}
      </PageTransitionProvider>
    </MobileShell>
  );
}
