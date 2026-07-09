import type { CourseScheduleItem } from "@/types/course";
import { calculateTotalTravelMinutes } from "@/utils/travelTime";

export const MEAL_COST = 12_000;
export const CAFE_COST = 7_000;
export const ADMISSION_COST = 15_000;
export const TRANSPORT_BASE = 1_500;
export const TRANSPORT_PER_KM = 800;

export type CourseCostBreakdown = {
  meals: number;
  cafe: number;
  admission: number;
  transportation: number;
  total: number;
};

const ADMISSION_KEYWORDS =
  /박물관|미술관|뮤지엄|아르떼|레고랜드|테마파크|아쿠아|수족관|케이블카|동굴|레일바이크|체험관|전망대|초록우산|허브|양떼|출렁다리|환선굴|월정사|오죽헌|경포대|남이섬/i;

const CAFE_KEYWORDS = /카페|커피|브런치|로스터리|디저트/i;

const MEAL_KEYWORDS =
  /맛집|식사|순두부|회|먹거리|중앙시장|식당|혼밥|외식|해산물|닭갈비|한우|곤드레|해물|야시장|저녁|점심|시장|거리/i;

const TRANSPORT_KEYWORDS = /케이블카|레일바이크|버스|택시|이동|역|항/i;

function isCafeItem(item: CourseScheduleItem): boolean {
  if (item.category === "cafe") return true;
  return CAFE_KEYWORDS.test(item.title) || CAFE_KEYWORDS.test(item.description);
}

function isMealItem(item: CourseScheduleItem): boolean {
  if (isCafeItem(item)) return false;
  if (item.category === "lunch" || item.category === "dinner") return true;
  return MEAL_KEYWORDS.test(item.title) || MEAL_KEYWORDS.test(item.description);
}

function isAdmissionItem(item: CourseScheduleItem): boolean {
  if (isMealItem(item) || isCafeItem(item)) return false;
  if (item.category === "morning" || item.category === "sightseeing" || item.category === "afternoon") {
    return ADMISSION_KEYWORDS.test(item.title) || ADMISSION_KEYWORDS.test(item.description);
  }
  return false;
}

function estimateTransportCost(items: CourseScheduleItem[]): number {
  if (items.length <= 1) return 0;

  let total = 0;
  for (let i = 1; i < items.length; i += 1) {
    const legMinutes = items[i].travelMinutes ?? 20;
    const distanceKm = Math.max(1, legMinutes / 4);
    total += TRANSPORT_BASE + Math.round(distanceKm * TRANSPORT_PER_KM);
  }

  if (items.some((item) => TRANSPORT_KEYWORDS.test(item.title))) {
    total += TRANSPORT_BASE * 2;
  }

  return total;
}

export function calculateCourseCost(items: CourseScheduleItem[]): CourseCostBreakdown {
  let mealCount = 0;
  let cafeCount = 0;
  let admissionCount = 0;

  for (const item of items) {
    if (isCafeItem(item)) {
      cafeCount += 1;
    } else if (isMealItem(item)) {
      mealCount += 1;
    } else if (isAdmissionItem(item)) {
      admissionCount += 1;
    }
  }

  const itemsWithTravel = items.every((item) => item.travelMinutes !== undefined)
    ? items
    : items.map((item, index) =>
        index === 0 ? { ...item, travelMinutes: 0 } : { ...item, travelMinutes: 20 },
      );

  const meals = mealCount * MEAL_COST;
  const cafe = cafeCount * CAFE_COST;
  const admission = admissionCount * ADMISSION_COST;
  const transportation = estimateTransportCost(itemsWithTravel);

  return {
    meals,
    cafe,
    admission,
    transportation,
    total: meals + cafe + admission + transportation,
  };
}

export function formatKrw(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}
