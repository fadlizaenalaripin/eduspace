// src/pages/LoginPage.js

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext); // Dapatkan fungsi login dari AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Panggil fungsi login dari AuthContext
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setSuccessMessage(result.message);
        // Kosongkan form setelah sukses
        setFormData({ email: '', password: '' });
        setTimeout(() => navigate('/dashboard'), 1500); // Arahkan ke dashboard setelah login berhasil
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Terjadi kesalahan jaringan atau server tidak merespons.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Kolom kiri - ilustrasi */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-blue-100 p-10">
          <img
            src="/images/ilustrasi_login.svg" // Pastikan path ilustrasi ini ada di folder public Anda
            alt="Ilustrasi Login"
            className="max-w-full h-auto"
          />
        </div>

        {/* Kolom kanan - form login */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>

          {successMessage && (
            <div className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm">{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
              <AlertTriangle className="w-5 h-5" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Masukkan email Anda"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Masukkan password Anda"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span>Logging in...</span>
                </div>
              ) : (
                'LOGIN'
              )}
            </button>
          </form>

          {/* Login dengan Google & GitHub (jika ada) */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 mb-4">Atau login dengan</p>
            <div className="flex justify-center gap-4">
              {/* Anda bisa menambahkan tombol login pihak ketiga di sini jika Anda mengimplementasikannya */}
              {/* Contoh:
              <button
                type="button"
                onClick={() => handleFirebaseLogin('google')}
                className="flex items-center gap-3 border border-gray-300 rounded-lg px-5 py-2 bg-white hover:bg-gray-100 shadow transition"
                disabled={loading}
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-6 h-6 rounded-full" />
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
              */}
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 mt-4">
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800">
              Lupa password?
            </Link>
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Daftar sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
