// Shared Language Management System for IQX P2P Trading App
class SharedLanguageManager {
    constructor(context = 'app') {
        this.context = context; // 'app' or 'admin'
        this.currentLanguage = localStorage.getItem(`iqx_${context}_language`) || 'en';
        this.translations = {
            en: {
                // Common Navigation
                'nav_p2p': 'P2P',
                'nav_wallet': 'Wallet',
                'nav_transfer': 'Transfer',
                'nav_profile': 'Profile',
                'nav_dashboard': 'Dashboard',
                'nav_users': 'Users',
                'nav_trades': 'Trades',
                'nav_master_wallet': 'Master Wallet',
                'nav_membership': 'Membership & KYC',
                'nav_kyc': 'KYC Verification',
                'nav_disputes': 'Disputes',
                'nav_commissions': 'Commissions',
                'nav_reports': 'Reports',
                'nav_support': 'Support',
                'nav_settings': 'Settings',
                'nav_permissions': 'Permissions',
                
                // Common Actions
                'loading': 'Loading...',
                'save': 'Save',
                'cancel': 'Cancel',
                'confirm': 'Confirm',
                'delete': 'Delete',
                'edit': 'Edit',
                'view': 'View',
                'back': 'Back',
                'next': 'Next',
                'previous': 'Previous',
                'search': 'Search',
                'filter': 'Filter',
                'clear': 'Clear',
                'apply': 'Apply',
                'close': 'Close',
                'submit': 'Submit',
                'reset': 'Reset',
                'export': 'Export',
                'import': 'Import',
                'refresh': 'Refresh',
                'download': 'Download',
                'upload': 'Upload',
                'approve': 'Approve',
                'reject': 'Reject',
                'suspend': 'Suspend',
                'activate': 'Activate',
                'deactivate': 'Deactivate',
                
                // Authentication
                'login': 'Login',
                'register': 'Register',
                'logout': 'Logout',
                'email': 'Email',
                'password': 'Password',
                'confirm_password': 'Confirm Password',
                'phone': 'Phone Number',
                'verification_code': 'Verification Code',
                'forgot_password': 'Forgot Password?',
                'reset_password': 'Reset Password',
                'create_account': 'Create Account',
                'already_have_account': 'Already have an account?',
                'dont_have_account': "Don't have an account?",
                'remember_me': 'Remember Me',
                'admin_login': 'Admin Login',
                'admin_panel': 'Admin Panel',
                
                // P2P Trading
                'buy': 'Buy',
                'sell': 'Sell',
                'price': 'Price',
                'amount': 'Amount',
                'currency': 'Currency',
                'payment_method': 'Payment Method',
                'payment_methods': 'Payment Methods',
                'order_limit': 'Order Limit',
                'completion_rate': 'Completion Rate',
                'transactions': 'Transactions',
                'merchant': 'Merchant',
                'merchants': 'Merchants',
                'ad': 'Ad',
                'ads': 'Ads',
                'post_ad': 'Post Ad',
                'my_ads': 'My Ads',
                'active_ads': 'Active Ads',
                'inactive_ads': 'Inactive Ads',
                
                // Mobile App Specific
                'live_market_rates': 'Live Market Rates',
                'updated_just_now': 'Updated: Just now',
                'your_trades': 'Your Trades',
                'success_rate': 'Success Rate',
                'active_trades': 'Active Trades',
                'excellent': 'Excellent',
                'plus_12_this_week': '+12 this week',
                'bank_transfer': 'Bank Transfer',
                'all': 'All',
                'p2p': 'P2P',
                'search_placeholder': 'Search crypto, users, or payment methods...',
                
                // Wallet
                'balance': 'Balance',
                'available_balance': 'Available Balance',
                'frozen_balance': 'Frozen Balance',
                'deposit': 'Deposit',
                'withdraw': 'Withdraw',
                'transfer': 'Transfer',
                'history': 'History',
                'transaction_history': 'Transaction History',
                'recent_transactions': 'Recent Transactions',
                'transaction_id': 'Transaction ID',
                'transaction_type': 'Transaction Type',
                'transaction_status': 'Transaction Status',
                'transaction_date': 'Transaction Date',
                'transaction_amount': 'Transaction Amount',
                'transaction_fee': 'Transaction Fee',
                
                // Profile
                'profile': 'Profile',
                'personal_info': 'Personal Information',
                'account_info': 'Account Information',
                'security_settings': 'Security Settings',
                'notification_settings': 'Notification Settings',
                'language_settings': 'Language Settings',
                'currency_settings': 'Currency Settings',
                'dark_mode': 'Dark Mode',
                'light_mode': 'Light Mode',
                'auto_mode': 'Auto Mode',
                
                // Admin Panel Specific
                'dashboard': 'Dashboard',
                'users': 'Users',
                'trades': 'Trades',
                'wallet': 'Wallet',
                'master_wallet': 'Master Wallet',
                'membership': 'Membership & KYC',
                'kyc': 'KYC Verification',
                'disputes': 'Disputes',
                'commissions': 'Commissions',
                'reports': 'Reports',
                'support': 'Support',
                'settings': 'Settings',
                'permissions': 'Permissions',
                
                // Dashboard
                'total_users': 'Total Users',
                'active_users': 'Active Users',
                'new_users': 'New Users',
                'total_trades': 'Total Trades',
                'completed_trades': 'Completed Trades',
                'pending_trades': 'Pending Trades',
                'total_volume': 'Total Volume',
                'daily_volume': 'Daily Volume',
                'monthly_volume': 'Monthly Volume',
                'revenue': 'Revenue',
                'profit': 'Profit',
                'loss': 'Loss',
                'growth_rate': 'Growth Rate',
                'conversion_rate': 'Conversion Rate',
                
                // Users
                'user_management': 'User Management',
                'user_list': 'User List',
                'user_details': 'User Details',
                'user_id': 'User ID',
                'username': 'Username',
                'full_name': 'Full Name',
                'first_name': 'First Name',
                'last_name': 'Last Name',
                'email_address': 'Email Address',
                'phone_number': 'Phone Number',
                'registration_date': 'Registration Date',
                'last_login': 'Last Login',
                'account_status': 'Account Status',
                'verification_status': 'Verification Status',
                'membership_status': 'Membership Status',
                'user_type': 'User Type',
                'user_level': 'User Level',
                'user_balance': 'User Balance',
                'user_transactions': 'User Transactions',
                
                // KYC
                'kyc_verification': 'KYC Verification',
                'kyc_management': 'KYC Management',
                'kyc_applications': 'KYC Applications',
                'kyc_status': 'KYC Status',
                'kyc_documents': 'KYC Documents',
                'identity_verification': 'Identity Verification',
                'address_verification': 'Address Verification',
                'document_verification': 'Document Verification',
                'verification_pending': 'Verification Pending',
                'verification_approved': 'Verification Approved',
                'verification_rejected': 'Verification Rejected',
                
                // Membership
                'membership_management': 'Membership Management',
                'membership_plans': 'Membership Plans',
                'free_trial': 'Free Trial',
                'trial_period': 'Trial Period',
                'trial_duration': 'Trial Duration',
                'trial_end_date': 'Trial End Date',
                'membership_activation': 'Membership Activation',
                'auto_activate': 'Auto Activate',
                'manual_activation': 'Manual Activation',
                
                // Trades
                'trade_management': 'Trade Management',
                'trade_list': 'Trade List',
                'trade_details': 'Trade Details',
                'trade_id': 'Trade ID',
                'trade_status': 'Trade Status',
                'trade_amount': 'Trade Amount',
                'trade_fee': 'Trade Fee',
                'trade_date': 'Trade Date',
                'buyer': 'Buyer',
                'seller': 'Seller',
                'trade_type': 'Trade Type',
                'trade_method': 'Trade Method',
                
                // Disputes
                'dispute_management': 'Dispute Management',
                'dispute_list': 'Dispute List',
                'dispute_details': 'Dispute Details',
                'dispute_id': 'Dispute ID',
                'dispute_status': 'Dispute Status',
                'dispute_reason': 'Dispute Reason',
                'dispute_resolution': 'Dispute Resolution',
                'dispute_evidence': 'Dispute Evidence',
                
                // Reports
                'report_management': 'Report Management',
                'financial_reports': 'Financial Reports',
                'user_reports': 'User Reports',
                'trade_reports': 'Trade Reports',
                'revenue_reports': 'Revenue Reports',
                'commission_reports': 'Commission Reports',
                'export_report': 'Export Report',
                'generate_report': 'Generate Report',
                
                // Settings
                'system_settings': 'System Settings',
                'general_settings': 'General Settings',
                'security_settings': 'Security Settings',
                'notification_settings': 'Notification Settings',
                'email_settings': 'Email Settings',
                'sms_settings': 'SMS Settings',
                'api_settings': 'API Settings',
                'backup_settings': 'Backup Settings',
                
                // Currency
                'usd': 'USD',
                'iqd': 'IQD',
                'current_currency': 'Current Currency',
                'currency_conversion': 'Currency Conversion',
                'exchange_rate': 'Exchange Rate',
                
                // Status
                'active': 'Active',
                'inactive': 'Inactive',
                'pending': 'Pending',
                'completed': 'Completed',
                'cancelled': 'Cancelled',
                'suspended': 'Suspended',
                'verified': 'Verified',
                'unverified': 'Unverified',
                'approved': 'Approved',
                'rejected': 'Rejected',
                
                // Notifications
                'notifications': 'Notifications',
                'notification_settings': 'Notification Settings',
                'email_notifications': 'Email Notifications',
                'sms_notifications': 'SMS Notifications',
                'push_notifications': 'Push Notifications',
                'trade_notifications': 'Trade Notifications',
                'security_notifications': 'Security Notifications',
                
                // Support
                'support_center': 'Support Center',
                'help_desk': 'Help Desk',
                'contact_support': 'Contact Support',
                'submit_ticket': 'Submit Ticket',
                'ticket_id': 'Ticket ID',
                'ticket_status': 'Ticket Status',
                'ticket_priority': 'Ticket Priority',
                'ticket_subject': 'Ticket Subject',
                'ticket_message': 'Ticket Message',
                'ticket_response': 'Ticket Response',
                
                // Language
                'language': 'Language',
                'english': 'English',
                'arabic': 'Arabic',
                'switch_language': 'Switch Language',
                'language_changed': 'Language changed successfully',
                
                // Messages
                'success': 'Success',
                'error': 'Error',
                'warning': 'Warning',
                'info': 'Information',
                'operation_successful': 'Operation completed successfully',
                'operation_failed': 'Operation failed',
                'please_wait': 'Please wait...',
                'no_data_found': 'No data found',
                'loading_data': 'Loading data...',
                'saving_changes': 'Saving changes...',
                'changes_saved': 'Changes saved successfully',
                'confirm_delete': 'Are you sure you want to delete this item?',
                'confirm_action': 'Are you sure you want to perform this action?'
            },
            ar: {
                // Common Navigation
                'nav_p2p': 'P2P',
                'nav_wallet': 'المحفظة',
                'nav_transfer': 'تحويل',
                'nav_profile': 'الملف الشخصي',
                'nav_dashboard': 'لوحة التحكم',
                'nav_users': 'المستخدمين',
                'nav_trades': 'التداولات',
                'nav_master_wallet': 'المحفظة الرئيسية',
                'nav_membership': 'العضوية وKYC',
                'nav_kyc': 'التحقق من الهوية',
                'nav_disputes': 'النزاعات',
                'nav_commissions': 'العمولات',
                'nav_reports': 'التقارير',
                'nav_support': 'الدعم',
                'nav_settings': 'الإعدادات',
                'nav_permissions': 'الصلاحيات',
                
                // Common Actions
                'loading': 'جاري التحميل...',
                'save': 'حفظ',
                'cancel': 'إلغاء',
                'confirm': 'تأكيد',
                'delete': 'حذف',
                'edit': 'تعديل',
                'view': 'عرض',
                'back': 'رجوع',
                'next': 'التالي',
                'previous': 'السابق',
                'search': 'بحث',
                'filter': 'تصفية',
                'clear': 'مسح',
                'apply': 'تطبيق',
                'close': 'إغلاق',
                'submit': 'إرسال',
                'reset': 'إعادة تعيين',
                'export': 'تصدير',
                'import': 'استيراد',
                'refresh': 'تحديث',
                'download': 'تحميل',
                'upload': 'رفع',
                'approve': 'موافقة',
                'reject': 'رفض',
                'suspend': 'تعليق',
                'activate': 'تفعيل',
                'deactivate': 'إلغاء التفعيل',
                
                // Authentication
                'login': 'تسجيل الدخول',
                'register': 'تسجيل',
                'logout': 'تسجيل الخروج',
                'email': 'البريد الإلكتروني',
                'password': 'كلمة المرور',
                'confirm_password': 'تأكيد كلمة المرور',
                'phone': 'رقم الهاتف',
                'verification_code': 'رمز التحقق',
                'forgot_password': 'نسيت كلمة المرور؟',
                'reset_password': 'إعادة تعيين كلمة المرور',
                'create_account': 'إنشاء حساب',
                'already_have_account': 'لديك حساب بالفعل؟',
                'dont_have_account': 'ليس لديك حساب؟',
                'remember_me': 'تذكرني',
                'admin_login': 'تسجيل دخول المدير',
                'admin_panel': 'لوحة المدير',
                
                // P2P Trading
                'buy': 'شراء',
                'sell': 'بيع',
                'price': 'السعر',
                'amount': 'المبلغ',
                'currency': 'العملة',
                'payment_method': 'طريقة الدفع',
                'payment_methods': 'طرق الدفع',
                'order_limit': 'حد الطلب',
                'completion_rate': 'معدل الإنجاز',
                'transactions': 'المعاملات',
                'merchant': 'التاجر',
                'merchants': 'التجار',
                'ad': 'إعلان',
                'ads': 'إعلانات',
                'post_ad': 'نشر إعلان',
                'my_ads': 'إعلاناتي',
                'active_ads': 'الإعلانات النشطة',
                'inactive_ads': 'الإعلانات غير النشطة',
                
                // Mobile App Specific
                'live_market_rates': 'أسعار السوق المباشرة',
                'updated_just_now': 'تم التحديث: الآن',
                'your_trades': 'تداولاتك',
                'success_rate': 'معدل النجاح',
                'active_trades': 'التداولات النشطة',
                'excellent': 'ممتاز',
                'plus_12_this_week': '+12 هذا الأسبوع',
                'bank_transfer': 'تحويل بنكي',
                'all': 'الكل',
                'p2p': 'P2P',
                'search_placeholder': 'البحث عن العملات الرقمية أو المستخدمين أو طرق الدفع...',
                
                // Wallet
                'balance': 'الرصيد',
                'available_balance': 'الرصيد المتاح',
                'frozen_balance': 'الرصيد المجمد',
                'deposit': 'إيداع',
                'withdraw': 'سحب',
                'transfer': 'تحويل',
                'history': 'السجل',
                'transaction_history': 'سجل المعاملات',
                'recent_transactions': 'المعاملات الأخيرة',
                'transaction_id': 'معرف المعاملة',
                'transaction_type': 'نوع المعاملة',
                'transaction_status': 'حالة المعاملة',
                'transaction_date': 'تاريخ المعاملة',
                'transaction_amount': 'مبلغ المعاملة',
                'transaction_fee': 'رسوم المعاملة',
                
                // Profile
                'profile': 'الملف الشخصي',
                'personal_info': 'المعلومات الشخصية',
                'account_info': 'معلومات الحساب',
                'security_settings': 'إعدادات الأمان',
                'notification_settings': 'إعدادات الإشعارات',
                'language_settings': 'إعدادات اللغة',
                'currency_settings': 'إعدادات العملة',
                'dark_mode': 'الوضع المظلم',
                'light_mode': 'الوضع الفاتح',
                'auto_mode': 'الوضع التلقائي',
                
                // Admin Panel Specific
                'dashboard': 'لوحة التحكم',
                'users': 'المستخدمين',
                'trades': 'التداولات',
                'wallet': 'المحفظة',
                'master_wallet': 'المحفظة الرئيسية',
                'membership': 'العضوية وKYC',
                'kyc': 'التحقق من الهوية',
                'disputes': 'النزاعات',
                'commissions': 'العمولات',
                'reports': 'التقارير',
                'support': 'الدعم',
                'settings': 'الإعدادات',
                'permissions': 'الصلاحيات',
                
                // Dashboard
                'total_users': 'إجمالي المستخدمين',
                'active_users': 'المستخدمين النشطين',
                'new_users': 'المستخدمين الجدد',
                'total_trades': 'إجمالي التداولات',
                'completed_trades': 'التداولات المكتملة',
                'pending_trades': 'التداولات المعلقة',
                'total_volume': 'إجمالي الحجم',
                'daily_volume': 'الحجم اليومي',
                'monthly_volume': 'الحجم الشهري',
                'revenue': 'الإيرادات',
                'profit': 'الربح',
                'loss': 'الخسارة',
                'growth_rate': 'معدل النمو',
                'conversion_rate': 'معدل التحويل',
                
                // Users
                'user_management': 'إدارة المستخدمين',
                'user_list': 'قائمة المستخدمين',
                'user_details': 'تفاصيل المستخدم',
                'user_id': 'معرف المستخدم',
                'username': 'اسم المستخدم',
                'full_name': 'الاسم الكامل',
                'first_name': 'الاسم الأول',
                'last_name': 'اسم العائلة',
                'email_address': 'عنوان البريد الإلكتروني',
                'phone_number': 'رقم الهاتف',
                'registration_date': 'تاريخ التسجيل',
                'last_login': 'آخر تسجيل دخول',
                'account_status': 'حالة الحساب',
                'verification_status': 'حالة التحقق',
                'membership_status': 'حالة العضوية',
                'user_type': 'نوع المستخدم',
                'user_level': 'مستوى المستخدم',
                'user_balance': 'رصيد المستخدم',
                'user_transactions': 'معاملات المستخدم',
                
                // KYC
                'kyc_verification': 'التحقق من الهوية',
                'kyc_management': 'إدارة التحقق من الهوية',
                'kyc_applications': 'طلبات التحقق من الهوية',
                'kyc_status': 'حالة التحقق من الهوية',
                'kyc_documents': 'وثائق التحقق من الهوية',
                'identity_verification': 'التحقق من الهوية',
                'address_verification': 'التحقق من العنوان',
                'document_verification': 'التحقق من الوثائق',
                'verification_pending': 'التحقق معلق',
                'verification_approved': 'التحقق معتمد',
                'verification_rejected': 'التحقق مرفوض',
                
                // Membership
                'membership_management': 'إدارة العضوية',
                'membership_plans': 'خطط العضوية',
                'free_trial': 'تجربة مجانية',
                'trial_period': 'فترة التجربة',
                'trial_duration': 'مدة التجربة',
                'trial_end_date': 'تاريخ انتهاء التجربة',
                'membership_activation': 'تفعيل العضوية',
                'auto_activate': 'تفعيل تلقائي',
                'manual_activation': 'تفعيل يدوي',
                
                // Trades
                'trade_management': 'إدارة التداولات',
                'trade_list': 'قائمة التداولات',
                'trade_details': 'تفاصيل التداول',
                'trade_id': 'معرف التداول',
                'trade_status': 'حالة التداول',
                'trade_amount': 'مبلغ التداول',
                'trade_fee': 'رسوم التداول',
                'trade_date': 'تاريخ التداول',
                'buyer': 'المشتري',
                'seller': 'البائع',
                'trade_type': 'نوع التداول',
                'trade_method': 'طريقة التداول',
                
                // Disputes
                'dispute_management': 'إدارة النزاعات',
                'dispute_list': 'قائمة النزاعات',
                'dispute_details': 'تفاصيل النزاع',
                'dispute_id': 'معرف النزاع',
                'dispute_status': 'حالة النزاع',
                'dispute_reason': 'سبب النزاع',
                'dispute_resolution': 'حل النزاع',
                'dispute_evidence': 'أدلة النزاع',
                
                // Reports
                'report_management': 'إدارة التقارير',
                'financial_reports': 'التقارير المالية',
                'user_reports': 'تقارير المستخدمين',
                'trade_reports': 'تقارير التداولات',
                'revenue_reports': 'تقارير الإيرادات',
                'commission_reports': 'تقارير العمولات',
                'export_report': 'تصدير التقرير',
                'generate_report': 'إنشاء تقرير',
                
                // Settings
                'system_settings': 'إعدادات النظام',
                'general_settings': 'الإعدادات العامة',
                'security_settings': 'إعدادات الأمان',
                'notification_settings': 'إعدادات الإشعارات',
                'email_settings': 'إعدادات البريد الإلكتروني',
                'sms_settings': 'إعدادات الرسائل النصية',
                'api_settings': 'إعدادات API',
                'backup_settings': 'إعدادات النسخ الاحتياطي',
                
                // Currency
                'usd': 'دولار أمريكي',
                'iqd': 'دينار عراقي',
                'current_currency': 'العملة الحالية',
                'currency_conversion': 'تحويل العملة',
                'exchange_rate': 'سعر الصرف',
                
                // Status
                'active': 'نشط',
                'inactive': 'غير نشط',
                'pending': 'معلق',
                'completed': 'مكتمل',
                'cancelled': 'ملغي',
                'suspended': 'معلق',
                'verified': 'متحقق',
                'unverified': 'غير متحقق',
                'approved': 'معتمد',
                'rejected': 'مرفوض',
                
                // Notifications
                'notifications': 'الإشعارات',
                'notification_settings': 'إعدادات الإشعارات',
                'email_notifications': 'إشعارات البريد الإلكتروني',
                'sms_notifications': 'إشعارات الرسائل النصية',
                'push_notifications': 'الإشعارات الفورية',
                'trade_notifications': 'إشعارات التداول',
                'security_notifications': 'إشعارات الأمان',
                
                // Support
                'support_center': 'مركز الدعم',
                'help_desk': 'مكتب المساعدة',
                'contact_support': 'اتصل بالدعم',
                'submit_ticket': 'إرسال تذكرة',
                'ticket_id': 'معرف التذكرة',
                'ticket_status': 'حالة التذكرة',
                'ticket_priority': 'أولوية التذكرة',
                'ticket_subject': 'موضوع التذكرة',
                'ticket_message': 'رسالة التذكرة',
                'ticket_response': 'رد التذكرة',
                
                // Language
                'language': 'اللغة',
                'english': 'الإنجليزية',
                'arabic': 'العربية',
                'switch_language': 'تغيير اللغة',
                'language_changed': 'تم تغيير اللغة بنجاح',
                
                // Messages
                'success': 'نجح',
                'error': 'خطأ',
                'warning': 'تحذير',
                'info': 'معلومات',
                'operation_successful': 'تم إنجاز العملية بنجاح',
                'operation_failed': 'فشلت العملية',
                'please_wait': 'يرجى الانتظار...',
                'no_data_found': 'لم يتم العثور على بيانات',
                'loading_data': 'جاري تحميل البيانات...',
                'saving_changes': 'جاري حفظ التغييرات...',
                'changes_saved': 'تم حفظ التغييرات بنجاح',
                'confirm_delete': 'هل أنت متأكد من حذف هذا العنصر؟',
                'confirm_action': 'هل أنت متأكد من تنفيذ هذا الإجراء؟'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setLanguage(this.currentLanguage);
        this.updatePageDirection();
        this.updateAllTexts();
    }
    
    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem(`iqx_${this.context}_language`, lang);
        this.updatePageDirection();
        this.updateAllTexts();
        this.changeCurrencyForLanguage(lang);
    }
    
    updatePageDirection() {
        const dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', this.currentLanguage);
    }
    
    getText(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    updateAllTexts() {
        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = this.getText(key);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update all elements with data-i18n-placeholder attribute
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const text = this.getText(key);
            if (text) {
                element.placeholder = text;
            }
        });
        
        // Update all elements with data-i18n-title attribute
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const text = this.getText(key);
            if (text) {
                element.title = text;
            }
        });
    }
    
    toggleLanguage() {
        const newLang = this.currentLanguage === 'en' ? 'ar' : 'en';
        this.setLanguage(newLang);
        this.showNotification(this.getText('language_changed'));
    }
    
    changeCurrencyForLanguage(lang) {
        const currencyMap = {
            'en': 'USD',
            'ar': 'IQD'
        };
        
        const newCurrency = currencyMap[lang] || 'USD';
        console.log(`Changing currency to ${newCurrency} for language ${lang}`);
        
        // Update currency display elements
        const currencyElements = [
            '.currency-dropdown span',
            '.currency-selector span',
            '[data-i18n="iqd"]',
            '[data-i18n="usd"]',
            '#current-currency',
            '.currency-value',
            '.balance-currency',
            '.currency-display'
        ];
        
        currencyElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element.textContent.includes('USD') || element.textContent.includes('IQD')) {
                    element.textContent = element.textContent.replace(/USD|IQD/g, newCurrency);
                }
            });
        });
        
        // Update currency dropdowns
        const dropdowns = document.querySelectorAll('.currency-dropdown, .currency-selector');
        dropdowns.forEach(dropdown => {
            const span = dropdown.querySelector('span');
            if (span) {
                span.textContent = newCurrency;
            }
        });
        
        // Update balance displays
        const balanceElements = document.querySelectorAll('.balance-amount, .amount-display');
        balanceElements.forEach(element => {
            const text = element.textContent;
            if (text.includes('$') || text.includes('د.ع')) {
                if (newCurrency === 'IQD') {
                    element.textContent = text.replace(/\$(\d+(?:\.\d{2})?)/g, 'د.ع$1');
                } else {
                    element.textContent = text.replace(/د\.ع(\d+(?:\.\d{2})?)/g, '$$1');
                }
            }
        });
        
        console.log(`Currency updated to ${newCurrency}`);
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'language-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 10000;
            font-family: var(--font-body-en);
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        // Add RTL support
        if (this.currentLanguage === 'ar') {
            notification.style.right = 'auto';
            notification.style.left = '20px';
            notification.style.transform = 'translateX(-100%)';
            notification.style.fontFamily = 'var(--font-body-ar)';
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = this.currentLanguage === 'ar' ? 'translateX(0)' : 'translateX(0)';
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = this.currentLanguage === 'ar' ? 'translateX(-100%)' : 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Global helper functions
function t(key) {
    return window.languageManager ? window.languageManager.getText(key) : key;
}

function toggleLanguage() {
    if (window.languageManager) {
        window.languageManager.toggleLanguage();
    }
}

// Initialize language manager based on context
document.addEventListener('DOMContentLoaded', function() {
    const isAdmin = window.location.pathname.includes('admin') || 
                   document.querySelector('.admin-panel, .sidebar, .main-content');
    
    const context = isAdmin ? 'admin' : 'app';
    window.languageManager = new SharedLanguageManager(context);
    
    console.log(`Language manager initialized for ${context} context`);
}); 