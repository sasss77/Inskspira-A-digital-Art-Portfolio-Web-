// src/pages/GuidelinesPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const GuidelinesPage = () => {
  const [activeSection, setActiveSection] = useState(0);

  const guidelines = [
    {
      title: "Respect & Kindness",
      icon: "🤝",
      color: "from-blue-500 to-purple-500",
      rules: [
        {
          do: "Treat all community members with respect and kindness",
          dont: "Engage in harassment, bullying, or discriminatory behavior"
        },
        {
          do: "Provide constructive feedback that helps artists grow",
          dont: "Leave harsh criticism without offering helpful suggestions"
        },
        {
          do: "Celebrate diversity in artistic styles and cultural backgrounds",
          dont: "Make offensive comments about race, gender, religion, or identity"
        },
        {
          do: "Report inappropriate behavior to our moderation team",
          dont: "Engage in public arguments or flame wars"
        }
      ]
    },
    {
      title: "Original Content",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      rules: [
        {
          do: "Share your own original digital artworks and creations",
          dont: "Upload copyrighted material without permission"
        },
        {
          do: "Credit original artists when sharing inspiration or references",
          dont: "Claim others' work as your own"
        },
        {
          do: "Use royalty-free resources and properly license any stock elements",
          dont: "Ignore copyright laws and intellectual property rights"
        },
        {
          do: "Report suspected copyright violations to help protect artists",
          dont: "Distribute pirated software or resources"
        }
      ]
    },
    {
      title: "Appropriate Content",
      icon: "🛡️",
      color: "from-pink-500 to-red-500",
      rules: [
        {
          do: "Keep content suitable for a diverse, global audience",
          dont: "Post explicit, violent, or disturbing imagery"
        },
        {
          do: "Use appropriate titles and descriptions for your artworks",
          dont: "Include offensive language or inappropriate tags"
        },
        {
          do: "Mark sensitive content appropriately if borderline",
          dont: "Share content that promotes hate, violence, or illegal activities"
        },
        {
          do: "Consider the impact your content might have on others",
          dont: "Post spam, misleading information, or off-topic content"
        }
      ]
    },
    {
      title: "Community Engagement",
      icon: "💬",
      color: "from-red-500 to-orange-500",
      rules: [
        {
          do: "Engage meaningfully with other artists' work through likes and comments",
          dont: "Spam comments or engage in self-promotional behavior excessively"
        },
        {
          do: "Participate in community challenges and events",
          dont: "Manipulate voting systems or create fake accounts"
        },
        {
          do: "Share knowledge and techniques to help others learn",
          dont: "Gate-keep information or be elitist about artistic skills"
        },
        {
          do: "Build genuine connections and friendships",
          dont: "Use the platform solely for commercial promotion without engagement"
        }
      ]
    },
    {
      title: "Platform Integrity",
      icon: "🔒",
      color: "from-orange-500 to-yellow-500",
      rules: [
        {
          do: "Use InkSpira as intended for sharing and discovering digital art",
          dont: "Attempt to hack, exploit, or abuse platform features"
        },
        {
          do: "Report bugs and security issues responsibly",
          dont: "Share or exploit vulnerabilities to gain unauthorized access"
        },
        {
          do: "Respect the privacy and personal information of other users",
          dont: "Doxx, stalk, or share personal information without consent"
        },
        {
          do: "Follow all applicable laws and regulations",
          dont: "Use the platform for illegal activities or money laundering"
        }
      ]
    }
  ];

  const consequences = [
    {
      level: "Warning",
      description: "First-time minor violations receive a friendly reminder",
      icon: "⚠️",
      color: "text-yellow-400"
    },
    {
      level: "Content Removal",
      description: "Violating content may be removed with explanation",
      icon: "🗑️",
      color: "text-orange-400"
    },
    {
      level: "Temporary Suspension",
      description: "Repeated violations may result in temporary account restrictions",
      icon: "⏸️",
      color: "text-red-400"
    },
    {
      level: "Permanent Ban",
      description: "Severe or repeated violations may result in permanent account termination",
      icon: "🚫",
      color: "text-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900/20 to-blue-900/20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="guidelines-shape guidelines-shape-1"></div>
          <div className="guidelines-shape guidelines-shape-2"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Community Guidelines
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Building a safe, supportive, and inspiring environment where every artist can thrive and create freely.
          </p>
          
          <div className="mt-8 text-sm text-gray-400">
            <span>Last updated: January 29, 2025</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="mb-16 p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-green-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to Our Creative Community</h2>
            <p className="text-gray-300 leading-relaxed">
              InkSpira thrives because of our amazing community of artists and art lovers. These guidelines 
              help ensure everyone can express their creativity safely and respectfully. By following these 
              principles, we create an environment where art and artists flourish together.
            </p>
          </div>

          {/* Guidelines Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
            {/* Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-2">
                <h3 className="text-lg font-bold text-white mb-4">Quick Navigation</h3>
                {guidelines.map((guideline, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      activeSection === index
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{guideline.icon}</span>
                      <span className="font-medium">{guideline.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {guidelines.map((guideline, index) => (
                <div
                  key={index}
                  className={`mb-12 transition-all duration-500 ${
                    activeSection === index ? 'opacity-100' : 'opacity-30'
                  }`}
                  style={{ display: activeSection === index ? 'block' : 'none' }}
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${guideline.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                      {guideline.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-white">{guideline.title}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {guideline.rules.map((rule, ruleIndex) => (
                      <div
                        key={ruleIndex}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        {/* Do */}
                        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-green-400 font-semibold mb-2">Do:</h4>
                              <p className="text-gray-300 text-sm leading-relaxed">{rule.do}</p>
                            </div>
                          </div>
                        </div>

                        {/* Don't */}
                        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-red-400 font-semibold mb-2">Don't:</h4>
                              <p className="text-gray-300 text-sm leading-relaxed">{rule.dont}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consequences Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Enforcement & Consequences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {consequences.map((consequence, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 text-center hover:border-gray-600/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`text-4xl mb-4 ${consequence.color}`}>
                    {consequence.icon}
                  </div>
                  <h3 className={`text-lg font-bold mb-3 ${consequence.color}`}>
                    {consequence.level}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {consequence.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

 

          {/* Footer CTA */}
          <div className="text-center p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-green-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Be Part of Our Community?</h2>
            <p className="text-gray-300 mb-6">
              By following these guidelines, you help make InkSpira a welcoming space for all artists and art lovers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105">
                  Join InkSpira
                </button>
              </Link>
              <Link to="/about">
                <button className="px-8 py-3 border border-green-500 text-green-400 hover:bg-green-500/10 font-medium rounded-xl transition-colors duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GuidelinesPage;
