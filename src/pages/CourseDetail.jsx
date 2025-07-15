// src/pages/CourseDetail.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { coursesData } from "../data/coursesData";
import { useAuth } from '../context/AuthContext';

import {
  initializeCourseProgress,
  getCourseCompletionPercentage,
  getAllProgress, // Diperlukan untuk mendapatkan semua progres user
} from "../utils/progress";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  // 'fetchUserProfileDetails' dihapus dari destructuring karena tidak digunakan di sini
  const { user, isLoggedIn, isLoadingAuth, token } = useAuth();

  const [course, setCourse] = useState(null);
  const [isUserEnrolled, setIsUserEnrolled] = useState(false);
  const [userProgress, setUserProgress] = useState({}); // Akan menyimpan progres spesifik untuk kursus ini
  const [courseCompletionPercentage, setCourseCompletionPercentage] = useState(0);

  // isFreeCourse sekarang dihitung berdasarkan state course
  const isFreeCourse =
    course?.price &&
    (course.price.toLowerCase() === "gratis" ||
      course.price.toLowerCase() === "free");

  // Fungsi untuk memuat dan memperbarui semua progres user dari backend
  const fetchAndUpdateCourseProgress = useCallback(async () => {
    const courseId = parseInt(id, 10);
    // Gunakan token dari AuthContext
    if (!isLoggedIn || isLoadingAuth || !token) {
        console.warn("[CourseDetail] User not logged in, auth loading, or token missing. Cannot fetch user progress for CourseDetail.");
        setUserProgress({});
        setCourseCompletionPercentage(0);
        setIsUserEnrolled(false); // Reset enrollment status if not logged in
        return;
    }

    try {
        const allUserProgress = await getAllProgress(token); // Ambil semua progres dari backend
        const foundCourse = coursesData.find((c) => c.id === courseId);

        if (foundCourse) {
            const currentCourseSpecificProgress = allUserProgress[foundCourse.id] || {};
            setUserProgress(currentCourseSpecificProgress);

            const courseLessons = Array.isArray(foundCourse.lessons)
                ? foundCourse.lessons
                : [];

            const calculatedPercentage = await getCourseCompletionPercentage(
                foundCourse.id,
                courseLessons,
                token
            );
            setCourseCompletionPercentage(calculatedPercentage);

            // Tentukan status pendaftaran berdasarkan progres yang ada
            // Jika ada progres untuk kursus ini, berarti terdaftar
            setIsUserEnrolled(Object.keys(currentCourseSpecificProgress).length > 0);

        } else {
            // Jika kursus tidak ditemukan
            setCourse(null);
            setIsUserEnrolled(false);
            setUserProgress({});
            setCourseCompletionPercentage(0);
        }
    } catch (error) {
        console.error("[CourseDetail] Gagal memuat progres kursus:", error);
        setUserProgress({});
        setCourseCompletionPercentage(0);
        setIsUserEnrolled(false);
    }
  }, [id, isLoggedIn, isLoadingAuth, token]); // Menghapus course?.price dari dependency karena course adalah state lokal

  // Efek untuk memuat data kursus dan menginisialisasi progres
  useEffect(() => {
    const courseIdNum = parseInt(id, 10);
    const foundCourse = coursesData.find((c) => c.id === courseIdNum);

    if (foundCourse) {
      setCourse(foundCourse); // Set course di sini

      const isCurrentCourseFree =
        foundCourse.price &&
        (foundCourse.price.toLowerCase() === "gratis" ||
          foundCourse.price.toLowerCase() === "free");

      const setupCourseAndProgress = async () => {
        if (!isLoggedIn || isLoadingAuth || !token) {
          // Jika tidak login, atau masih loading auth, atau token tidak ada, reset state
          setIsUserEnrolled(false);
          setUserProgress({});
          setCourseCompletionPercentage(0);
          return;
        }

        if (isCurrentCourseFree) {
          setIsUserEnrolled(true); // Kursus gratis selalu dianggap terdaftar
          // Inisialisasi semua pelajaran sebagai unlocked untuk kursus gratis
          await initializeCourseProgress(foundCourse.id, foundCourse.lessons, token, true);
        } else {
          // Untuk kursus berbayar, cek pendaftaran melalui progres yang ada
          const allUserProgress = await getAllProgress(token);
          const courseSpecificProgress = allUserProgress[foundCourse.id] || {};
          const isCurrentlyEnrolled = Object.keys(courseSpecificProgress).length > 0;
          setIsUserEnrolled(isCurrentlyEnrolled);

          if (isCurrentlyEnrolled) {
            // Untuk kursus berbayar yang terdaftar, inisialisasi pelajaran pertama saja
            await initializeCourseProgress(foundCourse.id, foundCourse.lessons, token, false);
          } else {
            // Jika berbayar dan belum terdaftar, reset progres
            setUserProgress({});
            setCourseCompletionPercentage(0);
            return; // Hentikan eksekusi jika tidak terdaftar di kursus berbayar
          }
        }
        // Selalu fetch dan update progres setelah inisialisasi untuk kedua jenis kursus
        await fetchAndUpdateCourseProgress();
      };

      setupCourseAndProgress();

    } else {
        // Jika kursus tidak ditemukan
        setCourse(null);
        setIsUserEnrolled(false);
        setUserProgress({});
        setCourseCompletionPercentage(0);
    }
  }, [id, isLoggedIn, isLoadingAuth, token, fetchAndUpdateCourseProgress]); // Dependensi diperbarui

  // Efek untuk memuat ulang progres saat ada perubahan di local storage (misal dari LearningPage)
  useEffect(() => {
    const handleStorageChange = async (e) => {
      if (e.key === "userProgress" && course) {
        console.log("[CourseDetail] Perubahan userProgress di local storage terdeteksi. Memuat ulang progres kursus.");
        await fetchAndUpdateCourseProgress();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [course, fetchAndUpdateCourseProgress]);

  // Tampilkan loading jika data kursus atau status otentikasi masih dimuat
  if (isLoadingAuth || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-300 text-lg font-medium transition-colors duration-300">
        Memuat...
      </div>
    );
  }

  const handleEnrollClick = async () => {
    if (!isLoggedIn) {
        console.warn("Anda harus login untuk mendaftar kursus.");
        navigate('/login');
        return;
    }
    if (!token) {
        console.error("Authentication token is missing. Cannot enroll.");
        navigate('/login');
        return;
    }

    console.log(
      `Simulasi: Anda akan diarahkan ke proses pendaftaran/pembayaran untuk kursus "${course.title}".`
    );
    // Simulasi pendaftaran: anggap berhasil dan inisialisasi progres
    setIsUserEnrolled(true);
    // Panggil initializeCourseProgress dengan unlockAllLessons=false (default) untuk kursus berbayar
    if (course.lessons.length > 0) {
      await initializeCourseProgress(course.id, course.lessons, token, false);
    }
    fetchAndUpdateCourseProgress(); // Perbarui progres setelah pendaftaran
  };

  const handleStartLearningClick = async () => {
    if (!isLoggedIn) {
        console.warn("Anda harus login untuk memulai belajar.");
        navigate('/login');
        return;
    }
    if (!token) {
        console.error("Authentication token is missing. Cannot start learning.");
        navigate('/login');
        return;
    }

    const courseLessons = Array.isArray(course.lessons) ? course.lessons : [];
    if (courseLessons.length > 0) {
      // Panggil initializeCourseProgress dengan unlockAllLessons=true jika kursus gratis
      await initializeCourseProgress(course.id, courseLessons, token, isFreeCourse);

      // Setelah inisialisasi, ambil progres terbaru dari backend
      await fetchAndUpdateCourseProgress();

      // Temukan pelajaran pertama yang tidak terkunci untuk dinavigasikan
      // Kita perlu mengambil progres terbaru lagi setelah initializeCourseProgress
      const currentProgressFromBackend = await getAllProgress(token);
      let updatedProgress = currentProgressFromBackend[course.id] || {};

      // Jika kursus gratis, navigasi ke pelajaran pertama (semua sudah terbuka)
      // Jika tidak gratis, navigasi ke pelajaran pertama yang unlocked
      const firstAvailableLesson = isFreeCourse
        ? courseLessons[0] // Jika gratis, langsung ke pelajaran pertama
        : courseLessons.find(
            (lesson) => updatedProgress[lesson.id]?.unlocked === true || updatedProgress[lesson.id]?.status !== "locked"
          ) || courseLessons[0]; // Fallback ke pelajaran pertama jika tidak ada yang 'unlocked'

      navigate(`/learn/${course.id}/lesson/${firstAvailableLesson.id}`);
    } else {
      console.warn("Maaf, belum ada materi pelajaran yang tersedia untuk kursus ini.");
    }
  };

  const getDisplayStatus = (lessonId) => {
    const lessonProgress = userProgress[lessonId];
    const isUnlockedViaProgress = lessonProgress?.unlocked === true;
    const isFirstLessonOfCourse = course.lessons && course.lessons.length > 0 && lessonId === course.lessons[0].id;

    // Untuk kursus gratis, semua harus terbuka
    if (isFreeCourse) {
        // Jika ada progres dan statusnya completed
        if (lessonProgress?.status === "completed") {
            const lessonDetail = course.lessons.find((l) => l.id === lessonId);
            // Jika itu kuis dan belum lulus, tampilkan "Kuis Belum Lulus"
            if (lessonDetail?.type === "quiz" && !lessonProgress.quizPassed) {
                return { text: "Kuis Belum Lulus", icon: "quiz-fail", isLocked: false };
            }
            return { text: "Selesai", icon: "check", isLocked: false };
        }
        // Jika tidak completed, tapi kursus gratis, dan sudah diinisialisasi sebagai unlocked
        // (ini akan mencakup semua pelajaran setelah initializeCourseProgress dipanggil dengan unlockAllLessons=true)
        if (lessonProgress && lessonProgress.unlocked === true) {
             return { text: "Mulai", icon: "play", isLocked: false };
        }
        // Fallback: Jika belum ada progres atau belum diinisialisasi, tapi ini kursus gratis, tetap "Mulai"
        // Ini memastikan bahwa bahkan jika backend belum merespons, UI tetap menunjukkan "Mulai"
        return { text: "Mulai", icon: "play", isLocked: false };
    }

    // Logika untuk kursus berbayar atau yang tidak gratis
    if (!lessonProgress || (!isUnlockedViaProgress && !isFirstLessonOfCourse)) {
        return { text: "Terkunci", icon: "lock", isLocked: true };
    }
    if (lessonProgress.status === "completed") {
      const lessonDetail = course.lessons.find((l) => l.id === lessonId);
      if (lessonDetail?.type === "quiz" && !lessonProgress.quizPassed) {
        return { text: "Kuis Belum Lulus", icon: "quiz-fail", isLocked: false };
      }
      return { text: "Selesai", icon: "check", isLocked: false };
    }
    if (
      lessonProgress.status === "in-progress" ||
      lessonProgress.status === "unlocked" ||
      isUnlockedViaProgress ||
      isFirstLessonOfCourse
    ) {
      return { text: "Mulai", icon: "play", isLocked: false };
    }
    return { text: "Mulai", icon: "play", isLocked: false };
  };

  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          {/* Header: Judul & Gambar */}
          <div className="flex flex-col md:flex-row md:gap-8 items-center md:items-start">
            <img
              src={course.image}
              alt={course.title}
              className="w-full md:w-96 h-56 md:h-64 object-cover rounded-lg shadow-md mb-6 md:mb-0"
              loading="lazy"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
                {course.title}
              </h1>
              {user && (
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Anda login sebagai: {user.username}
                </p>
              )}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {course.description}
              </p>
              <p className="text-green-700 dark:text-green-400 font-semibold text-2xl mb-6">
                Price: {course.price}
              </p>
              {isUserEnrolled && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Progres Kursus Anda:
                  </h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${Number(
                          courseCompletionPercentage || 0
                        ).toFixed(0)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    {Number(courseCompletionPercentage || 0).toFixed(0)}%
                    Selesai
                  </p>
                </div>
              )}

              {isFreeCourse ? (
                <button
                  onClick={handleStartLearningClick}
                  className="inline-block bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold py-3 px-7 rounded-lg shadow-md transition duration-300"
                >
                  Mulai Belajar Gratis
                </button>
              ) : isUserEnrolled ? (
                <button
                  onClick={handleStartLearningClick}
                  className="inline-block bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold py-3 px-7 rounded-lg shadow-md transition duration-300"
                >
                  Lanjutkan Belajar
                </button>
              ) : (
                <button
                  onClick={handleEnrollClick}
                  className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-7 rounded-lg shadow-md transition duration-300"
                >
                  Daftar Kursus Sekarang
                </button>
              )}
            </div>
          </div>

          {/* Syllabus */}
          <section className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-5 border-b border-gray-300 dark:border-gray-600 pb-2">
              Course Syllabus
            </h2>
            <ul className="space-y-6">
              {course.syllabus && course.syllabus.length > 0 ? (
                course.syllabus.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.content}
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  Silabus belum tersedia.
                </p>
              )}
            </ul>
          </section>

          {/* Lesson List */}
          {isUserEnrolled && course.lessons && course.lessons.length > 0 && (
            <section className="mt-12">
              <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-400 mb-6 border-b border-blue-300 dark:border-blue-600 pb-2">
                Materi Pembelajaran
              </h2>
              <ul className="space-y-4">
                {course.lessons.map((lesson) => {
                  const displayStatus = getDisplayStatus(lesson.id);

                  return (
                    <li
                      key={lesson.id}
                      className={`p-4 rounded-lg shadow hover:shadow-lg border transition duration-300 ${
                        displayStatus.isLocked
                          ? "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-600"
                          : "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700"
                      }`}
                    >
                      {displayStatus.isLocked ? (
                        <div className="flex justify-between items-center text-gray-900 dark:text-gray-100 font-medium">
                          <div>
                            <p className="text-lg">{lesson.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {lesson.duration}
                            </p>
                          </div>
                          <span className="text-red-500 dark:text-red-400 text-sm font-semibold flex items-center">
                            {displayStatus.text}
                          </span>
                        </div>
                      ) : (
                        <Link
                          to={`/learn/${course.id}/lesson/${lesson.id}`}
                          className="flex justify-between items-center text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300"
                        >
                          <div>
                            <p className="text-lg">{lesson.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {lesson.duration}
                            </p>
                          </div>
                          <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase">
                            {displayStatus.text}
                          </span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Mentor */}
          <section className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-5 border-b border-gray-300 dark:border-gray-600 pb-2">
              Mentor
            </h2>
            <div className="flex items-center gap-6 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-inner border border-gray-300 dark:border-gray-600">
              <img
                src={course.mentorImage}
                alt={course.mentor}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600"
                loading="lazy"
              />
              <div>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {course.mentor}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {course.mentorBio}
                </p>
              </div>
            </div>
          </section>

          {/* Tombol Kembali */}
          <div className="mt-12 text-center">
            <Link
              to="/courses"
              className="inline-block bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
              &larr; Kembali ke Kursus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
