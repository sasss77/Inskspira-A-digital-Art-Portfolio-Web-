import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleGoToSite = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to leave the admin panel and return to the main site?")) {
      navigate("/");
    }
  };

  return (
    <header className="bg-gradient-to-br from-purple-900 via-black to-blue-900 px-8 py-5 flex items-center justify-between shadow-xl border-b border-purple-700/30 relative z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent select-none">
          InkSpira Admin
        </span>
        <span className="ml-4 px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 font-bold text-xs tracking-widest">
          PANEL
        </span>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="/"
          onClick={handleGoToSite}
          className="hover:underline text-purple-200 hover:text-pink-300 transition"
        >
          Go to Site
        </a>
      </div>
    </header>
  );
};

export default AdminHeader;
