import React, { useState } from "react";
import { X, Lock, ShieldCheck, KeyRound } from "lucide-react";
import { MASTER_ADMIN_PASSWORD } from "./AdminLoginModal";
import { useApp } from "../../context/AppContext";

export default function AdminReauthModal({ isOpen, onClose, onUnlocked, title = "Re-Authentication Lock" }) {
  const { showToast } = useApp();
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === MASTER_ADMIN_PASSWORD) {
      showToast("Security Lock Verified. Access Granted.", "success");
      onUnlocked();
      onClose();
      setPassword("");
    } else {
      showToast("Incorrect Master Admin Password.", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-sm glass-card rounded-3xl border border-rose-500/40 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-white">{title}</h3>
          <p className="text-xs text-slate-400 mt-1">
            Enter Master Admin Password to reveal and modify API Keys & sensitive gateways.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="relative">
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Master Admin Password"
              className="w-full bg-[#13141f] text-sm text-white placeholder-slate-500 pl-10 pr-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-rose-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-md"
          >
            Authenticate & Unlock
          </button>
        </form>
      </div>
    </div>
  );
}
