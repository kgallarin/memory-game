import { DifficultyLevel } from '@/types/game.ts';

export interface BoardControlsProps {
  moves: number;
  difficulty: DifficultyLevel;
  changeDifficulty: (level: DifficultyLevel) => void;
  resetGame: () => void;
}
