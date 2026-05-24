"use client";

import { useEffect, useState } from "react";

// Extend Navigator to include connection property, which is not in standard TS types yet
declare global {
  interface Navigator {
    connection?: {
      effectiveType: "slow-2g" | "2g" | "3g" | "4g";
      saveData: boolean;
      addEventListener: (type: string, listener: () => void) => void;
      removeEventListener: (type: string, listener: () => void) => void;
    };
  }
}

export function useNetwork() {
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);
  const [effectiveType, setEffectiveType] = useState<string>("4g");
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.connection) {
      return;
    }

    const connection = navigator.connection;

    const updateConnectionStatus = () => {
      const type = connection.effectiveType;
      const saving = connection.saveData;

      setEffectiveType(type);
      setSaveData(saving);

      // Consider it a slow network if it's 3G or lower, or if user has enabled data saver
      if (saving || type === "slow-2g" || type === "2g" || type === "3g") {
        setIsSlowNetwork(true);
      } else {
        setIsSlowNetwork(false);
      }
    };

    updateConnectionStatus();

    connection.addEventListener("change", updateConnectionStatus);

    return () => {
      connection.removeEventListener("change", updateConnectionStatus);
    };
  }, []);

  return { isSlowNetwork, effectiveType, saveData };
}
