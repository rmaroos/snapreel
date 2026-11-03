import React from "react";
import { X, ShieldCheck, FileText, Lock, CheckCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function LegalDocModal({ isOpen, onClose, docType = "privacy" }) {
  const { privacyPolicy, terms } = useApp();

  if (!isOpen) return null;

  const isPrivacy = docType === "privacy";
  const title = isPrivacy ? "Privacy Policy & Data Security" : "Terms & Conditions of Service";
  const items = isPrivacy ? privacyPolicy : terms;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-2xl glass-card rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[85vh] overflow-y-auto no-scrollbar animate-in zoom-in-95">
        
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-600 flex items-center justify-center shadow-glow-pink">
            {isPrivacy ? (
              <ShieldCheck className="w-6 h-6 text-white" />
            ) : (
              <FileText className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {title}
            </h2>
            <p className="text-xs text-slate-400">
              Last updated: October 2026 • Snap Reel OTT Platform
            </p>
          </div>
        </div>

        {/* Clauses List */}
        <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/10 pt-4">
          {items.map((clause) => (
            <div
              key={clause.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-pink-500/20 transition-all"
            >
              <h3 className="font-bold text-white text-sm sm:text-base mb-1.5 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-pink-500 shrink-0" />
                <span>{clause.title}</span>
              </h3>
              <p className="text-slate-300 leading-relaxed pl-6">
                {clause.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            256-Bit SSL Encrypted Platform
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
