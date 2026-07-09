import Link from "next/link";
import { NavIcon } from "./NavIcon";

export type NavTab = "home" | "course" | "map" | "heart" | "user";

const navItems: { label: string; tab: NavTab; icon: string; href: string }[] = [
  { label: "홈", tab: "home", icon: "home", href: "/" },
  { label: "코스", tab: "course", icon: "course", href: "/course" },
  { label: "지도", tab: "map", icon: "map", href: "/map" },
  { label: "찜", tab: "heart", icon: "heart", href: "/favorites" },
  { label: "마이", tab: "user", icon: "user", href: "/mypage" },
];

type BottomNavigationProps = {
  activeTab: NavTab;
};

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t border-[#F1F5F9] bg-white/90 px-2 pb-7 pt-2.5 backdrop-blur-xl">
      <ul className="flex items-center justify-around">
        {navItems.map((item) => {
          const active = item.tab === activeTab;
          return (
            <li key={item.label}>
              <Link href={item.href} className="relative flex flex-col items-center gap-1 px-3 py-1">
                {active && (
                  <span className="absolute -top-1 h-1 w-5 rounded-full bg-[#3B82F6]" />
                )}
                <NavIcon type={item.icon} active={active} />
                <span
                  className={`text-[11px] font-semibold ${
                    active ? "text-[#3B82F6]" : "text-[#94A3B8]"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
