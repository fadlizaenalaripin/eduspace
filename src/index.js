// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind CSS
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import AuthProvider dari context
import { AuthProvider } from './context/AuthContext';
// Import BrowserRouter dari react-router-dom
import { BrowserRouter as Router } from 'react-router-dom'; // <--- PASTIKAN INI ADA

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Router adalah pembungkus paling luar untuk komponen yang menggunakan routing */}
      <AuthProvider> {/* AuthProvider membungkus App, sehingga semua komponen di App dan turunannya bisa akses AuthContext */}
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();