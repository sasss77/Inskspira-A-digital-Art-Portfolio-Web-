// src/pages/CookiesPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

const CookiesPage = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  const cookieTypes = [
    {
      title: "Necessary Cookies",
      icon: "🔧",
      required: true,
      description: "Essential for the website to function properly. These cookies enable core functionality like security, network management, and accessibility.",
      examples: [
        "Authentication tokens to keep you logged in",
        "Security measures to protect against attacks",
        "Basic website functionality and navigation"
      ]
    },
    {
      title: "Functional Cookies",
      icon: "⚙️",
      required: false,
      description: "Enhance your experience by remembering your preferences and providing personalized features.",
      examples: [
        "Language and region preferences",
        "Theme settings (dark/light mode)",
        "Artwork display preferences"
      ]
    },
    {
      title: "Analytics Cookies",
      icon: "📊",
      required: false,
      description: "Help us understand how users interact with InkSpira so we can improve the platform.",
      examples: [
        "Page views and user navigation patterns",
        "Popular features and content",
        "Performance metrics and error tracking"
      ]
    },
    {
      title: "Marketing Cookies",
      icon: "📢",
      required: false,
      description: "Used to show you relevant content and advertisements based on your interests.",
      examples: [
        "Personalized artwork recommendations",
        "Social media integration features",
        "Third-party advertising services"
      ]
    }
  ];

  const handlePreferenceChange = (type, value) => {
    if (type === 'necessary') return; // Can't disable necessary cookies
    setCookiePreferences(prev => ({ ...prev, [type]: value }));
  };

  const savePreferences = () => {
    // In a real app, this would save to backend/localStorage
    localStorage.setItem('inkspira_cookie_preferences', JSON.stringify(cookiePreferences));
    alert('Cookie preferences saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-900/20 to-yellow-900/20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="cookies-shape cookies-shape-1"></div>
          <div className="cookies-shape cookies-shape-2"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8H5a2 2 0 00-2 2v10a2 2 0 002 2h2m8-12h2a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Cookie Policy
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn about the cookies we use to enhance your InkSpira experience and how you can control them.
          </p>
          
          <div className="mt-8 text-sm text-gray-400">
            <span>Last updated: January 29, 2025</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="mb-16 p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-orange-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Cookies are small text files stored on your device when you visit websites. They help us provide 
              you with a better, more personalized experience on InkSpira.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We're committed to transparency about how we use cookies and giving you control over your preferences.
            </p>
          </div>

          {/* Cookie Types */}
          <div className="space-y-8 mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Types of Cookies We Use</h2>
            
            {cookieTypes.map((cookie, index) => (
              <div
                key={index}
                className="cookies-section p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{cookie.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{cookie.title}</h3>
                      {cookie.required && (
                        <span className="inline-block mt-1 px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-medium rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {!cookie.required && (
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cookiePreferences[cookie.title.toLowerCase().split(' ')[0]]}
                        onChange={(e) => handlePreferenceChange(cookie.title.toLowerCase().split(' ')[0], e.target.checked)}
                        className="w-6 h-6 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                      />
                      <span className="ml-3 text-gray-300">Allow</span>
                    </label>
                  )}
                  
                  {cookie.required && (
                    <div className="text-gray-400 text-sm">Always Active</div>
                  )}
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {cookie.description}
                </p>
                
                <div>
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">Examples:</h4>
                  <ul className="space-y-2">
                    {cookie.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

       

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Managing Cookies</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                You can also manage cookies through your browser settings. Note that disabling certain 
                cookies may affect your experience on InkSpira.
              </p>
            </div>
            
            <div className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Third-Party Cookies</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Some cookies may be set by third-party services we use to enhance InkSpira. 
                These are governed by their respective privacy policies.
              </p>
            </div>
          </div>

      
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiesPage;
