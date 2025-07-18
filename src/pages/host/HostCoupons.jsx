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
  FiPlus,
  FiEdit,
  FiTrash2,
  FiTag,
  FiPercent,
  FiDollarSign,
  FiCalendar,
  FiCopy,
  FiSave,
} = FiIcons;

const HostCoupons = () => {
  const { t } = useLanguage();
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage',
    value: 0,
    expiryDate: '',
    usageLimit: 0,
    description: '',
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockCoupons = [
      {
        id: 1,
        code: 'WELCOME10',
        type: 'percentage',
        value: 10,
        expiryDate: '2024-12-31',
        usageLimit: 100,
        usedCount: 15,
        description: 'Welcome discount for new guests',
        status: 'active',
        createdAt: '2024-01-15',
      },
      {
        id: 2,
        code: 'SUMMER50K',
        type: 'fixed',
        value: 50000,
        expiryDate: '2024-06-30',
        usageLimit: 50,
        usedCount: 32,
        description: 'Summer special discount',
        status: 'active',
        createdAt: '2024-03-01',
      },
      {
        id: 3,
        code: 'EXPIRED20',
        type: 'percentage',
        value: 20,
        expiryDate: '2024-02-29',
        usageLimit: 30,
        usedCount: 30,
        description: 'Expired promotion',
        status: 'expired',
        createdAt: '2024-01-01',
      },
    ];

    setCoupons(mockCoupons);
  }, []);

  const handleOpenModal = (coupon = null) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        expiryDate: coupon.expiryDate,
        usageLimit: coupon.usageLimit,
        description: coupon.description,
      });
    } else {
      setEditingCoupon(null);
      setFormData({
        code: '',
        type: 'percentage',
        value: 0,
        expiryDate: '',
        usageLimit: 0,
        description: '',
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
      if (editingCoupon) {
        // Update existing coupon
        setCoupons(prev => prev.map(coupon => 
          coupon.id === editingCoupon.id ? { ...coupon, ...formData } : coupon
        ));
      } else {
        // Create new coupon
        const newCoupon = {
          id: Date.now(),
          ...formData,
          usedCount: 0,
          status: 'active',
          createdAt: new Date().toISOString(),
        };
        setCoupons(prev => [...prev, newCoupon]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving coupon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (couponId) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(prev => prev.filter(coupon => coupon.id !== couponId));
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    // You can add a toast notification here
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'percentage':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'fixed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('nav.coupons')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create and manage discount coupons
            </p>
          </div>
          <Button onClick={() => handleOpenModal()} icon={FiPlus}>
            {t('coupon.addCoupon')}
          </Button>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="relative">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiTag} className="w-5 h-5 text-primary-600" />
                      <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                        {coupon.code}
                      </span>
                      <button
                        onClick={() => handleCopyCode(coupon.code)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <SafeIcon icon={FiCopy} className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(coupon)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <SafeIcon icon={FiEdit} className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(coupon.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Discount:</span>
                      <div className="flex items-center">
                        <SafeIcon 
                          icon={coupon.type === 'percentage' ? FiPercent : FiDollarSign} 
                          className="w-4 h-4 mr-1 text-gray-500" 
                        />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {coupon.type === 'percentage' 
                            ? `${coupon.value}%` 
                            : new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(coupon.value)
                          }
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Usage:</span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {coupon.usedCount}/{coupon.usageLimit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Expires:</span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {new Date(coupon.expiryDate).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(coupon.type)}`}>
                        {coupon.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(coupon.status)}`}>
                        {coupon.status}
                      </span>
                    </div>
                  </div>

                  {coupon.description && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {coupon.description}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Coupon Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingCoupon ? t('coupon.editCoupon') : t('coupon.addCoupon')}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('coupon.code')}
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="WELCOME10"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('coupon.type')}
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="percentage">{t('coupon.percentage')}</option>
                  <option value="fixed">{t('coupon.fixed')}</option>
                </select>
              </div>
              <Input
                label={t('coupon.discount')}
                name="value"
                type="number"
                value={formData.value}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t('coupon.expiryDate')}
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
              <Input
                label={t('coupon.usageLimit')}
                name="usageLimit"
                type="number"
                value={formData.usageLimit}
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
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Describe this coupon..."
              />
            </div>

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

export default HostCoupons;