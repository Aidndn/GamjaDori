"use client";

import { useEffect, useState } from "react";
import type { TouristAttraction } from "@/types/attraction";
import { getAttractionById } from "@/data/attractions";
import { LoadingState } from "@/components/common/LoadingState";
import { NearbyAttractions } from "./NearbyAttractions";

type NearbyAttractionsContainerProps = {
  city: string;
  cityId: string;
  currentName: string;
  fallbackNearby: TouristAttraction[];
};

export function NearbyAttractionsContainer({
  city,
  cityId,
  currentName,
  fallbackNearby,
}: NearbyAttractionsContainerProps) {
  const [nearby, setNearby] = useState<TouristAttraction[]>(fallbackNearby);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fallbackNearby.length > 0) {
      setNearby(fallbackNearby);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/tour/area?city=${encodeURIComponent(city)}&cityId=${encodeURIComponent(cityId)}&exclude=${encodeURIComponent(currentName)}`,
        );
        const json = (await response.json()) as {
          success: boolean;
          data?: Array<{
            contentId: string;
            title: string;
            city: string;
            category: string;
            description: string;
            image: string;
            address: string;
          }>;
          error?: string;
          source?: string;
        };

        if (cancelled) return;

        if (json.success && json.data && json.data.length > 0) {
          const mapped: TouristAttraction[] = json.data.slice(0, 3).map((place) => {
            const fallback = getAttractionById(place.contentId);
            return {
              id: /^\d+$/.test(place.contentId) ? place.contentId : (fallback?.id ?? place.contentId),
              contentId: /^\d+$/.test(place.contentId) ? place.contentId : fallback?.contentId,
              name: place.title,
              city: place.city || city,
              cityId,
              category: place.category,
              rating: fallback?.rating ?? 4.5,
              image: place.image || fallback?.image || "",
              address: place.address || fallback?.address || "",
              phone: fallback?.phone ?? "",
              openingHours: fallback?.openingHours ?? "",
              description: place.description || fallback?.description || "",
              nearbyIds: fallback?.nearbyIds ?? [],
            };
          });
          setNearby(mapped);
          if (json.source === "fallback" && json.error) {
            setError(json.error);
          }
        } else {
          setNearby(fallbackNearby);
          setError(json.error ?? "주변 명소를 불러오지 못해 기본 정보를 표시합니다.");
        }
      } catch (fetchError) {
        if (cancelled) return;
        setNearby(fallbackNearby);
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "주변 명소를 불러오지 못했습니다.",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [city, cityId, currentName, fallbackNearby]);

  if (loading) {
    return (
      <div className="mt-6 px-5">
        <LoadingState message="주변 명소를 불러오는 중..." />
      </div>
    );
  }

  return (
    <>
      {error && (
        <p className="mx-5 mt-4 rounded-xl bg-[#FFFBEB] px-3 py-2 text-[12px] font-medium text-[#B45309]">
          {error}
        </p>
      )}
      <NearbyAttractions attractions={nearby} />
    </>
  );
}
