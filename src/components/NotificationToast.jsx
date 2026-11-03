import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function NotificationToast() {
  const { toast } = useApp();

  if (!toast.visible) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div className="fixed top-5 right-5 z-[9999] max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto px-4 sm:px-0">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-xl border ${
          isSuccess
            ? "bg-[#121a1f]/95 border-emerald-500/40 text-emerald-200 shadow-emerald-950/50"
            : isError
            ? "bg-[#201116]/95 border-rose-500/40 text-rose-200 shadow-rose-950/50"
            : "bg-[#151624]/95 border-fuchsia-500/40 text-fuchsia-200 shadow-fuchsia-950/50"
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-fuchsia-400" />}
        </div>
        <div className="flex-1 text-sm font-medium leading-relaxed">
          {toast.message}
        </div>
      </div>
    </div>
  );
}
