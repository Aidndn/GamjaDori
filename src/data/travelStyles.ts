import type { TravelStyleId } from "@/types/course";

export type TravelStyle = {
  id: TravelStyleId;
  emoji: string;
  label: string;
  description: string;
  highlights: string[];
};

export const TRAVEL_STYLES: TravelStyle[] = [
  {
    id: "nature",
    emoji: "🌲",
    label: "자연",
    description: "산과 바다, 공원을 즐기는 자연 여행",
    highlights: ["Mountain", "Beach", "Park", "Observatory"],
  },
  {
    id: "food",
    emoji: "🍜",
    label: "맛집",
    description: "맛집과 시장을 중심으로 하는 미식 여행",
    highlights: ["Famous restaurant", "Local market", "Dessert cafe"],
  },
  {
    id: "cafe",
    emoji: "☕",
    label: "카페",
    description: "감성 카페와 여유로운 휴식",
    highlights: ["Roastery", "Ocean view cafe", "Dessert"],
  },
  {
    id: "photo",
    emoji: "📷",
    label: "사진",
    description: "인생샷을 남기는 포토 스팟 투어",
    highlights: ["Sunset spot", "Ocean view", "Photo zone"],
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    label: "가족",
    description: "아이와 함께 즐기는 가족 여행",
    highlights: ["Museum", "Theme park", "Aquarium"],
  },
  {
    id: "couple",
    emoji: "❤️",
    label: "커플",
    description: "연인과 함께하는 로맨틱 여행",
    highlights: ["Romantic cafe", "Night view", "Beach walk"],
  },
  {
    id: "solo",
    emoji: "🎒",
    label: "혼자",
    description: "혼자만의 여유로운 감성 여행",
    highlights: ["Solo cafe", "Walking trail", "Bookstore"],
  },
];

export function getTravelStyle(id: TravelStyleId): TravelStyle {
  return TRAVEL_STYLES.find((s) => s.id === id) ?? TRAVEL_STYLES[0];
}
