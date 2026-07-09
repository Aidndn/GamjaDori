import type { NormalizedTourPlace } from "@/types/tour";
import {
  filterTourPlaces,
  getCuratedFallbackPlaces,
  isQualityTourResults,
} from "@/utils/tourRecommendations";

export async function fetchCityPlaces(
  city: string,
  cityId?: string,
): Promise<NormalizedTourPlace[]> {
  const params = new URLSearchParams({ city });
  if (cityId) params.set("cityId", cityId);

  const response = await fetch(`/api/tour/area?${params.toString()}`);
  const json = (await response.json()) as {
    success: boolean;
    data?: NormalizedTourPlace[];
    source?: "tourapi" | "fallback";
  };

  if (json.success && json.data && json.data.length > 0) {
    const filtered = filterTourPlaces(json.data, city);
    if (isQualityTourResults(filtered, city, cityId) || json.source === "fallback") {
      return filtered.length > 0 ? filtered : json.data;
    }
  }

  if (cityId) {
    return getCuratedFallbackPlaces(cityId, city);
  }

  return [];
}
