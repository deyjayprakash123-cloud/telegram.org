import React from 'react';
import { Monitor, Smartphone, Send, ShieldCheck, Sparkles, FileText, CheckCheck } from 'lucide-react';

export default function LandingScreen({ onSelectMode }) {
  return (
    <div className="relative min-h-screen w-full bg-[#0c131c] text-white flex flex-col justify-between overflow-y-auto selection:bg-[#2481cc]/40">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#2481cc]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header / Brand */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#2481cc] to-[#40a7e3] flex items-center justify-center shadow-lg shadow-[#2481cc]/30">
            <Send className="w-5 h-5 text-white -rotate-12 translate-x-[-1px] translate-y-[-1px]" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
              Telegram <span className="text-[#40a7e3] font-medium text-sm px-2 py-0.5 rounded-full bg-[#2481cc]/20 border border-[#2481cc]/30">Generator</span>
            </span>
            <p className="text-xs text-gray-400">Authentic UI Prank & Mockup Tool</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>No Storage • Blank Canvas</span>
        </div>
      </header>

      {/* Main Hero & Selection Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-6 flex-1 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2481cc]/10 border border-[#2481cc]/30 text-[#40a7e3] text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vercel Ready • 100% In-Memory Simulator</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Fake Telegram Chat Generator
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-12">
          Choose an interface to get started. Both modes launch with a clean blank slate ready for your custom contacts, messages, and fake documents.
        </p>

        {/* The Two Large Mode Selection Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
          {/* Option 1: Telegram Desktop (PC) */}
          <button
            onClick={() => onSelectMode('PC')}
            className="group relative flex flex-col items-center p-8 rounded-2xl bg-[#17212b]/90 border-2 border-white/10 hover:border-[#2481cc] transition-all duration-300 hover:shadow-2xl hover:shadow-[#2481cc]/25 hover:-translate-y-1.5 text-left text-white"
          >
            <div className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-gray-400 group-hover:bg-[#2481cc]/20 group-hover:text-[#40a7e3] transition-colors">
              Desktop
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2481cc]/20 to-[#17212b] border border-[#2481cc]/40 flex items-center justify-center text-[#40a7e3] mb-6 group-hover:scale-110 group-hover:bg-[#2481cc] group-hover:text-white transition-all shadow-inner">
              <Monitor className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 text-center group-hover:text-[#40a7e3] transition-colors">
              Telegram Desktop (PC)
            </h2>
            <p className="text-sm text-gray-400 text-center mb-6 leading-relaxed">
              Standard wide-screen desktop interface with 350px left sidebar, Telegram dark doodle wallpaper, and native desktop chat layout.
            </p>

            <div className="mt-auto w-full py-3 px-4 rounded-xl bg-[#2481cc] hover:bg-[#229ed9] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2481cc]/30 transition-all">
              <span>Launch Blank Desktop</span>
              <span className="text-lg">→</span>
            </div>
          </button>

          {/* Option 2: Telegram Mobile */}
          <button
            onClick={() => onSelectMode('MOBILE')}
            className="group relative flex flex-col items-center p-8 rounded-2xl bg-[#17212b]/90 border-2 border-white/10 hover:border-[#2481cc] transition-all duration-300 hover:shadow-2xl hover:shadow-[#2481cc]/25 hover:-translate-y-1.5 text-left text-white"
          >
            <div className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-gray-400 group-hover:bg-[#2481cc]/20 group-hover:text-[#40a7e3] transition-colors">
              Mobile App
            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2481cc]/20 to-[#17212b] border border-[#2481cc]/40 flex items-center justify-center text-[#40a7e3] mb-6 group-hover:scale-110 group-hover:bg-[#2481cc] group-hover:text-white transition-all shadow-inner">
              <Smartphone className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 text-center group-hover:text-[#40a7e3] transition-colors">
              Telegram Mobile
            </h2>
            <p className="text-sm text-gray-400 text-center mb-6 leading-relaxed">
              Touch-optimized mobile Telegram interface with Android/iOS status bar, chat list, message conversation, and quick FAB control button.
            </p>

            <div className="mt-auto w-full py-3 px-4 rounded-xl bg-[#2481cc] hover:bg-[#229ed9] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2481cc]/30 transition-all">
              <span>Launch Blank Mobile</span>
              <span className="text-lg">→</span>
            </div>
          </button>
        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1.5 bg-[#17212b] px-3 py-1.5 rounded-lg border border-white/5">
            <CheckCheck className="w-4 h-4 text-[#40a7e3]" />
            <span>Double-check Read Receipts</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#17212b] px-3 py-1.5 rounded-lg border border-white/5">
            <FileText className="w-4 h-4 text-[#4fae4e]" />
            <span>Smart Documents (&gt;100MB vs &lt;100MB)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#17212b] px-3 py-1.5 rounded-lg border border-white/5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>1-Click Fullscreen Screenshot Mode</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-6 text-xs text-gray-500 border-t border-white/5">
        Prank & Mockup generator for entertainment and creative design purposes. No data is stored or transmitted.
      </footer>
    </div>
  );
}

