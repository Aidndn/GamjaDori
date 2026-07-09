"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "gamjadori-recent-searches";
const MAX_RECENT = 8;

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(searches: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
}

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setRecentSearches(readStorage());
    setHydrated(true);
  }, []);

  const addRecentSearch = useCallback((keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      const next = [trimmed, ...prev.filter((item) => item !== trimmed)].slice(0, MAX_RECENT);
      writeStorage(next);
      return next;
    });
  }, []);

  const removeRecentSearch = useCallback((keyword: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((item) => item !== keyword);
      writeStorage(next);
      return next;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    writeStorage([]);
  }, []);

  return {
    hydrated,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  };
}
