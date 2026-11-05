import React, { useState, useEffect } from 'react';
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
  Camera,
  Download,
  EyeOff
} from 'lucide-react';
import html2canvas from 'html2canvas';

export default function PrankFloatingConsole({
  activeMode,
  onChangeMode,
  onOpenControls,
  onLoadScreenshotPreset,
  isFullscreen,
  onToggleFullscreen,
  onStartCleanScreenMode,
  isCleanScreenActive
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);

  // 1-Click capture and download PNG of the clean chat using html2canvas
  const handleDownloadScreenshot = async () => {
    try {
      setIsCapturing(true);
      // Find the active chat element
      const targetElem = document.getElementById(
        activeMode === 'MOBILE' ? 'telegram-mobile-viewport' : 'telegram-pc-chat-area'
      ) || document.body;

      // Small delay to let any active hover states clear
      await new Promise(r => setTimeout(r, 150));

      const canvas = await html2canvas(targetElem, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: activeMode === 'MOBILE' ? '#0e1621' : '#0f0f0f',
        scale: window.devicePixelRatio || 2,
        logging: false
      });

      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `telegram_fake_chat_${Date.now()}.png`;
      a.click();
    } catch (err) {
      console.error('Screenshot download error:', err);
    } finally {
      setIsCapturing(false);
    }
  };

  // If Clean Screen Mode is active, HIDE EVERYTHING so phone screenshot is 100% pristine!
  if (isCleanScreenActive) {
    return null;
  }

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
          <div className="flex flex-wrap items-center justify-end gap-1.5 p-1.5 rounded-2xl bg-[#17212b]/95 border border-white/10 shadow-2xl backdrop-blur-md max-w-[290px] sm:max-w-none">
            {/* 1. Clean Screenshot for Hardware Keys (Hides everything for 7 seconds) */}
            <button
              onClick={onStartCleanScreenMode}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/25 transition-all"
              title="Hide all console buttons for 7 seconds to take screenshot with phone buttons"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Clean Screen (7s)</span>
            </button>

            {/* 2. Direct PNG Download */}
            <button
              onClick={handleDownloadScreenshot}
              disabled={isCapturing}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-[#40a7e3] text-xs font-semibold flex items-center gap-1 transition-all"
              title="Download instant clean PNG"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isCapturing ? 'Saving...' : 'Save PNG'}</span>
            </button>

            {/* 3. Open Full Controls */}
            <button
              onClick={() => onOpenControls('message')}
              className="px-2.5 py-1.5 rounded-xl bg-[#2481cc] hover:bg-[#229ed9] active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#2481cc]/30 transition-all"
              title="Open Controls to customize contact or add media"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Controls</span>
            </button>

            {/* 4. Switch between Phone & PC */}
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

            {/* 5. Fullscreen Toggle */}
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

            {/* 6. Reset Preset */}
            <button
              onClick={onLoadScreenshotPreset}
              className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-amber-300 text-xs font-medium flex items-center gap-1 transition-all"
              title="Reload screenshot replica"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
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
