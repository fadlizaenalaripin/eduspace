import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import paroot from "../asset/animasihnavbar.json";
import animasi from "../asset/animasilanjut.json";
import Lottie from "lottie-react";
import sinta from "../asset/sinta.jpg";
import budi from "../asset/budi.jpg";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Component untuk animasi Fade-in saat elemen terlihat
function FadeInWhenVisible({ children, delay = 0 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

function Home() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isWhyOpen, setIsWhyOpen] = useState(false);
  const [isFitur1Open, setIsFitur1Open] = useState(false);
  const [isFitur2Open, setIsFitur2Open] = useState(false);

  const toggleAbout = () => setIsAboutOpen(!isAboutOpen);
  const toggleWhy = () => setIsWhyOpen(!isWhyOpen);
  const toggleFitur1 = () => setIsFitur1Open(!isFitur1Open);
  const toggleFitur2 = () => setIsFitur2Open(!isFitur2Open);

  return (
    <div>
      {/* Banner Section */}
      <div className="bg-gray-100 py-12 flex items-center justify-center">
        <div className="mx-auto flex items-center justify-start">
          <div className="w-1/2 pl-8 mr-auto mt-[-60px]">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Welcome to EduSpace
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-700 mb-4"
            >
              Mulai belajar terarah bersama eduspace
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/courses"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full sm:py-3 sm:px-6 md:py-3 md:px-6"
                style={{ wordBreak: "keep-all", whiteSpace: "nowrap" }}
              >
                Explore Courses
              </Link>
            </motion.div>
          </div>
          <div className="w-1/2 pl-10">
            <Lottie
              animationData={paroot}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <FadeInWhenVisible delay={0.2}>
            <div className="p-6 bg-white rounded-lg shadow-md text-center border flex flex-col h-[200px]">
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-100 text-blue-500 mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Kualitas Berkelas
              </h3>
              <p className="text-gray-600 text-sm">
                Kurikulum terstruktur dan instruktur berpengalaman.
              </p>
            </div>
          </FadeInWhenVisible>
          {/* Card 2 */}
          <FadeInWhenVisible delay={0.4}>
            <div className="p-6 bg-white rounded-lg shadow-md text-center border flex flex-col h-[200px]">
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-100 text-blue-500 mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Akses Mudah
              </h3>
              <p className="text-gray-600 text-sm">
                Belajar kapan saja dan di mana saja.
              </p>
            </div>
          </FadeInWhenVisible>
          {/* Card 3 */}
          <FadeInWhenVisible delay={0.6}>
            <div className="p-6 bg-white rounded-lg shadow-md text-center border flex flex-col h-[200px]">
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-100 text-blue-500 mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Mentor Profesional
              </h3>
              <p className="text-gray-600 text-sm">
                Dukungan dari para ahli di bidangnya.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>

      {/* About and Why Choose Us Section with Animation */}
      <div className="container mx-auto py-10 mt-4 flex md:flex-row flex-col gap-8">
        {/* Left Side: Accordions */}
        <div className="md:w-1/2 space-y-4">
          {/* About Section */}
          <FadeInWhenVisible delay={0.2}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
              <div
                className="flex justify-between items-center cursor-pointer p-5"
                onClick={toggleAbout}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  Apa itu EduSpace?
                </h2>
                {isAboutOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                )}
              </div>
              <div
                className={`px-5 pb-5 text-gray-600 text-sm transition-all duration-500 ease-in-out ${
                  isAboutOpen
                    ? "max-h-[500px] opacity-100 py-2"
                    : "max-h-0 opacity-0 py-0"
                } overflow-hidden`}
              >
                EduSpace adalah platform pembelajaran online yang dirancang untuk
                membuat proses belajar menjadi lebih fleksibel, menyenangkan, dan
                mudah diakses oleh siapa saja. Dengan materi yang lengkap dan
                didukung teknologi modern, kami hadir untuk mendukung pembelajaran
                yang efektif di era digital.
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Why Choose Us Section */}
          <FadeInWhenVisible delay={0.4}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
              <div
                className="flex justify-between items-center cursor-pointer p-5"
                onClick={toggleWhy}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  Kenapa Memilih EduSpace?
                </h2>
                {isWhyOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                )}
              </div>
              <div
                className={`px-5 pb-5 text-gray-600 text-sm transition-all duration-500 ease-in-out ${
                  isWhyOpen
                    ? "max-h-[500px] opacity-100 py-2"
                    : "max-h-0 opacity-0 py-0"
                } overflow-hidden`}
              >
                Kami memberikan pengalaman belajar yang berkualitas dengan harga
                terjangkau, didukung mentor profesional, dan fitur belajar
                interaktif yang membuat kamu tetap semangat. EduSpace adalah
                pilihan tepat untuk mengembangkan diri dan meningkatkan kemampuan.
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Fitur Unggulan 1 Section */}
          <FadeInWhenVisible delay={0.6}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
              <div
                className="flex justify-between items-center cursor-pointer p-5"
                onClick={toggleFitur1}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  Akses ke Mentor Profesional
                </h2>
                {isFitur1Open ? (
                  <ChevronUp className="w-5 h-5 text-gray-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                )}
              </div>
              <div
                className={`px-5 pb-5 text-gray-600 text-sm transition-all duration-500 ease-in-out ${
                  isFitur1Open
                    ? "max-h-[500px] opacity-100 py-2"
                    : "max-h-0 opacity-0 py-0"
                } overflow-hidden`}
              >
                Dapatkan bimbingan langsung dari para mentor yang ahli di
                bidangnya. EduSpace memastikan kamu tidak belajar sendirian,
                melainkan ditemani mentor yang siap membantu.
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Fitur Unggulan 2 Section */}
          <FadeInWhenVisible delay={0.8}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
              <div
                className="flex justify-between items-center cursor-pointer p-5"
                onClick={toggleFitur2}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  Fleksibilitas Waktu Belajar
                </h2>
                {isFitur2Open ? (
                  <ChevronUp className="w-5 h-5 text-gray-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                )}
              </div>
              <div
                className={`px-5 pb-5 text-gray-600 text-sm transition-all duration-500 ease-in-out ${
                  isFitur2Open
                    ? "max-h-[500px] opacity-100 py-2"
                    : "max-h-0 opacity-0 py-0"
                } overflow-hidden`}
              >
                EduSpace memberikan fleksibilitas penuh dalam menentukan waktu
                belajar. Kamu bisa mengakses materi kapan saja dan di mana saja,
                sehingga cocok untuk pelajar, mahasiswa, maupun pekerja.
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Right Side: Animation */}
        <div className="md:w-1/2">
          <Lottie
            animationData={animasi}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>

      {/* Testimoni Section */}
      <div className="bg-white-50 py-16">
        <div className="container mx-auto text-center">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-bold text-gray-800 mb-10">
              Apa Kata Mereka?
            </h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeInWhenVisible delay={0.2}>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
                <img
                  src={sinta}
                  alt="Foto Sinta"
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="text-gray-700 italic mb-2">
                    Belajar di EduSpace sangat menyenangkan! Materinya jelas dan
                    mentornya ramah.
                  </p>
                  <h4 className="mt-0 font-semibold text-gray-800">
                    Sinta, Mahasiswa UGM
                  </h4>
                </div>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.4}>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
                <img
                  src={budi}
                  alt="Foto Budi"
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="text-gray-700 italic mb-2">
                    "Platformnya mudah digunakan dan cocok untuk pemula. Suka
                    banget!"
                  </p>
                  <h4 className="mt-0 font-semibold text-gray-800">
                    — Budi, Fresh Graduate
                  </h4>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>

      {/* Statistik Section */}
      <div className="#f5f5f5 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <FadeInWhenVisible delay={0.2}>
            <div>
              <h3 className="text-4xl font-bold text-blue-600">+200</h3>
              <p className="text-gray-700 mt-2">Siswa Aktif</p>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.4}>
            <div>
              <h3 className="text-4xl font-bold text-blue-600">+20</h3>
              <p className="text-gray-700 mt-2">Mentor Handal</p>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.6}>
            <div>
              <h3 className="text-4xl font-bold text-blue-600">98%</h3>
              <p className="text-gray-700 mt-2">Tingkat Kepuasan</p>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </div>
  );
}

export default Home;
