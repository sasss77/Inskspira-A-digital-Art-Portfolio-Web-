// src/pages/TermsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const TermsPage = () => {
  const sections = [
    {
      title: "Using InkSpira",
      icon: "🎨",
      content: [
        {
          subtitle: "Eligibility",
          text: "You must be at least 13 years old to use InkSpira. By creating an account, you confirm that you meet this requirement and have the authority to agree to these terms."
        },
        {
          subtitle: "Account Responsibility",
          text: "You're responsible for maintaining the security of your account and all activities that occur under it. Choose a strong password and never share your login credentials."
        },
        {
          subtitle: "Acceptable Use",
          text: "Use InkSpira responsibly and respectfully. Don't upload harmful content, spam, or anything that violates others' rights. Our community thrives on creativity and mutual respect."
        }
      ]
    },
    {
      title: "Your Content & Rights",
      icon: "🖼️",
      content: [
        {
          subtitle: "Ownership",
          text: "You retain full ownership of the artworks and content you upload to InkSpira. We don't claim any ownership rights to your creative work."
        },
        {
          subtitle: "License to InkSpira",
          text: "By uploading content, you grant us a limited license to host, display, and share your work on the platform as per your privacy settings."
        },
        {
          subtitle: "Content Standards",
          text: "All content must be original or properly licensed. Respect copyright laws and don't upload content that infringes on others' intellectual property rights."
        }
      ]
    },
    {
      title: "Community Guidelines",
      icon: "🤝",
      content: [
        {
          subtitle: "Respectful Interaction",
          text: "Treat fellow artists and community members with respect. Constructive feedback is welcome, but harassment, bullying, or hate speech is not tolerated."
        },
        {
          subtitle: "Appropriate Content",
          text: "Keep content appropriate for a diverse, global community. Explicit, violent, or offensive material may be removed and could result in account suspension."
        },
        {
          subtitle: "Copyright Respect",
          text: "Only upload original work or content you have permission to use. Report any copyright violations you encounter on the platform."
        }
      ]
    },
    {
      title: "Platform Policies",
      icon: "📋",
      content: [
        {
          subtitle: "Service Availability",
          text: "We strive to keep InkSpira available 24/7, but may need to perform maintenance or updates. We'll notify users of any planned downtime when possible."
        },
        {
          subtitle: "Content Moderation",
          text: "We reserve the right to review and remove content that violates these terms or our community guidelines. Repeated violations may result in account suspension."
        },
        {
          subtitle: "Changes to Terms",
          text: "We may update these terms occasionally. We'll notify users of significant changes and provide time to review before they take effect."
        }
      ]
    },
    {
      title: "Limitation of Liability",
      icon: "⚖️",
      content: [
        {
          subtitle: "Service Disclaimer",
          text: "InkSpira is provided 'as is' without warranties. While we work hard to provide a great experience, we can't guarantee the service will always be error-free."
        },
        {
          subtitle: "User Responsibility",
          text: "You're responsible for backing up your important content. While we protect your data, we recommend keeping local copies of your valuable artworks."
        },
        {
          subtitle: "Dispute Resolution",
          text: "We prefer to resolve disputes amicably. If formal resolution is needed, disputes will be handled according to the laws of our jurisdiction."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="terms-shape terms-shape-1"></div>
          <div className="terms-shape terms-shape-2"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Fair, transparent guidelines that protect our creative community while fostering artistic expression and collaboration.
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
          <div className="mb-16 p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to InkSpira's Terms of Service</h2>
            <p className="text-gray-300 leading-relaxed">
              These terms govern your use of InkSpira, our digital art platform. By creating an account or using our services, 
              you agree to these terms. We've written them to be as clear and fair as possible while protecting both 
              you and our creative community.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div
                key={index}
                className="terms-section"
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
                      className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold text-purple-400 mb-3">
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

export default TermsPage;
