import json

with open('src/data/photos.json') as f:
    data = json.load(f)

ts_content = """export interface BirthdayPhoto {
  id: string;
  src: string;
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
  childhood: """ + json.dumps(data['childhood'], indent=2) + """,

  growingUp: """ + json.dumps(data['growingUp'], indent=2) + """,

  family: """ + json.dumps(data['family'], indent=2) + """,

  friends: """ + json.dumps(data['friends'], indent=2) + """,

  ourMemories: """ + json.dumps(data['ourMemories'], indent=2) + """,

  specialMoments: """ + json.dumps(data['specialMoments'], indent=2) + """,

  birthdayLetter: {
    id: "letter-keepsake",
    src: "/photos/birthday-letter/photo-01.jpg",
    caption: "A keepsake memory written with love for your 22nd birthday.",
    alt: "Sabdha letter keepsake photo",
    width: 1200,
    height: 1600,
    aspectRatio: 0.75,
    orientation: "portrait",
    tag: "Keepsake"
  },

  finale: {
    id: "finale-portrait",
    src: "/photos/finale/photo-01.jpg",
    caption: "Under the starlit sky, celebrating 22 years of beautiful you.",
    alt: "Sabdha 22nd birthday finale portrait",
    width: 900,
    height: 1600,
    aspectRatio: 0.56,
    orientation: "portrait",
    tag: "Sabdha at 22"
  }
};
"""

with open('src/data/photos.ts', 'w', encoding='utf-8') as out:
    out.write(ts_content)

print('Generated src/data/photos.ts successfully!')

