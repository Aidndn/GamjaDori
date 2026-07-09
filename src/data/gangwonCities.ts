import type { GangwonCity } from "@/types/gangwon";
import { getAttractionNamesByCityId } from "@/data/attractions";

const cityMeta: Omit<GangwonCity, "attractions">[] = [
  {
    id: "chuncheon",
    name: "춘천",
    description: "호수와 닭갈비, 낭만이 어우러진 도시",
    imageGradient: "from-[#3B82F6] to-[#60A5FA]",
    marker: { x: 22, y: 24 },
  },
  {
    id: "gangneung",
    name: "강릉",
    description: "동해 바다와 커피, 역사가 공존하는 해변 도시",
    imageGradient: "from-[#0EA5E9] to-[#22C55E]",
    marker: { x: 74, y: 30 },
  },
  {
    id: "sokcho",
    name: "속초",
    description: "설악산과 신선한 해산물이 유명한 동해 북부 관문",
    imageGradient: "from-[#2563EB] to-[#38BDF8]",
    marker: { x: 82, y: 14 },
  },
  {
    id: "wonju",
    name: "원주",
    description: "치악산과 문화예술이 살아있는 강원 중심 도시",
    imageGradient: "from-[#22C55E] to-[#4ADE80]",
    marker: { x: 40, y: 54 },
  },
  {
    id: "pyeongchang",
    name: "평창",
    description: "대관령의 청정 자연과 겨울 스포츠의 성지",
    imageGradient: "from-[#16A34A] to-[#86EFAC]",
    marker: { x: 44, y: 40 },
  },
  {
    id: "jeongseon",
    name: "정선",
    description: "아리랑과 레일바이크가 있는 산간 힐링 마을",
    imageGradient: "from-[#15803D] to-[#22C55E]",
    marker: { x: 56, y: 62 },
  },
  {
    id: "samcheok",
    name: "삼척",
    description: "동해안 동굴과 해변이 아름다운 해양 관광 도시",
    imageGradient: "from-[#0284C7] to-[#22C55E]",
    marker: { x: 78, y: 46 },
  },
];

function toCityAttractions(cityId: string): [string, string, string] {
  const names = getAttractionNamesByCityId(cityId);
  return [names[0] ?? "", names[1] ?? "", names[2] ?? ""];
}

export const gangwonCities: GangwonCity[] = cityMeta.map((city) => ({
  ...city,
  attractions: toCityAttractions(city.id),
}));

export const defaultCity = gangwonCities[1];
