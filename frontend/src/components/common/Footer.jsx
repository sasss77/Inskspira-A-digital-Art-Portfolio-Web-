// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-purple-500/20 mt-auto">
      {/* Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg rotate-12"></div>
                <div className="absolute inset-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg -rotate-12 opacity-70"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                InkSpira
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Discover and share extraordinary digital art. Connect with artists worldwide and build your creative community.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {['github', 'twitter', 'instagram', 'behance'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 border border-gray-700 hover:border-purple-500/50"
                >
                  <span className="text-gray-400 hover:text-purple-400 transition-colors duration-300 capitalize text-sm">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 relative">
              Explore
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Gallery', path: '/' },
                { name: 'Discover', path: '/search' },
                { name: 'Featured', path: '/featured' },
                { name: 'Artists', path: '/artists' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4 relative">
              Community
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-pink-400 to-blue-400"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About', path: '/about' },
                { name: 'Guidelines', path: '/guidelines' },
                { name: 'Support', path: '/support' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-pink-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2024 InkSpira. Crafted with 💜 for digital artists.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300">
              Terms
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      <style jsx>{`
        .particle {
          @apply absolute w-2 h-2 bg-purple-500 rounded-full opacity-20;
          animation: float 6s ease-in-out infinite;
        }
        
        .particle-1 {
          left: 20%;
          animation-delay: 0s;
        }
        
        .particle-2 {
          left: 50%;
          animation-delay: 2s;
        }
        
        .particle-3 {
          left: 80%;
          animation-delay: 4s;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
