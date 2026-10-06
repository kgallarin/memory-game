import { ReactNode } from 'react';

import { Card } from '@components/card/Card.tsx';
import { BoardControls } from '@components/controls/BoardControls.tsx';

import { CardItem } from '@/types/card.ts';

import { useMemoryGame } from '@/hooks/useMemoryGame.ts';

import styles from './CardGrid.module.scss';

export const CardGrid = (): ReactNode => {
  const { cards, difficulty, moves, handleCardClick, changeDifficulty, resetGame } =
    useMemoryGame();
  return (
    <div>
      <BoardControls
        moves={moves}
        difficulty={difficulty}
        changeDifficulty={changeDifficulty}
        resetGame={resetGame}
      />
      <div className={`${styles[`card-grid`]} ${styles[difficulty]}`}>
        {cards.map((card: CardItem): ReactNode => (
          <Card
            id={card.id}
            key={card.id}
            content={card.content}
            isFlipped={card.isFlipped}
            hasMatched={card.hasMatched}
            onClick={(): void => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
};
