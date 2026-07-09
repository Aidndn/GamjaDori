import type { WeatherInfo } from "@/utils/weather";

type WeatherCardProps = {
  weather: WeatherInfo;
  loading?: boolean;
  error?: string | null;
  isFallback?: boolean;
};

export function WeatherCard({
  weather,
  loading = false,
  error = null,
  isFallback = false,
}: WeatherCardProps) {
  return (
    <section className="rounded-[24px] bg-gradient-to-br from-[#F0F9FF] to-[#F0FDF4] p-5 ring-1 ring-[#E0F2FE]">
      <p className="text-[12px] font-semibold tracking-wide text-[#3B82F6]">TODAY&apos;S WEATHER</p>

      {loading ? (
        <p className="mt-4 py-6 text-center text-[14px] font-medium text-[#64748B]">
          날씨 정보를 불러오는 중...
        </p>
      ) : (
        <>
          {error && (
            <p className="mt-3 rounded-xl bg-[#FEF2F2] px-3 py-2 text-[12px] font-medium text-[#DC2626]">
              {error}
            </p>
          )}

          {!error && isFallback && (
            <p className="mt-3 rounded-xl bg-[#FFFBEB] px-3 py-2 text-[12px] font-medium text-[#B45309]">
              실시간 날씨를 불러오지 못해 예상 정보를 표시합니다.
            </p>
          )}

          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[20px] font-bold text-[#0F172A]">{weather.city}</h2>
              <p className="mt-2 flex items-center gap-2 text-[28px] font-bold leading-none text-[#0F172A]">
                <span aria-hidden>{weather.icon}</span>
                <span>{weather.temperature}°C</span>
              </p>
              <p className="mt-1.5 text-[14px] font-medium text-[#64748B]">{weather.description}</p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-4xl shadow-sm ring-1 ring-[#E0F2FE]">
              {weather.icon}
            </div>
          </div>

          <p className="mt-4 rounded-2xl bg-white/70 px-4 py-3 text-[13px] leading-relaxed text-[#334155] ring-1 ring-[#E0F2FE]">
            &ldquo;{weather.travelTip}&rdquo;
          </p>
        </>
      )}
    </section>
  );
}
