import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCamera,
  FiLock,
  FiSave,
  FiEye,
  FiEyeOff,
} = FiIcons;

const HostProfile = () => {
  const { t } = useLanguage();
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    description: '',
    avatar: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        businessName: user.businessName || '',
        businessAddress: user.businessAddress || '',
        businessPhone: user.businessPhone || '',
        description: user.description || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateProfileForm = () => {
    const newErrors = {};

    if (!profileData.name) {
      newErrors.name = t('error.required');
    }

    if (!profileData.email) {
      newErrors.email = t('error.required');
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = t('error.email');
    }

    if (!profileData.businessName) {
      newErrors.businessName = t('error.required');
    }

    if (!profileData.businessAddress) {
      newErrors.businessAddress = t('error.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = t('error.required');
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = t('error.required');
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = t('error.minLength', { min: 6 });
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = t('error.required');
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = t('error.passwordMismatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfileForm()) return;

    setLoading(true);
    try {
      const result = await updateProfile(profileData);
      if (result.success) {
        // Success handled by context
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    setLoading(true);
    try {
      // Mock password update - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPasswordForm(false);
    } catch (error) {
      console.error('Error updating password:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Mock file upload - replace with actual upload logic
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          avatar: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('nav.profile')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your personal and business information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture */}
          <Card>
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  {profileData.avatar ? (
                    <img
                      src={profileData.avatar}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-primary-500 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {profileData.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full cursor-pointer hover:bg-primary-600 transition-colors">
                    <SafeIcon icon={FiCamera} className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {profileData.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {profileData.businessName}
              </p>
            </div>
          </Card>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                {t('profile.personalInfo')}
              </h3>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label={t('auth.fullName')}
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    error={errors.name}
                    icon={FiUser}
                    required
                  />
                  <Input
                    label={t('auth.email')}
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    error={errors.email}
                    icon={FiMail}
                    required
                  />
                </div>
                <Input
                  label={t('auth.phone')}
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  icon={FiPhone}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('common.description')}
                  </label>
                  <textarea
                    name="description"
                    value={profileData.description}
                    onChange={handleProfileChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Tell guests about yourself..."
                  />
                </div>
                <Button
                  type="submit"
                  loading={loading}
                  icon={FiSave}
                >
                  {t('common.save')}
                </Button>
              </form>
            </Card>

            {/* Business Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                {t('profile.businessInfo')}
              </h3>
              <div className="space-y-4">
                <Input
                  label={t('auth.businessName')}
                  name="businessName"
                  value={profileData.businessName}
                  onChange={handleProfileChange}
                  error={errors.businessName}
                  icon={FiUser}
                  required
                />
                <Input
                  label={t('auth.businessAddress')}
                  name="businessAddress"
                  value={profileData.businessAddress}
                  onChange={handleProfileChange}
                  error={errors.businessAddress}
                  icon={FiMapPin}
                  required
                />
                <Input
                  label={t('auth.businessPhone')}
                  name="businessPhone"
                  value={profileData.businessPhone}
                  onChange={handleProfileChange}
                  icon={FiPhone}
                />
              </div>
            </Card>

            {/* Change Password */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('profile.changePassword')}
                </h3>
                <Button
                  variant="outline"
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  icon={FiLock}
                >
                  {showPasswordForm ? t('common.cancel') : t('profile.changePassword')}
                </Button>
              </div>

              {showPasswordForm && (
                <motion.form
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handlePasswordSubmit}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Input
                      label={t('profile.currentPassword')}
                      name="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      error={errors.currentPassword}
                      icon={FiLock}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <SafeIcon icon={showCurrentPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      label={t('profile.newPassword')}
                      name="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      error={errors.newPassword}
                      icon={FiLock}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <SafeIcon icon={showNewPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      label={t('profile.confirmNewPassword')}
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      error={errors.confirmPassword}
                      icon={FiLock}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <SafeIcon icon={showConfirmPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                    </button>
                  </div>

                  <Button
                    type="submit"
                    loading={loading}
                    icon={FiSave}
                  >
                    Update Password
                  </Button>
                </motion.form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HostProfile;