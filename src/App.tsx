import { ReactNode } from 'react';

import { Header } from '@components/base/header/Header.tsx';
import { CardGrid } from '@components/board/CardGrid.tsx';

export const App = (): ReactNode => {
  // return <Welcome />;
  return (
    <>
      <Header />
      <CardGrid />
    </>
  );
};
