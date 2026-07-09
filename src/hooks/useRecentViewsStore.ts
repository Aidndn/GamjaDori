"use client";

import { useCallback, useEffect, useState } from "react";
import type { TouristAttraction } from "@/types/attraction";
import type { RecentView } from "@/types/recent";
import { getFavoriteId } from "@/utils/favorites";

const STORAGE_KEY = "gamjadori-recent-views";
const MAX_RECENT = 20;

function readStorage(): RecentView[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecentView[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(views: RecentView[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
}

export function useRecentViewsStore() {
  const [recentViews, setRecentViews] = useState<RecentView[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setRecentViews(readStorage());
    setHydrated(true);
  }, []);

  const addRecentView = useCallback((attraction: TouristAttraction) => {
    const id = getFavoriteId(attraction);
    const entry: RecentView = {
      id,
      name: attraction.name,
      city: attraction.city,
      image: attraction.image,
      viewedAt: Date.now(),
    };

    setRecentViews((prev) => {
      const next = [entry, ...prev.filter((item) => item.id !== id)].slice(0, MAX_RECENT);
      writeStorage(next);
      return next;
    });
  }, []);

  return {
    hydrated,
    recentViews,
    addRecentView,
  };
}
