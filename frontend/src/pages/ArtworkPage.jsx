// src/pages/ArtworkPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ArtworkDetail from '../components/artwork/ArtworkDetail';

const ArtworkPage = () => {
  const { artworkId } = useParams();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="artwork-page-content">
        <ArtworkDetail artworkId={artworkId} />
      </main>
      <Footer />
    </div>
  );
};

export default ArtworkPage;
