"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "@/i18n/routing";

import OfflineScreen from "@/components/system/offline-screen";
import SplashScreen from "@/components/system/splash-screen";
import {
  getAppState,
  getRootEntryPath,
} from "@/lib/storage";
import {
  preloadImages,
  CRITICAL_IMAGES,
  getWarmImagesForPath,
  warmImages,
} from "@/utils/preloader";


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

        void preloadImages(CRITICAL_IMAGES, {
          concurrency: 1,
          fetchPriority: "high",
          timeoutMs: 1200,
        });

        // -----------------------------
        // APP STATE
        // -----------------------------

        const nextPath = getRootEntryPath(
          getAppState()
        );

        router.replace(nextPath);
        warmImages(getWarmImagesForPath(nextPath));
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
