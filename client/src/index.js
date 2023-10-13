import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthCotextProvider } from './context/AuthContext';
import { SearchCotextProvider } from './context/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <AuthCotextProvider>
    <SearchCotextProvider>
      <App />
    </SearchCotextProvider>
    </AuthCotextProvider>
  </React.StrictMode>
);
