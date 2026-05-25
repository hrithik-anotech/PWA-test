"use client";

import {
  useCallback,
  useEffect,
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

function InstallToastView({
  onClose,
  toast,
}: {
  onClose: () => void;
  toast: InstallToast | null;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!toast) {
      setIsVisible(false);
      return;
    }

    const timeout = window.setTimeout(
      () => setIsVisible(true),
      120
    );

    return () => {
      window.clearTimeout(timeout);
      setIsVisible(false);
    };
  }, [toast]);

  if (!toast) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed left-4 right-4 z-60 mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-bold shadow-[0_16px_50px_rgba(0,0,0,0.16)] bottom-[calc(env(safe-area-inset-bottom)+1rem)]",
        "transition-all duration-300 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3"
        ,
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
    clearToast,
    device,
    dismissInstallPrompt,
    hasNativeInstallPrompt,
    isInstalling,
    platform,
    requestInstall,
    toast,
  } = usePWAInstall();
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

  const shouldShowFloatingInstallButton =
    !device.isStandalone &&
    !isNativePromptOpen &&
    !isIOSGuideOpen;

  return (
    <>
      {shouldShowFloatingInstallButton && (
        <InstallButton
          variant="fab"
          label={
            platform === "ios"
              ? "Add Snibto to Home Screen"
              : "Install Snibto"
          }
          onClick={openInstallExperience}
        />
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
