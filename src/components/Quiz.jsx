// src/components/Quiz.jsx
import React, { useState } from 'react';
import { updateProgress, markQuizPassed } from '../utils/progress';// Untuk tombol lanjut

function Quiz({ questions, courseId, lessonId, nextLessonId, onQuizComplete }) { // Tambahkan lessonId, nextLessonId
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [passedQuiz, setPassedQuiz] = useState(false); // Status kelulusan kuis

  if (!questions || questions.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">Tidak ada pertanyaan kuis yang tersedia.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Cek jawaban untuk pertanyaan saat ini
    if (selectedOption === currentQuestion.answer) {
      setScore(prevScore => prevScore + 1); // Gunakan functional update untuk score
    }

    // Pindah ke pertanyaan berikutnya atau tampilkan hasil
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset pilihan
    } else {
      // Ini adalah pertanyaan terakhir, hitung skor akhir
      const finalScore = score + (selectedOption === currentQuestion.answer ? 1 : 0);
      setScore(finalScore);
      setShowResults(true);

      // Tentukan apakah kuis lulus (misal: semua benar)
      const passed = finalScore === questions.length;
      setPassedQuiz(passed);

      // Perbarui status progres
      markQuizPassed(courseId, lessonId); // Tandai kuis ini completed

      if (passed && nextLessonId) {
        updateProgress(courseId, nextLessonId, "unlocked"); // Buka pelajaran selanjutnya
        alert('Selamat! Anda lulus kuis ini dan bisa melanjutkan ke pelajaran berikutnya.');
      } else if (!passed) {
        alert('Jawaban Anda belum tepat. Silakan coba lagi!');
      }

      // Panggil onQuizComplete jika disediakan (untuk notifikasi di LearningPage)
      if (onQuizComplete) {
        onQuizComplete(finalScore, questions.length, passed);
      }
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setPassedQuiz(false);
  };

  if (showResults) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Hasil Kuis</h2>
        <p className="text-xl text-gray-800 dark:text-gray-200 mb-6">
          Anda mendapatkan {score} dari {questions.length} jawaban benar.
        </p>
        {passedQuiz ? (
          <>
            <p className="text-green-600 dark:text-green-400 text-2xl font-bold mb-4">LULUS!</p>
            {nextLessonId && (
              <p className="text-gray-700 dark:text-gray-300 mb-4">Pelajaran berikutnya telah dibuka.</p>
            )}
          </>
        ) : (
          <p className="text-red-600 dark:text-red-400 text-2xl font-bold mb-4">TIDAK LULUS. Coba lagi!</p>
        )}
        <button
          onClick={handleRetryQuiz}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 mr-4"
        >
          {passedQuiz ? 'Tinjau Kuis' : 'Coba Lagi'}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Kuis {currentQuestionIndex + 1} dari {questions.length}
      </h2>
      <p className="text-xl text-gray-800 dark:text-gray-200 mb-6">{currentQuestion.question}</p>
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={`w-full text-left p-3 rounded-lg border-2 ${
              selectedOption === option
                ? 'border-blue-500 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            } hover:border-blue-400 dark:hover:border-blue-500 transition duration-200`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleNextQuestion}
        disabled={selectedOption === null}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-300 ${
          selectedOption === null
            ? 'bg-gray-400 dark:bg-gray-600 text-gray-700 dark:text-gray-300 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white'
        }`}
      >
        {currentQuestionIndex < questions.length - 1 ? 'Pertanyaan Selanjutnya' : 'Selesai Kuis'}
      </button>
    </div>
  );
}

export default Quiz;