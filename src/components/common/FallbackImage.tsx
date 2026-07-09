"use client";

import { useState } from "react";

type FallbackImageProps = {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackEmoji?: string;
};

export function FallbackImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  fallbackEmoji = "🏞️",
}: FallbackImageProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src?.trim() || failed;

  if (showFallback) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#3B82F6] via-[#0EA5E9] to-[#22C55E] ${containerClassName || className}`}
        aria-label={alt}
      >
        <span className="text-4xl opacity-80">{fallbackEmoji}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}
