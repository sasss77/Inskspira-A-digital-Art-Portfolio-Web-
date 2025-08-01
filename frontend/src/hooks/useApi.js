import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refreshAuth, logout } = useAuth();

  const executeApiCall = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      if (err.message.includes('401') && retryCount === 0) {
        try {
          await refreshAuth();
          return executeApiCall(1);
        } catch (refreshError) {
          logout();
          setError('Session expired. Please login again.');
        }
      } else {
        setError(err.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiCall) {
      executeApiCall();
    }
  }, dependencies);

  const refetch = () => executeApiCall();

  return { data, loading, error, refetch };
};

export const useApiMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshAuth, logout } = useAuth();

  const mutate = async (apiCall, retryCount = 0) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      if (err.message.includes('401') && retryCount === 0) {
        try {
          await refreshAuth();
          return mutate(apiCall, 1);
        } catch (refreshError) {
          logout();
          throw new Error('Session expired. Please login again.');
        }
      } else {
        setError(err.message || 'An error occurred');
        throw err;
      }
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};