import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ArtworkTable from '../../components/admin/ArtworkTable';

const mockArtworks = [
  { id: 101, title: 'Sunset Dreams', artist: 'ArtisticSoul', likes: 230 },
  { id: 102, title: 'Pixel Night', artist: 'ViewOnly', likes: 112 },
];

const AdminArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  useEffect(() => {
    setTimeout(() => setArtworks(mockArtworks), 700);
  }, []);
  const handleDelete = artwork => alert(`Delete artwork: ${artwork.title}`);
  const handleFeature = artwork => alert(`Feature artwork: ${artwork.title}`);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-950 to-purple-900">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-8">
          <ArtworkTable artworks={artworks} onDelete={handleDelete} onFeature={handleFeature} />
        </main>
      </div>
    </div>
  );
};

export default AdminArtworks;
