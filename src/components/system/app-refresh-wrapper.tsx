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
        pullingContent={
          <div className="py-3 text-center text-xs font-medium tracking-[0.02em] text-black/45">
            Pull to refresh
          </div>
        }
        refreshingContent={
          <div className="py-3 text-center text-xs font-semibold tracking-[0.02em] text-black/55">
            Refreshing...
          </div>
        }
        pullDownThreshold={72}
        resistance={2.5}
        maxPullDownDistance={100}
        backgroundColor="transparent"
      >
        <div className="min-h-full">
          {children}
        </div>
      </PullToRefresh>
    </div>
  );
}
