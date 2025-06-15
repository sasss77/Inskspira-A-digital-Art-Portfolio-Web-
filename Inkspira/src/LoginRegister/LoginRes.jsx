import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const LoginRes = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors }
  } = useForm();

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    watch
  } = useForm();

  const watchPassword = watch('password');

  const onLoginSubmit = (data) => {
    console.log('Login data:', data);
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(data);
    console.log(storedUser);
    if (data.email === storedUser.email && data.password === storedUser.password) {

      // Handle login logic here
      alert("Login Successful");
      navigate("/");
    }
    else if (!(data.email === storedUser.email) && data.password === storedUser.password) {
      alert("Invalid Email");
    }
    else { 
      alert("Invalid Password");
    }
  };

  const onSignupSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    alert("Signup successful");
    console.log('Signup data:', data);
   
    // Handle signup logic here
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Shop', path: '/shop' },
    { name: 'Login/Register', path: '/loginRegister' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black text-white" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto'
    }}>
      {/* Navigation */}
      <nav className={`fixed w-full left-0 right-0 top-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/90 backdrop-blur-md shadow-xl shadow-red-900/20' : 'bg-transparent'
        }`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">I</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Inkspira
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group px-3 py-2 text-white hover:text-white transition-all duration-300 transform hover:scale-105 font-medium"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1 group relative z-50 bg-red-600/20 rounded-lg hover:bg-red-600/40 transition-all duration-300"
            >
              <span className={`w-6 h-0.5 bg-red-400 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-red-400 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-red-400 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-4 space-y-4 bg-black/50 backdrop-blur-sm rounded-lg mt-2">
              {['Home', 'Gallery', 'Shop', 'Login/Register', 'Contact'].map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`block px-4 py-2 transition-all duration-300 transform hover:translate-x-2 ${item === 'Login/Register' ? 'text-red-400 bg-red-900/20' : 'text-white hover:text-red-400 hover:bg-red-900/20'
                    }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center pt-20 pb-20" style={{ width: '100%' }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-800/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-700/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

          {/* Artistic Elements */}
          <div className="absolute top-1/4 right-1/4 w-2 h-20 bg-gradient-to-b from-red-600/30 to-transparent rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/4 w-2 h-20 bg-gradient-to-b from-red-600/30 to-transparent -rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/3 left-1/5 w-16 h-16 border-2 border-red-600/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-1/3 right-1/5 w-12 h-12 bg-red-600/10 rotate-45 animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          {/* Form Container */}
          <div className="bg-gradient-to-br from-gray-900/80 to-red-950/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-red-900/30 border border-red-900/30 overflow-hidden">
            {/* Artistic Header */}
            <div className="relative bg-gradient-to-r from-red-600/20 to-red-800/20 p-8 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-white">I</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-2">
                  {isLogin ? 'Welcome Back' : 'Join Inkspira'}
                </h1>
                <p className="text-gray-400">
                  {isLogin ? 'Sign in to your creative space' : 'Start your artistic journey'}
                </p>
              </div>
            </div>

            {/* Toggle Buttons */}
            <div className="flex bg-black/30 rounded-2xl m-6 p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${isLogin
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${!isLogin
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                Register
              </button>
            </div>

            {/* Forms */}
            <div className="px-6 pb-8">
              {isLogin ? (
                /* Login Form */
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...registerLogin('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-red-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 hover:border-red-600/50"
                        placeholder="Enter your email"
                      />
                      {loginErrors.email && (
                        <p className="mt-1 text-sm text-red-400">{loginErrors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        {...registerLogin('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-red-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 hover:border-red-600/50"
                        placeholder="Enter your password"
                      />
                      {loginErrors.password && (
                        <p className="mt-1 text-sm text-red-400">{loginErrors.password.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 text-gray-400 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 bg-gray-900 border-red-900/30 rounded focus:ring-red-600 text-red-600" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="text-red-400 hover:text-red-300 transition-colors duration-300">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleLoginSubmit(onLoginSubmit)}
                    className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-900/70"
                  >
                    Sign In
                  </button>
                </div>
              ) : (
                /* Register Form */
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          {...registerSignup('firstName', {
                            required: 'First name is required',
                            minLength: {
                              value: 2,
                              message: 'First name must be at least 2 characters'
                            }
                          })}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-red-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 hover:border-red-600/50"
                          placeholder="First name"
                        />
                        {signupErrors.firstName && (
                          <p className="mt-1 text-sm text-red-400">{signupErrors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          {...registerSignup('lastName', {
                            required: 'Last name is required',
                            minLength: {
                              value: 2,
                              message: 'Last name must be at least 2 characters'
                            }
                          })}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-red-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 hover:border-red-600/50"
                          placeholder="Last name"
                        />
                        {signupErrors.lastName && (
                          <p className="mt-1 text-sm text-red-400">{signupErrors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...registerSignup('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-red-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 hover:border-red-600/50"
                        placeholder="Enter your email"
                      />
                      {signupErrors.email && (
                        <p className="mt-1 text-sm text-red-400">{signupErrors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        {...registerSignup('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters'
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                            message: 'Password must contain uppercase, lowercase, and number'
                          }
                        })}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-red-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 hover:border-red-600/50"
                        placeholder="Create a strong password"
                      />
                      {signupErrors.password && (
                        <p className="mt-1 text-sm text-red-400">{signupErrors.password.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        {...registerSignup('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: value => value === watchPassword || 'Passwords do not match'
                        })}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-red-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 hover:border-red-600/50"
                        placeholder="Confirm your password"
                      />
                      {signupErrors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-400">{signupErrors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      {...registerSignup('terms', { required: 'You must accept the terms and conditions' })}
                      className="w-4 h-4 mt-1 bg-gray-900 border-red-900/30 rounded focus:ring-red-600 text-red-600"
                    />
                    <label className="text-sm text-gray-400">
                      I agree to the{' '}
                      <a href="#" className="text-red-400 hover:text-red-300 transition-colors duration-300">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-red-400 hover:text-red-300 transition-colors duration-300">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {signupErrors.terms && (
                    <p className="text-sm text-red-400">{signupErrors.terms.message}</p>
                  )}

                  <button
                    type="button"
                    onClick={handleSignupSubmit(onSignupSubmit)}
                    className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-900/70"
                  >
                    Create Account
                  </button>
                </div>
              )}

              {/* Social Login */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-red-900/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-900/50 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button className="flex justify-center items-center px-4 py-3 border border-red-900/30 rounded-xl text-gray-300 hover:bg-red-900/20 hover:border-red-600/50 transition-all duration-300 transform hover:scale-105">
                    <span className="text-xl mr-2">G</span>
                    Google
                  </button>
                  <button className="flex justify-center items-center px-4 py-3 border border-red-900/30 rounded-xl text-gray-300 hover:bg-red-900/20 hover:border-red-600/50 transition-all duration-300 transform hover:scale-105">
                    <span className="text-xl mr-2">f</span>
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        * {
          box-sizing: border-box;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          width: 100%;
          height: 100%;
        }
        
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default LoginRes;