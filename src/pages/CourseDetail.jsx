// src/pages/CourseDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ilham from '../asset/foto illham.jpg';
import muhy from '../asset/foto muhy.jpg';

function CourseDetail() {
  const { id } = useParams();
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Detail</h2>
      <p className="text-gray-700">Details for course with ID: {id}</p>
      <img src ={ilham}/>
      <img src ={muhy}/>
    </div>
  );
}

export default CourseDetail;