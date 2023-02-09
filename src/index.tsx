import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from 'components';

const root = document.querySelector<HTMLElement>('#root');
if (!root) throw Error(`<div id="root"></div> not found in index.html`);

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
