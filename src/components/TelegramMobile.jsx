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
  Info
} from 'lucide-react';
import TelegramDoodleBackground from './TelegramDoodleBackground';
import MessageItem from './MessageItem';
import { getAvatarColor, getInitials, formatTime } from '../utils/telegramColors';

export default function TelegramMobile({
  chats,
  activeChatId,
  onSelectChat,
  onOpenControls,
  onSendMessage,
  onDeleteMessage,
  showPhoneFrame = false,
  setShowPhoneFrame
}) {
  const [mobileView, setMobileView] = useState(activeChatId ? 'chat' : 'list'); // 'list' | 'chat'
  const [quickInputText, setQuickInputText] = useState('');
  const [quickSender, setQuickSender] = useState('in'); // Default to incoming to reproduce screenshot
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

  const content = (
    <div className="relative w-full h-full h-[100dvh] flex flex-col bg-[#0e1621] text-[#f5f5f5] overflow-hidden select-none font-sans">
      {/* ================= VIEW 1: CHAT LIST ================= */}
      {mobileView === 'list' && (
        <div className="relative flex-1 flex flex-col h-full bg-[#0e1621]">
          {/* Mobile App Bar */}
          <header className="h-[56px] px-4 bg-[#212d3b] flex items-center justify-between shadow-md z-10 shrink-0">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onOpenControls('chat')}
                className="w-10 h-10 rounded-full hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-white/90"
                title="Open Control Panel"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-[19px] font-bold text-white tracking-tight">Telegram</h1>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button 
                onClick={() => onOpenControls('chat')} 
                className="w-9 h-9 rounded-full hover:bg-white/10 active:bg-white/20 flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Chat List Items */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {chats.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center text-[#7e8c99]">
                <div className="w-16 h-16 rounded-full bg-[#17212b] flex items-center justify-center mb-3 text-[#2481cc]/60">
                  <PenSquare className="w-8 h-8" />
                </div>
                <p className="text-[15px] font-medium text-white mb-1">No chats yet</p>
                <p className="text-[12px] text-[#7e8c99] mb-4 max-w-xs">
                  Tap the pencil button below or open Controls to load your fake contact!
                </p>
                <button
                  onClick={() => onOpenControls('chat')}
                  className="px-4 py-2 rounded-full bg-[#2481cc] hover:bg-[#229ed9] active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#2481cc]/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Contact</span>
                </button>
              </div>
            ) : (
              chats.map((chat) => {
                const lastMessage = chat.messages[chat.messages.length - 1];

                return (
                  <div
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className="flex items-center gap-3 px-4 py-3 active:bg-[#1a232e] border-b border-[#131d27]/40 cursor-pointer"
                  >
                    <div className="relative w-[52px] h-[52px] rounded-full shrink-0 overflow-hidden">
                      {chat.avatar ? (
                        <img
                          src={chat.avatar}
                          alt={chat.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-tr ${getAvatarColor(chat.name)} flex items-center justify-center text-white font-medium text-lg`}>
                          {getInitials(chat.name)}
                        </div>
                      )}
                      {chat.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#4fae4e] border-2 border-[#0e1621]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1 truncate">
                          <span className="font-semibold text-[16px] truncate text-white">
                            {chat.name}
                          </span>
                          {chat.isVerified && (
                            <BadgeCheck className="w-4 h-4 text-[#40a7e3] fill-[#40a7e3] text-white shrink-0" />
                          )}
                        </div>
                        <span className="text-[12px] text-[#7e8c99] shrink-0 ml-1">
                          {lastMessage ? lastMessage.timestamp : 'Just now'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[14px] text-[#7e8c99] truncate">
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
                                      ? '📷 Media'
                                      : lastMessage.text)
                              : (chat.isOnline ? 'Online' : chat.lastSeenText || 'Tap to chat')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Floating Action Button (FAB) in Chat List */}
          <button
            onClick={() => onOpenControls('chat')}
            className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-[#2481cc] hover:bg-[#229ed9] active:scale-95 shadow-xl shadow-[#2481cc]/40 flex items-center justify-center text-white transition-all z-20"
            title="Create New Chat"
          >
            <PenSquare className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* ================= VIEW 2: CHAT CONVERSATION ================= */}
      {mobileView === 'chat' && (
        <div className="relative flex-1 flex flex-col h-full bg-[#0e1621]">
          {/* Mobile Chat Header */}
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

              {/* Contact Profile Picture and Details */}
              <div 
                className="flex items-center gap-3 truncate cursor-pointer flex-1"
                onClick={() => onOpenControls('chat')}
                title="Tap to edit Contact Name / DP / Status"
              >
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/10 shadow-sm">
                  {activeChat?.avatar ? (
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-tr ${getAvatarColor(activeChat?.name || '')} flex items-center justify-center text-white font-medium text-sm`}>
                      {getInitials(activeChat?.name || '')}
                    </div>
                  )}
                </div>

                <div className="flex flex-col truncate">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-semibold text-[16px] text-white truncate tracking-tight">
                      {activeChat?.name || 'Samir Patra 🦁'}
                    </span>
                    {activeChat?.isVerified && (
                      <BadgeCheck className="w-4 h-4 text-[#40a7e3] fill-[#40a7e3] text-white shrink-0" />
                    )}
                  </div>
                  <span className="text-[13px] leading-tight text-[#7e8c99]">
                    {activeChat?.isOnline ? 'online' : (activeChat?.lastSeenText || 'last seen recently')}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Right Action Icons */}
            <div className="flex items-center gap-1 text-white/90 shrink-0">
              <button 
                onClick={() => alert('Prank Voice Call Initiated...')}
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

          {/* Chat Messages Body with Exact Phone Background Wallpaper */}
          <div className="relative flex-1 overflow-y-auto px-3 py-3 flex flex-col justify-start">
            {/* The Exact Telegram Mobile Doodle Wallpaper */}
            <TelegramDoodleBackground tint="mobile" opacity={0.28} />

            {/* Centered Info Card ("Not a contact") */}
            {activeChat?.showInfoCard !== false && (
              <div 
                onClick={() => onOpenControls('chat')}
                className="relative z-10 flex justify-center mb-3 mt-1 cursor-pointer"
                title="Tap to customize this card"
              >
                <div className="w-[280px] p-4 rounded-2xl bg-[#212d3b] hover:bg-[#253242] border border-white/[0.04] text-center shadow-lg transition-colors select-none">
                  <h3 className="font-bold text-[15px] text-white mb-0.5">
                    {activeChat?.name?.replace(/[^\w\s]/gi, '').trim() || 'Samir Patra'}
                  </h3>
                  <p className="text-[12px] text-[#7e8c99] mb-3">
                    Not a contact
                  </p>
                  <div className="text-[12px] text-[#b2bcc5] space-y-1 mb-3 font-normal">
                    <p>Phone number 🇮🇳 India</p>
                    <p>Registration February 2021</p>
                  </div>
                  <div className="text-[11px] text-[#77828c] flex items-center justify-center gap-1">
                    <Info className="w-3.5 h-3.5 inline text-[#77828c]" />
                    <span>Not an official account</span>
                  </div>
                </div>
              </div>
            )}

            {/* Date divider pill */}
            <div className="relative z-10 flex justify-center my-2">
              <span className="px-3.5 py-1 rounded-full bg-[#1e2833]/90 backdrop-blur-sm text-[12px] text-gray-200 font-semibold border border-white/5 shadow-sm">
                November 5
              </span>
            </div>

            {/* Messages Stream */}
            <div className="relative z-10 flex-1 flex flex-col space-y-1.5">
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
                    isMobile={true}
                    accentColor="#2481cc"
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* ================= FULLY FUNCTIONAL MOBILE BOTTOM BAR ================= */}
          <footer className="relative z-20 bg-[#0e1621] px-2 py-2 flex items-center gap-2 border-t border-black/20 shrink-0">
            {/* Quick Sender Switch (Incoming vs Outgoing) directly on mobile screen! */}
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

              {/* Paperclip Attachment - Opens Controls Directly to Attach */}
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
    </div>
  );

  // If in Phone Mockup Shell (for desktop view):
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
          {/* Inner screen */}
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
      {/* Subtle Frame Mockup toggle pill (visible on wider screens) */}
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
