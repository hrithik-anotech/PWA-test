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

export const defaultAppState: AppState = {
  onboardingCompleted: false,

  isLoggedIn: false,

  profileCompleted: false,

  locationSelected: false,

  addressCompleted: false,
};

export function getAppState(): AppState {
  if (typeof window === "undefined") {
    return defaultAppState;
  }

  try {
    const storedState =
      localStorage.getItem(
        STORAGE_KEYS.appState
      );

    if (!storedState) {
      return defaultAppState;
    }

    return {
      ...defaultAppState,
      ...JSON.parse(storedState),
    };
  } catch {
    return defaultAppState;
  }
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
}