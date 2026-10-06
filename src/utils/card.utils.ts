import { shuffle } from 'lodash-es';

import type { CardItem } from '@/types/card.ts';

import { EMOJI_CONTENTS } from '@/constants/card.constants';

export const generateShuffledCardBoard = (pairCount: number): CardItem[] => {
  // slice len to match with pair count/difficulty
  const emojis = EMOJI_CONTENTS.slice(0, pairCount);
  const duplicatedContent = [...emojis, ...emojis];

  return shuffle(duplicatedContent).map(
    (content: string, index: number): CardItem => ({
      id: index,
      content,
      isFlipped: false,
      hasMatched: false,
    })
  );
};
