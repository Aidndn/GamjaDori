import type { NormalizedTourPlace } from "@/types/tour";
import {
  dedupePlaces,
  filterTourPlaces,
  isAwkwardPlace,
  isGangwonPlace,
} from "@/utils/tourRecommendations";

const TOUR_API_KEY =
  process.env.TOUR_API_SERVICE_KEY ??
  process.env.TOUR_API_KEY ??
  "c9b58d8e4861010b85ef2e455d791ea5ba900a2d0fb5f983def662c867541257";
const BASE_URL = "https://apis.data.go.kr/B551011/KorService2";
/** TourAPI areaCode for 강원특별자치도 */
const GANGWON_AREA_CODE = "32";

const CONTENT_TYPE_LABELS: Record<string, string> = {
  "12": "관광지",
  "14": "문화시설",
  "15": "축제",
  "25": "여행코스",
  "28": "레포츠",
  "32": "숙박",
  "38": "쇼핑",
  "39": "음식점",
};

type TourApiItem = Record<string, string>;

type TourApiBody = {
  items?: {
    item?: TourApiItem | TourApiItem[];
  };
};

type TourApiJson = {
  response?: {
    header?: {
      resultCode?: string;
      resultMsg?: string;
    };
    body?: TourApiBody;
  };
};

function extractItems(body?: TourApiBody): TourApiItem[] {
  const item = body?.items?.item;
  if (!item) return [];
  return Array.isArray(item) ? item : [item];
}

function getText(item: TourApiItem | undefined, key: string): string {
  if (!item) return "";
  const value = item[key];
  return typeof value === "string" ? value.trim() : "";
}

function extractCity(address: string): string {
  const match = address.match(/(강원[\s특별자치도]*\s*)?([가-힣]+(시|군))/);
  return match?.[2] ?? "";
}

function normalizeTourItem(item: TourApiItem, introItem?: TourApiItem): NormalizedTourPlace {
  const contentTypeId = getText(item, "contenttypeid");
  const address = getText(item, "addr1") || getText(item, "addr2");
  const usetime = getText(introItem, "usetime");
  const restdate = getText(introItem, "restdate");
  const openingHours = [usetime, restdate].filter(Boolean).join(" · ") || "운영시간 정보 없음";

  return {
    contentId: getText(item, "contentid"),
    contentTypeId,
    title: getText(item, "title"),
    city: extractCity(address),
    category: CONTENT_TYPE_LABELS[contentTypeId] ?? "관광지",
    address: address || "주소 정보 없음",
    phone: getText(item, "tel") || "전화번호 정보 없음",
    openingHours,
    description: getText(item, "overview") || "상세 설명이 제공되지 않았습니다.",
    image: getText(item, "firstimage") || getText(item, "firstimage2"),
    mapX: getText(item, "mapx"),
    mapY: getText(item, "mapy"),
  };
}

async function requestTourApi(path: string, params: Record<string, string>): Promise<TourApiJson> {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`TourAPI 요청 실패 (${response.status})`);
  }

  const data = (await response.json()) as TourApiJson;
  const resultCode = data.response?.header?.resultCode;

  if (resultCode !== "0000") {
    throw new Error(data.response?.header?.resultMsg ?? "TourAPI 응답 오류");
  }

  return data;
}

const KEYWORD_SEARCH_TYPES = ["12", "14", "15", "39", "38"] as const;

export async function searchPlacesByKeyword(
  keyword: string,
  numOfRows = "10",
): Promise<NormalizedTourPlace[]> {
  const searches = await Promise.all(
    KEYWORD_SEARCH_TYPES.map((type) =>
      searchTourByKeywordInGangwon(keyword, type, numOfRows).catch(() =>
        searchTourByKeyword(keyword, type, numOfRows).catch(
          () => [] as NormalizedTourPlace[],
        ),
      ),
    ),
  );

  return dedupePlaces(searches.flat()).filter(
    (place) => isGangwonPlace(place) && !isAwkwardPlace(place),
  );
}

export async function searchTourByKeyword(
  keyword: string,
  contentTypeId = "12",
  numOfRows = "10",
): Promise<NormalizedTourPlace[]> {
  const data = await requestTourApi("/searchKeyword2", {
    MobileOS: "ETC",
    MobileApp: "GamjaDori",
    serviceKey: TOUR_API_KEY,
    keyword,
    contentTypeId,
    numOfRows,
    pageNo: "1",
    arrange: "P",
    _type: "json",
  });

  return extractItems(data.response?.body).map((item) => normalizeTourItem(item));
}

const CITY_SEARCH_TYPES = ["12", "14", "15", "39", "38"] as const;

/** Keyword search scoped to Gangwon (areaCode 32) for cleaner city results */
async function searchTourByKeywordInGangwon(
  keyword: string,
  contentTypeId: string,
  numOfRows: string,
): Promise<NormalizedTourPlace[]> {
  const data = await requestTourApi("/searchKeyword2", {
    MobileOS: "ETC",
    MobileApp: "GamjaDori",
    serviceKey: TOUR_API_KEY,
    keyword,
    contentTypeId,
    areaCode: GANGWON_AREA_CODE,
    numOfRows,
    pageNo: "1",
    arrange: "P",
    _type: "json",
  });

  return extractItems(data.response?.body).map((item) => normalizeTourItem(item));
}

export async function searchTourByCity(
  cityName: string,
  numOfRows = "15",
): Promise<NormalizedTourPlace[]> {
  const searches = await Promise.all(
    CITY_SEARCH_TYPES.map((type) =>
      searchTourByKeywordInGangwon(cityName, type, numOfRows).catch(() =>
        searchTourByKeyword(cityName, type, numOfRows).catch(
          () => [] as NormalizedTourPlace[],
        ),
      ),
    ),
  );

  const merged = dedupePlaces(searches.flat());
  return filterTourPlaces(merged, cityName);
}

export async function getTourDetail(contentId: string): Promise<NormalizedTourPlace | null> {
  const data = await requestTourApi("/detailCommon2", {
    MobileOS: "ETC",
    MobileApp: "GamjaDori",
    serviceKey: TOUR_API_KEY,
    contentId,
    _type: "json",
  });

  const item = extractItems(data.response?.body)[0];
  if (!item) return null;

  const detail = normalizeTourItem(item);
  return detail;
}

export async function getTourIntro(
  contentId: string,
  contentTypeId: string,
): Promise<TourApiItem | null> {
  const data = await requestTourApi("/detailIntro2", {
    MobileOS: "ETC",
    MobileApp: "GamjaDori",
    serviceKey: TOUR_API_KEY,
    contentId,
    contentTypeId,
    _type: "json",
  });

  return extractItems(data.response?.body)[0] ?? null;
}

export async function getTourDetailWithIntro(contentId: string): Promise<NormalizedTourPlace | null> {
  const detail = await getTourDetail(contentId);
  if (!detail) return null;

  try {
    const intro = await getTourIntro(contentId, detail.contentTypeId);
    if (intro) {
      const detailItem: TourApiItem = {
        contentid: detail.contentId,
        contenttypeid: detail.contentTypeId,
        title: detail.title,
        addr1: detail.address,
        tel: detail.phone,
        overview: detail.description,
        firstimage: detail.image,
        mapx: detail.mapX,
        mapy: detail.mapY,
      };
      return normalizeTourItem(detailItem, intro);
    }
  } catch {
    return detail;
  }

  return detail;
}

export function mergeTourWithFallback(
  tour: Partial<NormalizedTourPlace>,
  fallback: {
    name: string;
    city: string;
    category: string;
    address: string;
    phone: string;
    openingHours: string;
    description: string;
    image: string;
    rating: number;
    nearbyIds: string[];
    cityId: string;
    id: string;
  },
  contentId: string,
) {
  const pick = (apiValue: string | undefined, mockValue: string, placeholders: string[] = []) => {
    if (!apiValue?.trim()) return mockValue;
    if (placeholders.includes(apiValue)) return mockValue;
    return apiValue;
  };

  const placeholders = [
    "주소 정보 없음",
    "전화번호 정보 없음",
    "상세 설명이 제공되지 않았습니다.",
    "운영시간 정보 없음",
  ];

  const apiImage = tour.image?.trim();
  const image = apiImage ? apiImage : fallback.image;
  const apiCity = tour.city?.trim() ?? "";
  const normalizedApiCity = apiCity.replace(/(시|군)$/, "").trim();
  const city =
    normalizedApiCity === fallback.city || apiCity.includes(fallback.city)
      ? fallback.city
      : pick(tour.city, fallback.city) || fallback.city;

  return {
    id: contentId,
    contentId,
    name: pick(tour.title, fallback.name),
    city,
    cityId: fallback.cityId,
    category: pick(tour.category, fallback.category),
    rating: fallback.rating,
    image,
    address: pick(tour.address, fallback.address, placeholders),
    phone: pick(tour.phone, fallback.phone, placeholders),
    openingHours: pick(tour.openingHours, fallback.openingHours, placeholders),
    description: pick(tour.description, fallback.description, placeholders),
    mapX: tour.mapX || "",
    mapY: tour.mapY || "",
    nearbyIds: fallback.nearbyIds,
  };
}
