// src/pages/ProfilePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function ProfilePage() {
    // Dapatkan isLoggedIn, logout, user (sebagai authUser), isLoadingAuth, updateProfileInContext, dan token dari AuthContext
    // PASTIKAN 'token' JUGA DIAMBIL DI SINI DARI useAuth()
    const { isLoggedIn, logout, user: authUser, isLoadingAuth, updateProfileInContext, token } = useAuth(); // <<<--- BARIS INI PENTING

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        fullName: '',
        dateOfBirth: '',
        phoneNumber: '',
        profilePictureUrl: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true); // Tetap true di awal

    // --- PERBAIKAN DI SINI: UBAH URL BACKEND KE ALAMAT PHP ANDA ---
    // Gunakan URL backend PHP Anda yang benar, bukan localhost:5000 (Node.js)
    const BACKEND_URL = 'http://eduspace-backend-php.test'; // <<<--- UBAH KE URL BACKEND PHP ANDA
    // --- AKHIR PERBAIKAN ---

    // Bungkus fetchUserProfile dengan useCallback untuk stabilitas
    const fetchUserProfile = useCallback(async (authToken) => { // Menerima authToken sebagai argumen
        console.log("[ProfilePage] fetchUserProfile dipanggil."); // <<<--- LOGGING
        if (!authToken) {
            console.warn("[ProfilePage] fetchUserProfile: Token tidak disediakan."); // <<<--- LOGGING
            setError('Anda perlu login untuk melihat profil.');
            setLoading(false);
            return;
        }

        try {
            // Perhatikan bahwa URL endpoint API PHP Anda mungkin tidak memiliki '/api' setelah domain.
            // Sesuaikan path ini jika struktur API PHP Anda berbeda.
            // Contoh: Jika API profil Anda langsung di http://eduspace-backend-php.test/user/profile.php
            // maka cukup gunakan `${BACKEND_URL}/user/profile.php`
            console.log("[ProfilePage] Mengirim permintaan GET ke /api/users/profile dengan token:", authToken); // <<<--- LOGGING
            const response = await axios.get(`${BACKEND_URL}/api/user/profile.php`, { // <<<--- SESUAIKAN PATH API PHP DI SINI
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            const data = response.data.user; // Data user ada di properti 'user' dari respons
            console.log("[ProfilePage] Data profil diterima:", data); // <<<--- LOGGING

            const formattedDateOfBirth = data.dateOfBirth
                ? new Date(data.dateOfBirth).toISOString().split('T')[0]
                : '';

            setUserData({
                username: data.username || '',
                email: data.email || '',
                fullName: data.fullName || '',
                dateOfBirth: formattedDateOfBirth,
                phoneNumber: data.phoneNumber || '',
                profilePictureUrl: data.profilePicture || ''
            });
            setLoading(false); // <<<--- PENTING: loading diatur ke false di sini
            setError(''); // Clear error jika berhasil fetch
            console.log("[ProfilePage] State userData diperbarui, loading disetel ke false."); // <<<--- LOGGING
        } catch (err) {
            console.error('[ProfilePage] Error fetching user profile:', err); // <<<--- LOGGING
            if (err.response) {
                console.error("[ProfilePage] Respon error:", err.response.status, err.response.data); // <<<--- LOGGING
            }
            if (err.response && err.response.status === 401) {
                setError('Sesi Anda telah berakhir atau tidak valid. Silakan login kembali.');
                logout(); // Panggil logout dari AuthContext untuk membersihkan state
            } else {
                setError(err.response?.data?.message || 'Gagal memuat data profil. Silakan coba lagi.');
            }
            setLoading(false); // <<<--- PENTING: loading diatur ke false jika ada error
        }
    }, [BACKEND_URL, logout]); // logout sebagai dependency karena dipanggil di dalamnya

    // useEffect utama untuk memicu pengambilan data profil
    useEffect(() => {
        console.log("[ProfilePage] useEffect: isLoggedIn:", isLoggedIn, "isLoadingAuth:", isLoadingAuth, "token:", token, "authUser:", authUser); // <<<--- LOGGING
        // Hanya panggil fetchUserProfile jika AuthContext mengonfirmasi user sudah login dan tidak dalam proses loading auth
        if (isLoggedIn && !isLoadingAuth && token) { // <<<--- KONDISI PENTING: Gunakan state 'token' langsung dari AuthContext
            console.log("[ProfilePage] Kondisi terpenuhi: Memulai fetchUserProfile."); // <<<--- LOGGING
            setLoading(true); // Mulai loading saat akan fetch
            fetchUserProfile(token); // Lewatkan state 'token' dari AuthContext
        } else if (!isLoggedIn && !isLoadingAuth) {
            // Jika isLoggedIn false dan isLoadingAuth juga false (berarti tidak login)
            console.log("[ProfilePage] User tidak login setelah isLoadingAuth selesai."); // <<<--- LOGGING
            setError('Anda perlu login untuk melihat profil.');
            setLoading(false);
        }
    }, [isLoggedIn, isLoadingAuth, token, fetchUserProfile, authUser]); // <<<--- authUser DITAMBAHKAN DI SINI

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true); // Set loading saat submit

        // Gunakan token dari AuthContext
        if (!token) { // <<<--- KONDISI PENTING: Gunakan state 'token' langsung
            setError('Anda tidak diotorisasi. Silakan login kembali.');
            logout();
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('fullName', userData.fullName);
        formData.append('dateOfBirth', userData.dateOfBirth);
        formData.append('phoneNumber', userData.phoneNumber);
        if (selectedFile) {
            formData.append('profilePicture', selectedFile);
        }

        try {
            console.log("[ProfilePage] Mengirim permintaan PUT ke /api/users/profile."); // <<<--- LOGGING
            const response = await axios.put(`${BACKEND_URL}/api/user/profile.php`, formData, { // <<<--- SESUAIKAN PATH API PHP DI SINI
                headers: {
                    Authorization: `Bearer ${token}`, // <<<--- Menggunakan state 'token' langsung
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage('Profil berhasil diperbarui!');
            console.log("[ProfilePage] Profil berhasil diperbarui di backend:", response.data.user); // <<<--- LOGGING

            // Panggil updateProfileInContext yang sudah dideklarasikan di awal komponen
            updateProfileInContext(response.data.user); 

            setUserData(prev => ({
                ...prev,
                username: response.data.user.username || prev.username,
                email: response.data.user.email || prev.email,
                fullName: response.data.user.fullName || prev.fullName,
                dateOfBirth: response.data.user.dateOfBirth ? new Date(response.data.user.dateOfBirth).toISOString().split('T')[0] : prev.dateOfBirth,
                phoneNumber: response.data.user.phoneNumber || prev.phoneNumber,
                profilePictureUrl: response.data.user.profilePicture || ''
            }));
            setSelectedFile(null);

        } catch (err) {
            console.error('[ProfilePage] Error updating profile:', err); // <<<--- LOGGING
            if (err.response) {
                console.error("[ProfilePage] Respon error update:", err.response.status, err.response.data); // <<<--- LOGGING
            }
            if (err.response && err.response.status === 401) {
                setError('Sesi Anda telah berakhir atau tidak valid. Silakan login kembali.');
                logout();
            } else {
                setError(err.response?.data?.message || 'Gagal memperbarui profil. Silakan coba lagi.');
            }
        } finally {
            setLoading(false); // Pastikan loading false setelah selesai (baik sukses/gagal)
        }
    };

    if (isLoadingAuth || loading) { // Kondisi ini mengontrol tampilan "Memuat profil..."
        console.log("[ProfilePage] Menampilkan loading: isLoadingAuth =", isLoadingAuth, ", loading =", loading); // <<<--- LOGGING
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
                <p className="text-xl text-gray-700 dark:text-gray-300">Memuat profil...</p>
            </div>
        );
    }

    // Tampilkan pesan error dan link ke login jika sesi tidak valid
    if (error && (error.includes('Anda perlu login') || error.includes('Sesi Anda telah berakhir'))) {
        console.log("[ProfilePage] Menampilkan pesan error dan link login:", error); // <<<--- LOGGING
        return (
            <div className="text-center mt-20 p-4 bg-red-100 text-red-700 rounded-lg">
                {error} <Link to="/login" className="text-blue-500 hover:underline">Login di sini</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl mt-10 transition-colors duration-300">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 dark:text-blue-400 transition-colors duration-300">Profil Saya</h1>

            {message && (
                <div className="bg-green-100 dark:bg-green-800 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 px-4 py-3 rounded-md relative mb-6 transition-colors duration-300" role="alert">
                    {message}
                </div>
            )}
            {error && (
                <div className="bg-red-100 dark:bg-red-800 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded-md relative mb-6 transition-colors duration-300" role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 shadow-lg rounded-xl p-8 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                <div className="mb-8 text-center">
                    {userData.profilePictureUrl ? (
                        <img
                            src={userData.profilePictureUrl} // Gunakan URL lengkap dari state
                            alt="Profil User"
                            className="w-40 h-40 rounded-full object-cover mx-auto mb-5 border-4 border-blue-600 dark:border-blue-500 shadow-md transform transition-transform duration-300 hover:scale-105"
                        />
                    ) : (
                        <UserCircle className="w-40 h-40 text-gray-400 dark:text-gray-500 mx-auto mb-5 p-2 bg-gray-100 dark:bg-gray-600 rounded-full border-4 border-gray-300 dark:border-gray-500 transition-colors duration-300" />
                    )}
                    <label className="block text-blue-700 dark:text-blue-400 font-bold cursor-pointer hover:underline text-lg transition-colors duration-300">
                        Ubah Foto Profil
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                    {selectedFile && <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 transition-colors duration-300">File dipilih: <span className="font-medium text-gray-700 dark:text-gray-200">{selectedFile.name}</span></p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 text-base font-semibold mb-2 transition-colors duration-300">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userData.username}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 cursor-not-allowed transition-colors duration-300"
                            disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-base font-semibold mb-2 transition-colors duration-300">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 cursor-not-allowed transition-colors duration-300"
                            disabled
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="fullName" className="block text-gray-700 dark:text-gray-300 text-base font-semibold mb-2 transition-colors duration-300">Nama Lengkap:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        placeholder="Masukkan nama lengkap Anda"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="dateOfBirth" className="block text-gray-700 dark:text-gray-300 text-base font-semibold mb-2 transition-colors duration-300">Tanggal Lahir:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={userData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 transition-colors duration-300"
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="phoneNumber" className="block text-gray-700 dark:text-gray-300 text-base font-semibold mb-2 transition-colors duration-300">Nomor Telepon:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        placeholder="Masukkan nomor telepon Anda"
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline-blue transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfilePage;
