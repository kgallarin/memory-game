import { Card } from '@components/card/Card.tsx';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';

import type { CardItem } from '@/types/card.ts';

import { createCard } from '@/test/factories/card.factory.ts';

const renderComponent = (
  initialCard: Partial<CardItem>,
  propsPartial?: Partial<CardItem> & { onClick?: (id: number) => void }
) => {
  const user = userEvent.setup();

  const defaultCard = createCard(initialCard);
  const defaultOnClick = propsPartial?.onClick || vi.fn();

  const utils = render(<Card {...defaultCard} onClick={defaultOnClick} />);

  return {
    user,
    onClick: defaultOnClick,
    ...utils,
  };
};

describe('Card Component', (): void => {
  it('triggers click', async (): Promise<void> => {
    const { user, onClick, getByRole } = renderComponent({ isFlipped: false });

    await user.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('has correct content value', async (): Promise<void> => {
    const card = createCard({
      content: '💀',
    });
    const { getByTestId } = renderComponent(card);

    expect(getByTestId('card')).toHaveTextContent('💀');
  });
  it('diplays card content when clicked', async (): Promise<void> => {
    const card = createCard({ id: 1 });
    const handleCardClick = vi.fn();
    const { user, getByTestId } = renderComponent(card, {
      onClick: handleCardClick,
    });

    await user.click(getByTestId('card'));

    expect(handleCardClick).toHaveBeenCalledWith(1);
  });
});
