"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LoadingState } from "@/components/common/LoadingState";
import { FallbackImage } from "@/components/common/FallbackImage";
import {
  getAttractionById,
  getAttractionIdByName,
  getFeaturedAttractionId,
} from "@/data/attractions";
import { useCityAttractions } from "@/hooks/useCityAttractions";
import type { GangwonCity } from "@/types/gangwon";

type CityRecommendationCardProps = {
  city: GangwonCity;
  selectedAttraction: string;
  onSelectAttraction: (name: string) => void;
};

export function CityRecommendationCard({
  city,
  selectedAttraction,
  onSelectAttraction,
}: CityRecommendationCardProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const { attractions, loading, error, source } = useCityAttractions(city.id, city.name);

  const displayNames = useMemo(() => {
    const curated = city.attractions.filter((name) => name.trim());
    if (curated.length >= 3) return curated.slice(0, 3);
    if (attractions.length > 0) {
      return attractions.slice(0, 3).map((a) => a.title);
    }
    return curated;
  }, [attractions, city.attractions]);

  const findPlaceForName = (name: string) => {
    const exact = attractions.find((a) => a.title === name);
    if (exact) return exact;

    const fuzzy = attractions.find(
      (a) => a.title.includes(name) || name.includes(a.title),
    );
    if (fuzzy) return fuzzy;

    const localId = getAttractionIdByName(city.id, name);
    if (!localId) return undefined;

    const local = getAttractionById(localId);
    if (!local) return undefined;

    return {
      contentId: local.id,
      contentTypeId: "12",
      title: local.name,
      city: local.city,
      category: local.category,
      address: local.address,
      phone: local.phone,
      openingHours: local.openingHours,
      description: local.description,
      image: local.image,
      mapX: local.mapX ?? "",
      mapY: local.mapY ?? "",
    };
  };

  const selectedPlace = findPlaceForName(selectedAttraction);
  const selectedId =
    getAttractionIdByName(city.id, selectedAttraction) ??
    selectedPlace?.contentId;

  useEffect(() => {
    setVisible(false);
    const timer = window.setTimeout(() => setVisible(true), 50);
    return () => window.clearTimeout(timer);
  }, [city.id]);

  useEffect(() => {
    if (displayNames.length > 0 && !displayNames.includes(selectedAttraction)) {
      onSelectAttraction(displayNames[0]);
    }
  }, [displayNames, selectedAttraction, onSelectAttraction]);

  async function handleDetailClick() {
    if (!selectedAttraction) return;

    setSearching(true);
    setSearchError(null);

    const fallbackId =
      getAttractionIdByName(city.id, selectedAttraction) ??
      getFeaturedAttractionId(city.id);

    try {
      const response = await fetch(
        `/api/tour/search?keyword=${encodeURIComponent(selectedAttraction)}`,
      );
      const json = (await response.json()) as {
        success: boolean;
        data?: { contentId: string };
        error?: string;
      };

      if (json.success && json.data?.contentId) {
        router.push(
          `/attraction/${json.data.contentId}?fallback=${fallbackId ?? ""}&city=${city.id}`,
        );
        return;
      }

      if (selectedPlace?.contentId && /^\d+$/.test(selectedPlace.contentId)) {
        router.push(
          `/attraction/${selectedPlace.contentId}?fallback=${fallbackId ?? ""}&city=${city.id}`,
        );
        return;
      }

      if (fallbackId) {
        setSearchError(json.error ?? "TourAPI 검색 실패 — 기본 정보로 이동합니다.");
        router.push(`/attraction/${fallbackId}?city=${city.id}`);
        return;
      }

      setSearchError(json.error ?? "관광지 정보를 찾을 수 없습니다.");
    } catch {
      if (fallbackId) {
        setSearchError("TourAPI 연결 실패 — 기본 정보로 이동합니다.");
        router.push(`/attraction/${fallbackId}?city=${city.id}`);
      } else {
        setSearchError("TourAPI 연결에 실패했습니다.");
      }
    } finally {
      setSearching(false);
    }
  }

  const heroImage = selectedPlace?.image;
  const selectedFallback = selectedId ? getAttractionById(selectedId) : undefined;

  return (
    <article
      className={`overflow-hidden rounded-[24px] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.1)] ring-1 ring-[#F1F5F9] transition-all duration-400 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div
        className={`relative flex h-[140px] items-center justify-center overflow-hidden bg-gradient-to-br ${city.imageGradient}`}
      >
        {heroImage ? (
          <>
            <img
              src={heroImage}
              alt={selectedAttraction}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDQwTDQwIDBINDBWNDBIMHoiLz48cGF0aCBkPSJNMCAyMEwyMCAyME0yMCAyMEwyMCA0ME0yMCAyMEw0MCAyMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative text-center">
              <span className="text-5xl opacity-80">🏞️</span>
              <p className="mt-2 text-[13px] font-medium text-white/80">이미지 준비중</p>
            </div>
          </>
        )}
        {selectedAttraction && heroImage && (
          <p className="absolute bottom-3 left-4 text-[13px] font-bold text-white drop-shadow">
            {selectedAttraction}
          </p>
        )}
      </div>

      <div className="p-5">
        <span className="inline-block rounded-full bg-[#F0FDF4] px-2.5 py-0.5 text-[11px] font-bold text-[#16A34A]">
          {source === "tourapi" ? "TourAPI 추천" : "추천 여행지"}
        </span>
        <h2 className="mt-2 text-[22px] font-bold tracking-tight text-[#0F172A]">
          {city.name}
        </h2>
        <p className="mt-1.5 text-[14px] leading-relaxed text-[#64748B]">
          {city.description}
        </p>

        {loading && (
          <div className="mt-4 py-4">
            <LoadingState message="관광지를 불러오는 중..." />
          </div>
        )}

        {error && (
          <p className="mt-3 rounded-xl bg-[#FFFBEB] px-3 py-2 text-[12px] font-medium text-[#B45309]">
            {error}
          </p>
        )}

        {searchError && (
          <p className="mt-3 rounded-xl bg-[#FEF2F2] px-3 py-2 text-[12px] font-medium text-[#DC2626]">
            {searchError}
          </p>
        )}

        {!loading && (
          <ul className="mt-4 space-y-2">
            {displayNames.map((attraction, index) => {
              const isSelected = attraction === selectedAttraction;
              const place = findPlaceForName(attraction);

              return (
                <li key={attraction}>
                  <button
                    type="button"
                    onClick={() => onSelectAttraction(attraction)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                      isSelected
                        ? "bg-[#EFF6FF] ring-1 ring-[#BFDBFE]"
                        : "bg-[#F8FAFC] hover:bg-[#EFF6FF]"
                    }`}
                  >
                    {place?.image ? (
                      <FallbackImage
                        src={place.image}
                        alt={attraction}
                        className="h-8 w-8 shrink-0 rounded-full object-cover"
                        containerClassName="h-8 w-8 shrink-0 rounded-full"
                      />
                    ) : (
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                          isSelected
                            ? "bg-gradient-to-br from-[#3B82F6] to-[#22C55E]"
                            : "bg-[#94A3B8]"
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                    <span
                      className={`min-w-0 flex-1 text-[14px] font-semibold ${
                        isSelected ? "text-[#1D4ED8]" : "text-[#334155]"
                      }`}
                    >
                      {attraction}
                    </span>
                    {isSelected && (
                      <span className="ml-auto shrink-0 text-[10px] font-bold text-[#3B82F6]">
                        선택됨
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <button
          type="button"
          onClick={handleDetailClick}
          disabled={searching || loading || !selectedAttraction}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#22C55E] py-3.5 text-[15px] font-bold text-white shadow-[0_6px_20px_rgba(59,130,246,0.28)] transition-transform active:scale-[0.98] disabled:opacity-70"
        >
          {searching ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              TourAPI 검색 중...
            </>
          ) : (
            `${selectedAttraction || "관광지"} 상세보기`
          )}
        </button>
        {selectedFallback && (
          <p className="mt-2 text-center text-[11px] text-[#94A3B8]">
            {selectedFallback.category} · {selectedFallback.city}
          </p>
        )}
      </div>
    </article>
  );
}
