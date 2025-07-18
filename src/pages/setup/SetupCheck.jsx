import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SetupPage from './SetupPage';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLoader } = FiIcons;

const SetupCheck = () => {
  const navigate = useNavigate();
  const [isSetupComplete, setIsSetupComplete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    try {
      // Check if setup is already completed
      const setupComplete = localStorage.getItem('uhoom_setup_complete');
      
      if (setupComplete === 'true') {
        setIsSetupComplete(true);
        // Redirect to login page if setup is already complete
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setIsSetupComplete(false);
      }
    } catch (error) {
      console.error('Error checking setup status:', error);
      setIsSetupComplete(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <SafeIcon icon={FiLoader} className="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Checking setup status...</p>
        </div>
      </div>
    );
  }

  if (isSetupComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiIcons.FiCheck} className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Setup Already Complete
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

  return <SetupPage />;
};

export default SetupCheck;