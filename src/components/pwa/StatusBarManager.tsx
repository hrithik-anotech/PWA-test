"use client";

import { useEffect } from "react";

import { usePathname } from "@/i18n/routing";

import { useDeviceDetection } from "@/hooks/useDeviceDetection";

/**
 * StatusBarManager
 *
 * Android:
 * - Dynamic theme-color support
 *
 * iOS:
 * - Uses static black-translucent mode
 * - DO NOT dynamically change iOS status bar style
 * - iOS Safari/PWA caches aggressively
 */
export function StatusBarManager() {
  const pathname = usePathname();

  const { isIOS } =
    useDeviceDetection();

  useEffect(() => {
    // -----------------------------------
    // IOS
    // -----------------------------------

    // iOS standalone PWAs do not properly
    // support dynamic status bar colors.
    //
    // We keep:
    // black-translucent
    //
    // statically inside layout.tsx
    //
    // So ONLY update Android theme-color.
    if (isIOS) {
      return;
    }

    // -----------------------------------
    // ROUTE DETECTION
    // -----------------------------------

    const isHome =
      pathname.includes("/home");

    const isSplash =
      pathname === "/" ||
      pathname === "/en" ||
      pathname === "/hi";

    // -----------------------------------
    // ANDROID THEME COLORS
    // -----------------------------------

    let themeColor = "#FFFFFF";

    // Splash screen
    if (isSplash) {
      themeColor = "#0D002B";
    }

    // Home screen
    else if (isHome) {
      themeColor = "#5F30CA";
    }

    // -----------------------------------
    // META TAG
    // -----------------------------------

    let metaTag =
      document.querySelector(
        'meta[name="theme-color"]'
      );

    if (!metaTag) {
      metaTag =
        document.createElement(
          "meta"
        );

      metaTag.setAttribute(
        "name",
        "theme-color"
      );

      document.head.appendChild(
        metaTag
      );
    }

    metaTag.setAttribute(
      "content",
      themeColor
    );
  }, [pathname, isIOS]);

  return null;
}