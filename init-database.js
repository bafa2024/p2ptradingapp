// Database Initialization Script for OKX Platform
// This script sets up the initial database structure and system settings

const DatabaseService = require('./database-service');
const { serverTimestamp } = require('firebase/firestore');

class DatabaseInitializer {
  constructor() {
    this.dbService = new DatabaseService();
  }

  // Initialize system settings
  async initializeSystemSettings() {
    console.log('Initializing system settings...');
    
    try {
      // Trading settings
      await this.dbService.setSystemSetting('trading', 'platform_fee_percentage', 1.0, 'Platform trading fee percentage');
      await this.dbService.setSystemSetting('trading', 'min_trade_amount', 10, 'Minimum trade amount in USDT');
      await this.dbService.setSystemSetting('trading', 'max_trade_amount', 10000, 'Maximum trade amount in USDT');
      await this.dbService.setSystemSetting('trading', 'trade_timeout_hours', 24, 'Trade timeout in hours');
      
      // KYC settings
      await this.dbService.setSystemSetting('kyc', 'kyc_required', true, 'KYC verification required');
      await this.dbService.setSystemSetting('kyc', 'kyc_auto_approval', false, 'Automatic KYC approval');
      await this.dbService.setSystemSetting('kyc', 'kyc_document_types', ['id_card', 'passport', 'selfie', 'proof_of_address'], 'Required KYC document types');
      
      // Wallet settings
      await this.dbService.setSystemSetting('wallet', 'daily_withdrawal_limit', 1000, 'Daily withdrawal limit in USD');
      await this.dbService.setSystemSetting('wallet', 'monthly_withdrawal_limit', 10000, 'Monthly withdrawal limit in USD');
      await this.dbService.setSystemSetting('wallet', 'min_withdrawal_amount', 10, 'Minimum withdrawal amount');
      
      // Referral settings
      await this.dbService.setSystemSetting('referral', 'referral_enabled', true, 'Referral system enabled');
      await this.dbService.setSystemSetting('referral', 'referral_reward_type', 'trade_fee_waiver', 'Referral reward type');
      await this.dbService.setSystemSetting('referral', 'referral_expiry_days', 30, 'Referral expiry in days');
      
      // Support settings
      await this.dbService.setSystemSetting('support', 'auto_assign_tickets', true, 'Automatically assign support tickets');
      await this.dbService.setSystemSetting('support', 'ticket_priority_levels', ['low', 'medium', 'high', 'urgent'], 'Support ticket priority levels');
      
      // Notification settings
      await this.dbService.setSystemSetting('notifications', 'email_notifications', true, 'Email notifications enabled');
      await this.dbService.setSystemSetting('notifications', 'push_notifications', true, 'Push notifications enabled');
      await this.dbService.setSystemSetting('notifications', 'sms_notifications', false, 'SMS notifications enabled');
      
      // Security settings
      await this.dbService.setSystemSetting('security', 'max_login_attempts', 5, 'Maximum login attempts');
      await this.dbService.setSystemSetting('security', 'session_timeout_hours', 24, 'Session timeout in hours');
      await this.dbService.setSystemSetting('security', 'two_factor_required', false, 'Two-factor authentication required');
      
      // Maintenance settings
      await this.dbService.setSystemSetting('maintenance', 'maintenance_mode', false, 'Maintenance mode enabled');
      await this.dbService.setSystemSetting('maintenance', 'maintenance_message', 'Platform is under maintenance', 'Maintenance message');
      
      console.log('✅ System settings initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize system settings:', error.message);
      throw error;
    }
  }

  // Initialize default admin user
  async initializeAdminUser() {
    console.log('Initializing admin user...');
    
    try {
      // This would typically be done through Firebase Auth
      // For now, we'll create a placeholder admin user structure
      const adminUserData = {
        email: 'admin@okxplatform.com',
        displayName: 'System Administrator',
        phoneNumber: '+1234567890',
        nationality: 'System',
        country: 'System',
        city: 'System',
        address: 'System Address',
        isVerified: true,
        kycStatus: 'approved',
        membershipStatus: 'vip',
        isActive: true,
        isBanned: false,
        totalTrades: 0,
        successfulTrades: 0,
        failedTrades: 0,
        totalVolume: 0,
        rating: 5,
        reviewCount: 0
      };

      // Note: In production, this would be created through Firebase Auth
      // and then the user document would be created via Cloud Functions
      console.log('✅ Admin user structure prepared');
      console.log('📝 Note: Admin user must be created through Firebase Auth first');
      
    } catch (error) {
      console.error('❌ Failed to initialize admin user:', error.message);
      throw error;
    }
  }

  // Initialize default payment methods
  async initializePaymentMethods() {
    console.log('Initializing payment methods...');
    
    try {
      const paymentMethods = [
        {
          id: 'bank_transfer',
          name: 'Bank Transfer',
          description: 'Direct bank transfer',
          supportedCurrencies: ['IQD', 'USD'],
          processingTime: '1-3 business days',
          fees: 0,
          isActive: true
        },
        {
          id: 'cash_deposit',
          name: 'Cash Deposit',
          description: 'Cash deposit at bank branch',
          supportedCurrencies: ['IQD', 'USD'],
          processingTime: 'Same day',
          fees: 0,
          isActive: true
        },
        {
          id: 'mobile_money',
          name: 'Mobile Money',
          description: 'Mobile money transfer',
          supportedCurrencies: ['IQD'],
          processingTime: 'Instant',
          fees: 0.5,
          isActive: true
        },
        {
          id: 'paypal',
          name: 'PayPal',
          description: 'PayPal transfer',
          supportedCurrencies: ['USD'],
          processingTime: '1-2 business days',
          fees: 2.9,
          isActive: false
        }
      ];

      // Store payment methods in system settings
      await this.dbService.setSystemSetting('payment', 'available_methods', paymentMethods, 'Available payment methods');
      
      console.log('✅ Payment methods initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize payment methods:', error.message);
      throw error;
    }
  }

  // Initialize default currencies
  async initializeCurrencies() {
    console.log('Initializing currencies...');
    
    try {
      const currencies = [
        {
          code: 'USDT',
          name: 'Tether USD',
          symbol: '₮',
          type: 'crypto',
          decimals: 6,
          isActive: true,
          exchangeRate: 1.0,
          minAmount: 1,
          maxAmount: 100000
        },
        {
          code: 'IQD',
          name: 'Iraqi Dinar',
          symbol: 'د.ع',
          type: 'fiat',
          decimals: 3,
          isActive: true,
          exchangeRate: 0.00068,
          minAmount: 1000,
          maxAmount: 10000000
        },
        {
          code: 'USD',
          name: 'US Dollar',
          symbol: '$',
          type: 'fiat',
          decimals: 2,
          isActive: true,
          exchangeRate: 1.0,
          minAmount: 1,
          maxAmount: 100000
        }
      ];

      // Store currencies in system settings
      await this.dbService.setSystemSetting('currency', 'supported_currencies', currencies, 'Supported currencies');
      
      console.log('✅ Currencies initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize currencies:', error.message);
      throw error;
    }
  }

  // Initialize default locations
  async initializeLocations() {
    console.log('Initializing locations...');
    
    try {
      const locations = [
        {
          id: 'baghdad',
          name: 'Baghdad',
          country: 'Iraq',
          region: 'Baghdad Governorate',
          isActive: true,
          coordinates: { lat: 33.3152, lng: 44.3661 }
        },
        {
          id: 'basra',
          name: 'Basra',
          country: 'Iraq',
          region: 'Basra Governorate',
          isActive: true,
          coordinates: { lat: 30.5000, lng: 47.8167 }
        },
        {
          id: 'erbil',
          name: 'Erbil',
          country: 'Iraq',
          region: 'Erbil Governorate',
          isActive: true,
          coordinates: { lat: 36.1901, lng: 43.9930 }
        },
        {
          id: 'mosul',
          name: 'Mosul',
          country: 'Iraq',
          region: 'Nineveh Governorate',
          isActive: true,
          coordinates: { lat: 36.3450, lng: 43.1450 }
        }
      ];

      // Store locations in system settings
      await this.dbService.setSystemSetting('location', 'supported_locations', locations, 'Supported trading locations');
      
      console.log('✅ Locations initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize locations:', error.message);
      throw error;
    }
  }

  // Initialize default trade categories
  async initializeTradeCategories() {
    console.log('Initializing trade categories...');
    
    try {
      const categories = [
        {
          id: 'spot_trading',
          name: 'Spot Trading',
          description: 'Immediate cryptocurrency trading',
          isActive: true,
          minAmount: 10,
          maxAmount: 10000
        },
        {
          id: 'p2p_trading',
          name: 'P2P Trading',
          description: 'Peer-to-peer cryptocurrency trading',
          isActive: true,
          minAmount: 1,
          maxAmount: 50000
        },
        {
          id: 'otc_trading',
          name: 'OTC Trading',
          description: 'Over-the-counter large volume trading',
          isActive: false,
          minAmount: 10000,
          maxAmount: 1000000
        }
      ];

      // Store trade categories in system settings
      await this.dbService.setSystemSetting('trading', 'categories', categories, 'Trade categories');
      
      console.log('✅ Trade categories initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize trade categories:', error.message);
      throw error;
    }
  }

  // Initialize default notification templates
  async initializeNotificationTemplates() {
    console.log('Initializing notification templates...');
    
    try {
      const templates = [
        {
          id: 'welcome_user',
          name: 'Welcome User',
          subject: 'Welcome to OKX Platform',
          body: 'Thank you for joining our P2P trading platform! We\'re excited to have you on board.',
          type: 'email',
          isActive: true
        },
        {
          id: 'trade_completed',
          name: 'Trade Completed',
          subject: 'Trade Completed Successfully',
          body: 'Your trade for {amount} {currency} has been completed successfully. Thank you for using our platform!',
          type: 'push',
          isActive: true
        },
        {
          id: 'kyc_approved',
          name: 'KYC Approved',
          subject: 'KYC Verification Approved',
          body: 'Congratulations! Your identity verification has been approved. You can now access all platform features.',
          type: 'email',
          isActive: true
        },
        {
          id: 'kyc_rejected',
          name: 'KYC Rejected',
          subject: 'KYC Verification Update',
          body: 'Your identity verification was not approved. Please review the requirements and submit again.',
          type: 'email',
          isActive: true
        },
        {
          id: 'withdrawal_requested',
          name: 'Withdrawal Requested',
          subject: 'Withdrawal Request Received',
          body: 'Your withdrawal request for {amount} {currency} has been received and is being processed.',
          type: 'push',
          isActive: true
        }
      ];

      // Store notification templates in system settings
      await this.dbService.setSystemSetting('notifications', 'templates', templates, 'Notification templates');
      
      console.log('✅ Notification templates initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize notification templates:', error.message);
      throw error;
    }
  }

  // Main initialization function
  async initializeDatabase() {
    console.log('🚀 Starting database initialization...');
    console.log('=====================================');
    
    try {
      // Initialize all components
      await this.initializeSystemSettings();
      await this.initializePaymentMethods();
      await this.initializeCurrencies();
      await this.initializeLocations();
      await this.initializeTradeCategories();
      await this.initializeNotificationTemplates();
      await this.initializeAdminUser();
      
      console.log('=====================================');
      console.log('🎉 Database initialization completed successfully!');
      console.log('');
      console.log('Next steps:');
      console.log('1. Create Firebase project and update configuration');
      console.log('2. Deploy Firestore security rules');
      console.log('3. Deploy Cloud Functions');
      console.log('4. Create admin user through Firebase Auth');
      console.log('5. Test the platform functionality');
      
    } catch (error) {
      console.error('=====================================');
      console.error('💥 Database initialization failed!');
      console.error('Error:', error.message);
      throw error;
    }
  }
}

// Export the initializer
module.exports = DatabaseInitializer;

// If running directly, execute initialization
if (require.main === module) {
  const initializer = new DatabaseInitializer();
  initializer.initializeDatabase()
    .then(() => {
      console.log('✅ Initialization script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Initialization script failed:', error.message);
      process.exit(1);
    });
}
