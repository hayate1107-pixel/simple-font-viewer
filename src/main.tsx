import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './page.tsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
