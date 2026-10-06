// used in constants
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  label: string;
  gridSize: number; // e.g. 2, 4, or 6
  pairCount: number; // 2×2 = 2, 4×4 = 8, 6×6 = 18 pairs
}
