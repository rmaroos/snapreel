import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  List,
  Sparkles,
  Info,
  Tv
} from "lucide-react";
import VideoPlayer from "../components/VideoPlayer";
import EpisodeDrawer from "../components/EpisodeDrawer";
import { useApp } from "../context/AppContext";

export default function ForYouPage({ selectedDrama, onSelectDrama }) {
  const { dramas } = useApp();

  const [currentDramaIndex, setCurrentDramaIndex] = useState(() => {
    if (selectedDrama) {
      const idx = dramas.findIndex((d) => d.id === selectedDrama.id);
      return idx !== -1 ? idx : 0;
    }
    return 0;
  });

  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeDrama = dramas[currentDramaIndex] || dramas[0];

  const handleNextDrama = () => {
    if (currentDramaIndex < dramas.length - 1) {
      setCurrentDramaIndex(currentDramaIndex + 1);
      setCurrentEpisode(1);
    } else {
      // Loop back to first
      setCurrentDramaIndex(0);
      setCurrentEpisode(1);
    }
  };

  const handlePrevDrama = () => {
    if (currentDramaIndex > 0) {
      setCurrentDramaIndex(currentDramaIndex - 1);
      setCurrentEpisode(1);
    } else {
      // Go to last
      setCurrentDramaIndex(dramas.length - 1);
      setCurrentEpisode(1);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-2 sm:p-4 pb-24 select-none">
      
      {/* Top series indicator bar */}
      <div className="w-full max-w-md flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <span className="text-xs font-bold text-white tracking-tight">
            For You Short Drama Feed
          </span>
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 border border-white/10"
        >
          <List className="w-3.5 h-3.5 text-pink-400" />
          <span>All Episodes ({activeDrama?.totalEpisodes})</span>
        </button>
      </div>

      {/* Main Vertical Player Container */}
      <div className="relative w-full max-w-md flex justify-center">
        {activeDrama ? (
          <VideoPlayer
            drama={activeDrama}
            currentEpisode={currentEpisode}
            onEpisodeChange={(ep) => setCurrentEpisode(ep)}
            onOpenEpisodeDrawer={() => setDrawerOpen(true)}
          />
        ) : (
          <div className="text-center py-20 text-slate-400">
            <Tv className="w-12 h-12 text-slate-600 mx-auto mb-2" />
            <p>No dramas available.</p>
          </div>
        )}

        {/* Up / Down Drama Switcher Float Buttons (Desktop / Tablet) */}
        <div className="hidden md:flex flex-col gap-2 absolute -right-16 top-1/2 -translate-y-1/2">
          <button
            onClick={handlePrevDrama}
            className="p-3 rounded-full bg-white/10 hover:bg-pink-600 text-white backdrop-blur-md border border-white/10 transition-colors shadow-lg"
            title="Previous Drama"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextDrama}
            className="p-3 rounded-full bg-white/10 hover:bg-pink-600 text-white backdrop-blur-md border border-white/10 transition-colors shadow-lg"
            title="Next Drama"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Episode Drawer */}
      <EpisodeDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        drama={activeDrama}
        currentEpisode={currentEpisode}
        onSelectEpisode={(ep) => setCurrentEpisode(ep)}
      />
    </div>
  );
}
