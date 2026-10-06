import { DifficultyConfig, DifficultyLevel } from '@/types/game.ts';

export const DIFFICULTY_PRESETS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    label: 'Easy (2×2)',
    gridSize: 2,
    pairCount: 2,
  },
  medium: {
    label: 'Medium (4×4)',
    gridSize: 4,
    pairCount: 8,
  },
  hard: {
    label: 'Hard (6×6)',
    gridSize: 6,
    pairCount: 18,
  },
} as const;
