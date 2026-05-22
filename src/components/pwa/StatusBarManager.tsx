"use client";

import { useEffect } from "react";

import { usePathname } from "@/i18n/routing";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

const APP_THEME_COLOR = "#FCFCFF";
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
  const { isIOS } = useDeviceDetection();

  useEffect(() => {
    setMetaContent("theme-color", APP_THEME_COLOR);

    if (isIOS) {
      setMetaContent(
        "apple-mobile-web-app-status-bar-style",
        IOS_STATUS_BAR_STYLE
      );
    }
  }, [pathname, isIOS]);

  return null;
}
