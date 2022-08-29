import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {Auth0Provider} from '@auth0/auth0-react';

import { ArtContextProvider } from './ArtContext';
import { UserContextProvider } from './UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
    domain='dev-2i1c-guh.us.auth0.com'
    clientId='5rjngEGwu6pjK6m2nq6uK1biMf6RcZuy'
    redirectUri='http://localhost:3000/'>
      <UserContextProvider>
      <ArtContextProvider>
        <App />
      </ArtContextProvider>
      </UserContextProvider>
    </Auth0Provider>

);


