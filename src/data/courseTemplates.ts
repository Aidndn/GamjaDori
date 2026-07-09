import type {
  CourseScheduleItem,
  GeneratedCourse,
  SavedAttraction,
  TravelStyleId,
} from "@/types/course";
import type { NormalizedTourPlace } from "@/types/tour";
import { getTravelStyle } from "@/data/travelStyles";
import { getStyleCourseTemplate } from "@/data/styleCourseTemplates";
import { assignPlacesToCourseSlots } from "@/utils/tourRecommendations";
import { applyTravelTimes } from "@/utils/travelTime";
import { gangwonCities } from "@/data/gangwonCities";
import type { WeatherInfo } from "@/utils/weather";

function newId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function resolveCityId(cityName: string): string | undefined {
  return gangwonCities.find((c) => c.name === cityName)?.id;
}

function shiftTime(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const nh = Math.floor(total / 60) % 24;
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

function applyVariant(
  items: CourseScheduleItem[],
  variantIndex: number,
): CourseScheduleItem[] {
  if (variantIndex === 0) return items;
  const offset = (variantIndex % 2) * 30;
  return items.map((item, index) => ({
    ...item,
    time: shiftTime(item.time, offset),
    description:
      variantIndex % 2 === 1 && index % 2 === 1
        ? `${item.description} · 다른 루트 추천`
        : item.description,
  }));
}

export function generateOneDayCourse(
  savedAttractions: SavedAttraction[],
  travelStyle: TravelStyleId = "nature",
  variantIndex = 0,
  cityPlaces?: NormalizedTourPlace[],
  weather?: WeatherInfo | null,
): GeneratedCourse {
  const primary = savedAttractions[0];
  const city = primary?.city ?? cityPlaces?.[0]?.city ?? "강릉";
  const cityId = resolveCityId(city);
  const styleInfo = getTravelStyle(travelStyle);
  const template = getStyleCourseTemplate(city, travelStyle);

  const assigned = assignPlacesToCourseSlots(
    template.map((item) => ({
      category: item.category,
      time: item.time,
      description: item.description,
      icon: item.icon,
      fallbackTitle: item.title,
    })),
    travelStyle,
    primary
      ? {
          name: primary.name,
          city: primary.city,
          category: primary.category,
          id: primary.id,
          image: primary.image,
        }
      : undefined,
    cityPlaces,
    cityId,
    weather,
  );

  const items = applyTravelTimes(
    applyVariant(
      assigned.map((item, index) => ({
        id: newId(),
        time: item.time,
        title: item.title,
        description: item.description,
        icon: item.icon,
        category: template[index].category,
        contentId: item.contentId,
        image: item.image,
      })),
      variantIndex,
    ),
  );

  return {
    id: newId(),
    city,
    title: `${city} ${styleInfo.label} 코스`,
    items,
    createdAt: Date.now(),
    basedOn: primary?.name,
    travelStyle,
    variantIndex,
  };
}

export function regenerateCourse(
  savedAttractions: SavedAttraction[],
  currentCourse?: GeneratedCourse,
  cityPlaces?: NormalizedTourPlace[],
  weather?: WeatherInfo | null,
): GeneratedCourse {
  const style = currentCourse?.travelStyle ?? "nature";
  const nextVariant = ((currentCourse?.variantIndex ?? 0) + 1) % 2;
  return generateOneDayCourse(
    savedAttractions,
    style,
    nextVariant,
    cityPlaces,
    weather,
  );
}
