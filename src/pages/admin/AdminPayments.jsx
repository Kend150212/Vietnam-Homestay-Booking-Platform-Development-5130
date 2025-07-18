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
  FiDollarSign,
  FiCreditCard,
  FiCheck,
  FiX,
  FiClock,
  FiDownload,
} = FiIcons;

const AdminPayments = () => {
  const { t } = useLanguage();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockPayments = [
      {
        id: 1,
        hostName: 'Dalat Homestay',
        hostEmail: 'host1@example.com',
        subscriptionPlan: 'premium',
        amount: 299000,
        currency: 'VND',
        paymentMethod: 'payos',
        status: 'completed',
        transactionId: 'TXN_001',
        dueDate: '2024-03-15',
        paidDate: '2024-03-14',
        period: 'March 2024',
      },
      {
        id: 2,
        hostName: 'Sapa Mountain View',
        hostEmail: 'host2@example.com',
        subscriptionPlan: 'basic',
        amount: 199000,
        currency: 'VND',
        paymentMethod: 'payos',
        status: 'pending',
        transactionId: 'TXN_002',
        dueDate: '2024-03-20',
        paidDate: null,
        period: 'March 2024',
      },
      {
        id: 3,
        hostName: 'Hoi An Villa',
        hostEmail: 'host3@example.com',
        subscriptionPlan: 'trial',
        amount: 0,
        currency: 'VND',
        paymentMethod: 'trial',
        status: 'active',
        transactionId: 'TRIAL_001',
        dueDate: '2024-03-25',
        paidDate: null,
        period: 'March 2024',
      },
    ];

    setTimeout(() => {
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = payments.filter(payment =>
      payment.hostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.hostEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPayments(filtered);
  }, [searchTerm, payments]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'premium':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'basic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'trial':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return FiCheck;
      case 'pending':
        return FiClock;
      case 'failed':
        return FiX;
      default:
        return FiCreditCard;
    }
  };

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = payments.filter(p => p.status === 'pending').length;

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
              {t('nav.payments')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage subscription payments and billing
            </p>
          </div>
          <Button icon={FiDownload} variant="outline">
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(totalRevenue)}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <SafeIcon icon={FiClock} className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pending Payments
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pendingPayments}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {payments.length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search payments..."
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

        {/* Payments List */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Host
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Plan
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Period
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Due Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {payment.hostName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {payment.hostEmail}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(payment.subscriptionPlan)}`}>
                        {payment.subscriptionPlan}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {payment.amount === 0 ? 'Free' : new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(payment.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900 dark:text-white">
                        {payment.period}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900 dark:text-white">
                        {new Date(payment.dueDate).toLocaleDateString('vi-VN')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <SafeIcon
                          icon={getStatusIcon(payment.status)}
                          className={`w-4 h-4 mr-2 ${
                            payment.status === 'completed' ? 'text-green-600' :
                            payment.status === 'pending' ? 'text-yellow-600' :
                            payment.status === 'failed' ? 'text-red-600' :
                            'text-blue-600'
                          }`}
                        />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {payment.transactionId}
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

export default AdminPayments;