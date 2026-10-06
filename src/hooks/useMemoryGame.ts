import { useEffect, useState } from 'react';

import type { CardItem } from '@/types/card.ts';
import { DifficultyLevel } from '@/types/game.ts';

import { DIFFICULTY_PRESETS } from '@/constants/game.constants';
import { generateShuffledCardBoard } from '@/utils/card.utils';

export const useMemoryGame = (initialDifficultyLevel: DifficultyLevel = 'hard') => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(
    initialDifficultyLevel
  );

  const [cards, setCards] = useState<CardItem[]>((): CardItem[] =>
    generateShuffledCardBoard(DIFFICULTY_PRESETS[initialDifficultyLevel].pairCount)
  );

  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const [moves, setMoves] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const resetGame = (newDifficulty: DifficultyLevel = difficulty): void => {
    const targetConfig = DIFFICULTY_PRESETS[newDifficulty];
    setDifficulty(newDifficulty);

    setCards(generateShuffledCardBoard(targetConfig.pairCount));

    setFlippedCards([]);
    setMoves(0);
    setIsProcessing(false);
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
    if (isProcessing || flippedCards.includes(id)) return;

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
      setIsProcessing(true);
      setMoves((move: number): number => move + 1);

      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(
        (card: CardItem): boolean => card.id === firstCardId
      );

      const secondCard = cards.find((card) => card.id === secondCardId);

      // matched
      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        setCards((previousCardState: CardItem[]) =>
          previousCardState.map((card: CardItem) =>
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, hasMatched: true }
              : card
          )
        );

        setFlippedCards([]);
        setIsProcessing(false);
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
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  return {
    cards,
    moves,
    isProcessing,
    difficulty,

    handleCardClick,
    changeDifficulty,
    resetGame: () => resetGame(difficulty),
    gridSize: DIFFICULTY_PRESETS[difficulty].gridSize,
  };
};
