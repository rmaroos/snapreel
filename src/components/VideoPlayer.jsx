import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  FastForward,
  RotateCcw,
  Languages,
  Layers,
  Lock,
  Crown,
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
  ChevronDown,
  Sparkles,
  Sliders,
  Check,
  Download,
  Settings,
  Coins
} from "lucide-react";
import SubtitleOverlay from "./SubtitleOverlay";
import { useApp } from "../context/AppContext";

export default function VideoPlayer({
  drama,
  currentEpisode = 1,
  onEpisodeChange,
  onOpenEpisodeDrawer
}) {
  const {
    user,
    setActiveModal,
    trackEpisodeWatch,
    myList,
    toggleFavorite,
    toggleSaved,
    showToast,
    isEpisodeUnlocked,
    unlockEpisodeWithCoins,
    DEFAULT_EPISODE_UNLOCK_COINS
  } = useApp();

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(105); // Default ~1:45
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLongPressing2x, setIsLongPressing2x] = useState(false);
  const [subtitleLang, setSubtitleLang] = useState("si"); // Default Sinhala / Tamil
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [videoQuality, setVideoQuality] = useState("1080p"); // "1080p" | "720p" | "480p" | "Auto"
  const [cleanWatermark, setCleanWatermark] = useState(true);
  const [likesCount, setLikesCount] = useState(8420);
  const [isLiked, setIsLiked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const longPressTimerRef = useRef(null);
  const prevSpeedRef = useRef(1);

  // Check if current episode is locked
  // Ep 1-10 are 100% free; Ep 11+ requires VIP membership OR 15 Coins unlock!
  const isEpisodeLocked = !isEpisodeUnlocked(drama.id, currentEpisode);

  useEffect(() => {
    // When episode changes or unlock state updates
    if (isEpisodeLocked) {
      if (videoRef.current) videoRef.current.pause();
      setIsPlaying(false);
    } else {
      trackEpisodeWatch(drama.id, currentEpisode);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  }, [currentEpisode, drama.id, isEpisodeLocked]);

  // Video Time updates & loop
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 105);
    }
  };

  const togglePlay = () => {
    if (isEpisodeLocked) {
      setActiveModal("vip");
      return;
    }
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // YouTube-style Long Press for 2x Speed
  const handlePointerDown = () => {
    if (isEpisodeLocked) return;
    longPressTimerRef.current = setTimeout(() => {
      if (videoRef.current) {
        prevSpeedRef.current = videoRef.current.playbackRate;
        videoRef.current.playbackRate = 2.0;
        setIsLongPressing2x(true);
      }
    }, 280); // trigger after 280ms press
  };

  const handlePointerUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    if (isLongPressing2x) {
      if (videoRef.current) {
        videoRef.current.playbackRate = playbackRate;
      }
      setIsLongPressing2x(false);
    }
  };

  const changeSpeed = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSpeedMenu(false);
    showToast(`Playback speed: ${rate}x`, "info");
  };

  const changeQuality = (quality) => {
    setVideoQuality(quality);
    setShowQualityMenu(false);
    showToast(`Video stream quality switched to: ${quality}`, "info");
  };

  // Dedicated in-player download button
  const handleDownloadEpisode = () => {
    if (isEpisodeLocked) {
      setActiveModal("vip");
      showToast("VIP membership is required to download premium episodes.", "error");
      return;
    }

    setIsDownloading(true);
    showToast(`Downloading "${drama.title} - Ep ${currentEpisode}" in ${videoQuality}...`, "info");

    setTimeout(() => {
      setIsDownloading(false);
      showToast(`✓ "${drama.title} - Episode ${currentEpisode}" downloaded in ${videoQuality} for offline streaming!`, "success");
    }, 1800);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${drama.title} - Ep ${currentEpisode}`,
        text: `Watch ${drama.title} on Drama Hub!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard! Share with friends to earn 100 coins.", "success");
    }
  };

  const isFav = myList.favorites.includes(drama.id);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none group"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseLeave={handlePointerUp}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={drama.videoUrl}
        poster={drama.cover || drama.poster}
        className="w-full h-full object-cover cursor-pointer"
        playsInline
        loop
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
      />

      {/* Subtitles Overlay at Fixed 2.5/6 (~41.67%) Canvas Height */}
      <SubtitleOverlay
        subtitles={drama.subtitles}
        currentTime={currentTime}
        language={subtitleLang}
        showWatermarkCleaner={cleanWatermark}
      />

      {/* YouTube Style 2X Speed HUD Badge Overlay */}
      {isLongPressing2x && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-40 px-4 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-pink-500/50 flex items-center gap-2 animate-pulse shadow-glow-pink">
          <FastForward className="w-4 h-4 text-pink-400 fill-pink-400" />
          <span className="text-xs font-black text-pink-400 tracking-wider">
            2X SPEED &gt;&gt;
          </span>
        </div>
      )}

      {/* Locked Overlay for Episode 11+ with 15 Coins Unlock & VIP Pass Options */}
      {isEpisodeLocked && (
        <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-pink-500 p-0.5 shadow-glow-pink mb-3">
            <div className="w-full h-full bg-[#13141f] rounded-2xl flex items-center justify-center">
              <Lock className="w-8 h-8 text-amber-400 animate-bounce" />
            </div>
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-pink-400 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 mb-2">
            Episode 11+ Unlock Options
          </span>
          <h3 className="text-xl font-black text-white mb-1.5">
            Episode {currentEpisode} is Locked
          </h3>
          <p className="text-xs text-slate-300 max-w-xs mb-5 leading-relaxed">
            Episodes 1 to 10 are completely free! Spend <span className="text-amber-400 font-bold">15 Coins</span> to permanently unlock this video, or subscribe to VIP for unlimited streaming across all series.
          </p>

          <div className="w-full max-w-xs space-y-2.5">
            {/* Option 1: Unlock with 15 Coins */}
            <button
              onClick={() => unlockEpisodeWithCoins(drama.id, currentEpisode)}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs shadow-lg shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-black" />
                <span>Unlock for 15 Coins</span>
              </div>
              <span className="text-[11px] font-bold bg-black/20 text-black px-2 py-0.5 rounded">
                Wallet: {user.coins} Coins
              </span>
            </button>

            {/* Option 2: Upgrade to VIP */}
            <button
              onClick={() => setActiveModal("vip")}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white font-black text-xs shadow-glow-pink hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Join VIP (Unlock All Unlimited)</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Header Bar inside Video */}
      <div className="absolute top-0 left-0 right-0 z-30 p-3 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/40 to-transparent">
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenEpisodeDrawer}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-xs font-bold text-white border border-white/10"
          >
            <span>Ep {currentEpisode} / {drama.totalEpisodes}</span>
            <ChevronDown className="w-3.5 h-3.5 text-pink-400" />
          </button>

          {currentEpisode <= 10 ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              FREE (Ep 1-10)
            </span>
          ) : !isEpisodeLocked ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" /> UNLOCKED
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-amber-400" /> 15 COINS / VIP
            </span>
          )}
        </div>

        {/* Top Right Controls: Quality Selector, Subtitles & Watermark Removal toggle */}
        <div className="flex items-center gap-1.5">
          {/* Video Quality Selector */}
          <div className="relative">
            <button
              onClick={() => setShowQualityMenu(!showQualityMenu)}
              className="px-2 py-0.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-[11px] font-bold text-slate-200 border border-white/10 flex items-center gap-1"
              title="Change Video Quality Resolution"
            >
              <span>{videoQuality}</span>
              <ChevronDown className="w-3 h-3 text-pink-400" />
            </button>

            {showQualityMenu && (
              <div className="absolute right-0 mt-2 w-36 glass-card rounded-xl p-1.5 shadow-2xl border border-white/10 z-50 animate-in fade-in">
                <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase">
                  Quality Resolution
                </div>
                {[
                  { label: "1080p (Full HD)", value: "1080p" },
                  { label: "720p (HD)", value: "720p" },
                  { label: "480p (SD)", value: "480p" },
                  { label: "Auto (Adaptive)", value: "Auto" }
                ].map((q) => (
                  <button
                    key={q.value}
                    onClick={() => changeQuality(q.value)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left ${
                      videoQuality === q.value
                        ? "bg-pink-500/20 text-pink-400 font-bold"
                        : "text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <span>{q.label}</span>
                    {videoQuality === q.value && <Check className="w-3 h-3 text-pink-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Watermark Cleaner toggle */}
          <button
            onClick={() => {
              setCleanWatermark(!cleanWatermark);
              showToast(
                !cleanWatermark
                  ? "AI Subtitle & Watermark Cleaner: ACTIVATED"
                  : "Watermark Cleaner: OFF",
                "info"
              );
            }}
            className={`p-1.5 rounded-full backdrop-blur-md text-xs font-bold border transition-colors ${
              cleanWatermark
                ? "bg-pink-600/80 border-pink-400 text-white"
                : "bg-black/60 border-white/10 text-slate-400"
            }`}
            title="Toggle AI Subtitle & Watermark Cleaner"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Subtitle Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowSubMenu(!showSubMenu)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-xs font-bold text-white border border-white/10"
              title="Subtitle Language"
            >
              <Languages className="w-3.5 h-3.5 text-pink-400" />
              <span className="uppercase text-[11px]">{subtitleLang}</span>
            </button>

            {showSubMenu && (
              <div className="absolute right-0 mt-2 w-36 glass-card rounded-xl p-1.5 shadow-2xl border border-white/10 z-50 animate-in fade-in">
                <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase">
                  Subtitles (2.5/6 Height)
                </div>
                {[
                  { code: "si", label: "සිංහල (Sinhala)" },
                  { code: "ta", label: "தமிழ் (Tamil)" },
                  { code: "en", label: "English" },
                  { code: "off", label: "Off" }
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setSubtitleLang(item.code);
                      setShowSubMenu(false);
                      showToast(`Subtitles set to: ${item.label}`, "info");
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left ${
                      subtitleLang === item.code
                        ? "bg-pink-500/20 text-pink-400 font-bold"
                        : "text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <span>{item.label}</span>
                    {subtitleLang === item.code && <Check className="w-3 h-3 text-pink-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Center Play/Pause indicator when paused */}
      {!isPlaying && !isEpisodeLocked && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 z-20 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-glow-pink hover:scale-110 transition-transform">
            <Play className="w-8 h-8 fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Right Side TikTok / DramaBox Style Floating Social Actions */}
      <div className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-3.5">
        {/* Like Button */}
        <button
          onClick={() => {
            setIsLiked(!isLiked);
            setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
          }}
          className="flex flex-col items-center gap-1 group/btn"
        >
          <div className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
            isLiked ? "bg-pink-600 text-white" : "bg-black/50 text-white hover:text-pink-400"
          }`}>
            <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
          </div>
          <span className="text-[10px] font-bold text-white drop-shadow">
            {likesCount.toLocaleString()}
          </span>
        </button>

        {/* Favorite / Bookmark */}
        <button
          onClick={() => toggleFavorite(drama.id)}
          className="flex flex-col items-center gap-1"
        >
          <div className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
            isFav ? "bg-pink-600 text-white" : "bg-black/50 text-white hover:text-pink-400"
          }`}>
            <Bookmark className={`w-5 h-5 ${isFav ? "fill-white" : ""}`} />
          </div>
          <span className="text-[10px] font-bold text-white drop-shadow">Save</span>
        </button>

        {/* Dedicated In-Player Download Button */}
        <button
          onClick={handleDownloadEpisode}
          disabled={isDownloading}
          className="flex flex-col items-center gap-1"
          title="Download Episode for Offline Viewing"
        >
          <div className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 transition-all border border-emerald-500/30">
            <Download className={`w-5 h-5 ${isDownloading ? "animate-bounce" : ""}`} />
          </div>
          <span className="text-[10px] font-bold text-emerald-300 drop-shadow">
            {isDownloading ? "Saving..." : "Save"}
          </span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1"
        >
          <div className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:text-pink-400 transition-all">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-white drop-shadow">Share</span>
        </button>

        {/* Speed Selector */}
        <div className="relative">
          <button
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            className="flex flex-col items-center gap-1"
          >
            <div className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-bold border border-white/10">
              {playbackRate}x
            </div>
            <span className="text-[10px] font-bold text-white drop-shadow">Speed</span>
          </button>

          {showSpeedMenu && (
            <div className="absolute right-10 bottom-0 w-28 glass-card rounded-xl p-1.5 shadow-2xl border border-white/10 z-50 animate-in fade-in">
              <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase">Speed</div>
              {[0.5, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => changeSpeed(rate)}
                  className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs ${
                    playbackRate === rate ? "text-pink-400 font-bold bg-pink-500/20" : "text-white"
                  }`}
                >
                  <span>{rate}x</span>
                  {playbackRate === rate && <Check className="w-3 h-3 text-pink-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Title & Synopsis Overlay */}
      <div className="absolute bottom-12 left-0 right-14 z-30 p-4 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none">
        <h4 className="text-sm font-extrabold text-white line-clamp-1 drop-shadow">
          {drama.title}
        </h4>
        <p className="text-[11px] text-slate-300 font-medium line-clamp-2 mt-0.5 leading-snug drop-shadow">
          {drama.description}
        </p>
      </div>

      {/* Bottom Controls Bar (Timeline & Mini Buttons) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-3 py-2 bg-black/90 flex flex-col gap-1.5">
        {/* Progress Timeline Slider */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-medium w-8">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => {
              const val = Number(e.target.value);
              setCurrentTime(val);
              if (videoRef.current) videoRef.current.currentTime = val;
            }}
            className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <span className="text-[10px] text-slate-400 font-medium w-8 text-right">
            {formatTime(duration)}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-1 rounded text-slate-200 hover:text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 rounded text-slate-200 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                if (currentEpisode > 1) onEpisodeChange(currentEpisode - 1);
              }}
              disabled={currentEpisode <= 1}
              className="px-2 py-0.5 rounded text-[11px] font-semibold text-slate-300 bg-white/5 disabled:opacity-30"
            >
              Prev
            </button>

            <button
              onClick={() => {
                if (currentEpisode < drama.totalEpisodes) onEpisodeChange(currentEpisode + 1);
              }}
              disabled={currentEpisode >= drama.totalEpisodes}
              className="px-2 py-0.5 rounded text-[11px] font-semibold text-slate-300 bg-white/5 disabled:opacity-30"
            >
              Next
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-1 rounded text-slate-200 hover:text-white"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
