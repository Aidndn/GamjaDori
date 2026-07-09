"use client";

import { useEffect, useState } from "react";
import type { NormalizedTourPlace } from "@/types/tour";
import { getAttractionsByCityId } from "@/data/attractions";

type CityAttractionsState = {
  attractions: NormalizedTourPlace[];
  loading: boolean;
  error: string | null;
  source: "tourapi" | "fallback" | null;
};

function fallbackFromLocal(cityId: string, cityName: string): NormalizedTourPlace[] {
  return getAttractionsByCityId(cityId).map((a) => ({
    contentId: a.id,
    contentTypeId: "12",
    title: a.name,
    city: a.city || cityName,
    category: a.category,
    address: a.address,
    phone: a.phone,
    openingHours: a.openingHours,
    description: a.description,
    image: a.image,
    mapX: a.mapX ?? "",
    mapY: a.mapY ?? "",
  }));
}

export function useCityAttractions(cityId: string, cityName: string) {
  const [state, setState] = useState<CityAttractionsState>({
    attractions: [],
    loading: true,
    error: null,
    source: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetch(
          `/api/tour/area?city=${encodeURIComponent(cityName)}&cityId=${encodeURIComponent(cityId)}`,
        );
        const json = (await response.json()) as {
          success: boolean;
          data?: NormalizedTourPlace[];
          source?: "tourapi" | "fallback";
          error?: string;
        };

        if (cancelled) return;

        if (json.success && json.data && json.data.length > 0) {
          setState({
            attractions: json.data.slice(0, 6),
            loading: false,
            error: json.source === "fallback" ? json.error ?? null : null,
            source: json.source ?? "tourapi",
          });
          return;
        }

        const local = fallbackFromLocal(cityId, cityName);
        setState({
          attractions: local.slice(0, 6),
          loading: false,
          error: json.error ?? "TourAPI 결과가 없어 기본 데이터를 사용합니다.",
          source: "fallback",
        });
      } catch (error) {
        if (cancelled) return;
        const local = fallbackFromLocal(cityId, cityName);
        setState({
          attractions: local.slice(0, 6),
          loading: false,
          error: error instanceof Error ? error.message : "관광지를 불러오지 못했습니다.",
          source: "fallback",
        });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [cityId, cityName]);

  return state;
}
