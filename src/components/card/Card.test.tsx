import { Card } from '@components/card/Card.tsx';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';

import type { CardItem } from '@/types/card.ts';

const renderComponent = (
  propsPartial?: Partial<CardItem> & { onClick?: (id: number) => void }
) => {
  const user = userEvent.setup();
  const defaultOnClick = vi.fn();
  const defaultCard: CardItem = {
    id: 1,
    content: '💀',
    isFlipped: false,
    hasMatched: false,
    onClick: defaultOnClick,
    ...propsPartial,
  };

  const utils = render(<Card {...defaultCard} />);

  return {
    user,
    onClick: defaultCard.onClick,
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
    const { getByTestId } = renderComponent();

    expect(getByTestId('card')).toHaveTextContent('💀');
  });
  it.only('diplays card content when clicked', async (): Promise<void> => {
    const handleCardClick = vi.fn();
    const { user, getByTestId } = renderComponent({
      onClick: handleCardClick,
    });

    await user.click(getByTestId('card'));

    expect(handleCardClick).toHaveBeenCalledWith(1);
  });
});
