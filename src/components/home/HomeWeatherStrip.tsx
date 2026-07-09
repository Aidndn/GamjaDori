"use client";

import { useEffect, useState } from "react";
import { fetchWeatherByCity } from "@/api/weatherApi";
import type { WeatherInfo } from "@/utils/weather";
import { getMockWeatherByCity } from "@/utils/weather";

const HOME_CITIES = ["강릉", "속초", "춘천", "평창"];

type CityWeather = WeatherInfo & { loading: boolean; error?: string; isFallback?: boolean };

export function HomeWeatherStrip() {
  const [items, setItems] = useState<CityWeather[]>(() =>
    HOME_CITIES.map((city) => ({ ...getMockWeatherByCity(city), loading: true })),
  );

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      const results = await Promise.all(HOME_CITIES.map((city) => fetchWeatherByCity(city)));
      if (cancelled) return;

      setItems(
        results.map((result) => ({
          ...result.weather,
          loading: false,
          error: result.error,
          isFallback: result.isFallback,
        })),
      );
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
      {items.map((w) => (
        <div
          key={w.city}
          className="flex w-[88px] shrink-0 flex-col items-center rounded-[20px] bg-white px-3 py-4 shadow-[0_4px_20px_rgba(15,23,42,0.06)] ring-1 ring-[#F1F5F9]"
        >
          <span className="text-[13px] font-semibold text-[#334155]">{w.city}</span>
          {w.loading ? (
            <span className="my-4 text-[11px] text-[#94A3B8]">로딩...</span>
          ) : (
            <>
              <span className="my-2 text-2xl">{w.icon}</span>
              <span className="text-[20px] font-bold text-[#0F172A]">{w.temperature}°</span>
              <span className="mt-0.5 text-center text-[11px] text-[#94A3B8]">{w.description}</span>
              {w.isFallback && (
                <span className="mt-1 text-[9px] text-[#B45309]">예상</span>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
