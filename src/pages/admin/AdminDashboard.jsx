import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiBed,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowRight,
} = FiIcons;

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    totalHosts: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalRooms: 0,
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalHosts: 124,
      totalBookings: 1847,
      totalRevenue: 2450000,
      totalRooms: 456,
    });
  }, []);

  const statCards = [
    {
      title: t('nav.hosts'),
      value: stats.totalHosts,
      icon: FiUsers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900',
      change: '+12%',
      trending: 'up',
    },
    {
      title: t('dashboard.totalBookings'),
      value: stats.totalBookings,
      icon: FiCalendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900',
      change: '+8%',
      trending: 'up',
    },
    {
      title: t('dashboard.totalRevenue'),
      value: new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(stats.totalRevenue),
      icon: FiDollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900',
      change: '+15%',
      trending: 'up',
    },
    {
      title: t('dashboard.totalRooms'),
      value: stats.totalRooms,
      icon: FiBed,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900',
      change: '+5%',
      trending: 'up',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'host_registered',
      message: 'New host registered: Dalat Homestay',
      time: '2 hours ago',
      icon: FiUsers,
    },
    {
      id: 2,
      type: 'booking_created',
      message: 'New booking for Sapa Mountain View',
      time: '4 hours ago',
      icon: FiCalendar,
    },
    {
      id: 3,
      type: 'payment_received',
      message: 'Payment received from Host #123',
      time: '1 day ago',
      icon: FiDollarSign,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('dashboard.welcome')} Admin
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here's what's happening with your platform today.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <SafeIcon
                        icon={stat.trending === 'up' ? FiTrendingUp : FiTrendingDown}
                        className={`w-4 h-4 mr-1 ${
                          stat.trending === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activities
              </h3>
              <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium flex items-center">
                View all
                <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900 rounded-full">
                    <SafeIcon
                      icon={activity.icon}
                      className="w-4 h-4 text-primary-600 dark:text-primary-400"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {t('dashboard.quickActions')}
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <SafeIcon icon={FiUsers} className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Manage Hosts
                  </span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <SafeIcon icon={FiCalendar} className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    View Bookings
                  </span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Payment Reports
                  </span>
                </div>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;