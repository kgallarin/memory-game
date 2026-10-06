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
