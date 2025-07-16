// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import { CreditCard, Banknote, QrCode, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react'; // <-- FIXED: Use named import for QRCodeSVG

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

function PaymentPage() {
    console.log("PaymentPage component rendered.");

    const { courseId } = useParams();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({
        transferBank: {
            accountHolderName: '',
            referenceNumber: ''
        },
        creditCard: {
            cardNumber: '',
            cardHolderName: '',
            expiryDate: '',
            cvv: ''
        },
        qris: {}
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [backendError, setBackendError] = useState(null);
    const [courseToPay, setCourseToPay] = useState(null);
    const [qrisData, setQrisData] = useState(null);
    const [showQrisModal, setShowQrisModal] = useState(false);

    useEffect(() => {
        const foundCourse = coursesData.find(course => course.id === parseInt(courseId));
        if (foundCourse) {
            setCourseToPay(foundCourse);
            console.log("Course data loaded:", foundCourse);
        } else {
            console.error("Course not found for ID:", courseId);
        }
    }, [courseId]);

    const closeModal = () => {
        setShowModal(false);
        setIsProcessing(false);
        setPaymentStatus(null);
        setBackendError(null);
        setPaymentMethod('');
        setQrisData(null); // Reset QRIS data saat modal utama ditutup
        setShowQrisModal(false); // Pastikan modal QRIS juga tertutup
        // Reset semua detail pembayaran saat modal ditutup
        setPaymentDetails({
            transferBank: { accountHolderName: '', referenceNumber: '' },
            creditCard: { cardNumber: '', cardHolderName: '', expiryDate: '', cvv: '' },
            qris: {}
        });
        console.log("Modal closed.");
    };

    // Fungsi baru untuk menutup modal QRIS
    const closeQrisModal = () => {
        setShowQrisModal(false);
        setIsProcessing(false); // Hentikan loading
        setQrisData(null); // Bersihkan data QRIS
        // Setelah QRIS selesai/ditutup, arahkan ke riwayat transaksi
        navigate(`/transactions`); // Mengarahkan ke halaman transaksi
    };

    if (!courseToPay) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200 dark:from-gray-900 dark:to-gray-800">
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center">
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">Kursus tidak ditemukan!</p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
                    >
                        Kembali ke Kursus
                    </button>
                </div>
            </div>
        );
    }

    // Fungsi untuk memperbarui detail pembayaran spesifik
    const handleDetailChange = (methodType, field, value) => {
        setPaymentDetails(prevDetails => ({
            ...prevDetails,
            [methodType]: {
                ...prevDetails[methodType],
                [field]: value
            }
        }));
    };

    const handlePaymentProcess = async () => {
        console.log("handlePaymentProcess called!");

        if (!paymentMethod) {
            alert('Mohon pilih metode pembayaran terlebih dahulu.');
            console.log("Payment method not selected.");
            return;
        }

        if (!courseToPay) {
            console.error("Course data is not available for payment.");
            setBackendError("Detail kursus belum tersedia. Silakan refresh halaman.");
            setPaymentStatus('failed');
            setShowModal(true);
            return;
        }

        // Tambahkan validasi spesifik berdasarkan metode pembayaran
        if (paymentMethod === 'Transfer Bank') {
            if (!paymentDetails.transferBank.accountHolderName) {
                alert('Mohon lengkapi nama pemilik rekening.');
                return;
            }
        }
        if (paymentMethod === 'Kartu Kredit') {
             if (!paymentDetails.creditCard.cardNumber || !paymentDetails.creditCard.cardHolderName ||
                 !paymentDetails.creditCard.expiryDate || !paymentDetails.creditCard.cvv) {
                 alert('Mohon lengkapi semua detail kartu kredit.');
                 return;
             }
        }

        setIsProcessing(true);
        setPaymentStatus('processing');
        setShowModal(true);
        setBackendError(null);
        setQrisData(null);

        // Siapkan data detail pembayaran yang akan dikirim, disesuaikan dengan metode
        let specificPaymentDetails = {};
        switch (paymentMethod) {
            case 'Transfer Bank':
                specificPaymentDetails = {
                    metode: 'Transfer Bank',
                    nama_pemilik_rekening: paymentDetails.transferBank.accountHolderName,
                    nomor_referensi: paymentDetails.transferBank.referenceNumber || 'Tidak ada'
                };
                break;
            case 'Kartu Kredit':
                specificPaymentDetails = {
                    metode: 'Kartu Kredit',
                    // HANYA UNTUK CONTOH DEMO! JANGAN KIRIM DATA SENSITIF LANGSUNG!
                    detail_kartu: paymentDetails.creditCard
                };
                break;
            case 'E-Wallet/QRIS':
                specificPaymentDetails = {
                    metode: 'E-Wallet/QRIS',
                    catatan: 'Permintaan QRIS'
                };
                break;
            default:
                specificPaymentDetails = { metode: paymentMethod, catatan: 'Detail tidak spesifik.' };
        }


        const transactionData = {
            courseId: courseToPay.id,
            courseTitle: courseToPay.title,
            amount: courseToPay.price,
            paymentMethod: paymentMethod,
            paymentDetails: JSON.stringify(specificPaymentDetails),
        };

        console.log("Sending transaction data:", transactionData);

        try {
            const response = await fetch(`${BACKEND_URL}/api/transactions/pay.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(transactionData),
            });

            console.log("Received response from backend. Status:", response.status);
            const result = await response.json();
            console.log("Backend response JSON:", result); // <-- LOG INI PENTING UNTUK DEBUGGING!

            if (response.ok && result.success) {
                setShowModal(false); // Sembunyikan modal processing utama
                setIsProcessing(false); // Matikan status processing

                if (paymentMethod === 'E-Wallet/QRIS' && result.qris_data && result.qris_data.qr_string) {
                    setQrisData(result.qris_data); // Simpan data QRIS dari backend
                    setShowQrisModal(true); // Tampilkan modal QRIS
                } else {
                    // Untuk metode lain atau jika QRIS tidak ada qr_string
                    setPaymentStatus('success');
                    setShowModal(true); // Tampilkan modal sukses
                    setTimeout(() => {
                        closeModal(); // Akan mengarahkan ke /transactions
                    }, 1500);
                }
            } else {
                setPaymentStatus('failed');
                setBackendError(result.message || 'Pembayaran gagal. Silakan coba lagi.');
                setShowModal(true); // Tampilkan modal gagal
                console.error('Payment failed, backend response:', result.message || 'No specific error message from backend.');
            }
        } catch (error) {
            setPaymentStatus('failed');
            setBackendError('Terjadi kesalahan jaringan atau server tidak merespons.');
            setShowModal(true); // Tampilkan modal gagal
            console.error('Error during payment fetch:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-black p-6 flex justify-center items-center">
            <div className="max-w-6xl w-full rounded-3xl p-8 md:p-12 bg-white/50 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 shadow-2xl">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10 tracking-tight">
                    🔐 Pembayaran Kursus
                </h1>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Detail Kursus (tetap sama) */}
                    <div className="md:w-1/2 p-6 bg-white/60 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700">
                        <img
                            src={courseToPay.image}
                            alt={courseToPay.title}
                            className="w-full h-56 object-cover rounded-xl mb-5 border shadow-md"
                        />
                        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-2">{courseToPay.title}</h2>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3">{courseToPay.category}</p>
                        <p className="text-justify text-gray-700 dark:text-gray-300 text-sm mb-6">
                            {courseToPay.description}
                        </p>
                        <div className="border-t border-dashed pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Harga:</span>
                                <span className="text-xl font-bold text-green-600 dark:text-green-400">{courseToPay.price}</span>
                            </div>
                            <div className="flex justify-between items-center bg-green-100 dark:bg-green-900 p-3 rounded-xl">
                                <span className="text-lg font-semibold text-green-700 dark:text-green-300">Total Bayar</span>
                                <span className="text-2xl font-extrabold text-green-700 dark:text-green-300">{courseToPay.price}</span>
                            </div>
                        </div>
                    </div>

                    {/* Metode Pembayaran */}
                    <div className="md:w-1/2 p-6 bg-white/60 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Pilih Metode</h2>

                        <div className="space-y-4">
                            {[
                                { label: 'Kartu Kredit / Debit', value: 'Kartu Kredit', icon: <CreditCard size={26} /> },
                                { label: 'Transfer Bank (VA)', value: 'Transfer Bank', icon: <Banknote size={26} /> },
                                { label: 'E-Wallet / QRIS', value: 'E-Wallet/QRIS', icon: <QrCode size={26} /> },
                            ].map(({ label, value, icon }) => (
                                <label
                                    key={value}
                                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-transform duration-300
                                        ${paymentMethod === value
                                            ? 'bg-blue-100 dark:bg-blue-800 border-2 border-blue-500 scale-105'
                                            : 'hover:scale-[1.01] border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'}`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={value}
                                        checked={paymentMethod === value}
                                        onChange={(e) => {
                                            setPaymentMethod(e.target.value);
                                            // Reset paymentDetails saat metode berubah untuk menghindari data sisa
                                            setPaymentDetails({
                                                transferBank: { accountHolderName: '', referenceNumber: '' },
                                                creditCard: { cardNumber: '', cardHolderName: '', expiryDate: '', cvv: '' },
                                                qris: {}
                                            });
                                        }}
                                        className="form-radio h-5 w-5 text-blue-600 dark:text-blue-400"
                                    />
                                    <div className="flex items-center gap-3 text-gray-800 dark:text-white">
                                        {icon}
                                        <span className="text-lg font-medium">{label}</span>
                                    </div>
                                </label>
                            ))}
                        </div>

                        {/* ============================================================== */}
                        {/* INPUT DETAIL PEMBAYARAN DINAMIS BERDASARKAN METODE YANG DIPILIH */}
                        {/* ============================================================== */}
                        <div className="mt-4 space-y-3">
                            {paymentMethod === 'Transfer Bank' && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Nama Pemilik Rekening"
                                        value={paymentDetails.transferBank.accountHolderName}
                                        onChange={(e) => handleDetailChange('transferBank', 'accountHolderName', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nomor Referensi Transfer (Opsional)"
                                        value={paymentDetails.transferBank.referenceNumber}
                                        onChange={(e) => handleDetailChange('transferBank', 'referenceNumber', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Setelah menekan "Bayar Sekarang", instruksi transfer akan ditampilkan.
                                    </p>
                                </>
                            )}

                            {paymentMethod === 'Kartu Kredit' && (
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Nomor Kartu Kredit"
                                        value={paymentDetails.creditCard.cardNumber}
                                        onChange={(e) => handleDetailChange('creditCard', 'cardNumber', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        maxLength="16"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nama Pemilik Kartu"
                                        value={paymentDetails.creditCard.cardHolderName}
                                        onChange={(e) => handleDetailChange('creditCard', 'cardHolderName', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    />
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            value={paymentDetails.creditCard.expiryDate}
                                            onChange={(e) => handleDetailChange('creditCard', 'expiryDate', e.target.value)}
                                            className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                            maxLength="5"
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            value={paymentDetails.creditCard.cvv}
                                            onChange={(e) => handleDetailChange('creditCard', 'cvv', e.target.value)}
                                            className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                            maxLength="4"
                                        />
                                    </div>
                                    <p className="text-sm text-red-500 dark:text-red-400 font-semibold">
                                        ⚠️ Peringatan: Untuk produksi, gunakan Payment Gateway yang aman (mis. Midtrans, Xendit, Stripe) untuk detail kartu kredit. Jangan kirim langsung ke backend Anda!
                                    </p>
                                </div>
                            )}

                            {paymentMethod === 'E-Wallet/QRIS' && (
                                <p className="text-center text-gray-600 dark:text-gray-400">
                                    Setelah menekan "Bayar Sekarang", kode QRIS akan ditampilkan untuk Anda pindai.
                                </p>
                            )}
                        </div>

                        <div className="mt-8 space-y-4">
                            <button
                                onClick={handlePaymentProcess}
                                disabled={!paymentMethod || isProcessing}
                                className={`w-full py-4 rounded-full font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                    paymentMethod && !isProcessing
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-green-400 opacity-60 cursor-not-allowed'
                                }`}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center">
                                        <Loader2 className="animate-spin mr-2" size={20} /> Memproses...
                                    </span>
                                ) : (
                                    '🚀 Bayar Sekarang'
                                )}
                            </button>

                            <button
                                onClick={() => navigate(-1)}
                                disabled={isProcessing}
                                className={`w-full py-3 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-semibold transition-all ${
                                    isProcessing ? 'opacity-60 cursor-not-allowed' : ''
                                }`}
                            >
                                ❌ Batalkan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Status Modal (Processing/Success/Failed) */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center max-w-sm w-full animate-fade-in-up">
                        {paymentStatus === 'processing' && (
                            <>
                                <Loader2 className="animate-spin text-blue-500 mx-auto mb-4" size={48} />
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Memproses Pembayaran...</h3>
                                <p className="text-gray-600 dark:text-gray-400">Mohon tunggu sebentar.</p>
                            </>
                        )}
                        {paymentStatus === 'success' && (
                            <>
                                <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Pembayaran Berhasil!</h3>
                                <p className="text-gray-600 dark:text-gray-400">Anda akan diarahkan.</p>
                                <button
                                    onClick={() => navigate(`/transactions`)}
                                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
                                >
                                    Lihat Riwayat Transaksi
                                </button>
                            </>
                        )}
                        {paymentStatus === 'failed' && (
                            <>
                                <XCircle className="text-red-500 mx-auto mb-4" size={48} />
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Pembayaran Gagal!</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {backendError || 'Terjadi kesalahan. Silakan coba lagi.'}
                                </p>
                                <button
                                    onClick={closeModal}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
                                >
                                    Coba Lagi
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* QRIS Display Modal (BARU: MENGGUNAKAN qrcode.react) */}
            {showQrisModal && qrisData && qrisData.qr_string && ( // Hanya tampilkan jika qr_string ada
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center max-w-md w-full animate-fade-in-up">
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Pindai QRIS untuk Pembayaran</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Gunakan aplikasi E-Wallet atau mobile banking Anda untuk memindai kode QR di bawah ini.
                        </p>
                        <div className="flex justify-center mb-6 p-2 bg-white rounded-lg shadow-inner"> {/* Tambah padding dan background untuk QR */}
                            <QRCodeSVG // <-- FIXED: Changed from QRCode to QRCodeSVG
                                value={qrisData.qr_string}
                                size={256}
                                level="H"
                                includeMargin={true}
                            />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            Pastikan jumlah pembayaran {courseToPay.price} sesuai.
                        </p>
                        <button
                            onClick={closeQrisModal}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                        >
                            Saya Sudah Membayar / Selesai
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaymentPage;