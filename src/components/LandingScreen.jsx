import React from 'react';
import { Monitor, Smartphone, Send, ShieldCheck, Sparkles, FileText, CheckCheck, Camera } from 'lucide-react';

export default function LandingScreen({ onSelectMode }) {
  return (
    <div className="relative w-full h-full min-h-[100dvh] bg-[#0c131c] text-white flex flex-col justify-between overflow-y-auto overflow-x-hidden selection:bg-[#2481cc]/40 touch-pan-y -webkit-overflow-scrolling-touch">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#2481cc]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header / Brand */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2481cc] to-[#40a7e3] flex items-center justify-center shadow-lg shadow-[#2481cc]/30">
            <Send className="w-5 h-5 text-white -rotate-12 translate-x-[-1px] translate-y-[-1px]" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              Telegram <span className="text-[#40a7e3] font-medium text-xs px-2 py-0.5 rounded-full bg-[#2481cc]/20 border border-[#2481cc]/30">Simulator</span>
            </span>
            <p className="text-[11px] text-gray-400">Prank & Mockup Generator</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px]">In-Memory Only</span>
        </div>
      </header>

      {/* Main Hero & Selection Section */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-4 flex-1 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2481cc]/10 border border-[#2481cc]/30 text-[#40a7e3] text-xs font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Select an Interface to Begin</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          Fake Telegram Chat
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
          Choose your interface. Start with the authentic PC dark layout or the touch-optimized mobile smartphone layout.
        </p>

        {/* The Two Large Mode Selection Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl mb-8">
          {/* Option 1: Telegram Mobile */}
          <button
            onClick={() => onSelectMode('MOBILE')}
            className="group relative flex flex-col items-center p-6 sm:p-7 rounded-2xl bg-[#17212b]/95 border-2 border-white/10 hover:border-[#2481cc] active:scale-[0.98] transition-all duration-200 shadow-xl hover:shadow-2xl hover:shadow-[#2481cc]/25 text-left text-white"
          >
            <div className="absolute top-3.5 right-3.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#2481cc]/20 text-[#40a7e3] border border-[#2481cc]/30">
              Recommended for Phones
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2481cc]/20 to-[#17212b] border border-[#2481cc]/40 flex items-center justify-center text-[#40a7e3] mb-4 group-hover:scale-105 group-hover:bg-[#2481cc] group-hover:text-white transition-all shadow-inner">
              <Smartphone className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-bold text-white mb-1.5 text-center group-hover:text-[#40a7e3] transition-colors">
              Telegram Mobile (Phone)
            </h2>
            <p className="text-xs text-gray-400 text-center mb-5 leading-relaxed">
              Clean mobile interface with official dark blue doodle wallpaper, tap-to-delete, custom photo sending, and clean screenshot mode.
            </p>

            <div className="mt-auto w-full py-2.5 px-4 rounded-xl bg-[#2481cc] hover:bg-[#229ed9] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#2481cc]/30 transition-all">
              <span>Open Phone View</span>
              <span className="text-base">→</span>
            </div>
          </button>

          {/* Option 2: Telegram Desktop (PC) */}
          <button
            onClick={() => onSelectMode('PC')}
            className="group relative flex flex-col items-center p-6 sm:p-7 rounded-2xl bg-[#17212b]/95 border-2 border-white/10 hover:border-[#2481cc] active:scale-[0.98] transition-all duration-200 shadow-xl hover:shadow-2xl hover:shadow-[#2481cc]/25 text-left text-white"
          >
            <div className="absolute top-3.5 right-3.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-gray-400 group-hover:bg-[#2481cc]/20 group-hover:text-[#40a7e3] transition-colors">
              Desktop
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2481cc]/20 to-[#17212b] border border-[#2481cc]/40 flex items-center justify-center text-[#40a7e3] mb-4 group-hover:scale-105 group-hover:bg-[#2481cc] group-hover:text-white transition-all shadow-inner">
              <Monitor className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-bold text-white mb-1.5 text-center group-hover:text-[#40a7e3] transition-colors">
              Telegram Desktop (PC)
            </h2>
            <p className="text-xs text-gray-400 text-center mb-5 leading-relaxed">
              Wide-screen desktop Telegram layout with 350px sidebar, search bar, active chat highlight, and PC bubble styling.
            </p>

            <div className="mt-auto w-full py-2.5 px-4 rounded-xl bg-[#2481cc] hover:bg-[#229ed9] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#2481cc]/30 transition-all">
              <span>Open Desktop View</span>
              <span className="text-base">→</span>
            </div>
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] text-gray-400 pb-6">
          <div className="flex items-center gap-1.5 bg-[#17212b] px-2.5 py-1.5 rounded-lg border border-white/5">
            <Camera className="w-3.5 h-3.5 text-[#40a7e3]" />
            <span>Clean Screenshot Mode (Disappears on command)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#17212b] px-2.5 py-1.5 rounded-lg border border-white/5">
            <CheckCheck className="w-3.5 h-3.5 text-[#4fae4e]" />
            <span>Tap Any Message to Delete</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-4 text-[11px] text-gray-500 border-t border-white/5 shrink-0">
        Prank and design simulator tool. No personal data stored.
      </footer>
    </div>
  );
}
