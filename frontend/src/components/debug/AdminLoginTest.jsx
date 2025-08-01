// Temporary debug component for testing admin login
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

const AdminLoginTest = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const testAdminLogin = async () => {
    setLoading(true);
    setDebugInfo(null);
    
    try {
      console.log('🔍 Testing admin login...');
      
      // Test login with admin credentials
      const loggedInUser = await login('admin@gmail.com', 'admin123');
      
      const info = {
        loginSuccess: true,
        user: loggedInUser,
        userRole: loggedInUser?.role,
        token: localStorage.getItem('inkspira_token'),
        currentPath: window.location.pathname
      };
      
      setDebugInfo(info);
      console.log('✅ Login test results:', info);
      
      if (loggedInUser?.role === 'admin') {
        showSuccess('Admin login successful! Redirecting...');
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      } else {
        showError('User role is not admin: ' + loggedInUser?.role);
      }
      
    } catch (error) {
      console.error('❌ Login test failed:', error);
      setDebugInfo({ error: error.message });
      showError('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testNavigation = () => {
    console.log('🔍 Testing direct navigation to /admin...');
    navigate('/admin');
  };

  const handleLogout = () => {
    logout();
    setDebugInfo(null);
    showSuccess('Logged out successfully');
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 border border-purple-500/50 rounded-lg p-4 max-w-md z-50">
      <h3 className="text-purple-400 font-bold mb-3">🔧 Admin Login Debug</h3>
      
      <div className="space-y-2 mb-4">
        <div className="text-sm text-gray-300">
          <strong>Current User:</strong> {user ? `${user.username} (${user.role})` : 'Not logged in'}
        </div>
        <div className="text-sm text-gray-300">
          <strong>Current Path:</strong> {window.location.pathname}
        </div>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={testAdminLogin}
          disabled={loading}
          className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Admin Login'}
        </button>
        
        <button
          onClick={testNavigation}
          className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
        >
          Navigate to /admin
        </button>
        
        {user && (
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
          >
            Logout
          </button>
        )}
      </div>
      
      {debugInfo && (
        <div className="mt-4 p-2 bg-gray-800 rounded text-xs">
          <pre className="text-green-400 whitespace-pre-wrap">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AdminLoginTest;