// src/pages/Courses.jsx
import React from 'react';
import CourseCard from '../components/CourseCard';

const coursesData = [
  {
    id: 1,
    title: 'Pengantar Pemrograman Web',
    description: 'Pelajari dasar-dasar HTML, CSS, dan JavaScript untuk membangun website interaktif.',
    image: 'https://via.placeholder.com/300/007bff/FFFFFF?Text=Web%20Dev', // Placeholder image
  },
  {
    id: 2,
    title: 'React untuk Pemula',
    description: 'Mulai belajar framework React dari nol hingga mahir.',
    image: 'https://via.placeholder.com/300/28a745/FFFFFF?Text=React', // Placeholder image
  },
  {
    id: 3,
    title: 'Desain UI/UX dengan Figma',
    description: 'Kuasai alat Figma untuk mendesain antarmuka pengguna yang menarik dan fungsional.',
    image: 'https://via.placeholder.com/300/ffc107/000000?Text=Figma', // Placeholder image
  },
  // Tambahkan data kursus lainnya di sini
];

function Courses() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coursesData.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Courses;