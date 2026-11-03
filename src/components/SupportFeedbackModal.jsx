import React, { useState } from "react";
import {
  X,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  Send,
  ExternalLink,
  ChevronDown,
  CheckCircle2
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function SupportFeedbackModal({ isOpen, onClose }) {
  const { branding, showToast } = useApp();

  const [activeTab, setActiveTab] = useState("contact"); // "contact" | "feedback" | "faq"
  const [feedbackCategory, setFeedbackCategory] = useState("Playback Issue");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  if (!isOpen) return null;

  const faqs = [
    {
      q: "How does the free episode unlock rule work?",
      a: "Episodes 1 to 10 of every series are 100% free with no coins or credit card required. To continue watching Episode 11 and beyond, simply upgrade to our Weekly or Monthly VIP Membership."
    },
    {
      q: "How do I switch subtitles to Sinhala or Tamil?",
      a: "While watching any video in the player, tap the subtitle language button (labeled SI/TA/EN) in the top-right corner to toggle between Sinhala (සිංහල), Tamil (தமிழ்), English, or Off."
    },
    {
      q: "What happens if I change my device?",
      a: "Your unique 8-digit User ID and active VIP status are tied to your registered email. Simply enter your email and verify the 6-digit OTP to log into any device seamlessly."
    },
    {
      q: "How do I earn free coins with the referral system?",
      a: "Go to your Profile page, copy your personal referral link, and share it with friends. When a friend signs up using your link, both of you instantly receive 100 bonus coins!"
    }
  ];

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setSubmitted(true);
    showToast("Feedback submitted! Our support team will review it shortly.", "success");
    setTimeout(() => {
      setSubmitted(false);
      setFeedbackText("");
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-xl glass-card rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[85vh] overflow-y-auto no-scrollbar animate-in zoom-in-95">
        
        {/* Glow ambient background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-600/30 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-600 flex items-center justify-center shadow-glow-pink">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Help & Support Center
            </h2>
            <p className="text-xs text-slate-400">
              Direct assistance, contact channels & platform feedback
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/5 mb-6">
          {[
            { id: "contact", label: "Contact Channels" },
            { id: "feedback", label: "Send Feedback" },
            { id: "faq", label: "FAQ Guide" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-pink-600 text-white shadow-glow-pink"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Contact Channels */}
        {activeTab === "contact" && (
          <div className="space-y-4">
            {/* Support Email */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-pink-500/30 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Official Support Email
                  </span>
                  <a
                    href={`mailto:${branding.supportEmail}`}
                    className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors"
                  >
                    {branding.supportEmail || "support@snapreel.com"}
                  </a>
                </div>
              </div>
              <a
                href={`mailto:${branding.supportEmail}`}
                className="p-2 rounded-xl bg-white/10 hover:bg-pink-600 text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Support Contact / WhatsApp */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Support Contact / WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/${(branding.whatsappNumber || "94779284120").replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors"
                  >
                    {branding.supportPhone || "+94 77 928 4120"}
                  </a>
                </div>
              </div>
              <a
                href={`https://wa.me/${(branding.whatsappNumber || "94779284120").replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            {/* Telegram Channel */}
            {branding.telegramHandle && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-sky-500/30 transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Telegram Community & Updates
                    </span>
                    <span className="text-sm font-bold text-white">
                      {branding.telegramHandle}
                    </span>
                  </div>
                </div>
                <a
                  href={`https://t.me/${branding.telegramHandle.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Feedback Form */}
        {activeTab === "feedback" && (
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Feedback Topic
              </label>
              <select
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value)}
                className="w-full bg-[#13141f] text-sm text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-pink-500"
              >
                <option>Playback Issue / Video Lag</option>
                <option>Sinhala / Tamil Subtitle Request</option>
                <option>VIP Membership / Billing</option>
                <option>Content Suggestion / Request Drama</option>
                <option>Other Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Your Email (Optional for reply)
              </label>
              <input
                type="email"
                value={feedbackEmail}
                onChange={(e) => setFeedbackEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                className="w-full bg-[#13141f] text-sm text-white placeholder-slate-500 px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Your Message
              </label>
              <textarea
                required
                rows={4}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Describe your issue or suggestion in detail..."
                className="w-full bg-[#13141f] text-sm text-white placeholder-slate-500 p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-pink-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white font-extrabold text-sm shadow-glow-pink hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>
          </form>
        )}

        {/* Tab 3: FAQ Guide */}
        {activeTab === "faq" && (
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white/5 border border-white/5 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full p-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-white hover:text-pink-400"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-pink-400" : "text-slate-400"}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
