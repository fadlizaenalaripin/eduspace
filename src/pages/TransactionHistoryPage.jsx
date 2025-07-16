// src/pages/TransactionHistoryPage.jsx
import React, { useEffect, useState } from 'react';
// import { useAuth } from '../contexts/AuthContext'; // Uncomment if you use AuthContext for token/userID

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'; // Sesuaikan jika perlu

function TransactionHistoryPage() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const { user, token } = useAuth(); // Contoh jika butuh user ID atau token

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Anda mungkin perlu menambahkan user ID atau token ke header/body permintaan
                // tergantung bagaimana history.php Anda memfilter transaksi per user
                const response = await fetch(`${BACKEND_URL}/api/transactions/history.php`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}` // Jika API Anda memerlukan token
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Gagal mengambil riwayat transaksi');
                }

                const data = await response.json();
                // Asumsi backend mengembalikan array transaksi langsung
                // Jika backend mengembalikan { success: true, data: [...] } maka perlu data.data
                if (data && Array.isArray(data)) {
                     setTransactions(data);
                } else if (data && data.success && Array.isArray(data.data)) {
                     setTransactions(data.data); // Sesuaikan jika format response berbeda
                } else {
                    // Tangani kasus tidak ada transaksi atau format respons tidak terduga
                    setTransactions([]);
                    setError("Tidak ada riwayat transaksi ditemukan atau format data tidak valid.");
                }

            } catch (err) {
                console.error("Error fetching transactions:", err);
                setError(err.message || "Terjadi kesalahan saat memuat riwayat transaksi.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []); // Dependency kosong agar hanya dijalankan sekali saat mount

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center dark:text-white">Memuat riwayat transaksi...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Riwayat Transaksi Saya</h1>
            {transactions.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-400">Anda belum memiliki riwayat transaksi.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 dark:bg-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">ID Transaksi</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Kursus</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Jumlah</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Metode Pembayaran</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{tx.id}</td>
                                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{tx.course_title}</td>
                                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{tx.amount}</td>
                                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{tx.payment_method}</td>
                                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{new Date(tx.transaction_date).toLocaleDateString()}</td>
                                    <td className="py-3 px-4 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            tx.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                            tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                        }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TransactionHistoryPage;