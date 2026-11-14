# PROJECT SABDHA 22 – A Little Universe of Memories ✨🎂

An interactive, animated birthday experience created for **Sabdha's 22nd Birthday (22 November 2026)**.

This website tells a cinematic story across two distinct visual worlds:
- **World 1: Memory World** – Pastel pinks, soft lavenders, polaroid scrapbooks, horizontal/vertical timelines, clothesline photo hangings, film strips, 3D interactive flipping cards, and an animated wax-sealed birthday letter.
- **World 2: Magical Universe** – A full-screen starlit night sky, glowing full moon, mountain silhouettes, calm lake with water ripples and moonlight reflections, floating fireflies, shooting stars, and an interactive 22 Little Wishes constellation.

---

## 🌟 Live Features & Experience Flow

1. **Scene 01 – The Secret Invitation**: A mysterious purple ambient sky with floating glowing specks and an animated envelope sealed with a heart. Clicking opens the flap with an ethereal light burst.
2. **Scene 02 – Happy Birthday Welcome**: Celebratory confetti blast, pastel clouds, floating balloons, and milestone display (22 November 2026 • 22 Years).
3. **Scene 03 – Chapter 01: Little Sabdha**: 6 Polaroid childhood memories in an animated scrapbook layout.
4. **Scene 04 – Chapter 02: Growing Up**: Interactive chronological timeline from childhood to age 22 with age markers and smooth scrolling.
5. **Scene 05 – Chapter 03: Her Beautiful World**: 6 warm, golden-framed family keepsakes.
6. **Scene 06 – Chapter 04: Beautiful People, Beautiful Memories**: 5 cheerful memories with friends hanging from a twine clothesline with clothespin clips.
7. **Scene 07 – Chapter 05: Our Little World**: 5 intimate best-friend memories featured in a retro 35mm film strip and scrapbook collage.
8. **Scene 08 – Chapter 06: What Makes You, You**: 3 interactive 3D-flipping cards (Your Smile, Your Personality, Your Dreams) and 3 portrait moments.
9. **Scene 09 – Chapter 07: A Letter From Me**: An animated wax-sealed envelope that opens to reveal a heartfelt parchment letter with handwritten signature.
10. **Scene 10 – Chapter 08: Catch the Stars Game**: An interactive celestial mini-game where Sabdha catches 5 glowing stars in the sky to unlock 5 unique birthday wishes (Happiness, Success, Strength, Love, Magic).
11. **Scene 11 – Chapter 09: The Magical Universe**: An immersive night landscape powered by HTML5 Canvas with thousands of twinkling stars, shooting stars, a radiant full moon, mountain silhouettes, a peaceful lake with animated water ripples and moonlight reflection, floating glowing fireflies, celestial birthday typography, and a clickable moon unlocking **22 Little Wishes**.

---

## 📸 Photo Replacement Guide

The website is **100% operational right now** using high-resolution artistic placeholders. When you are ready to replace them with Sabdha's actual photos, **you do not need to modify any animation or layout code**.

### Target Folder Structure (`public/photos/`)

Simply drop your JPG/PNG files into the corresponding directories using the exact names below:

```
public/
  photos/
    childhood/
      photo-01.jpg   (Baby / early childhood)
      photo-02.jpg   (Toddler smiles)
      photo-03.jpg   (Little explorer)
      photo-04.jpg   (School days)
      photo-05.jpg   (Playful memories)
      photo-06.jpg   (Little star portrait)
    growing-up/
      photo-01.jpg   (Age ~12 / Early blossoms)
      photo-02.jpg   (Age ~14 / School days)
      photo-03.jpg   (Age ~16 / Sweet sixteen)
      photo-04.jpg   (Age ~18 / Milestone 18)
      photo-05.jpg   (Age ~20 / College / Youth)
      photo-06.jpg   (Age ~22 / Golden 22)
    family/
      photo-01.jpg   (Family warmth)
      photo-02.jpg   (Festival celebrations)
      photo-03.jpg   (Unconditional love)
      photo-04.jpg   (Shared meals & laughter)
      photo-05.jpg   (Loving guidance)
      photo-06.jpg   (Proud moments together)
    friends/
      photo-01.jpg   (Laughter squad)
      photo-02.jpg   (Candid joy)
      photo-03.jpg   (Outings & road trips)
      photo-04.jpg   (Group celebrations)
      photo-05.jpg   (Good vibes & smiles)
    our-memories/
      photo-01.jpg   (Day one / early friendship)
      photo-02.jpg   (Midnight talks / fun times)
      photo-03.jpg   (Partners in crime / adventure)
      photo-04.jpg   (Always there for each other)
      photo-05.jpg   (Cherished best friends photo)
    special-moments/
      photo-01.jpg   (Her radiant smile)
      photo-02.jpg   (Grace & poise)
      photo-03.jpg   (Dreams & aspirations)
    birthday-letter/
      photo-01.jpg   (Optional: Keepsake background portrait)
    finale/
      photo-01.jpg   (Optional: Sabdha at 22 under the stars)
```

### Editing Captions, Dates & Tags
All photo data is centralized in **`src/data/photos.ts`**.
To customize a caption, year, or tag, simply edit the text in that file:

```typescript
{
  id: "childhood-01",
  src: "/photos/childhood/photo-01.jpg",
  caption: "Your custom caption here",
  year: "2004",
  tag: "Baby Steps"
}
```

---

## ✍️ Customizing Content & Text

All personal messages, letters, titles, and wishes are kept strictly separated from UI code:

1. **Sabdha's Details & Titles**: `src/data/birthdayContent.ts`
   - Name, birth date, celebration date, age.
   - Chapter headings and subtitles.
   - 3D Interactive Traits (Your Smile, Your Personality, Your Dreams).
2. **Heartfelt Birthday Letter**: `src/data/birthdayContent.ts` (`personalLetter`)
   - Salutation, paragraphs, closing, and signature.
3. **5 Star Wishes**: `src/data/birthdayContent.ts` (`fiveStarWishes`)
4. **22 Little Birthday Wishes**: `src/data/wishes.ts` (`twentyTwoWishes`)
   - 22 unique, non-repeating blessings displayed in the finale constellation.

---

## 🎵 Sound & Audio System

The project features a **Web Audio API procedural sound synthesizer**:
- Plays soothing, dreamy music box arpeggios and warm bass pads automatically without needing external audio downloads.
- Ambient world switching: Warm harmonic chords in Memory World, ethereal celestial tones in the Magical Universe.
- Interactive Sound Effects:
  - Paper envelope opening swoosh
  - Crystalline star collection chimes
  - Water droplet ripples on lake tap
  - Celestial harmonic chord burst when unlocking the universe

### Using Custom MP3 Music (Optional)
If you prefer your own MP3 tracks:
1. Place your track at `public/audio/bg-music.mp3` or `public/audio/finale-music.mp3`.
2. The UI includes play/pause, mute/unmute, and volume slider controls accessible on all devices.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
# Clone or navigate to the project directory
cd SABDHA

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build
```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **"Deploy"**.
6. Your birthday website will be live with a secure HTTPS URL to send to Sabdha on 22 November 2026!

---

## 📱 Accessibility & Responsiveness

- Mobile-first design tested across 320px–430px mobile, tablets, and desktops.
- Respects `prefers-reduced-motion` to tone down particle movements for sensitive visitors.
- Keyboard navigation: Left/Right arrows navigate between story chapters.
- Full touch and tap responsiveness on mobile screens.

---

*Created with love, just for Sabdha. ❤️*
