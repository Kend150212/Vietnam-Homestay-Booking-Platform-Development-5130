// Utility functions for setup process

export const validateDatabaseConnection = async (config) => {
  try {
    // Mock database connection validation
    const response = await fetch('/api/setup/test-db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    
    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const generateSecureKey = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const createConfigFile = (setupData) => {
  const config = {
    database: {
      host: setupData.dbHost,
      port: parseInt(setupData.dbPort),
      database: setupData.dbName,
      username: setupData.dbUser,
      password: setupData.dbPassword,
    },
    server: {
      port: parseInt(setupData.serverPort),
      jwtSecret: setupData.jwtSecret,
      encryptionKey: setupData.encryptionKey,
    },
    application: {
      name: setupData.appName,
      url: setupData.appUrl,
    },
    email: {
      enabled: setupData.emailEnabled,
      smtp: setupData.emailEnabled ? {
        host: setupData.smtpHost,
        port: parseInt(setupData.smtpPort),
        secure: parseInt(setupData.smtpPort) === 465,
        auth: {
          user: setupData.smtpUser,
          pass: setupData.smtpPassword,
        },
      } : null,
    },
    admin: {
      name: setupData.adminName,
      email: setupData.adminEmail,
      // Note: Password should be hashed before storing
    },
  };
  
  return config;
};

export const saveSetupData = async (setupData) => {
  try {
    const config = createConfigFile(setupData);
    
    // In a real application, this would save to the server
    const response = await fetch('/api/setup/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    
    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const checkSystemRequirements = async () => {
  try {
    // Mock system requirements check
    const response = await fetch('/api/setup/requirements');
    return await response.json();
  } catch (error) {
    return {
      success: false,
      requirements: {
        nodejs: { installed: false, version: null, required: '16.0.0' },
        database: { connected: false, version: null, required: '12.0.0' },
        memory: { available: 0, required: 512 },
        disk: { available: 0, required: 1024 },
      },
    };
  }
};

export const initializeDatabase = async (config) => {
  try {
    const response = await fetch('/api/setup/init-db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    
    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createAdminUser = async (adminData) => {
  try {
    const response = await fetch('/api/setup/create-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData),
    });
    
    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
};