"use client";

import React, { useMemo, useState } from "react";
import Image, { ImageProps } from "next/image";
import { getIKUrl } from "@/lib/imagekit";
import { useNetwork } from "@/hooks/use-network";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  /**
   * The source of the image. 
   * - If it starts with '/', it will be treated as an ImageKit path if ikPath is true.
   * - Otherwise, it will be treated as a local path or full URL.
   */
  src: string;
  /**
   * If true, src will be processed through ImageKit utility.
   */
  ikPath?: boolean;
  /**
   * Local fallback image path if the main image fails to load.
   */
  fallbackSrc?: string;
  /**
   * ImageKit transformations.
   */
  transform?: Parameters<typeof getIKUrl>[1];
}

export function OptimizedImage({
  src,
  ikPath = false,
  fallbackSrc = "/images/placeholder.svg",
  transform,
  alt,
  onError,
  quality,
  ...props
}: OptimizedImageProps) {
  const { isSlowNetwork } = useNetwork();

  // Determine final quality based on network conditions
  const finalQuality = useMemo(() => {
    if (isSlowNetwork) {
      // Drop quality to 60% on slow networks (3G/2G/data-saver)
      return 60;
    }
    // Fallback to explicitly passed quality or undefined (which uses Next.js default)
    return quality ? Number(quality) : undefined;
  }, [isSlowNetwork, quality]);

  const resolvedSrc = useMemo(() => {
    if (ikPath) {
      // If network is slow, also override ImageKit transform quality
      const finalTransform = isSlowNetwork
        ? { ...transform, quality: 60 }
        : transform;
      return getIKUrl(src, finalTransform);
    }
    return src;
  }, [src, ikPath, transform, isSlowNetwork]);

  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imgSrc = failedSrc === resolvedSrc ? fallbackSrc : resolvedSrc;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (imgSrc !== fallbackSrc) {
      setFailedSrc(resolvedSrc);
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Image"}
      quality={finalQuality}
      onError={handleError}
    />
  );
}
