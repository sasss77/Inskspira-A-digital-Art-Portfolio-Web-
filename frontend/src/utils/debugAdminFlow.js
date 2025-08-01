// Debug admin login and redirection flow
import { testAdminLogin } from './testAdminLogin';

// Add this to your browser console to debug the admin login flow
export const debugAdminFlow = async () => {
  console.log('🔍 Starting comprehensive admin flow debug...');
  
  try {
    // Step 1: Test login
    console.log('\n📝 Step 1: Testing admin login...');
    const user = await testAdminLogin();
    
    // Step 2: Check localStorage
    console.log('\n📝 Step 2: Checking localStorage...');
    const token = localStorage.getItem('inkspira_token');
    console.log('- Token in localStorage:', token ? 'Present' : 'Missing');
    
    // Step 3: Check AuthContext state
    console.log('\n📝 Step 3: Checking AuthContext state...');
    // This would need to be called from a React component
    console.log('- User from login response:', user);
    
    // Step 4: Test route protection
    console.log('\n📝 Step 4: Testing route protection...');
    console.log('- Current URL:', window.location.href);
    console.log('- Expected redirect: /admin');
    
    // Step 5: Manual navigation test
    console.log('\n📝 Step 5: Testing manual navigation...');
    console.log('Try navigating to /admin manually:');
    console.log('window.location.href = "/admin"');
    
    return {
      user,
      token: !!token,
      currentUrl: window.location.href
    };
    
  } catch (error) {
    console.error('❌ Debug flow failed:', error);
    return { error: error.message };
  }
};

// Usage instructions
console.log(`
🔧 Admin Debug Tools Available:

1. Test login: testAdminLogin()
2. Full debug: debugAdminFlow()
3. Manual navigation: window.location.href = "/admin"
4. Check auth state: Check React DevTools for AuthContext

Run these in the browser console while on the frontend.
`);

// Export for global access
if (typeof window !== 'undefined') {
  window.debugAdminFlow = debugAdminFlow;
  window.testAdminLogin = testAdminLogin;
}