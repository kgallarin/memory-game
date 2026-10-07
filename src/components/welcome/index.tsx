import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@components/base/button/Button.tsx';

import styles from './Welcome.module.scss';

export const Welcome = (): ReactNode => {
  const navigate = useNavigate();
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <h2>🧠 Welcome to Memory Game</h2>
        <h3>flip, track your moves and match every card pair! </h3>

        <div className="rules">
          <ul>
            <li>✔️ Flip two cards per turn</li>
            <li>✔️ Match pairs to keep them opened</li>
            <li>✔️ Clear it with fewest moves</li>
          </ul>
        </div>

        <Button onClick={() => navigate('/game')}>Play Game</Button>
      </div>
    </div>
  );
};
