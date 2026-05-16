import type { Metadata } from "next";
import "./globals.css";

import { urbanist } from "@/lib/fonts";
import { ViewTransitions } from "next-view-transitions";
import { NavigationTransitionManager } from "@/components/system/navigation-transition-manager";

export const metadata: Metadata = {
  title: "Snibto",
  description: "Book trusted house helpers instantly",

  applicationName: "Snibto",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Snibto",
  },

  formatDetection: {
    telephone: false,
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-nav-direction="forward"
    >
      <body
        className={`${urbanist.variable} min-h-full flex flex-col`}
      >
        <NavigationTransitionManager />
        <ViewTransitions>{children}</ViewTransitions>
      </body>
    </html>
  );
}
