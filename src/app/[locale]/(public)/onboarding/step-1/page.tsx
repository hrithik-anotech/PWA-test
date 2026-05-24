"use client";

import { useEffect, useState } from "react";
import { OnboardingScreen } from "@/components/onboarding/onboarding-screen";
import { onboardingSteps } from "@/constants/onboarding/data";

export default function StepOnePage() {
  const [showFade, setShowFade] = useState(true);

  useEffect(() => {
    // Trigger the fade out immediately after the component mounts
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setShowFade(false);
      });
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <>
      {/* Smooth white fade overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-white pointer-events-none transition-opacity duration-1000 ease-out ${
          showFade ? "opacity-100" : "opacity-0"
        }`} 
      />
      
      <OnboardingScreen
        step={onboardingSteps["step-1"]}
      />
    </>
  );
}