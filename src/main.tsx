import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import './styles/index.css';
import App from './App.js';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
