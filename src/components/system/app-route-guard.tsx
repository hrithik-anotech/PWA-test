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
  if (
    isOnboardingPath(pathname) &&
    !isAppSetupComplete(appState)
  ) {
    return true;
  }

  switch (nextPath) {
    case APP_ROUTES.onboarding:
      return isOnboardingPath(pathname);

    case APP_ROUTES.login:
      return isAuthPath(pathname);

    case APP_ROUTES.profileSetup:
      return pathname === APP_ROUTES.profileSetup;

    case APP_ROUTES.locationAccess:
      return isLocationPath(pathname);

    case APP_ROUTES.addressDetails:
      return (
        pathname === APP_ROUTES.addressDetails ||
        pathname === "/location/map"
      );

    case APP_ROUTES.home:
      return !isSetupPath(pathname);
  }
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
