// src/pages/ProfilePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function ProfilePage() {
    const { isLoggedIn, logout, user: authUser, isLoadingAuth, updateProfileInContext, token } = useAuth();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        fullName: '',
        dateOfBirth: '',
        phoneNumber: '',
        profilePictureUrl: '',
        bio: '' // Menambahkan bio
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);

    const BACKEND_URL = 'http://eduspace-backend-php.test';

    const fetchUserProfile = useCallback(async (authToken) => {
        console.log("[ProfilePage] fetchUserProfile dipanggil dengan token:", authToken ? "Ada" : "Tidak Ada");
        if (!authToken) {
            setError('Anda perlu login untuk melihat profil.');
            setLoading(false);
            return;
        }

        try {
            console.log("[ProfilePage] Mengirim permintaan GET ke /api/user/profile.php dengan token.");
            const response = await axios.get(`${BACKEND_URL}/api/user/profile.php`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            
            // --- PERBAIKAN DI SINI: Pastikan response.data.user ada sebelum mengaksesnya ---
            const data = response.data.user;
            console.log("[ProfilePage] Data profil diterima dari backend (raw):", response.data); // Log respons mentah
            console.log("[ProfilePage] Objek 'user' dari data profil:", data); // Log objek user yang diekstrak

            if (!data) {
                setError('Data profil tidak ditemukan atau tidak lengkap dari server.');
                setLoading(false);
                return;
            }

            // Memastikan semua properti ada atau default ke string kosong
            const formattedDateOfBirth = data.dateOfBirth
                ? new Date(data.dateOfBirth).toISOString().split('T')[0]
                : '';

            setUserData({
                username: data.username || '',
                email: data.email || '',
                fullName: data.fullName || '',
                dateOfBirth: formattedDateOfBirth,
                phoneNumber: data.phoneNumber || '',
                profilePictureUrl: data.profilePicture ? `${BACKEND_URL}${data.profilePicture}` : '',
                bio: data.bio || '' // Memastikan bio juga diatur
            });
            setLoading(false);
            setError('');
            console.log("[ProfilePage] State userData diperbarui, loading disetel ke false.");
        } catch (err) {
            console.error('Error fetching user profile:', err);
            if (err.response) {
                console.error("[ProfilePage] Respon error GET:", err.response.status, err.response.data);
            }
            if (err.response && err.response.status === 401) {
                setError('Sesi Anda telah berakhir atau tidak valid. Silakan login kembali.');
                logout();
            } else {
                setError(err.response?.data?.msg || 'Gagal memuat data profil. Silakan coba lagi.');
            }
            setLoading(false);
        }
    }, [BACKEND_URL, logout]);

    useEffect(() => {
        console.log("[ProfilePage useEffect] Status Auth:", { isLoggedIn, isLoadingAuth, authUserToken: authUser?.token });
        if (isLoggedIn && !isLoadingAuth && token) { // Menggunakan 'token' dari useAuth
            setLoading(true);
            fetchUserProfile(token);
        } else if (!isLoggedIn && !isLoadingAuth) {
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
        setLoading(true);

        const authToken = token; // Menggunakan 'token' dari useAuth
        if (!authToken) {
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
        formData.append('bio', userData.bio); // Menambahkan bio ke formData
        if (selectedFile) {
            formData.append('profilePicture', selectedFile);
        }

        // --- DEBUGGING: Log isi FormData sebelum dikirim ---
        console.log("[ProfilePage] Isi FormData sebelum dikirim:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        // --- AKHIR DEBUGGING ---

        try {
            console.log("[ProfilePage] Mengirim permintaan POST ke /api/user/profile.php untuk update.");
            const response = await axios.post(`${BACKEND_URL}/api/user/profile.php`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    // 'Content-Type': 'multipart/form-data' akan diatur otomatis oleh Axios
                }
            });

            setMessage('Profil berhasil diperbarui!');
            console.log("[ProfilePage] Respon sukses dari backend (raw):", response.data); // Log respons sukses mentah

            const updatedProfileData = response.data.user;
            if (updatedProfileData) {
                updateProfileInContext(updatedProfileData); // Update di AuthContext

                // Perbarui state userData dengan data terbaru dari respons backend
                setUserData(prev => ({
                    ...prev,
                    username: updatedProfileData.username || prev.username,
                    email: updatedProfileData.email || prev.email,
                    fullName: updatedProfileData.fullName || prev.fullName,
                    dateOfBirth: updatedProfileData.dateOfBirth ? new Date(updatedProfileData.dateOfBirth).toISOString().split('T')[0] : prev.dateOfBirth,
                    phoneNumber: updatedProfileData.phoneNumber || prev.phoneNumber,
                    profilePictureUrl: updatedProfileData.profilePicture ? `${BACKEND_URL}${updatedProfileData.profilePicture}` : '',
                    bio: updatedProfileData.bio || prev.bio // Memastikan bio juga diupdate
                }));
            }
            setSelectedFile(null); // Reset file yang dipilih

        } catch (err) {
            console.error('Error updating profile:', err);
            if (err.response) {
                console.error("[ProfilePage] Respon error update:", err.response.status, err.response.data);
            }
            if (err.response && err.response.status === 401) {
                setError('Sesi Anda telah berakhir atau tidak valid. Silakan login kembali.');
                logout();
            } else {
                setError(err.response?.data?.msg || 'Gagal memperbarui profil. Silakan coba lagi.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (isLoadingAuth || loading) {
        console.log("[ProfilePage] Menampilkan loading: isLoadingAuth =", isLoadingAuth, ", loading =", loading);
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
                <p className="text-xl text-gray-700 dark:text-gray-300">Memuat profil...</p>
            </div>
        );
    }

    if (error && (error.includes('Anda perlu login') || error.includes('Sesi Anda telah berakhir'))) {
        console.log("[ProfilePage] Menampilkan pesan error dan link login:", error);
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
                            src={userData.profilePictureUrl}
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
                <div className="mb-6">
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
                <div className="mb-8">
                    <label htmlFor="bio" className="block text-gray-700 dark:text-gray-300 text-base font-semibold mb-2 transition-colors duration-300">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={userData.bio}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        placeholder="Ceritakan sedikit tentang diri Anda..."
                    ></textarea>
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
