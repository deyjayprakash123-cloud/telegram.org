# Fake Telegram Chat Generator

A prank and mockup web application that faithfully replicates the user interface of **Telegram Desktop (PC)** and **Telegram Mobile**. Designed for realistic prank screenshots, UI design mockups, and presentations.

## Features

- **Dual Modes (PC & Mobile)**:
  - **Telegram Desktop (PC)**: Realistic 350px left sidebar, dark theme (`#0e1621` & `#17212b`), vector Telegram doodle wallpaper, search bar, active chat highlight, unread counter badges.
  - **Telegram Mobile**: Android/iOS status bar, mobile top bar, chat list, message conversation screen with back button, and bottom-right Floating Action Button (FAB).
- **Blank Slate Start**:
  - Starts with zero saved chats on load or refresh (100% in-memory state, strictly no `localStorage` persistence).
- **Fake Document Logic**:
  - File size **> 100MB** automatically displays as a Telegram **Document** icon with a `DOC` tag.
  - File size **< 100MB** automatically displays as a Telegram **Media/File** icon (Audio, Video, Archive, or File) with an active badge.
- **Message Customization**:
  - Incoming vs. Outgoing toggle.
  - Editable sender name and status ("online" / "last seen recently").
  - Upload custom DP / Avatar or use Telegram's iconic color gradient initials.
  - Official blue verified checkmark badge toggle.
  - Custom timestamps (e.g., "10:42 PM") and 1-click current time.
  - Single check (sent) and double check (read receipts) for outgoing messages.
  - Real-time inline typing in the bottom input bar as well as bulk additions via the Control Panel.
- **Confirm & Fullscreen Prank Mode**:
  - One-click "Confirm & Go Fullscreen" button invokes `requestFullscreen()` and hides the controls overlay for seamless, pixel-perfect screenshots.
  - Discreet floating trigger to easily reopen the controls anytime.

## Tech Stack

- **React 18**
- **Tailwind CSS**
- **Lucide React** (Icons)
- **Vite**

## Getting Started

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

### Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy!

