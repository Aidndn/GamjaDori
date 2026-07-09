import { EmptyState } from "@/components/common/EmptyState";

export function FavoritesEmptyState() {
  return (
    <EmptyState
      emoji="💚"
      title="아직 저장한 여행지가 없어요."
      description="마음에 드는 여행지를 저장해보세요."
    />
  );
}
