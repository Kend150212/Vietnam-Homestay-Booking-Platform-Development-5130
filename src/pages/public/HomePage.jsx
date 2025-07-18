import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiMapPin, FiStar, FiArrowRight } = FiIcons;

const HomePage = () => {
  const featuredHomestays = [
    {
      id: 1,
      name: 'Dalat Mountain View',
      location: 'Dalat, Lam Dong',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      rating: 4.8,
      price: 800000,
      slug: 'dalat-mountain-view',
    },
    {
      id: 2,
      name: 'Sapa Valley Retreat',
      location: 'Sapa, Lao Cai',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
      rating: 4.9,
      price: 1200000,
      slug: 'sapa-valley-retreat',
    },
    {
      id: 3,
      name: 'Hoi An Ancient Villa',
      location: 'Hoi An, Quang Nam',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      rating: 4.7,
      price: 1000000,
      slug: 'hoi-an-ancient-villa',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
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
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Find Your Perfect
            <span className="text-primary-600 dark:text-primary-400 block">
              Homestay Experience
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Discover unique accommodations and create unforgettable memories
            with local hosts across Vietnam.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/homestays"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium inline-flex items-center"
            >
              Explore Homestays
              <SafeIcon icon={FiArrowRight} className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/register"
              className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors font-medium"
            >
              Become a Host
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Homestays */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Homestays
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover our most popular destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHomestays.map((homestay, index) => (
              <motion.div
                key={homestay.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-material-2 hover:shadow-material-3 transition-shadow overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={homestay.image}
                    alt={homestay.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {homestay.name}
                    </h3>
                    <div className="flex items-center">
                      <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {homestay.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
                    <span className="text-sm">{homestay.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(homestay.price)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        /night
                      </span>
                    </div>
                    <Link
                      to={`/homestay/${homestay.slug}`}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <SafeIcon icon={FiHome} className="w-8 h-8 text-primary-400 mr-2" />
                <h3 className="text-2xl font-bold text-primary-400">UHOOM</h3>
              </div>
              <p className="text-gray-400">
                Your trusted platform for authentic homestay experiences.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Guests</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Find Homestays</a></li>
                <li><a href="#" className="hover:text-white">Guest Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Hosts</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Become a Host</a></li>
                <li><a href="#" className="hover:text-white">Host Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 UHOOM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;