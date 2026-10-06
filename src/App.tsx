import { ReactNode, useEffect, useState } from 'react';

import { Card } from '@components/card/Card.tsx';
import { shuffle } from 'lodash-es';

import type { CardItem } from '@/types/card.ts';

const CARD_SYMBOLS = ['🐶', '🐱', '🦊', '🐼', '🦁', '🐸', '🐵', '🦄'];
const generateShuffledCardBoard = (): CardItem[] => {
  const duplicatedContent = [...CARD_SYMBOLS, ...CARD_SYMBOLS];

  return shuffle(duplicatedContent).map(
    (content: string, index: number): CardItem => ({
      id: index,
      content,
      isFlipped: false,
      hasMatched: false,
    })
  );
};
export const App = (): ReactNode => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const [moves, setMoves] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const resetGame = () => {
    setCards(generateShuffledCardBoard);
    setFlippedCards([]);
    setMoves(0);
    setIsProcessing(false);
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
              ? { ...card, isMatched: true }
              : card
          )
        );

        setFlippedCards([]);
        setIsProcessing(false);
      } else {
        setTimeout(() => {
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
  // return <Welcome />;
  return (
    <>
      <div>
        <span>Moves: {moves}</span>
        <button onClick={resetGame}>Restart</button>
        <span>{isProcessing ? 'processing' : ''}</span>
      </div>
      <div>
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
    </>
  );
};
