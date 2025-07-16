// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import LearningPage from "./pages/LearningPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import PaymentPage from "./pages/PaymentPage"; // <-- Import PaymentPage yang baru
import TransactionHistoryPage from "./pages/TransactionHistoryPage"; // <-- PENTING: Import TransactionHistoryPage

// Component wrapper untuk menyembunyikan navbar/footer di halaman tertentu
function AppLayout({ currentTheme, handleThemeChange }) {
    const location = useLocation();
    // Pastikan '/payment' tidak termasuk dalam hideLayout jika Anda ingin Navbar dan Footer muncul di halaman pembayaran
    const hideLayout = ["/login", "/register", "/forgot-password"].includes(location.pathname);

    // Padding top untuk main content agar tidak tertutup navbar yang fixed
    // Sesuaikan nilai px dengan tinggi aktual navbar Anda (misal: h-16 = 64px)
    const paddingTopClass = !hideLayout ? "pt-16 md:pt-20" : ""; // Sesuaikan jika navbar Anda memiliki tinggi berbeda
                                                                // Jika navbar tinggi di mobile (h-16) dan desktop (md:h-20)
                                                                // atau periksa tinggi navbar Anda di components/Navbar.jsx

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
            {!hideLayout && <Navbar />}
            {/* Jika Anda menggunakan padding di main, div h-16 ini mungkin tidak diperlukan lagi */}
            {/* {!hideLayout && <div className="h-16"></div>} */} {/* Ini bisa dihapus jika padding top sudah cukup */}

            {/* Tambahkan padding-top ke main untuk mengatasi fixed navbar */}
            <main className={`flex-grow ${paddingTopClass}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/course/:id" element={<CourseDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Rute Pembayaran */}
                    <Route path="/payment/:courseId" element={<PaymentPage />} />

                    {/* PENTING: Tambahkan rute untuk halaman riwayat transaksi di sini */}
                    {/* Jika halaman riwayat transaksi membutuhkan user login, bungkus dengan PrivateRoute */}
                    <Route
                        path="/transactions"
                        element={
                            <PrivateRoute> {/* Anda mungkin ingin ini dilindungi */}
                                <TransactionHistoryPage />
                            </PrivateRoute>
                        }
                    />

                    {/* Rute yang Dilindungi */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute>
                                <SettingsPage currentTheme={currentTheme} onThemeChange={handleThemeChange} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/learn/:courseId/lesson/:lessonId"
                        element={
                            <PrivateRoute>
                                <LearningPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </main>
            {!hideLayout && <Footer />}
        </div>
    );
}

function App() {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (currentTheme === "dark") {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
        localStorage.setItem("theme", currentTheme);
    }, [currentTheme]);

    const handleThemeChange = (newTheme) => {
        setCurrentTheme(newTheme);
    };

    return (
        <AppLayout currentTheme={currentTheme} handleThemeChange={handleThemeChange} />
    );
}

export default App;