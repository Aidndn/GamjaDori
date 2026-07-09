type CityMarkerProps = {
  name: string;
  x: number;
  y: number;
  active: boolean;
  onClick: () => void;
};

export function CityMarker({ name, x, y, active, onClick }: CityMarkerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${name} 선택`}
      aria-pressed={active}
      className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-105"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span
        className={`flex flex-col items-center gap-1 transition-all duration-300 ${
          active ? "scale-110" : "scale-100"
        }`}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full shadow-lg ring-2 transition-all duration-300 ${
            active
              ? "bg-gradient-to-br from-[#3B82F6] to-[#22C55E] ring-white"
              : "bg-white ring-[#E2E8F0]"
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              active ? "bg-white" : "bg-[#3B82F6]"
            }`}
          />
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold shadow-sm transition-all duration-300 ${
            active
              ? "bg-[#0F172A] text-white"
              : "bg-white/95 text-[#334155] ring-1 ring-[#E2E8F0]"
          }`}
        >
          {name}
        </span>
      </span>
    </button>
  );
}
