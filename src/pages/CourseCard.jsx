import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden">
      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-700 text-sm mb-2">{course.description.substring(0, 60)}...</p>
        <Link to={`/course/${course.id}`} className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;