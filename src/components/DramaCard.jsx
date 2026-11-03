import React from "react";
import { Play, Eye, Star, Heart, Bookmark, Flame } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function DramaCard({ drama, onSelect }) {
  const { myList, toggleFavorite, toggleSaved } = useApp();

  const isFav = myList.favorites.includes(drama.id);
  const isSaved = myList.saved.includes(drama.id);

  return (
    <div
      onClick={() => onSelect(drama)}
      className="group relative cursor-pointer glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-950/20 flex flex-col justify-between"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[9/13] w-full overflow-hidden bg-slate-900">
        <img
          src={drama.poster}
          alt={drama.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e17] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {drama.badge && (
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md">
              {drama.badge}
            </span>
          )}
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/60 text-slate-300 backdrop-blur-sm border border-white/10 w-fit">
            {drama.genre}
          </span>
        </div>

        {/* Top Right Quick Actions */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 flex flex-col gap-1.5 z-10 opacity-90 group-hover:opacity-100 transition-opacity"
        >
          <button
            onClick={() => toggleFavorite(drama.id)}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
              isFav ? "bg-pink-600 text-white" : "bg-black/50 text-slate-300 hover:text-pink-400"
            }`}
            title="Favorite"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Center Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 text-white flex items-center justify-center shadow-glow-pink transform group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-white ml-1" />
          </div>
        </div>

        {/* Bottom View & Episodes info overlay */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-slate-300 z-10">
          <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
            <Eye className="w-3 h-3 text-pink-400" />
            <span>{drama.views}</span>
          </div>

          <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm text-amber-300">
            <Star className="w-3 h-3 fill-amber-300" />
            <span>{drama.rating}</span>
          </div>
        </div>
      </div>

      {/* Drama Details */}
      <div className="p-3">
        <h3 className="text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-pink-400 transition-colors">
          {drama.title}
        </h3>

        <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
          <span>{drama.totalEpisodes} Episodes</span>
          <span className="text-emerald-400 font-medium">Ep 1-10 Free</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {drama.tags?.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
