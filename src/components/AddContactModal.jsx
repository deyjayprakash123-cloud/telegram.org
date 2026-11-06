import React, { useState } from 'react';
import { X, UserPlus, Check } from 'lucide-react';

export default function AddContactModal({ isOpen, onClose, onSave, defaultPhone = '+91 98765 43210', initialName = '' }) {
  const [firstName, setFirstName] = useState(initialName || '');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(defaultPhone || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || phoneNumber;
    onSave({
      name: fullName,
      phoneNumber: phoneNumber.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn select-none font-sans">
      <div 
        className="w-full max-w-sm bg-[#212d3b] border border-white/10 rounded-2xl shadow-2xl p-5 flex flex-col gap-4 text-white animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#2481cc]" />
            <h3 className="font-bold text-base text-white">Add to Contacts</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] text-gray-300 font-medium mb-1">First Name</label>
            <input
              type="text"
              placeholder="e.g. Samir"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-[#17212b] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#2481cc]"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[11px] text-gray-300 font-medium mb-1">Last Name (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Patra"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-[#17212b] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#2481cc]"
            />
          </div>

          <div>
            <label className="block text-[11px] text-gray-300 font-medium mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="+91 98765 43210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-[#17212b] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#2481cc]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#2481cc] hover:bg-[#229ed9] active:scale-95 text-xs font-bold text-white flex items-center gap-1.5 shadow-lg shadow-[#2481cc]/30 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Done</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
