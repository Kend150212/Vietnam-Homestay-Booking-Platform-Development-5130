import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiMapPin, FiStar, FiUsers, FiCalendar, FiClock } = FiIcons;

const BookingPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    bookingType: 'daily',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: '',
  });

  // Mock homestay data
  const homestay = {
    id: 1,
    name: 'Dalat Mountain View',
    location: 'Dalat, Lam Dong',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    rating: 4.8,
    pricePerHour: 100000,
    pricePerDay: 800000,
    pricePerMonth: 15000000,
    maxGuests: 4,
    description: 'Beautiful homestay with stunning mountain views',
    amenities: ['WiFi', 'Kitchen', 'Parking', 'Garden View'],
    host: {
      name: 'Nguyen Van A',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      rating: 4.9,
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process booking and redirect to confirmation
    navigate('/booking-confirmation', { state: { bookingData, homestay } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5 mr-2" />
              Back
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Homestay Details */}
          <div className="lg:col-span-2">
            <Card>
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src={homestay.image}
                  alt={homestay.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {homestay.name}
                  </h1>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <SafeIcon icon={FiMapPin} className="w-5 h-5 mr-2" />
                    <span>{homestay.location}</span>
                    <div className="flex items-center ml-4">
                      <SafeIcon icon={FiStar} className="w-5 h-5 text-yellow-500 mr-1" />
                      <span>{homestay.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300">
                  {homestay.description}
                </p>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {homestay.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <img
                    src={homestay.host.avatar}
                    alt={homestay.host.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Hosted by {homestay.host.name}
                    </p>
                    <div className="flex items-center">
                      <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {homestay.host.rating} host rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Book Your Stay
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Booking Type
                  </label>
                  <select
                    name="bookingType"
                    value={bookingData.bookingType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Check-in"
                    name="checkIn"
                    type={bookingData.bookingType === 'hourly' ? 'datetime-local' : 'date'}
                    value={bookingData.checkIn}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Check-out"
                    name="checkOut"
                    type={bookingData.bookingType === 'hourly' ? 'datetime-local' : 'date'}
                    value={bookingData.checkOut}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Input
                  label="Guests"
                  name="guests"
                  type="number"
                  value={bookingData.guests}
                  onChange={handleChange}
                  min="1"
                  max={homestay.maxGuests}
                  required
                />

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Guest Information
                  </h3>
                  
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      name="guestName"
                      value={bookingData.guestName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email"
                      name="guestEmail"
                      type="email"
                      value={bookingData.guestEmail}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Phone"
                      name="guestPhone"
                      type="tel"
                      value={bookingData.guestPhone}
                      onChange={handleChange}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Special Requests
                      </label>
                      <textarea
                        name="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Any special requests..."
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(calculateTotal())}
                    </span>
                  </div>
                  
                  <Button type="submit" fullWidth size="lg">
                    Book Now
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;