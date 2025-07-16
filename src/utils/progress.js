// src/utils/progress.js

import {
  getAllProgress as apiGetAllProgress, // Import getAllProgress dari api.js
  updateProgress as apiUpdateProgress, // Import updateProgress dari api.js
  createProgress as apiCreateProgress, // <--- TAMBAHAN INI! Import createProgress dari api.js
} from '../services/api';

const USER_PROGRESS_STORAGE_KEY = 'userProgress';

// Local Storage Helpers (Ini sudah baik, tidak perlu diubah)
export const getAllProgressLocal = () => {
  try {
    const progress = localStorage.getItem(USER_PROGRESS_STORAGE_KEY);
    return progress ? JSON.parse(progress) : {};
  } catch (e) {
    console.error("Local storage: Gagal membaca progres dari lokal.", e);
    return {};
  }
};

export const setAllProgressLocal = (progressData) => {
  try {
    localStorage.setItem(USER_PROGRESS_STORAGE_KEY, JSON.stringify(progressData));
    console.log("Local storage: Progres disimpan ke lokal.");
  } catch (e) {
    console.error("Local storage: Gagal menyimpan progres ke lokal.", e);
  }
};

export const clearAllProgressLocal = () => {
  try {
    localStorage.removeItem(USER_PROGRESS_STORAGE_KEY);
    console.log("Local storage: Progres dihapus dari lokal.");
  } catch (e) {
    console.error("Local storage: Gagal menghapus progres dari lokal.", e);
  }
};

// Fungsi createProgress di utils/progress.js ini akan memanggil apiCreateProgress
const createProgress = async (courseId, lessonId, statusData, token) => {
  const progressData = {
    course_id: courseId,
    lesson_id: lessonId,
    ...statusData,
  };
  // Panggil apiCreateProgress yang sudah diimpor
  return await apiCreateProgress(progressData, token);
};

export const getAllProgress = async (token) => {
  try {
    console.log("[progress.js] Memanggil getAllProgress dari api.js...");
    const data = await apiGetAllProgress(token); // ✅ Sudah benar
    return data;
  } catch (error) {
    console.error("getAllProgress: Error saat mengambil semua progres:", error);
    throw error;
  }
};

// Fungsi updateProgress di utils/progress.js ini akan memanggil apiUpdateProgress
export const updateProgress = async (courseId, lessonId, newStatusData, token) => {
  try {
    const progressData = {
      course_id: courseId,
      lesson_id: lessonId,
      status: newStatusData.status,
      quizPassed: newStatusData.quizPassed || false,
      unlocked: newStatusData.unlocked || false,
    };
    // Panggil apiUpdateProgress yang sudah diimpor
    const response = await apiUpdateProgress(courseId, lessonId, progressData, token); // ✅ Pastikan parameter cocok dengan definisi api.js
    console.log("updateProgress: Progres berhasil diperbarui di backend:", response);
    return response;
  } catch (error) {
    console.error("updateProgress: Error saat memperbarui progres:", error);
    throw error;
  }
};

export const initializeCourseProgress = async (courseId, allLessonsInCourse, token, unlockAllLessons = false) => {
  if (!token) {
    console.warn("initializeCourseProgress: Token autentikasi tidak ditemukan.");
    return false;
  }

  if (!Array.isArray(allLessonsInCourse) || allLessonsInCourse.length === 0) {
    console.warn("initializeCourseProgress: Data pelajaran kosong.");
    return false;
  }

  try {
    const existingProgress = await getAllProgress(token);
    const courseProgress = existingProgress?.[courseId] || {};
    const updatesToPerform = [];

    allLessonsInCourse.forEach(lesson => {
      const isFirstLesson = lesson.id === allLessonsInCourse[0].id;
      const currentLessonProgress = courseProgress[lesson.id];

      let desiredStatus = unlockAllLessons || isFirstLesson ? "unlocked" : "locked";
      let desiredUnlocked = unlockAllLessons || isFirstLesson;

      if (
        !currentLessonProgress ||
        currentLessonProgress.status !== desiredStatus ||
        currentLessonProgress.unlocked !== desiredUnlocked ||
        (unlockAllLessons && currentLessonProgress.status === "locked")
      ) {
        if (currentLessonProgress && (currentLessonProgress.status === "completed" || currentLessonProgress.status === "in-progress")) {
          if (unlockAllLessons && currentLessonProgress.unlocked !== true) {
            updatesToPerform.push(updateProgress( // Memanggil updateProgress dari utils/progress.js ini
              courseId,
              lesson.id,
              { ...currentLessonProgress, unlocked: true },
              token
            ));
          }
        } else {
          updatesToPerform.push(createProgress( // Memanggil createProgress dari utils/progress.js ini
            courseId,
            lesson.id,
            { status: desiredStatus, unlocked: desiredUnlocked, quizPassed: false },
            token
          ));
        }
      }
    });

    if (updatesToPerform.length > 0) {
      await Promise.all(updatesToPerform);
      console.log(`initializeCourseProgress: Progres kursus ${courseId} berhasil diinisialisasi.`);
      return true;
    }

    console.log(`initializeCourseProgress: Progres kursus ${courseId} sudah diinisialisasi sebelumnya.`);
    return false;
  } catch (error) {
    console.error('initializeCourseProgress: Error:', error.message);
    throw error;
  }
};

export const unlockNextLesson = async (courseId, allLessonsInCourse, currentLessonId, token) => {
  if (!token) {
    console.warn("unlockNextLesson: Token tidak ditemukan.");
    return false;
  }

  if (!Array.isArray(allLessonsInCourse) || allLessonsInCourse.length === 0) {
    console.warn("unlockNextLesson: Data pelajaran kosong.");
    return false;
  }

  const currentIndex = allLessonsInCourse.findIndex(lesson => lesson.id === parseInt(currentLessonId, 10));
  const nextLesson = allLessonsInCourse[currentIndex + 1];

  if (nextLesson) {
    try {
      await createProgress( // Memanggil createProgress dari utils/progress.js ini
        courseId,
        nextLesson.id,
        { status: "unlocked", unlocked: true, quizPassed: false },
        token
      );
      console.log(`unlockNextLesson: Pelajaran berikutnya (${nextLesson.title}) berhasil dibuka.`);
      return true;
    } catch (error) {
      console.error('unlockNextLesson: Error:', error.message);
      throw error;
    }
  }

  console.log("unlockNextLesson: Tidak ada pelajaran berikutnya.");
  return false;
};

export const getLessonProgress = async (courseId, lessonId, token) => {
  if (!token) {
    console.warn("getLessonProgress: Token tidak ditemukan.");
    return { status: 'locked', quizPassed: false, unlocked: false };
  }
  try {
    const allProgress = await getAllProgress(token); // Memanggil getAllProgress dari utils/progress.js ini
    const courseProgress = allProgress?.[courseId] || {};
    return courseProgress[lessonId] || { status: 'locked', quizPassed: false, unlocked: false };
  } catch (error) {
    console.error('getLessonProgress: Error:', error.message);
    throw error;
  }
};

export const getCourseCompletionPercentage = async (courseId, allLessonsInCourse, token) => {
  if (!token) {
    console.warn("getCourseCompletionPercentage: Token tidak ditemukan.");
    return 0;
  }

  if (!Array.isArray(allLessonsInCourse) || allLessonsInCourse.length === 0) {
    console.warn("getCourseCompletionPercentage: Data pelajaran kosong.");
    return 0;
  }

  try {
    const allProgress = await getAllProgress(token); // Memanggil getAllProgress dari utils/progress.js ini
    const courseProgress = allProgress?.[courseId] || {};

    const completedLessons = allLessonsInCourse.filter(lesson => {
      const lessonStatus = courseProgress[lesson.id];
      if (lesson.type === 'quiz') {
        return lessonStatus?.status === 'completed' && lessonStatus?.quizPassed === true;
      }
      return lessonStatus?.status === 'completed';
    }).length;

    return Math.floor((completedLessons / allLessonsInCourse.length) * 100);
  } catch (error) {
    console.error('getCourseCompletionPercentage: Error:', error.message);
    return 0;
  }
};

export const markQuizPassed = async (courseId, lessonId, token) => {
  console.log("markQuizPassed: Menandai kuis sebagai lulus...");
  return await updateProgress(courseId, lessonId, { status: "completed", quizPassed: true, unlocked: true }, token); // Memanggil updateProgress dari utils/progress.js ini
};