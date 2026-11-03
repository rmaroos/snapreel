import React, { useState } from "react";
import { Coins, X, Check, Zap, Tag, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function CoinBuyModal({ isOpen, onClose }) {
  const {
    user,
    coinPackages,
    purchaseCoinPackage,
    calculateEffectivePrice,
    publicDiscount,
    showToast
  } = useApp();

  const [voucherInput, setVoucherInput] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState("");

  if (!isOpen) return null;

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;
    const code = voucherInput.trim().toUpperCase();
    setAppliedVoucher(code);
    showToast(`Voucher ${code} applied! Public discounts will be overridden.`, "info");
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher("");
    setVoucherInput("");
    showToast("Voucher removed. Standard pricing / public discounts restored.", "info");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg glass-card rounded-3xl border border-white/10 p-6 shadow-2xl relative space-y-5 animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-950/30">
            <Coins className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Buy Coins Store</h3>
            <p className="text-xs text-slate-400">
              Unlock individual episodes (15 Coins / ep) or support creators
            </p>
          </div>
        </div>

        {/* Current Wallet Balance */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300">Your Current Balance</span>
          <span className="text-sm font-black text-amber-400 font-mono">
            {user.coins} Coins
          </span>
        </div>

        {/* Private Voucher Key Input & Non-Stacking Rule Notice */}
        <div className="p-3.5 rounded-2xl bg-[#13141f] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-pink-400" />
              <span>Private Voucher Key</span>
            </label>
            {publicDiscount && publicDiscount.enabled && !appliedVoucher && (
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Public Discount Active ({publicDiscount.value}% OFF)
              </span>
            )}
          </div>

          <form onSubmit={handleApplyVoucher} className="flex gap-2">
            <input
              type="text"
              value={voucherInput}
              onChange={(e) => setVoucherInput(e.target.value)}
              placeholder="e.g. VIPFREE2026 or SNAP50"
              className="flex-1 bg-black/40 text-xs font-mono uppercase font-bold text-white px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-pink-500"
            />
            {appliedVoucher ? (
              <button
                type="button"
                onClick={handleRemoveVoucher}
                className="px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-bold transition-colors"
              >
                Clear
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs transition-colors shadow-glow-pink"
              >
                Apply
              </button>
            )}
          </form>

          {appliedVoucher ? (
            <p className="text-[11px] text-pink-400 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Applied Voucher: <strong>{appliedVoucher}</strong> (Public discount overridden)</span>
            </p>
          ) : (
            <p className="text-[10px] text-slate-400">
              *Non-stacking rule: Applying a Private Voucher Key overrides and disables any active public discounts.
            </p>
          )}
        </div>

        {/* Packages List */}
        <div className="space-y-2.5 max-h-64 overflow-y-auto no-scrollbar">
          {coinPackages.map((pack) => {
            const pricing = calculateEffectivePrice(pack.price, appliedVoucher);
            const totalCoins = pack.coins + (pack.bonus || 0);

            return (
              <div
                key={pack.id}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/40 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-white">{pack.coins} Coins</h4>
                      {pack.bonus > 0 && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                          +{pack.bonus} Bonus
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 block">
                      Total: {totalCoins} Coins ({Math.floor(totalCoins / 15)} Episodes)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    {pricing.discountPercent > 0 ? (
                      <div>
                        <span className="text-xs text-slate-400 line-through mr-1">
                          ${pack.price}
                        </span>
                        <span className="text-sm font-black text-emerald-400">
                          ${pricing.price}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-black text-white">${pack.price}</span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      purchaseCoinPackage(pack.id, appliedVoucher);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs shadow-md active:scale-95 transition-all"
                  >
                    Buy
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* SSL Security note */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted 256-Bit SSL Payment Processing</span>
        </div>
      </div>
    </div>
  );
}
