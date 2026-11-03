import React, { useState } from "react";
import {
  Flame,
  Sparkles,
  TrendingUp,
  Award,
  Grid,
  Film,
  Play,
  Heart,
  Search,
  ChevronRight
} from "lucide-react";
import ComingSoonBar from "../components/ComingSoonBar";
import DramaCard from "../components/DramaCard";
import { useApp } from "../context/AppContext";

export default function HomePage({ onSelectDrama }) {
  const { dramas, searchQuery } = useApp();

  const [activeCategory, setActiveCategory] = useState("Popular");

  const categories = [
    { id: "Popular", label: "🔥 Popular", icon: Flame },
    { id: "New", label: "✨ New Releases", icon: Sparkles },
    { id: "Rankings", label: "🏆 Rankings", icon: TrendingUp },
    { id: "Categories", label: "💎 Romance & Revenge", icon: Grid },
    { id: "Anime", label: "⚔️ Anime", icon: Film }
  ];

  // Filter dramas based on search query or category
  const filteredDramas = dramas.filter((d) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.genre.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (activeCategory === "Popular") return true;
    return d.category === activeCategory;
  });

  // Featured drama for hero banner
  const featured = dramas[0] || null;

  return (
    <div className="min-h-screen pb-24">
      
      {/* Hero Featured Showcase Banner */}
      {!searchQuery && featured && (
        <div className="relative w-full h-[65vh] sm:h-[72vh] max-h-[620px] overflow-hidden bg-black">
          <img
            src={featured.cover || featured.poster}
            alt={featured.title}
            className="w-full h-full object-cover object-top opacity-60 scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090e] via-[#08090e]/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090e] via-transparent to-transparent w-full sm:w-2/3" />

          {/* Featured Content Details */}
          <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 lg:px-8 z-10 flex flex-col justify-end">
            <div className="max-w-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-glow-pink">
                  #1 Trending Reel
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-white backdrop-blur-md">
                  {featured.genre}
                </span>
                <span className="text-emerald-400 text-xs font-bold">
                  Ep 1-10 100% Free
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none font-display">
                {featured.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                {featured.description}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectDrama(featured)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white font-extrabold text-sm shadow-glow-pink hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Free Now</span>
                </button>

                <button
                  onClick={() => onSelectDrama(featured)}
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/10 transition-colors"
                >
                  View Details & Episodes ({featured.totalEpisodes})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Horizontal Bar */}
      <ComingSoonBar />

      {/* Main Catalog Tabs & Drama Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6">
        
        {/* Navigation Tabs (Popular, New, Rankings, Categories, Anime) */}
        {!searchQuery && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-white/5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-glow-pink scale-105"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Section Heading */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {searchQuery ? `Search Results for "${searchQuery}"` : `${activeCategory} Dramas`}
            </h2>
            <span className="text-xs text-slate-400">
              ({filteredDramas.length} series)
            </span>
          </div>

          <span className="text-xs text-emerald-400 font-semibold hidden sm:inline">
            ✨ Free to watch Episodes 1 to 10
          </span>
        </div>

        {/* Drama Posters Grid */}
        {filteredDramas.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold">No short dramas match your search.</p>
            <p className="text-xs text-slate-500 mt-1">Try searching another genre or keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {filteredDramas.map((drama) => (
              <DramaCard
                key={drama.id}
                drama={drama}
                onSelect={onSelectDrama}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
