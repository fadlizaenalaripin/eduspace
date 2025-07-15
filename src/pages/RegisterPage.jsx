// src/pages/RegisterPage.jsx

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '' // Menambahkan bidang konfirmasi password
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { register } = useContext(AuthContext); // Dapatkan fungsi register dari AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Validasi konfirmasi password
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Password dan konfirmasi password tidak cocok.');
      setLoading(false);
      return;
    }

    try {
      // Hanya kirim username, email, dan password ke fungsi register
      const { username, email, password } = formData;
      const result = await register({ username, email, password });

      if (result.success) {
        setSuccessMessage(result.message);
        // Kosongkan form setelah sukses
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        setTimeout(() => navigate('/login'), 1500); // Arahkan ke halaman login setelah pendaftaran berhasil
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrorMessage('Terjadi kesalahan jaringan atau server tidak merespons.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-xl bg-white shadow-lg rounded-2xl overflow-hidden"> {/* max-w-xl untuk form saja */}
        {/* Kolom kiri - ilustrasi dihapus */}

        {/* Kolom kanan - form register sekarang mengambil lebar penuh */}
        <div className="w-full p-8"> {/* w-full agar mengambil seluruh lebar container */}
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Daftar</h2> {/* Warna biru */}

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
              <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" // Warna biru
                placeholder="Masukkan username Anda"
                required
              />
            </div>

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
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" // Warna biru
                placeholder="Masukkan email Anda"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" // Warna biru
                placeholder="Masukkan password Anda"
                required
              />
            </div>

            {/* Bidang Konfirmasi Password Baru */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-1">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" // Warna biru
                placeholder="Konfirmasi password Anda"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center" // Warna biru
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
                  <span>Mendaftar...</span>
                </div>
              ) : (
                'DAFTAR'
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-4">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800"> {/* Warna biru */}
              Login sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
