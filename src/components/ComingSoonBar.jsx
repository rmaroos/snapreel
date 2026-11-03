import React from "react";
import { Bell, BellRing, Calendar, Sparkles, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ComingSoonBar() {
  const { comingSoon, myList, toggleReminder } = useApp();

  if (!comingSoon || comingSoon.length === 0) return null;

  return (
    <div className="w-full py-4 border-b border-white/5">
      <div className="flex items-center justify-between mb-3 px-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            Coming Soon to Snap Reel
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
              Exclusive
            </span>
          </h2>
        </div>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          Scroll to explore <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Horizontal Scrolling Container */}
      <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar scroll-smooth">
        {comingSoon.map((item) => {
          const isReminded = myList.reminders.includes(item.id);

          return (
            <div
              key={item.id}
              className="flex-shrink-0 w-64 sm:w-72 glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/40 transition-all duration-300 group shadow-lg flex flex-col justify-between"
            >
              {/* Preview Image with Badges */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <img
                  src={item.banner || item.poster}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13141f] via-transparent to-black/40" />

                {/* Release Countdown / Date Tag */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-semibold text-pink-400 border border-pink-500/30">
                  <Calendar className="w-3 h-3 text-pink-400" />
                  <span>{item.releaseDate}</span>
                </div>

                {/* Genre */}
                <div className="absolute bottom-2 left-2.5">
                  <span className="text-[10px] font-medium text-slate-300 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-pink-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {item.synopsis}
                  </p>
                </div>

                {/* Reminder Action Bell */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.subscriberRemindersCount.toLocaleString()} waiting
                  </span>

                  <button
                    onClick={() => toggleReminder(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isReminded
                        ? "bg-pink-600 text-white shadow-glow-pink hover:bg-pink-700"
                        : "bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 hover:border-pink-500/40"
                    }`}
                  >
                    {isReminded ? (
                      <>
                        <BellRing className="w-3.5 h-3.5 text-white animate-bounce" />
                        <span>Reminded</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5 text-pink-400" />
                        <span>Remind Me</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
