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
    
    // Main featured chat: Samir Patra 🦁
    const screenshotChat = {
      id: presetId,
      name: 'Samir Patra 🦁',
      avatar: isMobileMode ? '/presets/mobile_avatar.jpg' : '/presets/samir_avatar.jpg',
      phoneNumber: '+91 98765 43210',
      countryName: 'India',
      countryFlag: '🇮🇳',
      registrationDate: 'February 2021',
      isOfficialAccount: false,
      isOnline: false,
      lastSeenText: 'last seen recently',
      isVerified: false,
      showContactBanner: true, // Shows ADD CONTACT / BLOCK USER banner
      showInfoCard: true,      // Shows center card with phone, flag & date
      unreadCount: 0,
      messages: [
        {
          id: 'm_text_1',
          sender: 'in',
          text: 'Hiii',
          timestamp: '06:35 PM',
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
          timestamp: '06:36 PM',
          status: 'read'
        },
        {
          id: 'm_media_3',
          sender: 'in',
          isMediaGrid: true,
          mediaItems: [
            {
              url: isMobileMode ? '/presets/mobile_vid_left.jpg' : '/presets/media_left.jpg',
              duration: '1:38',
              isVideo: true
            },
            {
              url: isMobileMode ? '/presets/mobile_vid_right.jpg' : '/presets/media_right.jpg',
              duration: '0:23',
              isVideo: true
            }
          ],
          timestamp: '06:37 PM',
          status: 'read'
        }
      ]
    };

    // Realistic companion chats from user's screenshot (media_1793954649459_c7b609bb.jpg)
    const companionChats = [
      {
        id: 'chat_movies_hub',
        name: 'Movies Hub',
        avatar: '',
        phoneNumber: '+1 555 0192',
        countryName: 'United States',
        countryFlag: '🇺🇸',
        registrationDate: 'January 2020',
        isOnline: false,
        lastSeenText: '11:04 PM',
        unreadCount: 30,
        messages: [
          {
            id: 'm_mh_1',
            sender: 'in',
            text: 'Black Sovereign: 🧿 TITLE : the movie files have been updated',
            timestamp: '11:04 PM',
            status: 'read'
          }
        ]
      },
      screenshotChat,
      {
        id: 'chat_cipher_god',
        name: 'Cipher God',
        avatar: '',
        phoneNumber: '+44 7911 123456',
        countryName: 'United Kingdom',
        countryFlag: '🇬🇧',
        registrationDate: 'March 2022',
        isOnline: false,
        lastSeenText: '12:22 AM',
        unreadCount: 14,
        messages: [
          {
            id: 'm_cg_1',
            sender: 'in',
            text: 'Canva laid off 1271 employees, games division restructuring announced',
            timestamp: '12:22 AM',
            status: 'read'
          }
        ]
      },
      {
        id: 'chat_ritu',
        name: 'Ritu',
        avatar: '',
        phoneNumber: '+91 98112 33445',
        countryName: 'India',
        countryFlag: '🇮🇳',
        registrationDate: 'October 2023',
        isOnline: false,
        lastSeenText: 'Wed',
        unreadCount: 0,
        messages: [
          {
            id: 'm_rt_1',
            sender: 'in',
            text: 'Ritu joined Telegram!',
            timestamp: 'Wed',
            status: 'read'
          }
        ]
      },
      {
        id: 'chat_user_mgr',
        name: 'User manager',
        avatar: '',
        phoneNumber: '+91 97223 44556',
        countryName: 'India',
        countryFlag: '🇮🇳',
        registrationDate: 'July 2021',
        isOnline: false,
        lastSeenText: 'Wed',
        unreadCount: 0,
        messages: [
          {
            id: 'm_um_1',
            sender: 'in',
            text: '📢 Managed Groups (2): 1. Unknown Channel...',
            timestamp: 'Wed',
            status: 'read'
          }
        ]
      },
      {
        id: 'chat_sweta',
        name: 'Sweta',
        avatar: '',
        phoneNumber: '+91 96334 55667',
        countryName: 'India',
        countryFlag: '🇮🇳',
        registrationDate: 'May 2022',
        isOnline: false,
        lastSeenText: 'Sun',
        unreadCount: 0,
        messages: [
          {
            id: 'm_sw_1',
            sender: 'out',
            text: '↪ 🎬 📁 File Name : Obsession 2022...',
            timestamp: 'Sun',
            status: 'read'
          }
        ]
      },
      {
        id: 'chat_black_sov',
        name: 'Black Sovereign',
        avatar: '',
        phoneNumber: '+49 151 23456789',
        countryName: 'Germany',
        countryFlag: '🇩🇪',
        registrationDate: 'November 2020',
        isOnline: false,
        lastSeenText: 'Sun',
        unreadCount: 0,
        messages: [
          {
            id: 'm_bs_1',
            sender: 'in',
            text: 'YOUR VIDEO / FILE IS SUCCESSFULLY READY',
            timestamp: 'Sun',
            status: 'read'
          }
        ]
      }
    ];

    setChats(companionChats);
    setActiveChatId(presetId);
    showToast('Loaded exact replica of your phone screen & chats!');
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
          onUpdateChat={handleUpdateChat}
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
          onUpdateChat={handleUpdateChat}
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
