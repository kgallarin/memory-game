import { ReactNode } from 'react';

import { Button } from '@components/base/button/Button.tsx';

import { BoardControlsProps } from '@/types/board.ts';
import { DifficultyLevel } from '@/types/game.ts';

import { DIFFICULTY_PRESETS } from '@/constants/game.constants.ts';

import styles from './BoardControls.module.scss';

export const BoardControls = ({
  difficulty,
  changeDifficulty,
  resetGame,
}: BoardControlsProps): ReactNode => {
  return (
    <div className={styles['controls']}>
      <div className={styles['difficulty-selector']}>
        <Button onClick={resetGame}>restart</Button>
        {Object.entries(DIFFICULTY_PRESETS).map(([levelKey, config]) => {
          const level = levelKey as DifficultyLevel;
          const isActive = difficulty === level;

          return (
            <Button
              key={level}
              className={`${styles['difficulty-btn']} ${isActive ? styles.active : ''}`}
              onClick={() => changeDifficulty(level)}
              disabled={isActive}
            >
              {config.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
