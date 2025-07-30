import React, { useState } from 'react';

const ArtworkTable = ({ artworks, onDelete, onSaveEdit }) => {
  const [editArtwork, setEditArtwork] = useState(null); // artwork object (for modal)
  const [modalMode, setModalMode] = useState('view'); // 'view' or 'edit'
  const [editFields, setEditFields] = useState({ title: '', description: '', tags: '' });

  // Open modal for view/edit
  const handleOpenModal = (artwork, mode = 'view') => {
    setEditArtwork(artwork);
    setModalMode(mode);
    setEditFields({
      title: artwork.title,
      description: artwork.description || '',
      tags: artwork.tags ? artwork.tags.join(', ') : '',
    });
  };

  // Save edited artwork
  const handleSave = () => {
    // Implement your update API or callback here!
    if (onSaveEdit) {
      onSaveEdit({
        ...editArtwork,
        title: editFields.title,
        description: editFields.description,
        tags: editFields.tags.split(',').map(t => t.trim()).filter(Boolean)
      });
    }
    setEditArtwork(null);
  };

  return (
    <div className="bg-gradient-to-br from-pink-500/10 via-gray-900/90 to-blue-900/20 p-8 rounded-2xl shadow-xl border border-pink-600/20">
      <h2 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text mb-5 tracking-wide">
        Artwork Moderation
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="py-3 px-3 text-left text-pink-300 font-semibold">ID</th>
              <th className="py-3 px-3 text-left text-pink-300 font-semibold">Title</th>
              <th className="py-3 px-3 text-left text-pink-300 font-semibold">Artist</th>
              <th className="py-3 px-3 text-left text-pink-300 font-semibold">Likes</th>
              <th className="py-3 px-3 text-center text-pink-300 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks && artworks.length > 0 ? artworks.map(artwork => (
              <tr key={artwork.id} className="hover:bg-pink-900/10 border-b border-pink-700/20 transition">
                <td className="py-2 px-3 text-white">{artwork.id}</td>
                <td className="py-2 px-3 text-pink-200 font-semibold">{artwork.title}</td>
                <td className="py-2 px-3 text-purple-200 font-semibold">{artwork.artist}</td>
                <td className="py-2 px-3 text-blue-200">{artwork.likes}</td>
                <td className="py-2 px-3 text-center">
                  <button
                    onClick={() => handleOpenModal(artwork, 'view')}
                    className="px-3 py-1 bg-purple-700/90 hover:bg-purple-600 text-white rounded-xl text-xs font-bold mr-1 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleOpenModal(artwork, 'edit')}
                    className="px-3 py-1 bg-blue-600/90 hover:bg-blue-700 text-white rounded-xl text-xs font-bold mr-1 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(artwork)}
                    className="px-3 py-1 bg-red-600/90 hover:bg-red-700 text-white rounded-xl text-xs font-bold ml-1 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">No artworks found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL VIEW/EDIT */}
      {editArtwork && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 overflow-y-auto">
          <div className="bg-gray-900 rounded-3xl shadow-2xl border-2 border-purple-700/30 p-8 w-full max-w-xl mx-auto relative animate-fade-in">
            <button
              className="absolute top-5 right-6 text-gray-400 hover:text-pink-400 text-xl"
              onClick={() => setEditArtwork(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-1 md:col-span-2 flex justify-center">
                <img
                  src={editArtwork.imageUrl || "/api/placeholder/300/400"}
                  alt={editArtwork.title}
                  className="rounded-2xl w-52 h-64 object-cover shadow-lg border-2 border-pink-500/20"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-4">
                <div>
                  <label className="block text-purple-300 font-semibold">Title</label>
                  {modalMode === 'edit' ? (
                    <input
                      className="w-full px-4 py-2 rounded-lg bg-black border-2 border-purple-700/40 text-white font-medium"
                      value={editFields.title}
                      onChange={e => setEditFields(f => ({ ...f, title: e.target.value }))}
                      maxLength={100}
                    />
                  ) : (
                    <div className="text-lg font-bold text-pink-200">{editArtwork.title}</div>
                  )}
                </div>
                <div>
                  <label className="block text-purple-300 font-semibold">Artist</label>
                  <div className="font-medium text-purple-200">{editArtwork.artist}</div>
                </div>
                <div>
                  <label className="block text-purple-300 font-semibold">Description</label>
                  {modalMode === 'edit' ? (
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg bg-black border-2 border-purple-700/40 text-white font-medium resize-none"
                      value={editFields.description}
                      onChange={e => setEditFields(f => ({ ...f, description: e.target.value }))}
                      maxLength={800}
                    />
                  ) : (
                    <div className="text-gray-300">{editArtwork.description}</div>
                  )}
                </div>
                <div>
                  <label className="block text-purple-300 font-semibold">Tags</label>
                  {modalMode === 'edit' ? (
                    <input
                      className="w-full px-4 py-2 rounded-lg bg-black border-2 border-purple-700/40 text-white font-medium"
                      value={editFields.tags}
                      onChange={e => setEditFields(f => ({ ...f, tags: e.target.value }))}
                      placeholder="Comma separated..."
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {editArtwork.tags && editArtwork.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-purple-500/20 text-purple-200 text-xs rounded-full font-semibold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button
                className="px-5 py-2 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-800 transition"
                onClick={() => setEditArtwork(null)}
              >
                Close
              </button>
              {modalMode === 'view' && (
                <button
                  className="px-5 py-2 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-600 transition"
                  onClick={() => setModalMode('edit')}
                >
                  Edit
                </button>
              )}
              {modalMode === 'edit' && (
                <button
                  className="px-5 py-2 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkTable;
