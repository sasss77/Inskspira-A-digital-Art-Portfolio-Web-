// src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      logout();
      navigate('/');
    }
  };

  return (
    <header className="bg-gray-900 border-b border-purple-500/20 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-2">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg -rotate-12 group-hover:rotate-12 transition-transform duration-300 opacity-70"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:to-blue-400 transition-all duration-300">
              InkSpira
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 relative">
            <Link
              to="/"
              className="header-gradient-nav header-gradient-purple group"
            >
              <span>Gallery</span>
              <div className="gradient-underline"></div>
            </Link>

            {user?.role === 'artist' && (
              <Link
                to="/upload"
                className="header-gradient-nav header-gradient-pink group"
              >
                <span>Upload</span>
                <div className="gradient-underline"></div>
              </Link>
            )}

            <Link
              to="/search"
              className="header-gradient-nav header-gradient-blue group"
            >
              <span>Discover</span>
              <div className="gradient-underline"></div>
            </Link>

            {user && (
              <Link
                to="/favorites"
                className="header-gradient-nav header-gradient-green group"
              >
                <span>Favorites</span>
                <div className="gradient-underline"></div>
              </Link>
            )}

            {/* Admin Dashboard - Only visible for admin users */}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="header-gradient-nav header-gradient-orange group"
              >
                <span>Admin Panel</span>
                <div className="gradient-underline"></div>
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="group flex items-center bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-full transition-all duration-300 border border-gray-700 hover:border-purple-700"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.username?.[0]?.toUpperCase()}
                  </div>
                  <span className="ml-2 text-gray-300 group-hover:text-white transition-colors duration-300">
                    {user.username}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 bg-opacity-20 hover:bg-opacity-30 text-red-400 hover:text-red-300 px-4 py-2 rounded-full transition-colors duration-300 border border-red-600 hover:border-red-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white font-semibold transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold px-6 py-2 rounded-full transition-transform duration-300 hover:scale-105 shadow-lg"
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-gray-300 rounded transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-gray-300 rounded my-1 transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-gray-300 rounded transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-max-height duration-300 overflow-hidden ${
              isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
            } bg-gray-900 bg-opacity-95 border-t border-purple-500/20`}
          >
            <nav className="flex flex-col px-4 py-6 space-y-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="header-gradient-nav header-gradient-purple group"
              >
                <span>Gallery</span>
                <div className="gradient-underline"></div>
              </Link>
              {user?.role === 'artist' && (
                <Link
                  to="/upload"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="header-gradient-nav header-gradient-pink group"
                >
                  <span>Upload</span>
                  <div className="gradient-underline"></div>
                </Link>
              )}
              <Link
                to="/search"
                onClick={() => setIsMobileMenuOpen(false)}
                className="header-gradient-nav header-gradient-blue group"
              >
                <span>Discover</span>
                <div className="gradient-underline"></div>
              </Link>
              {user && (
                <Link
                  to="/favorites"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="header-gradient-nav header-gradient-green group"
                >
                  <span>Favorites</span>
                  <div className="gradient-underline"></div>
                </Link>
              )}
              {/* Admin Dashboard - Mobile */}
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="header-gradient-nav header-gradient-orange group"
                >
                  <span>Admin Panel</span>
                  <div className="gradient-underline"></div>
                </Link>
              )}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link text-gray-300 hover:text-white font-semibold transition-colors duration-300"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-300 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link text-gray-300 hover:text-white font-semibold transition-colors duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white font-semibold px-6 py-2 rounded-full text-center"
                  >
                    Join
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>

      <style>{`
        .header-gradient-nav {
          position: relative;
          font-weight: 600;
          padding-bottom: 4px;
          transition: color 0.3s;
          cursor: pointer;
        }
        .header-gradient-purple {
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .header-gradient-purple:hover {
          opacity: 0.85;
          filter: drop-shadow(0 0 8px #a21caf99);
        }
        .header-gradient-blue {
          background: linear-gradient(90deg, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .header-gradient-blue:hover {
          opacity: 0.9;
          filter: drop-shadow(0 0 8px #2563eb88);
        }
        .header-gradient-pink {
          background: linear-gradient(90deg, #ec4899, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .header-gradient-pink:hover {
          opacity: 0.85;
          filter: drop-shadow(0 0 8px #ec489999);
        }
        .header-gradient-green {
          background: linear-gradient(90deg, #10b981, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .header-gradient-green:hover {
          opacity: 0.9;
          filter: drop-shadow(0 0 8px #10b98188);
        }
        /* New orange gradient for Admin Panel */
        .header-gradient-orange {
          background: linear-gradient(90deg, #f59e0b, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .header-gradient-orange:hover {
          opacity: 0.85;
          filter: drop-shadow(0 0 8px #f5930b99);
        }

        .gradient-underline {
          position: absolute;
          bottom: -1px;
          left: 0;
          height: 3px;
          width: 0;
          border-radius: 2px;
          opacity: 0.9;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .header-gradient-blue .gradient-underline {
          background: linear-gradient(90deg, #3b82f6, #6366f1);
        }
        .header-gradient-pink .gradient-underline {
          background: linear-gradient(90deg, #ec4899, #f472b6);
        }
        .header-gradient-green .gradient-underline {
          background: linear-gradient(90deg, #10b981, #34d399);
        }
        .header-gradient-orange .gradient-underline {
          background: linear-gradient(90deg, #f59e0b, #f97316);
        }
        .group:hover > .gradient-underline {
          width: 100%;
        }
      `}</style>
    </header>
  );
};

export default Header;
