import { ReactNode } from 'react';

import { Button } from '@components/base/button/Button.tsx';
import { Header } from '@components/base/header/Header.tsx';
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
    bestScore,
    moves,
    isGameFinished,
    handleCardClick,
    changeDifficulty,
    resetGame,
  } = useMemoryGame();
  return (
    <div>
      <Header />
      <div className={`${styles[`card-grid-board`]}`}>
        <div>Time: {formatTime(elapsedTime)}</div>
        <div className={`${styles[`card-grid-board-best`]}`}>
          🏆:{' '}
          {bestScore
            ? `${bestScore.moves} moves (${formatTime(bestScore.time)})`
            : ''}
        </div>
        {isGameFinished ? (
          <>
            <div className={`${styles[`card-grid-finished`]}`}>
              <p>
                🎉 You finished in {moves} moves and {elapsedTime} seconds!
              </p>
              <Button
                size={'sm'}
                className={`${styles['play-btn']}`}
                onClick={resetGame}
              >
                {' '}
                Play again{' '}
              </Button>
            </div>
          </>
        ) : (
          ''
        )}
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
