"use client";

import Link from "next/link";
import { useState } from "react";
import type { TouristAttraction } from "@/types/attraction";
import { Toast } from "@/components/common/Toast";
import { useFavoritesStore } from "@/hooks/useFavoritesStore";
import { getFavoriteId } from "@/utils/favorites";
import { IconButton } from "./IconButton";

type AttractionHeroProps = {
  attraction: TouristAttraction;
  backHref?: string;
};

export function AttractionHero({ attraction, backHref = "/map" }: AttractionHeroProps) {
  const { hydrated, isFavorite, toggleFavorite } = useFavoritesStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const favoriteId = getFavoriteId(attraction);
  const favorited = hydrated && isFavorite(favoriteId);

  function handleToggleFavorite() {
    const result = toggleFavorite(attraction);
    setToastMessage(
      result === "added" ? "즐겨찾기에 추가되었습니다." : "즐겨찾기에서 삭제되었습니다.",
    );
  }

  return (
    <>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      <div className="relative h-[300px] overflow-hidden bg-gradient-to-br from-[#3B82F6] via-[#0EA5E9] to-[#22C55E]">
        {attraction.image && !imageError && (
          <img
            src={attraction.image}
            alt={attraction.name}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDQwTDQwIDBINDBWNDBIMHoiLz48cGF0aCBkPSJNMCAyMEwyMCAyME0yMCAyMEwyMCA0ME0yMCAyMEw0MCAyMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')] opacity-40" />

        <div className="absolute left-5 right-5 top-12 flex items-center justify-between">
          <Link href={backHref}>
            <IconButton label="뒤로가기">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconButton>
          </Link>

          <IconButton
            label={favorited ? "찜 해제" : "찜하기"}
            onClick={handleToggleFavorite}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={favorited ? "#EF4444" : "none"}
              stroke={favorited ? "#EF4444" : "currentColor"}
              strokeWidth="2"
              aria-hidden
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinejoin="round" />
            </svg>
          </IconButton>
        </div>

        <div className="absolute bottom-6 left-0 right-0 text-center">
          <span className="text-5xl opacity-90">🏞️</span>
        </div>
      </div>
    </>
  );
}
