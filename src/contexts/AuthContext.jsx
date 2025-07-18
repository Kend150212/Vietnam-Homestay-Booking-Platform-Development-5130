import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Mock authentication - replace with actual API call
      const mockUsers = [
        { id: 1, email: 'admin@uhoom.vn', password: 'admin123', role: 'admin', name: 'Admin User' },
        { id: 2, email: 'host@uhoom.vn', password: 'host123', role: 'host', name: 'Host User' },
      ];

      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        toast.success('Đăng nhập thành công!');
        return { success: true, user: userWithoutPassword };
      } else {
        toast.error('Email hoặc mật khẩu không đúng');
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đăng nhập');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Mock registration - replace with actual API call
      const newUser = {
        id: Date.now(),
        ...userData,
        role: 'host',
        subscription_status: 'trial',
        created_at: new Date().toISOString(),
      };

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast.success('Đăng ký thành công!');
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đăng ký');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Đăng xuất thành công!');
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      
      // Mock profile update - replace with actual API call
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Cập nhật thông tin thành công!');
      return { success: true, user: updatedUser };
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật thông tin');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};