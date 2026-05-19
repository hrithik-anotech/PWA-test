"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { InstallButton } from "@/components/pwa/InstallButton";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { IOSInstallGuide } from "@/components/pwa/IOSInstallGuide";
import {
  type InstallToast,
  usePWAInstall,
} from "@/hooks/usePWAInstall";
import { cn } from "@/lib/cn";
import {
  registerServiceWorker,
  trackPWAEvent,
} from "@/utils/pwa";

const INSTALL_PROMPT_AUTO_OPEN_DELAY_MS = 10000;

function InstallToastView({
  onClose,
  toast,
}: {
  onClose: () => void;
  toast: InstallToast | null;
}) {
  if (!toast) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed left-4 right-4 z-[60] mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-bold shadow-[0_16px_50px_rgba(0,0,0,0.16)] animate-[pwa-slide-up_220ms_ease-out]",
        "bottom-[calc(env(safe-area-inset-bottom)+1rem)]",
        toast.tone === "success" &&
          "bg-[#16A34A] text-white",
        toast.tone === "info" &&
          "bg-[#171225] text-white dark:bg-white dark:text-[#171225]",
        toast.tone === "warning" &&
          "bg-[#F59E0B] text-white"
      )}
    >
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="rounded-full px-2 text-lg leading-none opacity-70"
      >
        x
      </button>
    </div>
  );
}

export function PWAInstallManager() {
  const {
    canShowInstallUI,
    clearToast,
    device,
    dismissInstallPrompt,
    hasNativeInstallPrompt,
    isInstalling,
    platform,
    requestInstall,
    toast,
  } = usePWAInstall();
  const autoOpenedRef = useRef(false);
  const [isNativePromptOpen, setIsNativePromptOpen] =
    useState(false);
  const [isIOSGuideOpen, setIsIOSGuideOpen] =
    useState(false);

  useEffect(() => registerServiceWorker(), []);

  const openInstallExperience = useCallback(() => {
    if (platform === "ios") {
      trackPWAEvent("ios_install_guide_opened");
      setIsIOSGuideOpen(true);
      return;
    }

    if (hasNativeInstallPrompt) {
      setIsNativePromptOpen(true);
      return;
    }

    void requestInstall();
  }, [hasNativeInstallPrompt, platform, requestInstall]);

  useEffect(() => {
    if (
      !canShowInstallUI ||
      autoOpenedRef.current
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      autoOpenedRef.current = true;
      openInstallExperience();
    }, INSTALL_PROMPT_AUTO_OPEN_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [
    canShowInstallUI,
    openInstallExperience,
  ]);

  const handleNativeInstall = async () => {
    const result = await requestInstall();

    if (result !== "unavailable") {
      setIsNativePromptOpen(false);
    }
  };

  const handleDismiss = () => {
    dismissInstallPrompt();
    setIsNativePromptOpen(false);
    setIsIOSGuideOpen(false);
  };

  if (!device.isHydrated) {
    return null;
  }

  const shouldShowTriggers =
    canShowInstallUI &&
    !isNativePromptOpen &&
    !isIOSGuideOpen;

  return (
    <>
      {shouldShowTriggers && (
        <>
          <InstallButton
            variant="banner"
            label={
              platform === "ios"
                ? "Add Snibto to Home Screen"
                : "Install Snibto"
            }
            onClick={openInstallExperience}
          />
          <InstallButton
            variant="fab"
            label="Install Snibto"
            onClick={openInstallExperience}
          />
        </>
      )}

      <InstallPrompt
        open={isNativePromptOpen}
        isInstalling={isInstalling}
        onInstall={handleNativeInstall}
        onDismiss={handleDismiss}
      />

      <IOSInstallGuide
        open={isIOSGuideOpen}
        onClose={() => setIsIOSGuideOpen(false)}
        onDismiss={handleDismiss}
      />

      <InstallToastView
        toast={toast}
        onClose={clearToast}
      />
    </>
  );
}
