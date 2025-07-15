// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoadingAuth } = useAuth(); // Dapatkan status login dan loading dari AuthContext

  if (isLoadingAuth) {
    // Anda bisa menampilkan spinner atau pesan loading di sini
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        Memuat otentikasi...
      </div>
    );
  }

  // Jika tidak login, arahkan ke halaman login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, tampilkan komponen anak-anaknya (halaman yang dilindungi)
  return children;
};

export default PrivateRoute;
