import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation strings
const translations = {
  vi: {
    // Common
    'common.loading': 'Đang tải...',
    'common.save': 'Lưu',
    'common.cancel': 'Hủy',
    'common.delete': 'Xóa',
    'common.edit': 'Sửa',
    'common.add': 'Thêm',
    'common.search': 'Tìm kiếm',
    'common.filter': 'Lọc',
    'common.reset': 'Đặt lại',
    'common.submit': 'Gửi',
    'common.close': 'Đóng',
    'common.confirm': 'Xác nhận',
    'common.back': 'Quay lại',
    'common.next': 'Tiếp theo',
    'common.previous': 'Trước',
    'common.view': 'Xem',
    'common.download': 'Tải xuống',
    'common.upload': 'Tải lên',
    'common.select': 'Chọn',
    'common.required': 'Bắt buộc',
    'common.optional': 'Tùy chọn',
    'common.yes': 'Có',
    'common.no': 'Không',
    'common.all': 'Tất cả',
    'common.none': 'Không có',
    'common.other': 'Khác',
    'common.total': 'Tổng',
    'common.subtotal': 'Tạm tính',
    'common.tax': 'Thuế',
    'common.discount': 'Giảm giá',
    'common.price': 'Giá',
    'common.quantity': 'Số lượng',
    'common.date': 'Ngày',
    'common.time': 'Thời gian',
    'common.status': 'Trạng thái',
    'common.name': 'Tên',
    'common.email': 'Email',
    'common.phone': 'Số điện thoại',
    'common.address': 'Địa chỉ',
    'common.description': 'Mô tả',
    'common.notes': 'Ghi chú',
    'common.actions': 'Hành động',

    // Auth
    'auth.login': 'Đăng nhập',
    'auth.register': 'Đăng ký',
    'auth.logout': 'Đăng xuất',
    'auth.email': 'Email',
    'auth.password': 'Mật khẩu',
    'auth.confirmPassword': 'Xác nhận mật khẩu',
    'auth.forgotPassword': 'Quên mật khẩu?',
    'auth.rememberMe': 'Ghi nhớ đăng nhập',
    'auth.loginTitle': 'Đăng nhập vào hệ thống',
    'auth.registerTitle': 'Đăng ký tài khoản mới',
    'auth.fullName': 'Họ và tên',
    'auth.businessName': 'Tên doanh nghiệp',
    'auth.businessAddress': 'Địa chỉ doanh nghiệp',
    'auth.businessPhone': 'Số điện thoại doanh nghiệp',

    // Navigation
    'nav.dashboard': 'Bảng điều khiển',
    'nav.locations': 'Địa điểm',
    'nav.rooms': 'Phòng',
    'nav.bookings': 'Đặt phòng',
    'nav.coupons': 'Mã giảm giá',
    'nav.profile': 'Hồ sơ',
    'nav.settings': 'Cài đặt',
    'nav.hosts': 'Chủ nhà',
    'nav.payments': 'Thanh toán',
    'nav.reports': 'Báo cáo',

    // Dashboard
    'dashboard.welcome': 'Chào mừng',
    'dashboard.totalBookings': 'Tổng đặt phòng',
    'dashboard.totalRevenue': 'Tổng doanh thu',
    'dashboard.totalRooms': 'Tổng số phòng',
    'dashboard.occupancyRate': 'Tỷ lệ lấp đầy',
    'dashboard.recentBookings': 'Đặt phòng gần đây',
    'dashboard.popularRooms': 'Phòng phổ biến',
    'dashboard.monthlyStats': 'Thống kê tháng',
    'dashboard.quickActions': 'Hành động nhanh',

    // Bookings
    'booking.title': 'Đặt phòng',
    'booking.checkIn': 'Ngày nhận phòng',
    'booking.checkOut': 'Ngày trả phòng',
    'booking.guests': 'Số khách',
    'booking.room': 'Phòng',
    'booking.total': 'Tổng tiền',
    'booking.confirm': 'Xác nhận đặt phòng',
    'booking.cancel': 'Hủy đặt phòng',
    'booking.pending': 'Đang chờ',
    'booking.confirmed': 'Đã xác nhận',
    'booking.cancelled': 'Đã hủy',
    'booking.completed': 'Hoàn thành',
    'booking.customerInfo': 'Thông tin khách hàng',
    'booking.roomInfo': 'Thông tin phòng',
    'booking.paymentInfo': 'Thông tin thanh toán',
    'booking.bookingType': 'Loại đặt phòng',
    'booking.hourly': 'Theo giờ',
    'booking.daily': 'Theo ngày',
    'booking.monthly': 'Theo tháng',

    // Rooms
    'room.title': 'Phòng',
    'room.name': 'Tên phòng',
    'room.type': 'Loại phòng',
    'room.capacity': 'Sức chứa',
    'room.price': 'Giá',
    'room.amenities': 'Tiện nghi',
    'room.available': 'Có sẵn',
    'room.unavailable': 'Không có sẵn',
    'room.addRoom': 'Thêm phòng',
    'room.editRoom': 'Sửa phòng',
    'room.deleteRoom': 'Xóa phòng',
    'room.roomDetails': 'Chi tiết phòng',
    'room.pricePerHour': 'Giá theo giờ',
    'room.pricePerDay': 'Giá theo ngày',
    'room.pricePerMonth': 'Giá theo tháng',

    // Locations
    'location.title': 'Địa điểm',
    'location.name': 'Tên địa điểm',
    'location.address': 'Địa chỉ',
    'location.city': 'Thành phố',
    'location.province': 'Tỉnh/Thành phố',
    'location.addLocation': 'Thêm địa điểm',
    'location.editLocation': 'Sửa địa điểm',
    'location.deleteLocation': 'Xóa địa điểm',

    // Coupons
    'coupon.title': 'Mã giảm giá',
    'coupon.code': 'Mã',
    'coupon.discount': 'Giảm giá',
    'coupon.type': 'Loại',
    'coupon.percentage': 'Phần trăm',
    'coupon.fixed': 'Cố định',
    'coupon.expiryDate': 'Ngày hết hạn',
    'coupon.usageLimit': 'Giới hạn sử dụng',
    'coupon.used': 'Đã sử dụng',
    'coupon.addCoupon': 'Thêm mã giảm giá',
    'coupon.editCoupon': 'Sửa mã giảm giá',
    'coupon.deleteCoupon': 'Xóa mã giảm giá',
    'coupon.active': 'Hoạt động',
    'coupon.inactive': 'Không hoạt động',
    'coupon.expired': 'Hết hạn',

    // Settings
    'settings.title': 'Cài đặt',
    'settings.general': 'Chung',
    'settings.appearance': 'Giao diện',
    'settings.language': 'Ngôn ngữ',
    'settings.theme': 'Chủ đề',
    'settings.darkMode': 'Chế độ tối',
    'settings.lightMode': 'Chế độ sáng',
    'settings.notifications': 'Thông báo',
    'settings.payment': 'Thanh toán',
    'settings.tax': 'Thuế',
    'settings.booking': 'Đặt phòng',
    'settings.privacy': 'Quyền riêng tư',
    'settings.security': 'Bảo mật',

    // Profile
    'profile.title': 'Hồ sơ',
    'profile.personalInfo': 'Thông tin cá nhân',
    'profile.businessInfo': 'Thông tin doanh nghiệp',
    'profile.changePassword': 'Đổi mật khẩu',
    'profile.currentPassword': 'Mật khẩu hiện tại',
    'profile.newPassword': 'Mật khẩu mới',
    'profile.confirmNewPassword': 'Xác nhận mật khẩu mới',
    'profile.avatar': 'Ảnh đại diện',
    'profile.uploadAvatar': 'Tải lên ảnh đại diện',

    // Public booking page
    'public.selectRoom': 'Chọn phòng',
    'public.selectDates': 'Chọn ngày',
    'public.guestDetails': 'Thông tin khách',
    'public.paymentMethod': 'Phương thức thanh toán',
    'public.bookNow': 'Đặt ngay',
    'public.applyCoupon': 'Áp dụng mã giảm giá',
    'public.couponCode': 'Mã giảm giá',
    'public.addOns': 'Dịch vụ thêm',
    'public.breakfast': 'Bữa sáng',
    'public.tour': 'Tour',
    'public.transfer': 'Đưa đón',
    'public.bookingSuccess': 'Đặt phòng thành công',
    'public.bookingFailed': 'Đặt phòng thất bại',
    'public.contactHost': 'Liên hệ chủ nhà',

    // Error messages
    'error.required': 'Trường này là bắt buộc',
    'error.email': 'Email không hợp lệ',
    'error.phone': 'Số điện thoại không hợp lệ',
    'error.minLength': 'Độ dài tối thiểu là {min} ký tự',
    'error.maxLength': 'Độ dài tối đa là {max} ký tự',
    'error.passwordMismatch': 'Mật khẩu xác nhận không khớp',
    'error.invalidDate': 'Ngày không hợp lệ',
    'error.pastDate': 'Ngày không thể trong quá khứ',
    'error.endBeforeStart': 'Ngày kết thúc phải sau ngày bắt đầu',
    'error.networkError': 'Lỗi mạng, vui lòng thử lại',
    'error.serverError': 'Lỗi máy chủ, vui lòng thử lại sau',
    'error.unauthorized': 'Không có quyền truy cập',
    'error.forbidden': 'Truy cập bị từ chối',
    'error.notFound': 'Không tìm thấy',
    'error.conflict': 'Dữ liệu đã tồn tại',
    'error.validation': 'Dữ liệu không hợp lệ',

    // Success messages
    'success.saved': 'Đã lưu thành công',
    'success.deleted': 'Đã xóa thành công',
    'success.updated': 'Đã cập nhật thành công',
    'success.created': 'Đã tạo thành công',
    'success.sent': 'Đã gửi thành công',
    'success.uploaded': 'Đã tải lên thành công',
    'success.copied': 'Đã sao chép thành công',
    'success.booked': 'Đặt phòng thành công',
    'success.cancelled': 'Đã hủy thành công',
    'success.confirmed': 'Đã xác nhận thành công',
  },
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.reset': 'Reset',
    'common.submit': 'Submit',
    'common.close': 'Close',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.view': 'View',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.select': 'Select',
    'common.required': 'Required',
    'common.optional': 'Optional',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.all': 'All',
    'common.none': 'None',
    'common.other': 'Other',
    'common.total': 'Total',
    'common.subtotal': 'Subtotal',
    'common.tax': 'Tax',
    'common.discount': 'Discount',
    'common.price': 'Price',
    'common.quantity': 'Quantity',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.status': 'Status',
    'common.name': 'Name',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.address': 'Address',
    'common.description': 'Description',
    'common.notes': 'Notes',
    'common.actions': 'Actions',

    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.rememberMe': 'Remember Me',
    'auth.loginTitle': 'Login to System',
    'auth.registerTitle': 'Create New Account',
    'auth.fullName': 'Full Name',
    'auth.businessName': 'Business Name',
    'auth.businessAddress': 'Business Address',
    'auth.businessPhone': 'Business Phone',

    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.locations': 'Locations',
    'nav.rooms': 'Rooms',
    'nav.bookings': 'Bookings',
    'nav.coupons': 'Coupons',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.hosts': 'Hosts',
    'nav.payments': 'Payments',
    'nav.reports': 'Reports',

    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.totalBookings': 'Total Bookings',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.totalRooms': 'Total Rooms',
    'dashboard.occupancyRate': 'Occupancy Rate',
    'dashboard.recentBookings': 'Recent Bookings',
    'dashboard.popularRooms': 'Popular Rooms',
    'dashboard.monthlyStats': 'Monthly Statistics',
    'dashboard.quickActions': 'Quick Actions',

    // Bookings
    'booking.title': 'Bookings',
    'booking.checkIn': 'Check-in Date',
    'booking.checkOut': 'Check-out Date',
    'booking.guests': 'Guests',
    'booking.room': 'Room',
    'booking.total': 'Total',
    'booking.confirm': 'Confirm Booking',
    'booking.cancel': 'Cancel Booking',
    'booking.pending': 'Pending',
    'booking.confirmed': 'Confirmed',
    'booking.cancelled': 'Cancelled',
    'booking.completed': 'Completed',
    'booking.customerInfo': 'Customer Information',
    'booking.roomInfo': 'Room Information',
    'booking.paymentInfo': 'Payment Information',
    'booking.bookingType': 'Booking Type',
    'booking.hourly': 'Hourly',
    'booking.daily': 'Daily',
    'booking.monthly': 'Monthly',

    // Rooms
    'room.title': 'Rooms',
    'room.name': 'Room Name',
    'room.type': 'Room Type',
    'room.capacity': 'Capacity',
    'room.price': 'Price',
    'room.amenities': 'Amenities',
    'room.available': 'Available',
    'room.unavailable': 'Unavailable',
    'room.addRoom': 'Add Room',
    'room.editRoom': 'Edit Room',
    'room.deleteRoom': 'Delete Room',
    'room.roomDetails': 'Room Details',
    'room.pricePerHour': 'Price per Hour',
    'room.pricePerDay': 'Price per Day',
    'room.pricePerMonth': 'Price per Month',

    // Locations
    'location.title': 'Locations',
    'location.name': 'Location Name',
    'location.address': 'Address',
    'location.city': 'City',
    'location.province': 'Province',
    'location.addLocation': 'Add Location',
    'location.editLocation': 'Edit Location',
    'location.deleteLocation': 'Delete Location',

    // Coupons
    'coupon.title': 'Coupons',
    'coupon.code': 'Code',
    'coupon.discount': 'Discount',
    'coupon.type': 'Type',
    'coupon.percentage': 'Percentage',
    'coupon.fixed': 'Fixed',
    'coupon.expiryDate': 'Expiry Date',
    'coupon.usageLimit': 'Usage Limit',
    'coupon.used': 'Used',
    'coupon.addCoupon': 'Add Coupon',
    'coupon.editCoupon': 'Edit Coupon',
    'coupon.deleteCoupon': 'Delete Coupon',
    'coupon.active': 'Active',
    'coupon.inactive': 'Inactive',
    'coupon.expired': 'Expired',

    // Settings
    'settings.title': 'Settings',
    'settings.general': 'General',
    'settings.appearance': 'Appearance',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.darkMode': 'Dark Mode',
    'settings.lightMode': 'Light Mode',
    'settings.notifications': 'Notifications',
    'settings.payment': 'Payment',
    'settings.tax': 'Tax',
    'settings.booking': 'Booking',
    'settings.privacy': 'Privacy',
    'settings.security': 'Security',

    // Profile
    'profile.title': 'Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.businessInfo': 'Business Information',
    'profile.changePassword': 'Change Password',
    'profile.currentPassword': 'Current Password',
    'profile.newPassword': 'New Password',
    'profile.confirmNewPassword': 'Confirm New Password',
    'profile.avatar': 'Avatar',
    'profile.uploadAvatar': 'Upload Avatar',

    // Public booking page
    'public.selectRoom': 'Select Room',
    'public.selectDates': 'Select Dates',
    'public.guestDetails': 'Guest Details',
    'public.paymentMethod': 'Payment Method',
    'public.bookNow': 'Book Now',
    'public.applyCoupon': 'Apply Coupon',
    'public.couponCode': 'Coupon Code',
    'public.addOns': 'Add-ons',
    'public.breakfast': 'Breakfast',
    'public.tour': 'Tour',
    'public.transfer': 'Transfer',
    'public.bookingSuccess': 'Booking Successful',
    'public.bookingFailed': 'Booking Failed',
    'public.contactHost': 'Contact Host',

    // Error messages
    'error.required': 'This field is required',
    'error.email': 'Invalid email address',
    'error.phone': 'Invalid phone number',
    'error.minLength': 'Minimum length is {min} characters',
    'error.maxLength': 'Maximum length is {max} characters',
    'error.passwordMismatch': 'Passwords do not match',
    'error.invalidDate': 'Invalid date',
    'error.pastDate': 'Date cannot be in the past',
    'error.endBeforeStart': 'End date must be after start date',
    'error.networkError': 'Network error, please try again',
    'error.serverError': 'Server error, please try again later',
    'error.unauthorized': 'Unauthorized access',
    'error.forbidden': 'Access forbidden',
    'error.notFound': 'Not found',
    'error.conflict': 'Data already exists',
    'error.validation': 'Invalid data',

    // Success messages
    'success.saved': 'Saved successfully',
    'success.deleted': 'Deleted successfully',
    'success.updated': 'Updated successfully',
    'success.created': 'Created successfully',
    'success.sent': 'Sent successfully',
    'success.uploaded': 'Uploaded successfully',
    'success.copied': 'Copied successfully',
    'success.booked': 'Booked successfully',
    'success.cancelled': 'Cancelled successfully',
    'success.confirmed': 'Confirmed successfully',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('vi');

  useEffect(() => {
    // Check for stored language preference
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage && translations[storedLanguage]) {
      setLanguage(storedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    }
  };

  const t = (key, params = {}) => {
    const translation = translations[language]?.[key] || key;
    
    // Replace parameters in translation
    return Object.keys(params).reduce((result, param) => {
      return result.replace(`{${param}}`, params[param]);
    }, translation);
  };

  const value = {
    language,
    changeLanguage,
    t,
    translations: translations[language] || translations.vi,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};