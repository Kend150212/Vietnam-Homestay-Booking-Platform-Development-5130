import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useLanguage } from '../../contexts/LanguageContext';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiSettings,
  FiDollarSign,
  FiBell,
  FiMail,
  FiPhone,
  FiCalendar,
  FiSave,
} = FiIcons;

const HostSettings = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    // Booking settings
    instantBooking: true,
    requireApproval: false,
    advanceBookingDays: 30,
    minimumStay: 1,
    maximumStay: 30,
    checkInTime: '14:00',
    checkOutTime: '12:00',
    
    // Pricing settings
    weekendPricing: false,
    weekendMultiplier: 1.2,
    monthlyDiscount: 10,
    earlyBirdDiscount: 5,
    lastMinuteDiscount: 15,
    
    // Notification settings
    emailNotifications: true,
    smsNotifications: false,
    bookingNotifications: true,
    paymentNotifications: true,
    reviewNotifications: true,
    promotionNotifications: false,
    
    // Cancellation policy
    cancellationPolicy: 'flexible',
    refundPercentage: 100,
    
    // Tax settings
    taxRate: 10,
    taxIncluded: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Mock save - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Settings saved:', settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const settingSections = [
    {
      title: 'Booking Settings',
      icon: FiCalendar,
      fields: [
        { key: 'instantBooking', label: 'Allow Instant Booking', type: 'checkbox' },
        { key: 'requireApproval', label: 'Require Host Approval', type: 'checkbox' },
        { key: 'advanceBookingDays', label: 'Advance Booking Days', type: 'number' },
        { key: 'minimumStay', label: 'Minimum Stay (days)', type: 'number' },
        { key: 'maximumStay', label: 'Maximum Stay (days)', type: 'number' },
        { key: 'checkInTime', label: 'Check-in Time', type: 'time' },
        { key: 'checkOutTime', label: 'Check-out Time', type: 'time' },
      ],
    },
    {
      title: 'Pricing Settings',
      icon: FiDollarSign,
      fields: [
        { key: 'weekendPricing', label: 'Enable Weekend Pricing', type: 'checkbox' },
        { key: 'weekendMultiplier', label: 'Weekend Price Multiplier', type: 'number', step: '0.1' },
        { key: 'monthlyDiscount', label: 'Monthly Discount (%)', type: 'number' },
        { key: 'earlyBirdDiscount', label: 'Early Bird Discount (%)', type: 'number' },
        { key: 'lastMinuteDiscount', label: 'Last Minute Discount (%)', type: 'number' },
      ],
    },
    {
      title: 'Notification Settings',
      icon: FiBell,
      fields: [
        { key: 'emailNotifications', label: 'Email Notifications', type: 'checkbox' },
        { key: 'smsNotifications', label: 'SMS Notifications', type: 'checkbox' },
        { key: 'bookingNotifications', label: 'Booking Notifications', type: 'checkbox' },
        { key: 'paymentNotifications', label: 'Payment Notifications', type: 'checkbox' },
        { key: 'reviewNotifications', label: 'Review Notifications', type: 'checkbox' },
        { key: 'promotionNotifications', label: 'Promotion Notifications', type: 'checkbox' },
      ],
    },
    {
      title: 'Cancellation & Tax',
      icon: FiSettings,
      fields: [
        { key: 'cancellationPolicy', label: 'Cancellation Policy', type: 'select', options: [
          { value: 'flexible', label: 'Flexible' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'strict', label: 'Strict' },
        ]},
        { key: 'refundPercentage', label: 'Refund Percentage', type: 'number' },
        { key: 'taxRate', label: 'Tax Rate (%)', type: 'number' },
        { key: 'taxIncluded', label: 'Tax Included in Price', type: 'checkbox' },
      ],
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('settings.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Configure your homestay settings and preferences
            </p>
          </div>
          <Button
            onClick={handleSave}
            loading={loading}
            icon={FiSave}
          >
            Save Settings
          </Button>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <SafeIcon icon={section.icon} className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
                    {section.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.fields.map((field) => (
                    <div key={field.key}>
                      {field.type === 'checkbox' ? (
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings[field.key]}
                            onChange={(e) => handleChange(field.key, e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            {field.label}
                          </span>
                        </label>
                      ) : field.type === 'select' ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {field.label}
                          </label>
                          <select
                            value={settings[field.key]}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            {field.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <Input
                          label={field.label}
                          type={field.type}
                          value={settings[field.key]}
                          onChange={(e) => handleChange(field.key, 
                            field.type === 'number' ? Number(e.target.value) : e.target.value
                          )}
                          step={field.step}
                          min={field.type === 'number' ? '0' : undefined}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HostSettings;