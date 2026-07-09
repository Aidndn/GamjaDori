"use client";

import { useEffect } from "react";
import type { TouristAttraction } from "@/types/attraction";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { useRecentViewsStore } from "@/hooks/useRecentViewsStore";
import { AttractionActionButtons } from "./AttractionActionButtons";
import { AttractionHeader } from "./AttractionHeader";
import { AttractionHero } from "./AttractionHero";
import { AttractionInfoSection } from "./AttractionInfoSection";
import { NearbyAttractionsContainer } from "./NearbyAttractionsContainer";
import { StartTripButton } from "./StartTripButton";

type AttractionDetailViewProps = {
  attraction: TouristAttraction;
  nearby: TouristAttraction[];
  error?: string | null;
  isApiData?: boolean;
};

export function AttractionDetailView({
  attraction,
  nearby,
  error,
  isApiData,
}: AttractionDetailViewProps) {
  const { addRecentView } = useRecentViewsStore();

  useEffect(() => {
    addRecentView(attraction);
  }, [addRecentView, attraction.id]);

  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-white pb-28 font-sans text-[#0F172A]">
      <AttractionHero attraction={attraction} />
      <AttractionHeader attraction={attraction} />

      {error && (
        <ErrorBanner
          title={error}
          description="기본 정보를 표시합니다. 잠시 후 다시 시도해 주세요."
        />
      )}

      {isApiData && !error && (
        <div className="mx-5 mt-3 rounded-2xl bg-[#F0FDF4] px-4 py-2.5 ring-1 ring-[#BBF7D0]">
          <p className="text-[12px] font-semibold text-[#16A34A]">
            TourAPI 실시간 정보 · {attraction.name}
          </p>
        </div>
      )}

      <AttractionInfoSection attraction={attraction} />

      {attraction.mapX && attraction.mapY && (
        <section className="mx-5 mt-3 rounded-2xl bg-white px-4 py-4 shadow-[0_4px_20px_rgba(15,23,42,0.06)] ring-1 ring-[#F1F5F9]">
          <p className="text-[12px] font-semibold text-[#94A3B8]">좌표</p>
          <p className="mt-1 text-[13px] font-medium text-[#334155]">
            X: {attraction.mapX} · Y: {attraction.mapY}
          </p>
        </section>
      )}

      <AttractionActionButtons attraction={attraction} />
      <NearbyAttractionsContainer
        city={attraction.city}
        cityId={attraction.cityId}
        currentName={attraction.name}
        fallbackNearby={nearby}
      />

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t border-[#F1F5F9] bg-white/95 px-5 pb-7 pt-3 backdrop-blur-xl">
        <StartTripButton attraction={attraction} />
      </div>
    </div>
  );
}
