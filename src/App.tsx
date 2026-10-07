import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CardGrid } from '@components/board/CardGrid.tsx';
import { Welcome } from '@components/welcome';

export const App = (): ReactNode => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/game" element={<CardGrid />} />
      </Routes>
    </>
  );
};
