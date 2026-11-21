export interface BirthdayPhoto {
  id: string;
  src: string;
  placeholderSrc?: string;
  caption: string;
  alt: string;
  tag?: string;
  year?: string;
  date?: string;
  width: number;
  height: number;
  aspectRatio: number;
  orientation: 'portrait' | 'landscape' | 'square';
  rotation?: number; // visual tilt for polaroids (-3 to +3 deg)
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

export const birthdayPhotos: BirthdayPhotoCollection = {
  childhood: [
  {
    "id": "childhood-01",
    "src": "/photos/childhood/photo-01.jpg",
    "caption": "Every beautiful story has a beginning.",
    "tag": "Beginning",
    "alt": "Sabdha Beginning photograph",
    "width": 1200,
    "height": 1600,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": -2.5
  },
  {
    "id": "childhood-02",
    "src": "/photos/childhood/photo-02.jpg",
    "caption": "Little moments, endless memories.",
    "tag": "Precious",
    "alt": "Sabdha Precious photograph",
    "width": 899,
    "height": 1599,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": 1.8
  },
  {
    "id": "childhood-03",
    "src": "/photos/childhood/photo-03.jpg",
    "caption": "A little smile from a beautiful beginning.",
    "tag": "Early Smile",
    "alt": "Sabdha Early Smile photograph",
    "width": 1200,
    "height": 1600,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": -1.2
  },
  {
    "id": "childhood-04",
    "src": "/photos/childhood/photo-04.jpg",
    "caption": "The sweetest chapters start small.",
    "tag": "Sweet Chapters",
    "alt": "Sabdha Sweet Chapters photograph",
    "width": 1280,
    "height": 960,
    "aspectRatio": 1.33,
    "orientation": "landscape",
    "rotation": 2.4
  },
  {
    "id": "childhood-05",
    "src": "/photos/childhood/photo-05.jpg",
    "caption": "Innocence, wonder, and pure joy.",
    "tag": "Wonder",
    "alt": "Sabdha Wonder photograph",
    "width": 1200,
    "height": 1600,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": -2.0
  },
  {
    "id": "childhood-06",
    "src": "/photos/childhood/photo-06.jpg",
    "caption": "Little steps that brightened every room.",
    "tag": "Little Steps",
    "alt": "Sabdha Little Steps photograph",
    "width": 960,
    "height": 1280,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": 1.5
  },
  {
    "id": "childhood-07",
    "src": "/photos/childhood/photo-07.jpg",
    "caption": "Finding magic in the smallest things.",
    "tag": "Pure Joy",
    "alt": "Sabdha Pure Joy photograph",
    "width": 960,
    "height": 1280,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": -1.8
  },
  {
    "id": "childhood-08",
    "src": "/photos/childhood/photo-08.jpg",
    "caption": "Sunshine wrapped in sweet laughter.",
    "tag": "Sunshine",
    "alt": "Sabdha Sunshine photograph",
    "width": 1280,
    "height": 960,
    "aspectRatio": 1.33,
    "orientation": "landscape",
    "rotation": 2.2
  },
  {
    "id": "childhood-09",
    "src": "/photos/childhood/photo-09.jpg",
    "caption": "Gentle days filled with warmth.",
    "tag": "Gentle Days",
    "alt": "Sabdha Gentle Days photograph",
    "width": 1280,
    "height": 960,
    "aspectRatio": 1.33,
    "orientation": "landscape",
    "rotation": -1.5
  },
  {
    "id": "childhood-10",
    "src": "/photos/childhood/photo-10.jpg",
    "caption": "Cherished beginnings of a wonderful journey.",
    "tag": "Milestone",
    "alt": "Sabdha Milestone photograph",
    "width": 1280,
    "height": 960,
    "aspectRatio": 1.33,
    "orientation": "landscape",
    "rotation": 2.0
  },
  {
    "id": "childhood-11",
    "src": "/photos/childhood/photo-11.jpg",
    "caption": "A little star growing with grace.",
    "tag": "Grace",
    "alt": "Sabdha Grace photograph",
    "width": 1280,
    "height": 960,
    "aspectRatio": 1.33,
    "orientation": "landscape",
    "rotation": -2.2
  }
],

  growingUp: [
  {
    "id": "growingUp-18",
    "src": "/photos/growing-up/photo-18.jpg",
    "caption": "Every journey begins with innocent steps and a pure heart.",
    "tag": "Little Steps",
    "alt": "Sabdha Little Steps photograph",
    "width": 899,
    "height": 1599,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": 1.4
  },
  {
    "id": "growingUp-11",
    "src": "/photos/growing-up/photo-11.jpg",
    "caption": "Grace and resilience through every season.",
    "tag": "Grace",
    "alt": "Sabdha Grace photograph",
    "width": 1000,
    "height": 750,
    "aspectRatio": 1.33,
    "orientation": "landscape",
    "rotation": -2.2
  },
  {
    "id": "growingUp-06",
    "src": "/photos/growing-up/photo-06.jpg",
    "caption": "Quiet confidence in every step forward.",
    "tag": "Quiet Strength",
    "alt": "Sabdha Quiet Strength photograph",
    "width": 174,
    "height": 347,
    "aspectRatio": 0.50,
    "orientation": "portrait",
    "rotation": 1.5
  },
  {
    "id": "growingUp-01",
    "src": "/photos/growing-up/photo-01.jpg",
    "caption": "Look how far you have come.",
    "tag": "Journey",
    "alt": "Sabdha Journey photograph",
    "width": 1040,
    "height": 780,
    "aspectRatio": 1.33,
    "orientation": "landscape",
    "rotation": -2.5
  },
  {
    "id": "growingUp-03",
    "src": "/photos/growing-up/photo-03.jpg",
    "caption": "Growing, glowing, and becoming yourself.",
    "tag": "Glowing",
    "alt": "Sabdha Glowing photograph",
    "width": 720,
    "height": 1520,
    "aspectRatio": 0.47,
    "orientation": "portrait",
    "rotation": -1.2
  },
  {
    "id": "growingUp-04",
    "src": "/photos/growing-up/photo-04.jpg",
    "caption": "A journey filled with little moments and big dreams.",
    "tag": "Big Dreams",
    "alt": "Sabdha Big Dreams photograph",
    "width": 492,
    "height": 1036,
    "aspectRatio": 0.47,
    "orientation": "portrait",
    "rotation": 2.4
  },
  {
    "id": "growingUp-02",
    "src": "/photos/growing-up/photo-02.jpg",
    "caption": "Every year adds a new chapter.",
    "tag": "New Chapter",
    "alt": "Sabdha New Chapter photograph",
    "width": 960,
    "height": 1280,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": 1.8
  },
  {
    "id": "growingUp-05",
    "src": "/photos/growing-up/photo-05.jpg",
    "caption": "Carving your path with courage and confidence.",
    "tag": "Confidence",
    "alt": "Sabdha Confidence photograph",
    "width": 960,
    "height": 1280,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": -2.0
  },
  {
    "id": "growingUp-07",
    "src": "/photos/growing-up/photo-07.jpg",
    "caption": "Milestones celebrated with heartfelt smiles.",
    "tag": "Milestones",
    "alt": "Sabdha Milestones photograph",
    "width": 960,
    "height": 1280,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": -1.8
  },
  {
    "id": "growingUp-09",
    "src": "/photos/growing-up/photo-09.jpg",
    "caption": "Dreaming with eyes wide open.",
    "tag": "Dreamer",
    "alt": "Sabdha Dreamer photograph",
    "width": 720,
    "height": 1280,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": -1.5
  },
  {
    "id": "growingUp-08",
    "src": "/photos/growing-up/photo-08.jpg",
    "caption": "Finding your own rhythm and passion.",
    "tag": "Passions",
    "alt": "Sabdha Passions photograph",
    "width": 720,
    "height": 1280,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": 2.2
  },
  {
    "id": "growingUp-10",
    "src": "/photos/growing-up/photo-10.jpg",
    "caption": "Cherishing every stage along the way.",
    "tag": "Cherished",
    "alt": "Sabdha Cherished photograph",
    "width": 960,
    "height": 1280,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": 2.0
  },
  {
    "id": "growingUp-13",
    "src": "/photos/growing-up/photo-13.jpg",
    "caption": "A journey of warmth, growth, and joy.",
    "tag": "Growth",
    "alt": "Sabdha Growth photograph",
    "width": 900,
    "height": 1600,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": -1.4
  },
  {
    "id": "growingUp-16",
    "src": "/photos/growing-up/photo-16.jpg",
    "caption": "Radiance that shines brighter with time.",
    "tag": "Radiance",
    "alt": "Sabdha Radiance photograph",
    "width": 1200,
    "height": 1600,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": 1.7
  },
  {
    "id": "growingUp-12",
    "src": "/photos/growing-up/photo-12.jpg",
    "caption": "Stepping into new chapters with courage.",
    "tag": "Courage",
    "alt": "Sabdha Courage photograph",
    "width": 473,
    "height": 1096,
    "aspectRatio": 0.43,
    "orientation": "portrait",
    "rotation": 1.6
  },
  {
    "id": "growingUp-14",
    "src": "/photos/growing-up/photo-14.jpg",
    "caption": "Confidence, kindness, and individuality.",
    "tag": "Individuality",
    "alt": "Sabdha Individuality photograph",
    "width": 960,
    "height": 1280,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": 2.1
  },
  {
    "id": "growingUp-15",
    "src": "/photos/growing-up/photo-15.jpg",
    "caption": "Blossoming into an inspiring soul.",
    "tag": "Blossoming",
    "alt": "Sabdha Blossoming photograph",
    "width": 720,
    "height": 1280,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": -1.9
  },
  {
    "id": "growingUp-17",
    "src": "/photos/growing-up/photo-17.jpg",
    "caption": "Embracing life with a hopeful heart.",
    "tag": "Hope",
    "alt": "Sabdha Hope photograph",
    "width": 900,
    "height": 1600,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": -2.1
  }
  ],

  family: [
  {
    "id": "family-01",
    "src": "/photos/family/photo-01.jpg",
    "caption": "Home is where beautiful memories begin.",
    "tag": "Home",
    "alt": "Sabdha Home photograph",
    "width": 1062,
    "height": 662,
    "aspectRatio": 1.60,
    "orientation": "landscape",
    "rotation": -2.5
  },
  {
    "id": "family-02",
    "src": "/photos/family/photo-02.jpg",
    "caption": "The people who make life truly special.",
    "tag": "Pillars of Love",
    "alt": "Sabdha Pillars of Love photograph",
    "width": 1200,
    "height": 1600,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": 1.8
  },
  {
    "id": "family-03",
    "src": "/photos/family/photo-03.jpg",
    "caption": "A lifetime of love in little moments.",
    "tag": "Warmth",
    "alt": "Sabdha Warmth photograph",
    "width": 1280,
    "height": 719,
    "aspectRatio": 1.78,
    "orientation": "landscape",
    "rotation": -1.2
  },
  {
    "id": "family-04",
    "src": "/photos/family/photo-04.jpg",
    "caption": "Some bonds make every moment brighter.",
    "tag": "Bright Bonds",
    "alt": "Sabdha Bright Bonds photograph",
    "width": 720,
    "height": 1520,
    "aspectRatio": 0.47,
    "orientation": "portrait",
    "rotation": 2.4
  },
  {
    "id": "family-05",
    "src": "/photos/family/photo-05.jpg",
    "caption": "Wrapped in warmth, care, and blessings.",
    "tag": "Blessings",
    "alt": "Sabdha Blessings photograph",
    "width": 720,
    "height": 1280,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": -2.0
  },
  {
    "id": "family-06",
    "src": "/photos/family/photo-06.jpg",
    "caption": "Unspoken love that always feels like home.",
    "tag": "Unspoken Love",
    "alt": "Sabdha Unspoken Love photograph",
    "width": 756,
    "height": 1600,
    "aspectRatio": 0.47,
    "orientation": "portrait",
    "rotation": 1.5
  },
  {
    "id": "family-07",
    "src": "/photos/family/photo-07.jpg",
    "caption": "Festive lights, togetherness, and laughter.",
    "tag": "Togetherness",
    "alt": "Sabdha Togetherness photograph",
    "width": 1200,
    "height": 1600,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": -1.8
  },
  {
    "id": "family-08",
    "src": "/photos/family/photo-08.jpg",
    "caption": "The foundation that holds you with warmth.",
    "tag": "Foundation",
    "alt": "Sabdha Foundation photograph",
    "width": 714,
    "height": 704,
    "aspectRatio": 1.01,
    "orientation": "square",
    "rotation": 2.2
  },
  {
    "id": "family-09",
    "src": "/photos/family/photo-09.jpg",
    "caption": "Shared smiles that stay in the heart forever.",
    "tag": "Shared Smiles",
    "alt": "Sabdha Shared Smiles photograph",
    "width": 720,
    "height": 1280,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": -1.5
  },
  {
    "id": "family-10",
    "src": "/photos/family/photo-10.jpg",
    "caption": "Always surrounded by unconditional love.",
    "tag": "Unconditional",
    "alt": "Sabdha Unconditional photograph",
    "width": 896,
    "height": 1600,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": 2.0
  }
],

  friends: [
  {
    "id": "friends-01",
    "src": "/photos/friends/photo-01.jpg",
    "caption": "Life becomes beautiful when shared with the right people.",
    "tag": "Together",
    "alt": "Sabdha Together photograph",
    "width": 1600,
    "height": 1200,
    "aspectRatio": 1.33,
    "orientation": "landscape",
    "rotation": -2.5
  },
  {
    "id": "friends-02",
    "src": "/photos/friends/photo-02.jpg",
    "caption": "Good people, unforgettable moments.",
    "tag": "Unforgettable",
    "alt": "Sabdha Unforgettable photograph",
    "width": 1280,
    "height": 720,
    "aspectRatio": 1.78,
    "orientation": "landscape",
    "rotation": 1.8
  },
  {
    "id": "friends-03",
    "src": "/photos/friends/photo-03.jpg",
    "caption": "Memories made better together.",
    "tag": "Shared Joy",
    "alt": "Sabdha Shared Joy photograph",
    "width": 576,
    "height": 1280,
    "aspectRatio": 0.45,
    "orientation": "portrait",
    "rotation": -1.2
  },
  {
    "id": "friends-04",
    "src": "/photos/friends/photo-04.jpg",
    "caption": "Unfiltered laughter and shared adventures.",
    "tag": "Laughter",
    "alt": "Sabdha Laughter photograph",
    "width": 576,
    "height": 1280,
    "aspectRatio": 0.45,
    "orientation": "portrait",
    "rotation": 2.4
  },
  {
    "id": "friends-05",
    "src": "/photos/friends/photo-05.jpg",
    "caption": "The ones who make ordinary days feel special.",
    "tag": "Celebration",
    "alt": "Sabdha Celebration photograph",
    "width": 1280,
    "height": 720,
    "aspectRatio": 1.78,
    "orientation": "landscape",
    "rotation": -2.0
  },
  {
    "id": "friends-06",
    "src": "/photos/friends/photo-06.jpg",
    "caption": "Friendships that bring effortless smiles.",
    "tag": "Good Vibes",
    "alt": "Sabdha Good Vibes photograph",
    "width": 1280,
    "height": 720,
    "aspectRatio": 1.78,
    "orientation": "landscape",
    "rotation": 1.5
  }
],

  ourMemories: [
  {
    "id": "ourMemories-01",
    "src": "/photos/our-memories/photo-01.jpg",
    "caption": "Some memories are special because we made them together.",
    "tag": "Special Moments",
    "alt": "Sabdha Special Moments photograph",
    "width": 928,
    "height": 1392,
    "aspectRatio": 0.67,
    "orientation": "portrait",
    "rotation": -2.5
  },
  {
    "id": "ourMemories-02",
    "src": "/photos/our-memories/photo-02.jpg",
    "caption": "Ordinary moments, extraordinary memories.",
    "tag": "Extraordinary",
    "alt": "Sabdha Extraordinary photograph",
    "width": 1280,
    "height": 960,
    "aspectRatio": 1.33,
    "orientation": "landscape",
    "rotation": 1.8
  },
  {
    "id": "ourMemories-03",
    "src": "/photos/our-memories/photo-03.jpg",
    "caption": "The moments that always bring a smile.",
    "tag": "Smiles",
    "alt": "Sabdha Smiles photograph",
    "width": 960,
    "height": 1280,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": -1.2
  },
  {
    "id": "ourMemories-04",
    "src": "/photos/our-memories/photo-04.jpg",
    "caption": "Some stories are better when shared.",
    "tag": "Shared Stories",
    "alt": "Sabdha Shared Stories photograph",
    "width": 1280,
    "height": 720,
    "aspectRatio": 1.78,
    "orientation": "landscape",
    "rotation": 2.4
  },
  {
    "id": "ourMemories-05",
    "src": "/photos/our-memories/photo-05.jpg",
    "caption": "Late night conversations and unstoppable laughs.",
    "tag": "Midnight Laughs",
    "alt": "Sabdha Midnight Laughs photograph",
    "width": 900,
    "height": 1600,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": -2.0
  },
  {
    "id": "ourMemories-06",
    "src": "/photos/our-memories/photo-06.jpg",
    "caption": "A bond that time only makes stronger.",
    "tag": "Strong Bond",
    "alt": "Sabdha Strong Bond photograph",
    "width": 1200,
    "height": 1600,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": 1.5
  },
  {
    "id": "ourMemories-07",
    "src": "/photos/our-memories/photo-07.jpg",
    "caption": "Through every high and low, always here.",
    "tag": "Always Here",
    "alt": "Sabdha Always Here photograph",
    "width": 900,
    "height": 1600,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": -1.8
  },
  {
    "id": "ourMemories-08",
    "src": "/photos/our-memories/photo-08.jpg",
    "caption": "To a lifetime of making unforgettable memories.",
    "tag": "Lifetime",
    "alt": "Sabdha Lifetime photograph",
    "width": 720,
    "height": 1280,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": 2.2
  }
],

  specialMoments: [
  {
    "id": "specialMoments-01",
    "src": "/photos/special-moments/photo-01.jpg",
    "caption": "A little something that makes you special.",
    "tag": "Something Special",
    "alt": "Sabdha Something Special photograph",
    "width": 586,
    "height": 1040,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": -2.5
  },
  {
    "id": "specialMoments-02",
    "src": "/photos/special-moments/photo-02.jpg",
    "caption": "Never stop being wonderfully you.",
    "tag": "Wonderfully You",
    "alt": "Sabdha Wonderfully You photograph",
    "width": 1200,
    "height": 1600,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": 1.8
  },
  {
    "id": "specialMoments-03",
    "src": "/photos/special-moments/photo-03.jpg",
    "caption": "Keep shining in your own way.",
    "tag": "Keep Shining",
    "alt": "Sabdha Keep Shining photograph",
    "width": 900,
    "height": 1600,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": -1.2
  },
  {
    "id": "specialMoments-04",
    "src": "/photos/special-moments/photo-04.jpg",
    "caption": "Grace in every smile and every gesture.",
    "tag": "Grace",
    "alt": "Sabdha Grace photograph",
    "width": 473,
    "height": 1096,
    "aspectRatio": 0.43,
    "orientation": "portrait",
    "rotation": 2.4
  },
  {
    "id": "specialMoments-05",
    "src": "/photos/special-moments/photo-05.jpg",
    "caption": "Your warmth lights up the world around you.",
    "tag": "Warmth",
    "alt": "Sabdha Warmth photograph",
    "width": 720,
    "height": 1280,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": -2.0
  },
  {
    "id": "specialMoments-06",
    "src": "/photos/special-moments/photo-06.jpg",
    "caption": "Unapologetically kind, genuine, and radiant.",
    "tag": "Genuine Soul",
    "alt": "Sabdha Genuine Soul photograph",
    "width": 900,
    "height": 1600,
    "aspectRatio": 0.56,
    "orientation": "portrait",
    "rotation": 1.5
  },
  {
    "id": "specialMoments-07",
    "src": "/photos/special-moments/photo-07.jpg",
    "caption": "A spirit full of boundless inspiration.",
    "tag": "Inspiration",
    "alt": "Sabdha Inspiration photograph",
    "width": 1200,
    "height": 1600,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": -1.8
  },
  {
    "id": "specialMoments-08",
    "src": "/photos/special-moments/photo-08.jpg",
    "caption": "Every little moment reflects your beauty.",
    "tag": "Beauty",
    "alt": "Sabdha Beauty photograph",
    "width": 960,
    "height": 1280,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": 2.2
  },
  {
    "id": "specialMoments-09",
    "src": "/photos/special-moments/photo-09.jpg",
    "caption": "Poised, confident, and ready to conquer the universe.",
    "tag": "Radiant",
    "alt": "Sabdha Radiant photograph",
    "width": 960,
    "height": 1280,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "rotation": -1.5
  }
],

  birthdayLetter: {
    id: "letter-keepsake",
    src: "/photos/birthday-letter/photo-01.jpg",
    caption: "A keepsake memory written with love for your 22nd birthday.",
    alt: "Sabdha letter keepsake photo",
    width: 586,
    height: 1040,
    aspectRatio: 0.56,
    orientation: "portrait",
    tag: "Keepsake"
  },

  finale: {
    id: "finale-portrait",
    src: "/photos/finale/photo-01.jpg",
    caption: "Under the starlit sky, celebrating 22 years of beautiful you.",
    alt: "Sabdha 22nd birthday finale portrait",
    width: 1200,
    height: 1600,
    aspectRatio: 0.75,
    orientation: "portrait",
    tag: "Sabdha at 22"
  }
};
