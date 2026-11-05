import React from 'react';
import { Trash2, Copy, Eye, X, CornerDownLeft } from 'lucide-react';

export default function MessageActionMenu({
  message,
  onClose,
  onDelete,
  onViewMedia
}) {
  if (!message) return null;

  const hasMedia = message.isSingleMedia || message.isMediaGrid;

  const handleCopy = () => {
    const textToCopy = message.text || (message.document?.fileName) || 'Telegram message';
    navigator.clipboard?.writeText(textToCopy);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn select-none font-sans"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xs bg-[#212d3b] border border-white/10 rounded-2xl shadow-2xl p-2.5 flex flex-col gap-1 text-white animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-300">Message Actions</span>
          <span className="text-[11px] text-gray-400">{message.timestamp || '6:35 PM'}</span>
        </div>

        {/* View Media (if image/video) */}
        {hasMedia && (
          <button
            onClick={() => {
              if (message.isSingleMedia) {
                onViewMedia({
                  url: message.mediaUrl,
                  isVideo: message.isVideo,
                  duration: message.videoDuration,
                  caption: message.text,
                  timestamp: message.timestamp
                });
              } else if (message.isMediaGrid && message.mediaItems?.[0]) {
                onViewMedia({
                  url: message.mediaItems[0].url,
                  isVideo: message.mediaItems[0].isVideo,
                  duration: message.mediaItems[0].duration,
                  caption: message.text,
                  timestamp: message.timestamp
                });
              }
              onClose();
            }}
            className="w-full px-3 py-2.5 rounded-xl hover:bg-white/10 active:bg-white/20 text-xs font-medium text-left flex items-center gap-2.5 text-[#40a7e3] transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>View Photo / Video Fullscreen</span>
          </button>
        )}

        {/* Copy Text */}
        {message.text && (
          <button
            onClick={handleCopy}
            className="w-full px-3 py-2.5 rounded-xl hover:bg-white/10 active:bg-white/20 text-xs font-medium text-left flex items-center gap-2.5 text-gray-200 transition-colors"
          >
            <Copy className="w-4 h-4 text-gray-400" />
            <span>Copy Text</span>
          </button>
        )}

        {/* Delete Message */}
        <button
          onClick={() => {
            onDelete(message.id);
            onClose();
          }}
          className="w-full px-3 py-2.5 rounded-xl hover:bg-red-500/20 active:bg-red-500/30 text-xs font-semibold text-left flex items-center gap-2.5 text-red-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Message</span>
        </button>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-center text-gray-400 transition-colors mt-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
