import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Make sure you have an App.js file in the src directory
import './app.css'; // Optional: if you have a CSS file for styling

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);