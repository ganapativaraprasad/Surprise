export interface BirthdayPhoto {
  id: string;
  src: string;
  placeholderSrc?: string;
  caption: string;
  year?: string;
  date?: string;
  alt: string;
  rotation?: number; // visual tilt for polaroids (-6 to 6 deg)
  tag?: string;
}

export interface BirthdayPhotoCollection {
  childhood: BirthdayPhoto[];
  growingUp: BirthdayPhoto[];
  family: BirthdayPhoto[];
  friends: BirthdayPhoto[];
  ourMemories: BirthdayPhoto[];
  specialMoments: BirthdayPhoto[];
  birthdayLetter: BirthdayPhoto | null;
  finale: BirthdayPhoto | null;
}

// Helper to generate elegant placeholder SVG illustrations for each slot
const createPlaceholder = (
  theme: string,
  title: string,
  subtitle: string,
  gradient1: string,
  gradient2: string,
  icon: string
): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
    <defs>
      <linearGradient id="g_${theme}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${gradient1}" />
        <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.2" />
        <stop offset="100%" stop-color="${gradient2}" />
      </linearGradient>
      <pattern id="pat_${theme}" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1.5" fill="#FFFFFF" fill-opacity="0.3" />
      </pattern>
    </defs>
    <rect width="800" height="1000" fill="url(#g_${theme})" />
    <rect width="800" height="1000" fill="url(#pat_${theme})" />
    
    <!-- Decorative Frame -->
    <rect x="40" y="40" width="720" height="920" rx="24" fill="none" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="2" stroke-dasharray="8 8" />
    
    <!-- Central artistic circle -->
    <circle cx="400" cy="460" r="160" fill="#FFFFFF" fill-opacity="0.25" />
    <circle cx="400" cy="460" r="130" fill="#FFFFFF" fill-opacity="0.3" />
    
    <!-- Icon/Illustration -->
    <text x="400" y="480" font-family="'Plus Jakarta Sans', sans-serif" font-size="72" text-anchor="middle" dominant-baseline="middle">${icon}</text>
    
    <!-- Title -->
    <text x="400" y="670" font-family="'Playfair Display', Georgia, serif" font-size="34" font-weight="700" fill="#3D3043" text-anchor="middle">${title}</text>
    
    <!-- Subtitle -->
    <text x="400" y="715" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="500" fill="#6B5973" text-anchor="middle">${subtitle}</text>
    
    <!-- Tag -->
    <rect x="290" y="750" width="220" height="38" rx="19" fill="#FFFFFF" fill-opacity="0.6" />
    <text x="400" y="774" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#4A3E4D" text-anchor="middle" letter-spacing="2">PHOTO PLACEHOLDER</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const birthdayPhotos: BirthdayPhotoCollection = {
  childhood: [
    {
      id: "childhood-01",
      src: "/photos/childhood/photo-01.jpg",
      placeholderSrc: createPlaceholder("ch1", "Little Sabdha", "Day One of a Beautiful Journey", "#FCE7F3", "#FBCFE8", "🧸"),
      caption: "The world got a little brighter the day you arrived.",
      year: "2004",
      date: "November 2004",
      alt: "Sabdha baby childhood memory",
      rotation: -2,
      tag: "Baby Steps"
    },
    {
      id: "childhood-02",
      src: "/photos/childhood/photo-02.jpg",
      placeholderSrc: createPlaceholder("ch2", "Tiny Smiles", "Innocence & Pure Joy", "#FEF3C7", "#FDE68A", "🌸"),
      caption: "Those sweet early smiles that melted everyone's hearts.",
      year: "2006",
      alt: "Sabdha toddler smile",
      rotation: 3,
      tag: "Pure Joy"
    },
    {
      id: "childhood-03",
      src: "/photos/childhood/photo-03.jpg",
      placeholderSrc: createPlaceholder("ch3", "Little Explorer", "Curious Eyes & Big Dreams", "#E0E7FF", "#C7D2FE", "🎈"),
      caption: "Always curious, always finding wonder in little things.",
      year: "2008",
      alt: "Sabdha exploring as a kid",
      rotation: -1.5,
      tag: "Curiosity"
    },
    {
      id: "childhood-04",
      src: "/photos/childhood/photo-04.jpg",
      placeholderSrc: createPlaceholder("ch4", "School Days", "First Bag & New Adventures", "#EDE9FE", "#DDD6FE", "🎒"),
      caption: "Tying your hair, packing your bag, ready to conquer the world.",
      year: "2010",
      alt: "Sabdha school days memory",
      rotation: 2.5,
      tag: "First Steps"
    },
    {
      id: "childhood-05",
      src: "/photos/childhood/photo-05.jpg",
      placeholderSrc: createPlaceholder("ch5", "Playful Days", "Laughter in the Sunshine", "#FFE4E6", "#FECDD3", "🍭"),
      caption: "Endless games, sweet treats, and giggles that filled the room.",
      year: "2012",
      alt: "Sabdha childhood playing memory",
      rotation: -3,
      tag: "Sunlit Giggles"
    },
    {
      id: "childhood-06",
      src: "/photos/childhood/photo-06.jpg",
      placeholderSrc: createPlaceholder("ch6", "Little Princess", "Crown of Happiness", "#FDF2F8", "#F5D0FE", "👑"),
      caption: "A little princess growing with kindness and grace.",
      year: "2014",
      alt: "Sabdha childhood sweet portrait",
      rotation: 1.5,
      tag: "Little Star"
    }
  ],

  growingUp: [
    {
      id: "growing-up-01",
      src: "/photos/growing-up/photo-01.jpg",
      placeholderSrc: createPlaceholder("gu1", "Early Blossoms", "Stepping Into Teenage Years", "#E0F2FE", "#BAE6FD", "🌱"),
      caption: "Finding your passions and discovering who you are.",
      year: "2016",
      alt: "Sabdha early teens",
      rotation: -2,
      tag: "Blossoming"
    },
    {
      id: "growing-up-02",
      src: "/photos/growing-up/photo-02.jpg",
      placeholderSrc: createPlaceholder("gu2", "Quiet Confidence", "Finding Your Own Rhythm", "#F3E8FF", "#E9D5FF", "📚"),
      caption: "Late night study sessions and dreaming about the future.",
      year: "2018",
      alt: "Sabdha high school memories",
      rotation: 2,
      tag: "Dreams in Focus"
    },
    {
      id: "growing-up-03",
      src: "/photos/growing-up/photo-03.jpg",
      placeholderSrc: createPlaceholder("gu3", "Milestones & Cheers", "Turning Sweet Sixteen", "#FCE7F3", "#F472B6", "🎂"),
      caption: "A milestone chapter celebrated with big smiles.",
      year: "2020",
      alt: "Sabdha 16th birthday celebration",
      rotation: -1,
      tag: "Milestone"
    },
    {
      id: "growing-up-04",
      src: "/photos/growing-up/photo-04.jpg",
      placeholderSrc: createPlaceholder("gu4", "Entering Adulthood", "Stepping Into 18", "#FEF3C7", "#FBBF24", "🎓"),
      caption: "Welcome to 18! New beginnings, new freedoms, and endless possibilities.",
      year: "2022",
      alt: "Sabdha turning 18",
      rotation: 3,
      tag: "New Chapter"
    },
    {
      id: "growing-up-05",
      src: "/photos/growing-up/photo-05.jpg",
      placeholderSrc: createPlaceholder("gu5", "Finding Independence", "Glowing More Brightly", "#DCFCE7", "#86EFAC", "🌿"),
      caption: "Carving your own path with grace, resilience, and style.",
      year: "2024",
      alt: "Sabdha college and youth journey",
      rotation: -2.5,
      tag: "Independent Soul"
    },
    {
      id: "growing-up-06",
      src: "/photos/growing-up/photo-06.jpg",
      placeholderSrc: createPlaceholder("gu6", "Hello 22", "Beautiful, Poised & Confident", "#FFE4E6", "#FDA4AF", "✨"),
      caption: "Standing here today at 22, more radiant and inspiring than ever.",
      year: "2026",
      alt: "Sabdha reaching 22 years",
      rotation: 1,
      tag: "Golden 22"
    }
  ],

  family: [
    {
      id: "family-01",
      src: "/photos/family/photo-01.jpg",
      placeholderSrc: createPlaceholder("fam1", "Pillars of Love", "The Warmth of Family", "#FEF3C7", "#FDE68A", "🏡"),
      caption: "The foundation of warmth, care, and infinite support.",
      year: "",
      alt: "Sabdha with family",
      rotation: -2,
      tag: "Family Love"
    },
    {
      id: "family-02",
      src: "/photos/family/photo-02.jpg",
      placeholderSrc: createPlaceholder("fam2", "Festive Sparkles", "Celebrations Together", "#FEE2E2", "#FECACA", "🪔"),
      caption: "Bright lights, festive outfits, and family laughter filling every corner.",
      year: "",
      alt: "Sabdha festival family moments",
      rotation: 2.5,
      tag: "Festivities"
    },
    {
      id: "family-03",
      src: "/photos/family/photo-03.jpg",
      placeholderSrc: createPlaceholder("fam3", "Unspoken Bonds", "Gentle Blessings", "#F3E8FF", "#D8B4FE", "💛"),
      caption: "Where your heart always finds safe harbor and peace.",
      year: "",
      alt: "Sabdha family warmth",
      rotation: -1.5,
      tag: "Unconditional"
    },
    {
      id: "family-04",
      src: "/photos/family/photo-04.jpg",
      placeholderSrc: createPlaceholder("fam4", "Generations of Smiles", "Shared Stories & Meals", "#E0F2FE", "#BAE6FD", "🍲"),
      caption: "Home-cooked comfort and conversations around the table.",
      year: "",
      alt: "Family dinner and gatherings",
      rotation: 3,
      tag: "Shared Meals"
    },
    {
      id: "family-05",
      src: "/photos/family/photo-05.jpg",
      placeholderSrc: createPlaceholder("fam5", "Sweet Guidance", "Held by Loving Hands", "#ECFDF5", "#A7F3D0", "🤲"),
      caption: "The unconditional love that shaped your gentle heart.",
      year: "",
      alt: "Loving family embrace",
      rotation: -2,
      tag: "Safe Haven"
    },
    {
      id: "family-06",
      src: "/photos/family/photo-06.jpg",
      placeholderSrc: createPlaceholder("fam6", "Proud Moments", "Smiling Together", "#FFF1F2", "#F472B6", "🥂"),
      caption: "Every achievement celebrated with pride and heartfelt blessings.",
      year: "",
      alt: "Family celebration pride",
      rotation: 1.5,
      tag: "Pride & Joy"
    }
  ],

  friends: [
    {
      id: "friends-01",
      src: "/photos/friends/photo-01.jpg",
      placeholderSrc: createPlaceholder("fr1", "Laughter Gang", "Golden Hours & Fun", "#FEF3C7", "#FDE047", "🎉"),
      caption: "The ones who make even ordinary days feel like a celebration.",
      year: "",
      alt: "Sabdha hanging out with friends",
      rotation: -3,
      tag: "Laughter Squad"
    },
    {
      id: "friends-02",
      src: "/photos/friends/photo-02.jpg",
      placeholderSrc: createPlaceholder("fr2", "Candid Moments", "Unfiltered Smiles", "#FCE7F3", "#F472B6", "📸"),
      caption: "No poses needed when the happiness is 100% genuine.",
      year: "",
      alt: "Sabdha candid friends photo",
      rotation: 2,
      tag: "Candid Joy"
    },
    {
      id: "friends-03",
      src: "/photos/friends/photo-03.jpg",
      placeholderSrc: createPlaceholder("fr3", "Outings & Escapes", "Roads Less Traveled", "#E0E7FF", "#818CF8", "🚗"),
      caption: "Spontaneous plans, shared snacks, and singing out loud in the car.",
      year: "",
      alt: "Friends trip or day out",
      rotation: -1.5,
      tag: "Road Trips"
    },
    {
      id: "friends-04",
      src: "/photos/friends/photo-04.jpg",
      placeholderSrc: createPlaceholder("fr4", "Group Cheers", "Celebrating Life", "#EDE9FE", "#A78BFA", "✨"),
      caption: "Friendships that lift your spirit and make memories last forever.",
      year: "",
      alt: "Group cheers with friends",
      rotation: 3,
      tag: "Togetherness"
    },
    {
      id: "friends-05",
      src: "/photos/friends/photo-05.jpg",
      placeholderSrc: createPlaceholder("fr5", "Sweet Memories", "Hugs & Good Vibes", "#FFE4E6", "#FB7185", "💖"),
      caption: "Surrounded by genuine souls who love you just as you are.",
      year: "",
      alt: "Warm moments with friends",
      rotation: -2,
      tag: "Good Vibes"
    }
  ],

  ourMemories: [
    {
      id: "our-memories-01",
      src: "/photos/our-memories/photo-01.jpg",
      placeholderSrc: createPlaceholder("om1", "You & Me", "Where Our Story Began", "#FCE7F3", "#EC4899", "🤞"),
      caption: "From strangers to best friends — the easiest, best connection ever.",
      year: "",
      alt: "Sabdha and best friend first memories",
      rotation: -2.5,
      tag: "Day One"
    },
    {
      id: "our-memories-02",
      src: "/photos/our-memories/photo-02.jpg",
      placeholderSrc: createPlaceholder("om2", "Midnight Chats", "Deep Talks & Silly Memes", "#EDE9FE", "#8B5CF6", "🌙"),
      caption: "Those hours of talking about everything and nothing until 3 AM.",
      year: "",
      alt: "Special memory with best friend",
      rotation: 2,
      tag: "Midnight Talks"
    },
    {
      id: "our-memories-03",
      src: "/photos/our-memories/photo-03.jpg",
      placeholderSrc: createPlaceholder("om3", "Unstoppable Duo", "Partners in Crime", "#FEF3C7", "#EAB308", "⚡"),
      caption: "Always finding excuses to cause harmless chaos and laugh until we cry.",
      year: "",
      alt: "Fun best friends adventure",
      rotation: -1.5,
      tag: "Double Trouble"
    },
    {
      id: "our-memories-04",
      src: "/photos/our-memories/photo-04.jpg",
      placeholderSrc: createPlaceholder("om4", "Quiet Support", "Through Every Season", "#DCFCE7", "#10B981", "🤍"),
      caption: "No matter how chaotic life gets, knowing you have my back means everything.",
      year: "",
      alt: "Heartwarming friendship moment",
      rotation: 3,
      tag: "Always Here"
    },
    {
      id: "our-memories-05",
      src: "/photos/our-memories/photo-05.jpg",
      placeholderSrc: createPlaceholder("om5", "Forever Bond", "To More Years of Us", "#FFE4E6", "#F43F5E", "🥂"),
      caption: "Here is to 22, and to a lifetime of celebrating every chapter by your side.",
      year: "2026",
      alt: "Best friends celebrating together",
      rotation: -1,
      tag: "Lifetime Bond"
    }
  ],

  specialMoments: [
    {
      id: "special-01",
      src: "/photos/special-moments/photo-01.jpg",
      placeholderSrc: createPlaceholder("sp1", "Your Radiant Smile", "Pure Sunshine", "#FEF3C7", "#F59E0B", "☀️"),
      caption: "A candid capture of the smile that brightens our world.",
      year: "",
      alt: "Sabdha radiant smile",
      rotation: -2,
      tag: "Sunshine"
    },
    {
      id: "special-02",
      src: "/photos/special-moments/photo-02.jpg",
      placeholderSrc: createPlaceholder("sp2", "Graceful Soul", "Elegance in Every Step", "#F3E8FF", "#9333EA", "🌸"),
      caption: "Graceful, kind-hearted, and always true to herself.",
      year: "",
      alt: "Sabdha elegant moment",
      rotation: 2,
      tag: "Elegance"
    },
    {
      id: "special-03",
      src: "/photos/special-moments/photo-03.jpg",
      placeholderSrc: createPlaceholder("sp3", "Eyes Full of Dreams", "Ready for the World", "#E0F2FE", "#0284C7", "💫"),
      caption: "Looking ahead into an exciting universe of new beginnings.",
      year: "2026",
      alt: "Sabdha looking towards future",
      rotation: -1.5,
      tag: "Aspirations"
    }
  ],

  birthdayLetter: {
    id: "letter-bg",
    src: "/photos/birthday-letter/photo-01.jpg",
    placeholderSrc: createPlaceholder("let1", "A Heartfelt Letter", "Written with Love", "#FCE7F3", "#DB2777", "💌"),
    caption: "A keepsake memory for your 22nd birthday.",
    alt: "Birthday letter background photo"
  },

  finale: {
    id: "finale-portrait",
    src: "/photos/finale/photo-01.jpg",
    placeholderSrc: createPlaceholder("fin1", "Sabdha at 22", "Under the Starlit Sky", "#1E1B4B", "#6366F1", "✨"),
    caption: "The star of tonight and every night.",
    alt: "Sabdha birthday finale portrait"
  }
};

