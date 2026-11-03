import React from "react";
import { X, Film, Sparkles, Globe, Heart } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function AboutUsModal({ isOpen, onClose }) {
  const { branding } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-xl glass-card rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[85vh] overflow-y-auto no-scrollbar animate-in zoom-in-95">
        
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-600/30 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={branding.logoUrl || "/logo.jpg"}
            alt={branding.appName || "Snap Reel"}
            className="w-12 h-12 rounded-xl object-contain shadow-glow-pink"
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {branding.aboutUsTitle || "About Snap Reel"}
            </h2>
            <p className="text-xs text-pink-400 font-semibold">
              The Next Evolution of Short-Drama Entertainment
            </p>
          </div>
        </div>

        {/* Body content */}
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed border-t border-white/10 pt-4">
          <p className="whitespace-pre-line font-medium text-slate-200">
            {branding.aboutUsContent}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
              <Film className="w-5 h-5 text-pink-500 mx-auto mb-1" />
              <div className="font-bold text-white text-xs">200+ Dramas</div>
              <div className="text-[10px] text-slate-400">Exclusive Original Reels</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
              <Globe className="w-5 h-5 text-rose-500 mx-auto mb-1" />
              <div className="font-bold text-white text-xs">Sinhala & Tamil</div>
              <div className="text-[10px] text-slate-400">Localized AI Subtitles</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
              <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <div className="font-bold text-white text-xs">Fast & Mobile First</div>
              <div className="text-[10px] text-slate-400">Instant Streaming</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>Version 2.4.0 • Snap Reel Global</span>
          <span className="flex items-center gap-1 text-pink-400">
            Crafted with <Heart className="w-3 h-3 fill-pink-500 text-pink-500" /> for Drama Fans
          </span>
        </div>
      </div>
    </div>
  );
}
