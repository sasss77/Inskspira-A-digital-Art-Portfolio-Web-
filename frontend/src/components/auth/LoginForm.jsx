// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: { email: '', password: '' }
  });

  const navigate          = useNavigate();
  const { login }         = useAuth();
  const [loading, setLoading]       = useState(false);
  const [serverErr, setServerErr]   = useState('');
  const [showPw,  setShowPw]        = useState(false);

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    setServerErr('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setServerErr(err.response?.data?.message || 'Login failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="floating-orb orb-3" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent rotate-12" />
        <div
          className='absolute inset-0 opacity-40 bg-[url("data:image/svg+xml,%3Csvg%20width=%2760%27%20height=%2760%27%20viewBox=%270%200%2060%2060%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%239C92AC%27%20fill-opacity=%270.03%27%3E%3Ccircle%20cx=%2730%27%20cy=%2730%27%20r=%271%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'
        />
      </div>

      <div className="max-w-md w-full space-y-10 relative z-10">
        {/* header */}
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <span className="logo-cube" />
          </div>
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              Welcome Back
            </span>
          </h2>
          <p className="mt-2 text-gray-400">
            Sign in to your <span className="text-purple-400 font-medium">creative sanctuary</span>
          </p>
        </div>

        {/* form wrapper */}
        <div className="relative group">
          <div className="glow-ring" />
          <div className="glass-card">
            {serverErr && (
              <ErrorMessage message={serverErr} onClose={() => setServerErr('')} className="mb-6" />
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              {/* email */}
              <div>
                <label className="input-label">Email</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email'
                    }
                  })}
                  placeholder="you@example.com"
                  className={`input-field pl-12 ${errors.email && 'input-error'}`}
                />
                {/* icon */}
                <span className="absolute -mt-9 ml-4 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9" />
                  </svg>
                </span>
                {errors.email && <p className="error-msg">{errors.email.message}</p>}
              </div>

              {/* password */}
              <div className="relative">
                <label className="input-label">Password</label>
                <input
                  type={showPw ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password required',
                    minLength: { value: 6, message: 'Min 6 characters' }
                  })}
                  placeholder="••••••••"
                  className={`input-field pr-12 pl-12 ${errors.password && 'input-error'}`}
                />
                {/* lock icon */}
                <span className="absolute -mt-9 ml-4 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                {/* toggle */}
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="eye-toggle"
                  title={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.878 9.878L8.464 8.464m6.772 6.772L14.12 14.12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7" />
                    </svg>
                  )}
                </button>
                {errors.password && <p className="error-msg">{errors.password.message}</p>}
              </div>

              {/* remember / forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-400 space-x-2">
                  <input type="checkbox" className="h-4 w-4 text-purple-600 bg-gray-800 border-gray-600 rounded" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* submit */}
              <Button
                type="submit"
                loading={loading}
                disabled={!isValid || loading}
                className="w-full relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                  </svg>
                  <span>Sign In</span>
                </span>
              </Button>
            </form>

            {/* footer */}
            <p className="mt-8 text-center text-gray-400">
              New to InkSpira?{' '}
              <Link to="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
