type SummaryItem = {
  label: string;
  count: number;
  emoji: string;
};

type MySummaryCardsProps = {
  items: SummaryItem[];
};

export function MySummaryCards({ items }: MySummaryCardsProps) {
  return (
    <section className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-[20px] bg-white p-4 text-center shadow-[0_4px_20px_rgba(59,130,246,0.08)] ring-1 ring-[#E0F2FE]"
        >
          <p className="text-2xl">{item.emoji}</p>
          <p className="mt-2 text-[20px] font-bold text-[#0F172A]">{item.count}</p>
          <p className="mt-1 text-[11px] font-semibold leading-tight text-[#64748B]">
            {item.label}
          </p>
        </div>
      ))}
    </section>
  );
}
