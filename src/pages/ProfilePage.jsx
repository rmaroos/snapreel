import React, { useState } from "react";
import {
  User,
  Copy,
  Check,
  Crown,
  Coins,
  Gift,
  Share2,
  Globe,
  HelpCircle,
  Mail,
  Phone,
  Shield,
  FileText,
  Sparkles,
  LogOut,
  ChevronRight,
  Info,
  ShieldCheck,
  Zap,
  Tag
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ProfilePage({ setCurrentTab }) {
  const {
    user,
    branding,
    logout,
    claimDailyReward,
    setActiveModal,
    showToast,
    selectedLanguage,
    setSelectedLanguage
  } = useApp();

  const [copiedId, setCopiedId] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const referralUrl = `https://snapreel.com/ref/${user.id}`;

  const copyUserId = () => {
    navigator.clipboard.writeText(user.id);
    setCopiedId(true);
    showToast(`User ID copied: ${user.id}`, "info");
    setTimeout(() => setCopiedId(false), 2000);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedRef(true);
    showToast("Referral link copied! Share with friends to earn 100 coins per invite.", "success");
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const isCheckedInToday = user.lastCheckInDate === new Date().toDateString();

  return (
    <div className="min-h-screen pb-28 pt-4 px-4 lg:px-8 max-w-4xl mx-auto space-y-6">
      
      {/* Profile Header Card */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Avatar with VIP border */}
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className={`w-20 h-20 rounded-2xl object-cover ${
                user.isVip ? "ring-4 ring-amber-400 shadow-glow-pink" : "ring-2 ring-pink-500"
              }`}
            />
            {user.isVip && (
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md">
                <Crown className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-black text-white">{user.name}</h2>
              {user.isVip ? (
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-pink-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                  {user.vipPlan || "Monthly"} VIP
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-bold">
                  Free Tier
                </span>
              )}
            </div>

            {/* Auto-Generated Unique User ID with Copy */}
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-0.5">
              <span className="text-xs text-slate-400">Unique ID:</span>
              <button
                onClick={copyUserId}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono font-bold text-pink-400 border border-white/5 transition-colors"
                title="Click to copy User ID"
              >
                <span>{user.id}</span>
                {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
              </button>
            </div>

            {/* Clean Stats count (Following removed per requirements) */}
            <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-300">
              <div>
                <strong className="text-white font-bold">{user.referralCount || 0}</strong> Friends Invited
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-600" />
              <div>
                <strong className="text-white font-bold">{user.episodesWatchedCount || 0}</strong> Episodes Watched
              </div>
            </div>
          </div>

          {/* Login or Signout Button */}
          <div>
            {user.isLoggedIn ? (
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-xs font-bold border border-white/5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveModal("auth")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold shadow-glow-pink"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In / Sign Up</span>
              </button>
            )}
          </div>
        </div>

        {/* Join Membership Banner if non-VIP */}
        {!user.isVip && (
          <div
            onClick={() => setCurrentTab("member")}
            className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white cursor-pointer hover:opacity-95 transition-all flex items-center justify-between shadow-glow-pink"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="text-sm font-black">Upgrade to VIP Membership</h4>
                <p className="text-xs text-pink-100">Unlock all Episode 11+ and enjoy public discounts</p>
              </div>
            </div>
            <button className="px-3.5 py-1.5 rounded-xl bg-white text-pink-600 text-xs font-black shadow-md shrink-0">
              View Plans
            </button>
          </div>
        )}
      </div>

      {/* Wallet, Coins & Daily Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Wallet & Coins Card */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  My Wallet Balance
                </span>
                <h3 className="text-2xl font-black text-amber-400">{user.coins} Coins</h3>
              </div>
            </div>
            <button
              onClick={() => setActiveModal("coins")}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/30 transition-all flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Buy Coins</span>
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Coins unlock bonus creator episodes and special series perks.
          </p>
        </div>

        {/* Daily Check-in & Rewards Card */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Daily Streak ({user.dailyCheckInStreak} Days)
                </span>
                <h3 className="text-sm font-black text-white">Free Daily Bonus Coins</h3>
              </div>
            </div>
            <button
              onClick={claimDailyReward}
              disabled={isCheckedInToday}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isCheckedInToday
                  ? "bg-emerald-500/20 text-emerald-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-glow-pink hover:scale-105"
              }`}
            >
              {isCheckedInToday ? "Claimed Today" : "Claim +50 Coins"}
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Check in every day to claim bonus coins and rewards.
          </p>
        </div>
      </div>

      {/* Referral System Card */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-pink-400" />
            <h3 className="text-sm font-bold text-white">Referral System (Earn Coins)</h3>
          </div>
          <span className="text-xs font-bold text-pink-400 bg-pink-500/20 px-2 py-0.5 rounded">
            +100 Coins / Friend
          </span>
        </div>
        <p className="text-xs text-slate-300 mb-3">
          Share your referral link with friends. When they sign up, both of you get 100 free coins instantly!
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={referralUrl}
            className="flex-1 bg-[#13141f] text-xs font-mono text-slate-300 px-3 py-2.5 rounded-xl border border-slate-700"
          />
          <button
            onClick={copyReferralLink}
            className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            {copiedRef ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedRef ? "Copied" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      {/* Cleaned Settings & Navigation List (Redundant History/Saved removed as requested!) */}
      <div className="glass-card rounded-2xl divide-y divide-white/5 border border-white/10 overflow-hidden">
        
        {/* Language Selector */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-sky-400" />
            <div>
              <h4 className="text-xs font-bold text-white">Platform Language</h4>
              <p className="text-[11px] text-slate-400">Sinhala (සිංහල), Tamil (தமிழ்), or English</p>
            </div>
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              showToast(`Language updated to ${e.target.value.toUpperCase()}`, "info");
            }}
            className="bg-[#13141f] text-xs font-bold text-white px-3 py-1.5 rounded-xl border border-slate-700"
          >
            <option value="en">English</option>
            <option value="si">සිංහල (Sinhala)</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>
        </div>

        {/* About Us dedicated modal link */}
        <div
          onClick={() => setActiveModal("about")}
          className="p-4 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-pink-400" />
            <div>
              <h4 className="text-xs font-bold text-white">About Snap Reel</h4>
              <p className="text-[11px] text-slate-400">Our mission, brand story & streaming tech</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* Dynamic Support & Contact Section (At the Bottom) */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-pink-400" />
            <h3 className="text-sm font-bold text-white">Help & Support Channels</h3>
          </div>
          <button
            onClick={() => setActiveModal("support")}
            className="text-xs font-bold text-pink-400 hover:text-pink-300"
          >
            Send Feedback Form →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Email */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
            <Mail className="w-4 h-4 text-pink-400" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Support Email</span>
              <a href={`mailto:${branding.supportEmail}`} className="text-xs font-bold text-white hover:underline">
                {branding.supportEmail || "support@snapreel.com"}
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
            <Phone className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">WhatsApp Support</span>
              <a
                href={`https://wa.me/${(branding.whatsappNumber || "94779284120").replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-white hover:underline"
              >
                {branding.supportPhone || "+94 77 928 4120"}
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links in Profile */}
        <div className="flex items-center justify-center gap-6 pt-3 border-t border-white/5 text-xs text-slate-400">
          <button
            onClick={() => setActiveModal("privacy")}
            className="hover:text-pink-400 underline transition-colors"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            onClick={() => setActiveModal("terms")}
            className="hover:text-pink-400 underline transition-colors"
          >
            Terms & Conditions
          </button>
        </div>
      </div>
    </div>
  );
}
