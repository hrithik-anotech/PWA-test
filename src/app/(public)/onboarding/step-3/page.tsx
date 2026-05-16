import { OnboardingScreen } from "@/components/onboarding/onboarding-screen";
import { onboardingSteps } from "@/features/onboarding/data";

export default function StepThreePage() {
  return (
    <OnboardingScreen
      step={onboardingSteps["step-3"]}
    />
  );
}