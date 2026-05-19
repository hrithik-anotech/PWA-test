"use client";

import { useEffect, useState } from "react";
import { isLocalhost } from "@/utils/pwa";

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

export type DeviceInfo = {
  isHydrated: boolean;
  isAndroid: boolean;
  isDesktop: boolean;
  isIOS: boolean;
  isSafari: boolean;
  isIOSSafari: boolean;
  isSamsungInternet: boolean;
  isStandalone: boolean;
  isSecureContext: boolean;
  supportsNativeInstallPrompt: boolean;
  userAgent: string;
};

const DEFAULT_DEVICE_INFO: DeviceInfo = {
  isHydrated: false,
  isAndroid: false,
  isDesktop: false,
  isIOS: false,
  isSafari: false,
  isIOSSafari: false,
  isSamsungInternet: false,
  isStandalone: false,
  isSecureContext: false,
  supportsNativeInstallPrompt: false,
  userAgent: "",
};

function getDeviceInfo(): DeviceInfo {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const nav = navigator as NavigatorWithStandalone;

  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (platform === "MacIntel" &&
      navigator.maxTouchPoints > 1);

  const isAndroid = /Android/i.test(userAgent);
  const isSamsungInternet =
    /SamsungBrowser/i.test(userAgent);
  const isSafari =
    /Safari/i.test(userAgent) &&
    !/Chrome|Chromium|CriOS|FxiOS|Edg|EdgiOS|OPR|OPiOS|SamsungBrowser|Android/i.test(
      userAgent
    );
  const isStandalone =
    window.matchMedia("(display-mode: standalone)")
      .matches || nav.standalone === true;

  return {
    isHydrated: true,
    isAndroid,
    isDesktop: !isAndroid && !isIOS,
    isIOS,
    isSafari,
    isIOSSafari: isIOS && isSafari,
    isSamsungInternet,
    isStandalone,
    isSecureContext:
      window.isSecureContext ||
      isLocalhost(window.location.hostname),
    supportsNativeInstallPrompt:
      "onbeforeinstallprompt" in window,
    userAgent,
  };
}

export function useDeviceDetection() {
  const [deviceInfo, setDeviceInfo] =
    useState<DeviceInfo>(DEFAULT_DEVICE_INFO);

  useEffect(() => {
    const standaloneQuery = window.matchMedia(
      "(display-mode: standalone)"
    );

    const updateDeviceInfo = () => {
      setDeviceInfo(getDeviceInfo());
    };

    updateDeviceInfo();

    standaloneQuery.addEventListener?.(
      "change",
      updateDeviceInfo
    );
    window.addEventListener(
      "appinstalled",
      updateDeviceInfo
    );

    return () => {
      standaloneQuery.removeEventListener?.(
        "change",
        updateDeviceInfo
      );
      window.removeEventListener(
        "appinstalled",
        updateDeviceInfo
      );
    };
  }, []);

  return deviceInfo;
}
