import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { StrictMode } from 'react';
import Learn from './learn';

const container = document.getElementById('root');

if (!container) throw new Error('..');

const reactDomRoot = createRoot(container);

reactDomRoot.render(
  <StrictMode>
    <Learn/>
  </StrictMode>
);