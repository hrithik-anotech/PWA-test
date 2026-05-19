"use client";

import { ReactNode, useCallback } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";

type AppRefreshWrapperProps = {
  children: ReactNode;
  onRefresh?: () => Promise<void> | void;
};

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

function shouldEnablePullToRefresh() {
  if (typeof window === "undefined") {
    return false;
  }

  const nav = window.navigator as NavigatorWithStandalone;
  const userAgent = nav.userAgent || "";

  const isIos =
    /iPhone|iPad|iPod/i.test(userAgent) ||
    (nav.platform === "MacIntel" &&
      nav.maxTouchPoints > 1);

  const isAndroid = /Android/i.test(userAgent);

  const isStandalone =
    window.matchMedia(
      "(display-mode: standalone)"
    ).matches || nav.standalone === true;

  const hasCoarsePointer = window.matchMedia(
    "(pointer: coarse)"
  ).matches;

  return isStandalone || (hasCoarsePointer && (isIos || isAndroid));
}

export function AppRefreshWrapper({
  children,
  onRefresh,
}: AppRefreshWrapperProps) {
  const isPullable =
    shouldEnablePullToRefresh();

  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      await onRefresh();
      return;
    }

    // Temporary refresh strategy.
    // Future: replace with TanStack Query invalidateQueries().
    window.location.reload();
  }, [onRefresh]);

  return (
    <div className="app-refresh-wrapper min-h-0 flex-1">
      <PullToRefresh
        className="h-full"
        isPullable={isPullable}
        onRefresh={handleRefresh}
        /* Show a lightweight SVG during pulling. SVG exists in the DOM
           from first render (no insertion during pull) and uses transform-only
           styles to avoid repaint thrash. */
        pullingContent={
          <div className="h-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mx-auto refresh-icon"
              aria-hidden
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 0-3.95 7.15" />
              <path d="M21 3v6h-6" />
            </svg>
          </div>
        }
        refreshingContent={
          <div className="py-3 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mx-auto refresh-icon animate-spin"
              aria-hidden
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 0-3.95 7.15" />
              <path d="M21 3v6h-6" />
            </svg>
          </div>
        }
        pullDownThreshold={56}
        resistance={2.0}
        maxPullDownDistance={80}
        backgroundColor="transparent"
      >
        <div className="h-full min-h-0">
          {children}
        </div>
      </PullToRefresh>
    </div>
  );
}
