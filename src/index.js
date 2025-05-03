import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // ✅ tambahkan ini

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ bungkus App dengan BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
