import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@/styles/reset.scss';

import { App } from './App.tsx';

const rootElm = document.getElementById('root');

if (!rootElm) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElm);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
