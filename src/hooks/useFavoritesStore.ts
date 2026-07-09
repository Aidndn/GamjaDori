"use client";

import { useCallback, useEffect, useState } from "react";
import type { TouristAttraction } from "@/types/attraction";
import type { FavoriteAttraction } from "@/types/favorite";
import { getFavoriteId, toFavoriteAttraction } from "@/utils/favorites";

const STORAGE_KEY = "gamjadori-favorites";

function readStorage(): FavoriteAttraction[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoriteAttraction[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(favorites: FavoriteAttraction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function useFavoritesStore() {
  const [favorites, setFavorites] = useState<FavoriteAttraction[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorites(readStorage());
    setHydrated(true);
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((item) => item.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback((attraction: TouristAttraction): "added" | "removed" => {
    const id = getFavoriteId(attraction);
    let result: "added" | "removed" = "added";

    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === id);
      const next = exists
        ? prev.filter((item) => item.id !== id)
        : [toFavoriteAttraction(attraction), ...prev.filter((item) => item.id !== id)];
      result = exists ? "removed" : "added";
      writeStorage(next);
      return next;
    });

    return result;
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((item) => item.id !== id);
      writeStorage(next);
      return next;
    });
  }, []);

  return {
    hydrated,
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
  };
}
