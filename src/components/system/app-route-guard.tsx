"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  APP_ROUTES,
  getAppState,
  getNextRequiredPath,
  isAppSetupComplete,
  type AppState,
  type AppRoute,
} from "@/lib/storage";

const ROOT_PATH = "/";

function normalizePathname(pathname: string) {
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

function isOnboardingPath(pathname: string) {
  return pathname.startsWith("/onboarding/");
}

function isAuthPath(pathname: string) {
  return pathname === "/login" || pathname === "/otp";
}

function isLocationPath(pathname: string) {
  return pathname.startsWith("/location/");
}

function isSetupPath(pathname: string) {
  return (
    isOnboardingPath(pathname) ||
    isAuthPath(pathname) ||
    isLocationPath(pathname) ||
    pathname === APP_ROUTES.profileSetup ||
    pathname === APP_ROUTES.addressDetails
  );
}

function canStayOnPath(
  pathname: string,
  nextPath: AppRoute,
  appState: AppState
) {
  // If fully setup, cannot visit ANY setup path
  if (isAppSetupComplete(appState)) {
    return !isSetupPath(pathname);
  }

  // Not fully setup, so cannot visit home
  if (!isSetupPath(pathname)) {
    return false;
  }

  // Onboarding cannot be revisited once completed
  if (isOnboardingPath(pathname)) {
    return !appState.onboardingCompleted;
  }

  // Login/OTP cannot be revisited once logged in
  if (isAuthPath(pathname)) {
    return appState.onboardingCompleted && !appState.isLoggedIn;
  }

  // Profile setup can be revisited to edit, as long as they are logged in
  if (pathname === APP_ROUTES.profileSetup) {
    return appState.isLoggedIn;
  }

  // Location pages can be revisited as long as profile is completed
  if (isLocationPath(pathname)) {
    return appState.profileCompleted;
  }

  // Address details can be revisited as long as location is selected
  if (pathname === APP_ROUTES.addressDetails) {
    return appState.locationSelected;
  }

  return false;
}

export function AppRouteGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  useEffect(() => {
    // Check if the current locale matches the user's preferred locale
    // This handles the "back button" issue where the user might navigate back
    // to a URL with a different locale prefix.
    const preferredLocale = localStorage.getItem("NEXT_LOCALE");
    
    if (preferredLocale) {
      if (preferredLocale !== currentLocale) {
        router.replace(pathname, { locale: preferredLocale as any });
        return;
      }
    } else {
      // If no preferred locale is set, initialize it with the current locale
      localStorage.setItem("NEXT_LOCALE", currentLocale);
    }

    const normalizedPathname =
      normalizePathname(pathname);

    if (normalizedPathname === ROOT_PATH) {
      return;
    }

    const appState = getAppState();
    const nextPath =
      getNextRequiredPath(appState);

    if (
      !canStayOnPath(
        normalizedPathname,
        nextPath,
        appState
      )
    ) {
      router.replace(nextPath);
    }
  }, [pathname, router]);

  return null;
}
