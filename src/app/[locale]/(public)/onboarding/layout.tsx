import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#FCFCFF",
  viewportFit: "cover",
};

export default function OnboardingRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
