"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import OfflineScreen from "@/components/system/offline-screen";
import SplashScreen from "@/components/system/splash-screen";
import { getAppState } from "@/lib/storage";


export default function RootPage() {
  const router = useRouter();

  const hasInitialized = useRef(false);

  const [isInitializing, setIsInitializing] =
    useState(true);

  const [isOffline, setIsOffline] =
    useState(false);

  // -----------------------------------
  // NETWORK LISTENERS
  // -----------------------------------

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener(
      "online",
      handleOnline
    );

    window.addEventListener(
      "offline",
      handleOffline
    );

    return () => {
      window.removeEventListener(
        "online",
        handleOnline
      );

      window.removeEventListener(
        "offline",
        handleOffline
      );
    };
  }, []);

  // -----------------------------------
  // APP INITIALIZATION
  // -----------------------------------

  useEffect(() => {
    if (hasInitialized.current) return;

    hasInitialized.current = true;

    const initializeApp = async () => {
      try {
        // -----------------------------
        // INTERNET CHECK
        // -----------------------------

        if (!navigator.onLine) {
          setIsOffline(true);

          setIsInitializing(false);

          return;
        }

        // -----------------------------
        // SPLASH DELAY
        // -----------------------------

        await new Promise((resolve) =>
          setTimeout(resolve, 1500)
        );

        // -----------------------------
        // APP STATE
        // -----------------------------

        const appState = getAppState();

        const {
          onboardingCompleted,
          isLoggedIn,
          profileCompleted,
          locationSelected,
          addressCompleted,
        } = appState;

        // -----------------------------
        // ROUTING FLOW
        // -----------------------------

        // ONBOARDING
        if (!onboardingCompleted) {
          router.replace(
            "/onboarding/step-1"
          );

          return;
        }

        // LOGIN
        if (!isLoggedIn) {
          router.replace("/login");

          return;
        }

        // PROFILE
        if (!profileCompleted) {
          router.replace("/profile-setup");

          return;
        }

        // LOCATION
        if (!locationSelected) {
          router.replace(
            "/location/access"
          );

          return;
        }

        // ADDRESS
        if (!addressCompleted) {
          router.replace(
            "/address-details"
          );

          return;
        }

        // HOME
        router.replace("/home");
      } catch (error) {
        console.error(
          "App initialization failed:",
          error
        );

        setIsOffline(true);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, [router]);

  // -----------------------------------
  // OFFLINE SCREEN
  // -----------------------------------

  if (isOffline) {
    return (
      <OfflineScreen
        onRetry={() =>
          window.location.reload()
        }
      />
    );
  }

  // -----------------------------------
  // SPLASH SCREEN
  // -----------------------------------

  if (isInitializing) {
    return <SplashScreen />;
  }

  return null;
}
