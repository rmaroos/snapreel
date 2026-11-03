import React, { useState } from "react";
import {
  Palette,
  Film,
  Settings,
  ArrowLeft,
  ShieldCheck,
  Lock,
  LogOut,
  Sparkles
} from "lucide-react";
import VisualPageBuilder from "./VisualPageBuilder";
import CreatorStudio from "./CreatorStudio";
import GeneralDashboard from "./GeneralDashboard";
import AdminReauthModal from "./AdminReauthModal";
import { useApp } from "../../context/AppContext";

export default function AdminPanel({ onExitAdmin }) {
  const { branding, showToast } = useApp();

  const [activeHub, setActiveHub] = useState("builder"); // "builder" | "studio" | "dashboard"
  const [reauthOpen, setReauthOpen] = useState(false);
  const [reauthCallback, setReauthCallback] = useState(null);
  const [reauthTitle, setReauthTitle] = useState("Admin Password Verification");

  const handleOpenReauth = (callback, title) => {
    setReauthCallback(() => callback);
    if (title) setReauthTitle(title);
    setReauthOpen(true);
  };

  const handleReauthSuccess = () => {
    if (reauthCallback) {
      reauthCallback();
      setReauthCallback(null);
    }
  };

  const hubs = [
    {
      id: "builder",
      label: '🎨 "Pages Edit" Layout Builder',
      subtitle: "Home, For You, My List, Profile, Legal & Branding",
      icon: Palette
    },
    {
      id: "studio",
      label: "🎬 Creator Studio & Releases",
      subtitle: "Coming Soon Teasers, Drag & Drop Uploads & Watermark Eraser",
      icon: Film
    },
    {
      id: "dashboard",
      label: "⚙️ General Admin Dashboard",
      subtitle: "Pricing, Public Discounts, Private Vouchers & Gateways",
      icon: Settings
    }
  ];

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 pb-20">
      
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0d0e17]/90 backdrop-blur-xl border-b border-white/10 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <img
              src={branding.logoUrl || "/logo.jpg"}
              alt="Snap Reel"
              className="w-9 h-9 rounded-xl object-contain shadow-glow-pink"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-white tracking-tight">
                  Snap Reel Central Admin
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  Master Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Authenticated as: snapreel2008@gmail.com
              </p>
            </div>
          </div>

          {/* Right Exit Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Snap Reel Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main 3 Hubs Selector Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {hubs.map((hub) => {
            const Icon = hub.icon;
            const isActive = activeHub === hub.id;

            return (
              <button
                key={hub.id}
                onClick={() => setActiveHub(hub.id)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-pink-950/60 via-purple-950/60 to-pink-950/60 border-pink-500 shadow-glow-pink scale-[1.01]"
                    : "glass-card border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <Icon className={`w-4 h-4 ${isActive ? "text-pink-400" : "text-slate-400"}`} />
                  <span className={`text-xs font-black ${isActive ? "text-white" : "text-slate-200"}`}>
                    {hub.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">{hub.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Hub Render */}
        <div className="animate-in fade-in">
          {activeHub === "builder" && <VisualPageBuilder />}
          {activeHub === "studio" && <CreatorStudio onOpenReauth={handleOpenReauth} />}
          {activeHub === "dashboard" && <GeneralDashboard onOpenReauth={handleOpenReauth} />}
        </div>
      </div>

      {/* Sensitive Reauth Modal */}
      <AdminReauthModal
        isOpen={reauthOpen}
        onClose={() => setReauthOpen(false)}
        onUnlocked={handleReauthSuccess}
        title={reauthTitle}
      />
    </div>
  );
}
