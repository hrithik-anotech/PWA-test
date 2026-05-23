export const STORAGE_KEYS = {
  appState: "snibto-app-state",
};

export type AppState = {
  onboardingCompleted: boolean;

  isLoggedIn: boolean;

  profileCompleted: boolean;

  locationSelected: boolean;

  addressCompleted: boolean;
};

export const APP_ROUTES = {
  onboarding: "/onboarding/step-1",
  login: "/login",
  profileSetup: "/profile-setup",
  locationAccess: "/location/access",
  addressDetails: "/address-details",
  home: "/home",
} as const;

export type AppRoute =
  (typeof APP_ROUTES)[keyof typeof APP_ROUTES];

export const defaultAppState: AppState = {
  onboardingCompleted: false,

  isLoggedIn: false,

  profileCompleted: false,

  locationSelected: false,

  addressCompleted: false,
};

function hasLegacyFlag(key: string) {
  return localStorage.getItem(key) === "true";
}

function getLegacyAppState(): Partial<AppState> {
  return {
    onboardingCompleted: hasLegacyFlag(
      "hasCompletedOnboarding"
    ),

    isLoggedIn: hasLegacyFlag("isLoggedIn"),

    profileCompleted: hasLegacyFlag("hasProfile"),

    locationSelected:
      localStorage.getItem("user_location") !== null,

    addressCompleted: hasLegacyFlag("hasAddress"),
  };
}

function getStoredAppState(): Partial<AppState> {
  const storedState = localStorage.getItem(
    STORAGE_KEYS.appState
  );

  if (!storedState) {
    return {};
  }

  const parsedState = JSON.parse(storedState);

  if (
    !parsedState ||
    typeof parsedState !== "object" ||
    Array.isArray(parsedState)
  ) {
    return {};
  }

  return parsedState as Partial<AppState>;
}

export function getAppState(): AppState {
  if (typeof window === "undefined") {
    return defaultAppState;
  }

  try {
    return {
      ...defaultAppState,
      ...getLegacyAppState(),
      ...getStoredAppState(),
    };
  } catch {
    return defaultAppState;
  }
}

export function getNextRequiredPath(
  appState: AppState = getAppState()
): AppRoute {
  if (!appState.onboardingCompleted) {
    return APP_ROUTES.onboarding;
  }

  if (!appState.isLoggedIn) {
    return APP_ROUTES.login;
  }

  if (!appState.profileCompleted) {
    return APP_ROUTES.profileSetup;
  }

  if (!appState.locationSelected) {
    return APP_ROUTES.locationAccess;
  }

  if (!appState.addressCompleted) {
    return APP_ROUTES.addressDetails;
  }

  return APP_ROUTES.home;
}

export function isAppSetupComplete(
  appState: AppState = getAppState()
) {
  return (
    appState.onboardingCompleted &&
    appState.isLoggedIn &&
    appState.profileCompleted &&
    appState.locationSelected &&
    appState.addressCompleted
  );
}

export function getRootEntryPath(
  appState: AppState = getAppState()
): AppRoute {
  return isAppSetupComplete(appState)
    ? APP_ROUTES.home
    : APP_ROUTES.onboarding;
}

export function setAppState(
  updates: Partial<AppState>
) {
  const currentState = getAppState();

  const updatedState = {
    ...currentState,
    ...updates,
  };

  localStorage.setItem(
    STORAGE_KEYS.appState,
    JSON.stringify(updatedState)
  );
}

export function clearAppState() {
  localStorage.removeItem(
    STORAGE_KEYS.appState
  );
  localStorage.removeItem(
    "hasCompletedOnboarding"
  );
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("hasProfile");
  localStorage.removeItem("hasAddress");
}
