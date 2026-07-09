type IconButtonProps = {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "glass" | "solid";
};

export function IconButton({
  label,
  onClick,
  children,
  variant = "glass",
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
        variant === "glass"
          ? "bg-white/90 text-[#0F172A] shadow-lg backdrop-blur-md ring-1 ring-white/50 hover:bg-white"
          : "bg-[#F8FAFC] text-[#64748B] ring-1 ring-[#E2E8F0] hover:bg-[#EFF6FF] hover:text-[#3B82F6]"
      }`}
    >
      {children}
    </button>
  );
}
