import React, { useState } from "react";
import {
  Palette,
  Image,
  Sliders,
  Sparkles,
  Save,
  Plus,
  Trash2,
  Check,
  FileText,
  ShieldCheck,
  Mail,
  Phone,
  HelpCircle,
  Eye,
  SlidersHorizontal,
  Home,
  PlaySquare,
  BookmarkCheck,
  User,
  Info
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function VisualPageBuilder() {
  const {
    branding,
    setBranding,
    pageLayouts,
    setPageLayouts,
    privacyPolicy,
    setPrivacyPolicy,
    terms,
    setTerms,
    showToast
  } = useApp();

  // Local drafts for live editing
  const [brandingDraft, setBrandingDraft] = useState({ ...branding });
  const [layoutsDraft, setLayoutsDraft] = useState({ ...pageLayouts });
  const [activeTab, setActiveTab] = useState("branding"); // "branding" | "home" | "foryou" | "mylist" | "profile" | "custom_pages" | "privacy" | "terms"

  // Clauses modal state
  const [newClauseTitle, setNewClauseTitle] = useState("");
  const [newClauseContent, setNewClauseContent] = useState("");
  const [showAddClause, setShowAddClause] = useState(false);
  const [clauseType, setClauseType] = useState("privacy"); // 'privacy' | 'terms'

  // Handle Logo Upload (PNG, JPG, SVG)
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBrandingDraft((prev) => ({
          ...prev,
          logoUrl: event.target?.result
        }));
        showToast("New logo loaded into canvas preview! Click 'Save & Publish' to push live.", "info");
      };
      reader.readAsDataURL(file);
    }
  };

  // Add clause to Privacy or Terms
  const handleAddClause = (e) => {
    e.preventDefault();
    if (!newClauseTitle.trim() || !newClauseContent.trim()) return;

    const newClause = {
      id: `${clauseType}-${Date.now()}`,
      title: newClauseTitle,
      content: newClauseContent
    };

    if (clauseType === "privacy") {
      setPrivacyPolicy((prev) => [...prev, newClause]);
      showToast("New Privacy Policy clause added!", "success");
    } else {
      setTerms((prev) => [...prev, newClause]);
      showToast("New Terms & Conditions clause added!", "success");
    }

    setNewClauseTitle("");
    setNewClauseContent("");
    setShowAddClause(false);
  };

  const handleDeleteClause = (id, type) => {
    if (type === "privacy") {
      setPrivacyPolicy((prev) => prev.filter((c) => c.id !== id));
      showToast("Privacy clause deleted.", "info");
    } else {
      setTerms((prev) => prev.filter((c) => c.id !== id));
      showToast("Terms clause deleted.", "info");
    }
  };

  // Save & Publish to Live Site
  const handleSaveAndPublish = () => {
    setBranding({ ...brandingDraft });
    setPageLayouts({ ...layoutsDraft });
    showToast("🎉 Website Layout & Content Updated Live across all user devices!", "success");
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl glass-card border border-white/10">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-pink-500" />
            <span>🎨 "Pages Edit" Comprehensive Layout & Content Builder</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Modify Home, For You, My List, Profile, About Us, Contact Channels, and Legal Clauses visually with instant live publishing.
          </p>
        </div>

        <button
          onClick={handleSaveAndPublish}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white font-black text-xs sm:text-sm shadow-glow-pink hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save & Publish Live</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs for all pages */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-white/5">
        {[
          { id: "branding", label: "Branding & Logo", icon: Image },
          { id: "home", label: "1. Home Page", icon: Home },
          { id: "foryou", label: "2. For You Page", icon: PlaySquare },
          { id: "mylist", label: "3. My List Page", icon: BookmarkCheck },
          { id: "profile", label: "4. Profile Page", icon: User },
          { id: "custom_pages", label: "About Us & Contact Info", icon: Info },
          { id: "privacy", label: "Privacy Policy (+)", icon: ShieldCheck },
          { id: "terms", label: "Terms & Conditions (+)", icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-pink-600 text-white shadow-glow-pink"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Logo & Branding */}
      {activeTab === "branding" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-5">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-pink-400" />
              Header & Brand Customization
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Platform Name
              </label>
              <input
                type="text"
                value={brandingDraft.appName}
                onChange={(e) => setBrandingDraft({ ...brandingDraft, appName: e.target.value })}
                className="w-full bg-[#13141f] text-sm text-white px-3.5 py-2 rounded-xl border border-slate-700 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Upload New Logo (PNG, JPG, SVG)
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                onChange={handleLogoUpload}
                className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-pink-600 file:text-white hover:file:bg-pink-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Header Logo Height</span>
                <span className="text-pink-400 font-mono">{brandingDraft.logoHeight || 44}px</span>
              </div>
              <input
                type="range"
                min={28}
                max={72}
                value={brandingDraft.logoHeight || 44}
                onChange={(e) => setBrandingDraft({ ...brandingDraft, logoHeight: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div>
                <span className="text-xs font-bold text-white block">Neon Logo Glow Effect</span>
                <span className="text-[11px] text-slate-400">Add vibrant magenta backglow to the logo</span>
              </div>
              <input
                type="checkbox"
                checked={brandingDraft.logoGlow}
                onChange={(e) => setBrandingDraft({ ...brandingDraft, logoGlow: e.target.checked })}
                className="w-4 h-4 rounded text-pink-600"
              />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                Live Canvas Header Preview
              </h3>

              <div className="p-4 rounded-2xl bg-[#0b0c14] border border-white/10 shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-xl overflow-hidden flex items-center justify-center transition-all ${
                        brandingDraft.logoGlow ? "shadow-glow-pink" : ""
                      }`}
                      style={{ height: `${brandingDraft.logoHeight || 44}px` }}
                    >
                      <img
                        src={brandingDraft.logoUrl || "/logo.jpg"}
                        alt="Preview Logo"
                        className="h-full w-auto object-contain rounded-xl"
                      />
                    </div>
                    <span className="text-xl font-black bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent font-display">
                      {brandingDraft.appName || "Drama Hub"}
                    </span>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 font-bold">
                    VIP Member
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 pt-4">
              Click 'Save & Publish Live' above to commit branding changes.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Home Page Layout & Content */}
      {activeTab === "home" && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Home className="w-4 h-4 text-pink-400" />
            <span>Home Page Layout & Module Settings</span>
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Hero Featured Drama Carousel</span>
                <span className="text-[11px] text-slate-400">Display top featured trending series in full hero banner</span>
              </div>
              <input
                type="checkbox"
                checked={layoutsDraft.home?.heroEnabled}
                onChange={(e) =>
                  setLayoutsDraft({
                    ...layoutsDraft,
                    home: { ...layoutsDraft.home, heroEnabled: e.target.checked }
                  })
                }
                className="w-4 h-4 rounded text-pink-600"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Coming Soon Horizontal Scrolling Bar</span>
                <span className="text-[11px] text-slate-400">Show upcoming film teasers with reminder bell icon</span>
              </div>
              <input
                type="checkbox"
                checked={layoutsDraft.home?.comingSoonEnabled}
                onChange={(e) =>
                  setLayoutsDraft({
                    ...layoutsDraft,
                    home: { ...layoutsDraft.home, comingSoonEnabled: e.target.checked }
                  })
                }
                className="w-4 h-4 rounded text-pink-600"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Drama Catalog Tabs (Popular, New, Rankings, Anime)</span>
                <span className="text-[11px] text-slate-400">Show category filtering pills on home screen</span>
              </div>
              <input
                type="checkbox"
                checked={layoutsDraft.home?.categoriesEnabled}
                onChange={(e) =>
                  setLayoutsDraft({
                    ...layoutsDraft,
                    home: { ...layoutsDraft.home, categoriesEnabled: e.target.checked }
                  })
                }
                className="w-4 h-4 rounded text-pink-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: For You Page Settings */}
      {activeTab === "foryou" && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <PlaySquare className="w-4 h-4 text-pink-400" />
            <span>For You Reels Player & Navigation Settings</span>
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Long-Press 2X Playback Speed Gesture</span>
                <span className="text-[11px] text-slate-400">Allow users to hold down anywhere on canvas to speed up to 2x</span>
              </div>
              <input
                type="checkbox"
                checked={layoutsDraft.foryou?.enable2xGesture}
                onChange={(e) =>
                  setLayoutsDraft({
                    ...layoutsDraft,
                    foryou: { ...layoutsDraft.foryou, enable2xGesture: e.target.checked }
                  })
                }
                className="w-4 h-4 rounded text-pink-600"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">In-Player Quality Selector Menu</span>
                <span className="text-[11px] text-slate-400">Enable switching between 1080p, 720p, 480p and Auto</span>
              </div>
              <input
                type="checkbox"
                checked={layoutsDraft.foryou?.showQualitySelector}
                onChange={(e) =>
                  setLayoutsDraft({
                    ...layoutsDraft,
                    foryou: { ...layoutsDraft.foryou, showQualitySelector: e.target.checked }
                  })
                }
                className="w-4 h-4 rounded text-pink-600"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Dedicated Player Download Button</span>
                <span className="text-[11px] text-slate-400">Allows offline episode download for users</span>
              </div>
              <input
                type="checkbox"
                checked={layoutsDraft.foryou?.showDownloadButton}
                onChange={(e) =>
                  setLayoutsDraft({
                    ...layoutsDraft,
                    foryou: { ...layoutsDraft.foryou, showDownloadButton: e.target.checked }
                  })
                }
                className="w-4 h-4 rounded text-pink-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: My List Page Settings */}
      {activeTab === "mylist" && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-pink-400" />
            <span>My List Page Configuration</span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            All watch history, favorites, saved series, following, and reminder subscriptions are consolidated exclusively inside the My List Page.
          </p>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Quick Resume from Watch History</span>
              <span className="text-[11px] text-slate-400">Show one-click resume button on recently watched drama items</span>
            </div>
            <input
              type="checkbox"
              checked={layoutsDraft.mylist?.showQuickResume}
              onChange={(e) =>
                setLayoutsDraft({
                  ...layoutsDraft,
                  mylist: { ...layoutsDraft.mylist, showQuickResume: e.target.checked }
                })
              }
              className="w-4 h-4 rounded text-pink-600"
            />
          </div>
        </div>
      )}

      {/* TAB 5: Profile Page Settings */}
      {activeTab === "profile" && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-pink-400" />
            <span>Profile Page Configuration & Rewards</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Referral Invite Reward (Coins / Signup)
              </label>
              <input
                type="number"
                value={layoutsDraft.profile?.referralRewardAmount || 100}
                onChange={(e) =>
                  setLayoutsDraft({
                    ...layoutsDraft,
                    profile: { ...layoutsDraft.profile, referralRewardAmount: Number(e.target.value) }
                  })
                }
                className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Daily Check-In Reward (Coins / Day)
              </label>
              <input
                type="number"
                value={layoutsDraft.profile?.dailyRewardAmount || 50}
                onChange={(e) =>
                  setLayoutsDraft({
                    ...layoutsDraft,
                    profile: { ...layoutsDraft.profile, dailyRewardAmount: Number(e.target.value) }
                  })
                }
                className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: About Us & Contact Details */}
      {activeTab === "custom_pages" && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Info className="w-4 h-4 text-pink-400" />
            <span>About Us & Dynamic Support Channels</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Support Email Address
              </label>
              <input
                type="email"
                value={brandingDraft.supportEmail}
                onChange={(e) => setBrandingDraft({ ...brandingDraft, supportEmail: e.target.value })}
                className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Support Contact / WhatsApp Number
              </label>
              <input
                type="text"
                value={brandingDraft.supportPhone}
                onChange={(e) =>
                  setBrandingDraft({
                    ...brandingDraft,
                    supportPhone: e.target.value,
                    whatsappNumber: e.target.value
                  })
                }
                className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                About Us Body Text
              </label>
              <textarea
                rows={5}
                value={brandingDraft.aboutUsContent}
                onChange={(e) => setBrandingDraft({ ...brandingDraft, aboutUsContent: e.target.value })}
                className="w-full bg-[#13141f] text-sm text-white p-3 rounded-xl border border-slate-700 resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: Privacy Policy Clauses (Plus (+) Button) */}
      {activeTab === "privacy" && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Privacy Policy Clauses Editor</span>
              </h3>
              <p className="text-xs text-slate-400">
                Manage strict user data encryption, non-sharing, and SSL security clauses.
              </p>
            </div>

            <button
              onClick={() => {
                setClauseType("privacy");
                setShowAddClause(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-pink"
            >
              <Plus className="w-4 h-4" />
              <span>Add Clause (+)</span>
            </button>
          </div>

          <div className="space-y-3">
            {privacyPolicy.map((clause) => (
              <div
                key={clause.id}
                className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{clause.title}</h4>
                  <button
                    onClick={() => handleDeleteClause(clause.id, "privacy")}
                    className="p-1 rounded text-slate-500 hover:text-rose-400"
                    title="Delete Clause"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{clause.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: Terms & Conditions Clauses (Plus (+) Button) */}
      {activeTab === "terms" && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-pink-400" />
                <span>Terms & Conditions Clauses Editor</span>
              </h3>
              <p className="text-xs text-slate-400">
                Manage non-distribution of copyrighted content, subscription terms, and unlock rules.
              </p>
            </div>

            <button
              onClick={() => {
                setClauseType("terms");
                setShowAddClause(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-pink"
            >
              <Plus className="w-4 h-4" />
              <span>Add Clause (+)</span>
            </button>
          </div>

          <div className="space-y-3">
            {terms.map((clause) => (
              <div
                key={clause.id}
                className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{clause.title}</h4>
                  <button
                    onClick={() => handleDeleteClause(clause.id, "terms")}
                    className="p-1 rounded text-slate-500 hover:text-rose-400"
                    title="Delete Clause"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{clause.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Clause Modal */}
      {showAddClause && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg glass-card rounded-3xl border border-white/10 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-pink-500" />
              <span>Add Clause to {clauseType === "privacy" ? "Privacy Policy" : "Terms & Conditions"}</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Clause Title
              </label>
              <input
                type="text"
                required
                value={newClauseTitle}
                onChange={(e) => setNewClauseTitle(e.target.value)}
                placeholder="e.g. 7. Content Licensing & International Rights"
                className="w-full bg-[#13141f] text-sm text-white px-3.5 py-2.5 rounded-xl border border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Clause Content Details
              </label>
              <textarea
                rows={4}
                required
                value={newClauseContent}
                onChange={(e) => setNewClauseContent(e.target.value)}
                placeholder="Write the legal clause wording here..."
                className="w-full bg-[#13141f] text-sm text-white p-3 rounded-xl border border-slate-700 resize-none leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddClause(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddClause}
                className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold shadow-glow-pink"
              >
                Add Clause
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
