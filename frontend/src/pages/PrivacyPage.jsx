// src/pages/PrivacyPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const PrivacyPage = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: "📊",
      content: [
        {
          subtitle: "Account Information",
          text: "When you create an account, we collect your username, email address, and chosen role (artist or viewer). Your profile information helps us personalize your InkSpira experience."
        },
        {
          subtitle: "Artwork & Content",
          text: "We store the digital artworks you upload, including titles, descriptions, tags, and associated metadata. This content remains yours - we simply host it to share with the community."
        },
        {
          subtitle: "Usage Data",
          text: "We collect information about how you interact with InkSpira, including pages visited, features used, and time spent on the platform to improve our services."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: "🛡️",
      content: [
        {
          subtitle: "Platform Services",
          text: "We use your information to provide, maintain, and improve InkSpira's features, including artwork hosting, discovery algorithms, and community features."
        },
        {
          subtitle: "Communication",
          text: "We may send you important updates about your account, new features, and community guidelines. You can opt out of non-essential communications anytime."
        },
        {
          subtitle: "Safety & Security",
          text: "We use your information to detect and prevent abuse, protect the community, and maintain the security of our platform."
        }
      ]
    },
    {
      title: "Information Sharing",
      icon: "🤝",
      content: [
        {
          subtitle: "Public Content",
          text: "Artworks you mark as public are visible to all InkSpira users and visitors. Your username and public profile information are also visible to the community."
        },
        {
          subtitle: "Third-Party Services",
          text: "We use trusted third-party services for hosting, analytics, and communication. These partners are bound by strict data protection agreements."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law or to protect the rights, property, or safety of InkSpira, our users, or others."
        }
      ]
    },
    {
      title: "Your Rights & Controls",
      icon: "⚙️",
      content: [
        {
          subtitle: "Access & Portability",
          text: "You can access, download, or export your data at any time through your account settings. Your artwork remains yours, and you can remove it whenever you choose."
        },
        {
          subtitle: "Privacy Settings",
          text: "Control who can see your artworks, follow you, and interact with your content through comprehensive privacy settings in your profile."
        },
        {
          subtitle: "Account Deletion",
          text: "You can delete your account at any time. We'll remove your personal information while keeping anonymized data for platform improvement."
        }
      ]
    },
    {
      title: "Data Security",
      icon: "🔒",
      content: [
        {
          subtitle: "Encryption",
          text: "All data is encrypted in transit and at rest using industry-standard security measures. Your passwords are hashed and never stored in plain text."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls and regular security audits to ensure only authorized personnel can access user data when necessary."
        },
        {
          subtitle: "Incident Response",
          text: "In the unlikely event of a security incident, we'll notify affected users promptly and take immediate steps to secure the platform."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="privacy-shape privacy-shape-1"></div>
          <div className="privacy-shape privacy-shape-2"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your privacy matters to us. Learn how we protect and use your information to create a safe, creative space for digital artists.
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
          <div className="mb-16 p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-blue-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to InkSpira's Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              At InkSpira, we believe that privacy is a fundamental right. This policy explains how we collect, 
              use, and protect your information when you use our digital art platform. We're committed to 
              transparency and giving you control over your data.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div
                key={index}
                className="privacy-section"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className="text-4xl">{section.icon}</div>
                  <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold text-blue-400 mb-3">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

      
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
