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

  return null;
}

