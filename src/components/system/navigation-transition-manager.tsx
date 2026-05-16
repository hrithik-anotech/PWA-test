"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  markBackNavigation,
  markForwardNavigation,
} from "@/lib/navigation-transition";

export function NavigationTransitionManager() {
  const pathname = usePathname();

  useEffect(() => {
    markForwardNavigation();

    const handlePopState = () => {
      markBackNavigation();
    };

    const handlePointerDown = () => {
      markForwardNavigation();
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    // After each completed navigation, reset to forward so stale "back"
    // direction does not leak into the next tap navigation.
    markForwardNavigation();
  }, [pathname]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const onLoad = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.debug("Service worker registered:", reg.scope);
        })
        .catch((err) => {
          console.warn("Service worker registration failed:", err);
        });
    };

    window.addEventListener("load", onLoad);

    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
