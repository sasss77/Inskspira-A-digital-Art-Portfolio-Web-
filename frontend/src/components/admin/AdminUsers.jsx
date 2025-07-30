import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import UserTable from '../components/admin/UserTable';

const mockUsers = [
  { id: 1, username: 'ArtisticSoul', email: 'artist@inkspira.com', role: 'artist' },
  { id: 2, username: 'ArtChief', email: 'admin@inkspira.com', role: 'admin' },
  { id: 3, username: 'ViewerGuy', email: 'viewer@inkspira.com', role: 'viewer' },
];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Replace with API call!
    setTimeout(() => setUsers(mockUsers), 500);
  }, []);
  const handleBan = user => alert(`Ban user: ${user.username}`);
  const handlePromote = user => alert(`Promote user: ${user.username}`);

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-12">
        <UserTable users={users} onBan={handleBan} onPromote={handlePromote} />
      </main>
    </div>
  );
};

export default AdminUsers;
