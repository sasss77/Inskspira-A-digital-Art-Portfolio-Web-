import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ArtworkTable from '../../components/admin/ArtworkTable';
import apiService from '../../services/api';

const AdminArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await apiService.getAdminArtworks();
      if (response.success && response.data) {
        setArtworks(response.data.artworks || []);
      }
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (artwork) => {
    if (window.confirm(`Are you sure you want to delete "${artwork.title}"?`)) {
      try {
        console.log('Attempting to delete artwork:', artwork.id);
        const response = await apiService.deleteAdminArtwork(artwork.id);
        console.log('Delete response:', response);
        
        if (response.success) {
          alert('Artwork deleted successfully!');
          fetchArtworks(); // Refresh the list
        } else {
          throw new Error(response.message || 'Failed to delete artwork');
        }
      } catch (error) {
        console.error('Error deleting artwork:', error);
        alert(`Failed to delete artwork: ${error.message}`);
      }
    }
  };

  const handleEdit = async (artworkId, data) => {
    try {
      console.log('Attempting to update artwork:', artworkId, data);
      const response = await apiService.request(`/admin/artworks/${artworkId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      console.log('Update response:', response);
      
      if (response.success) {
        alert('Artwork updated successfully!');
        fetchArtworks();
      } else {
        throw new Error(response.message || 'Failed to update artwork');
      }
    } catch (error) {
      console.error('Error updating artwork:', error);
      alert(`Failed to update artwork: ${error.message}`);
    }
  };

  const handleFeature = async (artwork) => {
    try {
      const newStatus = artwork.status === 'featured' ? 'approved' : 'featured';
      await apiService.updateArtworkStatus(artwork.id, { status: newStatus });
      fetchArtworks();
    } catch (error) {
      console.error('Error updating artwork status:', error);
      alert('Failed to update artwork status');
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-950 to-purple-900">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-8">
          <ArtworkTable artworks={artworks} onDelete={handleDelete} onEdit={handleEdit} />
        </main>
      </div>
    </div>
  );
};

export default AdminArtworks;
