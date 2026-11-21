export interface BirthdayPerson {
  name: string;
  nickname?: string;
  birthDate: string;
  celebrationDate: string;
  age: number;
  relationship: string;
}

export const birthdayPerson: BirthdayPerson = {
  name: "Sabdha",
  nickname: "Sabdha",
  birthDate: "22 November 2004",
  celebrationDate: "22 November 2026",
  age: 22,
  relationship: "Best Friend",
};

export const invitationContent = {
  teaser: "Hey! Someone has created a little world just for you...",
  question: "Are you ready for a surprise, Sabdha?",
  buttonText: "OPEN YOUR SURPRISE ♡",
};

export const welcomeContent = {
  title: "HAPPY BIRTHDAY, SABDHA!",
  subtitle: "22 years of beautiful memories, countless little moments, and a whole universe waiting to celebrate you.",
  dateDisplay: "22 November 2026",
  ageHighlight: "Celebrating 22 Wonderful Years",
  buttonText: "LET'S BEGIN OUR JOURNEY →",
};

export const chapterTitles = {
  childhood: {
    number: "01",
    tag: "CHAPTER 01",
    heading: "Once Upon a Childhood...",
    subtitle: "Every beautiful story has a beginning. This is where yours started.",
  },
  growingUp: {
    number: "02",
    tag: "CHAPTER 02",
    heading: "Look How Far You've Come...",
    subtitle: "Watching time weave moments into memories, growing stronger and brighter each year.",
  },
  family: {
    number: "03",
    tag: "CHAPTER 03",
    heading: "The People Who Make Your World Feel Like Home",
    subtitle: "Rooted in love, held with warmth, and surrounded by unconditional blessings.",
  },
  friends: {
    number: "04",
    tag: "CHAPTER 04",
    heading: "Life Is Better With Beautiful People Around",
    subtitle: "Unfiltered laughter, unforgettable adventures, and stories only true friends know.",
  },
  ourMemories: {
    number: "05",
    tag: "CHAPTER 05",
    heading: "Some Memories Are Special Because We Made Them Together",
    subtitle: "From silly inside jokes to midnight talks, here's to our irreplaceable bond.",
  },
  whatMakesYouYou: {
    number: "06",
    tag: "CHAPTER 06",
    heading: "There's Something Special About You...",
    subtitle: "Little things that make you the extraordinary soul you are.",
  },
  letter: {
    number: "07",
    tag: "CHAPTER 07",
    heading: "A Letter From My Heart",
    teaser: "There is something I wanted to tell you...",
    buttonText: "READ MY LETTER",
  },
  game: {
    number: "08",
    tag: "CHAPTER 08",
    title: "CATCH THE STARS",
    subtitle: "A Wish For Sabdha",
    intro1: "Before I take you to your final surprise, I have a tiny challenge for you...",
    intro2: "Somewhere in this sky, five magical stars are hiding. Can you collect them?",
    completedTitle: "YOU DID IT, SABDHA!",
    completedSubtitle: "All 5 wishes have been unlocked. But wait... your biggest surprise is still waiting.",
    unlockButton: "UNLOCK YOUR UNIVERSE ✨",
  },
  finale: {
    number: "09",
    tag: "THE FINAL CHAPTER",
    heading: "The Magical Universe",
    subtitle: "Step into a night sky crafted purely to celebrate you under the moonlight.",
  }
};

export interface InteractiveCard {
  id: string;
  frontTitle: string;
  frontIcon: string;
  frontSubtitle: string;
  backTitle: string;
  backMessage: string;
  accentColor: string;
}

export const specialTraitsCards: InteractiveCard[] = [
  {
    id: "smile",
    frontTitle: "Your Smile",
    frontIcon: "✨",
    frontSubtitle: "A beam of pure light",
    backTitle: "Never Stop Spreading Happiness",
    backMessage: "Your smile has this effortless way of lighting up the heaviest room and turning ordinary days into warm sunshine.",
    accentColor: "from-pink-400 to-rose-300",
  },
  {
    id: "personality",
    frontTitle: "Your Personality",
    frontIcon: "🌸",
    frontSubtitle: "Kind, genuine & unique",
    backTitle: "Uniquely Beautiful Being You",
    backMessage: "There is something genuinely rare about how you carry kindness, empathy, and your own sweet quirks. Never change that.",
    accentColor: "from-purple-400 to-indigo-300",
  },
  {
    id: "dreams",
    frontTitle: "Your Dreams",
    frontIcon: "🌟",
    frontSubtitle: "Boundless & inspiring",
    backTitle: "Never Stop Chasing What You Love",
    backMessage: "May you always pursue whatever sets your soul on fire. You have the resilience and passion to turn every dream into reality.",
    accentColor: "from-amber-400 to-orange-300",
  },
];

export const personalLetter = {
  salutation: "To My Favourite Person, ❤️",
  paragraphs: [
    "Happy Birthday, Sabdha! 🥳❤️",
    "First of all, I just want to tell you how special you are to me and how grateful I am to have you in my life.",
    "You know, some people enter our lives unexpectedly, but slowly become such an important part of it that we cannot imagine our days without them. You are one such person to me.",
    "Your presence matters to me more than you probably realise. You are someone with whom I can share almost everything, whether it's happiness, sadness, random thoughts, silly conversations, personal problems, or even the smallest things happening in my life. I never have to think twice before sharing something with you, and that's something I truly value.",
    "Thank you for being my supporter, my well-wisher, my listener, and someone who genuinely wants to see me doing well. Your words, your encouragement, and even your simple presence have made a difference in my life. Sometimes, just knowing that I have someone like you to talk to makes everything feel a little easier.",
    "I may not express it every time, but I genuinely appreciate you. Thank you for understanding me, listening to my endless stories, supporting me during difficult times, and being there through all the ups and downs. I hope you know that you are equally important to me.",
    "On your special day, I wish you nothing but happiness, success, peace, and endless opportunities. You have a bright future ahead of you, and I genuinely believe you are capable of achieving wonderful things. Never doubt yourself or your abilities. Keep believing in yourself, keep growing, and never stop chasing your dreams.",
    "And remember one thing: just as you have been there for me, I'll always be there for you whenever you need me. Whether it's a happy moment you want to celebrate, a difficult situation you want to talk about, or a day when you simply need someone to listen, you can always count on me. You don't have to face everything alone.",
    "Honestly, this friendship is one of my favourite bonds, and I wish it stays the same forever. No matter how busy life gets, how much things change, or where life takes us, I hope we never lose this connection. I want us to keep sharing stories, laughing at silly things, supporting each other, celebrating achievements, and creating countless memories together.",
    "I don't know how to describe this bond perfectly, but I'm genuinely happy that I have you as my best friend. Some relationships don't need any particular name or explanation; they are simply special because of the people involved. And this is one of those bonds I want to cherish forever.",
    "Thank you for being YOU. Thank you for being a beautiful part of my life.",
    "Once again, happiest birthday! May this new chapter bring you everything your heart wishes for. Keep smiling, keep shining, and always stay the wonderful person you are.",
  ],
  closing: "Lots of love, care, and best wishes! ❤️",
  signature: "Forever your best friend. 🫂",
};

export interface StarWish {
  id: number;
  name: string;
  title: string;
  message: string;
  icon: string;
  color: string;
}

export const fiveStarWishes: StarWish[] = [
  {
    id: 1,
    name: "Happiness",
    title: "Star of Happiness",
    message: "May your smile never fade, and your heart always find reasons to sing.",
    icon: "☀️",
    color: "#FBBF24"
  },
  {
    id: 2,
    name: "Success",
    title: "Star of Success",
    message: "May all your dreams come true and every effort be rewarded.",
    icon: "🏆",
    color: "#34D399"
  },
  {
    id: 3,
    name: "Strength",
    title: "Star of Strength",
    message: "May you always believe in yourself and conquer every challenge.",
    icon: "🛡️",
    color: "#60A5FA"
  },
  {
    id: 4,
    name: "Love",
    title: "Star of Love",
    message: "May you always be surrounded by people who cherish and protect you.",
    icon: "💖",
    color: "#F472B6"
  },
  {
    id: 5,
    name: "Magic",
    title: "Star of Magic",
    message: "May life surprise you in beautiful ways and fill your days with wonder.",
    icon: "✨",
    color: "#A78BFA"
  }
];

export const finaleContent = {
  greeting: "HAPPY BIRTHDAY",
  name: "SABDHA ✨",
  date: "22 • 11 • 2026",
  quote: "May your life shine as beautifully as these stars.",
  ageBadge: "22 Years of Beautiful You",
  signature: "Created with love, just for you. ❤️",
  wishesPrompt: "Click the moon to uncover 22 little wishes for you",
};

