import React, { useState, useEffect } from "react";
import {
  X,
  Crown,
  Sparkles,
  CheckCircle2,
  Clock,
  Tag,
  CreditCard,
  Zap,
  ArrowRight
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function VipModal({ isOpen, onClose }) {
  const { activateMembership, redeemVoucher, showToast } = useApp();

  const [selectedPlan, setSelectedPlan] = useState("Monthly"); // "Weekly" or "Monthly"
  const [voucherCode, setVoucherCode] = useState("");
  const [applyingVoucher, setApplyingVoucher] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  // Countdown timer for Flash Sale
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const plans = [
    {
      id: "Weekly",
      name: "Weekly VIP",
      price: "$4.99",
      originalPrice: "$9.99",
      period: "per week",
      discount: "50% OFF",
      popular: false,
      desc: "Great for weekend binge watching"
    },
    {
      id: "Monthly",
      name: "Monthly VIP",
      price: "$14.99",
      originalPrice: "$29.99",
      period: "per month",
      discount: "50% OFF",
      popular: true,
      desc: "Best value! Unlimited short drama access"
    }
  ];

  const benefits = [
    "Unlock Episode 11+ on all ongoing & completed dramas",
    "Stream all 50+ episodes without coin locks or wait times",
    "Clean AI Watermark & embedded subtitle removal",
    "High Bitrate 1080p Full HD video playback",
    "Offline download simulation for travel watching",
    "Special VIP golden badge displayed on profile"
  ];

  const handleInstantSubscribe = () => {
    activateMembership(selectedPlan);
  };

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;
    setApplyingVoucher(true);
    setTimeout(() => {
      const ok = redeemVoucher(voucherCode);
      setApplyingVoucher(false);
      if (ok) setVoucherCode("");
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-xl glass-card rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar animate-in zoom-in-95">
        
        {/* Glow ambient background */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-pink-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
            <Crown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>Snap Reel VIP Pass</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Unlock Unlimited Short Dramas
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
            Episodes 1 to 10 are free! Join VIP to stream all Episode 11+ releases instantly without interruption.
          </p>

          {/* Flash Sale Countdown Timer Bar */}
          <div className="mt-4 p-2.5 rounded-2xl bg-gradient-to-r from-pink-950/60 via-purple-950/40 to-pink-950/60 border border-pink-500/30 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-pink-400 animate-spin" />
            <span className="text-xs font-bold text-slate-200">
              ⚡ Flash Sale 50% OFF Ends In:
            </span>
            <div className="flex items-center gap-1 font-mono text-xs font-black text-pink-400">
              <span className="bg-black/60 px-1.5 py-0.5 rounded">{String(timeLeft.hours).padStart(2, "0")}h</span>:
              <span className="bg-black/60 px-1.5 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, "0")}m</span>:
              <span className="bg-black/60 px-1.5 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, "0")}s</span>
            </div>
          </div>
        </div>

        {/* Subscription Plan Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-gradient-to-b from-pink-900/40 to-purple-900/40 border-pink-500 shadow-glow-pink scale-[1.02]"
                    : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 right-4 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md">
                    Most Popular
                  </span>
                )}

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white">{plan.name}</h3>
                  <span className="text-[10px] font-bold text-pink-400 bg-pink-500/20 px-2 py-0.5 rounded">
                    {plan.discount}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-slate-500 line-through">{plan.originalPrice}</span>
                  <span className="text-[11px] text-slate-400">{plan.period}</span>
                </div>

                <p className="text-[11px] text-slate-400 mt-2">{plan.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Benefits List */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mb-6">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            VIP Member Privileges:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Voucher Key Redemption Bar */}
        <form onSubmit={handleApplyVoucher} className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              placeholder="Have a voucher? (e.g. VIPFREE2026, SNAP50)"
              className="w-full bg-[#13141f] text-xs text-white placeholder-slate-500 pl-10 pr-3 py-2.5 rounded-xl border border-slate-700 uppercase focus:outline-none focus:border-pink-500"
            />
          </div>
          <button
            type="submit"
            disabled={applyingVoucher}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 shrink-0 transition-all"
          >
            {applyingVoucher ? "Verifying..." : "Apply"}
          </button>
        </form>

        {/* Instant Automated Activation Button */}
        <button
          onClick={handleInstantSubscribe}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white font-black text-sm sm:text-base shadow-glow-pink hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5 text-amber-300" />
          <span>Join VIP Now ({selectedPlan} • Instant Activation)</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-[11px] text-slate-400 text-center mt-3">
          Instant automatic database activation • No manual email checks required • Cancel anytime.
        </p>
      </div>
    </div>
  );
}
