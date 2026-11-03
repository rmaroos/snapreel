import React, { useState, useEffect } from "react";
import {
  Crown,
  Sparkles,
  CheckCircle2,
  Clock,
  Tag,
  Zap,
  ArrowRight,
  ShieldCheck,
  Film,
  Coins,
  AlertCircle,
  HelpCircle,
  Percent
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function MembershipPage() {
  const {
    user,
    membershipPlans,
    coinPackages,
    publicDiscount,
    vouchers,
    calculateEffectivePrice,
    activateMembership,
    purchaseCoinPackage,
    showToast
  } = useApp();

  const [selectedPlanId, setSelectedPlanId] = useState("Monthly");
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [activeTab, setActiveTab] = useState("membership"); // "membership" | "coins"
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 42, seconds: 19 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check and apply private voucher key
  const handleApplyVoucher = (e) => {
    e.preventDefault();
    const cleanCode = voucherCode.trim().toUpperCase();
    if (!cleanCode) {
      setAppliedVoucher(null);
      return;
    }

    const found = vouchers.find((v) => v.code === cleanCode);
    if (found) {
      setAppliedVoucher(found);
      showToast(
        `Private Voucher "${found.code}" applied (${found.discountPercent}% OFF)! Public discount disabled for this transaction.`,
        "success"
      );
    } else {
      setAppliedVoucher(null);
      showToast("Invalid or expired private voucher key.", "error");
    }
  };

  const handleClearVoucher = () => {
    setVoucherCode("");
    setAppliedVoucher(null);
    showToast("Voucher cleared. Public discount restored.", "info");
  };

  // Selected plan calculation
  const currentPlan = membershipPlans.find((p) => p.id === selectedPlanId) || membershipPlans[1];
  const pricing = calculateEffectivePrice(currentPlan.price, appliedVoucher ? appliedVoucher.code : null);

  return (
    <div className="min-h-screen pb-28 pt-6 px-4 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
          <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>VIP & Coin Store</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Unlimited Short Drama Streaming
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-lg mx-auto">
          Episodes 1 to 10 are completely free. Upgrade to VIP or buy Coins to unlock Episode 11+ and binge without wait times.
        </p>

        {/* Public Discount Flash Banner (if active) */}
        {publicDiscount && publicDiscount.enabled && (
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 p-3 px-6 rounded-2xl bg-gradient-to-r from-pink-950/70 via-purple-950/50 to-pink-950/70 border border-pink-500/40 shadow-glow-pink">
            <div className="flex items-center gap-2 text-xs font-extrabold text-pink-300">
              <Clock className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>{publicDiscount.bannerText || `Public Discount: ${publicDiscount.value}% OFF Active!`}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-sm font-black text-white">
              <span className="bg-black/80 px-2 py-0.5 rounded-lg border border-white/10">{String(timeLeft.hours).padStart(2, "0")}h</span>:
              <span className="bg-black/80 px-2 py-0.5 rounded-lg border border-white/10">{String(timeLeft.minutes).padStart(2, "0")}m</span>:
              <span className="bg-black/80 px-2 py-0.5 rounded-lg border border-white/10">{String(timeLeft.seconds).padStart(2, "0")}s</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs: VIP Memberships vs Coin Packages */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 rounded-2xl bg-white/5 border border-white/10">
          <button
            onClick={() => setActiveTab("membership")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "membership"
                ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-glow-pink"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>VIP Memberships (Weekly / Monthly / Yearly)</span>
          </button>

          <button
            onClick={() => setActiveTab("coins")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "coins"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Coin Buying Store</span>
          </button>
        </div>
      </div>

      {/* Active User VIP Status if subscribed */}
      {user.isVip && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/20 via-pink-600/20 to-amber-500/20 border border-amber-500/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-amber-400" />
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Active VIP Subscription
              </span>
              <h4 className="text-base font-black text-white">
                {user.vipPlan} VIP Active until {user.vipExpiresAt || "End of Month"}
              </h4>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
            ✓ Unlimited Streaming Enabled
          </span>
        </div>
      )}

      {/* SECTION 1: Membership Tiers */}
      {activeTab === "membership" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {membershipPlans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const planPricing = calculateEffectivePrice(plan.price, appliedVoucher ? appliedVoucher.code : null);

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`relative rounded-3xl p-6 cursor-pointer transition-all border flex flex-col justify-between ${
                    isSelected
                      ? "bg-gradient-to-b from-[#1e142e] via-[#161224] to-[#0f0e1a] border-pink-500 shadow-glow-pink scale-[1.02]"
                      : "glass-card border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md">
                      {plan.badge || plan.id}
                    </span>
                    <span className="text-[10px] font-bold text-pink-400 bg-pink-500/20 px-2 py-0.5 rounded-full">
                      {plan.billingCycle}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div>
                    <h3 className="text-lg font-black text-white">{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mt-2 mb-2">
                      <span className="text-3xl font-black text-white">
                        ${planPricing.price}
                      </span>
                      {plan.originalPrice > planPricing.price && (
                        <span className="text-xs text-slate-500 line-through">
                          ${plan.originalPrice}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 font-medium">/{plan.billingCycle}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 py-3 border-t border-white/10 flex-1">
                    {plan.features?.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Radio selector */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <span>{isSelected ? "Selected Tier" : "Click to select"}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? "border-pink-500 bg-pink-500 text-white" : "border-slate-600"
                      }`}
                    >
                      {isSelected && <Zap className="w-3 h-3 fill-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Private Voucher Input with Non-Stacking Notice */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 max-w-xl mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-pink-400" />
                <span>Private Voucher Key</span>
              </span>
              <span className="text-[10px] text-amber-300 font-semibold">
                *Overrides Public Discount
              </span>
            </div>

            <form onSubmit={handleApplyVoucher} className="flex gap-2">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Enter secret voucher key (e.g. VIPFREE2026, SNAP50)"
                className="flex-1 bg-[#13141f] text-xs font-mono uppercase text-white placeholder-slate-500 px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-colors"
              >
                Apply Key
              </button>
              {appliedVoucher && (
                <button
                  type="button"
                  onClick={handleClearVoucher}
                  className="px-3 py-2.5 rounded-xl bg-rose-600/30 text-rose-300 font-bold text-xs hover:bg-rose-600/50"
                >
                  Remove
                </button>
              )}
            </form>

            {/* Non-Stacking Rule Notice */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <div className="text-slate-300 leading-relaxed text-[11px]">
                <strong>Non-Stacking Policy:</strong> You may purchase with either our active Public Discount (
                {publicDiscount.enabled ? `${publicDiscount.value}% OFF` : "Disabled"}) or apply a Private Voucher Key.
                Vouchers cannot be stacked on top of public discounts.
                {appliedVoucher && (
                  <span className="block mt-1 font-bold text-emerald-400">
                    ✓ Private voucher "{appliedVoucher.code}" ({appliedVoucher.discountPercent}% OFF) is currently active and overriding public discounts!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Instant Activation Action */}
          <div className="text-center max-w-md mx-auto pt-2">
            <button
              onClick={() => activateMembership(selectedPlanId, appliedVoucher ? appliedVoucher.code : null)}
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white font-black text-base shadow-glow-pink hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Crown className="w-5 h-5 text-amber-300" />
              <span>Join Now (${pricing.price} • {selectedPlanId} VIP)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-[11px] text-slate-400 mt-2">
              Instant automated database activation • 256-bit SSL encrypted checkout
            </p>
          </div>
        </div>
      )}

      {/* SECTION 2: Coin Buying System Packages */}
      {activeTab === "coins" && (
        <div className="space-y-6">
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-xl font-black text-white">Purchase Coin Bundles</h3>
            <p className="text-xs text-slate-400 mt-1">
              Select a coin package to top up your wallet. Coins can be used to unlock individual episodes and support creator series.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coinPackages.map((pack) => {
              const packPricing = calculateEffectivePrice(pack.price, appliedVoucher ? appliedVoucher.code : null);
              const totalCoins = pack.coins + (pack.bonus || 0);

              return (
                <div
                  key={pack.id}
                  className="glass-card rounded-2xl p-5 border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full">
                      {pack.tag}
                    </span>
                    {pack.bonus > 0 && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                        +{pack.bonus} Bonus Coins
                      </span>
                    )}
                  </div>

                  <div className="my-2">
                    <div className="flex items-center gap-2">
                      <Coins className="w-6 h-6 text-amber-400" />
                      <span className="text-2xl font-black text-white">{pack.coins} Coins</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Total: {totalCoins} Coins to your wallet
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-white">${packPricing.price}</span>
                      {pack.price > packPricing.price && (
                        <span className="text-xs text-slate-500 line-through ml-1.5">${pack.price}</span>
                      )}
                    </div>

                    <button
                      onClick={() => purchaseCoinPackage(pack.id, appliedVoucher ? appliedVoucher.code : null)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-black text-xs shadow-md transition-transform hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
