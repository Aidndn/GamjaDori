import type { WeatherFetchResult, WeatherInfo } from "@/utils/weather";
import { getMockWeatherByCity } from "@/utils/weather";

const OPEN_METEO_BASE = "https://api.open-meteo.com/v1/forecast";

export const CITY_COORDINATES: Record<
  string,
  { latitude: number; longitude: number }
> = {
  강릉: { latitude: 37.7519, longitude: 128.8761 },
  춘천: { latitude: 37.8813, longitude: 127.7298 },
  속초: { latitude: 38.207, longitude: 128.5918 },
  원주: { latitude: 37.3422, longitude: 127.9202 },
  평창: { latitude: 37.3705, longitude: 128.3904 },
  정선: { latitude: 37.3806, longitude: 128.6609 },
  삼척: { latitude: 37.4499, longitude: 129.1652 },
};

type OpenMeteoResponse = {
  current_weather?: {
    temperature: number;
    weathercode: number;
  };
};

export function mapWeatherCode(weathercode: number): Pick<WeatherInfo, "description" | "icon"> {
  if (weathercode === 0) return { description: "맑음", icon: "☀️" };
  if ([1, 2, 3].includes(weathercode)) return { description: "구름 조금", icon: "🌤️" };
  if ([45, 48].includes(weathercode)) return { description: "안개", icon: "🌫️" };
  if ([51, 53, 55].includes(weathercode)) return { description: "이슬비", icon: "🌦️" };
  if ([61, 63, 65].includes(weathercode)) return { description: "비", icon: "🌧️" };
  if ([71, 73, 75].includes(weathercode)) return { description: "눈", icon: "🌨️" };
  if (weathercode === 95) return { description: "천둥번개", icon: "⛈️" };
  return { description: "흐림", icon: "☁️" };
}

export function getTravelTip(description: string, temperature: number): string {
  if (description === "맑음") {
    return temperature >= 20
      ? "야외 산책과 해변 여행하기 좋은 날씨예요."
      : "맑은 날씨에 가벼운 겉옷을 챙겨보세요.";
  }
  if (description === "구름 조금") {
    return "선선한 바람과 함께 여유로운 여행을 즐겨보세요.";
  }
  if (description === "안개") {
    return "시야가 흐릴 수 있어 이동 시간을 넉넉히 잡아보세요.";
  }
  if (description === "이슬비" || description === "비") {
    return "우산을 챙기고 실내 코스와 카페를 함께 즐겨보세요.";
  }
  if (description === "눈") {
    return "미끄러운 길에 주의하며 따뜻하게 입고 다녀요.";
  }
  if (description === "천둥번개") {
    return "실내 관광지 위주로 일정을 조정하는 것을 추천해요.";
  }
  return "날씨 변화에 맞춰 유연하게 코스를 즐겨보세요.";
}

function getCityCoordinates(city: string) {
  const normalized = city.trim();
  return CITY_COORDINATES[normalized] ?? CITY_COORDINATES["강릉"];
}

export async function fetchWeatherByCity(city: string): Promise<WeatherFetchResult> {
  const normalized = city.trim() || "강릉";
  const { latitude, longitude } = getCityCoordinates(normalized);

  const url = new URL(OPEN_METEO_BASE);
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("current_weather", "true");
  url.searchParams.set("timezone", "Asia/Seoul");

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Weather API error: ${response.status}`);

    const data = (await response.json()) as OpenMeteoResponse;
    const current = data.current_weather;
    if (!current) throw new Error("Missing current weather data");

    const temperature = Math.round(current.temperature);
    const { description, icon } = mapWeatherCode(current.weathercode);

    return {
      weather: {
        city: normalized,
        icon,
        temperature,
        description,
        travelTip: getTravelTip(description, temperature),
      },
      isFallback: false,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "날씨 정보를 불러오지 못했습니다.";
    console.error("Failed to fetch weather:", message);
    return {
      weather: getMockWeatherByCity(normalized),
      isFallback: true,
      error: message,
    };
  }
}
