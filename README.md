# UHOOM - Homestay Booking Platform

A comprehensive homestay booking platform built with React, featuring a complete setup wizard for easy deployment and configuration.

## Features

### 🏠 Core Platform Features
- **Multi-role System**: Admin, Host, and Guest roles
- **Booking Management**: Hourly, daily, and monthly bookings
- **Location & Room Management**: Comprehensive property management
- **Payment Integration**: Ready for payment gateway integration
- **Multilingual Support**: Vietnamese and English
- **Dark/Light Theme**: Complete theme switching
- **Responsive Design**: Mobile-first approach

### ⚙️ Setup Wizard Features
- **Step-by-step Configuration**: Guided setup process
- **Database Configuration**: PostgreSQL connection setup
- **Server Settings**: Port and security configuration
- **Admin Account Creation**: Initial administrator setup
- **Email Configuration**: SMTP setup for notifications
- **Security**: Auto-generated JWT secrets and encryption keys

## Quick Start

### Prerequisites
- Node.js 16 or higher
- PostgreSQL 12 or higher
- SMTP server (optional, for email notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uhoom-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the setup wizard**
   Navigate to `http://localhost:5173/setup` to begin the initial configuration.

## Setup Wizard Guide

### Step 1: Welcome & Requirements
- System requirements check
- Prerequisites verification

### Step 2: Database Configuration
- PostgreSQL connection settings
- Database name and credentials
- Connection testing

### Step 3: Server Configuration
- Server port configuration
- JWT secret key generation
- Encryption key setup

### Step 4: Admin Account Creation
- Administrator account setup
- Secure password requirements
- Email configuration

### Step 5: Application Settings
- Application name and URL
- Email notifications setup
- SMTP configuration (optional)

### Step 6: Completion
- Configuration review
- Setup finalization
- Redirect to login

## Default Credentials (Development)

After setup, you can use these demo credentials:

**Admin Account:**
- Email: admin@uhoom.vn
- Password: admin123

**Host Account:**
- Email: host@uhoom.vn
- Password: host123

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Button, Input, etc.)
│   └── ...
├── contexts/           # React contexts (Auth, Theme, Language)
├── pages/              # Page components
│   ├── admin/          # Admin dashboard pages
│   ├── auth/           # Authentication pages
│   ├── host/           # Host management pages
│   ├── public/         # Public pages
│   └── setup/          # Setup wizard pages
├── utils/              # Utility functions
└── ...
```

## Configuration Files

After running the setup wizard, configuration will be saved to:
- `localStorage` (development)
- Server configuration files (production)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=UHOOM
VITE_APP_VERSION=1.0.0
```

## Production Deployment

### 1. Complete Setup Wizard
Run through the setup wizard to configure all necessary settings.

### 2. Build the Application
```bash
npm run build
```

### 3. Deploy
Deploy the `dist` folder to your web server.

### 4. Database Setup
Ensure your PostgreSQL database is properly configured with the settings from the setup wizard.

### 5. Environment Configuration
Configure your production environment variables and server settings.

## API Integration

The platform is designed to work with a backend API. Key endpoints include:

- `/api/setup/*` - Setup wizard endpoints
- `/api/auth/*` - Authentication endpoints
- `/api/admin/*` - Admin management endpoints
- `/api/host/*` - Host management endpoints
- `/api/bookings/*` - Booking management endpoints

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Secure password storage
- **Input Validation**: Comprehensive form validation
- **CSRF Protection**: Cross-site request forgery protection
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Cross-site scripting prevention

## Customization

### Themes
The platform supports custom themes through CSS variables and Tailwind CSS configuration.

### Languages
Add new languages by extending the translation files in `src/contexts/LanguageContext.jsx`.

### Components
All components are modular and can be easily customized or replaced.

## Troubleshooting

### Setup Issues
1. Ensure all prerequisites are installed
2. Check database connection settings
3. Verify server port availability
4. Review browser console for errors

### Build Issues
1. Clear node_modules and reinstall dependencies
2. Check for ESLint errors
3. Verify all imports are correct
4. Ensure all required environment variables are set

## Support

For support and questions:
1. Check the documentation
2. Review the setup wizard steps
3. Check browser console for errors
4. Verify database and server configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Changelog

### Version 1.0.0
- Initial release
- Complete setup wizard
- Multi-role authentication system
- Booking management system
- Responsive design
- Multilingual support
- Theme switching