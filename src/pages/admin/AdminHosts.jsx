import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { useLanguage } from '../../contexts/LanguageContext';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiEye,
  FiEdit,
  FiTrash2,
  FiCheck,
  FiX,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiPlus,
} = FiIcons;

const AdminHosts = () => {
  const { t } = useLanguage();
  const [hosts, setHosts] = useState([]);
  const [filteredHosts, setFilteredHosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHost, setSelectedHost] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    status: 'active',
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockHosts = [
      {
        id: 1,
        name: 'Nguyen Van A',
        email: 'host1@example.com',
        businessName: 'Dalat Homestay',
        businessAddress: '123 Tran Phu, Dalat',
        businessPhone: '0123456789',
        rooms: 5,
        bookings: 24,
        revenue: 12000000,
        joinDate: '2024-01-15',
        status: 'active',
        subscription: 'premium',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      {
        id: 2,
        name: 'Tran Thi B',
        email: 'host2@example.com',
        businessName: 'Sapa Mountain View',
        businessAddress: '456 Fansipan, Sapa',
        businessPhone: '0987654321',
        rooms: 3,
        bookings: 18,
        revenue: 8000000,
        joinDate: '2024-02-10',
        status: 'active',
        subscription: 'basic',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      {
        id: 3,
        name: 'Le Van C',
        email: 'host3@example.com',
        businessName: 'Hoi An Villa',
        businessAddress: '789 Ancient Town, Hoi An',
        businessPhone: '0555666777',
        rooms: 4,
        bookings: 12,
        revenue: 5000000,
        joinDate: '2024-03-05',
        status: 'suspended',
        subscription: 'trial',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      },
    ];

    setTimeout(() => {
      setHosts(mockHosts);
      setFilteredHosts(mockHosts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = hosts.filter(host =>
      host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHosts(filtered);
  }, [searchTerm, hosts]);

  const handleViewHost = (host) => {
    setSelectedHost(host);
    setShowViewModal(true);
  };

  const handleEditHost = (host) => {
    setSelectedHost(host);
    setFormData({
      name: host.name,
      email: host.email,
      businessName: host.businessName,
      businessAddress: host.businessAddress,
      businessPhone: host.businessPhone,
      status: host.status,
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    setHosts(prev => prev.map(host => 
      host.id === selectedHost.id ? { ...host, ...formData } : host
    ));
    setShowEditModal(false);
  };

  const handleDeleteHost = (hostId) => {
    if (window.confirm('Are you sure you want to delete this host?')) {
      setHosts(prev => prev.filter(host => host.id !== hostId));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
            Active
          </span>
        );
      case 'suspended':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-xs">
            Suspended
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs">
            Pending
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 rounded-full text-xs">
            {status}
          </span>
        );
    }
  };

  const getSubscriptionBadge = (subscription) => {
    switch (subscription) {
      case 'premium':
        return (
          <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs">
            Premium
          </span>
        );
      case 'basic':
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs">
            Basic
          </span>
        );
      case 'trial':
        return (
          <span className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded-full text-xs">
            Trial
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 rounded-full text-xs">
            {subscription}
          </span>
        );
    }
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
              {t('nav.hosts')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage hosts and their properties
            </p>
          </div>
          <Button icon={FiPlus}>Add Host</Button>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search hosts..."
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

        {/* Hosts Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Host
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Business
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Rooms
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Subscription
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredHosts.map((host) => (
                  <motion.tr
                    key={host.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {host.avatar ? (
                          <img
                            src={host.avatar}
                            alt={host.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-medium">
                              {host.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {host.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {host.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {host.businessName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {host.businessAddress}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {host.rooms}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(host.revenue)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(host.status)}
                    </td>
                    <td className="py-4 px-4">
                      {getSubscriptionBadge(host.subscription)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleViewHost(host)}
                          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <SafeIcon icon={FiEye} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleEditHost(host)}
                          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <SafeIcon icon={FiEdit} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteHost(host.id)}
                          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <SafeIcon icon={FiTrash2} className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* View Host Modal */}
        <Modal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          title="Host Details"
          size="lg"
        >
          {selectedHost && (
            <div className="space-y-6">
              <div className="flex items-center">
                {selectedHost.avatar ? (
                  <img
                    src={selectedHost.avatar}
                    alt={selectedHost.name}
                    className="w-20 h-20 rounded-full mr-4"
                  />
                ) : (
                  <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-2xl font-medium">
                      {selectedHost.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedHost.name}
                  </h3>
                  <div className="flex items-center mt-2">
                    {getStatusBadge(selectedHost.status)}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      Joined {new Date(selectedHost.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Personal Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900 dark:text-white">{selectedHost.email}</span>
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900 dark:text-white">{selectedHost.businessPhone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Business Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-900 dark:text-white">{selectedHost.businessName}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <SafeIcon icon={FiMapPin} className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-900 dark:text-white">{selectedHost.businessAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Rooms</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedHost.rooms}
                    </p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bookings</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedHost.bookings}
                    </p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        maximumFractionDigits: 0,
                      }).format(selectedHost.revenue)}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </Modal>

        {/* Edit Host Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Host"
          size="lg"
        >
          {selectedHost && (
            <div className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
              />
              <Input
                label="Business Address"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
              />
              <Input
                label="Business Phone"
                name="businessPhone"
                value={formData.businessPhone}
                onChange={handleChange}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default AdminHosts;