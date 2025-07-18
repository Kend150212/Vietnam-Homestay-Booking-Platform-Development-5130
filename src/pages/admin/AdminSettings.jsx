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
  FiMail,
  FiGlobe,
  FiShield,
  FiDatabase,
  FiSave,
} = FiIcons;

const AdminSettings = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    // Platform settings
    platformName: 'UHOOM',
    platformUrl: 'uhoom.vn',
    supportEmail: 'support@uhoom.vn',
    
    // Subscription settings
    basicPlanPrice: 199000,
    premiumPlanPrice: 299000,
    trialPeriodDays: 7,
    
    // Tax settings
    defaultTaxRate: 10,
    taxIncluded: true,
    
    // Email settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'noreply@uhoom.vn',
    smtpPassword: '',
    
    // PayOS settings
    payosClientId: '',
    payosApiKey: '',
    payosChecksumKey: '',
    
    // General settings
    maintenanceMode: false,
    allowNewRegistrations: true,
    requireEmailVerification: true,
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
      title: 'Platform Settings',
      icon: FiSettings,
      fields: [
        { key: 'platformName', label: 'Platform Name', type: 'text' },
        { key: 'platformUrl', label: 'Platform URL', type: 'text' },
        { key: 'supportEmail', label: 'Support Email', type: 'email' },
      ],
    },
    {
      title: 'Subscription Plans',
      icon: FiDollarSign,
      fields: [
        { key: 'basicPlanPrice', label: 'Basic Plan Price (VND)', type: 'number' },
        { key: 'premiumPlanPrice', label: 'Premium Plan Price (VND)', type: 'number' },
        { key: 'trialPeriodDays', label: 'Trial Period (Days)', type: 'number' },
      ],
    },
    {
      title: 'Tax Settings',
      icon: FiDollarSign,
      fields: [
        { key: 'defaultTaxRate', label: 'Default Tax Rate (%)', type: 'number' },
        { key: 'taxIncluded', label: 'Tax Included in Price', type: 'checkbox' },
      ],
    },
    {
      title: 'Email Configuration',
      icon: FiMail,
      fields: [
        { key: 'smtpHost', label: 'SMTP Host', type: 'text' },
        { key: 'smtpPort', label: 'SMTP Port', type: 'number' },
        { key: 'smtpUser', label: 'SMTP Username', type: 'text' },
        { key: 'smtpPassword', label: 'SMTP Password', type: 'password' },
      ],
    },
    {
      title: 'PayOS Integration',
      icon: FiShield,
      fields: [
        { key: 'payosClientId', label: 'PayOS Client ID', type: 'text' },
        { key: 'payosApiKey', label: 'PayOS API Key', type: 'password' },
        { key: 'payosChecksumKey', label: 'PayOS Checksum Key', type: 'password' },
      ],
    },
    {
      title: 'General Settings',
      icon: FiDatabase,
      fields: [
        { key: 'maintenanceMode', label: 'Maintenance Mode', type: 'checkbox' },
        { key: 'allowNewRegistrations', label: 'Allow New Registrations', type: 'checkbox' },
        { key: 'requireEmailVerification', label: 'Require Email Verification', type: 'checkbox' },
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
              Configure platform settings and integrations
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
                      ) : (
                        <Input
                          label={field.label}
                          type={field.type}
                          value={settings[field.key]}
                          onChange={(e) => handleChange(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
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

export default AdminSettings;