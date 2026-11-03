import React, { useState } from "react";
import {
  TrendingUp,
  Users,
  CreditCard,
  Eye,
  Crown,
  DollarSign,
  Tag,
  Clock,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Gift,
  Award,
  Sparkles,
  CheckCircle2,
  Coins,
  Key,
  ShieldCheck,
  Percent,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function GeneralDashboard({ onOpenReauth }) {
  const {
    membershipPlans,
    setMembershipPlans,
    coinPackages,
    setCoinPackages,
    publicDiscount,
    setPublicDiscount,
    vouchers,
    setVouchers,
    topViewers,
    setTopViewers,
    adminSettings,
    setAdminSettings,
    showToast
  } = useApp();

  // Active sub-tab
  const [subTab, setSubTab] = useState("overview"); // "overview" | "pricing" | "public_discount" | "vouchers" | "gateways_ai" | "top_viewers"

  // Sensitive Settings unlocked state (via Reauth lock)
  const [unlockedSecurity, setUnlockedSecurity] = useState(false);

  // New Private Voucher State
  const [newVoucherCode, setNewVoucherCode] = useState("");
  const [newDiscountPercent, setNewDiscountPercent] = useState(50);
  const [newVoucherLabel, setNewVoucherLabel] = useState("");

  // Dedicated API Keys State: Exactly Two Dedicated Input Boxes Only
  const [apiKeyDraft, setApiKeyDraft] = useState({
    paymentGatewayApiKey: adminSettings.paymentGatewayApiKey || "pk_live_snapreel_gateway_sec_99482103",
    aiProApiKey: adminSettings.aiProApiKey || "ai_pro_live_snapreel_engine_88492018_si_ta"
  });

  // Automatically save API keys to system database upon entry
  const handleApiKeyChange = (field, value) => {
    setApiKeyDraft((prev) => ({ ...prev, [field]: value }));
    setAdminSettings((prevSettings) => ({
      ...prevSettings,
      [field]: value
    }));
  };

  // Handle Add Private Voucher
  const handleAddVoucher = (e) => {
    e.preventDefault();
    if (!newVoucherCode.trim()) return;

    const voucher = {
      code: newVoucherCode.trim().toUpperCase(),
      discountPercent: Number(newDiscountPercent),
      validUntil: "2026-12-31",
      usesLeft: 500,
      label: newVoucherLabel || `${newDiscountPercent}% Private Voucher Key`
    };

    setVouchers((prev) => [voucher, ...prev]);
    setNewVoucherCode("");
    setNewVoucherLabel("");
    showToast(`Private voucher key "${voucher.code}" created and stored securely!`, "success");
  };

  const handleDeleteVoucher = (code) => {
    setVouchers((prev) => prev.filter((v) => v.code !== code));
    showToast(`Private voucher key "${code}" removed.`, "info");
  };

  // Membership Plan Price Update
  const handleUpdatePlanPrice = (id, newPrice) => {
    setMembershipPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: Number(newPrice) } : p))
    );
    showToast(`Updated ${id} plan price to $${newPrice}`, "info");
  };

  // Coin Package Price Update
  const handleUpdateCoinPackagePrice = (id, newPrice, newCoins) => {
    setCoinPackages((prev) =>
      prev.map((c) => (c.id === id ? { ...c, price: Number(newPrice), coins: Number(newCoins) } : c))
    );
    showToast(`Updated coin package details.`, "info");
  };

  // Explicit Save confirmation handler
  const handleSaveSecuritySettings = (e) => {
    if (e) e.preventDefault();
    setAdminSettings((prev) => ({
      ...prev,
      ...apiKeyDraft
    }));
    showToast("Payment Gateway & AI Pro Version API Keys securely saved in database!", "success");
  };

  // Top Viewer Reward Action
  const handleRewardViewer = (viewerId) => {
    setTopViewers((prev) =>
      prev.map((v) => (v.id === viewerId ? { ...v, rewardSent: true } : v))
    );
    showToast(`🎉 Reward of 500 Coins + 1-Month VIP sent to Viewer ID: ${viewerId}!`, "success");
  };

  return (
    <div className="space-y-6">
      
      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-white/5">
        {[
          { id: "overview", label: "Analytics Overview", icon: TrendingUp },
          { id: "pricing", label: "Memberships & Coin Pricing", icon: Crown },
          { id: "public_discount", label: "Public Discounts Module", icon: Percent },
          { id: "vouchers", label: "Private Voucher Keys (Secret)", icon: Tag },
          { id: "gateways_ai", label: "API Key Configurations (2 Fields)", icon: Key },
          { id: "top_viewers", label: "Weekly Top Viewers & Gifts", icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: Overview Analytics */}
      {subTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Active Users
                </span>
                <h3 className="text-2xl font-black text-white mt-1">128,420</h3>
                <span className="text-[11px] text-emerald-400 font-semibold mt-0.5 block">
                  ↑ +18.4% this month
                </span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  VIP Subscriptions
                </span>
                <h3 className="text-2xl font-black text-amber-400 mt-1">14,890</h3>
                <span className="text-[11px] text-amber-300 font-semibold mt-0.5 block">
                  Weekly, Monthly & Yearly
                </span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Crown className="w-6 h-6" />
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Drama Views
                </span>
                <h3 className="text-2xl font-black text-white mt-1">92.4 Million</h3>
                <span className="text-[11px] text-emerald-400 font-semibold mt-0.5 block">
                  Reels & Episodes
                </span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Gross Platform Revenue
                </span>
                <h3 className="text-2xl font-black text-emerald-400 mt-1">$142,850</h3>
                <span className="text-[11px] text-emerald-300 font-semibold mt-0.5 block">
                  SSL Gateways Verified
                </span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4">
              Monthly Subscription & Coin Revenue Growth
            </h3>
            <div className="h-44 w-full flex items-end gap-3 pt-6 border-b border-white/10 pb-2">
              {[
                { month: "May", height: "45%", val: "$22k" },
                { month: "Jun", height: "60%", val: "$34k" },
                { month: "Jul", height: "70%", val: "$48k" },
                { month: "Aug", height: "85%", val: "$62k" },
                { month: "Sep", height: "92%", val: "$98k" },
                { month: "Oct (Live)", height: "100%", val: "$142k", active: true }
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-mono font-bold text-pink-400">{bar.val}</span>
                  <div
                    style={{ height: bar.height }}
                    className={`w-full max-w-[48px] rounded-t-xl transition-all ${
                      bar.active
                        ? "bg-gradient-to-t from-pink-600 to-rose-500 shadow-glow-pink"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  />
                  <span className="text-[10px] text-slate-400 font-medium">{bar.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Memberships & Coin Pricing Manager */}
      {subTab === "pricing" && (
        <div className="space-y-6">
          {/* Membership Pricing Editor */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Crown className="w-4 h-4 text-pink-400" />
                <span>Dynamic Membership Fees Editor (Weekly, Monthly, Yearly)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Adjust public subscription pricing instantly across the platform.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {membershipPlans.map((plan) => (
                <div key={plan.id} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <span className="text-xs font-bold text-white block">{plan.name} ({plan.billingCycle})</span>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Fee ($ USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={plan.price}
                      onChange={(e) => handleUpdatePlanPrice(plan.id, e.target.value)}
                      className="w-full bg-[#13141f] text-sm font-mono font-bold text-pink-400 px-3 py-1.5 rounded-lg border border-slate-700 mt-1"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block">{plan.badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coin Buying System Pricing Editor */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Coin Buying System Packages Editor</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure coin quantities, bonus coins, and package prices available to users.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coinPackages.map((pack) => (
                <div key={pack.id} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400">{pack.tag}</span>
                    <span className="text-[10px] text-emerald-400 font-bold">+{pack.bonus} Bonus</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Coins</label>
                      <input
                        type="number"
                        value={pack.coins}
                        onChange={(e) => handleUpdateCoinPackagePrice(pack.id, pack.price, e.target.value)}
                        className="w-full bg-[#13141f] text-xs font-mono font-bold text-white px-2 py-1.5 rounded-lg border border-slate-700 mt-0.5"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={pack.price}
                        onChange={(e) => handleUpdateCoinPackagePrice(pack.id, e.target.value, pack.coins)}
                        className="w-full bg-[#13141f] text-xs font-mono font-bold text-pink-400 px-2 py-1.5 rounded-lg border border-slate-700 mt-0.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Episode Unlock Pricing: Default 15 Coins per Episode */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>Episode Unlock Pricing (15 Coins Default)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Episodes 1 to 10 are completely free. Users spend 15 Coins to permanently unlock Episode 11+.
                </p>
              </div>
              <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 self-start sm:self-auto">
                Default: 15 Coins / Video
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-white">Cost per Video / Episode Unlock</h4>
                <p className="text-[11px] text-slate-400">
                  Non-VIP viewers can spend 15 coins to permanently unlock any individual locked episode.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-mono font-black text-amber-400">15 Coins</span>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Fixed Default
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Public Discounts Module */}
      {subTab === "public_discount" && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Percent className="w-4 h-4 text-pink-400" />
                <span>Public Discounts Module</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Apply a sitewide discount available to ANY user. (Overridden automatically when a user applies a Private Voucher Key).
              </p>
            </div>

            <button
              onClick={() => {
                setPublicDiscount((prev) => ({ ...prev, enabled: !prev.enabled }));
                showToast(`Public Discount sitewide: ${!publicDiscount.enabled ? "ENABLED" : "DISABLED"}`, "info");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                publicDiscount.enabled
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950"
                  : "bg-white/10 text-slate-400"
              }`}
            >
              <span>{publicDiscount.enabled ? "Active Sitewide" : "Disabled"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Discount Percentage (%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={publicDiscount.value}
                onChange={(e) => setPublicDiscount({ ...publicDiscount, value: Number(e.target.value) })}
                className="w-full bg-[#13141f] text-sm font-mono font-bold text-white px-3 py-2 rounded-xl border border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Public Discount Label
              </label>
              <input
                type="text"
                value={publicDiscount.label}
                onChange={(e) => setPublicDiscount({ ...publicDiscount, label: e.target.value })}
                className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Sitewide Announcement Banner Text
              </label>
              <input
                type="text"
                value={publicDiscount.bannerText}
                onChange={(e) => setPublicDiscount({ ...publicDiscount, bannerText: e.target.value })}
                className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Private Voucher Keys Manager (Strictly Secret) */}
      {subTab === "vouchers" && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-4 h-4 text-pink-400" />
                <span>Create Secret Private Voucher Key</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Voucher keys remain strictly private in the database and hidden from general public views.
                When applied at checkout, it overrides/disables any active public discount (Non-Stacking Rule).
              </p>
            </div>

            <form onSubmit={handleAddVoucher} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Private Key Code
                </label>
                <input
                  type="text"
                  required
                  value={newVoucherCode}
                  onChange={(e) => setNewVoucherCode(e.target.value)}
                  placeholder="e.g. VIPEXCLUSIVE2026"
                  className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700 uppercase font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Discount Percentage
                </label>
                <select
                  value={newDiscountPercent}
                  onChange={(e) => setNewDiscountPercent(e.target.value)}
                  className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700"
                >
                  <option value={20}>20% Off</option>
                  <option value={50}>50% Off</option>
                  <option value={75}>75% Off</option>
                  <option value={99}>99% Creator Pass</option>
                  <option value={100}>100% Free VIP All-Access</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Private Internal Label
                </label>
                <input
                  type="text"
                  value={newVoucherLabel}
                  onChange={(e) => setNewVoucherLabel(e.target.value)}
                  placeholder="e.g. Influencer Partnership Key"
                  className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-glow-pink flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Key</span>
                </button>
              </div>
            </form>
          </div>

          {/* Vouchers Table */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 font-black text-xs uppercase tracking-wider text-white">
              Private Vouchers Database ({vouchers.length} keys) — Hidden From Public
            </div>
            <div className="divide-y divide-white/5">
              {vouchers.map((v) => (
                <div
                  key={v.code}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-black text-pink-400 bg-pink-500/10 px-3 py-1 rounded-lg border border-pink-500/20">
                      {v.code}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{v.label}</h4>
                      <p className="text-[11px] text-slate-400">
                        {v.discountPercent}% Discount • Valid until {v.validUntil} • Non-stackable (Overrides public discounts)
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteVoucher(v.code)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                    title="Delete Key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: Exactly Two Dedicated API Key Input Fields Only */}
      {subTab === "gateways_ai" && (
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Key className="w-4 h-4 text-pink-400" />
                <span>API Key Configurations (Two Dedicated Fields Only)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure your Payment Gateway and AI Pro Platform. Keys automatically save securely to the system database upon entry.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-1.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Auto-Saved to Database</span>
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveSecuritySettings} className="space-y-6">
            {/* Box 1: Payment Gateway API Key Input Box */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>1. Payment Gateway API Key Input Box</span>
                </label>
                <span className="text-[10px] font-bold text-slate-400 uppercase bg-black/30 px-2 py-0.5 rounded">
                  Single Gateway Key
                </span>
              </div>
              <p className="text-xs text-slate-400">
                A single input field for connecting and authenticating your payment gateway (PayHere, Stripe, PayPal, etc.) to handle memberships, VIP subscriptions, and coin purchases.
              </p>
              <div className="relative">
                <input
                  type="text"
                  value={apiKeyDraft.paymentGatewayApiKey}
                  onChange={(e) => handleApiKeyChange("paymentGatewayApiKey", e.target.value)}
                  placeholder="Enter Payment Gateway API Key (e.g. pk_live_snapreel_gateway_...)"
                  className="w-full bg-[#13141f] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 font-mono focus:border-pink-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Encrypted & stored in system database</span>
                </span>
                <span className="text-slate-500">Auto-saves on keystroke</span>
              </div>
            </div>

            {/* Box 2: AI Pro Version API Key Input Box */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span>2. AI Pro Version API Key Input Box</span>
                </label>
                <span className="text-[10px] font-bold text-pink-400 uppercase bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                  AI Video Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                A single field for connecting the AI platform. This key handles:
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 pl-4 list-disc marker:text-pink-500">
                <li>Automatic server-side removal of existing watermarks from uploaded videos</li>
                <li>Automatic removal of existing embedded subtitles</li>
                <li>Automated generation and overlay of new Sinhala and Tamil subtitles (fixed 2.5/6 canvas height)</li>
              </ul>
              <div className="relative pt-1">
                <input
                  type="text"
                  value={apiKeyDraft.aiProApiKey}
                  onChange={(e) => handleApiKeyChange("aiProApiKey", e.target.value)}
                  placeholder="Enter AI Pro Version API Key (e.g. ai_pro_live_snapreel_engine_...)"
                  className="w-full bg-[#13141f] text-sm text-white px-4 py-3 rounded-xl border border-slate-700 font-mono focus:border-pink-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>AI Subtitle & Watermark processor online</span>
                </span>
                <span className="text-slate-500">Auto-saves on keystroke</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-400">
                *Both API keys automatically save securely to the database upon entry.
              </p>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-glow-pink flex items-center justify-center gap-1.5 transition-all self-end sm:self-auto"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save API Keys to Database</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUB-TAB 6: Weekly Top Viewers */}
      {subTab === "top_viewers" && (
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 font-black text-xs uppercase tracking-wider text-white">
            Weekly Top Viewers Leaderboard & Gift System
          </div>
          <div className="divide-y divide-white/5">
            {topViewers.map((viewer, index) => (
              <div
                key={viewer.id}
                className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-black text-xs text-white">
                    #{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{viewer.name}</h4>
                      <span className="text-[10px] font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded">
                        {viewer.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span>{viewer.hoursWatched} Hours Streamed</span>
                      <span>•</span>
                      <span>{viewer.episodesWatched} Episodes</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">{viewer.plan}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {viewer.rewardSent ? (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Gift Delivered</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRewardViewer(viewer.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-glow-pink hover:scale-105"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>Send Gift / 500 Coins</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
