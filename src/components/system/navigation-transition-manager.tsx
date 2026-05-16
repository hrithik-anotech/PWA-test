"use client";

import { useEffect } from "react";
import {
  markBackNavigation,
  markForwardNavigation,
} from "@/lib/navigation-transition";

export function NavigationTransitionManager() {
  useEffect(() => {
    markForwardNavigation();

    const handlePopState = () => {
      markBackNavigation();
    };

    const handlePointerDown = () => {
      markForwardNavigation();
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    window.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );

      window.removeEventListener(
        "pointerdown",
        handlePointerDown
      );
    };
  }, []);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const onLoad = () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          // registration successful
          console.debug('Service worker registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('Service worker registration failed:', err);
        });
    };

    window.addEventListener('load', onLoad);

    return () => window.removeEventListener('load', onLoad);
  }, []);

  return null;
}

