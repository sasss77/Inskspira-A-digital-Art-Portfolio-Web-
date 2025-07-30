import React from 'react';

const UserTable = ({ users, onBan, onPromote }) => (
  <div className="bg-gradient-to-br from-purple-800/20 via-black/60 to-blue-800/10 p-8 rounded-2xl shadow-2xl border border-purple-700/20">
    <h2 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-5 tracking-wide">
      User Management
    </h2>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="py-3 px-3 text-left text-purple-300 font-semibold">ID</th>
            <th className="py-3 px-3 text-left text-purple-300 font-semibold">Username</th>
            <th className="py-3 px-3 text-left text-purple-300 font-semibold">Email</th>
            <th className="py-3 px-3 text-left text-purple-300 font-semibold">Role</th>
            <th className="py-3 px-3 text-center text-purple-300 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? users.map(user => (
            <tr key={user.id} className="hover:bg-purple-900/10 border-b border-purple-700/20 transition">
              <td className="py-2 px-3 text-white">{user.id}</td>
              <td className="py-2 px-3 text-pink-300 font-semibold">{user.username}</td>
              <td className="py-2 px-3 text-blue-200">{user.email}</td>
              <td className="py-2 px-3 capitalize text-purple-200">{user.role}</td>
              <td className="py-2 px-3 text-center">
                <button
                  onClick={() => onBan(user)}
                  className="px-3 py-1 bg-red-600/90 hover:bg-red-700 text-white rounded-xl text-xs font-bold mr-1 transition">
                  Ban
                </button>
              
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-400">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserTable;
