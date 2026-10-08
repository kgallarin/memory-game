import { faker } from '@faker-js/faker';
import { defu } from 'defu';

import { DeepPartial } from '@/types/app';
import type { CardItem } from '@/types/card';

import { EMOJI_CONTENTS } from '@/constants/card.constants.ts';

const cardSeeder = (isTemplateType: boolean = false): CardItem => {
  if (isTemplateType) {
    return {
      id: 0,
      content: '',
      isFlipped: false,
      hasMatched: false,
    };
  }

  return {
    id: faker.number.int({ min: 1, max: 9999 }),
    content: faker.helpers.arrayElement(EMOJI_CONTENTS),
    isFlipped: false,
    hasMatched: false,
  };
};

// single card
export const createCard = (
  overrides?: DeepPartial<CardItem>,
  isTemplateType: boolean = false
): CardItem => {
  return defu(overrides, cardSeeder(isTemplateType)) as CardItem;
};

// multiple cards
export const createCards = (
  quantity: number,
  overrides?: DeepPartial<CardItem>,
  isTemplateType: boolean = false
): CardItem[] => {
  return Array.from({ length: quantity }, (_, index) =>
    createCard(
      {
        id: index + 1,
        ...overrides,
      },
      isTemplateType
    )
  );
};

export const createCardPairs = (
  pairCount: number,
  overrides?: DeepPartial<CardItem>
): CardItem[] => {
  const cards: CardItem[] = [];

  for (let i = 0; i < pairCount; i++) {
    const content = EMOJI_CONTENTS[i % EMOJI_CONTENTS.length];

    // pair 1
    cards.push(
      createCard({
        id: i * 2 + 1,
        content,
        ...overrides,
      })
    );

    cards.push(
      createCard({
        id: i * 2 + 2,
        content,
        ...overrides,
      })
    );
  }

  return cards;
};
