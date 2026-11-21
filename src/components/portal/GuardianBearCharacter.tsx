import { useState, type FC } from 'react';

export type BearEmotion = 'idle' | 'typing' | 'angry' | 'celebrating';

interface GuardianBearCharacterProps {
  name: 'Barnaby' | 'Bella';
  emotion: BearEmotion;
}

const expressions = ['resting', 'angry', 'happy'] as const;
type BearExpression = typeof expressions[number];

const bears = {
  Barnaby: {
    slug: 'barnaby',
    alt: 'Cinnamon plush teddy bear with a gold party hat and burgundy bow',
    typing: 'Watching closely... 🐾',
  },
  Bella: {
    slug: 'bella',
    alt: 'Honey-coloured plush teddy bear with a pink satin bow',
    typing: 'Is it 2004...? ✨',
  },
};

export const GuardianBearCharacter: FC<GuardianBearCharacterProps> = ({ name, emotion }) => {
  const bear = bears[name];
  const [readyExpressions, setReadyExpressions] = useState<Partial<Record<BearExpression, boolean>>>({});
  const requestedExpression = emotion === 'celebrating' ? 'happy' : emotion === 'angry' ? 'angry' : 'resting';
  const activeExpression = readyExpressions[requestedExpression] ? requestedExpression : 'resting';
  const reaction = {
    idle: '',
    typing: bear.typing,
    angry: 'Hmph! Wrong Year!',
    celebrating: 'Queen Sabdha 2004! 💖',
  }[emotion];

  return (
    <figure className="guardian-bear" data-emotion={emotion} data-bear={name}>
      <div className="guardian-bear-reaction" aria-hidden="true">
        {reaction && <span>{reaction}</span>}
      </div>
      <div className="guardian-bear-portrait">
        {expressions.map((expression) => (
          <img
            key={expression}
            src={expression === 'resting'
              ? `/illustrations/${bear.slug}-plush.png`
              : `/illustrations/${bear.slug}-${expression}.webp`}
            alt={expression === 'resting' ? bear.alt : `${name} is ${expression}`}
            aria-hidden={expression !== activeExpression}
            data-expression={expression}
            data-active={expression === activeExpression}
            width={expression === 'resting' ? 1254 : 480}
            height={expression === 'resting' ? 1254 : 480}
            decoding="async"
            onLoad={() => setReadyExpressions((ready) => ({ ...ready, [expression]: true }))}
          />
        ))}
      </div>
      <figcaption><strong>{name} Bear</strong><small>Birthday Guardian</small></figcaption>
    </figure>
  );
};
