export const onboardingSteps = {
  "step-1": {
    id: 1,
    titleKey: "step1.title",
    descriptionKey: "step1.description",
    image: "/images/onboarding1.png",
    next: "/onboarding/step-2",
    previous: null,
  },
  "step-2": {
    id: 2,
    titleKey: "step2.title",
    descriptionKey: "step2.description",
    image: "/images/onboarding2.png",
    next: "/onboarding/step-3",
    previous: "/onboarding/step-1",
  },
  "step-3": {
    id: 3,
    titleKey: "step3.title",
    descriptionKey: "step3.description",
    image: "/images/onboarding3.png",
    next: "/login",
    previous: "/onboarding/step-2",
  },
} as const;
