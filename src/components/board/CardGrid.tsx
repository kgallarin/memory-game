import { ReactNode } from 'react';

import { Card } from '@components/card/Card.tsx';
import { BoardControls } from '@components/controls/BoardControls.tsx';

import { CardItem } from '@/types/card.ts';

import { useMemoryGame } from '@/hooks/useMemoryGame.ts';
import { formatTime } from '@/utils/timeFormatter.ts';

import styles from './CardGrid.module.scss';

export const CardGrid = (): ReactNode => {
  const {
    cards,
    difficulty,
    elapsedTime,
    handleCardClick,
    changeDifficulty,
    resetGame,
  } = useMemoryGame();
  return (
    <div>
      <div className={`${styles[`card-grid-time`]}`}>
        <span>Time: {formatTime(elapsedTime)}</span>
      </div>
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

      <BoardControls
        difficulty={difficulty}
        changeDifficulty={changeDifficulty}
        resetGame={resetGame}
      />
    </div>
  );
};
