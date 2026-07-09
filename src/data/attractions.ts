import type { TouristAttraction } from "@/types/attraction";

export const attractions: TouristAttraction[] = [
  {
    id: "gangneung-gyeongpodae",
    name: "경포대",
    city: "강릉",
    cityId: "gangneung",
    category: "역사",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b53579d5?w=800&auto=format&fit=crop&q=80",
    address: "강원 강릉시 저동 365",
    phone: "033-640-4414",
    openingHours: "09:00 - 18:00 (연중무휴)",
    description:
      "조선 시대 정자로, 경포호와 동해를 한눈에 내려다볼 수 있는 강릉의 대표 명소입니다. 연못과 소나무 숲이 어우러진 풍경이 아름답습니다.",
    nearbyIds: ["gangneung-anmok", "gangneung-ojukheon", "gangneung-coffee"],
  },
  {
    id: "gangneung-anmok",
    name: "안목해변",
    city: "강릉",
    cityId: "gangneung",
    category: "자연",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    address: "강원 강릉시 견소동",
    phone: "033-640-5114",
    openingHours: "24시간 개방",
    description:
      "커피거리와 해변이 이어진 강릉의 대표 해변입니다. 일몰 명소로 유명하며 카페와 해산물 맛집이 즐비합니다.",
    nearbyIds: ["gangneung-gyeongpodae", "gangneung-coffee", "gangneung-ojukheon"],
  },
  {
    id: "gangneung-ojukheon",
    name: "오죽헌",
    city: "강릉",
    cityId: "gangneung",
    category: "역사",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&auto=format&fit=crop&q=80",
    address: "강원 강릉시 남문길 24",
    phone: "033-640-5114",
    openingHours: "08:00 - 18:00",
    description:
      "신사임당과 이이가 태어난 곳으로, 강릉 문화유산의 상징입니다. 오죽과 연못이 어우러진 고즈넉한 정원이 매력적입니다.",
    nearbyIds: ["gangneung-gyeongpodae", "gangneung-anmok", "gangneung-coffee"],
  },
  {
    id: "gangneung-coffee",
    name: "강릉 커피거리",
    city: "강릉",
    cityId: "gangneung",
    category: "카페",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
    address: "강원 강릉시 견소동 안목해변 일대",
    phone: "033-640-5114",
    openingHours: "카페별 상이 (대체 09:00 - 22:00)",
    description:
      "안목해변을 따라 늘어선 카페 거리로, 바다를 바라보며 커피를 즐길 수 있는 강릉의 핫플레이스입니다.",
    nearbyIds: ["gangneung-anmok", "gangneung-gyeongpodae", "gangneung-ojukheon"],
  },
  {
    id: "chuncheon-nami",
    name: "남이섬",
    city: "춘천",
    cityId: "chuncheon",
    category: "자연",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    address: "강원 춘천시 남산면 남이섬길 1",
    phone: "031-580-8151",
    openingHours: "09:00 - 18:00",
    description:
      "소양호에 떠 있는 낭만적인 섬으로, 메타세쿼이아 길과 드라마 촬영지로 유명합니다. 사계절 내내 아름다운 풍경을 자랑합니다.",
    nearbyIds: ["chuncheon-skywalk", "chuncheon-legoland", "chuncheon-dalkgalbi"],
  },
  {
    id: "chuncheon-skywalk",
    name: "소양강 스카이워크",
    city: "춘천",
    cityId: "chuncheon",
    category: "체험",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    address: "강원 춘천시 신북읍 의암호반길 684",
    phone: "033-261-3650",
    openingHours: "10:00 - 18:00",
    description:
      "소양강 위를 걷는 유리 전망대로, 발아래 펼쳐지는 호수 풍경이 장관입니다. 짚라인과 함께 즐기면 더욱 스릴 넘칩니다.",
    nearbyIds: ["chuncheon-nami", "chuncheon-legoland", "chuncheon-dalkgalbi"],
  },
  {
    id: "chuncheon-legoland",
    name: "레고랜드",
    city: "춘천",
    cityId: "chuncheon",
    category: "체험",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80",
    address: "강원 춘천시 하슬라우길 128",
    phone: "1544-8800",
    openingHours: "10:00 - 18:00 (요일별 상이)",
    description:
      "국내 최대 레고 테마파크로, 가족 단위 여행객에게 인기가 높습니다. 미니랜드와 놀이기구를 함께 즐길 수 있습니다.",
    nearbyIds: ["chuncheon-nami", "chuncheon-skywalk", "chuncheon-dalkgalbi"],
  },
  {
    id: "chuncheon-dalkgalbi",
    name: "춘천 닭갈비거리",
    city: "춘천",
    cityId: "chuncheon",
    category: "맛집",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
    address: "강원 춘천시 신북읍 신샘밭로 763",
    phone: "033-261-5875",
    openingHours: "11:00 - 22:00",
    description:
      "춘천의 대표 먹거리 닭갈비를 맛볼 수 있는 거리입니다. 호수 전망과 함께하는 식사가 여행의 하이라이트가 됩니다.",
    nearbyIds: ["chuncheon-nami", "chuncheon-skywalk", "chuncheon-legoland"],
  },
  {
    id: "sokcho-seorak",
    name: "설악산",
    city: "속초",
    cityId: "sokcho",
    category: "자연",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    address: "강원 속초시 설악동",
    phone: "033-636-7700",
    openingHours: "일출 2시간 전 - 일몰",
    description:
      "한국 대표 국립공원으로, 사계절 다른 풍경이 매력적입니다. 울산바위와 비선대 등 기암괴석이 유명합니다.",
    nearbyIds: ["sokcho-market", "sokcho-yeonggeum", "sokcho-beach"],
  },
  {
    id: "sokcho-market",
    name: "속초중앙시장",
    city: "속초",
    cityId: "sokcho",
    category: "맛집",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=80",
    address: "강원 속초시 중앙로 147",
    phone: "033-631-4787",
    openingHours: "05:00 - 22:00",
    description:
      "동해안 최대 전통시장으로, 닭강정과 오징어순대, 회 센터 등 속초의 맛을 한곳에서 즐길 수 있습니다.",
    nearbyIds: ["sokcho-seorak", "sokcho-yeonggeum", "sokcho-beach"],
  },
  {
    id: "sokcho-yeonggeum",
    name: "영금정",
    city: "속초",
    cityId: "sokcho",
    category: "자연",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&auto=format&fit=crop&q=80",
    address: "강원 속초시 동명동",
    phone: "033-631-4787",
    openingHours: "24시간 개방",
    description:
      "바위 위에 세워진 정자로, 파도 치는 절경이 아름답습니다. 일출과 일몰 명소로 사진 촬영지로도 인기입니다.",
    nearbyIds: ["sokcho-seorak", "sokcho-market", "sokcho-beach"],
  },
  {
    id: "sokcho-beach",
    name: "속초해수욕장",
    city: "속초",
    cityId: "sokcho",
    category: "자연",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    address: "강원 속초시 조양동",
    phone: "033-631-4787",
    openingHours: "24시간 개방",
    description:
      "속초 시내와 가까운 해변으로, 여름철 해수욕과 산책에 인기가 많습니다. 설악산을 배경으로 한 전경이 장관입니다.",
    nearbyIds: ["sokcho-yeonggeum", "sokcho-market", "sokcho-seorak"],
  },
  {
    id: "wonju-sogeumsan",
    name: "원주 소금산 출렁다리",
    city: "원주",
    cityId: "wonju",
    category: "액티비티",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    address: "강원 원주시 소금산길 12",
    phone: "033-737-3500",
    openingHours: "09:00 - 18:00",
    description:
      "소금산 절벽 위를 걷는 국내 최장 출렁다리로, 짜릿한 스릴과 탁 트인 전망을 동시에 즐길 수 있습니다.",
    nearbyIds: ["wonju-chiak", "wonju-museum", "wonju-hanji"],
  },
  {
    id: "wonju-chiak",
    name: "치악산 케이블카",
    city: "원주",
    cityId: "wonju",
    category: "자연",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    address: "강원 원주시 소초면 학곡리",
    phone: "033-737-7300",
    openingHours: "09:00 - 17:00",
    description:
      "치악산 정상까지 올라가는 케이블카로, 사계절 단풍과 설경을 감상할 수 있습니다. 등산 초보자에게도 추천합니다.",
    nearbyIds: ["wonju-museum", "wonju-hanji", "wonju-martial"],
  },
  {
    id: "wonju-museum",
    name: "뮤지엄산",
    city: "원주",
    cityId: "wonju",
    category: "체험",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1564399579883-451a7d44ec08?w=800&auto=format&fit=crop&q=80",
    address: "강원 원주시 지정면 기업도시로 200",
    phone: "033-730-9000",
    openingHours: "10:00 - 18:00",
    description:
      "자연 속 야외 조각 공원으로, 현대 미술 작품과 산책로가 조화를 이룹니다. 가족 나들이에 적합합니다.",
    nearbyIds: ["wonju-chiak", "wonju-hanji", "wonju-martial"],
  },
  {
    id: "wonju-hanji",
    name: "한지테마파크",
    city: "원주",
    cityId: "wonju",
    category: "체험",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=80",
    address: "강원 원주시 판부면 한지공원길 102",
    phone: "033-737-3500",
    openingHours: "09:30 - 17:30",
    description:
      "전통 한지 제작 체험과 박물관을 함께 즐길 수 있는 문화 공간입니다. 아이들과 함께 방문하기 좋습니다.",
    nearbyIds: ["wonju-chiak", "wonju-museum", "wonju-martial"],
  },
  {
    id: "wonju-martial",
    name: "세계무술축제",
    city: "원주",
    cityId: "wonju",
    category: "체험",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&auto=format&fit=crop&q=80",
    address: "강원 원주시 무술공원길 77",
    phone: "033-737-3500",
    openingHours: "축제 기간별 상이",
    description:
      "세계 각국의 무술을 한자리에서 볼 수 있는 원주의 대표 문화 축제입니다. 매년 가을 개최됩니다.",
    nearbyIds: ["wonju-chiak", "wonju-museum", "wonju-hanji"],
  },
  {
    id: "pyeongchang-sheep",
    name: "대관령 양떼목장",
    city: "평창",
    cityId: "pyeongchang",
    category: "자연",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&auto=format&fit=crop&q=80",
    address: "강원 평창군 대관령면 꽃밭양지길 483-32",
    phone: "033-335-1966",
    openingHours: "09:00 - 17:00",
    description:
      "초원 위 양떼와 함께 사진을 남길 수 있는 평창의 대표 명소입니다. 가족 여행객에게 특히 인기가 높습니다.",
    nearbyIds: ["pyeongchang-woljeong", "pyeongchang-alpensia", "pyeongchang-herb"],
  },
  {
    id: "pyeongchang-woljeong",
    name: "월정사",
    city: "평창",
    cityId: "pyeongchang",
    category: "역사",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b53579d5?w=800&auto=format&fit=crop&q=80",
    address: "강원 평창군 진부면 오대산로 374-8",
    phone: "033-332-8057",
    openingHours: "06:00 - 18:00",
    description:
      "오대산에 자리한 천년 고찰로, 전나무 숲길이 유명합니다. 맑은 공기와 고요한 분위기를 느낄 수 있습니다.",
    nearbyIds: ["pyeongchang-sheep", "pyeongchang-alpensia", "pyeongchang-herb"],
  },
  {
    id: "pyeongchang-alpensia",
    name: "알펜시아",
    city: "평창",
    cityId: "pyeongchang",
    category: "액티비티",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&auto=format&fit=crop&q=80",
    address: "강원 평창군 대관령면 솔봉로 325",
    phone: "033-339-0000",
    openingHours: "10:00 - 17:00 (시즌별 상이)",
    description:
      "2018 평창 동계올림픽 개최지로, 스키와 골프, 워터파크를 사계절 즐길 수 있는 리조트입니다.",
    nearbyIds: ["pyeongchang-sheep", "pyeongchang-woljeong", "pyeongchang-herb"],
  },
  {
    id: "pyeongchang-herb",
    name: "허브나라",
    city: "평창",
    cityId: "pyeongchang",
    category: "체험",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1466692479826-ba5bcf577efe?w=800&auto=format&fit=crop&q=80",
    address: "강원 평창군 봉평면 허브나라길 185",
    phone: "033-335-2900",
    openingHours: "09:00 - 18:00",
    description:
      "다양한 허브 정원과 체험 프로그램을 즐길 수 있는 힐링 공간입니다. 향기로운 산책이 매력적입니다.",
    nearbyIds: ["pyeongchang-sheep", "pyeongchang-woljeong", "pyeongchang-alpensia"],
  },
  {
    id: "jeongseon-rail",
    name: "정선 레일바이크",
    city: "정선",
    cityId: "jeongseon",
    category: "액티비티",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1474487548417-781cbdaa8bc2?w=800&auto=format&fit=crop&q=80",
    address: "강원 정선군 고한읍 하이원길 261",
    phone: "033-562-7071",
    openingHours: "09:00 - 17:00",
    description:
      "폐선로를 달리는 레일바이크로, 계곡과 산 풍경을 가까이에서 즐길 수 있습니다. 커플과 가족에게 인기입니다.",
    nearbyIds: ["jeongseon-arirang", "jeongseon-cave", "jeongseon-byungbang"],
  },
  {
    id: "jeongseon-arirang",
    name: "정선 아리랑시장",
    city: "정선",
    cityId: "jeongseon",
    category: "맛집",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=80",
    address: "강원 정선군 정선읍 남정로 288",
    phone: "033-560-2511",
    openingHours: "09:00 - 21:00",
    description:
      "정선 아리랑과 함께하는 전통시장으로, 곤드레밥과 콧등치기 등 로컬 먹거리가 풍부합니다.",
    nearbyIds: ["jeongseon-rail", "jeongseon-cave", "jeongseon-byungbang"],
  },
  {
    id: "jeongseon-cave",
    name: "화암동굴",
    city: "정선",
    cityId: "jeongseon",
    category: "체험",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    address: "강원 정선군 화암동 화암동굴길 51",
    phone: "033-540-8300",
    openingHours: "09:00 - 17:00",
    description:
      "화강암 동굴 내부를 탐험할 수 있는 명소입니다. LED 조명과 동굴 카페가 특별한 경험을 선사합니다.",
    nearbyIds: ["jeongseon-rail", "jeongseon-arirang", "jeongseon-byungbang"],
  },
  {
    id: "jeongseon-byungbang",
    name: "병방치스카이워크",
    city: "정선",
    cityId: "jeongseon",
    category: "액티비티",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    address: "강원 정선군 사북읍 병방치1길 14",
    phone: "033-540-8300",
    openingHours: "10:00 - 17:00",
    description:
      "폐광 지역을 재생한 관광지로, 스카이워크와 모노레일을 통해 독특한 산업 관광을 체험할 수 있습니다.",
    nearbyIds: ["jeongseon-rail", "jeongseon-arirang", "jeongseon-cave"],
  },
  {
    id: "samcheok-jangho",
    name: "장호항",
    city: "삼척",
    cityId: "samcheok",
    category: "자연",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&auto=format&fit=crop&q=80",
    address: "강원 삼척시 장호항길",
    phone: "033-570-6114",
    openingHours: "24시간 개방",
    description:
      "동해의 푸른 바다와 기암괴석이 어우러진 삼척의 대표 항구입니다. 유람선과 해안 산책로가 인기입니다.",
    nearbyIds: ["samcheok-cave", "samcheok-maengbang", "samcheok-jukseori"],
  },
  {
    id: "samcheok-cave",
    name: "환선굴",
    city: "삼척",
    cityId: "samcheok",
    category: "자연",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    address: "강원 삼척시 신기면 환선굴로 50",
    phone: "033-541-8796",
    openingHours: "09:00 - 18:00",
    description:
      "대한민국 대표 천연 동굴로, 종유석과 석순이 만들어내는 신비로운 풍경이 압도적입니다.",
    nearbyIds: ["samcheok-jangho", "samcheok-maengbang", "samcheok-jukseori"],
  },
  {
    id: "samcheok-maengbang",
    name: "맹방해변",
    city: "삼척",
    cityId: "samcheok",
    category: "자연",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    address: "강원 삼척시 근덕면 맹방해변길",
    phone: "033-570-6114",
    openingHours: "24시간 개방",
    description:
      "모래사장이 넓고 수심이 얕아 가족 단위 해수욕에 인기입니다. 해돋이 명소로도 유명합니다.",
    nearbyIds: ["samcheok-cave", "samcheok-jukseori", "samcheok-beach"],
  },
  {
    id: "samcheok-jukseori",
    name: "죽서리랜드",
    city: "삼척",
    cityId: "samcheok",
    category: "체험",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&auto=format&fit=crop&q=80",
    address: "강원 삼척시 근덕면 죽서리길 109",
    phone: "033-570-6114",
    openingHours: "09:00 - 18:00",
    description:
      "대나무 숲과 정원이 어우러진 힐링 공간입니다. 산책로와 포토존이 잘 갖춰져 있습니다.",
    nearbyIds: ["samcheok-cave", "samcheok-maengbang", "samcheok-beach"],
  },
  {
    id: "samcheok-beach",
    name: "삼척해변",
    city: "삼척",
    cityId: "samcheok",
    category: "자연",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&auto=format&fit=crop&q=80",
    address: "강원 삼척시 남양동",
    phone: "033-570-6114",
    openingHours: "24시간 개방",
    description:
      "삼척 시내와 인접한 해변으로, 해안 산책과 일몰 감상에 좋습니다. 근처 해산물 식당이 많습니다.",
    nearbyIds: ["samcheok-cave", "samcheok-maengbang", "samcheok-jukseori"],
  },
];

const attractionMap = new Map(attractions.map((a) => [a.id, a]));

const cityFeaturedMap: Record<string, string> = {
  chuncheon: "chuncheon-nami",
  gangneung: "gangneung-gyeongpodae",
  sokcho: "sokcho-seorak",
  wonju: "wonju-sogeumsan",
  pyeongchang: "pyeongchang-sheep",
  jeongseon: "jeongseon-arirang",
  samcheok: "samcheok-jangho",
};

const cityAttractionNameMap: Record<string, Record<string, string>> = {
  gangneung: {
    경포대: "gangneung-gyeongpodae",
    안목해변: "gangneung-anmok",
    오죽헌: "gangneung-ojukheon",
  },
  chuncheon: {
    남이섬: "chuncheon-nami",
    "소양강 스카이워크": "chuncheon-skywalk",
    레고랜드: "chuncheon-legoland",
  },
  sokcho: {
    설악산: "sokcho-seorak",
    속초중앙시장: "sokcho-market",
    영금정: "sokcho-yeonggeum",
  },
  wonju: {
    "원주 소금산 출렁다리": "wonju-sogeumsan",
    "치악산 케이블카": "wonju-chiak",
    뮤지엄산: "wonju-museum",
    한지테마파크: "wonju-hanji",
  },
  pyeongchang: {
    "대관령 양떼목장": "pyeongchang-sheep",
    월정사: "pyeongchang-woljeong",
    알펜시아: "pyeongchang-alpensia",
  },
  jeongseon: {
    "정선 아리랑시장": "jeongseon-arirang",
    "정선 레일바이크": "jeongseon-rail",
    화암동굴: "jeongseon-cave",
  },
  samcheok: {
    장호항: "samcheok-jangho",
    환선굴: "samcheok-cave",
    맹방해변: "samcheok-maengbang",
    죽서리랜드: "samcheok-jukseori",
  },
};

export function getAttractionsByCityId(cityId: string): TouristAttraction[] {
  return attractions.filter((a) => a.cityId === cityId);
}

export function getAttractionNamesByCityId(cityId: string): string[] {
  return getAttractionsByCityId(cityId).map((a) => a.name);
}

export function getAttractionById(id: string): TouristAttraction | undefined {
  return attractionMap.get(id);
}

export function getFeaturedAttractionId(cityId: string): string {
  return cityFeaturedMap[cityId] ?? attractions[0].id;
}

export function getFeaturedAttraction(cityId: string): TouristAttraction | undefined {
  return getAttractionById(getFeaturedAttractionId(cityId));
}

export function getAttractionIdByName(cityId: string, name: string): string | undefined {
  return cityAttractionNameMap[cityId]?.[name];
}

export function getNearbyAttractions(attraction: TouristAttraction): TouristAttraction[] {
  return attraction.nearbyIds
    .map((id) => attractionMap.get(id))
    .filter((a): a is TouristAttraction => a !== undefined)
    .slice(0, 3);
}
