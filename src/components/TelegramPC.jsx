import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Phone, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Mic, 
  Send, 
  X, 
  CheckCheck,
  Check,
  BadgeCheck,
  MessageSquare,
  Plus,
  Info,
  ChevronLeft
} from 'lucide-react';
import TelegramDoodleBackground from './TelegramDoodleBackground';
import MessageItem from './MessageItem';
import { getAvatarColor, getInitials, formatTime } from '../utils/telegramColors';

export default function TelegramPC({
  chats,
  activeChatId,
  onSelectChat,
  onOpenControls,
  onSendMessage,
  onDeleteMessage,
  onAddNewChat
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [quickInputText, setQuickInputText] = useState('');
  const [quickSender, setQuickSender] = useState('in'); // default to 'in' to easily reproduce incoming screenshots!
  const [showBanner, setShowBanner] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  // Filter chats by search
  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-scroll to bottom of chat when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleQuickSend = (e) => {
    e.preventDefault();
    if (!quickInputText.trim() || !activeChatId) return;

    onSendMessage({
      chatId: activeChatId,
      sender: quickSender,
      text: quickInputText.trim(),
      timestamp: formatTime(),
      status: 'read'
    });

    setQuickInputText('');
  };

  return (
    <div className="relative w-full h-full flex bg-[#0f0f0f] text-[#f5f5f5] overflow-hidden select-none font-sans">
      {/* ================= LEFT SIDEBAR (approx 340px) ================= */}
      {!isSidebarCollapsed && (
        <aside className="w-[320px] md:w-[360px] h-full flex flex-col bg-[#17212b] border-r border-[#101921] shrink-0 z-20">
          {/* Top Header: Hamburger Menu & Search */}
          <div className="h-[56px] px-3 flex items-center gap-2 bg-[#17212b]">
            <button 
              onClick={onOpenControls}
              className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-[#7e8c99] hover:text-white transition-colors"
              title="Open Control Panel"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 relative flex items-center">
              <Search className="w-4 h-4 text-[#6c7883] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[36px] bg-[#242f3d] hover:bg-[#2b3746] focus:bg-[#242f3d] text-white text-[14px] placeholder-[#6c7883] rounded-full pl-9 pr-8 outline-none border border-transparent focus:border-[#8774e1] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-[#6c7883] hover:text-white p-0.5 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {filteredChats.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center text-[#7e8c99]">
                <div className="w-16 h-16 rounded-full bg-[#242f3d] flex items-center justify-center mb-3 text-[#8774e1]">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <p className="text-[14px] font-medium text-white mb-1">No chats yet</p>
                <p className="text-[12px] text-[#7e8c99] mb-4">
                  Add contacts or load the screenshot preset in Controls!
                </p>
                <button
                  onClick={onOpenControls}
                  className="px-4 py-2 rounded-lg bg-[#8774e1] hover:bg-[#7b67d9] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Open Controls</span>
                </button>
              </div>
            ) : (
              filteredChats.map((chat) => {
                const isActive = chat.id === activeChatId;
                const lastMessage = chat.messages[chat.messages.length - 1];

                return (
                  <div
                    key={chat.id}
                    onClick={() => onSelectChat(chat.id)}
                    className={`group relative flex items-center gap-3 px-3.5 py-3 cursor-pointer transition-colors ${
                      isActive 
                        ? 'bg-[#8774e1]/25 border-l-4 border-[#8774e1]' 
                        : 'hover:bg-[#202b36]'
                    }`}
                  >
                    {/* Chat Avatar */}
                    <div className="relative w-12 h-12 rounded-full shrink-0 overflow-hidden">
                      {chat.avatar ? (
                        <img
                          src={chat.avatar}
                          alt={chat.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-tr ${getAvatarColor(chat.name)} flex items-center justify-center text-white font-medium text-base`}>
                          {getInitials(chat.name)}
                        </div>
                      )}
                      {chat.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#4fae4e] border-2 border-[#17212b]" />
                      )}
                    </div>

                    {/* Chat Details */}
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1 truncate">
                          <span className="font-medium text-[15px] truncate text-white">
                            {chat.name}
                          </span>
                          {chat.isVerified && (
                            <BadgeCheck className="w-4 h-4 text-[#8774e1] fill-[#8774e1] text-white shrink-0" />
                          )}
                        </div>
                        <span className={`text-[12px] shrink-0 ml-1 ${isActive ? 'text-white/90' : 'text-[#7e8c99]'}`}>
                          {lastMessage ? lastMessage.timestamp : 'Just now'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[13px] truncate text-[#7e8c99]">
                          {lastMessage?.sender === 'out' && (
                            <span className="text-[#8774e1]">
                              {lastMessage.status === 'read' ? (
                                <CheckCheck className="w-3.5 h-3.5 inline" />
                              ) : (
                                <Check className="w-3.5 h-3.5 inline" />
                              )}
                            </span>
                          )}
                          <span className={`truncate ${isActive ? 'text-white' : 'text-[#7e8c99]'}`}>
                            {lastMessage 
                              ? (lastMessage.isDocument 
                                  ? `📎 ${lastMessage.document?.fileName || 'Document'}` 
                                  : lastMessage.isMediaGrid
                                    ? '📷 2 videos'
                                    : lastMessage.text)
                              : (chat.isOnline ? 'online' : chat.lastSeenText || 'No messages')}
                          </span>
                        </div>

                        {chat.unreadCount > 0 && (
                          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[11px] font-bold bg-[#8774e1] text-white shrink-0">
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
        </aside>
      )}

      {/* ================= RIGHT MAIN CHAT WINDOW ================= */}
      <main className="relative flex-1 h-full flex flex-col bg-[#0f0f0f] overflow-hidden">
        {activeChat ? (
          <div className="relative w-full h-full flex flex-col justify-between p-2 md:p-3 overflow-hidden">
            {/* Background Doodles */}
            <TelegramDoodleBackground tint="purple" opacity={0.22} />

            {/* 1. TOP HEADER BAR (Rounded floating style matching screenshot) */}
            <div className="relative z-20 flex flex-col gap-1 w-full max-w-4xl mx-auto">
              <header className="h-[58px] px-4 bg-[#212121] rounded-2xl border border-white/[0.04] shadow-md flex items-center justify-between">
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  onClick={onOpenControls}
                  title="Click to edit contact in Controls"
                >
                  {/* Avatar */}
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10">
                    {activeChat.avatar ? (
                      <img
                        src={activeChat.avatar}
                        alt={activeChat.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-tr ${getAvatarColor(activeChat.name)} flex items-center justify-center text-white font-medium text-sm`}>
                        {getInitials(activeChat.name)}
                      </div>
                    )}
                  </div>

                  {/* Name and Subtitle */}
                  <div className="flex flex-col truncate">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-semibold text-[15px] text-white truncate">
                        {activeChat.name}
                      </span>
                      {activeChat.isVerified && (
                        <BadgeCheck className="w-4 h-4 text-[#8774e1] fill-[#8774e1] text-white shrink-0" />
                      )}
                    </div>
                    <span className="text-[12px] leading-tight text-[#8a8a8a]">
                      {activeChat.isOnline ? 'online' : (activeChat.lastSeenText || 'last seen recently')}
                    </span>
                  </div>
                </div>

                {/* Right Action Icons (Search, Call, 3-dots) */}
                <div className="flex items-center gap-1.5 text-white/80">
                  <button 
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="hidden sm:flex w-9 h-9 rounded-full hover:bg-white/10 items-center justify-center text-gray-400 hover:text-white transition-colors"
                    title={isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}
                  >
                    <ChevronLeft className={`w-4 h-4 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
                  </button>

                  <button className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors" title="Search in chat">
                    <Search className="w-5 h-5 stroke-[1.8]" />
                  </button>
                  <button className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors" title="Call">
                    <Phone className="w-5 h-5 stroke-[1.8]" />
                  </button>
                  <button 
                    onClick={onOpenControls}
                    className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors" 
                    title="Open Controls"
                  >
                    <MoreVertical className="w-5 h-5 stroke-[1.8]" />
                  </button>
                </div>
              </header>

              {/* 2. "ADD CONTACT / BLOCK USER" BANNER (As seen in screenshot) */}
              {showBanner && activeChat.showContactBanner !== false && (
                <div className="h-[40px] px-6 bg-[#212121] rounded-xl border border-white/[0.04] shadow-sm flex items-center justify-between text-xs font-semibold tracking-wide select-none">
                  <div className="flex-1 flex items-center justify-center gap-8">
                    <button 
                      onClick={onOpenControls}
                      className="text-[#8774e1] hover:text-[#9c89ed] transition-colors uppercase text-[12px] font-bold"
                    >
                      ADD CONTACT
                    </button>
                    <button 
                      onClick={onOpenControls}
                      className="text-[#ff595a] hover:text-[#ff7071] transition-colors uppercase text-[12px] font-bold"
                    >
                      BLOCK USER
                    </button>
                  </div>
                  <button 
                    onClick={() => setShowBanner(false)}
                    className="text-gray-400 hover:text-white p-1 rounded transition-colors"
                    title="Dismiss Banner"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* 3. CHAT MESSAGES STREAM */}
            <div className="relative z-10 flex-1 overflow-y-auto px-2 md:px-6 py-4 flex flex-col justify-start max-w-4xl mx-auto w-full">
              {/* Optional: "Not a contact" Info Card in Chat (Exactly matching screenshot!) */}
              {activeChat.showInfoCard !== false && (
                <div className="flex justify-center mb-4">
                  <div className="w-[300px] p-4 rounded-2xl bg-[#212121] border border-white/[0.04] text-center shadow-lg select-none">
                    <h3 className="font-bold text-[15px] text-white mb-0.5">
                      {activeChat.name?.replace(/[^\w\s]/gi, '').trim() || 'Contact'}
                    </h3>
                    <p className="text-[12px] text-[#828e99] mb-3">
                      Not a contact
                    </p>
                    <div className="text-[12px] text-[#b2bcc5] space-y-1 mb-3">
                      <p>Phone Number 🇮🇳 India</p>
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
              <div className="flex justify-center my-3">
                <span className="px-3 py-0.5 rounded-full bg-[#181818]/90 text-[12px] text-gray-300 font-medium border border-white/5 shadow-sm">
                  Today
                </span>
              </div>

              {/* Messages Container */}
              <div className="flex-1 flex flex-col space-y-1.5">
                {activeChat.messages.length === 0 ? (
                  <div className="my-auto text-center text-[#7e8c99] p-6">
                    <p className="text-sm">No messages yet.</p>
                    <p className="text-xs text-[#7e8c99]/80 mt-1">
                      Type below or open Controls to add text, audio (.wav), fake documents, or video clips!
                    </p>
                  </div>
                ) : (
                  activeChat.messages.map((msg) => (
                    <MessageItem
                      key={msg.id}
                      message={msg}
                      onDeleteMessage={onDeleteMessage}
                      isMobile={false}
                      accentColor="#8774e1"
                    />
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* 4. BOTTOM INPUT BAR (Floating Pill Style Matching Screenshot) */}
            <div className="relative z-20 w-full max-w-4xl mx-auto pt-1 pb-1">
              <div className="h-[52px] px-3.5 bg-[#212121] rounded-full border border-white/[0.04] shadow-xl flex items-center gap-3">
                {/* Quick In/Out toggle for bottom typing */}
                <button
                  type="button"
                  onClick={() => setQuickSender(s => s === 'in' ? 'out' : 'in')}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase transition-colors shrink-0 ${
                    quickSender === 'in'
                      ? 'bg-[#8774e1]/20 text-[#8774e1] border border-[#8774e1]/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                  title="Toggle Incoming vs Outgoing for typing bar"
                >
                  {quickSender === 'in' ? 'Incoming' : 'Outgoing'}
                </button>

                {/* Attach Icon */}
                <button
                  type="button"
                  onClick={onOpenControls}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Attach File/Document via Controls"
                >
                  <Paperclip className="w-5 h-5 -rotate-45" />
                </button>

                {/* Text Input */}
                <form onSubmit={handleQuickSend} className="flex-1 flex items-center">
                  <input
                    type="text"
                    placeholder="Message"
                    value={quickInputText}
                    onChange={(e) => setQuickInputText(e.target.value)}
                    className="w-full bg-transparent text-[15px] text-white placeholder-[#78838d] outline-none"
                  />
                </form>

                {/* Smile / Emoji */}
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Smile className="w-5 h-5" />
                </button>

                {/* Circular Purple Mic / Send button (Exact match to screenshot!) */}
                {quickInputText.trim() ? (
                  <button
                    type="button"
                    onClick={handleQuickSend}
                    className="w-9 h-9 rounded-full bg-[#8774e1] hover:bg-[#7b67d9] active:scale-95 flex items-center justify-center text-white transition-all shadow-md shadow-[#8774e1]/40"
                    title="Send Message"
                  >
                    <Send className="w-4 h-4 translate-x-[-1px] translate-y-[-1px]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-[#8774e1] hover:bg-[#7b67d9] flex items-center justify-center text-white transition-all shadow-md shadow-[#8774e1]/40"
                    title="Voice message"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Empty state when no chat is selected */
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <TelegramDoodleBackground tint="purple" opacity={0.12} />
            <div className="relative z-10 px-6 py-2.5 rounded-full bg-[#212121] border border-white/5 text-[14px] text-gray-400 font-medium shadow-md">
              Select a chat to start messaging
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
