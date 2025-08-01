import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginDebugger = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [debugInfo, setDebugInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAdminLogin = async () => {
    setLoading(true);
    setDebugInfo(null);
    
    try {
      console.log('🔍 Testing admin login...');
      
      const loggedInUser = await login('admin@gmail.com', 'admin123');
      
      const info = {
        loginSuccess: true,
        user: loggedInUser,
        userRole: loggedInUser?.role,
        isAdmin: loggedInUser?.role === 'admin',
        token: localStorage.getItem('inkspira_token'),
        currentPath: window.location.pathname
      };
      
      setDebugInfo(info);
      console.log('✅ Login test results:', info);
      
      if (loggedInUser?.role === 'admin') {
        console.log('🚀 Redirecting to /admin...');
        navigate('/admin');
      } else {
        console.log('❌ User is not admin, role:', loggedInUser?.role);
      }
      
    } catch (error) {
      console.error('❌ Login test failed:', error);
      setDebugInfo({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testDirectNavigation = () => {
    console.log('🔍 Testing direct navigation to /admin...');
    navigate('/admin');
  };

  return (
    <div className="fixed top-4 right-4 bg-black/90 border border-purple-500/50 rounded-lg p-4 max-w-sm z-50">
      <h3 className="text-purple-400 font-bold mb-3">🔧 Login Debugger</h3>
      
      <div className="space-y-2 mb-4 text-xs">
        <div className="text-gray-300">
          <strong>Current User:</strong> {user ? `${user.username} (${user.role})` : 'Not logged in'}
        </div>
        <div className="text-gray-300">
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
          onClick={testDirectNavigation}
          className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
        >
          Go to /admin
        </button>
      </div>
      
      {debugInfo && (
        <div className="mt-4 p-2 bg-gray-800 rounded text-xs">
          <pre className="text-green-400 whitespace-pre-wrap overflow-auto max-h-32">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default LoginDebugger;