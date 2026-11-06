import React, { useState } from 'react';
import { X, ShieldAlert } from 'lucide-react';

export default function BlockUserModal({ isOpen, onClose, onConfirmBlock, userName = 'this user' }) {
  const [reportSpam, setReportSpam] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn select-none font-sans">
      <div 
        className="w-full max-w-sm bg-[#212d3b] border border-white/10 rounded-2xl shadow-2xl p-5 flex flex-col gap-3 text-white animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 text-red-400">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <h3 className="font-bold text-base text-white">Block User</h3>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          Do you want to block <strong className="text-white">{userName}</strong>? They will not be able to send you messages or see your profile picture.
        </p>

        <label className="flex items-center gap-2 pt-1 text-xs text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={reportSpam}
            onChange={(e) => setReportSpam(e.target.checked)}
            className="w-4 h-4 rounded text-red-500 bg-[#17212b] border-white/10 focus:ring-0"
          />
          <span>Report Spam and delete chat history</span>
        </label>

        <div className="pt-3 flex items-center justify-end gap-2 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmBlock();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-xs font-bold text-white shadow-lg shadow-red-600/30 transition-all"
          >
            Block User
          </button>
        </div>
      </div>
    </div>
  );
}
