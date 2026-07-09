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

/** Preference used by AI course slot scoring */
export type WeatherPreference = "outdoor" | "indoor" | "mixed";

const INDOOR_WEATHER = new Set(["비", "이슬비", "천둥번개", "안개", "눈"]);

export function getWeatherPreference(
  description: string,
  temperature: number,
): WeatherPreference {
  if (INDOOR_WEATHER.has(description)) return "indoor";
  if (description === "맑음" && temperature >= 18) return "outdoor";
  if (temperature <= 5) return "indoor";
  if (temperature >= 30) return "indoor";
  return "mixed";
}

const OUTDOOR_PLACE =
  /해변|바다|산|호수|공원|계곡|숲|섬|폭포|트레킹|산책|전망|일몰|노을|스카이워크|출렁|해안|드라이브/i;
const INDOOR_PLACE =
  /박물관|미술관|전시|카페|커피|실내|체험관|아쿠아|시장|쇼핑|문화|한지|도서관|서점|온천(?!호텔)/i;

export function scorePlaceForWeather(
  title: string,
  category: string,
  description: string,
  contentTypeId: string,
  preference: WeatherPreference,
): number {
  if (preference === "mixed") return 0;

  const text = `${title} ${category} ${description}`;
  const isOutdoor = OUTDOOR_PLACE.test(text) || contentTypeId === "12";
  const isIndoor =
    INDOOR_PLACE.test(text) ||
    contentTypeId === "14" ||
    contentTypeId === "38" ||
    /카페|커피/.test(text);

  if (preference === "indoor") {
    if (isIndoor) return 3;
    if (isOutdoor && !isIndoor) return -2;
    return 0;
  }

  // outdoor
  if (isOutdoor) return 3;
  if (isIndoor && !OUTDOOR_PLACE.test(text)) return -1;
  return 0;
}
