import { MyPageMenuItem, type MyPageMenuItemData } from "./MyPageMenuItem";

type MyPageMenuListProps = {
  items: MyPageMenuItemData[];
};

export function MyPageMenuList({ items }: MyPageMenuListProps) {
  return (
    <section className="space-y-3">
      <h3 className="text-[15px] font-bold text-[#0F172A]">메뉴</h3>
      {items.map((item) => (
        <MyPageMenuItem key={item.title} item={item} />
      ))}
    </section>
  );
}
