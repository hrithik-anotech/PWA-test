"use client";

import React, { useMemo, useState } from "react";
import Image, { ImageProps } from "next/image";
import { getIKUrl } from "@/lib/imagekit";

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
  ...props
}: OptimizedImageProps) {
  const resolvedSrc = useMemo(() => {
    if (ikPath) {
      return getIKUrl(src, transform);
    }
    return src;
  }, [src, ikPath, transform]);

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
      onError={handleError}
    />
  );
}
