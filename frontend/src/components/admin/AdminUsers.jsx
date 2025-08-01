import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import UserTable from '../components/admin/UserTable';
import apiService from '../../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiService.getAdminUsers();
      setUsers(response.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBan = async (user) => {
    try {
      await apiService.updateUserStatus(user.id, { status: 'banned' });
      fetchUsers();
    } catch (error) {
      console.error('Error banning user:', error);
      alert('Failed to ban user');
    }
  };

  const handlePromote = async (user) => {
    try {
      const newRole = user.role === 'viewer' ? 'artist' : 'admin';
      await apiService.updateUserStatus(user.id, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error('Error promoting user:', error);
      alert('Failed to promote user');
    }
  };

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
