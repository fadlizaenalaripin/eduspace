// src/pages/About.jsx
import React from 'react';
import HeroImage from '../asset/learning.svg';
import { motion } from 'framer-motion';

function About() {
  return (
    <section className="#f5f5f5 py-20">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900">Tentang EduSpace</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Misi Kami</h3>
            <p className="text-gray-700 text-lg">
              Kami hadir untuk menjembatani kesenjangan antara pendidikan konvensional dan kebutuhan industri. EduSpace
              memberikan akses belajar yang fleksibel, terjangkau, dan relevan dengan perkembangan zaman.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src={HeroImage} alt="Ilustrasi belajar" className="w-full max-w-md mx-auto" />
          </div>
        </motion.div>

        {/* Core Values Section */}
        <motion.div 
  className="bg-blue-50 rounded-xl p-10 shadow-md mb-20"
  initial={{ scale: 0.95, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  <h3 className="text-2xl font-semibold text-gray-800 text-center mb-8">Nilai-Nilai Inti Kami</h3>
  <div className="grid md:grid-cols-3 gap-8 text-center">
    {[
      { title: 'Inovatif', desc: 'Kami terus berinovasi untuk menciptakan metode belajar yang menarik dan efektif.' },
      { title: 'Terjangkau', desc: 'Kami percaya bahwa kualitas pendidikan harus bisa diakses oleh semua kalangan.' },
      { title: 'Berorientasi Hasil', desc: 'Kami fokus pada hasil nyata: peningkatan keterampilan dan kesiapan kerja.' }
    ].map((item, i) => (
      <div 
        key={i} 
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:bg-blue-100 transition-all duration-300"
      >
        <div className="text-blue-500 text-4xl mb-2">🎯</div>
        <h4 className="text-xl font-bold text-blue-600 mb-2">{item.title}</h4>
        <p className="text-gray-600">{item.desc}</p>
      </div>
    ))}
  </div>
</motion.div>


        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Bersama EduSpace, kamu bisa belajar dengan cara yang lebih cerdas.</h3>
          <p className="text-gray-600 text-lg mb-6">
            Bergabunglah bersama ribuan pelajar lain yang telah memilih jalur belajar yang relevan, fleksibel, dan penuh semangat.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
