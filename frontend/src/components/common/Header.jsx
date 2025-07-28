// src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link group">
              <span>Gallery</span>
              <div className="nav-underline"></div>
            </Link>
            
            {user?.role === 'artist' && (
              <Link to="/upload" className="nav-link group">
                <span>Upload</span>
                <div className="nav-underline"></div>
              </Link>
            )}
            
            <Link to="/search" className="nav-link group">
              <span>Discover</span>
              <div className="nav-underline"></div>
            </Link>
            
            {user && (
              <Link to="/favorites" className="nav-link group">
                <span>Favorites</span>
                <div className="nav-underline"></div>
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="group flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-full transition-all duration-300 border border-gray-700 hover:border-purple-500/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform duration-300">
                    {user.username?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {user.username}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-full transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Login
                </Link>
                <Link to="/signup" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-300"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-300 mt-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-300 mt-1 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
          <nav className="flex flex-col space-y-4 pt-4 border-t border-gray-700">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Gallery
            </Link>
            {user?.role === 'artist' && (
              <Link to="/upload" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Upload
              </Link>
            )}
            <Link to="/search" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Discover
            </Link>
            {user && (
              <Link to="/favorites" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Favorites
              </Link>
            )}
            
            {user ? (
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
                <Link to="/profile" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-red-400 hover:text-red-300 py-2 transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
                <Link to="/login" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Join
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>

      <style jsx>{`
        .nav-link {
          @apply text-gray-300 hover:text-white transition-all duration-300 relative py-2;
        }
        
        .nav-underline {
          @apply absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300;
        }
        
        .mobile-nav-link {
          @apply text-gray-300 hover:text-white py-2 transition-colors duration-300 border-l-2 border-transparent hover:border-purple-500 pl-4;
        }
      `}</style>
    </header>
  );
};

export default Header;
