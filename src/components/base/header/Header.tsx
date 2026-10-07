import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

export const Header = (): ReactNode => {
  const navigate = useNavigate();
  return (
    <div className={styles['header-nav']}>
      <div onClick={() => navigate('/')}>🧠 Memory Game</div>
    </div>
  );
};
