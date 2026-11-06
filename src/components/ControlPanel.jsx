import React, { useState, useEffect } from 'react';
import { 
  X, 
  Maximize2, 
  Plus, 
  Send, 
  FileText, 
  UserPlus, 
  Settings, 
  Monitor, 
  Smartphone, 
  Trash2, 
  Upload, 
  Clock, 
  CheckCheck, 
  Check, 
  AlertCircle, 
  Home, 
  RefreshCw, 
  FolderArchive, 
  Image as ImageIcon, 
  Sparkles, 
  Play, 
  Film,
  Globe,
  Calendar,
  PhoneCall
} from 'lucide-react';
import { formatTime } from '../utils/telegramColors';
import { COUNTRY_OPTIONS } from '../utils/countryData';

export default function ControlPanel({
  isOpen,
  onClose,
  initialTab = 'message',
  activeMode,
  onChangeMode,
  chats,
  activeChatId,
  onSelectChat,
  onAddChat,
  onUpdateChat,
  onDeleteChat,
  onClearChatMessages,
  onAddMessage,
  onEnterFullscreen,
  onResetAll,
  onLoadScreenshotPreset
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'message');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Message Form State
  const [msgSender, setMsgSender] = useState('in'); // 'in' | 'out'
  const [msgType, setMsgType] = useState('image'); // 'text' | 'image' | 'video' | 'document' | 'mediaGrid'
  const [msgText, setMsgText] = useState('');
  const [msgTime, setMsgTime] = useState('6:35 PM');
  const [msgStatus, setMsgStatus] = useState('read'); // 'sent' | 'read'
  
  // Custom Image / Video State
  const [customMediaUrl, setCustomMediaUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState('1:38');

  // Document Form State
  const [docName, setDocName] = useState('0111.wav');
  const [docSize, setDocSize] = useState('3.7'); // MB
  const [docFormat, setDocFormat] = useState('wav');

  // New Chat Form State
  const [newChatName, setNewChatName] = useState('Samir Patra 🦁');
  const [newChatPhone, setNewChatPhone] = useState('+91 98765 43210');
  const [newChatCountry, setNewChatCountry] = useState('India');
  const [newChatFlag, setNewChatFlag] = useState('🇮🇳');
  const [newChatRegDate, setNewChatRegDate] = useState('February 2021');
  const [newChatStatus, setNewChatStatus] = useState('last seen recently');
  const [newChatVerified, setNewChatVerified] = useState(false);
  const [newChatAvatar, setNewChatAvatar] = useState('/presets/mobile_avatar.jpg');
  const [showBanner, setShowBanner] = useState(true);
  const [showInfoCard, setShowInfoCard] = useState(true);
  const [isOfficialAccount, setIsOfficialAccount] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId);

  // Handle Country selection
  const handleCountryChange = (countryName) => {
    const found = COUNTRY_OPTIONS.find(c => c.name === countryName);
    if (found) {
      setNewChatCountry(found.name);
      setNewChatFlag(found.flag);
      if (!newChatPhone.trim() || newChatPhone.startsWith('+')) {
        setNewChatPhone(`${found.code} `);
      }
    }
  };

  // Handle Image / Thumbnail file upload (converts to Data URL for instant in-memory rendering)
  const handleMediaUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Message Handler
  const handleCreateMessage = (e) => {
    e.preventDefault();
    if (!activeChatId) {
      alert('Please select or create a chat first.');
      return;
    }

    let payload = {
      chatId: activeChatId,
      sender: msgSender,
      text: msgText.trim(),
      timestamp: msgTime || formatTime(),
      status: msgStatus,
    };

    if (msgType === 'text') {
      if (!msgText.trim()) {
        alert('Please enter message text.');
        return;
      }
    } else if (msgType === 'image') {
      payload.isSingleMedia = true;
      payload.isVideo = false;
      payload.mediaUrl = customMediaUrl || '/presets/mobile_vid_left.jpg';
    } else if (msgType === 'video') {
      payload.isSingleMedia = true;
      payload.isVideo = true;
      payload.mediaUrl = customMediaUrl || '/presets/mobile_vid_right.jpg';
      payload.videoDuration = videoDuration.trim() || '0:45';
    } else if (msgType === 'document') {
      payload.isDocument = true;
      payload.document = {
        fileName: docName.trim() || 'File',
        fileSize: parseFloat(docSize) || 0,
        format: docFormat.toLowerCase().trim() || 'wav'
      };
    } else if (msgType === 'mediaGrid') {
      payload.isMediaGrid = true;
      payload.mediaItems = [
        {
          url: '/presets/mobile_vid_left.jpg',
          duration: '1:38',
          isVideo: true
        },
        {
          url: '/presets/mobile_vid_right.jpg',
          duration: '0:23',
          isVideo: true
        }
      ];
    }

    onAddMessage(payload);
    setMsgText('');
  };

  // Create New Chat Handler
  const handleCreateChat = (e) => {
    e.preventDefault();
    const displayName = newChatName.trim();
    const phone = newChatPhone.trim();

    if (!displayName && !phone) {
      alert('Please enter either a Contact Name or a Phone Number.');
      return;
    }

    onAddChat({
      name: displayName, // If empty, will show phone!
      phoneNumber: phone || '+91 98765 43210',
      countryName: newChatCountry,
      countryFlag: newChatFlag,
      registrationDate: newChatRegDate,
      avatar: newChatAvatar,
      isOnline: newChatStatus.toLowerCase() === 'online',
      lastSeenText: newChatStatus,
      isVerified: newChatVerified,
      showContactBanner: !displayName || showBanner, // automatically show banner if no name given
      showInfoCard: showInfoCard,
      isOfficialAccount: isOfficialAccount,
      unreadCount: 0,
      messages: []
    });

    setNewChatName('');
    setNewChatAvatar('');
    setActiveTab('message');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-fadeIn">
      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#1e1e1e] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-white font-sans">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#252525] border-b border-black/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2481cc] flex items-center justify-center text-white shadow-md">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">Controls & Contact Details</h2>
              <p className="text-[11px] text-gray-400">Edit contact name, phone number, flag, registration date & media</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Match Screenshot Action */}
        <div className="p-3.5 bg-gradient-to-r from-[#2481cc]/25 via-[#252525] to-[#2481cc]/15 border-b border-[#2481cc]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left w-full sm:w-auto">
            <span className="text-xs font-bold text-[#40a7e3] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Reset / Reload Screenshot Template
            </span>
            <p className="text-[11px] text-gray-300">
              Loads Samir Patra, 🇮🇳 India, February 2021 registration, and the video clips.
            </p>
          </div>
          <button
            onClick={() => {
              onLoadScreenshotPreset();
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#2481cc] hover:bg-[#229ed9] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#2481cc]/30 active:scale-95 transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reload Screenshot</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#1e1e1e] px-4 pt-2 gap-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('message')}
            className={`px-3.5 py-2 rounded-t-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'message'
                ? 'bg-[#252525] text-[#40a7e3] border-b-2 border-[#2481cc] font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Message & Media</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3.5 py-2 rounded-t-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-[#252525] text-[#40a7e3] border-b-2 border-[#2481cc] font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Contact Info & Flags ({chats.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('display')}
            className={`px-3.5 py-2 rounded-t-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'display'
                ? 'bg-[#252525] text-[#40a7e3] border-b-2 border-[#2481cc] font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>App Mode</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* ================= TAB 1: ADD MESSAGE ================= */}
          {activeTab === 'message' && (
            <form onSubmit={handleCreateMessage} className="space-y-4">
              {/* Select Destination Chat */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Destination Chat
                </label>
                {chats.length === 0 ? (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>No chats exist yet. Use "Reload Screenshot" above or create one!</span>
                  </div>
                ) : (
                  <select
                    value={activeChatId || ''}
                    onChange={(e) => onSelectChat(e.target.value)}
                    className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#2481cc]"
                  >
                    {chats.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name || c.phoneNumber || 'Contact'} ({c.isOnline ? 'Online' : 'Offline'}) - {c.messages.length} msgs
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Sender Toggle (Incoming vs Outgoing) */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMsgSender('in')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    msgSender === 'in'
                      ? 'bg-[#212d3b] text-[#40a7e3] border-[#2481cc] shadow-md'
                      : 'bg-[#2a2a2a] text-gray-400 border-white/5 hover:bg-[#333]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#40a7e3]" />
                  <span>Incoming (Left Bubble)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMsgSender('out')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    msgSender === 'out'
                      ? 'bg-[#2b5278] text-white border-white shadow-md'
                      : 'bg-[#2a2a2a] text-gray-400 border-white/5 hover:bg-[#333]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Outgoing (Right Bubble)</span>
                </button>
              </div>

              {/* Message Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Content Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 rounded-lg bg-[#2a2a2a] p-1 border border-white/5 text-xs">
                  <button
                    type="button"
                    onClick={() => setMsgType('image')}
                    className={`py-1.5 rounded-md font-medium transition-all flex items-center justify-center gap-1 ${
                      msgType === 'image' ? 'bg-[#2481cc] text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMsgType('video')}
                    className={`py-1.5 rounded-md font-medium transition-all flex items-center justify-center gap-1 ${
                      msgType === 'video' ? 'bg-[#2481cc] text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Video</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMsgType('text')}
                    className={`py-1.5 rounded-md font-medium transition-all flex items-center justify-center gap-1 ${
                      msgType === 'text' ? 'bg-[#2481cc] text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>Text</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMsgType('document')}
                    className={`py-1.5 rounded-md font-medium transition-all flex items-center justify-center gap-1 ${
                      msgType === 'document' ? 'bg-[#2481cc] text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Audio/Doc</span>
                  </button>
                </div>
              </div>

              {/* Photo Input */}
              {msgType === 'image' && (
                <div className="p-3.5 bg-[#252525] border border-white/10 rounded-xl space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-[#2a2a2a] hover:bg-[#333] border border-white/10 text-xs text-white font-medium flex items-center gap-2 shadow-sm">
                      <Upload className="w-3.5 h-3.5 text-[#40a7e3]" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleMediaUpload(e, setCustomMediaUrl)}
                      />
                    </label>

                    {customMediaUrl && (
                      <div className="flex items-center gap-2">
                        <img src={customMediaUrl} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-white/20" />
                        <button
                          type="button"
                          onClick={() => setCustomMediaUrl('')}
                          className="text-[11px] text-red-400 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Caption text:</label>
                    <input
                      type="text"
                      placeholder="Add an optional text caption..."
                      value={msgText}
                      onChange={(e) => setMsgText(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#2481cc]"
                    />
                  </div>
                </div>
              )}

              {/* Video Input */}
              {msgType === 'video' && (
                <div className="p-3.5 bg-[#252525] border border-white/10 rounded-xl space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-[#2a2a2a] hover:bg-[#333] border border-white/10 text-xs text-white font-medium flex items-center gap-2 shadow-sm">
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Upload Thumbnail</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleMediaUpload(e, setCustomMediaUrl)}
                      />
                    </label>

                    {customMediaUrl && (
                      <div className="relative">
                        <img src={customMediaUrl} alt="Thumbnail" className="w-12 h-12 rounded-lg object-cover border border-white/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-3 h-3 fill-white text-white drop-shadow" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-300 mb-1">Duration Pill (e.g. 1:38, 0:45):</label>
                    <input
                      type="text"
                      placeholder="1:38"
                      value={videoDuration}
                      onChange={(e) => setVideoDuration(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Caption:</label>
                    <input
                      type="text"
                      placeholder="Optional caption..."
                      value={msgText}
                      onChange={(e) => setMsgText(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Text Input */}
              {msgType === 'text' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Message Text
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Hiii"
                    value={msgText}
                    onChange={(e) => setMsgText(e.target.value)}
                    className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#2481cc]"
                  />
                </div>
              )}

              {/* Document / Audio */}
              {msgType === 'document' && (
                <div className="p-3.5 bg-[#252525] border border-white/10 rounded-xl space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">File Name</label>
                      <input
                        type="text"
                        placeholder="0111.wav"
                        value={docName}
                        onChange={(e) => setDocName(e.target.value)}
                        className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Size (MB)</label>
                      <input
                        type="number"
                        placeholder="3.7"
                        value={docSize}
                        onChange={(e) => setDocSize(e.target.value)}
                        className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Format</label>
                      <input
                        type="text"
                        placeholder="wav, mp3, pdf..."
                        value={docFormat}
                        onChange={(e) => setDocFormat(e.target.value)}
                        className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>Timestamp</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setMsgTime(formatTime().replace(/^[0:]+/, ''))}
                      className="text-[11px] text-[#40a7e3] hover:underline"
                    >
                      Now
                    </button>
                  </div>
                  <input
                    type="text"
                    value={msgTime}
                    onChange={(e) => setMsgTime(e.target.value)}
                    placeholder="6:35 PM"
                    className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#2481cc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Read Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMsgStatus('read')}
                      className={`py-2 px-2 rounded-lg border text-xs flex items-center justify-center gap-1 transition-all ${
                        msgStatus === 'read' ? 'bg-[#2481cc] text-white border-transparent' : 'bg-[#2a2a2a] text-gray-400 border-white/5'
                      }`}
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Read (✓✓)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMsgStatus('sent')}
                      className={`py-2 px-2 rounded-lg border text-xs flex items-center justify-center gap-1 transition-all ${
                        msgStatus === 'sent' ? 'bg-[#2481cc] text-white border-transparent' : 'bg-[#2a2a2a] text-gray-400 border-white/5'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Sent (✓)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={chats.length === 0}
                className="w-full py-2.5 rounded-xl bg-[#2481cc] hover:bg-[#229ed9] disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#2481cc]/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Message to Chat</span>
              </button>
            </form>
          )}

          {/* ================= TAB 2: CONTACT INFO & FLAGS ================= */}
          {activeTab === 'chat' && (
            <div className="space-y-5">
              {/* Active Chat Direct In-Place Editor */}
              {activeChat && (
                <div className="p-4 bg-[#252525] rounded-xl border border-[#2481cc]/40 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Settings className="w-4 h-4 text-[#2481cc]" />
                      <span>Editing: {activeChat.name || activeChat.phoneNumber}</span>
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                      Live Updates
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Name */}
                    <div>
                      <label className="text-[11px] text-gray-300 font-medium block mb-1">
                        Contact Name <span className="text-gray-400 font-normal">(Leave empty to show only Phone Number!)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Samir Patra 🦁"
                        value={activeChat.name || ''}
                        onChange={(e) => onUpdateChat(activeChat.id, { name: e.target.value })}
                        className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#2481cc]"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="text-[11px] text-gray-300 font-medium block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="+91 98765 43210"
                        value={activeChat.phoneNumber || ''}
                        onChange={(e) => onUpdateChat(activeChat.id, { phoneNumber: e.target.value })}
                        className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#2481cc]"
                      />
                    </div>

                    {/* Country & Flag Selector */}
                    <div>
                      <label className="text-[11px] text-gray-300 font-medium block mb-1 flex items-center gap-1">
                        <Globe className="w-3 h-3 text-[#2481cc]" />
                        <span>Country & Flag</span>
                      </label>
                      <select
                        value={activeChat.countryName || 'India'}
                        onChange={(e) => {
                          const found = COUNTRY_OPTIONS.find(c => c.name === e.target.value);
                          if (found) {
                            onUpdateChat(activeChat.id, {
                              countryName: found.name,
                              countryFlag: found.flag
                            });
                          }
                        }}
                        className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#2481cc]"
                      >
                        {COUNTRY_OPTIONS.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.flag} {c.name} ({c.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Registration Date */}
                    <div>
                      <label className="text-[11px] text-gray-300 font-medium block mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#2481cc]" />
                        <span>Registration Date</span>
                      </label>
                      <input
                        type="text"
                        placeholder="February 2021"
                        value={activeChat.registrationDate || 'February 2021'}
                        onChange={(e) => onUpdateChat(activeChat.id, { registrationDate: e.target.value })}
                        className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#2481cc]"
                      />
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="pt-2 border-t border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-white font-medium">Show "Not a contact" Info Card</span>
                        <p className="text-[10px] text-gray-400">Shows centered phone, flag & registration card in chat</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={activeChat.showInfoCard !== false}
                        onChange={(e) => onUpdateChat(activeChat.id, { showInfoCard: e.target.checked })}
                        className="w-4 h-4 rounded text-[#2481cc]"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-white font-medium">Show "ADD CONTACT / BLOCK USER" Banner</span>
                        <p className="text-[10px] text-gray-400">Top action buttons for strangers (auto-shows if no name)</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={activeChat.showContactBanner !== false}
                        onChange={(e) => onUpdateChat(activeChat.id, { showContactBanner: e.target.checked })}
                        className="w-4 h-4 rounded text-[#2481cc]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Create New Chat Form */}
              <form onSubmit={handleCreateChat} className="p-4 bg-[#252525] rounded-xl border border-white/10 space-y-3">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4 text-[#2481cc]" />
                  Create Another Contact
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">
                      Contact Name <span className="text-gray-500">(Optional - leave blank to show number!)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Samir Patra 🦁"
                      value={newChatName}
                      onChange={(e) => setNewChatName(e.target.value)}
                      className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#2481cc]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Phone Number *</label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={newChatPhone}
                      onChange={(e) => setNewChatPhone(e.target.value)}
                      className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#2481cc]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Country & Flag</label>
                    <select
                      value={newChatCountry}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    >
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.flag} {c.name} ({c.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Registration Date</label>
                    <input
                      type="text"
                      placeholder="February 2021"
                      value={newChatRegDate}
                      onChange={(e) => setNewChatRegDate(e.target.value)}
                      className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                {/* Avatar upload */}
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Avatar Photo</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#2b2b2b] border border-white/10 text-xs text-gray-300 flex items-center gap-2">
                      <Upload className="w-3.5 h-3.5 text-[#2481cc]" />
                      <span>Upload Avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleMediaUpload(e, setNewChatAvatar)}
                      />
                    </label>

                    {newChatAvatar && (
                      <div className="flex items-center gap-2">
                        <img src={newChatAvatar} alt="Preview" className="w-8 h-8 rounded-full object-cover border border-white/20" />
                        <button
                          type="button"
                          onClick={() => setNewChatAvatar('')}
                          className="text-[11px] text-red-400 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-[#2481cc] hover:bg-[#229ed9] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Contact</span>
                </button>
              </form>

              {/* Chat list */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  All Chats ({chats.length})
                </h4>
                <div className="space-y-2">
                  {chats.map((c) => (
                    <div
                      key={c.id}
                      className={`p-3 rounded-xl border flex items-center justify-between ${
                        c.id === activeChatId ? 'bg-[#252525] border-[#2481cc]' : 'bg-[#1e1e1e] border-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {c.avatar ? (
                          <img src={c.avatar} alt="DP" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#2481cc] flex items-center justify-center text-xs font-bold">
                            {(c.name || c.phoneNumber || 'C').slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-xs text-white">
                            {c.name || c.phoneNumber || 'No Name (Number Only)'}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {c.countryFlag || '🇮🇳'} {c.phoneNumber || 'No Phone'} • {c.messages.length} msgs
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {c.id !== activeChatId && (
                          <button
                            onClick={() => onSelectChat(c.id)}
                            className="px-2.5 py-1 rounded bg-[#2481cc]/20 text-[#40a7e3] text-[11px] font-medium"
                          >
                            Select
                          </button>
                        )}
                        <button
                          onClick={() => onClearChatMessages(c.id)}
                          className="p-1 text-gray-400 hover:text-amber-400"
                          title="Clear messages"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteChat(c.id)}
                          className="p-1 text-gray-400 hover:text-red-400"
                          title="Delete chat"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: APP MODE ================= */}
          {activeTab === 'display' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Display Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onChangeMode('MOBILE')}
                    className={`p-3.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      activeMode === 'MOBILE'
                        ? 'bg-[#2481cc]/20 border-[#2481cc] text-[#40a7e3]'
                        : 'bg-[#252525] border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span className="font-semibold text-xs">Telegram Mobile</span>
                  </button>

                  <button
                    onClick={() => onChangeMode('PC')}
                    className={`p-3.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      activeMode === 'PC'
                        ? 'bg-[#2481cc]/20 border-[#2481cc] text-[#40a7e3]'
                        : 'bg-[#252525] border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-5 h-5" />
                    <span className="font-semibold text-xs">Telegram Desktop (PC)</span>
                  </button>
                </div>
              </div>

              {/* Reset to Blank Slate */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={onResetAll}
                  className="w-full py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Reset to Blank Slate</span>
                </button>

                <button
                  onClick={() => onChangeMode('LANDING')}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Return to Landing Screen</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
