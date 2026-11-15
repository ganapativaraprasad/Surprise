import os
import json
from PIL import Image

sections = {
    'childhood': {
        'folder': 'public/photos/childhood',
        'key': 'childhood',
        'captions': [
            'Every beautiful story has a beginning.',
            'Little moments, endless memories.',
            'A little smile from a beautiful beginning.',
            'The sweetest chapters start small.',
            'Innocence, wonder, and pure joy.',
            'Little steps that brightened every room.',
            'Finding magic in the smallest things.',
            'Sunshine wrapped in sweet laughter.',
            'Gentle days filled with warmth.',
            'Cherished beginnings of a wonderful journey.',
            'A little star growing with grace.'
        ],
        'tags': ['Beginning', 'Precious', 'Early Smile', 'Sweet Chapters', 'Wonder', 'Little Steps', 'Pure Joy', 'Sunshine', 'Gentle Days', 'Milestone', 'Grace']
    },
    'growingUp': {
        'folder': 'public/photos/growing-up',
        'key': 'growingUp',
        'captions': [
            'Look how far you have come.',
            'Every year adds a new chapter.',
            'Growing, glowing, and becoming yourself.',
            'A journey filled with little moments and big dreams.',
            'Carving your path with courage and confidence.',
            'Quiet confidence in every step forward.',
            'Milestones celebrated with heartfelt smiles.',
            'Finding your own rhythm and passion.',
            'Dreaming with eyes wide open.',
            'Cherishing every stage along the way.',
            'Grace and resilience through every season.',
            'Stepping into new chapters with courage.',
            'A journey of warmth, growth, and joy.',
            'Confidence, kindness, and individuality.',
            'Blossoming into an inspiring soul.',
            'Radiance that shines brighter with time.',
            'Embracing life with a hopeful heart.',
            'Standing here today at 22, poised and radiant.'
        ],
        'tags': ['Journey', 'New Chapter', 'Glowing', 'Big Dreams', 'Confidence', 'Quiet Strength', 'Milestones', 'Passions', 'Dreamer', 'Cherished', 'Grace', 'Courage', 'Growth', 'Individuality', 'Blossoming', 'Radiance', 'Hope', 'Golden 22']
    },
    'family': {
        'folder': 'public/photos/family',
        'key': 'family',
        'captions': [
            'Home is where beautiful memories begin.',
            'The people who make life truly special.',
            'A lifetime of love in little moments.',
            'Some bonds make every moment brighter.',
            'Wrapped in warmth, care, and blessings.',
            'Unspoken love that always feels like home.',
            'Festive lights, togetherness, and laughter.',
            'The foundation that holds you with warmth.',
            'Shared smiles that stay in the heart forever.',
            'Always surrounded by unconditional love.'
        ],
        'tags': ['Home', 'Pillars of Love', 'Warmth', 'Bright Bonds', 'Blessings', 'Unspoken Love', 'Togetherness', 'Foundation', 'Shared Smiles', 'Unconditional']
    },
    'friends': {
        'folder': 'public/photos/friends',
        'key': 'friends',
        'captions': [
            'Life becomes beautiful when shared with the right people.',
            'Good people, unforgettable moments.',
            'Memories made better together.',
            'Unfiltered laughter and shared adventures.',
            'The ones who make ordinary days feel special.',
            'Friendships that bring effortless smiles.'
        ],
        'tags': ['Together', 'Unforgettable', 'Shared Joy', 'Laughter', 'Celebration', 'Good Vibes']
    },
    'ourMemories': {
        'folder': 'public/photos/our-memories',
        'key': 'ourMemories',
        'captions': [
            'Some memories are special because we made them together.',
            'Ordinary moments, extraordinary memories.',
            'The moments that always bring a smile.',
            'Some stories are better when shared.',
            'Late night conversations and unstoppable laughs.',
            'A bond that time only makes stronger.',
            'Through every high and low, always here.',
            'To a lifetime of making unforgettable memories.'
        ],
        'tags': ['Special Moments', 'Extraordinary', 'Smiles', 'Shared Stories', 'Midnight Laughs', 'Strong Bond', 'Always Here', 'Lifetime']
    },
    'specialMoments': {
        'folder': 'public/photos/special-moments',
        'key': 'specialMoments',
        'captions': [
            'A little something that makes you special.',
            'Never stop being wonderfully you.',
            'Keep shining in your own way.',
            'Grace in every smile and every gesture.',
            'Your warmth lights up the world around you.',
            'Unapologetically kind, genuine, and radiant.',
            'A spirit full of boundless inspiration.',
            'Every little moment reflects your beauty.',
            'Poised, confident, and ready to conquer the universe.'
        ],
        'tags': ['Something Special', 'Wonderfully You', 'Keep Shining', 'Grace', 'Warmth', 'Genuine Soul', 'Inspiration', 'Beauty', 'Radiant']
    }
}

rotations = [-2.5, 1.8, -1.2, 2.4, -2.0, 1.5, -1.8, 2.2, -1.5, 2.0, -2.2, 1.6, -1.4, 2.1, -1.9, 1.7, -2.1, 1.4]

result = {}
for sec_name, data in sections.items():
    folder = data['folder']
    clean_folder = folder.replace('public/', '')
    files = sorted([f for f in os.listdir(folder) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])
    items = []
    for idx, f in enumerate(files):
        fp = os.path.join(folder, f)
        with Image.open(fp) as img:
            w, h = img.size
        ar = round(w / h, 2)
        orient = 'portrait' if h > w * 1.15 else ('landscape' if w > h * 1.15 else 'square')
        caption = data['captions'][idx] if idx < len(data['captions']) else 'A beautiful birthday memory.'
        tag = data['tags'][idx] if idx < len(data['tags']) else 'Memory'
        rot = rotations[idx % len(rotations)]
        
        items.append({
            'id': f'{sec_name}-{idx+1:02d}',
            'src': f'/{clean_folder}/{f}',
            'caption': caption,
            'tag': tag,
            'alt': f'Sabdha {tag} photograph',
            'width': w,
            'height': h,
            'aspectRatio': ar,
            'orientation': orient,
            'rotation': rot
        })
    result[data['key']] = items

print(f'Processed: childhood={len(result["childhood"])}, growingUp={len(result["growingUp"])}, family={len(result["family"])}, friends={len(result["friends"])}, ourMemories={len(result["ourMemories"])}, specialMoments={len(result["specialMoments"])}')

with open('src/data/photos.json', 'w') as out:
    json.dump(result, out, indent=2)

