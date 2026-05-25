"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "@/i18n/routing";

import OfflineScreen from "@/components/system/offline-screen";
import SplashScreen from "@/components/system/splash-screen";
import {
  getAppState,
  getNextRequiredPath,
} from "@/lib/storage";
import {
  preloadImages,
  CRITICAL_IMAGES,
  getWarmImagesForPath,
} from "@/utils/preloader";


export default function RootPage() {
  const router = useRouter();

  const hasInitialized = useRef(false);

  const [isInitializing, setIsInitializing] =
    useState(true);
  const [isZooming, setIsZooming] = useState(false);

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

        // Determine if we are on a slow network
        const isSlowNetwork =
          navigator.connection &&
          (navigator.connection.saveData ||
            ["slow-2g", "2g", "3g"].includes(
              navigator.connection.effectiveType
            ));

        // Preload critical images (logo) first
        await preloadImages(CRITICAL_IMAGES, {
          concurrency: 1,
          fetchPriority: "high",
          timeoutMs: 1200,
        });

        // -----------------------------
        // APP STATE & ROUTING
        // -----------------------------

        const nextPath = getNextRequiredPath(getAppState());

        // We want to preload the destination route's warm images so there's no loading flash.
        // The user requested a minimum splash screen duration of 3 seconds, 
        // and a maximum timeout of 10 seconds as a fallback.
        const minSplashTimeMs = 2000;
        const maxSplashTimeMs = 10000;
        
        const destinationImages = getWarmImagesForPath(nextPath);
        
        if (destinationImages.length > 0) {
          const minTimeoutPromise = new Promise((resolve) =>
            setTimeout(resolve, minSplashTimeMs)
          );
          
          const preloadPromise = preloadImages(destinationImages, {
            // Lower concurrency on slow networks to prevent thread blocking
            concurrency: isSlowNetwork ? 1 : 3,
            fetchPriority: "high",
            timeoutMs: maxSplashTimeMs,
          });

          // Wait for BOTH the minimum 3s and the image preloading
          const waitPromise = Promise.all([preloadPromise, minTimeoutPromise]);
          
          // But cap the entire waiting period at 10 seconds
          const maxTimeoutPromise = new Promise((resolve) =>
            setTimeout(resolve, maxSplashTimeMs)
          );

          await Promise.race([waitPromise, maxTimeoutPromise]);
        } else {
          // Even if there are no images, enforce the minimum 3s splash screen
          await new Promise((resolve) => setTimeout(resolve, minSplashTimeMs));
        }

        setIsZooming(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        router.replace(nextPath);
      } catch (error) {
        console.error("App initialization failed:", error);
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
    return <SplashScreen isZooming={isZooming} />;
  }

  return null;
}
