"use client";

import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProviderProps {
  children: ReactNode;
}

type NavDirection = "forward" | "back";

const iosSwipeVariants = {
  enter: (direction: NavDirection) => ({
    x: direction === "back" ? "-30%" : "100%",
    zIndex: 2,
  }),
  center: {
    x: "0%",
    zIndex: 2,
  },
  exit: (direction: NavDirection) => ({
    x: direction === "back" ? "100%" : "-30%",
    zIndex: 1,
  }),
};

function getNavDirection(): NavDirection {
  if (typeof document === "undefined") {
    return "forward";
  }

  return document.documentElement.getAttribute(
    "data-nav-direction"
  ) === "back"
    ? "back"
    : "forward";
}

export function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const prefersReducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

      // Keep a single transition engine to avoid duplicate route animations.
      setUseFallback(!prefersReducedMotion);
      setMounted(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!mounted || !useFallback) {
    return <>{children}</>;
  }

  const direction = getNavDirection();

  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden bg-[#FCFCFF]">
      <AnimatePresence
        initial={false}
        mode="sync"
        custom={direction}
      >
        <motion.div
          key={pathname}
          custom={direction}
          variants={iosSwipeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.32,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 flex min-h-full w-full flex-col bg-[#FCFCFF] will-change-transform"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
