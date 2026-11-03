import React from "react";
import { Heart, Shield, Lock, FileText, HelpCircle, Mail, Phone } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Footer({ openAdminLogin }) {
  const { branding, setActiveModal } = useApp();

  return (
    <footer className="w-full bg-[#07080c] border-t border-white/5 pt-10 pb-24 text-slate-400 text-xs px-4 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <img
              src={branding.logoUrl || "/logo.jpg"}
              alt={branding.appName || "Snap Reel"}
              className="w-8 h-8 rounded-lg object-contain shadow-glow-pink"
            />
            <span className="text-lg font-black tracking-tight bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              {branding.appName || "Snap Reel"}
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
            {branding.tagline || "Unlimited Short Dramas & Exclusive Reels with studio-quality Sinhala and Tamil subtitles."}
          </p>
          <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
            <span>256-bit SSL Secure Platform</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
            Explore
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveModal("about")}
                className="hover:text-pink-400 transition-colors"
              >
                About Snap Reel
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveModal("vip")}
                className="hover:text-pink-400 transition-colors"
              >
                VIP Membership Plans
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveModal("support")}
                className="hover:text-pink-400 transition-colors"
              >
                Help & Feedback
              </button>
            </li>
          </ul>
        </div>

        {/* Legal & Policy Column */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
            Legal & Privacy
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveModal("privacy")}
                className="hover:text-pink-400 transition-colors"
              >
                Privacy Policy & Encryption
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveModal("terms")}
                className="hover:text-pink-400 transition-colors"
              >
                Terms & Conditions of Service
              </button>
            </li>
            <li>
              <span className="text-slate-500">Non-Distribution Notice</span>
            </li>
            <li>
              <span className="text-slate-500">Episode 1-10 Free Policy</span>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
            Support Channels
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-pink-400" />
              <a href={`mailto:${branding.supportEmail}`} className="hover:text-white transition-colors">
                {branding.supportEmail || "support@snapreel.com"}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <a
                href={`https://wa.me/${(branding.whatsappNumber || "94779284120").replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                {branding.supportPhone || "+94 77 928 4120"}
              </a>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Live customer support available 24/7.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500">
        <div>
          © 2026 Snap Reel OTT Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <span>Crafted for Short-Drama Lovers Worldwide</span>
        </div>
      </div>
    </footer>
  );
}
