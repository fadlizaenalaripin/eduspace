// src/pages/LearningPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { coursesData } from "../data/coursesData";
import Quiz from "../components/Quiz";
// Import fungsi API progres dari services/api.js
// Mengubah import dari getAllUserProgress menjadi getAllProgress
import { updateProgress } from "../services/api"; // ✅ hanya ambil updateProgress dari API
import {  unlockNextLesson,getAllProgress } from "../utils/progress"; // ✅ ambil getAllProgress dari util wrapper


// Pastikan useAuth dari AuthContext diimpor di sini:
import { useAuth } from '../context/AuthContext';

function LearningPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  // Dapatkan user, isLoggedIn, dan token dari useAuth
  // 'user' dihapus dari destructuring karena tidak digunakan di sini
  const { isLoggedIn, isLoadingAuth, token } = useAuth(); // Menggunakan token dari AuthContext
  console.log("[DEBUG] Token dari useAuth:", token);


  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonProgress, setLessonProgress] = useState(null); // Progres untuk pelajaran saat ini
  const [allUserProgress, setAllUserProgress] = useState({}); // Semua progres pengguna

  // Tentukan URL backend dari variabel lingkungan
  // const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Dihapus karena tidak digunakan

  // Efek untuk memuat data kursus dan pelajaran
  useEffect(() => {
    const courseIdNum = parseInt(courseId, 10);
    const foundCourse = coursesData.find((c) => c.id === courseIdNum);
    setCourse(foundCourse);

    if (foundCourse && foundCourse.lessons) {
      const lessonIdNum = parseInt(lessonId, 10);
      const foundLesson = foundCourse.lessons.find((l) => l.id === lessonIdNum);
      setCurrentLesson(foundLesson);
    } else {
      setCurrentLesson(null);
    }
  }, [courseId, lessonId]);

  // Fungsi untuk memuat dan memperbarui semua progres user dari backend
  const fetchAndUpdateAllUserProgress = useCallback(async () => {
    // Pastikan user sudah login dan token tersedia, serta course dan currentLesson sudah dimuat
    if (!isLoggedIn || isLoadingAuth || !token || !currentLesson || !course) {
        console.log("[fetchAndUpdateAllUserProgress] Melewatkan: user tidak login/loading, token, currentLesson, atau course tidak ada.");
        return;
    }

    console.log("[fetchAndUpdateAllUserProgress] Mengambil progres dari backend...");
    try {
      // Panggil getAllProgress dari services/api.js
      const data = await getAllProgress(token);
      setAllUserProgress(data); // Simpan semua progres user

      // Dapatkan progres spesifik untuk pelajaran saat ini
      const progressForCurrentCourse = data?.[courseId] || {};
      const currentLessonFullProgress = progressForCurrentCourse?.[lessonId] || {};

      const newLessonProgress = {
          status: currentLessonFullProgress.status || "locked",
          quizPassed: currentLessonFullProgress.quizPassed || false,
          unlocked: currentLessonFullProgress.unlocked || false
      };
      setLessonProgress(newLessonProgress); // Update state lokal dengan progres terbaru
      console.log(`[fetchAndUpdateAllUserProgress] Progres pelajaran saat ini (${lessonId}):`, newLessonProgress);

      // Tentukan apakah kursus ini gratis
      const isFreeCourse = course.price && (course.price.toLowerCase() === "gratis" || course.price.toLowerCase() === "free");

      // Logika untuk menandai pelajaran teks sebagai 'in-progress' saat diakses
      const isCurrentlyUnlocked = isFreeCourse || newLessonProgress.unlocked || String(lessonId) === String(course.lessons[0].id);

      if (
        currentLesson.type === "text" &&
        isCurrentlyUnlocked &&
        newLessonProgress.status !== "completed" // Hanya jika belum selesai
      ) {
        // Jika statusnya masih 'locked' atau 'unlocked' (bukan 'in-progress' atau 'completed')
        if (newLessonProgress.status === "locked" || newLessonProgress.status === "unlocked" || !newLessonProgress.status) {
            console.log(`Pelajaran teks ${lessonId} diakses dan terbuka, menandai 'in-progress'.`);
            // Panggil updateProgress dari services/api.js
            await updateProgress(
                courseId,
                lessonId,
                { status: "in-progress", unlocked: true, isFreeCourse: isFreeCourse },
                token
            );
            await fetchAndUpdateAllUserProgress(); // Panggil lagi setelah update
            console.log(`[fetchAndUpdateAllUserProgress] Progres pelajaran ${lessonId} diupdate ke 'in-progress' dan memuat ulang data.`);
        }
      }
    } catch (err) {
      console.error("[fetchAndUpdateAllUserProgress] Gagal ambil atau update progress:", err);
      // Jika error 401, mungkin token tidak valid, arahkan ke login
      if (err.message && err.message.includes('401 Unauthorized')) {
        navigate('/login');
      }
    }
  }, [courseId, lessonId, currentLesson, token, navigate, course, isLoggedIn, isLoadingAuth]);

  // Efek untuk memuat progres saat komponen dimuat atau dependensi berubah
  useEffect(() => {
    fetchAndUpdateAllUserProgress();
  }, [fetchAndUpdateAllUserProgress]);

  // Tampilkan loading atau pesan jika data belum dimuat
  if (isLoadingAuth || !course || !currentLesson || lessonProgress === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        Memuat materi pembelajaran...
      </div>
    );
  }

  // Jika user tidak login dan mencoba mengakses halaman yang dilindungi
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        <p className="text-xl font-medium mb-4">Anda harus login untuk mengakses materi ini.</p>
        <Link to="/login" className="text-blue-500 hover:underline">Login Sekarang</Link>
      </div>
    );
  }

  const currentLessonIndex = course.lessons.findIndex(
    (l) => l.id === parseInt(lessonId, 10)
  );
  const prevLesson =
    currentLessonIndex > 0 ? course.lessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < course.lessons.length - 1
      ? course.lessons[currentLessonIndex + 1]
      : null;

  const handleQuizComplete = async (score, totalQuestions, passed) => {
    if (!token) return;

    const isFreeCourse = course?.price && (course.price.toLowerCase() === "gratis" || course.price.toLowerCase() === "free");

    if (passed) {
      console.log(`[handleQuizComplete] Kuis ${lessonId} LULUS. Mengupdate progres...`);
      // Panggil updateProgress dari services/api.js
      await updateProgress(
        courseId,
        lessonId,
        { status: "completed", quizPassed: true, unlocked: true, isFreeCourse: isFreeCourse },
        token
      );
      setLessonProgress({ status: "completed", quizPassed: true, unlocked: true });

      if (nextLesson) {
        console.log(`[handleQuizComplete] Membuka pelajaran berikutnya (${nextLesson.id})...`);
        // Panggil unlockNextLesson dari utils/progress.js
        await unlockNextLesson(courseId, course.lessons, currentLesson.id, token, isFreeCourse);
        setTimeout(() => {
          navigate(`/learn/${courseId}/lesson/${nextLesson.id}`);
        }, 300);
      } else {
        console.log("[handleQuizComplete] Tidak ada pelajaran berikutnya. Memuat ulang semua progres.");
        await fetchAndUpdateAllUserProgress();
      }
    } else {
        console.log(`[handleQuizComplete] Kuis ${lessonId} TIDAK LULUS. Memperbarui progres...`);
        // Panggil updateProgress dari services/api.js
        await updateProgress(
            courseId,
            lessonId,
            { status: lessonProgress.status || "unlocked", quizPassed: false, unlocked: true, isFreeCourse: isFreeCourse },
            token
        );
        setLessonProgress(prev => ({ ...prev, quizPassed: false }));
    }
    console.log("[handleQuizComplete] Memuat ulang semua progres setelah kuis selesai.");
    await fetchAndUpdateAllUserProgress();
  };

  const handleMarkAsComplete = async () => {
    console.log("[handleMarkAsComplete] Tombol 'Tandai Selesai' diklik.");
    // Periksa isLoggedIn dari AuthContext terlebih dahulu
    if (!isLoggedIn || !token) {
        console.warn("[handleMarkAsComplete] User tidak login atau token tidak ada. Tidak dapat menandai selesai.");
        navigate('/login'); // Redirect ke halaman login jika tidak login
        return;
    }

    const isFreeCourse = course?.price && (course.price.toLowerCase() === "gratis" || course.price.toLowerCase() === "free");

    console.log(`[handleMarkAsComplete] Menandai pelajaran ${lessonId} sebagai selesai...`);
    try {
        // Panggil updateProgress dari services/api.js
        await updateProgress(courseId, lessonId, { status: "completed", unlocked: true, isFreeCourse: isFreeCourse }, token);
        setLessonProgress({ status: "completed", quizPassed: lessonProgress?.quizPassed || false, unlocked: true });
        console.log(`[handleMarkAsComplete] Progres pelajaran ${lessonId} berhasil diupdate ke 'completed'.`);

        if (nextLesson) {
          console.log(`[handleMarkAsComplete] Membuka pelajaran berikutnya (${nextLesson.id})...`);
          // Panggil unlockNextLesson dari utils/progress.js
          await unlockNextLesson(courseId, course.lessons, currentLesson.id, token, isFreeCourse);
        }
        console.log("[handleMarkAsComplete] Memuat ulang semua progres setelah menandai selesai.");
        await fetchAndUpdateAllUserProgress();
    } catch (error) {
        console.error("[handleMarkAsComplete] Gagal memperbarui progres pelajaran:", error);
    }
  };

  const isNextButtonActive =
    lessonProgress?.status === "completed" &&
    (currentLesson.type !== "quiz" || lessonProgress?.quizPassed === true);

  const completedLessons = course.lessons.filter(
    (l) => allUserProgress?.[courseId]?.[l.id]?.status === "completed"
  ).length;

  const progressPercent = Math.floor(
    (completedLessons / course.lessons.length) * 100
  );

  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 h-full overflow-y-auto">
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
            Daftar Materi
          </h2>
          <ul className="space-y-2">
            {course.lessons.map((lesson) => {
              const isActive = lesson.id === parseInt(lessonId, 10);
              const lessonFullProgress = allUserProgress?.[courseId]?.[lesson.id] || {};
              const status = lessonFullProgress.status;

              // Tentukan apakah kursus ini gratis
              const isFreeCourse =
                course.price &&
                (course.price.toLowerCase() === "gratis" ||
                 course.price.toLowerCase() === "free");

              // Logika isUnlocked baru: Jika kursus gratis, semua pelajaran terbuka.
              // Jika tidak gratis, gunakan logika progres normal.
              const isUnlocked = isFreeCourse || lessonFullProgress.unlocked || lesson.id === course.lessons[0].id;

              return (
                <li key={lesson.id}>
                  <Link
                    to={isUnlocked ? `/learn/${courseId}/lesson/${lesson.id}` : '#'}
                    onClick={(e) => !isUnlocked && e.preventDefault()}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : isUnlocked
                        ? "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed pointer-events-none"
                    }`}
                  >
                    {lesson.title}
                    {status === "completed" && (
                      <span className="ml-2 text-green-500">✓</span>
                    )}
                    {!isUnlocked && (
                        <span className="ml-2 text-red-500">🔒</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            {course.title}: {currentLesson.title}
          </h1>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Progress Belajar: {progressPercent}%
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 rounded-full">
              <div
                className="h-3 bg-blue-600 dark:bg-blue-400 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Info Pelajaran */}
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {currentLesson.duration && `Durasi: ${currentLesson.duration} | `}
            Tipe:{" "}
            {currentLesson.type === "text"
              ? "Bacaan"
              : currentLesson.type === "quiz"
              ? "Kuis"
              : currentLesson.type}
          </p>

          {/* Konten */}
          <div className="mb-8">
            {currentLesson.type === "text" ? (
              <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentLesson.content.replace(/\n/g, "<br />"),
                  }}
                />
              </div>
            ) : currentLesson.type === "quiz" ? (
              <Quiz
                questions={currentLesson.quizQuestions}
                courseId={parseInt(courseId, 10)}
                lessonId={currentLesson.id}
                nextLessonId={nextLesson ? nextLesson.id : null}
                onQuizComplete={handleQuizComplete}
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                Konten belum didukung.
              </p>
            )}
          </div>

          {/* Tombol Tandai Selesai */}
          {currentLesson.type === "text" &&
            lessonProgress?.status !== "completed" && isLoggedIn && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleMarkAsComplete}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
                >
                  Tandai Selesai
                </button>
              </div>
            )}
          {currentLesson.type === "text" &&
            lessonProgress?.status === "completed" && (
              <div className="mt-8 text-center text-green-600 dark:text-green-400 font-semibold text-lg">
                Pelajaran ini telah Anda selesaikan!
              </div>
            )}

          {/* Navigasi */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            {prevLesson ? (
              <Link
                to={`/learn/${courseId}/lesson/${prevLesson.id}`}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                ← Sebelumnya: {prevLesson.title}
              </Link>
            ) : (
              <span></span>
            )}

            {nextLesson ? (
              <Link
                to={`/learn/${courseId}/lesson/${nextLesson.id}`}
                className={`py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                  isNextButtonActive
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none"
                }`}
              >
                Selanjutnya: {nextLesson.title} →
              </Link>
            ) : (
              <span className="text-gray-400 dark:text-gray-600">
                Selesai Kursus
              </span>
            )}
          </div>

          {/* Kembali ke Kursus */}
          <div className="mt-8 text-center">
            <Link
              to={`/course/${courseId}`}
              className="inline-block bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
            >
              Kembali ke Detail Kursus
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LearningPage;
