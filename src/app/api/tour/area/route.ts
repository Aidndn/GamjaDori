import { NextResponse } from "next/server";
import { searchTourByCity } from "@/api/tourApi";
import {
  filterTourPlaces,
  getCuratedFallbackPlaces,
  isQualityTourResults,
} from "@/utils/tourRecommendations";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const cityId = searchParams.get("cityId");
  const exclude = searchParams.get("exclude");

  if (!city) {
    return NextResponse.json(
      { success: false, error: "city 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  try {
    const rawResults = await searchTourByCity(city);
    let places = filterTourPlaces(rawResults, city);

    if (exclude) {
      places = places.filter((place) => place.title !== exclude);
    }

    const useFallback =
      cityId && !isQualityTourResults(places, city, cityId);

    if (useFallback) {
      const fallback = getCuratedFallbackPlaces(cityId, city).filter(
        (a) => a.title !== exclude,
      );

      return NextResponse.json({
        success: true,
        source: "fallback",
        error: places.length > 0 ? "TourAPI 결과 품질이 낮아 추천 데이터를 사용합니다." : undefined,
        data: fallback,
      });
    }

    return NextResponse.json({
      success: true,
      source: "tourapi",
      data: places.slice(0, 12),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "TourAPI 지역 검색 실패";

    if (cityId) {
      const fallback = getCuratedFallbackPlaces(cityId, city).filter(
        (a) => a.title !== exclude,
      );

      return NextResponse.json({
        success: true,
        source: "fallback",
        error: message,
        data: fallback,
      });
    }

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
