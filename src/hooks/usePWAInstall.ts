"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import {
  PWA_DISMISS_DELAY_MS,
  PWA_STORAGE_KEYS,
  trackPWAEvent,
} from "@/utils/pwa";

type InstallOutcome = "accepted" | "dismissed";

type BeforeInstallPromptChoice = {
  outcome: InstallOutcome;
  platform: string;
};

type BeforeInstallPromptEvent = Event & {
  platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<BeforeInstallPromptChoice>;
};

export type InstallPlatform =
  | "android"
  | "desktop"
  | "ios"
  | "unsupported";

export type InstallToast = {
  id: number;
  message: string;
  tone: "success" | "info" | "warning";
};

type InstallResult =
  | InstallOutcome
  | "already-installed"
  | "unavailable";

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    appinstalled: Event;
  }
}

function readDismissedUntil() {
  if (typeof window === "undefined") {
    return 0;
  }

  const dismissedAt = Number(
    localStorage.getItem(PWA_STORAGE_KEYS.dismissedAt)
  );

  if (!Number.isFinite(dismissedAt) || dismissedAt <= 0) {
    return 0;
  }

  return dismissedAt + PWA_DISMISS_DELAY_MS;
}

function getInitialDismissalState() {
  const dismissedUntil = readDismissedUntil();

  return {
    dismissedUntil,
    isDismissed:
      dismissedUntil > 0 &&
      dismissedUntil > new Date().getTime(),
  };
}

function getInitialInstallRecord() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    localStorage.getItem(PWA_STORAGE_KEYS.installed) ===
    "true"
  );
}

export function usePWAInstall() {
  const device = useDeviceDetection();

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissalState, setDismissalState] = useState(
    getInitialDismissalState
  );
  const [isInstalling, setIsInstalling] =
    useState(false);
  const [hasInstallRecord, setHasInstallRecord] =
    useState(getInitialInstallRecord);
  const [toast, setToast] =
    useState<InstallToast | null>(null);

  const showToast = useCallback(
    (
      message: string,
      tone: InstallToast["tone"] = "info"
    ) => {
      setToast({
        id: Date.now(),
        message,
        tone,
      });
    },
    []
  );

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timeout = window.setTimeout(() => {
      setToast(null);
    }, 3200);

    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!dismissalState.isDismissed) return;

    const timeout = window.setTimeout(() => {
      setDismissalState({
        dismissedUntil: 0,
        isDismissed: false,
      });
    }, dismissalState.dismissedUntil - new Date().getTime());

    return () => window.clearTimeout(timeout);
  }, [dismissalState]);

  useEffect(() => {
    if (!device.isHydrated) return;

    const handleBeforeInstallPrompt = (
      event: BeforeInstallPromptEvent
    ) => {
      event.preventDefault();
      setDeferredPrompt(event);
      trackPWAEvent("install_prompt_available", {
        platforms: event.platforms,
      });
    };

    const handleAppInstalled = () => {
      localStorage.setItem(
        PWA_STORAGE_KEYS.installed,
        "true"
      );
      localStorage.removeItem(
        PWA_STORAGE_KEYS.dismissedAt
      );

      setDeferredPrompt(null);
      setDismissalState({
        dismissedUntil: 0,
        isDismissed: false,
      });
      setHasInstallRecord(true);
      setIsInstalling(false);
      showToast("Snibto installed successfully.", "success");
      trackPWAEvent("app_installed");
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );
    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, [device.isHydrated, showToast]);

  const isInstalled =
    device.isStandalone || hasInstallRecord;
  const { isDismissed } = dismissalState;
  const hasNativeInstallPrompt = Boolean(deferredPrompt);
  const hasIOSInstallGuide =
    device.isIOSSafari && !device.isStandalone;

  const platform: InstallPlatform = useMemo(() => {
    if (hasIOSInstallGuide) {
      return "ios";
    }

    if (hasNativeInstallPrompt) {
      return device.isAndroid ? "android" : "desktop";
    }

    return "unsupported";
  }, [
    device.isAndroid,
    hasIOSInstallGuide,
    hasNativeInstallPrompt,
  ]);

  const canShowInstallUI =
    device.isHydrated &&
    device.isSecureContext &&
    !isInstalled &&
    !isDismissed &&
    (hasNativeInstallPrompt || hasIOSInstallGuide);

  const dismissInstallPrompt = useCallback(
    (reason = "not-now") => {
      const dismissedAt = Date.now();

      localStorage.setItem(
        PWA_STORAGE_KEYS.dismissedAt,
        String(dismissedAt)
      );

      setDismissalState({
        dismissedUntil:
          dismissedAt + PWA_DISMISS_DELAY_MS,
        isDismissed: true,
      });
      showToast("Install prompt dismissed.", "info");
      trackPWAEvent("install_prompt_dismissed", {
        reason,
      });
    },
    [showToast]
  );

  const requestInstall =
    useCallback(async (): Promise<InstallResult> => {
      if (isInstalled) {
        showToast("Snibto is already installed.", "success");
        return "already-installed";
      }

      if (!device.isSecureContext || !deferredPrompt) {
        showToast(
          "Install is not supported in this browser yet.",
          "warning"
        );
        trackPWAEvent("install_prompt_unavailable", {
          platform,
          secureContext: device.isSecureContext,
        });
        return "unavailable";
      }

      setIsInstalling(true);
      trackPWAEvent("install_prompt_opened", {
        platform,
      });

      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;

        setDeferredPrompt(null);

        if (choice.outcome === "accepted") {
          showToast("Installing Snibto...", "success");
          trackPWAEvent("install_prompt_accepted", {
            platform: choice.platform,
          });
        } else {
          dismissInstallPrompt("native-dismissed");
        }

        return choice.outcome;
      } catch (error) {
        showToast(
          "Install prompt could not be opened.",
          "warning"
        );
        trackPWAEvent("install_prompt_unavailable", {
          message:
            error instanceof Error
              ? error.message
              : "Unknown install prompt error",
        });

        return "unavailable";
      } finally {
        setIsInstalling(false);
      }
    }, [
      deferredPrompt,
      device.isSecureContext,
      dismissInstallPrompt,
      isInstalled,
      platform,
      showToast,
    ]);

  return {
    canShowInstallUI,
    clearToast,
    device,
    dismissInstallPrompt,
    hasIOSInstallGuide,
    hasNativeInstallPrompt,
    isDismissed,
    isInstalled,
    isInstalling,
    platform,
    requestInstall,
    toast,
  };
}
