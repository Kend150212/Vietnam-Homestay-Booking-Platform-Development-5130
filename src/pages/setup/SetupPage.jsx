import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiHome,
  FiDatabase,
  FiUser,
  FiSettings,
  FiCheck,
  FiChevronRight,
  FiChevronLeft,
  FiEye,
  FiEyeOff,
  FiServer,
  FiKey,
  FiMail,
  FiLock,
  FiAlertTriangle,
  FiCheckCircle,
  FiLoader,
  FiRefreshCw,
} = FiIcons;

const SetupPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    dbPassword: false,
    adminPassword: false,
    confirmPassword: false,
  });

  const [setupData, setSetupData] = useState({
    // Database Configuration
    dbHost: 'localhost',
    dbPort: '5432',
    dbName: 'uhoom_db',
    dbUser: 'postgres',
    dbPassword: '',
    
    // Server Configuration
    serverPort: '3000',
    jwtSecret: '',
    encryptionKey: '',
    
    // Admin Account
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    confirmPassword: '',
    
    // Application Settings
    appName: 'UHOOM',
    appUrl: 'http://localhost:3000',
    emailEnabled: false,
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      id: 1,
      title: 'Welcome',
      description: 'Initial setup and requirements check',
      icon: FiHome,
    },
    {
      id: 2,
      title: 'Database',
      description: 'Configure database connection',
      icon: FiDatabase,
    },
    {
      id: 3,
      title: 'Server',
      description: 'Server and security settings',
      icon: FiServer,
    },
    {
      id: 4,
      title: 'Admin Account',
      description: 'Create administrator account',
      icon: FiUser,
    },
    {
      id: 5,
      title: 'Application',
      description: 'Application settings and email',
      icon: FiSettings,
    },
    {
      id: 6,
      title: 'Complete',
      description: 'Finalize setup and start application',
      icon: FiCheck,
    },
  ];

  useEffect(() => {
    // Generate random secrets on component mount
    setSetupData(prev => ({
      ...prev,
      jwtSecret: generateRandomString(64),
      encryptionKey: generateRandomString(32),
    }));
  }, []);

  const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleInputChange = (field, value) => {
    setSetupData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 2: // Database
        if (!setupData.dbHost) newErrors.dbHost = 'Database host is required';
        if (!setupData.dbPort) newErrors.dbPort = 'Database port is required';
        if (!setupData.dbName) newErrors.dbName = 'Database name is required';
        if (!setupData.dbUser) newErrors.dbUser = 'Database user is required';
        if (!setupData.dbPassword) newErrors.dbPassword = 'Database password is required';
        break;

      case 3: // Server
        if (!setupData.serverPort) newErrors.serverPort = 'Server port is required';
        if (!setupData.jwtSecret) newErrors.jwtSecret = 'JWT secret is required';
        if (!setupData.encryptionKey) newErrors.encryptionKey = 'Encryption key is required';
        break;

      case 4: // Admin Account
        if (!setupData.adminName) newErrors.adminName = 'Admin name is required';
        if (!setupData.adminEmail) newErrors.adminEmail = 'Admin email is required';
        else if (!/\S+@\S+\.\S+/.test(setupData.adminEmail)) newErrors.adminEmail = 'Invalid email format';
        if (!setupData.adminPassword) newErrors.adminPassword = 'Admin password is required';
        else if (setupData.adminPassword.length < 8) newErrors.adminPassword = 'Password must be at least 8 characters';
        if (!setupData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
        else if (setupData.adminPassword !== setupData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        break;

      case 5: // Application
        if (!setupData.appName) newErrors.appName = 'Application name is required';
        if (!setupData.appUrl) newErrors.appUrl = 'Application URL is required';
        if (setupData.emailEnabled) {
          if (!setupData.smtpHost) newErrors.smtpHost = 'SMTP host is required when email is enabled';
          if (!setupData.smtpUser) newErrors.smtpUser = 'SMTP user is required when email is enabled';
          if (!setupData.smtpPassword) newErrors.smtpPassword = 'SMTP password is required when email is enabled';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const testDatabaseConnection = async () => {
    setTestingConnection(true);
    setConnectionStatus(null);

    try {
      // Mock database connection test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate connection test
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setTestingConnection(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const completeSetup = async () => {
    setLoading(true);
    
    try {
      // Mock setup completion
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Save setup data to localStorage or send to backend
      localStorage.setItem('uhoom_setup_complete', 'true');
      localStorage.setItem('uhoom_setup_data', JSON.stringify(setupData));
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Setup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto">
              <SafeIcon icon={FiHome} className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to UHOOM Setup
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This setup wizard will guide you through the initial configuration of your UHOOM homestay platform.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-left">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                System Requirements:
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Node.js 16+ installed</li>
                <li>• PostgreSQL 12+ database</li>
                <li>• At least 512MB RAM</li>
                <li>• SMTP server for email notifications (optional)</li>
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <SafeIcon icon={FiDatabase} className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Database Configuration
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure your PostgreSQL database connection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Database Host"
                value={setupData.dbHost}
                onChange={(e) => handleInputChange('dbHost', e.target.value)}
                error={errors.dbHost}
                placeholder="localhost"
                required
              />
              <Input
                label="Database Port"
                value={setupData.dbPort}
                onChange={(e) => handleInputChange('dbPort', e.target.value)}
                error={errors.dbPort}
                placeholder="5432"
                required
              />
            </div>

            <Input
              label="Database Name"
              value={setupData.dbName}
              onChange={(e) => handleInputChange('dbName', e.target.value)}
              error={errors.dbName}
              placeholder="uhoom_db"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Database User"
                value={setupData.dbUser}
                onChange={(e) => handleInputChange('dbUser', e.target.value)}
                error={errors.dbUser}
                placeholder="postgres"
                required
              />
              <div className="relative">
                <Input
                  label="Database Password"
                  type={showPasswords.dbPassword ? 'text' : 'password'}
                  value={setupData.dbPassword}
                  onChange={(e) => handleInputChange('dbPassword', e.target.value)}
                  error={errors.dbPassword}
                  placeholder="Enter database password"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('dbPassword')}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <SafeIcon icon={showPasswords.dbPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={testDatabaseConnection}
                loading={testingConnection}
                icon={testingConnection ? FiLoader : FiRefreshCw}
              >
                Test Connection
              </Button>
              
              {connectionStatus && (
                <div className={`flex items-center ${connectionStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  <SafeIcon 
                    icon={connectionStatus === 'success' ? FiCheckCircle : FiAlertTriangle} 
                    className="w-5 h-5 mr-2" 
                  />
                  <span className="text-sm">
                    {connectionStatus === 'success' ? 'Connection successful!' : 'Connection failed!'}
                  </span>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <SafeIcon icon={FiServer} className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Server Configuration
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure server settings and security keys
              </p>
            </div>

            <Input
              label="Server Port"
              value={setupData.serverPort}
              onChange={(e) => handleInputChange('serverPort', e.target.value)}
              error={errors.serverPort}
              placeholder="3000"
              required
            />

            <div>
              <Input
                label="JWT Secret Key"
                value={setupData.jwtSecret}
                onChange={(e) => handleInputChange('jwtSecret', e.target.value)}
                error={errors.jwtSecret}
                placeholder="Auto-generated secure key"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Used for JWT token signing. Keep this secure and never share it.
              </p>
            </div>

            <div>
              <Input
                label="Encryption Key"
                value={setupData.encryptionKey}
                onChange={(e) => handleInputChange('encryptionKey', e.target.value)}
                error={errors.encryptionKey}
                placeholder="Auto-generated encryption key"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Used for data encryption. Must be exactly 32 characters.
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
              <div className="flex items-start">
                <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5" />
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <p className="font-semibold mb-1">Security Notice:</p>
                  <p>These keys are auto-generated for security. Store them safely as they cannot be recovered if lost.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <SafeIcon icon={FiUser} className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Create Admin Account
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Create the administrator account for your platform
              </p>
            </div>

            <Input
              label="Full Name"
              value={setupData.adminName}
              onChange={(e) => handleInputChange('adminName', e.target.value)}
              error={errors.adminName}
              placeholder="John Doe"
              icon={FiUser}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={setupData.adminEmail}
              onChange={(e) => handleInputChange('adminEmail', e.target.value)}
              error={errors.adminEmail}
              placeholder="admin@example.com"
              icon={FiMail}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  label="Password"
                  type={showPasswords.adminPassword ? 'text' : 'password'}
                  value={setupData.adminPassword}
                  onChange={(e) => handleInputChange('adminPassword', e.target.value)}
                  error={errors.adminPassword}
                  placeholder="Enter secure password"
                  icon={FiLock}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('adminPassword')}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <SafeIcon icon={showPasswords.adminPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showPasswords.confirmPassword ? 'text' : 'password'}
                  value={setupData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  placeholder="Confirm password"
                  icon={FiLock}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <SafeIcon icon={showPasswords.confirmPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Password Requirements:
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Mix of uppercase and lowercase letters</li>
                <li>• Include numbers and special characters</li>
                <li>• Avoid common passwords</li>
              </ul>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <SafeIcon icon={FiSettings} className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Application Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure application settings and email notifications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Application Name"
                value={setupData.appName}
                onChange={(e) => handleInputChange('appName', e.target.value)}
                error={errors.appName}
                placeholder="UHOOM"
                required
              />
              <Input
                label="Application URL"
                value={setupData.appUrl}
                onChange={(e) => handleInputChange('appUrl', e.target.value)}
                error={errors.appUrl}
                placeholder="http://localhost:3000"
                required
              />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enable email notifications for bookings and system alerts
                  </p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={setupData.emailEnabled}
                    onChange={(e) => handleInputChange('emailEnabled', e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-900 dark:text-white">Enable</span>
                </label>
              </div>

              {setupData.emailEnabled && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="SMTP Host"
                      value={setupData.smtpHost}
                      onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                      error={errors.smtpHost}
                      placeholder="smtp.gmail.com"
                    />
                    <Input
                      label="SMTP Port"
                      value={setupData.smtpPort}
                      onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                      placeholder="587"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="SMTP Username"
                      value={setupData.smtpUser}
                      onChange={(e) => handleInputChange('smtpUser', e.target.value)}
                      error={errors.smtpUser}
                      placeholder="your-email@gmail.com"
                    />
                    <Input
                      label="SMTP Password"
                      type="password"
                      value={setupData.smtpPassword}
                      onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                      error={errors.smtpPassword}
                      placeholder="App password or SMTP password"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
              <SafeIcon icon={FiCheckCircle} className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Setup Complete!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your UHOOM platform is ready to launch. Review your configuration below.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-left space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Database</h4>
                  <p className="text-gray-600 dark:text-gray-400">Host: {setupData.dbHost}:{setupData.dbPort}</p>
                  <p className="text-gray-600 dark:text-gray-400">Database: {setupData.dbName}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Server</h4>
                  <p className="text-gray-600 dark:text-gray-400">Port: {setupData.serverPort}</p>
                  <p className="text-gray-600 dark:text-gray-400">URL: {setupData.appUrl}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Admin Account</h4>
                  <p className="text-gray-600 dark:text-gray-400">Name: {setupData.adminName}</p>
                  <p className="text-gray-600 dark:text-gray-400">Email: {setupData.adminEmail}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Features</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Email: {setupData.emailEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Next Steps:</strong> After completing setup, you'll be redirected to the login page. 
                Use your admin credentials to access the dashboard and start configuring your homestay platform.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    completedSteps.has(step.id)
                      ? 'bg-green-500 text-white'
                      : currentStep === step.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {completedSteps.has(step.id) ? (
                    <SafeIcon icon={FiCheck} className="w-5 h-5" />
                  ) : (
                    <SafeIcon icon={step.icon} className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      completedSteps.has(step.id) ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              icon={FiChevronLeft}
            >
              Previous
            </Button>

            <div className="flex space-x-3">
              {currentStep < steps.length ? (
                <Button
                  onClick={nextStep}
                  icon={FiChevronRight}
                  iconPosition="right"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={completeSetup}
                  loading={loading}
                  icon={FiCheck}
                  size="lg"
                >
                  Complete Setup
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SetupPage;