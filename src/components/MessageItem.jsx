import React from 'react';
import { 
  Check, 
  CheckCheck, 
  FileText, 
  Trash2,
  Play,
  MoreVertical,
  Eye
} from 'lucide-react';

export default function MessageItem({ 
  message, 
  onDeleteMessage, 
  onViewMedia,
  onMessageClick,
  isMobile = false,
  accentColor = '#2481cc'
}) {
  const isOut = message.sender === 'out';

  // Format file size display
  const renderFileSize = (sizeInMB, format = '') => {
    if (!sizeInMB && sizeInMB !== 0) return '0 KB';
    const ext = format ? ` ${format.toUpperCase()}` : '';
    if (sizeInMB < 1) {
      return `${Math.round(sizeInMB * 1024)} KB${ext}`;
    }
    return `${Number(sizeInMB).toFixed(1)} MB${ext}`;
  };

  // Render Document / Audio File
  const renderDocumentOrAudio = (doc) => {
    const size = Number(doc?.fileSize || 0);
    const format = (doc?.format || 'wav').toLowerCase().replace('.', '');
    const isLargeDocument = size > 100;

    if (isLargeDocument) {
      return (
        <div className="flex items-center gap-3 pr-2">
          <div className="relative w-12 h-12 rounded-full bg-[#2481cc] flex items-center justify-center text-white shrink-0 shadow">
            <FileText className="w-6 h-6" />
            <span className="absolute -bottom-1 text-[8px] font-extrabold uppercase bg-white text-[#2481cc] px-1 rounded shadow">
              DOC
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-medium leading-tight truncate text-white" title={doc.fileName}>
              {doc.fileName || 'Document'}
            </p>
            <p className="text-[12.5px] text-[#7e8c99] mt-0.5">
              {renderFileSize(doc.fileSize, format)}
            </p>
          </div>
          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              onMessageClick && onMessageClick(message);
            }}
            className="text-[#7e8c99] hover:text-white p-1"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      );
    } else {
      // Circular blue badge with white document/audio icon or format name
      return (
        <div className="flex items-center gap-3 pr-2">
          <div className="w-12 h-12 rounded-full bg-[#2481cc] flex items-center justify-center text-white shrink-0 shadow">
            <FileText className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-medium leading-tight truncate text-white" title={doc.fileName}>
              {doc.fileName || '0111.wav'}
            </p>
            <p className="text-[12.5px] text-[#7e8c99] mt-0.5 uppercase">
              {renderFileSize(doc.fileSize, format)}
            </p>
          </div>
          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              onMessageClick && onMessageClick(message);
            }}
            className="text-[#7e8c99] hover:text-white p-1"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      );
    }
  };

  const isMediaOrDoc = message.isSingleMedia || message.isMediaGrid || message.isDocument;

  return (
    <div className={`group relative flex w-full ${isMediaOrDoc ? 'mb-3.5 sm:mb-3 mt-1' : 'mb-2 sm:mb-1.5'} px-1 sm:px-3 ${isOut ? 'justify-end' : 'justify-start'}`}>
      {/* Delete button on hover for desktop */}
      {onDeleteMessage && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteMessage(message.id);
          }}
          className={`absolute top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-red-400 hover:text-red-300 hover:bg-black/40 rounded z-30 ${
            isOut ? 'left-auto -ml-8 -translate-x-full' : 'right-auto -mr-8 translate-x-full'
          }`}
          title="Delete message"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Case 1: Single Image or Single Video Message */}
      {message.isSingleMedia && message.mediaUrl ? (
        <div
          onClick={() => onMessageClick && onMessageClick(message)}
          className={`relative max-w-[85%] sm:max-w-[340px] rounded-2xl overflow-hidden shadow-md cursor-pointer transition-all hover:brightness-105 active:scale-[0.99] ${
            isOut ? 'bg-[#2b5278] rounded-br-[4px]' : 'bg-[#212d3b] rounded-bl-[4px] border border-white/[0.04]'
          }`}
          title="Click to view image or delete message"
        >
          {/* Media Container (Click to view image in full screen) */}
          <div 
            className="relative aspect-[4/3] w-full bg-[#151b22] overflow-hidden group/media"
            onClick={(e) => {
              e.stopPropagation();
              onViewMedia && onViewMedia({
                url: message.mediaUrl,
                isVideo: message.isVideo,
                duration: message.videoDuration,
                caption: message.text,
                timestamp: message.timestamp
              });
            }}
          >
            <img
              src={message.mediaUrl}
              alt="media"
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-200 group-hover/media:scale-[1.02]"
            />

            {/* Video Play Overlay */}
            {message.isVideo && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-black/45 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 shadow-lg">
                  <Play className="w-5 h-5 fill-white translate-x-0.5" />
                </div>
              </div>
            )}

            {/* Duration pill (top left for videos) */}
            {message.isVideo && message.videoDuration && (
              <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1 select-none">
                <span>{message.videoDuration}</span>
              </div>
            )}

            {/* View Fullscreen Icon Hint on top-right */}
            <div className="absolute top-2 right-2 p-1 rounded-full bg-black/40 text-white/90">
              <Eye className="w-3.5 h-3.5" />
            </div>

            {/* Floating Timestamp pill on the image (if no text caption) */}
            {!message.text && (
              <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-normal flex items-center gap-1 select-none">
                <span>{message.timestamp || '6:35 PM'}</span>
                {isOut && (
                  <span className="text-[#58b9ff]">
                    {message.status === 'read' ? (
                      <CheckCheck className="w-3 h-3 stroke-[2.2]" />
                    ) : (
                      <Check className="w-3 h-3 stroke-[2.2]" />
                    )}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Caption text below image (if any) */}
          {message.text && (
            <div className="px-3 py-2 text-[14.5px] leading-snug break-words text-white flex items-end justify-between gap-3">
              <span>{message.text}</span>
              <div className="inline-flex items-center gap-1 text-[11px] text-[#7e8c99] shrink-0 pb-0.5 select-none">
                <span>{message.timestamp || '6:35 PM'}</span>
                {isOut && (
                  <span className="text-[#58b9ff]">
                    {message.status === 'read' ? (
                      <CheckCheck className="w-3 h-3 stroke-[2.2]" />
                    ) : (
                      <Check className="w-3 h-3 stroke-[2.2]" />
                    )}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      ) : message.isMediaGrid && message.mediaItems && message.mediaItems.length > 0 ? (
        /* Case 2: Media Grid (2 or more photos/videos side-by-side) */
        <div 
          onClick={() => onMessageClick && onMessageClick(message)}
          className="relative rounded-2xl overflow-hidden max-w-[90%] sm:max-w-[480px] bg-[#212d3b] shadow-md border border-white/5 cursor-pointer"
          title="Click to view or delete"
        >
          <div className={`grid gap-[3px] ${message.mediaItems.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {message.mediaItems.map((item, idx) => (
              <div 
                key={idx} 
                className="relative aspect-[4/5] bg-[#1a1a1a] overflow-hidden group/item cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewMedia && onViewMedia({
                    url: item.url,
                    isVideo: item.isVideo !== false,
                    duration: item.duration,
                    caption: message.text,
                    timestamp: message.timestamp
                  });
                }}
              >
                <img
                  src={item.url}
                  alt={`media-${idx}`}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-200 group-hover/item:scale-[1.02]"
                />

                {/* Circular Play Button Overlay for video items */}
                {(item.isVideo !== false) && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 shadow-lg">
                      <Play className="w-5 h-5 fill-white translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* View Fullscreen Icon Hint */}
                <div className="absolute top-2 right-2 p-1 rounded-full bg-black/40 text-white/90">
                  <Eye className="w-3.5 h-3.5" />
                </div>

                {/* Duration pill (if specified) */}
                {item.duration && (
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1 select-none">
                    <span>{item.duration}</span>
                  </div>
                )}

                {/* Timestamp pill (bottom right on the last item) */}
                {idx === message.mediaItems.length - 1 && !message.text && (
                  <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-normal flex items-center gap-1 select-none">
                    <span>{message.timestamp || '6:37 PM'}</span>
                    {isOut && (
                      <span className="text-[#58b9ff]">
                        {message.status === 'read' ? (
                          <CheckCheck className="w-3 h-3 stroke-[2.2]" />
                        ) : (
                          <Check className="w-3 h-3 stroke-[2.2]" />
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Caption if provided */}
          {message.text && (
            <div className="px-3 py-2 text-[14.5px] leading-snug break-words text-white flex items-end justify-between gap-3">
              <span>{message.text}</span>
              <div className="inline-flex items-center gap-1 text-[11px] text-[#7e8c99] shrink-0 pb-0.5 select-none">
                <span>{message.timestamp || '6:37 PM'}</span>
                {isOut && (
                  <span className="text-[#58b9ff]">
                    {message.status === 'read' ? (
                      <CheckCheck className="w-3 h-3 stroke-[2.2]" />
                    ) : (
                      <Check className="w-3 h-3 stroke-[2.2]" />
                    )}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Case 3: Standard Bubble (Text or Document) */
        <div
          onClick={() => onMessageClick && onMessageClick(message)}
          className={`relative max-w-[85%] md:max-w-[70%] rounded-2xl px-3 py-2 text-white shadow-sm cursor-pointer transition-all hover:brightness-105 active:scale-[0.99] ${
            isOut 
              ? 'bg-[#2b5278] rounded-br-[4px]' 
              : 'bg-[#212d3b] rounded-bl-[4px] border border-white/[0.04]'
          }`}
          title="Click to delete or copy message"
        >
          {/* Document / Audio File */}
          {message.isDocument && message.document ? (
            <div className="flex flex-col gap-1 min-w-[210px] sm:min-w-[240px]">
              {renderDocumentOrAudio(message.document)}
              
              {/* Optional Caption */}
              {message.text && (
                <p className="text-[14px] leading-relaxed break-words whitespace-pre-wrap mt-1 text-[#e1e8ed]">
                  {message.text}
                </p>
              )}
            </div>
          ) : (
            /* Plain Text */
            <div className="text-[15.5px] leading-snug break-words whitespace-pre-wrap pr-10 pb-0.5">
              {message.text}
            </div>
          )}

          {/* Timestamp and Delivery Checks */}
          <div
            className={`float-right ml-2.5 inline-flex items-center gap-1 select-none pointer-events-none text-[11px] font-normal leading-none -mb-0.5 ${
              isOut ? 'text-white/80' : 'text-[#7e8c99]'
            }`}
            style={{ verticalAlign: 'baseline' }}
          >
            <span>{message.timestamp || '6:35 PM'}</span>
            
            {isOut && (
              <span className="inline-flex items-center text-white">
                {message.status === 'read' ? (
                  <CheckCheck className="w-3.5 h-3.5 stroke-[2.2]" />
                ) : (
                  <Check className="w-3.5 h-3.5 stroke-[2.2]" />
                )}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
