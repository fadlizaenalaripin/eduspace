import React, { useState } from 'react';
import { Search } from 'lucide-react';
// Hapus 'Link' dari sini:
import { useNavigate } from 'react-router-dom'; // HANYA tinggalkan useNavigate
import { coursesData } from '../data/coursesData';

const styles = `
  /* Scrollbar styling */
  .scroll-container::-webkit-scrollbar {
    width: 8px; height: 8px;
  }
  .scroll-container::-webkit-scrollbar-track {
    background: #f1f1f1; border-radius: 10px;
  }
  .scroll-container::-webkit-scrollbar-thumb {
    background: #888; border-radius: 10px;
  }
  .scroll-container::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  .dark .scroll-container::-webkit-scrollbar-track {
    background: #333;
  }
  .dark .scroll-container::-webkit-scrollbar-thumb {
    background: #555;
  }
  .dark .scroll-container::-webkit-scrollbar-thumb:hover {
    background: #777;
  }
  .scroll-container {
    scroll-behavior: smooth;
  }
`;

function CourseCard({ course }) {
  const navigate = useNavigate();

  const isFree = course.price.toLowerCase() === "gratis";

  const handleEnrollClick = () => {
    if (isFree) {
      navigate(`/course/${course.id}`);
    } else {
      navigate(`/payment/${course.id}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1 transition-colors duration-300">{course.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">{course.category}</p>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 transition-colors duration-300">{course.description.substring(0, 60)}...</p>
        <p className="text-green-600 dark:text-green-400 font-semibold mb-2 transition-colors duration-300">{course.price}</p>
        <button
          onClick={handleEnrollClick}
          className="inline-block bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300 w-full text-center"
        >
          {isFree ? "Mulai Belajar" : "Beli Kursus"}
        </button>
      </div>
    </div>
  );
}

function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(coursesData.map(course => course.category)))];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen scroll-smooth bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <style>{styles}</style>

      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center transition-colors duration-300">
          Explore Courses
        </h2>

        <div className="flex items-center rounded-full px-4 py-2 w-full max-w-md mx-auto mb-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
          <Search className="text-gray-500 dark:text-gray-400 mr-2 transition-colors duration-300" size={20} />
          <input
            type="text"
            placeholder="Cari kursus..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-1 outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full border transition-colors duration-300
                ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100 hover:border-blue-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-blue-600 dark:hover:text-white'
                }
              `}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="max-h-[75vh] overflow-y-auto pr-2 scroll-container">
          {filteredCourses.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-12 transition-colors duration-300">
              Kursus tidak ditemukan.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;