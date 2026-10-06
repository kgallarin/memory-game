import { Card } from '@components/card/Card.tsx';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';

import type { CardItem } from '@/types/card.ts';

const renderComponent = (propsPartial?: Partial<CardItem>) => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  const defaultCard: CardItem = {
    id: 1,
    content: '💀',
    isFlipped: false,
    hasMatched: false,
    ...propsPartial,
  };

  const utils = render(<Card {...defaultCard} onClick={onClick} />);

  return {
    user,
    onClick,
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
});
