// src/components/user/EditProfile.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../common/Modal';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

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

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');

    try {
      // API call to update profile
      // const updatedUser = await userService.updateProfile(user.id, data);
      
      // Simulate API call
      setTimeout(() => {
        const updatedUser = { ...user, ...data };
        onUpdate(updatedUser);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to update profile');
      setLoading(false);
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
              <div className="w-full h-full rounded-2xl bg-gray-800 flex items-center justify-center text-2xl font-bold text-white">
                {user.username[0].toUpperCase()}
              </div>
            </div>
            <Button variant="outline" size="small">
              Change Photo
            </Button>
          </div>

          {/* Username */}
          <div>
            <label className="input-label">Username</label>
            <input
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters'
                }
              })}
              className={`input-field ${errors.username && 'input-error'}`}
              placeholder="Your username"
            />
            {errors.username && (
              <p className="error-msg">{errors.username.message}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="input-label">Bio</label>
            <textarea
              {...register('bio', {
                maxLength: {
                  value: 500,
                  message: 'Bio cannot exceed 500 characters'
                }
              })}
              rows={4}
              className={`input-field resize-none ${errors.bio && 'input-error'}`}
              placeholder="Tell us about yourself..."
            />
            {errors.bio && (
              <p className="error-msg">{errors.bio.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="input-label">Location</label>
            <input
              {...register('location')}
              className="input-field"
              placeholder="e.g. San Francisco, CA"
            />
          </div>

          {/* Website */}
          <div>
            <label className="input-label">Website</label>
            <input
              type="url"
              {...register('website', {
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'Please enter a valid URL'
                }
              })}
              className={`input-field ${errors.website && 'input-error'}`}
              placeholder="https://your-portfolio.com"
            />
            {errors.website && (
              <p className="error-msg">{errors.website.message}</p>
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
