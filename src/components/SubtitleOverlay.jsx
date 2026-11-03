import React from "react";

export default function SubtitleOverlay({
  subtitles,
  currentTime,
  language = "en",
  showWatermarkCleaner = false
}) {
  if (!subtitles || language === "off") return null;

  const currentTrack = subtitles[language] || subtitles["en"] || [];
  
  // Find matching subtitle for currentTime
  const activeSubtitle = currentTrack.find(
    (item) => currentTime >= item.start && currentTime <= item.end
  );

  // Vertical position is explicitly fixed at 2.5 / 6 (~ 41.67% from the top of the video canvas)
  return (
    <>
      {/* Optional AI Watermark / Original Subtitle Eraser Blur Filter */}
      {showWatermarkCleaner && (
        <div
          className="absolute top-4 right-4 z-20 pointer-events-none px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-pink-500/30 flex items-center gap-1.5"
          title="Watermark & embedded hardcoded logo cleaned by Snap Reel AI"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
            AI Cleaned
          </span>
        </div>
      )}

      {/* Subtitle Display Overlay at Fixed 2.5 / 6 Canvas Height (~41.67%) */}
      {activeSubtitle && (
        <div
          className="absolute left-0 right-0 z-30 pointer-events-none px-4 flex justify-center text-center transition-opacity duration-200"
          style={{ top: "41.67%" }}
        >
          <div className="max-w-[85%] sm:max-w-[75%] px-4 py-2 rounded-xl bg-black/70 backdrop-blur-sm border border-white/10 shadow-2xl">
            <p
              className={`text-white font-bold text-sm sm:text-base md:text-lg leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
                language === "si" ? "font-sinhala" : language === "ta" ? "font-tamil" : ""
              }`}
              style={{
                textShadow: "0 2px 5px rgba(0,0,0,0.95), 0 0 2px #000"
              }}
            >
              {activeSubtitle.text}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
