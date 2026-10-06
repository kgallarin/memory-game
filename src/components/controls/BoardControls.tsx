import { ReactNode } from 'react';

import { BoardControlsProps } from '@/types/board.ts';
import { DifficultyLevel } from '@/types/game.ts';

import { DIFFICULTY_PRESETS } from '@/constants/game.constants.ts';

import styles from './BoardControls.module.scss';

export const BoardControls = ({
  moves,
  difficulty,
  changeDifficulty,
  resetGame,
}: BoardControlsProps): ReactNode => {
  return (
    <div className={styles['controls']}>
      <span>Moves: {moves}</span>
      <button onClick={resetGame}>reset</button>
      <div className={styles['difficulty-selector']}>
        {Object.entries(DIFFICULTY_PRESETS).map(([levelKey, config]) => {
          const level = levelKey as DifficultyLevel;
          const isActive = difficulty === level;

          return (
            <button
              key={level}
              type="button"
              className={`${styles['difficulty-btn']} ${isActive ? styles.active : ''}`}
              onClick={() => changeDifficulty(level)}
              disabled={isActive}
            >
              {config.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
