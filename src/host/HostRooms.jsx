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
  FiBed,
  FiUsers,
  FiDollarSign,
  FiImage,
  FiSave,
} = FiIcons;

const HostRooms = () => {
  const { t } = useLanguage();
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    capacity: 1,
    pricePerHour: 0,
    pricePerDay: 0,
    pricePerMonth: 0,
    description: '',
    image: '',
    amenities: [],
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockRooms = [
      {
        id: 1,
        name: 'Deluxe Room',
        type: 'deluxe',
        capacity: 2,
        pricePerHour: 100000,
        pricePerDay: 800000,
        pricePerMonth: 15000000,
        description: 'Spacious deluxe room with city view',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400',
        amenities: ['wifi', 'ac', 'tv', 'bathroom'],
        status: 'available',
      },
      {
        id: 2,
        name: 'Standard Room',
        type: 'standard',
        capacity: 2,
        pricePerHour: 80000,
        pricePerDay: 600000,
        pricePerMonth: 12000000,
        description: 'Comfortable standard room',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400',
        amenities: ['wifi', 'ac', 'tv'],
        status: 'occupied',
      },
    ];

    setRooms(mockRooms);
  }, []);

  const handleOpenModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        name: room.name,
        type: room.type,
        capacity: room.capacity,
        pricePerHour: room.pricePerHour,
        pricePerDay: room.pricePerDay,
        pricePerMonth: room.pricePerMonth,
        description: room.description,
        image: room.image,
        amenities: room.amenities,
      });
    } else {
      setEditingRoom(null);
      setFormData({
        name: '',
        type: '',
        capacity: 1,
        pricePerHour: 0,
        pricePerDay: 0,
        pricePerMonth: 0,
        description: '',
        image: '',
        amenities: [],
      });
    }
    setShowModal(true);
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
      if (editingRoom) {
        // Update existing room
        setRooms(prev => prev.map(room => 
          room.id === editingRoom.id ? { ...room, ...formData } : room
        ));
      } else {
        // Create new room
        const newRoom = {
          id: Date.now(),
          ...formData,
          status: 'available',
        };
        setRooms(prev => [...prev, newRoom]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving room:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(prev => prev.filter(room => room.id !== roomId));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('nav.rooms')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your rooms and pricing
            </p>
          </div>
          <Button onClick={() => handleOpenModal()} icon={FiPlus}>
            {t('room.addRoom')}
          </Button>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                  {room.image ? (
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <SafeIcon icon={FiImage} className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(room)}
                      className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                      <SafeIcon icon={FiEdit} className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {room.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
                      <span className="text-sm">Capacity: {room.capacity} guests</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <SafeIcon icon={FiDollarSign} className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(room.pricePerDay)}/day
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-400"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Room Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingRoom ? t('room.editRoom') : t('room.addRoom')}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('room.name')}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t('room.type')}
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
              <Input
                label={t('room.capacity')}
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label={t('room.pricePerHour')}
                name="pricePerHour"
                type="number"
                value={formData.pricePerHour}
                onChange={handleChange}
                min="0"
                required
              />
              <Input
                label={t('room.pricePerDay')}
                name="pricePerDay"
                type="number"
                value={formData.pricePerDay}
                onChange={handleChange}
                min="0"
                required
              />
              <Input
                label={t('room.pricePerMonth')}
                name="pricePerMonth"
                type="number"
                value={formData.pricePerMonth}
                onChange={handleChange}
                min="0"
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
                placeholder="Describe your room..."
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
                onClick={() => setShowModal(false)}
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

export default HostRooms;