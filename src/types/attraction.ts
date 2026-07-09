export type TouristAttraction = {
  id: string;
  contentId?: string;
  name: string;
  city: string;
  cityId: string;
  category: string;
  rating: number;
  image: string;
  address: string;
  phone: string;
  openingHours: string;
  description: string;
  mapX?: string;
  mapY?: string;
  nearbyIds: string[];
};

export type NearbyAttraction = Pick<
  TouristAttraction,
  "id" | "name" | "city" | "category" | "image" | "rating"
>;
