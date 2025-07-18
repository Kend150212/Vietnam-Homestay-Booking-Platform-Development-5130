import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiCalendar,
  FiDollarSign,
  FiBed,
  FiUsers,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowRight,
  FiClock,
  FiCheck,
  FiX,
} = FiIcons;

const HostDashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalRooms: 0,
    occupancyRate: 0,
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalBookings: 45,
      totalRevenue: 15000000,
      totalRooms: 5,
      occupancyRate: 78,
    });
  }, []);

  const statCards = [
    {
      title: t('dashboard.totalBookings'),
      value: stats.totalBookings,
      icon: FiCalendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900',
      change: '+12%',
      trending: 'up',
    },
    {
      title: t('dashboard.totalRevenue'),
      value: new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(stats.totalRevenue),
      icon: FiDollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900',
      change: '+8%',
      trending: 'up',
    },
    {
      title: t('dashboard.totalRooms'),
      value: stats.totalRooms,
      icon: FiBed,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900',
      change: '+2',
      trending: 'up',
    },
    {
      title: t('dashboard.occupancyRate'),
      value: `${stats.occupancyRate}%`,
      icon: FiUsers,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900',
      change: '-3%',
      trending: 'down',
    },
  ];

  const recentBookings = [
    {
      id: 1,
      guestName: 'Nguyen Van A',
      roomName: 'Deluxe Room',
      checkIn: '2024-03-15',
      checkOut: '2024-03-17',
      status: 'confirmed',
      amount: 1500000,
    },
    {
      id: 2,
      guestName: 'Tran Thi B',
      roomName: 'Standard Room',
      checkIn: '2024-03-20',
      checkOut: '2024-03-22',
      status: 'pending',
      amount: 800000,
    },
    {
      id: 3,
      guestName: 'Le Van C',
      roomName: 'Premium Suite',
      checkIn: '2024-03-25',
      checkOut: '2024-03-27',
      status: 'completed',
      amount: 2000000,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      case 'cancelled':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return FiCheck;
      case 'pending':
        return FiClock;
      case 'completed':
        return FiCheck;
      case 'cancelled':
        return FiX;
      default:
        return FiClock;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('dashboard.welcome')}, {user?.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here's how your homestay is performing today.
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
          {/* Recent Bookings */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('dashboard.recentBookings')}
              </h3>
              <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium flex items-center">
                View all
                <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-full">
                      <SafeIcon
                        icon={getStatusIcon(booking.status)}
                        className="w-4 h-4 text-primary-600 dark:text-primary-400"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {booking.guestName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {booking.roomName} • {new Date(booking.checkIn).toLocaleDateString('vi-VN')} - {new Date(booking.checkOut).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(booking.amount)}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
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
                  <SafeIcon icon={FiBed} className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Add New Room
                  </span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <SafeIcon icon={FiCalendar} className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    View Calendar
                  </span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Create Coupon
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

export default HostDashboard;