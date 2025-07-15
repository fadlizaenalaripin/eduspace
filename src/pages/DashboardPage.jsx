// src/pages/DashboardPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, Settings, TrendingUp, Clock, Star, CalendarDays, CheckCircle, UserCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAllProgress, getCourseCompletionPercentage } from '../utils/progress';
import { coursesData } from '../data/coursesData';

const DashboardPage = () => {
  // Dapatkan token langsung dari useAuth
  const { user, isLoggedIn, isLoadingAuth, token } = useAuth();
  const userName = user?.username || 'Pengguna';

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  // Pastikan userProfileImage menggunakan token untuk akses yang benar jika perlu
  const userProfileImage = user?.profilePicture
    ? `${BACKEND_URL}${user.profilePicture}`
    : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><rect width="150" height="150" fill="%234F46E5" rx="15" ry="15"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="70" fill="%23FFFFFF">U</text></svg>';

  const [dashboardStats, setDashboardStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    overallProgress: 0,
    totalLearningTime: 0,
    enrolledCoursesDetails: [],
  });
  const [actualProgressData, setActualProgressData] = useState([]);

  // Menerima token sebagai argumen
  const calculateDashboardStats = useCallback(async (authToken) => {
    // Hanya jalankan jika authToken tersedia
    if (!authToken) {
      console.warn("[DashboardPage] Token tidak tersedia. Tidak dapat memuat progres.");
      setActualProgressData([]);
      setDashboardStats({
        totalCourses: 0,
        completedCourses: 0,
        inProgressCourses: 0,
        overallProgress: 0,
        totalLearningTime: 0,
        enrolledCoursesDetails: [],
      });
      return;
    }

    try {
      const allUserProgress = await getAllProgress(authToken); // Gunakan authToken yang diterima

      const calculatedChartData = [];
      let coursesCompletedCount = 0;
      let aggregatedLearningMinutes = 0;

      // Filter kursus yang terdaftar: HANYA jika ada progres yang tercatat untuk kursus tersebut.
      const enrolledCourses = coursesData.filter(course => {
          const courseProgress = allUserProgress[course.id];
          return courseProgress && Object.keys(courseProgress).length > 0;
      });

      for (const course of enrolledCourses) {
        const lessons = course.lessons || [];
        const percentage = await getCourseCompletionPercentage(course.id, lessons, authToken); // Gunakan authToken

        // Hanya tambahkan ke grafik jika progres > 0
        if (percentage > 0) {
          calculatedChartData.push({
            name: course.title.length > 15 ? course.title.substring(0, 15) + '...' : course.title,
            progress: Math.round(percentage)
          });
        }

        if (percentage === 100) {
          coursesCompletedCount++;
        }

        // Mengubah forEach menjadi for...of untuk menghindari peringatan no-loop-func
        for (const lesson of lessons) {
          const lessonStatus = allUserProgress[course.id]?.[lesson.id];
          if (lessonStatus && (lessonStatus.status === 'completed' || lessonStatus.quizPassed === true)) {
            const durationParts = lesson.duration.split(':');
            let minutes = 0;
            if (durationParts.length === 2) {
                minutes = parseInt(durationParts[0], 10);
            } else if (durationParts.length === 3) {
                minutes = parseInt(durationParts[0], 10) * 60 + parseInt(durationParts[1], 10);
            }
            if (!isNaN(minutes)) {
                aggregatedLearningMinutes += minutes;
            }
          }
        }
      }

      setActualProgressData(calculatedChartData);

      setDashboardStats({
        totalCourses: calculatedChartData.length,
        completedCourses: coursesCompletedCount,
        inProgressCourses: calculatedChartData.length - coursesCompletedCount,
        overallProgress: calculatedChartData.length > 0 ? (coursesCompletedCount / calculatedChartData.length) * 100 : 0,
        totalLearningTime: aggregatedLearningMinutes,
        enrolledCoursesDetails: [],
      });

    } catch (error) {
      console.error("Gagal menghitung statistik dashboard:", error);
      setActualProgressData([]);
      setDashboardStats({
        totalCourses: 0,
        completedCourses: 0,
        inProgressCourses: 0,
        overallProgress: 0,
        totalLearningTime: 0,
        enrolledCoursesDetails: [],
      });
    }
  }, []); // Dependensi kosong karena authToken akan dilewatkan sebagai argumen

  useEffect(() => {
    // Panggil calculateDashboardStats hanya jika sudah login dan token tersedia
    if (isLoggedIn && !isLoadingAuth && token) {
      console.log("[DashboardPage] User logged in and token available. Calculating dashboard stats.");
      calculateDashboardStats(token);
    } else if (!isLoggedIn && !isLoadingAuth) {
      // Jika tidak login, reset stats
      setActualProgressData([]);
      setDashboardStats({
        totalCourses: 0,
        completedCourses: 0,
        inProgressCourses: 0,
        overallProgress: 0,
        totalLearningTime: 0,
        enrolledCoursesDetails: [],
      });
    }

    const handleStorageChange = (e) => {
      // Memuat ulang jika token atau user berubah di localStorage
      if (e.key === 'token' || e.key === 'user') {
        console.log("[DashboardPage] Perubahan Local Storage terdeteksi. Memuat ulang statistik dashboard.");
        // Panggil ulang dengan token terbaru dari useAuth
        if (isLoggedIn && !isLoadingAuth && token) {
          calculateDashboardStats(token);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isLoggedIn, isLoadingAuth, token, calculateDashboardStats]); // Tambahkan token sebagai dependensi

  if (isLoadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        Memuat data dashboard...
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        <p className="text-xl font-medium mb-4">Anda harus login untuk melihat dashboard.</p>
        <Link to="/login" className="text-blue-500 hover:underline">Login Sekarang</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 sm:p-10 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col gap-12">
        <section className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 flex flex-col items-center text-center animate-fadeInDown">
          <img src={userProfileImage} alt={userName} className="w-28 h-28 rounded-full border-4 border-indigo-600 shadow-md mb-5 object-cover" />
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-wide">
            Selamat Datang, <span className="text-indigo-600 dark:text-indigo-400">{userName}</span> 👋
          </h1>
          <p className="mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Siap belajar hari ini? Lanjutkan progresmu & capai target belajarmu dengan EduSpace!
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeIn">
          {[
            { icon: <BookOpen className="text-indigo-600" />, label: 'Total Kursus', value: `${dashboardStats.totalCourses} Kursus`, bg: 'bg-indigo-100 dark:bg-indigo-900' },
            { icon: <Clock className="text-green-600" />, label: 'Jam Belajar', value: `${Math.floor(dashboardStats.totalLearningTime / 60)} Jam ${dashboardStats.totalLearningTime % 60} Menit`, bg: 'bg-green-100 dark:bg-green-900' },
            { icon: <Star className="text-yellow-500" />, label: 'Sertifikat', value: `${dashboardStats.completedCourses} Sertifikat`, bg: 'bg-yellow-100 dark:bg-yellow-900' },
            { icon: <UserCircle2 className="text-purple-600" />, label: 'Level', value: 'Mahir', bg: 'bg-purple-100 dark:bg-purple-900' }, // Level masih hardcoded
          ].map((item, i) => (
            <div key={i} className={`${item.bg} rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center cursor-default transition-transform duration-300 hover:scale-105`}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{item.label}</p>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fadeInUp">
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white mb-8">
              <TrendingUp className="text-indigo-600" size={30} />
              Progres Belajar Anda
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={actualProgressData} margin={{ top: 15, right: 30, left: 10, bottom: 5 }} barCategoryGap="30%">
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 14, fill: '#4B5563' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 14, fill: '#4B5563' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.08)' }} contentStyle={{ backgroundColor: '#111827', borderRadius: 12, border: 'none', padding: '10px 15px' }} itemStyle={{ color: '#60a5fa' }} labelStyle={{ color: '#9ca3af' }} />
                <Bar dataKey="progress" fill="#4f46e5" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 flex flex-col">
            <h3 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white mb-8">
              <CalendarDays className="text-orange-500" size={30} />
              Agenda Hari Ini
            </h3>
            <ul className="flex-1 space-y-5 overflow-y-auto max-h-[320px] pr-2">
              {/* todayTasks masih hardcoded */}
              {['Selesaikan modul React', 'Ikuti kuis Node.js', 'Review materi Figma', 'Mulai proyek database'].map((task, idx) => (
                <li key={idx} className="flex items-center gap-4 text-gray-700 dark:text-gray-300 text-lg">
                  <CheckCircle className="text-green-500" size={24} />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-colors duration-200" type="button">
              Lihat Semua Tugas
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fadeInUp delay-100">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white mb-6">
              <BookOpen className="text-green-600" size={28} />
              Kursus Terbaru
            </h3>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 dark:text-gray-300 cursor-pointer select-none">
              {/* courses masih hardcoded */}
              {['Pengenalan React', 'Dasar-dasar Node.js', 'Desain UI/UX dengan Figma', 'Manajemen Database SQL'].map((course, idx) => (
                <li key={idx} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                  {course}
                </li>
              ))}
            </ul>
            <button className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md w-full transition-colors duration-200" type="button">
              Jelajahi Semua Kursus
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 flex flex-col">
            <h3 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white mb-6">
              <Settings className="text-gray-600 dark:text-gray-400" size={28} />
              Pengaturan Akun
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-10 text-lg leading-relaxed">
              Kelola informasi profil Anda, ubah kata sandi, dan sesuaikan preferensi pembelajaran untuk pengalaman yang lebih personal.
            </p>
            <button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-md w-full transition-colors duration-200" type="button">
              Kelola Akun Saya
            </button>
          </div>
        </section>

        <style>{`
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInDown { animation: fadeInDown 0.7s ease-out forwards; }
          .animate-fadeIn { animation: fadeInDown 0.6s ease-out forwards; }
          .animate-fadeInUp { animation: fadeInUp 0.7s ease-out forwards; }
          .delay-100 { animation-delay: 0.1s; }
        `}</style>
      </div>
    </div>
  );
};

export default DashboardPage;
