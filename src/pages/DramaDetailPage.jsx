import React from "react";
import {
  Play,
  Heart,
  Bookmark,
  Share2,
  Lock,
  Crown,
  Star,
  Eye,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Check
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function DramaDetailPage({ drama, onBack, onPlayEpisode }) {
  const { user, myList, toggleFavorite, toggleSaved, setActiveModal, isEpisodeUnlocked } = useApp();

  if (!drama) return null;

  const isFav = myList.favorites.includes(drama.id);
  const isSaved = myList.saved.includes(drama.id);

  return (
    <div className="min-h-screen pb-28 pt-4 px-4 lg:px-8 max-w-5xl mx-auto">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Hero Showcase Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden shadow-2xl mb-8">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center md:items-start">
          
          {/* Poster */}
          <div className="w-44 sm:w-52 aspect-[9/13] rounded-2xl overflow-hidden shadow-2xl shrink-0 ring-1 ring-white/10 relative">
            <img src={drama.poster} alt={drama.title} className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-pink-600 text-[10px] font-black uppercase text-white shadow-md">
              {drama.badge || "Featured"}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold text-pink-400 bg-pink-500/20 px-2.5 py-0.5 rounded-full">
                {drama.genre}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full">
                Episodes 1-10 Free
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display">
              {drama.title}
            </h1>

            <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1 text-amber-300">
                <Star className="w-4 h-4 fill-amber-300" />
                <span className="font-bold">{drama.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-pink-400" />
                <span>{drama.views} views</span>
              </div>
              <div>
                <span>{drama.totalEpisodes} Total Episodes</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {drama.description}
            </p>

            {/* Cast */}
            {drama.cast && (
              <div className="text-xs text-slate-400 pt-1">
                <strong className="text-white">Cast: </strong> {drama.cast.join(" • ")}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
              <button
                onClick={() => onPlayEpisode(1)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white font-black text-sm shadow-glow-pink hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Watching Episode 1</span>
              </button>

              <button
                onClick={() => toggleFavorite(drama.id)}
                className={`p-3 rounded-2xl border transition-all ${
                  isFav
                    ? "bg-pink-600 text-white border-pink-500 shadow-glow-pink"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/10"
                }`}
                title="Favorite"
              >
                <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
              </button>

              <button
                onClick={() => toggleSaved(drama.id)}
                className={`p-3 rounded-2xl border transition-all ${
                  isSaved
                    ? "bg-pink-600 text-white border-pink-500 shadow-glow-pink"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/10"
                }`}
                title="Save to list"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Episode list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-white">Episodes ({drama.totalEpisodes})</h3>
            <span className="text-xs text-slate-400 font-normal">
              Episodes 1-10 Free • 15 Coins / VIP for Ep 11+
            </span>
          </div>

          {!user.isVip && (
            <button
              onClick={() => setActiveModal("vip")}
              className="text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5 hover:scale-105 transition-transform"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Unlock Ep 11+ with VIP</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {drama.episodes?.map((ep) => {
            const isUnlocked = isEpisodeUnlocked(drama.id, ep.episodeNumber);
            const isLocked = !isUnlocked;

            return (
              <div
                key={ep.episodeNumber}
                onClick={() => onPlayEpisode(ep.episodeNumber)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  isLocked
                    ? "bg-white/[0.02] border-white/5 opacity-75 hover:opacity-100 hover:bg-white/5"
                    : "glass-card border-white/5 hover:border-pink-500/40 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isLocked
                        ? "bg-amber-500/20 text-amber-400"
                        : isUnlocked && ep.episodeNumber > 10
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-pink-600 text-white"
                    }`}
                  >
                    {isLocked ? (
                      <Lock className="w-4 h-4" />
                    ) : isUnlocked && ep.episodeNumber > 10 ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      ep.episodeNumber
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{ep.title}</h4>
                    <span className="text-[10px] text-slate-400">{ep.duration}</span>
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
