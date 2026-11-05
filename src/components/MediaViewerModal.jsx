import React from 'react';
import { X, Download, Play, Share2, MoreVertical, ChevronLeft } from 'lucide-react';

export default function MediaViewerModal({ media, onClose, chatName = 'Samir Patra' }) {
  if (!media) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-fadeIn font-sans">
      {/* Top Header Bar */}
      <header className="h-16 px-4 flex items-center justify-between text-white border-b border-white/10 bg-black/40 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/10 active:bg-white/20 flex items-center justify-center transition-colors"
            title="Close viewer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h3 className="font-semibold text-sm leading-tight text-white">{chatName}</h3>
            <p className="text-xs text-gray-400">{media.timestamp || 'Today at 6:37 PM'}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-300">
          <button 
            onClick={() => {
              const a = document.createElement('a');
              a.href = media.url;
              a.download = 'telegram_media';
              a.click();
            }}
            className="w-10 h-10 rounded-full hover:bg-white/10 active:bg-white/20 flex items-center justify-center" 
            title="Download"
          >
            <Download className="w-5 h-5" />
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Image / Video View Canvas */}
      <div 
        className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden cursor-pointer"
        onClick={onClose}
      >
        <div 
          className="relative max-w-full max-h-[80vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={media.url}
            alt="Fullscreen view"
            className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10 select-none"
          />

          {/* If video: show large play button */}
          {media.isVideo && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-2xl">
                <Play className="w-8 h-8 fill-white translate-x-1" />
              </div>
            </div>
          )}

          {/* Duration badge if video */}
          {media.duration && (
            <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-white text-xs font-semibold">
              <span>{media.duration}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Caption */}
      {media.caption && (
        <footer className="p-4 bg-black/60 border-t border-white/10 text-center text-sm text-white max-w-2xl mx-auto w-full shrink-0">
          <p>{media.caption}</p>
        </footer>
      )}
    </div>
  );
}

