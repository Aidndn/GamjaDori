import type { TouristAttraction } from "@/types/attraction";
import { gangwonCities } from "@/data/gangwonCities";

export function createApiFallback(
  contentId: string,
  options?: { title?: string; cityId?: string },
): TouristAttraction {
  const cityMeta = options?.cityId
    ? gangwonCities.find((city) => city.id === options.cityId)
    : undefined;

  return {
    id: contentId,
    contentId,
    name: options?.title ?? "관광지",
    city: cityMeta?.name ?? "강원",
    cityId: cityMeta?.id ?? "gangneung",
    category: "관광지",
    rating: 4.5,
    image: "",
    address: "",
    phone: "",
    openingHours: "",
    description: "",
    nearbyIds: [],
  };
}
