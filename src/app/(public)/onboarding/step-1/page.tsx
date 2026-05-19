import { OnboardingScreen } from "@/components/onboarding/onboarding-screen";
import { onboardingSteps } from "@/constants/onboarding/data";


export default function StepOnePage() {
  return (
    <OnboardingScreen
      step={onboardingSteps["step-1"]}
    />
  );
}