import type { TouristAttraction } from "@/types/attraction";

type InfoCardProps = {
  icon: string;
  label: string;
  value: string;
};

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="rounded-2xl bg-white px-4 py-4 shadow-[0_4px_20px_rgba(15,23,42,0.06)] ring-1 ring-[#F1F5F9]">
      <div className="flex gap-3">
        <span className="text-lg">{icon}</span>
        <div>
          <p className="text-[12px] font-semibold text-[#94A3B8]">{label}</p>
          <p className="mt-1 text-[14px] font-medium leading-relaxed text-[#334155]">{value}</p>
        </div>
      </div>
    </div>
  );
}

type AttractionInfoSectionProps = {
  attraction: TouristAttraction;
};

export function AttractionInfoSection({ attraction }: AttractionInfoSectionProps) {
  return (
    <section className="mt-5 space-y-3 px-5">
      <InfoCard icon="📍" label="주소" value={attraction.address} />
      <InfoCard icon="📞" label="전화번호" value={attraction.phone} />
      <InfoCard icon="🕐" label="운영시간" value={attraction.openingHours} />
      <div className="rounded-2xl bg-white px-4 py-4 shadow-[0_4px_20px_rgba(15,23,42,0.06)] ring-1 ring-[#F1F5F9]">
        <p className="text-[12px] font-semibold text-[#94A3B8]">소개</p>
        <p className="mt-2 text-[14px] leading-[1.75] text-[#64748B]">
          {attraction.description}
        </p>
      </div>
    </section>
  );
}
