import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/styles/reset.scss';

import { App } from './App.tsx';

const rootElm = document.getElementById('root');

if (!rootElm) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElm);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
