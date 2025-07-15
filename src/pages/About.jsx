import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    // Hapus bg-#f5f5f5 karena sudah diatur di App.js secara global
    // Tambahkan kelas dark:bg-gray-900 ke section jika Anda ingin override,
    // tapi lebih baik biarkan App.js yang mengelola bg utama.
    <section className="py-20" style={{ marginTop: '-50px' }}>
      <div className="container mx-auto px-6 md:px-12">

        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 transition-colors duration-300">Tentang EduSpace</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto transition-colors duration-300">
            EduSpace adalah platform edukasi modern yang mempersiapkan generasi masa depan dengan keterampilan dunia nyata.
          </p>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          className="flex flex-col-reverse md:flex-row items-center gap-12 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">Misi Kami</h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg transition-colors duration-300">
              Kami hadir untuk menjembatani kesenjangan antara pendidikan konvensional dan kebutuhan industri. EduSpace
              memberikan akses belajar yang fleksibel, terjangkau, dan relevan dengan perkembangan zaman.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src="/images/learning.svg" alt="Ilustrasi belajar" className="w-full max-w-md mx-auto" />
          </div>
        </motion.div>

        {/* Core Values Section */}
        <motion.div
          className="bg-blue-50 dark:bg-gray-800 rounded-xl p-10 shadow-md mb-20 border border-blue-100 dark:border-gray-700 transition-colors duration-300"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-8 transition-colors duration-300">Nilai-Nilai Inti Kami</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Inovatif', desc: 'Kami terus berinovasi untuk menciptakan metode belajar yang menarik dan efektif.' },
              { title: 'Terjangkau', desc: 'Kami percaya bahwa kualitas pendidikan harus bisa diakses oleh semua kalangan.' },
              { title: 'Berorientasi Hasil', desc: 'Kami fokus pada hasil nyata: peningkatan keterampilan dan kesiapan kerja.' }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:bg-blue-100 dark:hover:bg-gray-600 transition-all duration-300 border border-gray-100 dark:border-gray-600"
              >
                <div className="text-blue-500 dark:text-blue-400 text-4xl mb-2 transition-colors duration-300">🎯</div>
                <h4 className="text-xl font-bold text-blue-600 dark:text-blue-300 mb-2 transition-colors duration-300">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mentor Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-10 transition-colors duration-300">Mentor Kami</h3>
          <div className="grid md:grid-cols-3 gap-10 ">
            {[
              {
                name: 'Fadli Zaenal Aripin',
                image: '/images/foto fadli.jpg',
                background: 'Lulusan S2 Computer Science Harvard, berpengalaman 8 tahun sebagai Software Engineer di Nvidia & mentor di program digital talent.'
              },
              {
                name: 'Iham Nursamsi',
                image: '/images/ilham.jpg',
                background: 'Spesialis Data Analyst dan Web Developer, alumni Google Data Program, pernah bekerja di Gojek dan kini aktif sebagai pembicara pelatihan data.'
              },
              {
                name: 'Muhyi Hidayah',
                image: '/images/foto muhyi.jpg',
                background: 'UX Designer di perusahaan teknologi edukasi Singapura. Lulusan Human-Computer Interaction dari NTU.'
              }
            ].map((mentor, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-blue-200 dark:border-blue-700 transition-colors duration-300"
                />
                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">{mentor.name}</h4>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm transition-colors duration-300">{mentor.background}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">Bersama EduSpace, kamu bisa belajar dengan cara yang lebih cerdas.</h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 transition-colors duration-300">
            Bergabunglah bersama ribuan pelajar lain yang telah memilih jalur belajar yang relevan, fleksibel, dan penuh semangat.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;