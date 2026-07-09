export type WeatherInfo = {
  city: string;
  icon: string;
  temperature: number;
  description: string;
  travelTip: string;
};

export type WeatherFetchResult = {
  weather: WeatherInfo;
  isFallback: boolean;
  error?: string;
};

const WEATHER_BY_CITY: Record<string, WeatherInfo> = {
  강릉: {
    city: "강릉",
    icon: "☀️",
    temperature: 24,
    description: "맑음",
    travelTip: "해변 산책하기 좋은 날씨예요.",
  },
  춘천: {
    city: "춘천",
    icon: "🌤️",
    temperature: 23,
    description: "구름 조금",
    travelTip: "호수 산책과 카페 타임을 즐겨보세요.",
  },
  속초: {
    city: "속초",
    icon: "🌊",
    temperature: 22,
    description: "바닷바람",
    travelTip: "해안 드라이브와 신선한 해산물을 추천해요.",
  },
  원주: {
    city: "원주",
    icon: "☁️",
    temperature: 21,
    description: "흐림",
    travelTip: "실내 체험과 맛집 탐방에 좋은 날이에요.",
  },
  평창: {
    city: "평창",
    icon: "🌲",
    temperature: 19,
    description: "선선함",
    travelTip: "산책과 자연 힐링 코스를 즐겨보세요.",
  },
  정선: {
    city: "정선",
    icon: "🌥️",
    temperature: 20,
    description: "구름 많음",
    travelTip: "산간 마을과 레일바이크 체험을 추천해요.",
  },
  삼척: {
    city: "삼척",
    icon: "🌊",
    temperature: 23,
    description: "해안 날씨",
    travelTip: "동해 바다와 동굴 탐험하기 좋아요.",
  },
};

const DEFAULT_WEATHER = WEATHER_BY_CITY["강릉"];

export function getMockWeatherByCity(city: string): WeatherInfo {
  const normalized = city.trim();
  return WEATHER_BY_CITY[normalized] ?? { ...DEFAULT_WEATHER, city: normalized || "강릉" };
}

/** @deprecated Use fetchWeatherByCity from @/api/weatherApi */
export function getWeatherByCity(city: string): WeatherInfo {
  return getMockWeatherByCity(city);
}

export function resolveCourseCity(...cities: (string | undefined)[]): string {
  for (const city of cities) {
    if (city?.trim()) return city.trim();
  }
  return "강릉";
}
