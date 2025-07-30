import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import UserTable from '../../components/admin/UserTable';

const mockUsers = [
  { id: 1, username: 'ArtisticSoul', email: 'artist@inkspira.com', role: 'artist' },
  { id: 2, username: 'AdminUser', email: 'admin@inkspira.com', role: 'admin' },
  { id: 3, username: 'ViewOnly', email: 'viewer@inkspira.com', role: 'viewer' },
];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setTimeout(() => setUsers(mockUsers), 700);
  }, []);
  const handleBan = user => alert(`Ban user: ${user.username}`);
  const handlePromote = user => alert(`Promote user: ${user.username}`);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-950 to-purple-900">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-8">
          <UserTable users={users} onBan={handleBan} onPromote={handlePromote} />
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;
