// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-16 bg-gradient-to-br from-purple-950/90 via-blue-900/90 to-black">
        <div className="relative max-w-xl w-full text-center p-8 bg-black/60 border border-purple-700/20 rounded-3xl shadow-2xl overflow-hidden">
          {/* Artistic floating shape */}
          <div className="absolute top-0 -right-16 w-60 h-60 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -top-16 -left-16 w-60 h-60 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-3xl pointer-events-none" />

          <div className="mb-6">
            <span className="text-[6rem] font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg select-none block">
              404
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Page Not Found</h1>
            <p className="text-lg text-gray-400 font-light mb-6">
              Oops! Looks like you’ve wandered outside the gallery.<br/>
              This page couldn't be found.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center px-7 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 12h18M9 18l-6-6 6-6"/>
            </svg>
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
