"use client";

import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  duration?: number;
  onClose?: () => void;
};

export function Toast({ message, duration = 2500, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed left-1/2 top-20 z-50 w-[calc(100%-40px)] max-w-[390px] -translate-x-1/2 animate-[fadeIn_0.2s_ease-out]">
      <div className="rounded-2xl bg-[#0F172A]/90 px-4 py-3.5 text-center text-[14px] font-semibold text-white shadow-[0_8px_32px_rgba(15,23,42,0.25)] backdrop-blur-md">
        {message}
      </div>
    </div>
  );
}
