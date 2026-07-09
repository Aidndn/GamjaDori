export type NormalizedTourPlace = {
  contentId: string;
  contentTypeId: string;
  title: string;
  city: string;
  category: string;
  address: string;
  phone: string;
  openingHours: string;
  description: string;
  image: string;
  mapX: string;
  mapY: string;
};

export type TourApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
