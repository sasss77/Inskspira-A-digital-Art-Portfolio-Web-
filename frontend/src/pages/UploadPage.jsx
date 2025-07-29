// src/pages/UploadPage.jsx
import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ArtworkUpload from '../components/artwork/ArtworkUpload';

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Artistic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="upload-bg-gradient"></div>
        <div className="upload-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="upload-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <Header />
      <main className="relative z-10">
        <ArtworkUpload />
      </main>
      <Footer />
    </div>
  );
};

export default UploadPage;
