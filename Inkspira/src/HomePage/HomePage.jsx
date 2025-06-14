import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Shop', path: '/shop' },
  { name: 'Login/Register', path: '/loginRegister' },
  { name: 'Contact', path: '/contact' }
];
 

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black text-white" style={{ width: '100vw', height: '100%', margin: 0, padding: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* Navigation */}
      <nav className={`fixed w-full left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-black/90 backdrop-blur-md shadow-xl shadow-red-900/20' : 'bg-transparent'
      }`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">I</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Inkspira
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
  {navItems.map((item, index) => (
    <Link
      key={item.name}
      to={item.path}
      className="relative group px-3 py-2 text-white hover:text-white transition-all duration-300 transform hover:scale-105 font-medium"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {item.name}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </Link>
  ))}
</div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1 group relative z-50 bg-red-600/20 rounded-lg hover:bg-red-600/40 transition-all duration-300"
            >
              <span className={`w-6 h-0.5 bg-red-400 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-red-400 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-red-400 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-4 space-y-4 bg-black/50 backdrop-blur-sm rounded-lg mt-2">
              {['Home', 'Gallery', 'Shop', 'Login/Register', 'Contact'].map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className="block px-4 py-2 text-white hover:text-red-400 hover:bg-red-900/20 transition-all duration-300 transform hover:translate-x-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ width: '100%', paddingTop: 0, marginTop: 0 }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-800/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-700/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 text-center w-full">
          <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Digital Art
            </span>
            <br />
            <span className="text-white">Reimagined</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Discover extraordinary digital masterpieces that push the boundaries of creativity and imagination
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-semibold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50">
              <span className="relative z-10">Explore Gallery</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button className="group px-8 py-4 border-2 border-red-600 text-red-400 rounded-full font-semibold text-lg hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105">
              Watch Demo
            </button>
          </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-red-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-red-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ width: '100%' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Why Choose Inkspira?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the future of digital art with our cutting-edge platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "High-resolution digital artworks crafted by talented artists worldwide",
                icon: "★"
              },
              {
                title: "Instant Access",
                description: "Download your purchased artwork immediately after payment confirmation",
                icon: "⚡"
              },
              {
                title: "Diverse Styles",
                description: "From abstract to realistic, find art that matches your unique taste",
                icon: "🎨"
              },
              {
                title: "Artist Support",
                description: "Every purchase directly supports independent digital artists",
                icon: "❤️"
              },
              {
                title: "Commercial License",
                description: "Use our artworks for both personal and commercial projects",
                icon: "📄"
              },
              {
                title: "24/7 Support",
                description: "Get help whenever you need it from our dedicated support team",
                icon: "🛟"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-gray-900/50 to-red-900/20 backdrop-blur-sm rounded-2xl border border-red-900/30 hover:border-red-600/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/30"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl mb-4 text-red-400 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30" style={{ width: '100%' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Featured Artworks
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover some of our most popular digital art pieces
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/20 to-gray-900/40 aspect-square cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/40"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-600/30 to-red-800/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl text-red-400">🎨</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="text-white font-bold text-lg mb-1">Digital Art #{item}</h3>
                  <p className="text-red-400 text-sm">Premium Collection</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50">
              View All Artworks
              <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-black/50" style={{ width: '100%' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-white">I</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Inkspira
              </span>
            </div>
            
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Transform your creative vision into digital reality. Join thousands of artists and art lovers in our vibrant community.
            </p>

            <div className="flex justify-center space-x-6 mb-8">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social, index) => (
                <a
                  key={social}
                  href="#"
                  className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>

            <div className="border-t border-red-900/30 pt-8">
              <p className="text-gray-500">
                © 2025 Inkspira. All rights reserved. | Crafted with ❤️ for digital artists
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        * {
          box-sizing: border-box;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          width: 100%;
          height: 100%;
        }
        
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default HomePage;