import type { CourseItemCategory, TravelStyleId } from "@/types/course";
import type { NormalizedTourPlace } from "@/types/tour";
import type { TouristAttraction } from "@/types/attraction";
import { getAttractionsByCityId } from "@/data/attractions";

/** Allowed TourAPI content types for recommendations */
export const ALLOWED_CONTENT_TYPES = new Set(["12", "14", "15", "38", "39"]);

const ACCOMMODATION_TYPE = "32";

const GANGWON_CITY_NAMES = [
  "춘천",
  "강릉",
  "속초",
  "원주",
  "평창",
  "정선",
  "삼척",
  "고성",
  "동해",
  "태백",
  "홍천",
  "횡성",
  "영월",
  "철원",
  "화천",
  "양양",
  "인제",
  "양구",
];

const EXCLUDED_KEYWORDS =
  /호텔|리조트|모텔|펜션|숙박|콘도|민박|게스트하우스|온천|찜질방|터미널|주유소|편의점|약국|병원|학교|대학|주차장|세차|렌터카|골프장|스키장(?!리프트)|연수원|훈련원/i;

const STYLE_PATTERNS: Record<TravelStyleId, RegExp> = {
  nature: /해변|바다|산|호수|공원|계곡|숲|섬|동굴|폭포|해변|숲길|트레킹|자연|국립공원|설악|치악|오대산/i,
  food: /맛집|식당|시장|음식|먹거리|닭갈비|회|국수|한우|곤드레|해산물|거리|식당|중앙시장|야시장/i,
  cafe: /카페|커피|브런치|로스터리|디저트|베이커리|빵|티룸/i,
  photo: /전망|일몰|야경|포토|해변|정|랜드마크|해변|노을|전망대|스카이워크|출렁다리/i,
  family: /박물관|테마|아쿠아|레고|체험|공원|가족|놀이|동물|양떼|한지|미술/i,
  couple: /해변|카페|전망|일몰|야경|로맨|데이트|정|호수|바다|노을/i,
  solo: /산책|서점|카페|골목|정|조용|힐링|독서|혼|찻집|문화/i,
};

const CATEGORY_TO_CONTENT_TYPE: Record<string, string> = {
  역사: "12",
  자연: "12",
  체험: "14",
  맛집: "39",
  카페: "39",
  액티비티: "12",
};

const SLOT_RULES: Record<
  CourseItemCategory,
  { contentTypes: string[]; keywords: RegExp }
> = {
  morning: {
    contentTypes: ["12", "14"],
    keywords: /관광|명소|해변|산|공원|유적|정|대|섬|동굴|박물관|문화|역사|케이블|출렁/i,
  },
  sightseeing: {
    contentTypes: ["12", "14"],
    keywords: /관광|명소|해변|산|전망|공원|유적|정|섬|동굴|스카이|워크|해변/i,
  },
  lunch: {
    contentTypes: ["39", "38"],
    keywords: /맛집|식당|시장|음식|먹거리|닭|회|국수|한우|순두부|곤드레|해산물|거리/i,
  },
  afternoon: {
    contentTypes: ["12", "14"],
    keywords: /관광|명소|해변|산|공원|체험|박물관|정|섬|동굴|숲|호수/i,
  },
  cafe: {
    contentTypes: ["39", "38"],
    keywords: /카페|커피|브런치|디저트|로스터리|베이커리|티/i,
  },
  dinner: {
    contentTypes: ["39", "38", "15"],
    keywords: /시장|야시장|야경|거리|해변|일몰|저녁|먹거리|해산물|중앙시장/i,
  },
};

export function normalizeCityKeyword(cityName: string): string {
  return cityName.replace(/(시|군)$/, "").trim();
}

export function isGangwonPlace(place: NormalizedTourPlace): boolean {
  const text = `${place.address} ${place.city}`;
  if (text.includes("강원")) return true;
  return GANGWON_CITY_NAMES.some((name) => text.includes(name));
}

export function isAwkwardPlace(place: NormalizedTourPlace): boolean {
  const text = `${place.title} ${place.description}`;
  if (place.title.length < 2) return true;
  if (EXCLUDED_KEYWORDS.test(text)) return true;
  if (place.contentTypeId === ACCOMMODATION_TYPE) return true;
  return false;
}

export function isAllowedContentType(
  contentTypeId: string,
  allowAccommodation = false,
): boolean {
  if (allowAccommodation && contentTypeId === ACCOMMODATION_TYPE) return true;
  return ALLOWED_CONTENT_TYPES.has(contentTypeId);
}

export function belongsToCity(place: NormalizedTourPlace, cityName: string): boolean {
  const target = normalizeCityKeyword(cityName);
  const fullTarget = cityName.trim();
  const address = place.address;
  const cityField = place.city;

  const matchesTarget =
    address.includes(fullTarget) ||
    address.includes(target) ||
    cityField.includes(fullTarget) ||
    cityField.includes(target);

  if (!matchesTarget) return false;

  for (const other of GANGWON_CITY_NAMES) {
    if (other === fullTarget || other.startsWith(target)) continue;
    const otherShort = normalizeCityKeyword(other);
    if (
      (address.includes(other) || cityField.includes(other)) &&
      !address.includes(fullTarget) &&
      !address.includes(target)
    ) {
      return false;
    }
    if (address.includes(otherShort) && !address.includes(target) && otherShort !== target) {
      return false;
    }
  }

  return true;
}

export function scorePlaceForStyle(
  place: NormalizedTourPlace,
  style: TravelStyleId,
): number {
  const text = `${place.title} ${place.category} ${place.description}`;
  let score = 0;

  if (STYLE_PATTERNS[style].test(text)) score += 3;
  if (place.image) score += 1;
  if (place.description && place.description.length > 30) score += 1;

  return score;
}

export function filterTourPlaces(
  places: NormalizedTourPlace[],
  cityName: string,
  options?: { allowAccommodation?: boolean; minCount?: number },
): NormalizedTourPlace[] {
  const filtered = places.filter(
    (place) =>
      isAllowedContentType(place.contentTypeId, options?.allowAccommodation) &&
      !isAwkwardPlace(place) &&
      belongsToCity(place, cityName),
  );

  const seen = new Set<string>();
  const unique: NormalizedTourPlace[] = [];
  for (const place of filtered) {
    const key = place.contentId || place.title;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(place);
  }

  return unique;
}

function normalizeTitle(value: string): string {
  return value.replace(/\s/g, "").toLowerCase();
}

export function matchesCuratedAttraction(title: string, curatedName: string): boolean {
  const normalizedTitle = normalizeTitle(title);
  const normalizedCurated = normalizeTitle(curatedName);
  return (
    normalizedTitle.includes(normalizedCurated) ||
    normalizedCurated.includes(normalizedTitle)
  );
}

export function hasCuratedOverlap(
  places: NormalizedTourPlace[],
  cityId: string,
): boolean {
  const curated = getAttractionsByCityId(cityId);
  if (curated.length === 0) return true;

  return curated.some((attraction) =>
    places.some((place) => matchesCuratedAttraction(place.title, attraction.name)),
  );
}

export function isQualityTourResults(
  places: NormalizedTourPlace[],
  cityName: string,
  cityId?: string,
  minCount = 3,
): boolean {
  const good = filterTourPlaces(places, cityName);
  if (good.length < minCount) return false;
  if (cityId && !hasCuratedOverlap(good, cityId)) return false;
  return true;
}

export function attractionToTourPlace(attraction: TouristAttraction): NormalizedTourPlace {
  return {
    contentId: attraction.id,
    contentTypeId: CATEGORY_TO_CONTENT_TYPE[attraction.category] ?? "12",
    title: attraction.name,
    city: attraction.city,
    category: attraction.category,
    address: attraction.address,
    phone: attraction.phone,
    openingHours: attraction.openingHours,
    description: attraction.description,
    image: attraction.image,
    mapX: attraction.mapX ?? "",
    mapY: attraction.mapY ?? "",
  };
}

export function getCuratedFallbackPlaces(
  cityId: string,
  cityName: string,
): NormalizedTourPlace[] {
  return getAttractionsByCityId(cityId).map(attractionToTourPlace);
}

export function resolveCityPlaces(
  tourResults: NormalizedTourPlace[],
  cityName: string,
  cityId?: string,
): { places: NormalizedTourPlace[]; source: "tourapi" | "fallback" } {
  const filtered = filterTourPlaces(tourResults, cityName);

  if (isQualityTourResults(filtered, cityName, cityId) || !cityId) {
    return { places: filtered, source: "tourapi" };
  }

  const fallback = getCuratedFallbackPlaces(cityId, cityName);
  return { places: fallback, source: "fallback" };
}

export function dedupePlaces(places: NormalizedTourPlace[]): NormalizedTourPlace[] {
  const seen = new Set<string>();
  return places.filter((place) => {
    const key = `${place.contentId}-${place.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function matchesSlot(place: NormalizedTourPlace, slot: CourseItemCategory): boolean {
  const rule = SLOT_RULES[slot];
  const text = `${place.title} ${place.category} ${place.description}`;

  if (rule.contentTypes.includes(place.contentTypeId) && rule.keywords.test(text)) {
    return true;
  }

  if (slot === "lunch" || slot === "dinner") {
    return (
      place.contentTypeId === "39" ||
      place.category === "맛집" ||
      /시장|식당|먹거리|음식/.test(text)
    );
  }

  if (slot === "cafe") {
    return (
      place.contentTypeId === "39" ||
      place.category === "카페" ||
      /카페|커피|디저트|브런치/.test(text)
    );
  }

  if (slot === "morning" || slot === "afternoon" || slot === "sightseeing") {
    return (
      ["12", "14"].includes(place.contentTypeId) &&
      !/식당|카페|시장|맛집/.test(place.title)
    ) || rule.keywords.test(text);
  }

  return rule.keywords.test(text);
}

const SLOT_GROUPS: Record<CourseItemCategory, "attraction" | "food" | "cafe" | "evening"> = {
  morning: "attraction",
  sightseeing: "attraction",
  afternoon: "attraction",
  lunch: "food",
  cafe: "cafe",
  dinner: "evening",
};

function placeMatchesGroup(
  place: NormalizedTourPlace,
  group: "attraction" | "food" | "cafe" | "evening",
): boolean {
  const text = `${place.title} ${place.category} ${place.description}`;
  switch (group) {
    case "attraction":
      return (
        ["12", "14"].includes(place.contentTypeId) &&
        !/식당|카페|맛집|시장/.test(place.title)
      ) || /관광|해변|산|공원|박물관|동굴|정|섬/.test(text);
    case "food":
      return (
        place.contentTypeId === "39" ||
        place.category === "맛집" ||
        /식당|시장|먹거리|음식|닭|회|국수/.test(text)
      );
    case "cafe":
      return (
        place.category === "카페" ||
        /카페|커피|디저트|브런치|로스터리/.test(text)
      );
    case "evening":
      return (
        /시장|야시장|야경|일몰|거리|해변/.test(text) ||
        place.contentTypeId === "38"
      );
    default:
      return true;
  }
}

function pickPlaceForSlot(
  pool: NormalizedTourPlace[],
  slot: CourseItemCategory,
  style: TravelStyleId,
  used: Set<string>,
): NormalizedTourPlace | undefined {
  const group = SLOT_GROUPS[slot];

  const candidates = pool
    .filter(
      (place) =>
        !used.has(place.title) &&
        placeMatchesGroup(place, group) &&
        matchesSlot(place, slot),
    )
    .map((place) => ({
      place,
      score: scorePlaceForStyle(place, style) + 3,
    }))
    .sort((a, b) => b.score - a.score);

  if (candidates.length > 0) return candidates[0].place;

  const groupFallback = pool
    .filter((place) => !used.has(place.title) && placeMatchesGroup(place, group))
    .map((place) => ({ place, score: scorePlaceForStyle(place, style) }))
    .sort((a, b) => b.score - a.score);

  return groupFallback[0]?.place;
}

const CATEGORY_ICONS: Record<string, string> = {
  역사: "🏛️",
  자연: "🌲",
  카페: "☕",
  체험: "🎨",
  맛집: "🍽️",
  액티비티: "🎢",
  관광지: "📍",
  문화시설: "🏛️",
  음식점: "🍽️",
  축제: "🎉",
  쇼핑: "🛍️",
};

export function iconForCategory(category?: string): string {
  if (!category) return "📍";
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (category.includes(key)) return icon;
  }
  return "📍";
}

export function buildCoursePlacePool(
  cityPlaces: NormalizedTourPlace[] | undefined,
  cityName: string,
  cityId: string | undefined,
  style: TravelStyleId,
  excludeName?: string,
): NormalizedTourPlace[] {
  const base = cityPlaces?.length
    ? filterTourPlaces(cityPlaces, cityName)
    : cityId
      ? getCuratedFallbackPlaces(cityId, cityName)
      : [];

  const styleSorted = [...base]
    .filter((p) => p.title !== excludeName)
    .sort((a, b) => scorePlaceForStyle(b, style) - scorePlaceForStyle(a, style));

  if (styleSorted.length >= 3) return styleSorted;

  const curated = cityId ? getCuratedFallbackPlaces(cityId, cityName) : [];
  return dedupePlaces([
    ...styleSorted,
    ...curated.filter((p) => p.title !== excludeName),
  ]);
}

export function assignPlacesToCourseSlots(
  slots: {
    category: CourseItemCategory;
    time: string;
    description: string;
    icon: string;
    fallbackTitle: string;
  }[],
  style: TravelStyleId,
  primary?: { name: string; city: string; category?: string; id: string; image?: string },
  cityPlaces?: NormalizedTourPlace[],
  cityId?: string,
): Array<{
  category: CourseItemCategory;
  time: string;
  title: string;
  description: string;
  icon: string;
  contentId?: string;
  image?: string;
}> {
  const cityName = primary?.city ?? cityPlaces?.[0]?.city ?? "강릉";
  const pool = buildCoursePlacePool(cityPlaces, cityName, cityId, style, primary?.name);
  const used = new Set<string>();

  return slots.map((slot, index) => {
    if (index === 0 && primary) {
      used.add(primary.name);
      return {
        ...slot,
        title: primary.name,
        description: `${primary.city} · ${primary.name}에서 시작하는 감자도리 AI 추천 코스`,
        icon: iconForCategory(primary.category),
        contentId: primary.id,
        image: primary.image,
      };
    }

    const place = pickPlaceForSlot(pool, slot.category, style, used);
    if (place) {
      used.add(place.title);
      return {
        ...slot,
        title: place.title,
        description: place.description || slot.description,
        icon: iconForCategory(place.category),
        contentId: place.contentId,
        image: place.image,
      };
    }

    return {
      ...slot,
      title: slot.fallbackTitle,
      description: slot.description,
    };
  });
}
