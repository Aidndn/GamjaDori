"use client";

import { useCallback, useEffect, useState } from "react";
import type { GeneratedCourse, SavedAttraction, TravelStyleId } from "@/types/course";
import type { NormalizedTourPlace } from "@/types/tour";
import { generateOneDayCourse } from "@/data/courseTemplates";

const STORAGE_KEY_ATTRACTIONS = "gamjadori-saved-attractions";
const STORAGE_KEY_COURSE = "gamjadori-generated-course";
const STORAGE_KEY_STYLE = "gamjadori-travel-style";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useCourseStore() {
  const [savedAttractions, setSavedAttractions] = useState<SavedAttraction[]>([]);
  const [course, setCourse] = useState<GeneratedCourse | null>(null);
  const [travelStyle, setTravelStyleState] = useState<TravelStyleId | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSavedAttractions(readStorage<SavedAttraction[]>(STORAGE_KEY_ATTRACTIONS, []));
    setCourse(readStorage<GeneratedCourse | null>(STORAGE_KEY_COURSE, null));
    setTravelStyleState(readStorage<TravelStyleId | null>(STORAGE_KEY_STYLE, null));
    setHydrated(true);
  }, []);

  const addAttraction = useCallback(
    (attraction: Omit<SavedAttraction, "addedAt">, asPrimary = false) => {
      setSavedAttractions((prev) => {
        const entry = { ...attraction, addedAt: Date.now() };
        const without = prev.filter((a) => a.id !== attraction.id);
        const next = asPrimary ? [entry, ...without] : [...without, entry];
        writeStorage(STORAGE_KEY_ATTRACTIONS, next);
        return next;
      });
    },
    [],
  );

  const removeAttraction = useCallback((id: string) => {
    setSavedAttractions((prev) => {
      const next = prev.filter((a) => a.id !== id);
      writeStorage(STORAGE_KEY_ATTRACTIONS, next);
      return next;
    });
  }, []);

  const setTravelStyle = useCallback((style: TravelStyleId) => {
    setTravelStyleState(style);
    writeStorage(STORAGE_KEY_STYLE, style);
  }, []);

  const generateCourse = useCallback(
    (style: TravelStyleId, variantIndex = 0, cityPlaces?: NormalizedTourPlace[]) => {
      const generated = generateOneDayCourse(
        savedAttractions,
        style,
        variantIndex,
        cityPlaces,
      );
      setCourse(generated);
      setTravelStyleState(style);
      writeStorage(STORAGE_KEY_COURSE, generated);
      writeStorage(STORAGE_KEY_STYLE, style);
      return generated;
    },
    [savedAttractions],
  );

  const updateCourseItems = useCallback((items: GeneratedCourse["items"]) => {
    setCourse((prev) => {
      if (!prev) return prev;
      const next = { ...prev, items };
      writeStorage(STORAGE_KEY_COURSE, next);
      return next;
    });
  }, []);

  const removeCourseItem = useCallback((itemId: string) => {
    setCourse((prev) => {
      if (!prev) return prev;
      const next = { ...prev, items: prev.items.filter((item) => item.id !== itemId) };
      writeStorage(STORAGE_KEY_COURSE, next);
      return next;
    });
  }, []);

  const setGeneratedCourse = useCallback((next: GeneratedCourse) => {
    setCourse(next);
    writeStorage(STORAGE_KEY_COURSE, next);
  }, []);

  const clearCourse = useCallback(() => {
    setCourse(null);
    localStorage.removeItem(STORAGE_KEY_COURSE);
  }, []);

  return {
    hydrated,
    savedAttractions,
    course,
    travelStyle,
    addAttraction,
    removeAttraction,
    generateCourse,
    setTravelStyle,
    updateCourseItems,
    removeCourseItem,
    setGeneratedCourse,
    clearCourse,
  };
}
