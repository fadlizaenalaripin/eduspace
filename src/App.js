import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';




function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <Routes>
          <Route path="/" element={<Home />} /> {/* ✅ Gunakan <Route> dengan 'R' kapital */}
          <Route path="/about" element={<About />} /> {/* ✅ Gunakan <Route> dengan 'R' kapital */}
          <Route path="/courses" element={<Courses />} /> {/* ✅ Gunakan <Route> dengan 'R' kapital */}
          <Route path="/course/:id" element={<CourseDetail />} /> {/* ✅ Gunakan <Route> dengan 'R' kapital */}
          <Route path="/contact" element={<Contact />} /> {/* ✅ Gunakan <Route> dengan 'R' kapital */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;