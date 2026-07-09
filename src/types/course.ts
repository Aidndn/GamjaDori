export type TravelStyleId =
  | "nature"
  | "food"
  | "cafe"
  | "photo"
  | "family"
  | "couple"
  | "solo";

export type CourseItemCategory =
  | "morning"
  | "lunch"
  | "afternoon"
  | "cafe"
  | "dinner"
  | "sightseeing";

export type CourseScheduleItem = {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: string;
  category: CourseItemCategory;
  travelMinutes?: number;
  contentId?: string;
  image?: string;
};

export type SavedAttraction = {
  id: string;
  name: string;
  city: string;
  image?: string;
  category?: string;
  addedAt: number;
};

export type GeneratedCourse = {
  id: string;
  city: string;
  title: string;
  items: CourseScheduleItem[];
  createdAt: number;
  basedOn?: string;
  travelStyle?: TravelStyleId;
  variantIndex?: number;
};
