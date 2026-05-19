import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";

import { urbanist } from "@/lib/fonts";
import { NavigationTransitionManager } from "@/components/system/navigation-transition-manager";
import { PWAInstallManager } from "@/components/pwa/PWAInstallManager";

export const metadata: Metadata = {
  title: "Snibto",
  description: "Book trusted house helpers instantly",
  manifest: "/manifest.json",

  applicationName: "Snibto",

  icons: {
    icon: [
      {
        url: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Snibto",
  },

  formatDetection: {
    telephone: false,
  },

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": "Snibto",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#FCFCFF",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#120D24",
    },
  ],
  viewportFit: "cover",
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
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${urbanist.variable} min-h-full flex flex-col`}
      >
        <NavigationTransitionManager />
        <PWAInstallManager />
        {children}
      </body>
    </html>
  );
}
