import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../hooks/useRole';
import Button from '../components/common/Button';

const AccessDeniedPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userRole } = useRole();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-300 mb-4">
            You don't have permission to access this page.
          </p>
          
          {user ? (
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400 mb-2">
                Current role: <span className="text-white font-medium capitalize">{userRole}</span>
              </p>
              <p className="text-sm text-gray-400">
                Contact an administrator if you believe this is an error.
              </p>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400">
                You need to be logged in to access this page.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {!user ? (
            <>
              <Link to="/login" className="block">
                <Button variant="primary" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" className="block">
                <Button variant="outline" className="w-full">
                  Create Account
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button 
                variant="primary" 
                onClick={handleGoHome}
                className="w-full"
              >
                Go to Homepage
              </Button>
              <Button 
                variant="outline" 
                onClick={handleGoBack}
                className="w-full"
              >
                Go Back
              </Button>
            </>
          )}
        </div>

        {/* Help text */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            Need help? <Link to="/contact" className="text-blue-400 hover:text-blue-300">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;