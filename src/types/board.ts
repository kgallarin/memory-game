import { DifficultyLevel } from '@/types/game.ts';

export interface BoardControlsProps {
  difficulty: DifficultyLevel;
  changeDifficulty: (level: DifficultyLevel) => void;
  resetGame: () => void;
}
