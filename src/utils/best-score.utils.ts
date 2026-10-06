import type { DifficultyLevel } from '@/types/game';

export interface BestScore {
  moves: number;
  time: number; // secs
}

export type BestScoresState = Record<DifficultyLevel, BestScore | null>;

const LOCAL_STORAGE_KEY = 'memory_game_best_scores';

export const getStoredBestScores = (): BestScoresState => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : { easy: null, medium: null, hard: null };
  } catch {
    return { easy: null, medium: null, hard: null };
  }
};

// true if beats the recorded best score.
// Fewer moves, and shorter time

export const isBetterScore = (
  current: BestScore,
  best: BestScore | null
): boolean => {
  if (!best) return true;
  if (current.moves < best.moves) return true;
  return current.moves === best.moves && current.time < best.time;
};

export const saveBestScore = (
  difficulty: DifficultyLevel,
  newScore: BestScore
): BestScoresState => {
  const currentScores = getStoredBestScores();
  const existingBest = currentScores[difficulty];

  if (isBetterScore(newScore, existingBest)) {
    const updatedScores = {
      ...currentScores,
      [difficulty]: newScore,
    };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedScores));
    } catch (e) {
      console.error('Failed to save best score to localStorage', e);
    }
    return updatedScores;
  }

  return currentScores;
};
