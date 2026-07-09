"use client";

import { useState } from "react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { CityRecommendationCard, GangwonMapIllustration } from "@/components/map";
import { defaultCity, gangwonCities } from "@/data/gangwonCities";
import type { GangwonCity } from "@/types/gangwon";

export default function MapPage() {
  const [selectedCity, setSelectedCity] = useState<GangwonCity>(defaultCity);
  const [selectedAttraction, setSelectedAttraction] = useState<string>(
    defaultCity.attractions[0],
  );

  function handleCitySelect(city: GangwonCity) {
    setSelectedCity(city);
    setSelectedAttraction(city.attractions[0]);
  }

  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-white font-sans text-[#0F172A]">
      <header className="px-5 pb-2 pt-12">
        <p className="text-[12px] font-semibold tracking-wide text-[#3B82F6]">
          GAMJADORI MAP
        </p>
        <h1 className="mt-1 text-[26px] font-bold tracking-tight">
          강원도 여행지도
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-[#64748B]">
          지역을 선택하면 감자도리가 추천 명소를 보여드려요.
        </p>
      </header>

      <main className="space-y-5 px-5 pb-32 pt-4">
        <GangwonMapIllustration
          cities={gangwonCities}
          selectedId={selectedCity.id}
          onSelect={handleCitySelect}
        />

        <CityRecommendationCard
          city={selectedCity}
          selectedAttraction={selectedAttraction}
          onSelectAttraction={setSelectedAttraction}
        />
      </main>

      <BottomNavigation activeTab="map" />
    </div>
  );
}
