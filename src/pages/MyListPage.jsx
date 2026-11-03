import React, { useState } from "react";
import {
  Bookmark,
  Heart,
  History as HistoryIcon,
  Bell,
  Users,
  Play,
  Trash2,
  Tv
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function MyListPage({ onSelectDrama }) {
  const {
    myList,
    dramas,
    comingSoon,
    toggleFavorite,
    toggleSaved,
    toggleFollowing,
    toggleReminder,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState("favorites"); // "favorites" | "history" | "reminders" | "following" | "saved"

  const tabs = [
    { id: "favorites", label: "Favorites", icon: Heart, count: myList.favorites.length },
    { id: "history", label: "History", icon: HistoryIcon, count: myList.history.length },
    { id: "reminders", label: "Reminder Set", icon: Bell, count: myList.reminders.length },
    { id: "following", label: "Following", icon: Users, count: myList.following.length },
    { id: "saved", label: "Saved", icon: Bookmark, count: myList.saved.length }
  ];

  return (
    <div className="min-h-screen pb-28 pt-4 px-4 lg:px-8 max-w-6xl mx-auto">
      
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          My List & Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Your saved short dramas, watch history, and upcoming premiere reminders
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-white/5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-pink-600 text-white shadow-glow-pink"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content based on Active Tab */}
      {/* 1. Favorites */}
      {activeTab === "favorites" && (
        <div>
          {myList.favorites.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <Heart className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">No favorite dramas yet.</p>
              <p className="text-xs mt-1">Tap the heart icon on any series to add it here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {myList.favorites.map((id) => {
                const drama = dramas.find((d) => d.id === id);
                if (!drama) return null;
                return (
                  <div
                    key={drama.id}
                    className="glass-card rounded-2xl overflow-hidden border border-white/5 relative group cursor-pointer"
                    onClick={() => onSelectDrama(drama)}
                  >
                    <div className="aspect-[9/13] w-full overflow-hidden bg-slate-900 relative">
                      <img src={drama.poster} alt={drama.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(drama.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-pink-600 text-white"
                        title="Remove from favorites"
                      >
                        <Heart className="w-3.5 h-3.5 fill-white" />
                      </button>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-glow-pink">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-bold text-white line-clamp-1">{drama.title}</h4>
                      <span className="text-[10px] text-slate-400">{drama.genre}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. History */}
      {activeTab === "history" && (
        <div className="space-y-3">
          {myList.history.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <HistoryIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">No watch history yet.</p>
              <p className="text-xs mt-1">Start watching short reels to resume here anytime.</p>
            </div>
          ) : (
            myList.history.map((item, idx) => {
              const drama = dramas.find((d) => d.id === item.dramaId);
              if (!drama) return null;

              return (
                <div
                  key={idx}
                  onClick={() => onSelectDrama(drama)}
                  className="glass-card rounded-2xl p-3.5 border border-white/5 hover:border-pink-500/30 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={drama.poster}
                      alt={drama.title}
                      className="w-14 h-20 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{drama.title}</h4>
                      <p className="text-xs text-pink-400 font-semibold mt-0.5">
                        Watched Episode {item.episodeNumber} / {drama.totalEpisodes}
                      </p>
                      <span className="text-[10px] text-slate-500">
                        {item.watchedAt ? new Date(item.watchedAt).toLocaleDateString() : "Recently"}
                      </span>
                    </div>
                  </div>

                  <button className="px-3.5 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-glow-pink">
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Resume</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 3. Reminder Set */}
      {activeTab === "reminders" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myList.reminders.length === 0 ? (
            <div className="col-span-full text-center py-20 text-slate-500">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">No premiere reminders set.</p>
              <p className="text-xs mt-1">Click the bell on any "Coming Soon" drama to receive launch alerts.</p>
            </div>
          ) : (
            myList.reminders.map((id) => {
              const item = comingSoon.find((c) => c.id === id);
              if (!item) return null;

              return (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-between"
                >
                  <div className="aspect-[16/9] w-full bg-slate-900 relative">
                    <img src={item.banner || item.poster} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-bold text-pink-400">
                      Release: {item.releaseDate}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.synopsis}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        🔔 Notification Active
                      </span>
                      <button
                        onClick={() => toggleReminder(item.id)}
                        className="text-xs text-slate-400 hover:text-rose-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 4. Following */}
      {activeTab === "following" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myList.following.length === 0 ? (
            <div className="col-span-full text-center py-20 text-slate-500">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">You aren't following any series yet.</p>
            </div>
          ) : (
            myList.following.map((id) => {
              const drama = dramas.find((d) => d.id === id);
              if (!drama) return null;

              return (
                <div
                  key={drama.id}
                  className="glass-card rounded-2xl p-4 border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img src={drama.poster} alt={drama.title} className="w-12 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{drama.title}</h4>
                      <p className="text-[10px] text-slate-400">{drama.totalEpisodes} Episodes</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFollowing(drama.id)}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-xs font-bold"
                  >
                    Unfollow
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 5. Saved */}
      {activeTab === "saved" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {myList.saved.length === 0 ? (
            <div className="col-span-full text-center py-20 text-slate-500">
              <Bookmark className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">No saved items.</p>
            </div>
          ) : (
            myList.saved.map((id) => {
              const drama = dramas.find((d) => d.id === id);
              if (!drama) return null;

              return (
                <div
                  key={drama.id}
                  onClick={() => onSelectDrama(drama)}
                  className="glass-card rounded-2xl overflow-hidden border border-white/5 relative group cursor-pointer"
                >
                  <div className="aspect-[9/13] w-full overflow-hidden bg-slate-900 relative">
                    <img src={drama.poster} alt={drama.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaved(drama.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-pink-600 text-white"
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-white" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{drama.title}</h4>
                    <span className="text-[10px] text-slate-400">{drama.genre}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
