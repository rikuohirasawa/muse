import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ArtContextProvider } from './ArtContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ArtContextProvider>
      <App />
    </ArtContextProvider>
  </React.StrictMode>
);


