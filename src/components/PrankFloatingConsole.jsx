import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Maximize2, 
  Minimize2, 
  Plus, 
  ChevronRight, 
  ChevronLeft,
  Settings,
  HelpCircle
} from 'lucide-react';

export default function PrankFloatingConsole({
  activeMode,
  onChangeMode,
  onOpenControls,
  onLoadScreenshotPreset,
  isFullscreen,
  onToggleFullscreen
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed top-14 right-2 sm:right-4 z-50 flex flex-col items-end gap-1.5 font-sans pointer-events-auto select-none">
      {/* Main Console Bar */}
      {isExpanded ? (
        <div className="flex flex-col items-end gap-1.5 animate-fadeIn">
          {/* Top Pill with Title and Collapse Button */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e2530]/95 border border-[#2481cc]/50 shadow-2xl backdrop-blur-md text-white text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold tracking-tight text-[#40a7e3]">Prank Console</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-0.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Minimize console"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action Buttons Cluster */}
          <div className="flex flex-wrap items-center justify-end gap-1.5 p-1.5 rounded-2xl bg-[#17212b]/95 border border-white/10 shadow-2xl backdrop-blur-md max-w-[280px] sm:max-w-none">
            {/* 1. Open Full Controls */}
            <button
              onClick={() => onOpenControls('message')}
              className="px-2.5 py-1.5 rounded-xl bg-[#2481cc] hover:bg-[#229ed9] active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#2481cc]/30 transition-all"
              title="Open Controls to add messages, media or edit contact"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Controls</span>
            </button>

            {/* 2. Quick Add Media/Msg */}
            <button
              onClick={() => onOpenControls('message')}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-medium flex items-center gap-1 transition-all"
              title="Add Image, Video or Audio"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Add Media</span>
            </button>

            {/* 3. Switch between Phone & PC */}
            <button
              onClick={() => {
                const nextMode = activeMode === 'MOBILE' ? 'PC' : 'MOBILE';
                onChangeMode(nextMode);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Switch between Phone & PC View"
            >
              {activeMode === 'MOBILE' ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-[#40a7e3]" />
                  <span>PC View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-[#40a7e3]" />
                  <span>Phone View</span>
                </>
              )}
            </button>

            {/* 4. Fullscreen Toggle */}
            <button
              onClick={onToggleFullscreen}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1 transition-all active:scale-95 ${
                isFullscreen 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-white/10 text-white border-transparent hover:bg-white/20'
              }`}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit Full</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Fullscreen</span>
                </>
              )}
            </button>

            {/* 5. Screenshot Preset Match */}
            <button
              onClick={onLoadScreenshotPreset}
              className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-amber-300 text-xs font-medium flex items-center gap-1 transition-all"
              title="Reload screenshot replica"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Preset</span>
            </button>
          </div>
        </div>
      ) : (
        /* Collapsed Floating Trigger Chip */
        <button
          onClick={() => setIsExpanded(true)}
          className="group flex items-center gap-2 px-3 py-2 rounded-full bg-[#2481cc] hover:bg-[#229ed9] active:scale-95 text-white text-xs font-bold shadow-2xl shadow-[#2481cc]/50 border border-white/20 transition-all"
          title="Open Prank Console"
        >
          <Sliders className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Prank Console</span>
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}

