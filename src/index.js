import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/App.css';

const container = document.getElementById('root');
const root = createRoot(container); // Utilise createRoot pour le rendu
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
