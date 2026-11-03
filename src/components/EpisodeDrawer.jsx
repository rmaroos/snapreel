import React from "react";
import { X, Lock, Play, Crown, Sparkles, Check, Coins } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function EpisodeDrawer({
  isOpen,
  onClose,
  drama,
  currentEpisode,
  onSelectEpisode
}) {
  const { user, setActiveModal, isEpisodeUnlocked } = useApp();

  if (!isOpen || !drama) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center animate-in fade-in">
      <div className="w-full max-w-lg max-h-[85vh] glass-card rounded-t-3xl sm:rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-6">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={drama.poster}
              alt={drama.title}
              className="w-10 h-14 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-sm font-bold text-white line-clamp-1">{drama.title}</h3>
              <p className="text-xs text-slate-400">
                {drama.totalEpisodes} Episodes • <span className="text-emerald-400">1-10 Free</span> • 15 Coins / VIP
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free / VIP / Coin Banner */}
        {!user.isVip && (
          <div className="bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-amber-500/20 px-4 py-2 border-b border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Ep 11+ Unlocked via 15 Coins or VIP Pass</span>
            </div>
            <button
              onClick={() => {
                onClose();
                setActiveModal("vip");
              }}
              className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-sm"
            >
              VIP Pass
            </button>
          </div>
        )}

        {/* Episodes Grid & List */}
        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-2 no-scrollbar">
          {drama.episodes?.map((ep) => {
            const isPlaying = ep.episodeNumber === currentEpisode;
            const isUnlocked = isEpisodeUnlocked(drama.id, ep.episodeNumber);
            const isLocked = !isUnlocked;

            return (
              <div
                key={ep.episodeNumber}
                onClick={() => {
                  onSelectEpisode(ep.episodeNumber);
                  onClose();
                }}
                className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                  isPlaying
                    ? "bg-pink-600/30 border border-pink-500/50 shadow-glow-pink"
                    : isLocked
                    ? "bg-white/[0.02] border border-white/5 opacity-75 hover:opacity-100 hover:bg-white/5"
                    : "bg-white/5 hover:bg-white/10 border border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isPlaying
                        ? "bg-pink-600 text-white shadow-glow-pink"
                        : isLocked
                        ? "bg-amber-500/20 text-amber-400"
                        : isUnlocked && ep.episodeNumber > 10
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {isPlaying ? (
                      <Play className="w-4 h-4 fill-white" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4" />
                    ) : isUnlocked && ep.episodeNumber > 10 ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      ep.episodeNumber
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {ep.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      {ep.duration} • {ep.views} views
                    </span>
                  </div>
                </div>

                <div>
                  {isLocked ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-400" /> 15 Coins / VIP
                    </span>
                  ) : ep.episodeNumber <= 10 ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      FREE
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" /> UNLOCKED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
