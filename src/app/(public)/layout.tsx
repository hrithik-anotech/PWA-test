import { MobileShell } from "@/components/ui/mobile-shell";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MobileShell>{children}</MobileShell>;
}
