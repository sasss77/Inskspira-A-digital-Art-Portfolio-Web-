// src/pages/ProfilePage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import UserProfile from '../components/user/UserProfile';

const ProfilePage = () => {
  const { userId } = useParams();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="profile-page-content">
        <UserProfile userId={userId} />
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
