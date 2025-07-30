import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const adminNav = [
  { to: '/admin', label: 'Dashboard', icon: '📊' },
  { to: '/admin/users', label: 'Users', icon: '🧑‍🎨' },
  { to: '/admin/artworks', label: 'Artworks', icon: '🖼️' },
  { to: '/admin/reports', label: 'Reports', icon: '🚩' }
];

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <aside className="bg-gradient-to-br from-purple-900 via-black to-blue-900
                      min-h-screen w-64 p-6 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          InkSpira Admin
        </h2>
      </div>
      <nav className="space-y-4">
        {adminNav.map(item => (
          <Link key={item.to}
            to={item.to}
            className={`flex items-center px-4 py-2 rounded-lg font-semibold transition
                        ${location.pathname === item.to
                          ? 'bg-purple-700/40 text-white'
                          : 'text-purple-200 hover:bg-black/30 hover:text-pink-400'}`}>
            <span className="text-xl mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
