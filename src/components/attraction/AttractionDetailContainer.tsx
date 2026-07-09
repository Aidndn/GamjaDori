"use client";

import { useEffect, useState } from "react";
import type { NormalizedTourPlace } from "@/types/tour";
import type { TouristAttraction } from "@/types/attraction";
import { mergeTourWithFallback } from "@/api/tourApi";
import { AttractionDetailView } from "./AttractionDetailView";

type AttractionDetailContainerProps = {
  contentId: string | null;
  searchKeyword: string;
  fallback: TouristAttraction;
  nearby: TouristAttraction[];
};

function isApiContentId(id: string): boolean {
  return /^\d+$/.test(id);
}

export function AttractionDetailContainer({
  contentId,
  searchKeyword,
  fallback,
  nearby,
}: AttractionDetailContainerProps) {
  const [attraction, setAttraction] = useState<TouristAttraction>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApiData, setIsApiData] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchDetail() {
      setLoading(true);
      setError(null);
      setIsApiData(false);

      const params = new URLSearchParams();
      if (contentId && isApiContentId(contentId)) {
        params.set("contentId", contentId);
      }
      params.set("keyword", searchKeyword);

      try {
        const response = await fetch(`/api/tour/detail?${params.toString()}`);
        const json = (await response.json()) as {
          success: boolean;
          data?: NormalizedTourPlace;
          contentId?: string;
          error?: string;
        };

        if (cancelled) return;

        if (!json.success || !json.data || !json.contentId) {
          setError(json.error ?? "관광지 정보를 불러오지 못했습니다.");
          setAttraction(fallback);
          setIsApiData(false);
          return;
        }

        const merged = mergeTourWithFallback(json.data, fallback, json.contentId);
        setAttraction(merged);
        setIsApiData(true);
      } catch (fetchError) {
        if (cancelled) return;
        console.error("Tour API fetch error:", fetchError);
        setError("네트워크 오류가 발생했습니다.");
        setAttraction(fallback);
        setIsApiData(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDetail();

    return () => {
      cancelled = true;
    };
  }, [contentId, searchKeyword, fallback.id]);

  if (loading) {
    return (
      <div className="mx-auto min-h-screen max-w-[430px] bg-white font-sans text-[#0F172A]">
        <div className="relative h-[300px] animate-pulse bg-gradient-to-br from-[#3B82F6] via-[#0EA5E9] to-[#22C55E]" />
        <div className="-mt-6 space-y-4 rounded-t-[28px] bg-white px-5 pt-6">
          <div className="h-6 w-20 animate-pulse rounded-full bg-[#E2E8F0]" />
          <div className="h-8 w-48 animate-pulse rounded-lg bg-[#E2E8F0]" />
          <div className="h-4 w-24 animate-pulse rounded bg-[#E2E8F0]" />
        </div>
        <div className="mt-6 flex flex-col items-center gap-3 px-5 py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#3B82F6]" />
          <p className="text-[14px] font-medium text-[#64748B]">관광지 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <AttractionDetailView
      key={`${attraction.contentId ?? attraction.id}-${attraction.name}`}
      attraction={attraction}
      nearby={nearby}
      error={error}
      isApiData={isApiData}
    />
  );
}
