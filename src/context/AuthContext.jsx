// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, loginUser, registerUser } from '../services/api'; // Import fungsi API yang baru dibuat

// Buat konteks otentikasi
export const AuthContext = createContext(null);

// Komponen penyedia otentikasi
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Untuk menunjukkan apakah status otentikasi sedang dimuat
  const [token, setToken] = useState(localStorage.getItem('jwtToken')); // Ambil token dari localStorage

  const navigate = useNavigate();

  // Fungsi untuk memuat profil pengguna dan memvalidasi token
  const loadUserProfile = useCallback(async (authToken) => {
    console.log("Token from localStorage (before fetch):", authToken ? "Ada" : "Tidak Ada"); // Logging tambahan
    if (!authToken) {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
      setIsLoadingAuth(false); // Pastikan loading selesai
      return;
    }
    try {
      const userData = await getUserProfile(authToken);
      setUser(userData.user); // Asumsi backend mengembalikan { user: { ... } }
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData.user)); // Simpan user data di localStorage
    } catch (error) {
      console.error('Failed to load user profile:', error);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('jwtToken'); // Hapus token jika tidak valid
      localStorage.removeItem('user'); // Hapus user dari localStorage jika token tidak valid
      // Arahkan ke halaman login jika token tidak valid atau kedaluwarsa
      if (error.message.includes('Token tidak valid') || error.message.includes('kedaluwarsa')) {
        navigate('/login');
      }
    } finally {
      setIsLoadingAuth(false);
    }
  }, [navigate]);

  // Fungsi untuk menangani login
  const login = useCallback(async (email, password) => {
    setIsLoadingAuth(true);
    try {
      const data = await loginUser({ email, password });
      if (data.token && data.user) {
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // Simpan user data di localStorage saat login
        setToken(data.token);
        setUser(data.user);
        setIsLoggedIn(true);
        setIsLoadingAuth(false);
        return { success: true, message: data.msg || 'Login berhasil!' };
      } else {
        setIsLoadingAuth(false);
        return { success: false, message: data.msg || 'Login gagal.' };
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoadingAuth(false);
      return { success: false, message: error.message || 'Terjadi kesalahan saat login.' };
    }
  }, []);

  // Fungsi untuk menangani pendaftaran
  const register = useCallback(async (userData) => {
    setIsLoadingAuth(true);
    try {
      const data = await registerUser(userData);
      setIsLoadingAuth(false);
      return { success: true, message: data.msg || 'Pendaftaran berhasil!' };
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoadingAuth(false);
      return { success: false, message: error.message || 'Terjadi kesalahan saat pendaftaran.' };
    }
  }, []);

  // Fungsi untuk logout
  const logout = useCallback(() => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user'); // Hapus user dari localStorage saat logout
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    navigate('/login'); // Arahkan ke halaman login setelah logout
  }, [navigate]);

  // Fungsi untuk memperbarui data profil di konteks dan localStorage
  const updateProfileInContext = useCallback((updatedUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedUserData
    }));
    localStorage.setItem('user', JSON.stringify(updatedUserData)); // Pastikan user data diupdate di local storage
  }, []);

  // Efek untuk memuat profil pengguna saat komponen dimuat atau token berubah
  useEffect(() => {
    setIsLoadingAuth(true);
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      loadUserProfile(storedToken);
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoadingAuth(false);
    }
  }, [token, loadUserProfile]);

  // Nilai yang akan disediakan oleh konteks
  const authContextValue = {
    isLoggedIn,
    user,
    token,
    isLoadingAuth,
    login,
    register,
    logout,
    loadUserProfile,
    updateProfileInContext
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook kustom untuk memudahkan penggunaan konteks
export const useAuth = () => {
  return useContext(AuthContext);
};
