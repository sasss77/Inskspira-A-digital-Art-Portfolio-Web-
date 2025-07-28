// src/components/auth/SignupForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'viewer'
    }
  });

  const navigate  = useNavigate();
  const { signup } = useAuth();

  const [serverError, setServerError] = useState('');
  const [loading,     setLoading]     = useState(false);
  const [showPw,      setShowPw]      = useState(false);

  const onSubmit = async values => {
    setLoading(true);
    setServerError('');
    try {
      await signup(values);
      navigate('/');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Signup failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ────────────────────────────── */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="floating-orb orb-3" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent rotate-12" />
        <div
          className='absolute inset-0 opacity-40 bg-[url("data:image/svg+xml,%3Csvg%20width=%2760%27%20height=%2760%27%20viewBox=%270%200%2060%2060%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%239C92AC%27%20fill-opacity=%270.03%27%3E%3Ccircle%20cx=%2730%27%20cy=%2730%27%20r=%271%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'
        />
      </div>

      <div className="max-w-lg w-full space-y-10 relative z-10">
        {/* header */}
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <span className="logo-cube" />
          </div>
          <h2 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              Create Account
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Join the <span className="text-purple-400 font-medium">InkSpira</span> community
          </p>
        </div>

        {/* form wrapper */}
        <div className="relative group">
          <div className="glow-ring" />
          <div className="glass-card">
            {serverError && (
              <ErrorMessage message={serverError} onClose={() => setServerError('')} className="mb-6" />
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              {/* username */}
              <div>
                <label className="input-label">Username</label>
                <input
                  {...register('username', {
                    required: 'Username required',
                    minLength: { value: 2, message: 'Min 2 characters' }
                  })}
                  placeholder="e.g. ArtWizard"
                  className={`input-field ${errors.username && 'input-error'}`}
                />
                {errors.username && <p className="error-msg">{errors.username.message}</p>}
              </div>

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
                  className={`input-field ${errors.email && 'input-error'}`}
                />
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
                  className={`input-field pr-12 ${errors.password && 'input-error'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="eye-toggle"
                  title={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029M9.878 9.878l4.242 4.242m0-4.242L9.878 14.12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7C7.523 19 3.732 16.057 2.458 12z" />
                    </svg>
                  )}
                </button>
                {errors.password && <p className="error-msg">{errors.password.message}</p>}
              </div>

              {/* confirm password */}
              <div>
                <label className="input-label">Confirm Password</label>
                <input
                  type="password"
                  {...register('confirmPassword', {
                    validate: v => v === watch('password') || 'Passwords do not match'
                  })}
                  placeholder="repeat password"
                  className={`input-field ${errors.confirmPassword && 'input-error'}`}
                />
                {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword.message}</p>}
              </div>

              {/* role */}
              <div>
                <label className="input-label">Role</label>
                <select {...register('role')} className="input-field">
                  <option value="viewer">Viewer</option>
                  <option value="artist">Artist</option>
                </select>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create Account</span>
                </span>
              </Button>
            </form>

            {/* footer */}
            <p className="mt-8 text-center text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
