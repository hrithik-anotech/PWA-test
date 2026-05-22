"use client";

import { ReactNode } from "react";
import { usePathname } from "@/i18n/routing";
import { AppRefreshWrapper } from "@/components/system/app-refresh-wrapper";
import { PageTransitionProvider } from "@/components/system/page-transition-provider";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";

interface ProtectedNavigationShellProps {
  children: ReactNode;
}

const bottomNavigationPaths = new Set([
  "/home",
  "/profile/mybookings",
  "/wallet",
]);

export function ProtectedNavigationShell({
  children,
}: ProtectedNavigationShellProps) {
  const pathname = usePathname();
  const normalizedPathname =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  const showBottomNavigation =
    bottomNavigationPaths.has(normalizedPathname);
  const bottomSpace = showBottomNavigation
    ? "calc(env(safe-area-inset-bottom, 0px) + 4.75rem)"
    : "0px";

  return (
    <>
      <PageTransitionProvider>
        <AppRefreshWrapper>
          <div
            className="h-full min-h-0 flex-1 overflow-y-auto bg-[var(--app-background)]"
            style={{
              scrollPaddingBottom: bottomSpace,
            }}
          >
            <div
              className="min-h-full bg-[var(--app-background)]"
              style={{
                paddingBottom: bottomSpace,
              }}
            >
              {children}
            </div>
          </div>
        </AppRefreshWrapper>
      </PageTransitionProvider>
      {showBottomNavigation ? <BottomNavigation /> : null}
    </>
  );
}
