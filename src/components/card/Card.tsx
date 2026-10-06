import { ReactNode } from 'react';

import type { CardItem } from '@/types/card';

import styles from './Card.module.scss';

export const Card = ({
  content,
  isFlipped,
  hasMatched,
  onClick,
}: CardItem): ReactNode => {
  return (
    <button
      data-testid="card"
      className={`${styles.card} ${isFlipped ? styles.flipped : ''} ${hasMatched ? styles.matched : ''}`}
      disabled={isFlipped || hasMatched}
      aria-label="Card"
      onClick={onClick}
    >
      <div className={styles['card-inner']}>
        <div className={styles['card-front']}>♢</div>
        <div className={styles['card-back']}>{content}</div>
      </div>
    </button>
  );
};
