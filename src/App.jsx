import React, { useState, useEffect } from 'react';
import LandingScreen from './components/LandingScreen';
import TelegramPC from './components/TelegramPC';
import TelegramMobile from './components/TelegramMobile';
import ControlPanel from './components/ControlPanel';
import PrankFloatingConsole from './components/PrankFloatingConsole';
import MediaViewerModal from './components/MediaViewerModal';
import MessageActionMenu from './components/MessageActionMenu';
import { formatTime } from './utils/telegramColors';

export default function App() {
  // Application Modes: 'LANDING' | 'PC' | 'MOBILE' - Starts with LANDING screen asking for PC or Mobile view
  const [activeMode, setActiveMode] = useState('LANDING');

  // Chats State
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  // Media Lightbox and Message Click Actions
  const [activeMediaPreview, setActiveMediaPreview] = useState(null);
  const [selectedMessageForAction, setSelectedMessageForAction] = useState(null);

  // Control Panel overlay visibility and active initial tab
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [controlInitialTab, setControlInitialTab] = useState('message');

  // Mobile Mockup Phone Shell view toggle
  const [showPhoneFrame, setShowPhoneFrame] = useState(false);

  // Fullscreen state tracking
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Clean Screenshot Mode State (All buttons disappear for taking phone hardware screenshots)
  const [isCleanScreenActive, setIsCleanScreenActive] = useState(false);

  const showToast = (msg) => {
    if (isCleanScreenActive) return; // Suppress toasts during clean screenshot mode
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleStartCleanScreenMode = () => {
    setIsCleanScreenActive(true);
    setToastMessage('📸 Screen clean for 7 seconds! Take your phone screenshot now.');
    setTimeout(() => {
      setToastMessage(null);
    }, 2000); // toast vanishes after 2s so user has 5s of 100% clean screen

    setTimeout(() => {
      setIsCleanScreenActive(false);
      showToast('Prank buttons restored.');
    }, 7000);
  };

  const handleOpenControlsWithTab = (tab = 'message') => {
    setControlInitialTab(tab);
    setIsControlOpen(true);
  };

  // 1-Click exact replica of the user's uploaded phone screenshot!
  const handleLoadScreenshotPreset = (mode = activeMode) => {
    const isMobileMode = mode === 'MOBILE';
    const presetId = 'samir_patra_mobile';
    
    const screenshotChat = {
      id: presetId,
      name: 'Samir Patra 🦁',
      avatar: isMobileMode ? '/presets/mobile_avatar.jpg' : '/presets/samir_avatar.jpg',
      isOnline: false,
      lastSeenText: 'last seen recently',
      isVerified: false,
      showContactBanner: !isMobileMode,
      showInfoCard: true,
      unreadCount: 0,
      messages: [
        {
          id: 'm_text_1',
          sender: 'in',
          text: 'Hiii',
          timestamp: '6:35 PM',
          status: 'read'
        },
        {
          id: 'm_audio_2',
          sender: 'in',
          isDocument: true,
          document: {
            fileName: '0111.wav',
            fileSize: 3.7,
            format: 'wav'
          },
          timestamp: '6:36 PM',
          status: 'read'
        },
        {
          id: 'm_media_3',
          sender: 'in',
          isMediaGrid: true,
          mediaItems: [
            {
              url: isMobileMode ? '/presets/mobile_vid_left.jpg' : '/presets/media_left.jpg',
              duration: ''
            },
            {
              url: isMobileMode ? '/presets/mobile_vid_right.jpg' : '/presets/media_right.jpg',
              duration: ''
            }
          ],
          timestamp: '6:37 PM',
          status: 'read'
        }
      ]
    };

    setChats([screenshotChat]);
    setActiveChatId(presetId);
    showToast('Loaded exact replica of your phone screen!');
  };

  // User chooses mode from Landing Screen


  // Listen to fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Fullscreen toggle handler
  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
        showToast('Full screen activated! The Prank Console remains visible at the top-right.');
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
        showToast('Exited full screen.');
      }
    } catch (err) {
      console.warn('Fullscreen toggle error:', err);
      showToast('Fullscreen toggled.');
    }
  };

  // Chat Actions
  const handleSelectMode = (mode) => {
    setActiveMode(mode);
    setIsControlOpen(false);
    handleLoadScreenshotPreset(mode);
  };

  const handleAddChat = (chatData) => {
    const newId = 'chat_' + Date.now();
    const newChat = {
      id: newId,
      ...chatData,
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newId);
  };

  const handleUpdateChat = (id, updates) => {
    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const handleDeleteChat = (id) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (activeChatId === id) {
      const remaining = chats.filter((c) => c.id !== id);
      setActiveChatId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleClearChatMessages = (id) => {
    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, messages: [] } : c))
    );
  };

  // Message Actions
  const handleSendMessage = ({ 
    chatId, 
    sender, 
    text, 
    timestamp, 
    status, 
    isDocument, 
    document, 
    isMediaGrid, 
    mediaItems,
    isSingleMedia,
    isVideo,
    mediaUrl,
    videoDuration
  }) => {
    const newMessage = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      sender,
      text,
      timestamp: timestamp || formatTime(),
      status: status || 'read',
      isDocument: !!isDocument,
      document,
      isMediaGrid: !!isMediaGrid,
      mediaItems,
      isSingleMedia: !!isSingleMedia,
      isVideo: !!isVideo,
      mediaUrl,
      videoDuration
    };

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      })
    );
  };

  const handleDeleteMessage = (msgId) => {
    if (!activeChatId) return;
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: chat.messages.filter((m) => m.id !== msgId),
          };
        }
        return chat;
      })
    );
  };

  // Reset all to clean blank slate
  const handleResetAll = () => {
    setChats([]);
    setActiveChatId(null);
    setIsControlOpen(false);
    showToast('Reset to blank slate.');
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#0e1621] font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#17212b]/95 text-white text-xs px-4 py-2.5 rounded-full border border-[#2481cc]/40 shadow-2xl backdrop-blur flex items-center gap-2 pointer-events-none animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#2481cc]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screens based on activeMode */}
      {activeMode === 'LANDING' ? (
        <LandingScreen onSelectMode={handleSelectMode} />
      ) : activeMode === 'PC' ? (
        <TelegramPC
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          onOpenControls={handleOpenControlsWithTab}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
          onAddNewChat={() => handleOpenControlsWithTab('chat')}
          onViewMedia={setActiveMediaPreview}
          onMessageClick={setSelectedMessageForAction}
        />
      ) : (
        <TelegramMobile
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          onOpenControls={handleOpenControlsWithTab}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
          onViewMedia={setActiveMediaPreview}
          onMessageClick={setSelectedMessageForAction}
          showPhoneFrame={showPhoneFrame}
          setShowPhoneFrame={setShowPhoneFrame}
          isFullscreen={isFullscreen}
        />
      )}

      {/* Floating Prank Console (Visible & accessible even in Fullscreen, placed without colliding with bottom bar) */}
      {activeMode !== 'LANDING' && (
        <PrankFloatingConsole
          activeMode={activeMode}
          onChangeMode={(mode) => {
            setActiveMode(mode);
            handleLoadScreenshotPreset(mode);
          }}
          onOpenControls={handleOpenControlsWithTab}
          onLoadScreenshotPreset={() => handleLoadScreenshotPreset(activeMode)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          onStartCleanScreenMode={handleStartCleanScreenMode}
          isCleanScreenActive={isCleanScreenActive}
        />
      )}

      {/* Invisible Tap-to-Restore Trigger during Clean Screenshot Mode */}
      {isCleanScreenActive && (
        <div
          onClick={() => {
            setIsCleanScreenActive(false);
            showToast('Prank buttons restored early.');
          }}
          className="fixed top-0 left-0 w-16 h-16 z-50 cursor-pointer"
          title="Tap top-left corner to restore buttons early"
        />
      )}

      {/* Fullscreen Media Lightbox Viewer (Click image to view) */}
      <MediaViewerModal
        media={activeMediaPreview}
        onClose={() => setActiveMediaPreview(null)}
        chatName={chats.find((c) => c.id === activeChatId)?.name || 'Telegram Contact'}
      />

      {/* Click Message Action Menu (Click on message to delete or copy) */}
      <MessageActionMenu
        message={selectedMessageForAction}
        onClose={() => setSelectedMessageForAction(null)}
        onDelete={(id) => {
          handleDeleteMessage(id);
          showToast('Message deleted');
        }}
        onViewMedia={setActiveMediaPreview}
      />

      {/* Floating Controls Overlay Modal */}
      <ControlPanel
        isOpen={isControlOpen}
        onClose={() => setIsControlOpen(false)}
        initialTab={controlInitialTab}
        activeMode={activeMode}
        onChangeMode={(mode) => {
          setActiveMode(mode);
          handleLoadScreenshotPreset(mode);
        }}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onAddChat={handleAddChat}
        onUpdateChat={handleUpdateChat}
        onDeleteChat={handleDeleteChat}
        onClearChatMessages={handleClearChatMessages}
        onAddMessage={handleSendMessage}
        onEnterFullscreen={handleToggleFullscreen}
        onResetAll={handleResetAll}
        onLoadScreenshotPreset={() => handleLoadScreenshotPreset(activeMode)}
      />
    </div>
  );
}
