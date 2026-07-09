import type { CourseItemCategory, CourseScheduleItem } from "@/types/course";

const BASE_LEG_MINUTES = 20;
const CATEGORY_TRAVEL: Partial<Record<CourseItemCategory, number>> = {
  morning: 15,
  sightseeing: 25,
  lunch: 10,
  afternoon: 20,
  cafe: 10,
  dinner: 15,
};

const DISTANT_KEYWORDS = /케이블카|레고랜드|설악|남이섬|동굴|출렁다리|레일바이크|양떼목장/i;

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function estimateLegMinutes(
  from: CourseScheduleItem,
  to: CourseScheduleItem,
): number {
  let minutes = CATEGORY_TRAVEL[to.category] ?? BASE_LEG_MINUTES;

  if (DISTANT_KEYWORDS.test(from.title) || DISTANT_KEYWORDS.test(to.title)) {
    minutes += 15;
  }

  const timeGap = parseTimeToMinutes(to.time) - parseTimeToMinutes(from.time);
  if (timeGap > 0 && timeGap < minutes) {
    return Math.max(10, Math.round(timeGap * 0.4));
  }

  return minutes;
}

export function applyTravelTimes(items: CourseScheduleItem[]): CourseScheduleItem[] {
  return items.map((item, index) => {
    if (index === 0) return { ...item, travelMinutes: 0 };
    const leg = estimateLegMinutes(items[index - 1], item);
    return { ...item, travelMinutes: leg };
  });
}

export function calculateTotalTravelMinutes(items: CourseScheduleItem[]): number {
  return items.reduce((sum, item) => sum + (item.travelMinutes ?? 0), 0);
}

export function formatTravelMinutes(minutes: number): string {
  if (minutes <= 0) return "—";
  if (minutes < 60) return `약 ${minutes}분`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (rest === 0) return `약 ${hours}시간`;
  return `약 ${hours}시간 ${rest}분`;
}

export function calculateCourseDurationWithTravel(items: CourseScheduleItem[]): string {
  if (items.length === 0) return "—";
  if (items.length === 1) return "약 1시간";

  const start = parseTimeToMinutes(items[0].time);
  const end = parseTimeToMinutes(items[items.length - 1].time);
  const scheduleSpan = Math.max(60, end - start + 60);
  const travel = calculateTotalTravelMinutes(items);
  const total = scheduleSpan + travel;

  const hours = Math.floor(total / 60);
  const minutes = total % 60;

  if (minutes === 0) return `약 ${hours}시간 (이동 ${formatTravelMinutes(travel)})`;
  return `약 ${hours}시간 ${minutes}분 (이동 ${formatTravelMinutes(travel)})`;
}
