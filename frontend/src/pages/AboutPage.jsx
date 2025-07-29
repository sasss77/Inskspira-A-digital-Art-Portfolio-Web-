// src/pages/AboutPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

const AboutPage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    {
      title: "Discover Art",
      icon: "🔍",
      description: "Explore thousands of stunning digital artworks from talented artists worldwide",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Share Creations",
      icon: "🎨",
      description: "Upload and showcase your digital masterpieces to a global creative community",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Connect Artists",
      icon: "🤝",
      description: "Follow your favorite artists, engage with their work, and build lasting connections",
      color: "from-pink-500 to-red-500"
    },
    {
      title: "Inspire Growth",
      icon: "🚀",
      description: "Get feedback, learn from others, and grow your artistic skills in a supportive environment",
      color: "from-red-500 to-orange-500"
    }
  ];

  const team = [
    {
      name: "Alex Rivera",
      role: "Founder & Creative Director",
      bio: "Digital artist turned entrepreneur, passionate about empowering creators worldwide.",
      avatar: "A",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Sam Chen",
      role: "Lead Developer",
      bio: "Full-stack developer with a love for beautiful, functional user experiences.",
      avatar: "S",
      color: "from-blue-500 to-purple-500"
    },
    {
      name: "Maya Patel",
      role: "Community Manager",
      bio: "Building bridges between artists and fostering a vibrant, inclusive creative community.",
      avatar: "M",
      color: "from-pink-500 to-red-500"
    },
    {
      name: "Jordan Kim",
      role: "Product Designer",
      bio: "Crafting intuitive interfaces that put artists and their work at the center of attention.",
      avatar: "J",
      color: "from-green-500 to-blue-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Digital Artworks", icon: "🖼️" },
    { number: "15K+", label: "Active Artists", icon: "👨‍🎨" },
    { number: "100K+", label: "Community Members", icon: "🌟" },
    { number: "25+", label: "Countries", icon: "🌍" }
  ];

  // Mouse tracking
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

  // Feature carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <Header />
      
      {/* Interactive Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full transition-all duration-500 ease-out opacity-30"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            background: `radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(40px)'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="about-shape about-shape-1"></div>
          <div className="about-shape about-shape-2"></div>
          <div className="about-shape about-shape-3"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                {/* Orbiting Elements */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute -top-2 left-1/2 w-3 h-3 bg-white/30 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute top-1/2 -right-2 w-2 h-2 bg-white/20 rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute -bottom-2 left-1/2 w-1.5 h-1.5 bg-white/40 rounded-full transform -translate-x-1/2"></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                About InkSpira
              </span>
            </h1>
            
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Where digital art meets infinite inspiration. We're building the future of creative expression, 
              one pixel at a time.
            </p>
          </div>

          {/* Feature Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-8">What Makes Us Special</h2>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    index === currentFeature
                      ? 'bg-gray-800/50 border-purple-500/50 scale-105'
                      : 'bg-gray-800/20 border-gray-700/50 hover:border-gray-600/50'
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`text-4xl p-3 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-20`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-purple-500/20">
                <div className="text-center">
                  <div className="text-8xl mb-6">{features[currentFeature].icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {features[currentFeature].title}
                  </h3>
                  <p className="text-gray-300 max-w-sm mx-auto">
                    {features[currentFeature].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                At InkSpira, we believe that every artist deserves a platform to shine. We're democratizing 
                digital art by creating a space where creativity flourishes, connections form, and artistic 
                dreams become reality.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Empower Artists</h3>
                  <p className="text-gray-400">Provide tools and platform for artists to showcase their talent</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Global Community</h3>
                  <p className="text-gray-400">Connect artists and art lovers from around the world</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Inspire Innovation</h3>
                  <p className="text-gray-400">Push the boundaries of digital art and creative expression</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-pink-900/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">InkSpira by the Numbers</h2>
            <p className="text-xl text-gray-300">Our growing community of digital artists and art enthusiasts</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Join Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="cta-shape cta-shape-1"></div>
          <div className="cta-shape cta-shape-2"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Join Our 
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Creative Universe</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're an artist looking to showcase your work or an art lover seeking inspiration, 
            InkSpira is your gateway to the world of digital creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="primary" size="large" className="w-full sm:w-auto">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Join InkSpira
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" size="large" className="w-full sm:w-auto">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explore Art
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
