import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />

      <div className="p-4">
        {/* Badge kategori */}
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
          {course.category || 'Umum'}
        </span>

        {/* Judul */}
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{course.title}</h3>

        {/* Rating */}
        <p className="text-yellow-500 text-sm mb-1">
          {'⭐'.repeat(Math.round(course.rating || 4))} <span className="text-gray-600 text-xs">({course.rating || 4}/5)</span>
        </p>

        {/* Deskripsi singkat */}
        <p className="text-gray-700 text-sm mb-3">{course.description.substring(0, 60)}...</p>

        {/* Harga atau status */}
        <p className="text-blue-600 font-bold mb-3">
          {course.price === 0 || course.price === '0'
            ? 'Gratis'
            : `Rp ${Number(course.price).toLocaleString('id-ID')}`}
        </p>

        {/* Tombol */}
        <Link
          to={`/course/${course.id}`}
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
