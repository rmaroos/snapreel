import React from "react";
import { Home, PlaySquare, Crown, BookmarkCheck, User } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function BottomNav({ currentTab, setCurrentTab }) {
  const { user } = useApp();

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "foryou", label: "For You", icon: PlaySquare, highlight: true },
    { id: "member", label: "Member", icon: Crown, isVipIcon: true },
    { id: "mylist", label: "My List", icon: BookmarkCheck },
    { id: "profile", label: "Profile", icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-white/10 px-2 py-2 safe-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 relative transition-all duration-200 ${
                isActive ? "text-pink-500 scale-105" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="relative">
                {item.highlight && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                  </span>
                )}
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? "stroke-[2.5px] filter drop-shadow-[0_0_8px_rgba(255,0,127,0.6)]" : "stroke-2"
                  } ${item.isVipIcon && user.isVip ? "text-amber-400" : ""}`}
                />
              </div>

              <span
                className={`text-[10px] font-semibold mt-1 tracking-tight ${
                  isActive ? "text-pink-400 font-bold" : "text-slate-400"
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <div className="absolute -bottom-1 w-5 h-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-glow-pink" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
