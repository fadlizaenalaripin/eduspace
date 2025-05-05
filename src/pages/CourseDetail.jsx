import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import webdev from "../asset/webdev.jpg";
import react from "../asset/react.jpg";
import uiux from "../asset/ui ux.jpg";
import html from "../asset/html dasar.jpg";
import css from "../asset/css.jpg";
import dataAnalis from "../asset/data analyst.jpg";
import machinelearning from "../asset/machine learning.jpg";
import dataScience from "../asset/data sceince.jpg";
import python from "../asset/python.jpg";

import ilham from "../asset/ilham.jpg";
import fadli from "../asset/foto fadli.jpg";
import muhyi from "../asset/foto muhy.jpg";

const coursesData = [
  {
    id: 1,
    title: "Pengantar Pemrograman Web",
    description:
      "Pelajari langkah demi langkah cara membangun website dari nol! Dalam kursus ini, kamu akan memahami struktur HTML, mempercantik tampilan dengan CSS, dan menambahkan interaktivitas menggunakan JavaScript. Dirancang khusus untuk pemula yang ingin memulai karir sebagai web developer atau membangun proyek digital pribadi.",
    image: webdev,
    category: "Web Development",
    price: "Gratis",
    syllabus: [
      {
        title: "Pengenalan HTML",
        content:
          "Pelajari dasar-dasar HTML, mulai dari struktur dokumen hingga tag penting yang sering digunakan.",
      },
      {
        title: "Styling dengan CSS",
        content:
          "Pahami cara mengatur layout, warna, dan elemen visual menggunakan CSS untuk menciptakan tampilan web yang menarik.",
      },
      {
        title: "Interaktivitas dengan JavaScript",
        content:
          "Mulai menulis skrip JavaScript untuk membuat halaman web lebih hidup dan responsif terhadap pengguna.",
      },
    ],
    mentor: "Fadli Zaenal Aripin, S.Kom, M.S.",
    mentorImage: fadli,
    mentorBio:
      "Fadli adalah seorang web developer profesional dengan pengalaman lebih dari 10 tahun di dunia teknologi. Ia telah membimbing ratusan siswa dan terlibat dalam berbagai proyek website skala kecil hingga enterprise.",
  },
  {
    id: 2,
    title: "React untuk Pemula",
    description:
      "Kuasai React dari dasar hingga mampu membangun aplikasi web modern yang interaktif dan efisien! Dalam kursus ini, kamu akan belajar cara kerja komponen, penggunaan JSX, pengelolaan state dan props, hingga navigasi menggunakan React Router. Sangat cocok bagi yang ingin terjun ke dunia frontend development berbasis JavaScript.",
    image: react,
    category: "Frontend",
    price: "Rp 150.000",
    syllabus: [
      {
        title: "Pengenalan React",
        content:
          "Mengenal konsep dasar React, cara kerja virtual DOM, komponen fungsional, dan JSX.",
      },
      {
        title: "State dan Props",
        content:
          "Belajar mengelola dan berbagi data antar komponen menggunakan state dan props.",
      },
      {
        title: "Routing",
        content:
          "Implementasi navigasi antar halaman dalam aplikasi menggunakan React Router.",
      },
    ],
    mentor: "Ilham Nursamsi, S.Kom, M.Ilkom.",
    mentorImage: ilham,
    mentorBio:"Ilham adalah seorang Frontend Engineer berpengalaman yang mengkhususkan diri pada pengembangan antarmuka modern dengan React. Ia aktif membagikan ilmunya melalui workshop dan mentoring di berbagai komunitas teknologi.",
  },
  {
    id: 3,
    title: "Desain UI/UX dengan Figma",
    description:
      "Pelajari cara mendesain antarmuka pengguna (UI) yang estetis dan pengalaman pengguna (UX) yang optimal menggunakan Figma. Kursus ini membimbingmu memahami prinsip dasar UI/UX, tools di Figma, hingga pembuatan prototype interaktif yang siap dipresentasikan atau diuji.",
    image: uiux,
    category: "UI/UX Design",
    price: "Rp 120.000",
    syllabus: [
      {
        title: "Pengenalan Figma",
        content:
          "Mengenal antarmuka Figma, fitur dasar, serta kolaborasi desain secara real-time.",
      },
      {
        title: "Prinsip UI/UX",
        content:
          "Mempelajari prinsip desain visual, hierarki, konsistensi, dan desain yang berpusat pada pengguna.",
      },
      {
        title: "Prototyping",
        content:
          "Membuat prototype interaktif untuk presentasi, user testing, dan validasi ide desain.",
      },
    ],
    mentor: "Muhyi Hidayah, S.Kom, MT",
    mentorImage: muhyi,
    mentorBio:
      "Muhyi adalah desainer UI/UX profesional dengan pengalaman bertahun-tahun di industri startup dan teknologi digital. Ia juga aktif sebagai mentor desain di berbagai komunitas kreatif.",
  },
  {
    id: 4,
    title: "HTML Dasar",
    description:
      "Panduan cepat dan mudah untuk mempelajari HTML dari nol hingga mahir.",
    image: html,
    category: "Frontend",
    price: "Gratis",
    syllabus: [
      {
        title: "Pengenalan HTML",
        content: "Memahami struktur dasar HTML dan fungsinya.",
      },
      { title: "HTML Elements", content: "Memahami tag, atribut, dan konten HTML." },
      { title: "HTML Forms", content: "Membuat form interaktif menggunakan elemen form." },
    ],
    mentor: "Ilham Nursamsi, S.Kom., M.Ilkom",
    mentorImage: ilham,
    mentorBio:
      "Ilham adalah frontend developer profesional dengan pengalaman kerja internasional.",
  },
  {
    id: 5,
    title: "CSS Dasar",
    description:
      "Pelajari cara membuat tampilan website menarik, rapi, dan responsif menggunakan CSS.",
    image: css,
    category: "Frontend",
    price: "Gratis",
    syllabus: [
      { title: "Introduction to CSS", content: "Sintaks CSS, cara kerja, dan penggunaan selector." },
      { title: "Box Model", content: "Konsep padding, margin, border, dan konten." },
      { title: "Layout with CSS", content: "Teknik layout menggunakan Flexbox dan Grid." },
    ],
    mentor: "Muhyi Hidayah, S.Kom., M.T.",
    mentorImage: muhyi,
    mentorBio:
      "Muhyi adalah frontend designer profesional yang dikenal sebagai desainer utama situs Cortex di Indonesia.",
  },
  {
    id: 6,
    title: "Belajar Pemrograman Python",
    description: "Cocok untuk pemula yang ingin masuk ke dunia pemrograman dengan Python.",
    image: python,
    category: "Programming",
    price: "Rp 100.000",
    syllabus: [
      {
        title: "Introduction to Python",
        content: "Mengenal sintaks dasar Python dan tipe data umum.",
      },
      { title: "Control Flow", content: "Menggunakan perulangan dan percabangan." },
      { title: "Functions", content: "Membuat dan menggunakan fungsi dalam program." },
    ],
    mentor: "Fadli Zaenal Aripin, S.Kom., M.S.",
    mentorImage: fadli,
    mentorBio: "Fadli adalah profesional di bidang data science dengan keahlian mendalam dalam Python.",
  },
  {
    id: 7,
    title: "Data Analyst",
    description:
      "Pelajari dasar-dasar analisis data menggunakan Excel dan SQL untuk pengambilan keputusan berbasis data.",
    image: dataAnalis,
    category: "Data",
    price: "Rp 200.000",
    syllabus: [
      {
        title: "Introduction to Data Analysis",
        content: "Langkah-langkah dalam proses analisis data.",
      },
      {
        title: "Data Manipulation with Excel",
        content: "Menggunakan formula dan fungsi untuk mengolah data.",
      },
      { title: "Database with SQL", content: "Menulis kueri SQL untuk pengambilan data." },
    ],
    mentor: "Ilham Nursamsi, S.Kom., M.Ilkom",
    mentorImage: ilham,
    mentorBio: "Ilham adalah data analyst profesional dengan pengalaman luas dalam proyek lokal dan internasional.",
  },
  {
    id: 8,
    title: "Machine Learning",
    description:
      "Pelajari konsep dasar Machine Learning dan bangun model sederhana untuk mengenali pola dari data.",
    image: machinelearning,
    category: "AI",
    price: "Rp 250.000",
    syllabus: [
      {
        title: "Introduction to Machine Learning",
        content: "Jenis-jenis machine learning dan aplikasinya.",
      },
      {
        title: "Supervised Learning",
        content: "Model regresi dan klasifikasi dengan data berlabel.",
      },
      { title: "Unsupervised Learning", content: "Clustering untuk data tanpa label." },
    ],
    mentor: "Fadli Zaenal Aripin, S.Kom., M.S.",
    mentorImage: fadli,
    mentorBio: "Fadli adalah praktisi Machine Learning dengan fokus pada penerapan model AI dalam dunia nyata.",
  },
  {
    id: 9,
    title: "Data Science",
    description:
      "Gabungkan statistik, pemrograman, dan analisis data untuk menggali insight mendalam dan membangun solusi berbasis data.",
    image: dataScience,
    category: "Data",
    price: "Rp 300.000",
    syllabus: [
      {
        title: "Introduction to Data Science",
        content: "Alur kerja data science dari awal hingga deployment.",
      },
      { title: "Data Visualization", content: "Teknik dan tools untuk visualisasi data." },
      { title: "Statistical Analysis", content: "Analisis statistik untuk pengambilan keputusan." },
    ],
    mentor: "Fadli Zaenal Aripin, S.Kom., M.S.",
    mentorImage: fadli,
    mentorBio:
      "Fadli adalah data scientist yang ahli dalam mengolah data kompleks menjadi informasi yang dapat ditindaklanjuti.",
  },
];

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const courseId = parseInt(id, 10);
    const foundCourse = coursesData.find((c) => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    }
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {course.title}
          </h2>
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <p className="text-gray-700 mb-4">{course.description}</p>
          <p className="text-green-600 font-semibold mb-4">
            Price: {course.price}
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
            Course Syllabus
          </h3>
          <ul>
            {course.syllabus.map((item, index) => (
              <li key={index} className="mb-2">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-gray-600">{item.content}</p>
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6">Mentor</h3>
          <div className="flex items-center mt-2 mb-4">
            <img
              src={course.mentorImage}
              alt={course.mentor}
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />
            <div>
              <p className="text-gray-700 font-semibold">{course.mentor}</p>
              <p className="text-gray-600 text-sm">{course.mentorBio}</p>
            </div>
          </div>
          <Link
            to="/courses"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
