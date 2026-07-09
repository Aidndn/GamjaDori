# 감자도리 (GamjaDori)

강원도 여행 추천 웹앱 — TourAPI 실시간 관광 정보, AI 하루 코스, 날씨 기반 추천.

**Live:** https://gamja-dori.vercel.app

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- TourAPI (한국관광공사 KorService2)
- Open-Meteo (날씨, API 키 불필요)

## Getting Started

```bash
npm install
cp .env.example .env.local
# .env.local 에 TOUR_API_SERVICE_KEY 설정
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `TOUR_API_SERVICE_KEY` | Recommended | data.go.kr TourAPI service key (server-only) |

Without the env var, a fallback key in code is used for local/dev. For production on Vercel, set `TOUR_API_SERVICE_KEY` in Project Settings → Environment Variables.

## Main routes

| Path | Description |
|------|-------------|
| `/` | Home — search, weather, popular courses |
| `/map` | Gangwon map + city recommendations |
| `/course` | AI day-course builder |
| `/attraction/[id]` | Tourist detail |
| `/favorites` | Saved places |
| `/mypage` | Profile & recent views |

## Deploy

Connected to Vercel with GitHub auto-deploy. Push to the main branch to publish.
