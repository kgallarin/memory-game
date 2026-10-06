import { useEffect, useRef, useState } from 'react';

import type { CardItem } from '@/types/card.ts';
import { DifficultyLevel } from '@/types/game.ts';

import { DIFFICULTY_PRESETS } from '@/constants/game.constants';
import { generateShuffledCardBoard } from '@/utils/card.utils';

export const useMemoryGame = (initialDifficultyLevel: DifficultyLevel = 'easy') => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(
    initialDifficultyLevel
  );

  const [cards, setCards] = useState<CardItem[]>((): CardItem[] =>
    generateShuffledCardBoard(DIFFICULTY_PRESETS[initialDifficultyLevel].pairCount)
  );

  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const [moves, setMoves] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Timer states
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer Effect: Tick every second while running
  useEffect((): (() => void) => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return (): void => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  const resetGame = (newDifficulty: DifficultyLevel = difficulty): void => {
    if (isLoading) return;
    setIsLoading(true);

    // 1. Immediately stop timer and clear active interval ref
    setIsTimerRunning(false);
    setElapsedTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // setCards(generateShuffledCardBoard(targetConfig.pairCount));
    setCards((prevCardsState: CardItem[]) =>
      prevCardsState.map((card: CardItem) => ({
        ...card,
        isFlipped: false,
        hasMatched: false,
      }))
    );
    setFlippedCards([]);

    setTimeout(() => {
      const targetConfig = DIFFICULTY_PRESETS[newDifficulty];
      setDifficulty(newDifficulty);
      setCards(generateShuffledCardBoard(targetConfig.pairCount));
      setMoves(0);
      setIsLoading(false);
    }, 400);
  };

  const changeDifficulty = (level: DifficultyLevel): void => {
    if (level === difficulty) return;

    resetGame(level);
  };

  useEffect((): void => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resetGame();
  }, []);

  const handleCardClick = (id: number) => {
    // prevent clicking same card
    if (isLoading || flippedCards.includes(id)) return;

    // timer starts
    if (!isTimerRunning && moves === 0 && flippedCards.length === 0) {
      setIsTimerRunning(true);
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // update flipped status on the board
    setCards((previousCardState: CardItem[]): CardItem[] =>
      previousCardState.map((card: CardItem): CardItem =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    // when two cards flipped, check match
    if (newFlippedCards.length === 2) {
      setIsLoading(true);
      setMoves((move: number): number => move + 1);

      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(
        (card: CardItem): boolean => card.id === firstCardId
      );

      const secondCard = cards.find(
        (card: CardItem): boolean => card.id === secondCardId
      );

      // matched
      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        setCards((previousCardState: CardItem[]) => {
          const updatedCards = previousCardState.map((card: CardItem) =>
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, hasMatched: true }
              : card
          );

          const isGameWon = updatedCards.every((card) => card.hasMatched);
          if (isGameWon) {
            setIsTimerRunning(false);
          }

          return updatedCards;
        });

        setFlippedCards([]);
        setIsLoading(false);
      } else {
        setTimeout((): void => {
          setCards((previousCardState: CardItem[]): CardItem[] =>
            previousCardState.map((card: CardItem): CardItem =>
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isFlipped: false }
                : card
            )
          );

          setFlippedCards([]);
          setIsLoading(false);
        }, 1000);
      }
    }
  };

  return {
    cards,
    moves,
    isLoading,
    difficulty,
    elapsedTime,
    handleCardClick,
    changeDifficulty,
    resetGame: () => resetGame(difficulty),
    gridSize: DIFFICULTY_PRESETS[difficulty].gridSize,
  };
};
