import React, { useState } from "react";
import {
  Video,
  UploadCloud,
  Trash2,
  Sparkles,
  Layers,
  Key,
  CheckCircle,
  AlertTriangle,
  Play,
  Film,
  Plus,
  Languages,
  Eye,
  CheckSquare,
  Square,
  Sliders,
  Settings,
  Calendar,
  Send,
  Bell,
  Clock
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CreatorStudio({ onOpenReauth }) {
  const {
    dramas,
    setDramas,
    deleteDrama,
    bulkDeleteDramas,
    comingSoon,
    setComingSoon,
    sendPushNotificationForRelease,
    adminSettings,
    setAdminSettings,
    showToast
  } = useApp();

  const [activeSection, setActiveSection] = useState("videos"); // "videos" | "coming_soon"

  // Bulk deletion selection state
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null); // id to confirm single deletion
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  // Upload Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newGenre, setNewGenre] = useState("Billionaire Romance");
  const [newDescription, setNewDescription] = useState("");
  const [uploadedVideoFile, setUploadedVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [autoEraseWatermark, setAutoEraseWatermark] = useState(true);
  const [generateAiSubtitles, setGenerateAiSubtitles] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Coming Soon Add Modal State
  const [showAddCsModal, setShowAddCsModal] = useState(false);
  const [newCsTitle, setNewCsTitle] = useState("");
  const [newCsDate, setNewCsDate] = useState("");
  const [newCsGenre, setNewCsGenre] = useState("Romance / Revenge");
  const [newCsSynopsis, setNewCsSynopsis] = useState("");

  // Drag and drop video upload handling
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file && (file.type.includes("video") || file.name.endsWith(".mp4") || file.name.endsWith(".webm"))) {
      setUploadedVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
      showToast(`Video "${file.name}" loaded for AI processing!`, "success");
    } else {
      showToast("Please drop a valid MP4 or WebM video file.", "error");
    }
  };

  // Select all or toggle single checkbox for bulk deletion
  const toggleSelectAll = () => {
    if (selectedIds.length === dramas.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(dramas.map((d) => d.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Execute single deletion with confirmation
  const handleConfirmSingleDelete = () => {
    if (deleteConfirmId) {
      deleteDrama(deleteConfirmId);
      setDeleteConfirmId(null);
      setSelectedIds((prev) => prev.filter((i) => i !== deleteConfirmId));
    }
  };

  // Execute bulk deletion
  const handleConfirmBulkDelete = () => {
    bulkDeleteDramas(selectedIds);
    setSelectedIds([]);
    setShowBulkConfirm(false);
  };

  // Submit new drama series upload
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast("Please enter a series title.", "error");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newDrama = {
        id: "drama-" + Date.now(),
        title: newTitle,
        slug: newTitle.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        category: "New",
        genre: newGenre,
        rating: 5.0,
        views: "1.5K",
        likes: "210",
        tags: ["New", "AI Translated", "Sinhala & Tamil"],
        badge: "✨ Just Added",
        poster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        cover: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
        totalEpisodes: 20,
        hasWatermark: !autoEraseWatermark,
        watermarkCleaned: autoEraseWatermark,
        description: newDescription || "Uploaded and processed through Creator Studio with studio AI Sinhala and Tamil subtitles at 2.5/6 vertical canvas position.",
        cast: ["Original Cast"],
        videoUrl: videoPreviewUrl || "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-neon-light-40432-large.mp4",
        subtitles: {
          en: [
            { start: 1, end: 4, text: "Welcome to this newly uploaded drama on Drama Hub." },
            { start: 5, end: 9, text: "Enjoy high definition playback without watermarks." }
          ],
          si: [
            { start: 1, end: 4, text: "Drama Hub වෙත අලුතින් එක් කළ මෙම නාට්‍යයට සාදරයෙන් පිළිගනිමු." },
            { start: 5, end: 9, text: "වෝටර්මාක් රහිතව උසස් තත්ත්වයේ දර්ශන රසවිඳින්න." }
          ],
          ta: [
            { start: 1, end: 4, text: "Drama Hub இல் புதிதாகப் பதிவேற்றப்பட்ட இந்த நாடகத்திற்கு வரவேற்கிறோம்." },
            { start: 5, end: 9, text: "வாட்டர்மார்க் இல்லாத உயர்தர காட்சிகளை அனுபவிக்கவும்." }
          ]
        },
        episodes: Array.from({ length: 20 }, (_, i) => ({
          episodeNumber: i + 1,
          title: `Episode ${i + 1}: Storyline Part ${i + 1}`,
          duration: "1:45",
          isFree: i < 10,
          views: "1.5K",
          thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
        }))
      };

      setDramas((prev) => [newDrama, ...prev]);
      setIsProcessing(false);
      setShowUploadModal(false);
      setNewTitle("");
      setNewDescription("");
      setUploadedVideoFile(null);
      setVideoPreviewUrl("");
      showToast(`Drama "${newTitle}" processed and published with Sinhala & Tamil subtitles!`, "success");
    }, 1200);
  };

  // Add Coming Soon Premiere
  const handleAddComingSoon = (e) => {
    e.preventDefault();
    if (!newCsTitle.trim()) return;

    const newItem = {
      id: "cs-" + Date.now(),
      title: newCsTitle,
      releaseDate: newCsDate || "Dec 15, 2026",
      daysLeft: 14,
      category: newCsGenre,
      poster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
      synopsis: newCsSynopsis || "Upcoming exclusive drama premiere on Drama Hub.",
      reminded: false,
      subscriberRemindersCount: 1250
    };

    setComingSoon((prev) => [...prev, newItem]);
    setShowAddCsModal(false);
    setNewCsTitle("");
    setNewCsSynopsis("");
    showToast(`Upcoming release "${newCsTitle}" added to Coming Soon!`, "success");
  };

  return (
    <div className="space-y-6">
      
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl glass-card border border-white/10">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-pink-500" />
            <span>🎬 Creator Studio: Owner Video & Coming Soon Hub</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Direct drag & drop video uploads, AI watermark cleaning, Sinhala & Tamil subtitles, and Coming Soon releases.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeSection === "videos" ? (
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white font-black text-xs sm:text-sm shadow-glow-pink hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Direct Drag & Drop Upload</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddCsModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white font-black text-xs sm:text-sm shadow-glow-pink hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Upcoming Release</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <button
          onClick={() => setActiveSection("videos")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSection === "videos"
              ? "bg-pink-600 text-white shadow-glow-pink"
              : "bg-white/5 text-slate-400 hover:text-white"
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Video Catalog & Deletions ({dramas.length})</span>
        </button>

        <button
          onClick={() => setActiveSection("coming_soon")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSection === "coming_soon"
              ? "bg-pink-600 text-white shadow-glow-pink"
              : "bg-white/5 text-slate-400 hover:text-white"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Coming Soon Management ({comingSoon.length})</span>
        </button>
      </div>

      {/* SECTION 1: Video Catalog & Bulk Deletion */}
      {activeSection === "videos" && (
        <div className="space-y-4">
          {/* Bulk Deletion Action Bar (Shown when 1 or more videos are checked) */}
          {selectedIds.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                <CheckSquare className="w-4 h-4 text-rose-400" />
                <span>{selectedIds.length} series selected for bulk actions</span>
              </div>

              <button
                onClick={() => setShowBulkConfirm(true)}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected ({selectedIds.length})</span>
              </button>
            </div>
          )}

          {/* Videos Table */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleSelectAll}
                  className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-bold"
                >
                  {selectedIds.length === dramas.length ? (
                    <CheckSquare className="w-4 h-4 text-pink-500" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                  <span>Select All</span>
                </button>
                <span className="text-xs text-slate-400">
                  ({dramas.length} series in catalog)
                </span>
              </div>

              <span className="text-xs text-slate-400">
                Fixed Subtitle Canvas Position: <strong className="text-pink-400 font-mono">2.5/6 (~41.67%)</strong>
              </span>
            </div>

            <div className="divide-y divide-white/5">
              {dramas.map((drama) => {
                const isChecked = selectedIds.includes(drama.id);

                return (
                  <div
                    key={drama.id}
                    className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <button
                        onClick={() => toggleSelectOne(drama.id)}
                        className="p-1 text-slate-400 hover:text-white shrink-0"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-pink-500" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>

                      <img
                        src={drama.poster}
                        alt={drama.title}
                        className="w-12 h-16 rounded-xl object-cover shrink-0"
                      />

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white truncate">{drama.title}</h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0">
                            AI Cleaned
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                          <span>{drama.genre}</span>
                          <span>•</span>
                          <span>{drama.totalEpisodes} Episodes (1-10 Free)</span>
                          <span>•</span>
                          <span className="text-pink-400 font-medium">Sinhala & Tamil Subtitles</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => setDeleteConfirmId(drama.id)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-xs font-bold border border-white/5 flex items-center gap-1.5 transition-colors"
                        title="Delete Video"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                        <span>Delete Video</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Coming Soon Releases Management (Relocated to Creator Studio) */}
      {activeSection === "coming_soon" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comingSoon.map((cs) => (
              <div
                key={cs.id}
                className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col justify-between space-y-3"
              >
                <div className="flex gap-3">
                  <img
                    src={cs.poster || cs.banner}
                    alt={cs.title}
                    className="w-20 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-pink-400 bg-pink-500/20 px-2 py-0.5 rounded">
                      Release: {cs.releaseDate}
                    </span>
                    <h4 className="text-sm font-black text-white mt-1 line-clamp-1">{cs.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{cs.synopsis}</p>
                    <span className="text-[11px] text-amber-300 font-semibold block mt-1">
                      🔔 {cs.subscriberRemindersCount.toLocaleString()} Users Waiting
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <button
                    onClick={() => sendPushNotificationForRelease(cs.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                    title="Trigger push notification to all users who set reminders"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Fire Notification to Users</span>
                  </button>

                  <button
                    onClick={() => {
                      setComingSoon((prev) => prev.filter((c) => c.id !== cs.id));
                      showToast(`Removed "${cs.title}" from Coming Soon`, "info");
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Single Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm glass-card rounded-3xl border border-rose-500/40 p-6 shadow-2xl text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Delete Video Confirmation</h3>
            <p className="text-xs text-slate-300 mt-2 mb-6 leading-relaxed">
              Are you sure you want to delete this video? This action will remove the series, its episodes, and subtitle tracks from the catalog.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSingleDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md"
              >
                Yes, Delete Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {showBulkConfirm && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm glass-card rounded-3xl border border-rose-500/40 p-6 shadow-2xl text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Bulk Deletion Confirmation</h3>
            <p className="text-xs text-slate-300 mt-2 mb-6 leading-relaxed">
              Are you sure you want to bulk-delete <strong className="text-rose-400">{selectedIds.length}</strong> selected video series? This cannot be undone.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setShowBulkConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBulkDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md"
              >
                Delete {selectedIds.length} Videos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Video & AI Processing Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-xl glass-card rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar relative">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-white mb-1 flex items-center gap-2">
              <UploadCloud className="w-6 h-6 text-pink-500" />
              <span>Direct Drag & Drop Video Upload</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Drag & drop your short-drama video file for automatic AI watermark removal and Sinhala & Tamil subtitle generation.
            </p>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className={`p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                  uploadedVideoFile
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-slate-700 hover:border-pink-500 bg-white/[0.02]"
                }`}
              >
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={handleFileDrop}
                  className="hidden"
                  id="video-dropzone"
                />
                <label htmlFor="video-dropzone" className="cursor-pointer">
                  {uploadedVideoFile ? (
                    <div className="space-y-1">
                      <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                      <p className="text-xs font-bold text-white">{uploadedVideoFile.name}</p>
                      <p className="text-[11px] text-emerald-400">
                        {(uploadedVideoFile.size / (1024 * 1024)).toFixed(1)} MB • Video Ready for Processing
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <UploadCloud className="w-8 h-8 text-pink-400 mx-auto" />
                      <p className="text-xs font-bold text-white">
                        Drag and drop video file here, or click to browse
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Supports MP4, WebM (Recommended vertical 9:16 format)
                      </p>
                    </div>
                  )}
                </label>
              </div>

              {/* Title & Genre */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Series Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Return of the Heiress"
                    className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Genre / Category
                  </label>
                  <select
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700"
                  >
                    <option>Billionaire Romance</option>
                    <option>Sweet Revenge</option>
                    <option>Urban Action</option>
                    <option>Period & Fantasy</option>
                    <option>Anime & Sci-Fi</option>
                  </select>
                </div>
              </div>

              {/* Watermark & Embedded Subtitle Eraser Toggle */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-bold text-white">
                      Auto Watermark & Original Subtitle Removal
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Automatically detect, erase, and clean existing watermarks & hardcoded subtitles
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoEraseWatermark}
                  onChange={(e) => setAutoEraseWatermark(e.target.checked)}
                  className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                />
              </div>

              {/* AI Subtitle Generation & Placement */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">
                      AI Subtitle Placement (Sinhala & Tamil)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-400">
                    Canvas Height: 2.5/6 (~41.67%)
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Subtitles will be rendered horizontally centered at a fixed vertical canvas height of 2.5/6 (~41.67% from the top).
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white font-extrabold text-sm shadow-glow-pink flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing Video & AI Subtitles...</span>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload & Process Video Asset</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Coming Soon Modal */}
      {showAddCsModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md glass-card rounded-3xl border border-white/10 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-pink-500" />
              <span>Add Coming Soon Series</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Series Title
              </label>
              <input
                type="text"
                required
                value={newCsTitle}
                onChange={(e) => setNewCsTitle(e.target.value)}
                placeholder="e.g. Return of the Shadow Sovereign"
                className="w-full bg-[#13141f] text-sm text-white px-3.5 py-2.5 rounded-xl border border-slate-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Release Date
                </label>
                <input
                  type="text"
                  value={newCsDate}
                  onChange={(e) => setNewCsDate(e.target.value)}
                  placeholder="e.g. Nov 28, 2026"
                  className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Genre
                </label>
                <input
                  type="text"
                  value={newCsGenre}
                  onChange={(e) => setNewCsGenre(e.target.value)}
                  placeholder="e.g. Action / Revenge"
                  className="w-full bg-[#13141f] text-sm text-white px-3 py-2 rounded-xl border border-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Synopsis
              </label>
              <textarea
                rows={3}
                value={newCsSynopsis}
                onChange={(e) => setNewCsSynopsis(e.target.value)}
                placeholder="Brief plot teaser for users..."
                className="w-full bg-[#13141f] text-sm text-white p-3 rounded-xl border border-slate-700 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddCsModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddComingSoon}
                className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold shadow-glow-pink"
              >
                Save Premiere
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
