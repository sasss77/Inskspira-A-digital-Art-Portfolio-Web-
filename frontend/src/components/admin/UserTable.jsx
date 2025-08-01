import React from 'react';

const UserTable = ({ users, onBan, onPromote, selectedUsers = [], setSelectedUsers }) => {
  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-800/20 via-black/60 to-blue-800/10 p-8 rounded-2xl shadow-2xl border border-purple-700/20">
      <h2 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-5 tracking-wide">
        User Management
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="py-3 px-3 text-left text-purple-300 font-semibold">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-purple-500 rounded focus:ring-purple-500"
                />
              </th>
              <th className="py-3 px-3 text-left text-purple-300 font-semibold">ID</th>
              <th className="py-3 px-3 text-left text-purple-300 font-semibold">Username</th>
              <th className="py-3 px-3 text-left text-purple-300 font-semibold">Email</th>
              <th className="py-3 px-3 text-left text-purple-300 font-semibold">Role</th>
              <th className="py-3 px-3 text-left text-purple-300 font-semibold">Status</th>
              <th className="py-3 px-3 text-center text-purple-300 font-semibold">Actions</th>
            </tr>
          </thead>
        <tbody>
          {users && users.length > 0 ? users.map(user => (
            <tr key={user.id} className="hover:bg-purple-900/10 border-b border-purple-700/20 transition">
              <td className="py-2 px-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-purple-500 rounded focus:ring-purple-500"
                />
              </td>
              <td className="py-2 px-3 text-white">{user.id}</td>
              <td className="py-2 px-3 text-pink-300 font-semibold">{user.username}</td>
              <td className="py-2 px-3 text-blue-200">{user.email}</td>
              <td className="py-2 px-3 capitalize text-purple-200">{user.role}</td>
              <td className="py-2 px-3">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  user.isActive ? 'bg-green-600/20 text-green-300' : 'bg-red-600/20 text-red-300'
                }`}>
                  {user.isActive ? 'Active' : 'Banned'}
                </span>
              </td>
              <td className="py-2 px-3 text-center">
                <button
                  onClick={() => onBan(user)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold mr-2 transition-all duration-200 transform hover:scale-105 ${
                    user.isActive 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-red-500/25' 
                      : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-green-500/25'
                  }`}>
                  {user.isActive ? '🚫 Ban' : '✅ Unban'}
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={7} className="py-8 text-center text-gray-400">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default UserTable;
