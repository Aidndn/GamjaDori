import type { GangwonCity } from "@/types/gangwon";
import { CityMarker } from "./CityMarker";

type GangwonMapIllustrationProps = {
  cities: GangwonCity[];
  selectedId: string;
  onSelect: (city: GangwonCity) => void;
};

export function GangwonMapIllustration({
  cities,
  selectedId,
  onSelect,
}: GangwonMapIllustrationProps) {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-b from-[#E0F2FE] via-[#F0FDF4] to-[#DCFCE7] shadow-[0_8px_32px_rgba(59,130,246,0.12)] ring-1 ring-[#E0F2FE]">
      <svg
        viewBox="0 0 360 400"
        className="h-[360px] w-full"
        aria-label="강원도 지도 일러스트"
        role="img"
      >
        <defs>
          <linearGradient id="land" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="50%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="sea" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="mountain" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#15803D" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="360" height="400" fill="url(#sea)" opacity="0.35" />
        <path
          d="M40 60 L120 40 L200 55 L280 35 L320 80 L300 160 L310 240 L280 320 L200 360 L120 340 L60 280 L30 200 L20 120 Z"
          fill="url(#land)"
          opacity="0.85"
        />
        <path
          d="M80 120 L160 90 L240 110 L200 200 L140 240 L80 200 Z"
          fill="url(#mountain)"
        />
        <path
          d="M140 80 L200 60 L260 100 L240 180 L180 200 L120 160 Z"
          fill="#16A34A"
          opacity="0.15"
        />
        <ellipse cx="300" cy="200" rx="50" ry="120" fill="#3B82F6" opacity="0.12" />
        <text x="290" y="210" fill="#3B82F6" fontSize="11" opacity="0.5" fontWeight="600">
          동해
        </text>
        <text x="100" y="180" fill="#15803D" fontSize="10" opacity="0.4" fontWeight="600">
          태백산맥
        </text>
      </svg>

      <div className="absolute inset-0">
        {cities.map((city) => (
          <CityMarker
            key={city.id}
            name={city.name}
            x={city.marker.x}
            y={city.marker.y}
            active={city.id === selectedId}
            onClick={() => onSelect(city)}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-4 flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-[#64748B] backdrop-blur-sm ring-1 ring-white/60">
        <span>🥔</span>
        <span>지역을 탭하세요</span>
      </div>
    </div>
  );
}
