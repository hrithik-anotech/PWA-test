import type { Metadata } from "next";
import type { Viewport } from "next";
import "./../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/routing';

import { urbanist } from "@/lib/fonts";
import { NavigationTransitionManager } from "@/components/system/navigation-transition-manager";
import { PWAInstallManager } from "@/components/pwa/PWAInstallManager";
import { StatusBarManager } from "@/components/pwa/StatusBarManager";
import { AppRouteGuard } from "@/components/system/app-route-guard";

const PWA_MANIFEST_PATH =
  "/manifest.json?v=edge-to-edge-safe-area";

export const metadata: Metadata = {
  title: "Snibto",
  description: "Book trusted house helpers instantly",
  manifest: PWA_MANIFEST_PATH,

  applicationName: "Snibto",

  icons: {
    icon: [
      {
        url: "/images/logos/snibto_appicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/images/logos/snibto_appicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/logos/snibto_appicon.png",
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
  colorScheme: "light",
  themeColor: "transparent",
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!isLocale(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className="h-full antialiased"
      data-nav-direction="forward"
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href={PWA_MANIFEST_PATH} />
      </head>
      <body
        className={`${urbanist.variable} min-h-full flex flex-col bg-[var(--app-background)]`}
      >
        <NextIntlClientProvider messages={messages}>
          <StatusBarManager />
          <AppRouteGuard />
          <NavigationTransitionManager />
          <PWAInstallManager />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
