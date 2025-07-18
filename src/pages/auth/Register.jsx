import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiMoon, FiSun, FiGlobe, FiMapPin, FiPhone } = FiIcons;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessAddress: '',
    businessPhone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = t('error.required');
    }

    if (!formData.email) {
      newErrors.email = t('error.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('error.email');
    }

    if (!formData.password) {
      newErrors.password = t('error.required');
    } else if (formData.password.length < 6) {
      newErrors.password = t('error.minLength', { min: 6 });
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('error.required');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('error.passwordMismatch');
    }

    if (!formData.businessName) {
      newErrors.businessName = t('error.required');
    }

    if (!formData.businessAddress) {
      newErrors.businessAddress = t('error.required');
    }

    if (!formData.businessPhone) {
      newErrors.businessPhone = t('error.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/host');
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    changeLanguage(language === 'vi' ? 'en' : 'vi');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Theme and Language toggles */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-material-2 hover:shadow-material-3 transition-all"
        >
          <SafeIcon icon={isDarkMode ? FiSun : FiMoon} className="w-5 h-5" />
        </button>
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-material-2 hover:shadow-material-3 transition-all"
        >
          <SafeIcon icon={FiGlobe} className="w-5 h-5" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-material-4 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              UHOOM
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('auth.registerTitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('auth.fullName')}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={FiUser}
              placeholder="Nguyen Van A"
              required
            />

            <Input
              label={t('auth.email')}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={FiMail}
              placeholder="your@email.com"
              required
            />

            <div className="relative">
              <Input
                label={t('auth.password')}
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={FiLock}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Input
                label={t('auth.confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                icon={FiLock}
                placeholder="••••••••"
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

            <Input
              label={t('auth.businessName')}
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              error={errors.businessName}
              icon={FiUser}
              placeholder="Homestay Dalat"
              required
            />

            <Input
              label={t('auth.businessAddress')}
              type="text"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              error={errors.businessAddress}
              icon={FiMapPin}
              placeholder="123 Tran Phu, Dalat"
              required
            />

            <Input
              label={t('auth.businessPhone')}
              type="tel"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleChange}
              error={errors.businessPhone}
              icon={FiPhone}
              placeholder="0123456789"
              required
            />

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="lg"
            >
              {t('auth.register')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
              >
                {t('auth.login')}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;