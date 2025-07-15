// D:\eduspace-main\src\pages\SettingsPage.jsx

import React, { useState, useEffect } from 'react';

// Terima props currentTheme dan onThemeChange dari App.js
function SettingsPage({ currentTheme, onThemeChange }) {
  // State lokal untuk pengaturan selain tema
  const [emailNotifications, setEmailNotifications] = useState(
    JSON.parse(localStorage.getItem('emailNotifications')) || true
  );
  const [profileVisibility, setProfileVisibility] = useState(
    localStorage.getItem('profileVisibility') || 'public'
  );

  // Efek untuk menyimpan pengaturan notifikasi ke localStorage
  useEffect(() => {
    localStorage.setItem('emailNotifications', JSON.stringify(emailNotifications));
  }, [emailNotifications]);

  // Efek untuk menyimpan pengaturan privasi ke localStorage
  useEffect(() => {
    localStorage.setItem('profileVisibility', profileVisibility);
  }, [profileVisibility]);

  // Fungsi toggleTheme sekarang memanggil prop onThemeChange yang diterima dari App.js
  const toggleTheme = () => {
    onThemeChange(currentTheme === 'light' ? 'dark' : 'light');
  };

  const toggleEmailNotifications = () => {
    setEmailNotifications((prev) => !prev);
  };

  const handleProfileVisibilityChange = (e) => {
    setProfileVisibility(e.target.value);
  };

  return (
    // Hapus kelas warna dasar di sini, karena sudah ditangani di div root App.js.
    // Biarkan min-h-screen, pt-20, pb-10 untuk layout.
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Pengaturan</h1>

        {/* Bagian Tampilan */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-colors duration-300 mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">Tampilan</h2>

          <div className="flex items-center justify-between mb-4">
            <span className="text-lg">Mode Gelap (Dark Mode)</span>
            <label className="switch">
              {/* Gunakan currentTheme dari props untuk menentukan status checked */}
              <input type="checkbox" checked={currentTheme === 'dark'} onChange={toggleTheme} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* Bagian Notifikasi */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-colors duration-300 mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">Notifikasi</h2>

          <div className="flex items-center justify-between mb-4">
            <span className="text-lg">Terima Notifikasi Email</span>
            <label className="switch">
              <input type="checkbox" checked={emailNotifications} onChange={toggleEmailNotifications} />
              <span className="slider round"></span>
            </label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Aktifkan untuk menerima pembaruan kursus dan pemberitahuan penting melalui email.
          </p>
        </div>

        {/* Bagian Privasi */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-colors duration-300 mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">Privasi</h2>

          <div className="mb-4">
            <label htmlFor="profileVisibility" className="block text-lg font-medium mb-2">Visibilitas Profil</label>
            <select
              id="profileVisibility"
              name="profileVisibility"
              value={profileVisibility}
              onChange={handleProfileVisibilityChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border dark:border-gray-600"
            >
              <option value="public">Publik (Terlihat oleh semua orang)</option>
              <option value="friends">Teman (Hanya terlihat oleh teman)</option>
              <option value="private">Privat (Hanya terlihat oleh Anda)</option>
            </select>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Kontrol siapa yang dapat melihat informasi profil Anda.
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-lg">Izinkan Pencarian Nama Pengguna</span>
            <label className="switch">
              <input type="checkbox" /* Anda bisa menambahkan state untuk ini */ />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      {/* CSS untuk Toggle Switch (tetap sama) */}
      <style>{`
        /* The switch - the box around the slider */
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        /* Hide default HTML checkbox */
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        /* The slider */
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: .4s;
          transition: .4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: .4s;
          transition: .4s;
        }

        input:checked + .slider {
          background-color: #2196F3; /* Warna biru saat aktif */
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196F3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(26px);
          -ms-transform: translateX(26px);
          transform: translateX(26px);
        }

        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}

export default SettingsPage;