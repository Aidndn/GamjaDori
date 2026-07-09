type ErrorBannerProps = {
  title: string;
  description?: string;
};

export function ErrorBanner({ title, description }: ErrorBannerProps) {
  return (
    <div className="mx-5 mt-3 rounded-2xl bg-[#FEF2F2] px-4 py-3 ring-1 ring-[#FECACA]">
      <p className="flex items-center gap-2 text-[13px] font-semibold text-[#DC2626]">
        <span aria-hidden>⚠️</span>
        {title}
      </p>
      {description && (
        <p className="mt-1 text-[12px] leading-relaxed text-[#EF4444]">{description}</p>
      )}
    </div>
  );
}
