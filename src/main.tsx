import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/outfit';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import './styles/index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('The app root element "#root" is missing.');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
