import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import UserTable from '../../components/admin/UserTable';
import apiService from '../../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiService.getAdminUsers();
      if (response.success && response.data) {
        setUsers(response.data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBan = async (user) => {
    const action = user.isActive ? 'ban' : 'unban';
    const confirmMessage = `Are you sure you want to ${action} ${user.username}?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        if (user.isActive) {
          await apiService.banUser(user.id);
        } else {
          await apiService.unbanUser(user.id);
        }
        fetchUsers();
      } catch (error) {
        console.error(`Error ${action}ning user:`, error);
        alert(`Failed to ${action} user`);
      }
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

  const handleBulkBan = async () => {
    if (selectedUsers.length === 0) {
      alert('Please select users to ban');
      return;
    }
    
    const confirmMessage = `Are you sure you want to ban ${selectedUsers.length} selected users?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        await Promise.all(selectedUsers.map(userId => apiService.banUser(userId)));
        setSelectedUsers([]);
        fetchUsers();
      } catch (error) {
        console.error('Error banning users:', error);
        alert('Failed to ban some users');
      }
    }
  };

  const handleBulkUnban = async () => {
    if (selectedUsers.length === 0) {
      alert('Please select users to unban');
      return;
    }
    
    const confirmMessage = `Are you sure you want to unban ${selectedUsers.length} selected users?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        await Promise.all(selectedUsers.map(userId => apiService.unbanUser(userId)));
        setSelectedUsers([]);
        fetchUsers();
      } catch (error) {
        console.error('Error unbanning users:', error);
        alert('Failed to unban some users');
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-950 to-purple-900">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-8">
          {selectedUsers.length > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-800/30 to-blue-800/30 rounded-lg border border-purple-500/30">
              <div className="flex items-center justify-between">
                <span className="text-purple-300 font-semibold">
                  {selectedUsers.length} user(s) selected
                </span>
                <div className="space-x-3">
                  <button
                    onClick={handleBulkBan}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                  >
                    🚫 Bulk Ban
                  </button>
                  <button
                    onClick={handleBulkUnban}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                  >
                    ✅ Bulk Unban
                  </button>
                  <button
                    onClick={() => setSelectedUsers([])}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          )}
          <UserTable 
            users={users} 
            onBan={handleBan} 
            onPromote={handlePromote}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;
