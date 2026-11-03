import React, { useState } from "react";
import {
  Search,
  Bell,
  Crown,
  User as UserIcon,
  Globe,
  ShieldCheck,
  Flame,
  X
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Header({ currentTab, setCurrentTab, openAdminLogin }) {
  const {
    branding,
    user,
    notifications,
    setActiveModal,
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    setIsAdminMode
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "si", name: "Sinhala", native: "සිංහල" },
    { code: "ta", name: "Tamil", native: "தமிழ்" }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 lg:px-8 py-3 transition-all duration-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <div
            onClick={() => setCurrentTab("home")}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div
              className={`relative rounded-xl overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 ${
                branding.logoGlow ? "shadow-glow-pink" : ""
              }`}
              style={{ height: `${branding.logoHeight || 44}px` }}
            >
              <img
                src={branding.logoUrl || "/logo.jpg"}
                alt={branding.appName || "Snap Reel"}
                className="h-full w-auto object-contain rounded-xl"
              />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tight font-display bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent">
                {branding.appName || "Snap Reel"}
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search billionaire, revenge, romance, anime dramas..."
              className="w-full bg-[#13141f] text-sm text-slate-100 placeholder-slate-500 pl-10 pr-9 py-2 rounded-full border border-slate-700/60 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-pink-500/30 transition-all"
                title="Select Subtitle & UI Language"
              >
                <Globe className="w-3.5 h-3.5 text-pink-400" />
                <span className="uppercase">{selectedLanguage}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-40 glass-card rounded-xl shadow-2xl p-1.5 z-50 border border-white/10 animate-in fade-in">
                  <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Language
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                        selectedLanguage === lang.code
                          ? "bg-pink-500/20 text-pink-400 font-bold"
                          : "text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[11px] text-slate-400">{lang.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-[#0a0a0f] animate-pulse" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-card rounded-2xl shadow-2xl p-4 z-50 border border-white/10 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-pink-500" />
                      <span className="text-sm font-bold text-white">Notifications</span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 font-semibold">
                      {notifications.length} alerts
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2 mt-3 no-scrollbar">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">No notifications yet.</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-left"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-snug">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* VIP Membership Pill */}
            {user.isVip ? (
              <div
                onClick={() => setCurrentTab("member")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-lg shadow-amber-950/20 cursor-pointer hover:scale-105 transition-transform"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                <span className="hidden sm:inline">VIP Active</span>
              </div>
            ) : (
              <button
                onClick={() => setActiveModal("vip")}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white text-xs font-bold shadow-glow-pink hover:scale-105 active:scale-95 transition-all"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Join VIP</span>
              </button>
            )}

            {/* User Profile / Login Button */}
            {user.isLoggedIn ? (
              <button
                onClick={() => setCurrentTab("profile")}
                className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-pink-500"
                />
                <span className="hidden lg:inline text-xs font-semibold text-slate-200">
                  {user.id}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setActiveModal("auth")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/40 transition-all"
              >
                <UserIcon className="w-3.5 h-3.5 text-pink-400" />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}

            {/* Authenticated Admin Portal Trigger - ONLY visible if strictly designated admin email */}
            {user.isLoggedIn && user.email?.toLowerCase() === "snapreel2008@gmail.com" && (
              <button
                onClick={() => setIsAdminMode(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black shadow-lg shadow-indigo-950/50 transition-all ml-1 animate-pulse"
                title="Open Admin Control Center"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">Admin Hub</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {searchOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dramas, billionaire romance, action..."
                className="w-full bg-[#13141f] text-sm text-slate-100 placeholder-slate-500 pl-10 pr-9 py-2 rounded-full border border-slate-700/60 focus:outline-none focus:border-pink-500"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Top Banner Announcement if active */}
      {branding.bannerActive && branding.bannerAnnouncement && (
        <div
          onClick={() => setActiveModal("vip")}
          className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white text-xs font-semibold py-1.5 px-4 text-center cursor-pointer hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
        >
          <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>{branding.bannerAnnouncement}</span>
        </div>
      )}
    </>
  );
}
