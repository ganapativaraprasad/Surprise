import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = [
  'public/photos/childhood',
  'public/photos/growing-up',
  'public/photos/family',
  'public/photos/friends',
  'public/photos/our-memories',
  'public/photos/special-moments',
  'public/photos/birthday-letter',
  'public/photos/finale',
  'public/audio'
];

for (const d of dirs) {
  const fullPath = path.resolve(__dirname, '..', d);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
}

// Generate an SVG image and save as both .svg and .jpg for placeholder availability
function generateSvg(title, label, color1, color2, icon) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.3" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
    </defs>
    <rect width="800" height="1000" fill="url(#grad)" />
    <rect x="30" y="30" width="740" height="940" rx="20" fill="none" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="4" stroke-dasharray="12 12" />
    <circle cx="400" cy="450" r="140" fill="#FFFFFF" fill-opacity="0.35" />
    <text x="400" y="470" font-family="'Plus Jakarta Sans', sans-serif" font-size="80" text-anchor="middle" dominant-baseline="middle">${icon}</text>
    <text x="400" y="650" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="#3D3043" text-anchor="middle">${title}</text>
    <text x="400" y="700" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" fill="#5F4B66" text-anchor="middle">${label}</text>
    <rect x="250" y="740" width="300" height="44" rx="22" fill="#FFFFFF" fill-opacity="0.7" />
    <text x="400" y="768" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="bold" fill="#3D3043" text-anchor="middle" letter-spacing="2">REPLACE WITH YOUR PHOTO</text>
  </svg>`;
}

const photoMap = [
  { dir: 'public/photos/childhood', count: 6, prefix: 'photo-', label: 'Childhood Memory', c1: '#FCE7F3', c2: '#FBCFE8', icon: '🧸' },
  { dir: 'public/photos/growing-up', count: 6, prefix: 'photo-', label: 'Growing Up', c1: '#E0F2FE', c2: '#BAE6FD', icon: '🌱' },
  { dir: 'public/photos/family', count: 6, prefix: 'photo-', label: 'Family Moment', c1: '#FEF3C7', c2: '#FDE68A', icon: '🏡' },
  { dir: 'public/photos/friends', count: 5, prefix: 'photo-', label: 'Friends & Fun', c1: '#EDE9FE', c2: '#DDD6FE', icon: '🎉' },
  { dir: 'public/photos/our-memories', count: 5, prefix: 'photo-', label: 'Our Memories', c1: '#FFE4E6', c2: '#FECDD3', icon: '🤞' },
  { dir: 'public/photos/special-moments', count: 3, prefix: 'photo-', label: 'Special Moment', c1: '#DCFCE7', c2: '#BBF7D0', icon: '✨' },
  { dir: 'public/photos/birthday-letter', count: 1, prefix: 'photo-', label: 'Letter Keepsake', c1: '#F3E8FF', c2: '#D8B4FE', icon: '💌' },
  { dir: 'public/photos/finale', count: 1, prefix: 'photo-', label: 'Finale Portrait', c1: '#1E1B4B', c2: '#4338CA', icon: '🌙' },
];

for (const p of photoMap) {
  for (let i = 1; i <= p.count; i++) {
    const num = String(i).padStart(2, '0');
    const filenameJpg = `${p.prefix}${num}.jpg`;
    const fullPathJpg = path.resolve(__dirname, '..', p.dir, filenameJpg);
    
    // Save SVG content directly as svg data
    const svgContent = generateSvg(`${p.label} #${num}`, `Slot: ${p.dir.replace('public/photos/', '')}/${num}`, p.c1, p.c2, p.icon);
    fs.writeFileSync(fullPathJpg, svgContent, 'utf8');
  }
}

console.log('Successfully generated all photo placeholders in public/photos/');
