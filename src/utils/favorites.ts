import type { TouristAttraction } from "@/types/attraction";
import type { FavoriteAttraction } from "@/types/favorite";

import { gangwonCities } from "@/data/gangwonCities";

export function getCityIdByName(cityName: string): string | undefined {
  return gangwonCities.find((city) => city.name === cityName)?.id;
}

export function buildAttractionHref(id: string, city?: string): string {
  const cityId = city ? getCityIdByName(city) : undefined;
  if (/^\d+$/.test(id) && cityId) {
    return `/attraction/${id}?city=${cityId}`;
  }
  return `/attraction/${id}`;
}

export function getFavoriteId(attraction: Pick<TouristAttraction, "id" | "contentId">): string {
  return attraction.contentId ?? attraction.id;
}

export function toFavoriteAttraction(attraction: TouristAttraction): FavoriteAttraction {
  return {
    id: getFavoriteId(attraction),
    contentId: attraction.contentId,
    name: attraction.name,
    city: attraction.city,
    address: attraction.address,
    category: attraction.category,
    image: attraction.image,
    description: attraction.description,
    addedAt: Date.now(),
  };
}

export function truncateDescription(text: string, maxLength = 80): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}
