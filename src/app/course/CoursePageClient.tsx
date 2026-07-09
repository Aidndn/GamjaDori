"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LoadingState } from "@/components/common/LoadingState";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TravelSummaryCard } from "@/components/travel";
import { WeatherCard } from "@/components/weather";
import {
  CostSummaryCard,
  CourseActionBar,
  CourseEmptyState,
  CourseEmptyStateLink,
  CourseTimeline,
  SavedAttractionsList,
  SelectedAttractionCard,
  TravelStyleChips,
} from "@/components/course";
import { getTravelStyle } from "@/data/travelStyles";
import { regenerateCourse } from "@/data/courseTemplates";
import { gangwonCities } from "@/data/gangwonCities";
import { useCourseStore } from "@/hooks/useCourseStore";
import { useFavoritesStore } from "@/hooks/useFavoritesStore";
import { useWeather } from "@/hooks/useWeather";
import type { TravelStyleId } from "@/types/course";
import { fetchCityPlaces } from "@/utils/fetchCityPlaces";
import { buildTravelSummary } from "@/utils/travelSummary";
import { resolveCourseCity } from "@/utils/weather";
import { buttonPrimary } from "@/lib/buttonStyles";

const DEFAULT_STYLE: TravelStyleId = "nature";

function resolveCityId(cityName: string): string | undefined {
  return gangwonCities.find((c) => c.name === cityName)?.id;
}

export default function CoursePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldGenerate = searchParams.get("generate") === "1";

  const {
    hydrated,
    savedAttractions,
    course,
    travelStyle,
    generateCourse,
    removeAttraction,
    removeCourseItem,
    setGeneratedCourse,
    setTravelStyle,
  } = useCourseStore();

  const { favorites } = useFavoritesStore();

  const [toast, setToast] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const selectedStyle = travelStyle ?? course?.travelStyle ?? DEFAULT_STYLE;

  const primaryAttraction = savedAttractions[0];
  const weatherCity = resolveCourseCity(course?.city, primaryAttraction?.city);
  const { weather, loading: weatherLoading, error: weatherError, isFallback: weatherFallback } =
    useWeather(weatherCity);

  const runGenerate = useCallback(
    async (style: TravelStyleId, variantIndex = 0) => {
      if (savedAttractions.length === 0) return;

      setGenerating(true);
      try {
        const city = resolveCourseCity(primaryAttraction?.city, course?.city);
        const cityId = resolveCityId(city);
        const places = await fetchCityPlaces(city, cityId);
        generateCourse(style, variantIndex, places);
      } finally {
        setGenerating(false);
      }
    },
    [savedAttractions.length, primaryAttraction?.city, course?.city, generateCourse],
  );

  useEffect(() => {
    if (!hydrated) return;
    if (shouldGenerate && savedAttractions.length > 0) {
      const style = travelStyle ?? course?.travelStyle ?? DEFAULT_STYLE;
      runGenerate(style).then(() => router.replace("/course"));
    }
  }, [
    hydrated,
    shouldGenerate,
    savedAttractions.length,
    travelStyle,
    course?.travelStyle,
    runGenerate,
    router,
  ]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  async function handleStyleSelect(style: TravelStyleId) {
    setTravelStyle(style);
    if (savedAttractions.length === 0) {
      setToast("먼저 관광지를 추가해 주세요");
      return;
    }
    await runGenerate(style);
    const styleLabel = getTravelStyle(style).label;
    setToast(`🥔 ${styleLabel} 스타일 코스가 생성되었어요`);
  }

  async function handleGenerate() {
    if (savedAttractions.length === 0) {
      setToast("먼저 관광지를 추가해 주세요");
      return;
    }
    await runGenerate(selectedStyle);
    setToast("🥔 AI 하루 코스가 생성되었어요");
  }

  async function handleRegenerate() {
    if (savedAttractions.length === 0) {
      setToast("저장된 관광지가 없습니다");
      return;
    }
    setGenerating(true);
    try {
      const city = resolveCourseCity(primaryAttraction?.city, course?.city);
      const cityId = resolveCityId(city);
      const places = await fetchCityPlaces(city, cityId);
      const next = regenerateCourse(savedAttractions, course ?? undefined, places);
      setGeneratedCourse(next);
      setToast("🥔 코스 다시 만들기 완료");
    } finally {
      setGenerating(false);
    }
  }

  if (!hydrated) {
    return <LoadingState fullScreen message="코스 정보를 불러오는 중..." />;
  }

  const styleInfo = getTravelStyle(selectedStyle);
  const travelSummary = buildTravelSummary({
    city: weatherCity,
    travelStyle: selectedStyle,
    courseItems: course?.items ?? [],
    favoritesCount: favorites.length,
  });

  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-white pb-32 font-sans text-[#0F172A]">
      <header className="px-5 pb-4 pt-12">
        <p className="text-[12px] font-semibold tracking-wide text-[#3B82F6]">AI COURSE</p>
        <h1 className="mt-1 text-[26px] font-bold tracking-tight">
          <span className="mr-1.5">🥔</span>
          AI 여행 코스
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-[#64748B]">
          선택한 관광지를 바탕으로 감자도리가 하루 일정을 만들어드려요.
        </p>
      </header>

      {toast && (
        <div className="mx-5 mb-4 rounded-2xl bg-[#F0FDF4] px-4 py-3 text-center text-[13px] font-semibold text-[#16A34A] ring-1 ring-[#BBF7D0]">
          {toast}
        </div>
      )}

      {generating && (
        <div className="mx-5 mb-4">
          <LoadingState message="TourAPI에서 코스를 생성하는 중..." />
        </div>
      )}

      <main className="space-y-6 px-5">
        <TravelStyleChips selectedStyle={selectedStyle} onSelect={handleStyleSelect} />

        {primaryAttraction && <SelectedAttractionCard attraction={primaryAttraction} />}

        <WeatherCard
          weather={weather}
          loading={weatherLoading}
          error={weatherError}
          isFallback={weatherFallback}
        />

        <TravelSummaryCard summary={travelSummary} />

        <section className="rounded-[24px] bg-gradient-to-br from-[#F0F9FF] to-[#F0FDF4] p-5 ring-1 ring-[#E0F2FE]">
          <h2 className="text-[15px] font-bold">담은 관광지</h2>
          <p className="mt-1 text-[12px] text-[#64748B]">{savedAttractions.length}곳 저장됨</p>
          <div className="mt-3">
            <SavedAttractionsList attractions={savedAttractions} onRemove={removeAttraction} />
          </div>
        </section>

        {course ? (
          <section className="space-y-4">
            <div>
              <h2 className="text-[19px] font-bold">{course.title}</h2>
              <p className="mt-1 text-[13px] text-[#64748B]">
                <span className="mr-1.5">
                  {styleInfo.emoji} {styleInfo.label}
                </span>
                {course.basedOn
                  ? `· ${course.basedOn} 기반 · AI 추천 코스`
                  : "· AI 추천 코스"}
              </p>
            </div>

            <CourseTimeline items={course.items} onRemoveItem={removeCourseItem} />

            <CostSummaryCard items={course.items} />

            <p className="text-center text-[11px] text-[#94A3B8]">
              각 항목의 × 버튼으로 일정을 삭제할 수 있어요
            </p>

            <CourseActionBar onRegenerate={handleRegenerate} city={course.city} />
          </section>
        ) : (
          <div className="space-y-5">
            <CourseEmptyState />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={savedAttractions.length === 0 || generating}
              className={`w-full rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#22C55E] py-4 text-[15px] font-bold text-white shadow-[0_6px_20px_rgba(59,130,246,0.28)] disabled:opacity-50 ${buttonPrimary}`}
            >
              🥔 코스 생성하기
            </button>
          </div>
        )}

      </main>

      {!course && savedAttractions.length === 0 && (
        <div className="fixed bottom-24 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 px-5">
          <CourseEmptyStateLink />
        </div>
      )}

      <BottomNavigation activeTab="course" />
    </div>
  );
}
