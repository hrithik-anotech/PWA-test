const NAV_DIR_ATTR = "data-nav-direction";

function setNavDirection(
  direction: "forward" | "back"
) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.setAttribute(
    NAV_DIR_ATTR,
    direction
  );
}

export function markForwardNavigation() {
  setNavDirection("forward");
}

export function markBackNavigation() {
  setNavDirection("back");
}

