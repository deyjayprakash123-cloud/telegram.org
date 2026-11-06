import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Menu, 
  Search, 
  Phone, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Mic, 
  Send, 
  CheckCheck, 
  Check, 
  BadgeCheck, 
  PenSquare, 
  Plus, 
  Smartphone,
  Play,
  FileText,
  Info,
  Archive,
  Camera,
  MessageCircle,
  Users,
  Settings as SettingsIcon,
  User,
  VolumeX,
  X
} from 'lucide-react';
import TelegramDoodleBackground from './TelegramDoodleBackground';
import MessageItem from './MessageItem';
import AddContactModal from './AddContactModal';
import BlockUserModal from './BlockUserModal';
import { getAvatarColor, getInitials, formatTime } from '../utils/telegramColors';

export default function TelegramMobile({
  chats,
  activeChatId,
  onSelectChat,
  onOpenControls,
  onSendMessage,
  onDeleteMessage,
  onUpdateChat,
  onViewMedia,
  onMessageClick,
  showPhoneFrame = false,
  setShowPhoneFrame,
  isFullscreen = false
}) {
  const [mobileView, setMobileView] = useState(activeChatId ? 'chat' : 'list'); // 'list' | 'chat'
  const [mobileTab, setMobileTab] = useState('chats'); // 'chats' | 'contacts' | 'settings' | 'profile'
  const [quickInputText, setQuickInputText] = useState('');
  const [quickSender, setQuickSender] = useState('in'); // Default to incoming to reproduce screenshot
  const [searchQuery, setSearchQuery] = useState('');

  // Modals for Add Contact & Block User
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isBlockUserOpen, setIsBlockUserOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const activeChat = chats.find((c) => c.id === activeChatId);

  // Sync mobile view if activeChatId changes from control panel
  useEffect(() => {
    if (activeChatId) {
      setMobileView('chat');
    }
  }, [activeChatId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (mobileView === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat?.messages, mobileView]);

  const handleSelectChat = (id) => {
    onSelectChat(id);
    setMobileView('chat');
  };

  const handleBackToList = () => {
    setMobileView('list');
  };

  const handleQuickSend = (e) => {
    e.preventDefault();
    if (!quickInputText.trim() || !activeChatId) return;

    onSendMessage({
      chatId: activeChatId,
      sender: quickSender,
      text: quickInputText.trim(),
      timestamp: formatTime().replace(/^[0:]+/, ''),
      status: 'read'
    });

    setQuickInputText('');
  };

  // Helper: Display title for contact (Name or Phone number if name is missing!)
  const getContactDisplayTitle = (chat) => {
    if (chat?.name && chat.name.trim() !== '') {
      return chat.name;
    }
    return chat?.phoneNumber || '+91 98765 43210';
  };

  // Handle Save from Add Contact Modal
  const handleSaveContact = ({ name, phoneNumber }) => {
    if (activeChat && onUpdateChat) {
      onUpdateChat(activeChat.id, {
        name,
        phoneNumber,
        showContactBanner: false // hide banner once added!
      });
    }
  };

  // Handle Block from Block Modal
  const handleConfirmBlock = () => {
    if (activeChat && onUpdateChat) {
      onUpdateChat(activeChat.id, {
        lastSeenText: 'blocked',
        isOnline: false,
        showContactBanner: false
      });
    }
  };

  // Filtered chats for chat list search
  const filteredChats = chats.filter((c) => {
    const title = getContactDisplayTitle(c).toLowerCase();
    return title.includes(searchQuery.toLowerCase());
  });

  const content = (
    <div className="relative w-full h-full h-[100dvh] flex flex-col bg-[#0e1621] text-[#f5f5f5] overflow-hidden select-none font-sans">
      {/* ================= VIEW 1: CHAT LIST SCREEN (Matching media_1793954649459_c7b609bb.jpg) ================= */}
      {mobileView === 'list' && (
        <div className="relative flex-1 flex flex-col h-full bg-[#0e1621] overflow-hidden">
          {/* Top App Bar */}
          <header className="h-[56px] px-3.5 bg-[#0e1621] flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-3">
              {/* Dual Story Avatar Ring Icon */}
              <div 
                onClick={() => onOpenControls('chat')}
                className="relative flex items-center cursor-pointer"
                title="Open Controls"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#2481cc] to-[#40a7e3] border-2 border-[#0e1621] flex items-center justify-center text-white text-xs font-bold shadow">
                  <Send className="w-4 h-4 -rotate-12 translate-x-[-1px]" />
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#ee7aae] to-[#faa774] border-2 border-[#0e1621] -ml-3 flex items-center justify-center text-[10px] text-white font-bold">
                  R
                </div>
              </div>

              <h1 className="text-[20px] font-bold text-white tracking-tight">Telegram</h1>
            </div>

            <div className="flex items-center gap-1 text-white/90">
              <button 
                onClick={() => onOpenControls('chat')} 
                className="w-9 h-9 rounded-full hover:bg-white/10 active:bg-white/20 flex items-center justify-center"
                title="Options"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Search Chats Input Bar */}
          <div className="px-3.5 pb-2 shrink-0">
            <div className="h-[38px] px-3.5 bg-[#17212b] rounded-full flex items-center gap-2.5 border border-white/[0.04]">
              <Search className="w-4 h-4 text-[#7e8c99]" />
              <input
                type="text"
                placeholder="Search Chats"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[14px] text-white placeholder-[#7e8c99] outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-[#7e8c99] hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Chat List Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden divide-y divide-black/20 pb-20">
            {/* Top Row: Archived Chats (As seen in screenshot!) */}
            <div 
              onClick={() => onOpenControls('chat')}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#151f2b] active:bg-[#1a2533] cursor-pointer transition-colors"
            >
              <div className="w-[50px] h-[50px] rounded-full bg-[#1e2a38] flex items-center justify-center text-[#7e8c99] shrink-0 border border-white/[0.05]">
                <Archive className="w-6 h-6 text-[#9cb4cc]" />
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-[15.5px] text-white">Archived Chats</span>
                  <span className="text-[12px] text-[#7e8c99]">11:04 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] text-[#7e8c99] truncate flex items-center gap-1.5">
                    <span className="px-1.5 py-0.2 rounded bg-[#2481cc]/30 text-[#40a7e3] text-[11px] font-bold">2</span>
                    <span>Auto Accept Request Bot</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Chats List */}
            {filteredChats.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center p-6 text-center text-[#7e8c99]">
                <div className="w-16 h-16 rounded-full bg-[#17212b] flex items-center justify-center mb-3 text-[#2481cc]/60">
                  <PenSquare className="w-8 h-8" />
                </div>
                <p className="text-[15px] font-medium text-white mb-1">No chats yet</p>
                <p className="text-[12px] text-[#7e8c99] mb-4 max-w-xs">
                  Tap the blue pencil button below or open Controls to add a fake contact!
                </p>
                <button
                  onClick={() => onOpenControls('chat')}
                  className="px-4 py-2 rounded-full bg-[#2481cc] hover:bg-[#229ed9] active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#2481cc]/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Contact</span>
                </button>
              </div>
            ) : (
              filteredChats.map((chat) => {
                const lastMessage = chat.messages[chat.messages.length - 1];
                const displayTitle = getContactDisplayTitle(chat);
                const hasNoName = !chat.name || chat.name.trim() === '';

                return (
                  <div
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#151f2b] active:bg-[#1a2533] cursor-pointer transition-colors"
                  >
                    {/* Avatar */}
                    <div className="relative w-[50px] h-[50px] rounded-full shrink-0 overflow-hidden">
                      {chat.avatar ? (
                        <img
                          src={chat.avatar}
                          alt={displayTitle}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-tr ${getAvatarColor(displayTitle)} flex items-center justify-center text-white font-medium text-lg`}>
                          {getInitials(displayTitle)}
                        </div>
                      )}
                      {chat.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#4fae4e] border-2 border-[#0e1621]" />
                      )}
                    </div>

                    {/* Chat Content */}
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1 truncate">
                          <span className="font-semibold text-[15.5px] truncate text-white">
                            {displayTitle}
                          </span>
                          {chat.isVerified && (
                            <BadgeCheck className="w-4 h-4 text-[#40a7e3] fill-[#40a7e3] text-white shrink-0" />
                          )}
                          {hasNoName && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold shrink-0">
                              Number Only
                            </span>
                          )}
                        </div>
                        <span className="text-[12px] text-[#7e8c99] shrink-0 ml-1">
                          {lastMessage ? lastMessage.timestamp : 'Just now'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[13.5px] text-[#7e8c99] truncate">
                          {lastMessage?.sender === 'out' && (
                            <span className="text-[#40a7e3]">
                              {lastMessage.status === 'read' ? (
                                <CheckCheck className="w-4 h-4 inline" />
                              ) : (
                                <Check className="w-4 h-4 inline" />
                              )}
                            </span>
                          )}
                          <span className="truncate">
                            {lastMessage
                              ? (lastMessage.isDocument 
                                  ? `📎 ${lastMessage.document?.fileName || 'Document'}` 
                                  : lastMessage.isSingleMedia
                                    ? (lastMessage.isVideo ? '📹 Video' : '📷 Photo')
                                    : lastMessage.isMediaGrid
                                      ? '📷 2 media'
                                      : lastMessage.text)
                              : (chat.isOnline ? 'Online' : chat.lastSeenText || 'Tap to chat')}
                          </span>
                        </div>

                        {chat.unreadCount > 0 && (
                          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[11px] font-bold bg-[#2481cc] text-white shrink-0">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Dual Floating Action Buttons (Camera FAB + Pencil FAB matching screenshot!) */}
          <div className="absolute bottom-20 right-4 z-20 flex flex-col items-center gap-2.5">
            {/* Top Camera FAB */}
            <button
              onClick={() => onOpenControls('message')}
              className="w-11 h-11 rounded-full bg-[#1b2734] hover:bg-[#233344] active:scale-95 shadow-lg border border-white/5 flex items-center justify-center text-white/90 transition-all"
              title="Camera / Send Media"
            >
              <Camera className="w-5 h-5 text-gray-200" />
            </button>

            {/* Main Pencil FAB */}
            <button
              onClick={() => onOpenControls('chat')}
              className="w-14 h-14 rounded-full bg-[#2481cc] hover:bg-[#229ed9] active:scale-95 shadow-2xl shadow-[#2481cc]/50 flex items-center justify-center text-white transition-all"
              title="Create New Contact"
            >
              <PenSquare className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom 4-Tab Telegram Navigation Bar (Matching screenshot!) */}
          <nav className="absolute bottom-0 inset-x-0 h-16 bg-[#131e2b] border-t border-black/30 px-3 flex items-center justify-around z-20 shrink-0 select-none">
            {/* Tab 1: Chats */}
            <button
              onClick={() => setMobileTab('chats')}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all ${
                mobileTab === 'chats'
                  ? 'bg-[#1b2d42] text-[#40a7e3]'
                  : 'text-[#7e8c99] hover:text-white'
              }`}
            >
              <div className="relative">
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-2 px-1 py-0.1 bg-[#2481cc] text-white text-[9px] font-bold rounded-full">
                  2
                </span>
              </div>
              <span className="text-[10.5px] font-bold mt-0.5">Chats</span>
            </button>

            {/* Tab 2: Contacts */}
            <button
              onClick={() => {
                setMobileTab('contacts');
                onOpenControls('chat');
              }}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all ${
                mobileTab === 'contacts'
                  ? 'bg-[#1b2d42] text-[#40a7e3]'
                  : 'text-[#7e8c99] hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-[10.5px] font-medium mt-0.5">Contacts</span>
            </button>

            {/* Tab 3: Settings */}
            <button
              onClick={() => {
                setMobileTab('settings');
                onOpenControls('display');
              }}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all ${
                mobileTab === 'settings'
                  ? 'bg-[#1b2d42] text-[#40a7e3]'
                  : 'text-[#7e8c99] hover:text-white'
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
              <span className="text-[10.5px] font-medium mt-0.5">Settings</span>
            </button>

            {/* Tab 4: Profile */}
            <button
              onClick={() => {
                setMobileTab('profile');
                onOpenControls('chat');
              }}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all ${
                mobileTab === 'profile'
                  ? 'bg-[#1b2d42] text-[#40a7e3]'
                  : 'text-[#7e8c99] hover:text-white'
              }`}
            >
              <div className="w-5 h-5 rounded-full overflow-hidden border border-white/20">
                <img src="/presets/mobile_avatar.jpg" alt="profile" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10.5px] font-medium mt-0.5">Profile</span>
            </button>
          </nav>
        </div>
      )}

      {/* ================= VIEW 2: CHAT CONVERSATION SCREEN (Matching media_1793954648453_0c418500.jpg) ================= */}
      {mobileView === 'chat' && (
        <div className="relative flex-1 flex flex-col h-full bg-[#0e1621] overflow-hidden">
          {/* Top Header Bar */}
          <header className="h-[60px] px-3 bg-[#0e1621] flex items-center justify-between z-20 shrink-0 border-b border-black/10">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              {/* Back to List */}
              <button
                onClick={handleBackToList}
                className="w-9 h-9 rounded-full hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-white/90 shrink-0"
                title="Back to Chats"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>

              {/* Contact Profile Picture and Title */}
              <div 
                className="flex items-center gap-3 truncate cursor-pointer flex-1"
                onClick={() => onOpenControls('chat')}
                title="Tap to edit Contact Name, Phone, Flag, or Date"
              >
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/10 shadow-sm">
                  {activeChat?.avatar ? (
                    <img
                      src={activeChat.avatar}
                      alt={getContactDisplayTitle(activeChat)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-tr ${getAvatarColor(getContactDisplayTitle(activeChat))} flex items-center justify-center text-white font-medium text-sm`}>
                      {getInitials(getContactDisplayTitle(activeChat))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col truncate">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-semibold text-[16px] text-white truncate tracking-tight">
                      {getContactDisplayTitle(activeChat)}
                    </span>
                    {activeChat?.isVerified && (
                      <BadgeCheck className="w-4 h-4 text-[#40a7e3] fill-[#40a7e3] text-white shrink-0" />
                    )}
                  </div>
                  <span className={`text-[13px] leading-tight ${activeChat?.lastSeenText === 'blocked' ? 'text-red-400' : 'text-[#7e8c99]'}`}>
                    {activeChat?.isOnline ? 'online' : (activeChat?.lastSeenText || 'last seen recently')}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Right Action Icons */}
            <div className="flex items-center gap-1 text-white/90 shrink-0">
              <button 
                onClick={() => alert(`Calling ${getContactDisplayTitle(activeChat)}...`)}
                className="w-9 h-9 rounded-full hover:bg-white/10 active:bg-white/20 flex items-center justify-center" 
                title="Voice call"
              >
                <Phone className="w-5 h-5 stroke-[2]" />
              </button>
              <button 
                onClick={() => onOpenControls('message')} 
                className="w-9 h-9 rounded-full hover:bg-white/10 active:bg-white/20 flex items-center justify-center"
                title="Prank Options & Controls"
              >
                <MoreVertical className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
          </header>

          {/* Banner directly under header (shows if user has no name or if banner is enabled!) */}
          {(activeChat?.showContactBanner !== false || !activeChat?.name) && activeChat?.lastSeenText !== 'blocked' && (
            <div className="h-[42px] px-4 bg-[#1b2734] border-b border-white/[0.06] shadow-sm flex items-center justify-between z-20 shrink-0 select-none animate-fadeIn">
              <div className="flex-1 flex items-center justify-center gap-8">
                <button
                  onClick={() => setIsAddContactOpen(true)}
                  className="text-[#40a7e3] hover:text-[#58b4ee] active:scale-95 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  ADD CONTACT
                </button>
                <button
                  onClick={() => setIsBlockUserOpen(true)}
                  className="text-[#ff595a] hover:text-[#ff7374] active:scale-95 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  BLOCK USER
                </button>
              </div>
              <button
                onClick={() => onUpdateChat && onUpdateChat(activeChat.id, { showContactBanner: false })}
                className="text-gray-400 hover:text-white p-1"
                title="Dismiss Banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Chat Messages Body with Exact Phone Background Wallpaper */}
          <div id="telegram-mobile-viewport" className="relative flex-1 overflow-y-auto px-3 py-3 flex flex-col justify-start">
            {/* The Exact Telegram Mobile Doodle Wallpaper */}
            <TelegramDoodleBackground tint="mobile" opacity={0.28} />

            {/* Centered Info Card ("Not a contact") with Editable Phone, Flag, and Registration */}
            {activeChat?.showInfoCard !== false && (
              <div 
                onClick={() => onOpenControls('chat')}
                className="relative z-10 flex justify-center mb-3 mt-1 cursor-pointer"
                title="Tap to edit Phone number, Flag, or Date in Controls"
              >
                <div className="w-[280px] p-4 rounded-2xl bg-[#212d3b] hover:bg-[#253242] border border-white/[0.04] text-center shadow-lg transition-colors select-none">
                  {/* Name or Number */}
                  <h3 className="font-bold text-[15px] text-white mb-0.5 truncate">
                    {getContactDisplayTitle(activeChat)}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-[12px] text-[#7e8c99] mb-3">
                    {activeChat?.name ? 'Not a contact' : 'Unknown Contact'}
                  </p>

                  {/* Phone & Country Flag */}
                  <div className="text-[12px] text-[#b2bcc5] space-y-1 mb-3 font-normal">
                    <p className="flex items-center justify-center gap-1.5">
                      <span>Phone number</span>
                      <span className="text-sm">{activeChat?.countryFlag || '🇮🇳'}</span>
                      <span className="font-medium text-white">{activeChat?.countryName || 'India'}</span>
                    </p>
                    <p className="text-[11.5px] text-[#8fa0b0]">
                      Registration <span className="font-medium text-white">{activeChat?.registrationDate || 'February 2021'}</span>
                    </p>
                  </div>

                  {/* Official Account Note */}
                  <div className="text-[11px] text-[#77828c] flex items-center justify-center gap-1">
                    <Info className="w-3.5 h-3.5 inline text-[#77828c]" />
                    <span>{activeChat?.isOfficialAccount ? 'Official account' : 'Not an official account'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Date divider pill */}
            <div className="relative z-10 flex justify-center my-2.5">
              <span className="px-3.5 py-1 rounded-full bg-[#1e2833]/90 backdrop-blur-sm text-[12px] text-gray-200 font-semibold border border-white/5 shadow-sm">
                November 5
              </span>
            </div>

            {/* Messages Stream */}
            <div className="relative z-10 flex-1 flex flex-col space-y-2 pb-3">
              {(!activeChat || activeChat.messages.length === 0) ? (
                <div className="my-auto text-center text-[#7e8c99] p-6">
                  <p className="text-sm">No messages yet.</p>
                  <p className="text-xs text-[#7e8c99]/80 mt-1">
                    Type below or tap Controls to load messages.
                  </p>
                </div>
              ) : (
                activeChat.messages.map((msg) => (
                  <MessageItem
                    key={msg.id}
                    message={msg}
                    onDeleteMessage={onDeleteMessage}
                    onViewMedia={onViewMedia}
                    onMessageClick={onMessageClick}
                    isMobile={true}
                    accentColor="#2481cc"
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* ================= MOBILE BOTTOM INPUT BAR ================= */}
          <footer className="relative z-20 bg-[#0e1621] px-2 py-2 flex items-center gap-2 border-t border-black/20 shrink-0">
            {/* Quick Sender Switch - Visible during editing, automatically removed in Fullscreen on phone screen */}
            {!isFullscreen && (
              <button
                type="button"
                onClick={() => setQuickSender(s => s === 'in' ? 'out' : 'in')}
                className={`h-[44px] px-2.5 rounded-full font-bold text-xs flex items-center justify-center transition-all shrink-0 shadow-sm active:scale-95 ${
                  quickSender === 'in'
                    ? 'bg-[#212d3b] text-[#40a7e3] border border-[#2481cc]/60'
                    : 'bg-[#2b5278] text-white border border-emerald-400/60'
                }`}
                title="Click to switch who is sending the message"
              >
                {quickSender === 'in' ? 'In ⬅' : 'Out ➔'}
              </button>
            )}

            {/* Input Pill */}
            <div className="flex-1 h-[48px] px-3 bg-[#212d3b] rounded-full flex items-center gap-2 shadow-md">
              {/* GIF Button */}
              <button
                type="button"
                onClick={() => onOpenControls('message')}
                className="w-7 h-5 rounded border border-[#7e8c99] flex items-center justify-center text-[10px] font-bold text-[#7e8c99] hover:text-white"
                title="Attach Media / GIF"
              >
                GIF
              </button>

              {/* Message Input Field */}
              <form onSubmit={handleQuickSend} className="flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="Message"
                  value={quickInputText}
                  onChange={(e) => setQuickInputText(e.target.value)}
                  className="w-full bg-transparent text-[15.5px] text-white placeholder-[#7e8c99] outline-none py-1"
                />
              </form>

              {/* Paperclip Attachment */}
              <button
                type="button"
                onClick={() => onOpenControls('message')}
                className="text-[#7e8c99] hover:text-white active:scale-90 p-1 transition-transform"
                title="Attach Photo / Video / Audio / Document"
              >
                <Paperclip className="w-5 h-5 -rotate-45" />
              </button>
            </div>

            {/* Circular Blue Mic or Send Button */}
            {quickInputText.trim() ? (
              <button
                type="button"
                onClick={handleQuickSend}
                className="w-12 h-12 rounded-full bg-[#2481cc] active:bg-[#2075b9] active:scale-95 flex items-center justify-center text-white transition-all shadow-lg shadow-[#2481cc]/40 shrink-0"
                title="Send Message"
              >
                <Send className="w-5 h-5 translate-x-[-1px] translate-y-[-1px]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onSendMessage({
                    chatId: activeChatId,
                    sender: quickSender,
                    text: '🎤 Voice message (0:08)',
                    timestamp: formatTime().replace(/^[0:]+/, ''),
                    status: 'read'
                  });
                }}
                className="w-12 h-12 rounded-full bg-[#2481cc] active:bg-[#2075b9] active:scale-95 flex items-center justify-center text-white transition-all shadow-lg shadow-[#2481cc]/40 shrink-0"
                title="Send Fake Voice Note"
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </footer>
        </div>
      )}

      {/* Popups: Add to Contacts & Block User Modals */}
      <AddContactModal
        isOpen={isAddContactOpen}
        onClose={() => setIsAddContactOpen(false)}
        onSave={handleSaveContact}
        defaultPhone={activeChat?.phoneNumber || '+91 98765 43210'}
        initialName={activeChat?.name || ''}
      />

      <BlockUserModal
        isOpen={isBlockUserOpen}
        onClose={() => setIsBlockUserOpen(false)}
        onConfirmBlock={handleConfirmBlock}
        userName={getContactDisplayTitle(activeChat)}
      />
    </div>
  );

  // If in Phone Mockup Shell (for desktop preview):
  if (showPhoneFrame) {
    return (
      <div className="relative w-full h-full bg-[#070b10] flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden">
        {/* Toggle frame button on top */}
        <div className="absolute top-3 left-4 z-30 flex items-center gap-2">
          <button
            onClick={() => setShowPhoneFrame(false)}
            className="px-3 py-1.5 rounded-lg bg-[#17212b] hover:bg-[#202b36] text-xs text-gray-300 border border-white/10 flex items-center gap-1.5 shadow"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#40a7e3]" />
            <span>Switch to Fullscreen Mobile View</span>
          </button>
        </div>

        {/* Smartphone Shell Mockup */}
        <div className="relative w-full max-w-[420px] h-[94vh] max-h-[890px] rounded-[48px] p-2 bg-[#1b232e] border-[5px] border-[#2d3744] shadow-2xl shadow-black/90 flex flex-col overflow-hidden">
          <div className="relative w-full h-full rounded-[40px] overflow-hidden flex flex-col">
            {content}
          </div>
        </div>
      </div>
    );
  }

  // Full-width mobile view
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="hidden md:flex absolute top-3 right-4 z-40">
        <button
          onClick={() => setShowPhoneFrame(true)}
          className="px-3 py-1.5 rounded-lg bg-[#17212b]/90 hover:bg-[#202b36] backdrop-blur text-xs text-gray-300 border border-white/10 flex items-center gap-1.5 shadow-lg"
          title="Toggle phone shell mockup view"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#40a7e3]" />
          <span>Show in Phone Shell</span>
        </button>
      </div>

      {content}
    </div>
  );
}
