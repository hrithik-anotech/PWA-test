"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { runWhenIdle } from "@/utils/preloader";

const PWAInstallManager = dynamic(
  () =>
    import("@/components/pwa/PWAInstallManager").then(
      (module) => module.PWAInstallManager
    ),
  { ssr: false }
);

export function DeferredPWAInstallManager() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(
    () => runWhenIdle(() => setShouldLoad(true)),
    []
  );

  return shouldLoad ? <PWAInstallManager /> : null;
}
