/**
 * Utility to preload images during the splash screen.
 */
export async function preloadImages(urls: string[]): Promise<void[]> {
  const promises = urls.map((url) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve anyway to not block the app forever
    });
  });

  return Promise.all(promises);
}

/**
 * Critical images that should be loaded before the app starts.
 */
export const CRITICAL_IMAGES = [
  "/images/logos/splash-logo.webp",
  "/images/logos/snibto_purple.png",
  "/images/login/profile-placeholder.png",
  "/images/helper.png",
  "/images/icons/nav-home.svg",
  "/images/icons/nav-book.svg",
  "/images/icons/nav-wallet.svg",
  "/images/logos/login-logo.webp",
  "/images/login/login-1.webp",
  "/images/login/login-2.webp",
  "/images/login/login-3.webp",
  "/images/login/login-4.webp",
  "/images/login/login-5.webp",
  "/images/login/login-6.webp",
  "/images/login/flag-india.png",
  // Large home page service images (ImageKit or Fallback)
  "https://ik.imagekit.io/snibto/services/cleaning.jpg?tr=w-800,q-90,f-auto",
  "https://ik.imagekit.io/snibto/services/bathroom.jpg?tr=w-800,q-90,f-auto",
  "https://ik.imagekit.io/snibto/services/laundry.jpg?tr=w-800,q-90,f-auto",
  "https://ik.imagekit.io/snibto/services/utensils.jpg?tr=w-800,q-90,f-auto",
  // Local fallbacks
  "/images/services/cleaning.png",
  "/images/services/bathroom.png",
  "/images/services/laundry.png",
  "/images/services/utensils.png",
];
