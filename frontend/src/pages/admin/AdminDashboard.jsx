import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

    
const AdminDashboard = () => {
  const navigate = useNavigate();

    return (
    
     
    <div className="min-h-screen flex">
            <AdminSidebar />    
      <main className="flex-1 bg-gradient-to-br from-black via-gray-950 to-purple-900 p-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-2">
          Welcome to the Admin Panel
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Manage users, artworks, and community content across the InkSpira universe.
        </p>
        <div className="w-full max-w-4xl bg-[#20122b] bg-opacity-60 rounded-3xl shadow-xl p-10 grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl text-pink-300 font-semibold mb-1">Total Users</h2>
            <div className="text-3xl font-extrabold text-white drop-shadow-lg">...</div>
          </div>
          <div>
            <h2 className="text-xl text-blue-300 font-semibold mb-1">Total Artworks</h2>
            <div className="text-3xl font-extrabold text-white drop-shadow-lg">...</div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-8 mt-12">
          <button
            onClick={() => navigate('/admin/users')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-lg font-extrabold text-lg hover:scale-105 transition active:scale-95 focus:outline-none ring-2 ring-purple-500/30"
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate('/admin/artworks')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg font-extrabold text-lg hover:scale-105 transition active:scale-95 focus:outline-none ring-2 ring-blue-500/30"
          >
            Manage Artworks
          </button>
        </div>
      </main>
    </div>
   
  );
};

export default AdminDashboard;
