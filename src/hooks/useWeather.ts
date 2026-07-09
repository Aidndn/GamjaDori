"use client";

import { useEffect, useState } from "react";
import { fetchWeatherByCity } from "@/api/weatherApi";
import type { WeatherInfo } from "@/utils/weather";
import { getMockWeatherByCity } from "@/utils/weather";

export function useWeather(city: string) {
  const [weather, setWeather] = useState<WeatherInfo>(() => getMockWeatherByCity(city));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      setLoading(true);
      setError(null);

      const result = await fetchWeatherByCity(city);
      if (cancelled) return;

      setWeather(result.weather);
      setIsFallback(result.isFallback);
      setError(result.isFallback ? result.error ?? "기본 날씨 정보를 표시합니다." : null);
      setLoading(false);
    }

    loadWeather();
    return () => {
      cancelled = true;
    };
  }, [city]);

  return { weather, loading, error, isFallback };
}
