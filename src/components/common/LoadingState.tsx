type LoadingStateProps = {
  message?: string;
  fullScreen?: boolean;
};

export function LoadingState({
  message = "불러오는 중...",
  fullScreen = false,
}: LoadingStateProps) {
  const content = (
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#3B82F6]" />
      <p className="text-[14px] font-medium text-[#64748B]">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] items-center justify-center bg-white px-5">
        {content}
      </div>
    );
  }

  return <div className="flex justify-center py-8">{content}</div>;
}
