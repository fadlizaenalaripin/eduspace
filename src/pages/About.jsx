import React from 'react';
import HeroImage from '../asset/learning.svg';
import Mentor1 from '../asset/foto fadli.jpg';
import Mentor2 from '../asset/ilham.jpg';
import Mentor3 from '../asset/foto muhyi.jpg';
import { motion } from 'framer-motion';

function About() {
  return (
    <section className="bg-#f5f5f5 py-20" style={{ marginTop: '-50px' }}>
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

        {/* Mentor Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-10">Mentor Kami</h3>
          <div className="grid md:grid-cols-3 gap-10 ">
            {[
              {
                name: 'Fadli Zaenal Aripin',
                image: Mentor1,
                background: 'Lulusan S2 Computer Science Harvard, berpengalaman 8 tahun sebagai Software Engineer di Nvidia & mentor di program digital talent.'
              },
              {
                name: 'Iham Nursamsi',
                image: Mentor2,
                background: 'Spesialis Data Analyst dan Web Developer, alumni Google Data Program, pernah bekerja di Gojek dan kini aktif sebagai pembicara pelatihan data.'
              },
              {
                name: 'Muhyi Hidayah',
                image: Mentor3,
                background: 'UX Designer di perusahaan teknologi edukasi Singapura. Lulusan Human-Computer Interaction dari NTU.'
              }
            ].map((mentor, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-blue-200"
                />
                <h4 className="text-xl font-bold text-gray-800">{mentor.name}</h4>
                <p className="text-gray-600 mt-2 text-sm">{mentor.background}</p>
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
