import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import webdev from '../asset/webdev.jpg';
import react from '../asset/react.jpg';
import uiux from '../asset/ui ux.jpg';
import html from '../asset/html dasar.jpg';
import css from '../asset/css.jpg';
import dataAnalis from '../asset/data analyst.jpg';
import machinelearning from '../asset/machine learning.jpg';
import dataScience from '../asset/data sceince.jpg';
import python from '../asset/python.jpg';




// Tambahkan CSS untuk scrollbar custom
const styles = `
   Scrollbar styling 
  .scroll-container::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .scroll-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .scroll-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .scroll-container::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

   Smooth scrolling 
  .scroll-container {
    scroll-behavior: smooth;
  }
`;

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden">
      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-1">{course.category}</p>
        <p className="text-gray-700 text-sm mb-2">{course.description.substring(0, 60)}...</p>
        <p className="text-green-600 font-semibold mb-2">{course.price}</p>
        <Link to={`/course/${course.id}`} className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Belajar Sekarang
        </Link>
      </div>
    </div>
  );
}

const coursesData = [
  {
    id: 1,
    title: 'Pengantar Pemrograman Web',
    description: 'Belajar dasar HTML, CSS, dan JavaScript untuk membangun web.',
    image: webdev,
    category: 'Web Development',
    price: 'Gratis',
  },
  {
    id: 2,
    title: 'React untuk Pemula',
    description: 'Mulai dari nol hingga membangun aplikasi SPA dengan React.',
    image: react,
    category: 'Frontend',
    price: 'Rp 150.000',
  },
  {
    id: 3,
    title: 'Desain UI/UX dengan Figma',
    description: 'Pelajari tools desain Figma dan prinsip UI/UX dasar.',
    image: uiux,
    category: 'UI/UX Design',
    price: 'Rp 120.000',
  },
  {
    id: 4,
    title: 'HTML Dasar',
    description: 'Panduan cepat dan mudah belajar HTML dari awal.',
    image: html,
    category: 'Frontend',
    price: 'Gratis',
  },
  {
    id: 5,
    title: 'CSS Dasar',
    description: 'Pelajari cara membuat tampilan website menarik dengan CSS.',
    image: css,
    category: 'Frontend',
    price: 'Gratis',
  },
  {
    id: 6,
    title: 'Belajar Pemrograman Python',
    description: 'Cocok untuk pemula yang ingin masuk ke dunia pemrograman.',
    image: python,
    category: 'Programming',
    price: 'Rp 100.000',
  },
  {
    id: 7,
    title: 'Data Analyst',
    description: 'Dasar-dasar analisis data menggunakan Excel dan SQL.',
    image: dataAnalis,
    category: 'Data',
    price: 'Rp 200.000',
  },
  {
    id: 8,
    title: 'Machine Learning',
    description: 'Mulai dari konsep dasar hingga membangun model ML sederhana.',
    image: machinelearning,
    category: 'AI',
    price: 'Rp 250.000',
  },
  {
    id: 9,
    title: 'Data Science',
    description: 'Gabungan statistik, coding, dan analisis data untuk insight.',
    image: dataScience,
    category: 'Data',
    price: 'Rp 300.000',
  },
];


function Courses() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen scroll-smooth">
      {/* Tambahkan style tag untuk scrollbar */}
      <style>{styles}</style>
      
      <div className="container mx-auto py-8">
        {/* Judul Explore Courses */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Explore Courses</h2>

        {/* Search Bar */}
        <div className="flex items-center rounded-full px-4 py-2 w-full max-w-md mx-auto mb-8 bg-white">
          <Search className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Cari kursus..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-1 outline-none"
          />
        </div>

        {/* Course List Scrollable dengan class scroll-container */}
        <div className="max-h-[75vh] overflow-y-auto pr-2 scroll-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;