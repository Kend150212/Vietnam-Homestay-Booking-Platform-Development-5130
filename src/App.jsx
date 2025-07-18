import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';

// Setup pages
import SetupCheck from './pages/setup/SetupCheck';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHosts from './pages/admin/AdminHosts';
import AdminBookings from './pages/admin/AdminBookings';
import AdminPayments from './pages/admin/AdminPayments';
import AdminSettings from './pages/admin/AdminSettings';

// Host pages
import HostDashboard from './pages/host/HostDashboard';
import HostLocations from './pages/host/HostLocations';
import HostRooms from './pages/host/HostRooms';
import HostBookings from './pages/host/HostBookings';
import HostCoupons from './pages/host/HostCoupons';
import HostProfile from './pages/host/HostProfile';
import HostSettings from './pages/host/HostSettings';

// Public pages
import HomePage from './pages/public/HomePage';
import BookingPage from './pages/public/BookingPage';
import BookingConfirmation from './pages/public/BookingConfirmation';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Routes>
                {/* Setup Route */}
                <Route path="/setup" element={<SetupCheck />} />
                
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/homestay/:slug" element={<BookingPage />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/hosts" element={<ProtectedRoute role="admin"><AdminHosts /></ProtectedRoute>} />
                <Route path="/admin/bookings" element={<ProtectedRoute role="admin"><AdminBookings /></ProtectedRoute>} />
                <Route path="/admin/payments" element={<ProtectedRoute role="admin"><AdminPayments /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute role="admin"><AdminSettings /></ProtectedRoute>} />
                
                {/* Host Routes */}
                <Route path="/host" element={<ProtectedRoute role="host"><HostDashboard /></ProtectedRoute>} />
                <Route path="/host/locations" element={<ProtectedRoute role="host"><HostLocations /></ProtectedRoute>} />
                <Route path="/host/rooms" element={<ProtectedRoute role="host"><HostRooms /></ProtectedRoute>} />
                <Route path="/host/bookings" element={<ProtectedRoute role="host"><HostBookings /></ProtectedRoute>} />
                <Route path="/host/coupons" element={<ProtectedRoute role="host"><HostCoupons /></ProtectedRoute>} />
                <Route path="/host/profile" element={<ProtectedRoute role="host"><HostProfile /></ProtectedRoute>} />
                <Route path="/host/settings" element={<ProtectedRoute role="host"><HostSettings /></ProtectedRoute>} />
              </Routes>
              
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'var(--toast-bg)',
                    color: 'var(--toast-color)',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                  },
                }}
              />
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;