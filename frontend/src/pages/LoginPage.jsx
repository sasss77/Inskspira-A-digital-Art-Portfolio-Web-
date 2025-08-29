// src/pages/LoginPage.jsx
  import React, { useState, useEffect } from 'react';
  import { Link, useNavigate, useLocation } from 'react-router-dom';
  import { useForm } from 'react-hook-form';
  import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';


  const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors, isValid }
    } = useForm({
      mode: 'onChange',
      defaultValues: { 
        email: location.state?.email || '', 
        password: '' 
      }
    });
  const { login } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentArtwork, setCurrentArtwork] = useState(0);

    // Sample artworks for background carousel
    const artworks = [
      { 
        url: '/api/placeholder/1920/1080',
        title: 'Digital Dreams',
        artist: 'ArtisticSoul'
      },
      { 
        url: '/api/placeholder/1920/1080',
        title: 'Neon Fantasy',
        artist: 'CyberArtist'
      },
      { 
        url: '/api/placeholder/1920/1080',
        title: 'Abstract Reality',
        artist: 'ColorMaster'
      }
    ];

    // Mouse tracking for interactive effects
    useEffect(() => {
      const handleMouseMove = (e) => {
        setMousePosition({ 
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Artwork carousel
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentArtwork((prev) => (prev + 1) % artworks.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    // Show signup success message
    useEffect(() => {
      if (location.state?.message) {
        showSuccess(location.state.message);
        // Clear the state to prevent showing the message again on refresh
        window.history.replaceState({}, document.title);
      }
    }, [location.state, showSuccess]);

    const onSubmit = async ({ email, password }) => {
    setLoading(true);
    setServerError('');
    try {
      const user = await login(email, password);
      showSuccess('Welcome back! Login successful.');
      // Redirect admin users to admin panel, others to home
      if (user && user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed, please try again.';
      setServerError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

    return (
      <div className="min-h-screen relative overflow-hidden bg-black">
        {/* Dynamic Background with Artwork Carousel */}
        <div className="absolute inset-0">
          {artworks.map((artwork, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentArtwork ? 'opacity-40' : 'opacity-0'
              }`}
            >
              <img
                src={artwork.url}
                alt={artwork.title}
                className="w-full h-full object-cover filter blur-sm scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-black/60 to-pink-900/80"></div>
            </div>
          ))}
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="login-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>

        {/* Interactive Gradient Following Mouse */}
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            background: `radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(236,72,153,0.2) 50%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(40px)'
          }}
        />

        {/* Main Content */}
        <div className="relative z-20 min-h-screen flex">
          {/* Left Side - Branding & Artwork Info */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12">
            {/* Logo & Brand */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {/* <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl rotate-12 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl -rotate-12 opacity-70 blur-sm"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  </div> */}
                </div>
           
                <Link
  to="/"
  className="inline-flex items-center space-x-4 group mb-6 transition-transform hover:scale-105"
  aria-label="Go to Home"
>
  <div className="relative">
    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl rotate-12 shadow-2xl" />
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl -rotate-12 opacity-70 blur-sm"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="w-8 h-8 text-white z-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </div>
  </div>
  <div>
    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
      InkSpira
    </h1>
    <p className="text-gray-400 font-light">Digital Art Universe</p>
  </div>
</Link>


              </div>
            </div>

            {/* Current Artwork Info */}
            <div className="space-y-4">
              <div className="p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/20">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {artworks[currentArtwork].title}
                </h3>
                <p className="text-purple-400 mb-4">by {artworks[currentArtwork].artist}</p>
                <div className="flex space-x-2">
                  {artworks.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentArtwork ? 'bg-purple-400 w-8' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="relative">
              <div className="text-2xl text-white font-light italic leading-relaxed">
                "Art is not what you see, but what you make others see."
              </div>
              <div className="text-purple-400 mt-4 font-medium">— Edgar Degas</div>
              <div className="absolute -left-4 -top-4 text-6xl text-purple-500/20 font-serif">"</div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
{/* Mobile Logo (now clickable to go home) */}
<div className="lg:hidden text-center mb-8">
  <Link
    to="/"
    className="inline-flex items-center space-x-3 mb-4 group transition-transform hover:scale-105"
    aria-label="Go to Home"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>
    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      InkSpira
    </h1>
  </Link>
</div>


              {/* Form Container */}
              <div className="relative group">
                {/* Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 rounded-3xl blur-lg opacity-50 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Form Background */}
                <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-8 border border-purple-500/20 shadow-2xl">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Welcome Back, Artist
                    </h2>
                    <p className="text-gray-400">
                      Continue your creative journey
                    </p>
                  </div>

                  {serverError && (
                    <div className="mb-6">
                      <ErrorMessage message={serverError} onClose={() => setServerError('')} />
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Email Address
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <input
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className={`relative w-full px-4 py-3 bg-gray-900/50 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 backdrop-blur-sm ${
                            errors.email 
                              ? 'border-red-500/50 focus:border-red-500' 
                              : 'border-gray-600/50 focus:border-purple-500 hover:border-gray-500/50'
                          }`}
                          placeholder="your@email.com"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        </div>
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1 animate-pulse">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          {...register('password', {
                            required: 'Password is required',
                            minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters'
                            }
                          })}
                          className={`relative w-full px-4 py-3 pr-12 bg-gray-900/50 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 backdrop-blur-sm ${
                            errors.password 
                              ? 'border-red-500/50 focus:border-red-500' 
                              : 'border-gray-600/50 focus:border-purple-500 hover:border-gray-500/50'
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                        >
                          {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-sm mt-1 animate-pulse">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-purple-600 bg-gray-900 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-300">Remember me</span>
                      </label>
                      {/* <Link 
                        to="/forgot-password" 
                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300"
                      >
                        Forgot password?
                      </Link> */}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="large"
                      className="w-full relative overflow-hidden group"
                      loading={loading}
                      disabled={!isValid || loading}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                        </svg>
                        <span>Enter the Universe</span>
                      </span>
                    </Button>

                    {/* Divider */}
                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-black/60 text-gray-400">New to the universe?</span>
                      </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                      <Link 
                        to="/signup" 
                        className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-all duration-300 group text-lg font-medium"
                      >
                        <span>Join the Creative Community</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default LoginPage;
