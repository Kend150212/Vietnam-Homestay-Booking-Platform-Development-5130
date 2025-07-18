import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useLanguage } from '../../contexts/LanguageContext';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiClock,
  FiDollarSign,
} = FiIcons;

const AdminBookings = () => {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockBookings = [
      {
        id: 1,
        guestName: 'Nguyen Van A',
        guestEmail: 'guest1@example.com',
        guestPhone: '0123456789',
        hostName: 'Dalat Homestay',
        roomName: 'Deluxe Room',
        checkIn: '2024-03-15',
        checkOut: '2024-03-17',
        bookingType: 'daily',
        totalAmount: 1500000,
        status: 'confirmed',
        createdAt: '2024-03-10T10:00:00Z',
      },
      {
        id: 2,
        guestName: 'Tran Thi B',
        guestEmail: 'guest2@example.com',
        guestPhone: '0987654321',
        hostName: 'Sapa Mountain View',
        roomName: 'Standard Room',
        checkIn: '2024-03-20',
        checkOut: '2024-03-22',
        bookingType: 'daily',
        totalAmount: 800000,
        status: 'pending',
        createdAt: '2024-03-12T14:30:00Z',
      },
      {
        id: 3,
        guestName: 'Le Van C',
        guestEmail: 'guest3@example.com',
        guestPhone: '0555666777',
        hostName: 'Hoi An Villa',
        roomName: 'Premium Suite',
        checkIn: '2024-03-25T14:00',
        checkOut: '2024-03-25T18:00',
        bookingType: 'hourly',
        totalAmount: 400000,
        status: 'completed',
        createdAt: '2024-03-14T09:15:00Z',
      },
    ];

    setTimeout(() => {
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = bookings.filter(booking =>
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  }, [searchTerm, bookings]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getBookingTypeColor = (type) => {
    switch (type) {
      case 'hourly':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'daily':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'monthly':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDateTime = (dateTime, type) => {
    const date = new Date(dateTime);
    if (type === 'hourly') {
      return date.toLocaleString('vi-VN');
    }
    return date.toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="loading-spinner"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('nav.bookings')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View and manage all bookings across the platform
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={FiSearch}
              />
            </div>
            <Button variant="outline" icon={FiFilter}>
              Filter
            </Button>
          </div>
        </Card>

        {/* Bookings List */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Guest
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Host & Room
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Dates
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {booking.guestName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {booking.guestEmail}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {booking.hostName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {booking.roomName}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="text-gray-900 dark:text-white">
                          {formatDateTime(booking.checkIn, booking.bookingType)}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          to {formatDateTime(booking.checkOut, booking.bookingType)}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBookingTypeColor(booking.bookingType)}`}>
                        {booking.bookingType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(booking.totalAmount)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminBookings;