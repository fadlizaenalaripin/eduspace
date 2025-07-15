import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck, AlertTriangle } from 'lucide-react';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!email) {
            setError('Mohon masukkan email Anda.');
            return;
        }

        try {
            // Simulasi permintaan
            console.log(`Mengirim permintaan reset password untuk email: ${email}`);
            setMessage('Jika email Anda terdaftar, instruksi reset password telah dikirim.');
            setEmail('');

            // Contoh kalau ada error dari server:
            // setError('Email tidak terdaftar atau terjadi kesalahan.');
        } catch (err) {
            console.error('Error saat mengirim permintaan reset password:', err);
            setError('Terjadi kesalahan jaringan atau server.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transition-all duration-500">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Lupa Password?</h2>
                <p className="text-center text-gray-600 text-sm mb-6">
                    Masukkan email Anda dan kami akan mengirimkan link untuk mereset password.
                </p>

                {/* Success Message */}
                {message && (
                    <div className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
                        <MailCheck className="w-5 h-5" />
                        <p className="text-sm">{message}</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                        <AlertTriangle className="w-5 h-5" />
                        <p className="text-sm">{error}</p>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Anda"
                            className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 ease-in-out"
                    >
                        Kirim Link Reset
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                        Kembali ke Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
