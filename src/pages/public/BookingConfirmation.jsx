import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheckCircle, FiHome, FiMapPin, FiCalendar, FiUsers, FiMail, FiPhone } = FiIcons;

const BookingConfirmation = () => {
  const location = useLocation();
  const { bookingData, homestay } = location.state || {};

  if (!bookingData || !homestay) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No booking information found.
          </p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return bookingData.bookingType === 'hourly' 
      ? date.toLocaleString('vi-VN')
      : date.toLocaleDateString('vi-VN');
  };

  const calculateTotal = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    
    if (bookingData.bookingType === 'hourly') {
      const hours = (checkOut - checkIn) / (1000 * 60 * 60);
      return hours * homestay.pricePerHour;
    } else {
      const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
      return days * homestay.pricePerDay;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <SafeIcon icon={FiHome} className="w-8 h-8 text-primary-600 mr-2" />
              <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                UHOOM
              </h1>
            </div>
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <SafeIcon icon={FiCheckCircle} className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your booking has been successfully submitted. You will receive a confirmation email shortly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Booking Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <SafeIcon icon={FiHome} className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {homestay.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {homestay.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <SafeIcon icon={FiCalendar} className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(bookingData.checkIn)} - {formatDate(bookingData.checkOut)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {bookingData.bookingType} booking
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <SafeIcon icon={FiUsers} className="w-5 h-5 text-gray-400 mr-3" />
                  <p className="font-medium text-gray-900 dark:text-white">
                    {bookingData.guests} guest{bookingData.guests > 1 ? 's' : ''}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Guest Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Guest Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <SafeIcon icon={FiUsers} className="w-5 h-5 text-gray-400 mr-3" />
                  <p className="font-medium text-gray-900 dark:text-white">
                    {bookingData.guestName}
                  </p>
                </div>

                <div className="flex items-center">
                  <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-400 mr-3" />
                  <p className="font-medium text-gray-900 dark:text-white">
                    {bookingData.guestEmail}
                  </p>
                </div>

                <div className="flex items-center">
                  <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-400 mr-3" />
                  <p className="font-medium text-gray-900 dark:text-white">
                    {bookingData.guestPhone}
                  </p>
                </div>

                {bookingData.specialRequests && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      Special Requests
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {bookingData.specialRequests}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              What's Next?
            </h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>• You will receive a confirmation email with all booking details</p>
              <p>• The host will review your booking and confirm within 24 hours</p>
              <p>• Payment instructions will be sent once the booking is confirmed</p>
              <p>• You can contact the host directly for any questions</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link to="/" className="flex-1">
                <Button fullWidth variant="outline">
                  Back to Home
                </Button>
              </Link>
              <Link to="/homestays" className="flex-1">
                <Button fullWidth>
                  Explore More Homestays
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmation;