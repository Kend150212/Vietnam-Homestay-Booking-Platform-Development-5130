import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { useLanguage } from '../contexts/LanguageContext';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiMapPin,
  FiImage,
  FiSave,
} = FiIcons;

const HostLocations = () => {
  const { t } = useLanguage();
  const [locations, setLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    province: '',
    description: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockLocations = [
      {
        id: 1,
        name: 'Dalat Central',
        address: '123 Tran Phu Street',
        city: 'Dalat',
        province: 'Lam Dong',
        description: 'Beautiful location in the heart of Dalat city',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
        roomCount: 3,
        createdAt: '2024-01-15',
      },
      {
        id: 2,
        name: 'Dalat Lake View',
        address: '456 Xuan Huong Lake',
        city: 'Dalat',
        province: 'Lam Dong',
        description: 'Stunning lake view homestay',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
        roomCount: 2,
        createdAt: '2024-02-20',
      },
    ];

    setLocations(mockLocations);
  }, []);

  const handleOpenModal = (location = null) => {
    if (location) {
      setEditingLocation(location);
      setFormData({
        name: location.name,
        address: location.address,
        city: location.city,
        province: location.province,
        description: location.description,
        image: location.image,
      });
    } else {
      setEditingLocation(null);
      setFormData({
        name: '',
        address: '',
        city: '',
        province: '',
        description: '',
        image: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLocation(null);
    setFormData({
      name: '',
      address: '',
      city: '',
      province: '',
      description: '',
      image: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingLocation) {
        // Update existing location
        setLocations(prev => prev.map(location => 
          location.id === editingLocation.id ? { ...location, ...formData } : location
        ));
      } else {
        // Create new location
        const newLocation = {
          id: Date.now(),
          ...formData,
          roomCount: 0,
          createdAt: new Date().toISOString(),
        };
        setLocations(prev => [...prev, newLocation]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving location:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (locationId) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      setLocations(prev => prev.filter(location => location.id !== locationId));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('nav.locations')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your homestay locations
            </p>
          </div>
          <Button
            onClick={() => handleOpenModal()}
            icon={FiPlus}
          >
            {t('location.addLocation')}
          </Button>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                  {location.image ? (
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <SafeIcon icon={FiImage} className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(location)}
                      className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                      <SafeIcon icon={FiEdit} className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {location.name}
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
                    <span className="text-sm">{location.address}, {location.city}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {location.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {location.roomCount} rooms
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Created {new Date(location.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Location Modal */}
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingLocation ? t('location.editLocation') : t('location.addLocation')}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('location.name')}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label={t('location.address')}
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t('location.city')}
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <Input
                label={t('location.province')}
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('common.description')}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Describe your location..."
              />
            </div>
            <Input
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                loading={loading}
                icon={FiSave}
              >
                {t('common.save')}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default HostLocations;