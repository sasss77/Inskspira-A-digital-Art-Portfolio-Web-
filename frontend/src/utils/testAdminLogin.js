// Test admin login from frontend
import apiService from '../services/apiService';

export const testAdminLogin = async () => {
  try {
    console.log('🔍 Testing admin login from frontend...');
    
    const response = await apiService.login('admin@gmail.com', 'admin123');
    
    console.log('✅ Login response received:');
    console.log('- Success:', response.success);
    console.log('- Message:', response.message);
    console.log('- User data:', response.data?.user);
    console.log('- User role:', response.data?.user?.role);
    console.log('- Token received:', response.data?.token ? 'Yes' : 'No');
    
    if (response.data?.user?.role === 'admin') {
      console.log('✅ Admin role confirmed - should redirect to /admin');
    } else {
      console.log('❌ Admin role not found or incorrect');
    }
    
    return response.data?.user;
    
  } catch (error) {
    console.error('❌ Login test failed:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

// Usage: Call this function from browser console
// testAdminLogin().then(user => console.log('Final user:', user));