import React, { useState } from "react";
import { X, ShieldAlert, KeyRound, Mail, Lock, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const MASTER_ADMIN_EMAIL = "snapreel2008@gmail.com";
export const MASTER_ADMIN_PASSWORD = "SRadmin0708";

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { showToast } = useApp();

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  if (!isOpen) return null;

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (adminEmail === MASTER_ADMIN_EMAIL && adminPassword === MASTER_ADMIN_PASSWORD) {
      showToast("Master Admin Authentication Verified!", "success");
      onLoginSuccess();
      onClose();
    } else {
      showToast("Invalid Master Admin Credentials. Please check details.", "error");
    }
  };

  const handleFillDemo = () => {
    setAdminEmail(MASTER_ADMIN_EMAIL);
    setAdminPassword(MASTER_ADMIN_PASSWORD);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md glass-card rounded-3xl border border-indigo-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95">
        
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-950 mb-3">
            <ShieldAlert className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Centralized Admin Portal
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access Pages Edit, Creator Studio & General Dashboard
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleAdminSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="snapreel2008@gmail.com"
                className="w-full bg-[#13141f] text-sm text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              Admin Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="SRadmin0708"
                className="w-full bg-[#13141f] text-sm text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Fill Demo Credentials Shortcut */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">Pre-configured Admin?</span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline"
            >
              Fill Demo Credentials
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-sm shadow-lg shadow-indigo-950 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>Unlock Admin Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
