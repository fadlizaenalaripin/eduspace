import React, { useState } from 'react';
import CourseCard from '../components/CourseCard';
import { Search } from 'lucide-react';

const coursesData = [
  {
    id: 1,
    title: 'Pengantar Pemrograman Web',
    description: '',
    image: 'https://via.placeholder.com/300/007bff/FFFFFF?Text=Web%20Dev',
  },
  {
    id: 2,
    title: 'React untuk Pemula',
    description: '',
    image: 'https://via.placeholder.com/300/28a745/FFFFFF?Text=React',
  },
  {
    id: 3,
    title: 'Desain UI/UX dengan Figma',
    description: '',
    image: 'https://via.placeholder.com/300/ffc107/000000?Text=Figma',
  },
  {
    id: 4,
    title: 'HTML Dasar',
    description: '',
    image: 'https://via.placeholder.com/300/ffc107/000000?Text=Figma',
  },
  {
   id: 5,
   title: 'CSS Dasar',
   description: '',
   image: 'https://via.placeholder.com/300/ffc107/000000?Text=Figma',
  },
  {
    id: 6,
    title: 'Belajar pemograman python',
    description: '',
    image: 'https://via.placeholder.com/300/ffc107/000000?Text=Figma',
  },
  {
    id: 7,
    title: 'Data Analyst',
    description: '',
    image: 'https://via.placeholder.com/300/ffc107/000000?Text=Figma',
  },
  {
    id: 8,
    title: 'Machine Learning',
    description: '',
    image: 'https://via.placeholder.com/300/ffc107/000000?Text=Figma',
  },
  {
    id: 9,
    title: 'Data science',
    description: '',
    image: 'https://via.placeholder.com/300/ffc107/000000?Text=Figma',
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
    <div className="bg-gray-100 min-h-screen">
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

        {/* Course List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
