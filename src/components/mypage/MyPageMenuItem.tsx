import Link from "next/link";
import { buttonSecondary, linkCard } from "@/lib/buttonStyles";

export type MyPageMenuItemData = {
  icon: string;
  title: string;
  description: string;
  href?: string;
};

type MyPageMenuItemProps = {
  item: MyPageMenuItemData;
};

export function MyPageMenuItem({ item }: MyPageMenuItemProps) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#F0FDF4] text-xl ring-1 ring-[#E0F2FE]">
        {item.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-bold text-[#0F172A]">{item.title}</p>
        <p className="mt-0.5 text-[12px] leading-relaxed text-[#64748B]">{item.description}</p>
      </div>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="2"
        aria-hidden
        className="shrink-0"
      >
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 rounded-[20px] bg-white px-4 py-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-[#F1F5F9] ${linkCard}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-[20px] bg-white px-4 py-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-[#F1F5F9]">
      {content}
    </div>
  );
}
