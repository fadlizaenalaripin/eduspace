import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../asset/logo web.png'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-100 py-4" >
      <div className="container mx-auto flex items-center justify-between">
      <img
  src={logo}
  alt="Logo EduSpace"
  style={{ height: '80px', width: '80px', objectFit: 'contain' }}
  className="mr-2"
/>
        <div className="hidden md:flex space-x-4"> {/* Menu desktop (tersembunyi di mobile) */}
          <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-800">About</Link>
          <Link to="/courses" className="text-gray-600 hover:text-gray-800">Courses</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
        </div>
        <div className="md:hidden"> {/* Tombol hamburger untuk mobile (tersembunyi di desktop) */}
          <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.829-4.828 4.829a1 1 0 0 1-1.414-1.414l4.829-4.828-4.828-4.829a1 1 0 0 1 1.414-1.414l4.828 4.829 4.829-4.829a1 1 0 0 1 1.414 1.414l-4.829 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-100 py-2 border-b border-gray-200"> {/* Menu mobile (muncul saat tombol diklik) */}
          <Link to="/" className="block py-2 px-4 text-gray-600 hover:text-gray-800">Home</Link>
          <Link to="/about" className="block py-2 px-4 text-gray-600 hover:text-gray-800">About</Link>
          <Link to="/courses" className="block py-2 px-4 text-gray-600 hover:text-gray-800">Courses</Link>
          <Link to="/contact" className="block py-2 px-4 text-gray-600 hover:text-gray-800">Contact</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;