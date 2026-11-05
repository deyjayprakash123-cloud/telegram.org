// Telegram standard avatar gradient colors
export const TELEGRAM_AVATAR_GRADIENTS = [
  { name: 'Red', gradient: 'from-[#e17076] to-[#ff885e]' },
  { name: 'Orange', gradient: 'from-[#faa774] to-[#ffbe5b]' },
  { name: 'Violet', gradient: 'from-[#a695e7] to-[#7bc862]' },
  { name: 'Green', gradient: 'from-[#7bc862] to-[#6ec9cb]' },
  { name: 'Cyan', gradient: 'from-[#65aadd] to-[#a695e7]' },
  { name: 'Blue', gradient: 'from-[#5587eb] to-[#75c6ef]' },
  { name: 'Pink', gradient: 'from-[#ee7aae] to-[#faa774]' },
];

export function getAvatarColor(name = '') {
  if (!name) return TELEGRAM_AVATAR_GRADIENTS[5].gradient;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % TELEGRAM_AVATAR_GRADIENTS.length;
  return TELEGRAM_AVATAR_GRADIENTS[index].gradient;
}

export function getInitials(name = '') {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function formatTime(date = new Date()) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  return `${hours}:${minutes} ${ampm}`;
}

