/**
 * Utility to generate ImageKit URLs with transformations.
 * Replace IMAGEKIT_URL_ENDPOINT with your actual ImageKit endpoint.
 */

const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/snibto";

interface ImageKitTransform {
  width?: number;
  height?: number;
  quality?: number;
  blur?: number;
  format?: 'auto' | 'webp' | 'avif';
  crop?: 'force' | 'at_least' | 'at_max' | 'maintain_ratio';
}

/**
 * Generates an optimized ImageKit URL.
 * @param path The relative path to the image in ImageKit (e.g., "/banners/home.jpg")
 * @param transform Transformation options
 */
export function getIKUrl(path: string, transform: ImageKitTransform = {}): string {
  if (!path) return "";
  
  // If it's already a full URL and not ImageKit, return as is
  if (path.startsWith('http') && !path.includes('ik.imagekit.io')) {
    return path;
  }

  const {
    width,
    height,
    quality = 80,
    blur,
    format = 'auto',
    crop
  } = transform;

  const tr: string[] = [`q-${quality}`, `f-${format}`];
  
  if (width) tr.push(`w-${width}`);
  if (height) tr.push(`h-${height}`);
  if (blur) tr.push(`bl-${blur}`);
  if (crop) tr.push(`c-${crop}`);

  const transformString = tr.join(',');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${IMAGEKIT_URL_ENDPOINT}${cleanPath}?tr=${transformString}`;
}

/**
 * Example usage for Home Page services to keep quality high but size low.
 */
export const HOME_SERVICE_IMAGE_TRANSFORM: ImageKitTransform = {
  width: 800,
  quality: 90,
  format: 'auto',
};
