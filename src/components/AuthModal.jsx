import React, { useState } from "react";
import {
  X,
  Mail,
  KeyRound,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Check,
  FileText
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function AuthModal({ isOpen, onClose }) {
  const { loginWithOtp, setActiveModal, showToast } = useApp();

  const [step, setStep] = useState("email"); // 'email' | 'otp'
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Step 1: Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    if (!agreedTerms) {
      showToast("You must agree to the Terms & Conditions and Privacy Policy.", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Generate a 6-digit OTP code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setLoading(false);
      setStep("otp");
      showToast(`Verification code sent to ${email}! Check code below.`, "success");
    }, 600);
  };

  // Step 2: Verify OTP and auto-assign User ID
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode !== generatedOtp && otpCode !== "123456") {
      showToast("Incorrect OTP verification code. Please check again.", "error");
      return;
    }

    loginWithOtp(email);
    onClose();
    // Reset state
    setStep("email");
    setOtpCode("");
    setEmail("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md glass-card rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95">
        
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-600 flex items-center justify-center shadow-glow-pink mb-3">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            {step === "email" ? "Instant OTP Sign In" : "Enter Verification Code"}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            {step === "email"
              ? "No passwords needed! Instant automated login with One-Time Password sent to your email."
              : `We sent a 6-digit OTP code to ${email}`}
          </p>
        </div>

        {/* Form */}
        {step === "email" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Email / Gmail Address
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("snapreel2008@gmail.com");
                    setAgreedTerms(true);
                  }}
                  className="text-[11px] text-pink-400 hover:text-pink-300 underline font-semibold"
                >
                  Admin Auto-Fill (snapreel2008@gmail.com)
                </button>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full bg-[#13141f] text-sm text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                />
              </div>
            </div>

            {/* Terms & Conditions Checkbox (Mandatory) */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-700 bg-[#13141f] text-pink-600 focus:ring-pink-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-slate-300 leading-relaxed cursor-pointer select-none">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => setActiveModal("terms")}
                  className="text-pink-400 underline hover:text-pink-300"
                >
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => setActiveModal("privacy")}
                  className="text-pink-400 underline hover:text-pink-300"
                >
                  Privacy Policy
                </button>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white font-extrabold text-sm shadow-glow-pink hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span>Sending Code...</span>
              ) : (
                <>
                  <span>Send OTP Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {/* Live Simulated OTP Notification Preview Box */}
            <div className="p-3.5 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                <span className="text-xs text-slate-200">
                  Simulated OTP Code:{" "}
                  <strong className="text-pink-400 font-mono text-sm tracking-wider">
                    {generatedOtp}
                  </strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOtpCode(generatedOtp)}
                className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
              >
                Auto-fill
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                6-Digit Verification Code
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="e.g. 849201"
                  className="w-full bg-[#13141f] text-center font-mono tracking-widest text-lg font-bold text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white font-extrabold text-sm shadow-glow-pink hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Verify & Auto-Assign User ID</span>
            </button>

            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full text-xs text-slate-400 hover:text-white py-1 transition-colors text-center"
            >
              ← Change email address
            </button>
          </form>
        )}

        {/* Benefits reminder */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-around text-center text-[11px] text-slate-400">
          <div>
            <span className="block font-bold text-white">🎁 100 Coins</span>
            <span>Free Bonus</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div>
            <span className="block font-bold text-white">🆔 Unique ID</span>
            <span>Auto Generated</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div>
            <span className="block font-bold text-white">⚡ Cloud Sync</span>
            <span>Watch History</span>
          </div>
        </div>
      </div>
    </div>
  );
}
