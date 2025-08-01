// src/components/user/EditProfile.jsx
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../common/Modal';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import apiService from '../../services/api';

const EditProfile = ({ user, onClose, onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: user.username || '',
      bio: user.bio || '',
      location: user.location || '',
      website: user.website || ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [profileImage, setProfileImage] = useState(user.profileImageUrl || null); // State for profile image preview
  const fileInputRef = useRef(null); // Ref for the hidden file input

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');

    try {
      const response = await apiService.updateProfile(data);
      const updatedUser = { ...user, ...response.user, profileImageUrl: profileImage };
      onUpdate(updatedUser);
      setLoading(false);
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to update profile');
      setLoading(false);
    }
  };

  // Handler for when the "Change Photo" button is clicked
  const handleImageClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

  // Handler for when a file is selected
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the selected file to display as a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the base64 string as the image source
      };
      reader.readAsDataURL(file);

      // In a real application, you would upload this 'file' to a storage service
      // and then update the user's profileImageUrl with the returned URL.
      // For this simulation, we're just updating the local state.
      console.log('Selected file:', file.name);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Edit Profile"
      size="large"
    >
      <div className="space-y-6">
        {serverError && (
          <ErrorMessage
            message={serverError}
            onClose={() => setServerError('')}
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-1 mb-4">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-gray-800 flex items-center justify-center text-2xl font-bold text-white">
                  {user.username[0].toUpperCase()}
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" // Keep the input hidden
              accept="image/*" // Accept only image files
            />
            <Button variant="outline" size="small" onClick={handleImageClick}>
              Change Photo
            </Button>
          </div>

          {/* Username */}
          <div className="mb-6">
            <label className="block mb-2 text-purple-300 font-semibold text-base tracking-wide">
              Username
            </label>
            <input
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters'
                }
              })}
              className={`
                w-full px-4 py-3 rounded-xl border-2
                bg-gray-900/80 text-white font-medium
                placeholder-gray-400
                border-gray-700 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-300/30
                hover:border-purple-400
                transition-all duration-200
                ${errors.username ? 'border-red-500 bg-red-500/10' : ''}
              `}
              placeholder="Your username"
              autoComplete="off"
            />
            {errors.username && (
              <p className="text-red-400 font-medium mt-2">{errors.username.message}</p>
            )}
          </div>


          {/* Bio */}
          <div className="mb-6">
            <label className="block mb-2 text-purple-300 font-semibold text-base tracking-wide">
              Bio
            </label>
            <textarea
              {...register('bio', {
                maxLength: {
                  value: 500,
                  message: 'Bio cannot exceed 500 characters'
                }
              })}
              rows={4}
              className={`
                w-full px-4 py-3 rounded-xl border-2 resize-none
                bg-gray-900/80 text-white font-medium
                placeholder-gray-400
                border-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300/20
                hover:border-purple-400
                transition-all duration-200
                ${errors.bio ? 'border-red-500 bg-red-500/10' : ''}
              `}
              placeholder="Tell us about yourself..."
            />
            {errors.bio && (
              <p className="text-red-400 font-medium mt-2">{errors.bio.message}</p>
            )}
          </div>


          {/* Location */}
          <div className="mb-6">
            <label className="block mb-2 text-purple-300 font-semibold text-base tracking-wide">
              Location
            </label>
            <input
              {...register('location')}
              className="
                w-full px-4 py-3 rounded-xl border-2
                bg-gray-900/80 text-white font-medium
                placeholder-gray-400
                border-gray-700 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300/20
                hover:border-pink-400
                transition-all duration-200
              "
              placeholder="e.g. San Francisco, CA"
              autoComplete="off"
            />
          </div>

          {/* Website */}
          <div className="mb-6">
            <label className="block mb-2 text-purple-300 font-semibold text-base tracking-wide">
              Website
            </label>
            <input
              type="url"
              {...register('website', {
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'Please enter a valid URL'
                }
              })}
              className={`
                w-full px-4 py-3 rounded-xl border-2
                bg-gray-900/80 text-white font-medium
                placeholder-gray-400
                border-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300/20
                hover:border-purple-400
                transition-all duration-200
                ${errors.website ? 'border-red-500 bg-red-500/10' : ''}
              `}
              placeholder="https://your-portfolio.com"
              autoComplete="off"
            />
            {errors.website && (
              <p className="text-red-400 font-medium mt-2">{errors.website.message}</p>
            )}
          </div>


          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={!isValid || loading}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfile;