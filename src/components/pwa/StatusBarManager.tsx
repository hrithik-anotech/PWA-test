"use client";

import { useEffect } from "react";

import { usePathname } from "@/i18n/routing";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

const APP_THEME_COLOR = "#5F30CA";
const ANDROID_OTHER_THEME_COLOR = "#FFFFFF";
const IOS_STATUS_BAR_STYLE = "black-translucent";

function setMetaContent(name: string, content: string) {
  let metaTag = document.querySelector(`meta[name="${name}"]`);

  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", name);
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute("content", content);
}

export function StatusBarManager() {
  const pathname = usePathname();
  const { isAndroid, isIOS } = useDeviceDetection();

  const isHomeScreen = pathname === "/home";

  useEffect(() => {
    if (isAndroid) {
      setMetaContent(
        "theme-color",
        isHomeScreen ? APP_THEME_COLOR : ANDROID_OTHER_THEME_COLOR
      );
    }

    if (isIOS) {
      setMetaContent(
        "apple-mobile-web-app-status-bar-style",
        IOS_STATUS_BAR_STYLE
      );
    }
  }, [pathname, isAndroid, isIOS, isHomeScreen]);

  return null;
}
