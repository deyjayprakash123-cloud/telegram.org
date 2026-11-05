import React from 'react';

export default function TelegramDoodleBackground({ 
  tint = 'mobile', // 'mobile' (matches mobile screenshot) | 'purple' (desktop) | 'classic'
  opacity = 0.26 
}) {
  // Mobile uses Telegram Android dark-blue theme: base #0e1621 with steel-cyan doodles
  // Desktop uses Telegram Night theme: base #0f0f0f with pink/purple-tinted doodles
  const isMobile = tint === 'mobile';
  
  const bgColor = isMobile ? '#0e1621' : '#0f0f0f';
  const strokeColor = isMobile 
    ? 'rgba(85, 138, 185, 0.28)' 
    : 'rgba(215, 125, 195, 0.22)';

  return (
    <div 
      className="absolute inset-0 pointer-events-none select-none overflow-hidden" 
      style={{ 
        backgroundColor: bgColor,
        zIndex: 0
      }}
    >
      <svg
        className="w-full h-full"
        style={{ opacity }}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id={isMobile ? "tg-doodles-mobile" : "tg-doodles-desktop"}
            width={isMobile ? "320" : "340"}
            height={isMobile ? "320" : "340"}
            patternUnits="userSpaceOnUse"
          >
            {/* 1. Watermelon slice (top left in screenshot) */}
            <path
              d="M25 45 C25 25 50 25 55 45 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path d="M28 42 C30 28 50 28 52 42" fill="none" stroke={strokeColor} strokeWidth="1.2" />
            <circle cx="36" cy="38" r="1" fill={strokeColor} />
            <circle cx="44" cy="37" r="1" fill={strokeColor} />

            {/* 2. Cat playing guitar / ukulele (iconic Telegram mobile doodle!) */}
            <path
              d="M110 32 L106 24 L114 26 C117 25 123 25 126 26 L134 24 L130 32 C134 38 134 46 128 50 C120 54 114 54 108 50 C104 46 104 38 110 32 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Guitar neck and body */}
            <path
              d="M128 42 L148 30 L152 33 L132 45 Z M120 45 C116 48 116 54 120 57 C124 59 130 56 128 50 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.4"
            />

            {/* 3. Rocket / Party Popper (around x=220, y=30) */}
            <path
              d="M210 50 L225 25 C230 22 238 25 240 30 L235 45 Z M215 42 L205 52 M228 38 L236 50"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Confetti dots */}
            <circle cx="245" cy="22" r="1.5" fill={strokeColor} />
            <circle cx="235" cy="15" r="1.5" fill={strokeColor} />
            <circle cx="250" cy="32" r="1" fill={strokeColor} />

            {/* 4. Banana bunch (around x=280, y=50) */}
            <path
              d="M275 35 C285 32 298 38 305 50 C298 52 288 48 280 40 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            <path
              d="M278 40 C288 38 298 44 302 54 C295 55 288 52 282 46 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.3"
            />

            {/* 5. Pencil (around x=20, y=100) */}
            <path
              d="M22 105 L42 85 L48 91 L28 111 L20 113 Z M42 85 L46 81 L52 87 L48 91"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* 6. Cocktail glass with straw (around x=110, y=110) */}
            <path
              d="M105 95 L125 95 L115 112 V124 M110 124 H120 M120 90 L126 80"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* 7. Pizza Slice (around x=200, y=110) */}
            <path
              d="M190 95 C205 92 215 95 220 98 L205 125 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="205" cy="105" r="2" fill="none" stroke={strokeColor} strokeWidth="1" />
            <circle cx="202" cy="115" r="1.5" fill="none" stroke={strokeColor} strokeWidth="1" />

            {/* 8. Cake slice with cherry (around x=280, y=115) */}
            <path
              d="M270 125 L295 105 L305 115 L280 135 Z M270 125 V135 L280 142 V135"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="292" cy="100" r="3" fill="none" stroke={strokeColor} strokeWidth="1.4" />

            {/* 9. Paper plane (around x=30, y=180) */}
            <path
              d="M25 185 L60 197 L43 203 L37 215 L33 203 Z M43 203 L35 195"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 10. Cupcake / Muffin (around x=120, y=185) */}
            <path
              d="M112 195 C110 185 125 180 132 188 C138 182 148 188 144 195 Z M112 195 L116 210 H140 L144 195"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* 11. Balloon with string (around x=210, y=180) */}
            <path
              d="M205 180 C205 168 225 168 225 180 C225 192 215 196 215 198 L213 198 M215 198 C213 204 218 208 214 215"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* 12. Dog / Fox cute face (around x=285, y=185) */}
            <path
              d="M275 190 L270 178 L282 182 C286 180 294 180 298 182 L310 178 L305 190 C308 196 308 204 300 208 C294 210 286 210 280 208 C272 204 272 196 275 190 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            <circle cx="284" cy="193" r="1.5" fill={strokeColor} />
            <circle cx="296" cy="193" r="1.5" fill={strokeColor} />
            <path d="M290 198 L288 201 H292 Z" fill={strokeColor} />

            {/* 13. Game controller (around x=40, y=260) */}
            <path
              d="M30 260 C25 260 20 265 20 273 C20 281 24 285 28 283 L36 275 H54 L62 283 C66 285 70 281 70 273 C70 265 65 260 60 260 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M28 267 V271 M26 269 H30 M58 267 H62 M60 269 H64" stroke={strokeColor} strokeWidth="1.4" strokeLinecap="round" />

            {/* 14. Palm tree / Cactus (around x=125, y=260) */}
            <path
              d="M125 285 V255 M125 265 C118 265 115 260 115 255 M125 272 C132 272 135 267 135 262"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            {/* 15. Ice cream cone (around x=210, y=260) */}
            <path
              d="M205 255 C205 248 220 248 220 255 Z M205 255 L212 275 L220 255 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* 16. Lightbulb & speech bubble (around x=280, y=260) */}
            <path
              d="M280 255 C276 255 272 259 272 264 C272 268 275 271 276 274 H284 C285 271 288 268 288 264 C288 259 284 255 280 255 Z M277 277 H283"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.4"
            />

            {/* Micro stars and sparkles */}
            <circle cx="80" cy="50" r="1.5" fill={strokeColor} />
            <circle cx="170" cy="65" r="2" fill={strokeColor} />
            <circle cx="70" cy="145" r="1.5" fill={strokeColor} />
            <circle cx="160" cy="140" r="2" fill={strokeColor} />
            <circle cx="250" cy="145" r="1.5" fill={strokeColor} />
            <circle cx="85" cy="225" r="2" fill={strokeColor} />
            <circle cx="175" cy="215" r="1.5" fill={strokeColor} />
            <circle cx="260" cy="225" r="2" fill={strokeColor} />
            <circle cx="85" cy="295" r="1.5" fill={strokeColor} />
            <circle cx="165" cy="290" r="2" fill={strokeColor} />
            <circle cx="245" cy="295" r="1.5" fill={strokeColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={isMobile ? "url(#tg-doodles-mobile)" : "url(#tg-doodles-desktop)"} />
      </svg>
    </div>
  );
}
