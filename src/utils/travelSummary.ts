import type { CourseScheduleItem, TravelStyleId } from "@/types/course";
import { getTravelStyle } from "@/data/travelStyles";
import { calculateCourseCost } from "@/utils/courseCost";
import { calculateCourseDurationWithTravel } from "@/utils/travelTime";

export type TravelSummary = {
  city: string;
  travelStyleLabel: string;
  travelStyleEmoji: string;
  courseItemCount: number;
  estimatedCost: number;
  estimatedDuration: string;
  favoritesCount: number;
};

/** @deprecated Use calculateCourseDurationWithTravel from travelTime */
export function calculateCourseDuration(items: CourseScheduleItem[]): string {
  return calculateCourseDurationWithTravel(items);
}

type BuildTravelSummaryInput = {
  city: string;
  travelStyle: TravelStyleId;
  courseItems?: CourseScheduleItem[];
  favoritesCount: number;
};

export function buildTravelSummary({
  city,
  travelStyle,
  courseItems = [],
  favoritesCount,
}: BuildTravelSummaryInput): TravelSummary {
  const style = getTravelStyle(travelStyle);
  const cost = calculateCourseCost(courseItems);

  return {
    city,
    travelStyleLabel: style.label,
    travelStyleEmoji: style.emoji,
    courseItemCount: courseItems.length,
    estimatedCost: cost.total,
    estimatedDuration: calculateCourseDurationWithTravel(courseItems),
    favoritesCount,
  };
}
