// src/components/Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { isLoggedIn, userProfilePicture, logout } = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    // Tutup menu saat navigasi ke halaman baru
    setIsMobileMenuOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    // Efek untuk mengubah tampilan navbar saat scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Efek untuk menutup menu pengguna saat klik di luar
    const handleClickOutside = (event) => {
      if (
        showUserMenu &&
        !event.target.closest(".user-menu-button") &&
        !event.target.closest(".user-menu-dropdown")
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); // Panggil fungsi logout dari AuthContext
    setShowUserMenu(false); // Tutup menu pengguna
    // Navigasi ke halaman login akan ditangani oleh AuthContext setelah logout
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-blue-800 shadow-xl py-2" : "bg-blue-700 shadow-lg py-3"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo EduSpace */}
        <Link
          to="/"
          className={`flex items-center text-white font-bold transition-all duration-300 ease-in-out ${
            isScrolled ? "text-xl" : "text-2xl"
          }`}
        >
          EduSpace
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-7">
          {["/", "/about", "/courses", "/contact"].map((path, i) => {
            const labels = ["Home", "About", "Courses", "Contact"];
            return (
              <NavLink
                key={path}
                to={path}
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-2 border-white pb-1 font-semibold"
                    : "text-blue-200 hover:text-white relative group transition duration-300 ease-in-out pt-2 pb-1"
                }
              >
                {labels[i]}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </NavLink>
            );
          })}

          {!isLoggedIn ? (
            <NavLink
              to="/login"
              end
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                  : "bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              }
            >
              Login
            </NavLink>
          ) : (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="user-menu-button flex items-center justify-center text-white bg-blue-600 hover:bg-blue-500 p-1 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-haspopup="true"
                aria-expanded={showUserMenu}
                aria-label="Toggle user menu"
              >
                {/* Menggunakan userProfilePicture langsung dari context */}
                {userProfilePicture ? (
                  <img
                    src={userProfilePicture}
                    alt="User avatar"
                    className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                ) : (
                  <UserCircle className="h-10 w-10 p-1" />
                )}
              </button>

              {showUserMenu && (
                <div
                  className="user-menu-dropdown absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-30 transition-all duration-200 ease-in-out origin-top-right animate-scaleIn ring-1 ring-black ring-opacity-5"
                  role="menu"
                >
                  <Link
                    to="/dashboard"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    Profil Saya
                  </Link>
                  {/* Tambahkan link Riwayat Transaksi di sini */}
                  <Link
                    to="/transactions" // Path ke halaman riwayat transaksi Anda
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    Riwayat Transaksi
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    Pengaturan
                  </Link>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 dark:hover:text-red-500"
                    role="menuitem"
                  >
                    <LogOut className="h-5 w-5 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded-md"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-blue-800 py-3 mt-2 shadow-inner rounded-b-md">
          <ul className="space-y-3 px-4">
            {["/", "/about", "/courses", "/contact"].map((path, i) => {
              const labels = ["Home", "About", "Courses", "Contact"];
              return (
                <li key={path}>
                  <NavLink
                    to={path}
                    end
                    onClick={toggleMobileMenu}
                    className="block py-2 px-3 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
                  >
                    {labels[i]}
                  </NavLink>
                </li>
              );
            })}

            {!isLoggedIn ? (
              <li>
                <NavLink
                  to="/login"
                  end
                  onClick={toggleMobileMenu}
                  className="block py-2 px-3 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-500 transition duration-300 ease-in-out text-center"
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    end
                    onClick={toggleMobileMenu}
                    className="block py-2 px-3 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    end
                    onClick={toggleMobileMenu}
                    className="block py-2 px-3 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
                  >
                    Profil Saya
                  </NavLink>
                </li>
                {/* Tambahkan link Riwayat Transaksi di sini untuk mobile */}
                <li>
                  <NavLink
                    to="/transactions" // Path ke halaman riwayat transaksi Anda
                    end
                    onClick={toggleMobileMenu}
                    className="block py-2 px-3 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
                  >
                    Riwayat Transaksi
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    end
                    onClick={toggleMobileMenu}
                    className="block py-2 px-3 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
                  >
                    Pengaturan
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      toggleMobileMenu();
                      handleLogout();
                    }}
                    className="flex items-center w-full text-left py-2 px-3 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-500 transition duration-300 ease-in-out"
                  >
                    <LogOut className="h-5 w-5 mr-2" /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;