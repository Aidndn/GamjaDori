type EmptyStateProps = {
  emoji: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function EmptyState({ emoji, title, description, children }: EmptyStateProps) {
  return (
    <section className="rounded-[24px] bg-white px-6 py-12 text-center shadow-[0_4px_24px_rgba(59,130,246,0.08)] ring-1 ring-[#E0F2FE]">
      <p className="text-5xl">{emoji}</p>
      <p className="mt-4 text-[16px] font-bold text-[#0F172A]">{title}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[#64748B]">{description}</p>
      {children && <div className="mt-5">{children}</div>}
    </section>
  );
}
