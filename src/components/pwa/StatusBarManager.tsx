"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/routing";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

/**
 * StatusBarManager handles dynamic PWA status bar colors.
 * - Home page: Purple (#6C35DE) for non-iOS devices.
 * - Other pages: White (#FFFFFF) for non-iOS devices.
 * - iOS: Remains transparent (black-translucent) as requested.
 */
export function StatusBarManager() {
  const pathname = usePathname();
  const { isIOS } = useDeviceDetection();

  useEffect(() => {
    // We only change the theme-color for non-iOS devices
    // because iOS uses apple-mobile-web-app-status-bar-style: black-translucent
    // for a transparent/overlay effect.
    if (isIOS) return;

    const isHome = pathname.includes("/home");
    const isSplash = pathname === "/" || pathname === "/en" || pathname === "/hi";
    
    let themeColor = "#FFFFFF"; // Default white
    
    if (isHome) {
      themeColor = "#5F30CA"; // Purple for home
    } else if (isSplash) {
      themeColor = "#0D002B"; // Dark blue for splash
    }

    // Find or create the theme-color meta tag
    let metaTag = document.querySelector('meta[name="theme-color"]');
    
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "theme-color");
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute("content", themeColor);
  }, [pathname, isIOS]);

  return null;
}
