import { MobileShell } from "@/components/ui/mobile-shell";
import { ProtectedNavigationShell } from "@/components/navigation/protected-navigation-shell";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MobileShell>
      <ProtectedNavigationShell>{children}</ProtectedNavigationShell>
    </MobileShell>
  );
}
