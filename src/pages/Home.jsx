import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
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

  // State untuk menyimpan data animasi Lottie setelah diambil
  const [parootAnimationData, setParootAnimationData] = useState(null);
  const [animasiAnimationData, setAnimasiAnimationData] = useState(null);

  useEffect(() => {
    // Fungsi untuk mengambil data animasi dari public folder
    const fetchAnimationData = async (path, setState) => {
      try {
        const response = await fetch(path);
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error("Error fetching Lottie animation data:", error);
      }
    };

    // Ambil data untuk animasi paroot saat komponen dimuat
    fetchAnimationData("/images/animasihnavbar.json", setParootAnimationData);
    // Ambil data untuk animasi lanjut saat komponen dimuat
    fetchAnimationData("/images/animasilanjut.json", setAnimasiAnimationData);
  }, []); // [] agar useEffect hanya dijalankan sekali setelah render pertama

  const toggleAbout = () => setIsAboutOpen(!isAboutOpen);
  const toggleWhy = () => setIsWhyOpen(!isWhyOpen);
  const toggleFitur1 = () => setIsFitur1Open(!isFitur1Open);
  const toggleFitur2 = () => setIsFitur2Open(!isFitur2Open);

  // Daftar mitra yang akan digulir
const partners = [
  {
    src: "/images/google_logo2.svg",
    alt: "Google",
  },
  {
    src: "/images/apple.svg",
    alt: "Apple",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    alt: "Udemy",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    alt: "IBM",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    alt: "Amazon",
  },
];


  // Duplikasi mitra untuk efek scrolling yang mulus
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div>
      {/* Banner Section */}
      <div className="py-12 flex items-center justify-center">
        <div className="mx-auto flex items-center justify-start">
          <div className="w-1/2 pl-8 mr-auto mt-[-60px]">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300"
            >
              Welcome to EduSpace
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300"
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
            {parootAnimationData && (
              <Lottie
                animationData={parootAnimationData}
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <FadeInWhenVisible delay={0.2}>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700 flex flex-col h-[200px] transition-colors duration-300">
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
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">
                Kualitas Berkelas
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
                Kurikulum terstruktur dan instruktur berpengalaman.
              </p>
            </div>
          </FadeInWhenVisible>
          {/* Card 2 */}
          <FadeInWhenVisible delay={0.4}>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700 flex flex-col h-[200px] transition-colors duration-300">
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
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">
                Akses Mudah
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
                Belajar kapan saja dan di mana saja.
              </p>
            </div>
          </FadeInWhenVisible>
          {/* Card 3 */}
          <FadeInWhenVisible delay={0.6}>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700 flex flex-col h-[200px] transition-colors duration-300">
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
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">
                Mentor Profesional
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div
                className="flex justify-between items-center cursor-pointer p-5"
                onClick={toggleAbout}
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                  Apa itu EduSpace?
                </h2>
                {isAboutOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors duration-300" />
                )}
              </div>
              <div
                className={`px-5 pb-5 text-gray-600 dark:text-gray-300 text-sm transition-all duration-500 ease-in-out ${
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div
                className="flex justify-between items-center cursor-pointer p-5"
                onClick={toggleWhy}
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                  Kenapa Memilih EduSpace?
                </h2>
                {isWhyOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors duration-300" />
                )}
              </div>
              <div
                className={`px-5 pb-5 text-gray-600 dark:text-gray-300 text-sm transition-all duration-500 ease-in-out ${
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div
                className="flex justify-between items-center cursor-pointer p-5"
                onClick={toggleFitur1}
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                  Akses ke Mentor Profesional
                </h2>
                {isFitur1Open ? (
                  <ChevronUp className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors duration-300" />
                )}
              </div>
              <div
                className={`px-5 pb-5 text-gray-600 dark:text-gray-300 text-sm transition-all duration-500 ease-in-out ${
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div
                className="flex justify-between items-center cursor-pointer p-5"
                onClick={toggleFitur2}
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                  Fleksibilitas Waktu Belajar
                </h2>
                {isFitur2Open ? (
                  <ChevronUp className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors duration-300" />
                )}
              </div>
              <div
                className={`px-5 pb-5 text-gray-600 dark:text-gray-300 text-sm transition-all duration-500 ease-in-out ${
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
          {animasiAnimationData && (
            <Lottie
              animationData={animasiAnimationData}
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </div>
      </div>

      {/* Testimoni Section */}
      <div className="py-16">
        <div className="container mx-auto text-center">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-10 transition-colors duration-300">
              Apa Kata Mereka?
            </h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeInWhenVisible delay={0.2}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-start transition-colors duration-300 border border-gray-200 dark:border-gray-700">
                <img
                  src={"/images/sinta.jpg"}
                  alt="Foto Sinta"
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-2 transition-colors duration-300">
                    Belajar di EduSpace sangat menyenangkan! Materinya jelas dan
                    mentornya ramah.
                  </p>
                  <h4 className="mt-0 font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                    Sinta, Mahasiswa UGM
                  </h4>
                </div>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.4}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-start transition-colors duration-300 border border-gray-200 dark:border-gray-700">
                <img
                  src={"/images/budi.jpg"}
                  alt="Foto Budi"
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-2 transition-colors duration-300">
                    "Platformnya mudah digunakan dan cocok untuk pemula. Suka
                    banget!"
                  </p>
                  <h4 className="mt-0 font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                    — Budi, Fresh Graduate
                  </h4>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>

      {/* Mitra Section - Diubah menjadi carousel otomatis */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden"> {/* overflow-hidden untuk menyembunyikan bagian yang tidak terlihat */}
        <div className="container mx-auto text-center">
          <FadeInWhenVisible>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-10 transition-colors duration-300">
              Dipercaya oleh Mitra Terbaik
            </h2>
          </FadeInWhenVisible>
        </div>
        {/* Container untuk scrolling logos */}
      <div className="flex animate-scroll-logos">
  {duplicatedPartners.map((partner, index) => (
    <div key={index} className="flex-shrink-0 mx-8">
      <img
        src={partner.src}
        alt={partner.alt}
        className="h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
      />
    </div>
  ))}
</div>

      </div>

      {/* Statistik Section */}
      <div className="py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <FadeInWhenVisible delay={0.2}>
            <div>
              <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">+200</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2 transition-colors duration-300">Siswa Aktif</p>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.4}>
            <div>
              <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">+20</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2 transition-colors duration-300">Mentor Handal</p>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.6}>
            <div>
              <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">98%</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2 transition-colors duration-300">Tingkat Kepuasan</p>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>

      {/* Animasi CSS untuk scrolling mitra */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.7s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }

        /* Keyframes untuk scrolling logo */
        @keyframes scroll-logos {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); } /* Menggulir setengah dari total konten (karena sudah diduplikasi) */
        }

        .animate-scroll-logos {
          animation: scroll-logos 30s linear infinite; /* Sesuaikan durasi sesuai kebutuhan */
          width: 200%; /* Agar ada ruang untuk duplikasi dan scrolling */
          display: flex;
          white-space: nowrap; /* Mencegah logo wrap ke baris baru */
        }

        /* Pastikan gambar tidak menyusut */
        .animate-scroll-logos img {
            flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}

export default Home;