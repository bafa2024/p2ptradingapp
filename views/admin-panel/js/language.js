// Language Management System for IQX Admin Panel
class AdminLanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('iqx_admin_language') || 'en';
        this.translations = {
            en: {
                // Navigation
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
                
                // Common
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
                'logout': 'Logout',
                'email': 'Email',
                'password': 'Password',
                'confirm_password': 'Confirm Password',
                'phone': 'Phone Number',
                'verification_code': 'Verification Code',
                'forgot_password': 'Forgot Password?',
                'reset_password': 'Reset Password',
                'remember_me': 'Remember Me',
                'admin_login': 'Admin Login',
                'admin_panel': 'Admin Panel',
                
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
                'user_ads': 'User Ads',
                'user_trades': 'User Trades',
                'user_reports': 'User Reports',
                'user_support': 'User Support',
                
                // Trades
                'trade_management': 'Trade Management',
                'trade_list': 'Trade List',
                'trade_details': 'Trade Details',
                'trade_id': 'Trade ID',
                'trade_type': 'Trade Type',
                'trade_status': 'Trade Status',
                'trade_amount': 'Trade Amount',
                'trade_currency': 'Trade Currency',
                'trade_date': 'Trade Date',
                'trade_fee': 'Trade Fee',
                'trade_profit': 'Trade Profit',
                'buyer': 'Buyer',
                'seller': 'Seller',
                'payment_method': 'Payment Method',
                'payment_status': 'Payment Status',
                'order_limit': 'Order Limit',
                'completion_rate': 'Completion Rate',
                'dispute_status': 'Dispute Status',
                
                // Wallet
                'wallet_management': 'Wallet Management',
                'wallet_balance': 'Wallet Balance',
                'available_balance': 'Available Balance',
                'frozen_balance': 'Frozen Balance',
                'total_balance': 'Total Balance',
                'deposit_history': 'Deposit History',
                'withdrawal_history': 'Withdrawal History',
                'transaction_history': 'Transaction History',
                'transaction_id': 'Transaction ID',
                'transaction_type': 'Transaction Type',
                'transaction_status': 'Transaction Status',
                'transaction_date': 'Transaction Date',
                'transaction_amount': 'Transaction Amount',
                'transaction_fee': 'Transaction Fee',
                'transaction_description': 'Transaction Description',
                'from_address': 'From Address',
                'to_address': 'To Address',
                'blockchain_hash': 'Blockchain Hash',
                'confirmation_count': 'Confirmation Count',
                
                // Master Wallet
                'master_wallet_management': 'Master Wallet Management',
                'master_balance': 'Master Balance',
                'cold_storage': 'Cold Storage',
                'hot_wallet': 'Hot Wallet',
                'reserve_fund': 'Reserve Fund',
                'operational_fund': 'Operational Fund',
                'security_fund': 'Security Fund',
                'backup_wallet': 'Backup Wallet',
                'wallet_address': 'Wallet Address',
                'private_key': 'Private Key',
                'public_key': 'Public Key',
                'wallet_type': 'Wallet Type',
                'wallet_status': 'Wallet Status',
                'last_backup': 'Last Backup',
                'backup_status': 'Backup Status',
                
                // Membership & KYC
                'membership_management': 'Membership Management',
                'kyc_management': 'KYC Management',
                'membership_levels': 'Membership Levels',
                'kyc_applications': 'KYC Applications',
                'verification_requests': 'Verification Requests',
                'pending_verifications': 'Pending Verifications',
                'approved_verifications': 'Approved Verifications',
                'rejected_verifications': 'Rejected Verifications',
                'verification_documents': 'Verification Documents',
                'identity_document': 'Identity Document',
                'passport': 'Passport',
                'national_id': 'National ID',
                'drivers_license': 'Driver\'s License',
                'utility_bill': 'Utility Bill',
                'bank_statement': 'Bank Statement',
                'proof_of_address': 'Proof of Address',
                'selfie_photo': 'Selfie Photo',
                'document_type': 'Document Type',
                'document_number': 'Document Number',
                'document_expiry': 'Document Expiry',
                'document_upload': 'Document Upload',
                'verification_date': 'Verification Date',
                'verification_officer': 'Verification Officer',
                'verification_notes': 'Verification Notes',
                
                // Disputes
                'dispute_management': 'Dispute Management',
                'dispute_list': 'Dispute List',
                'dispute_details': 'Dispute Details',
                'dispute_id': 'Dispute ID',
                'dispute_type': 'Dispute Type',
                'dispute_status': 'Dispute Status',
                'dispute_reason': 'Dispute Reason',
                'dispute_description': 'Dispute Description',
                'dispute_evidence': 'Dispute Evidence',
                'dispute_resolution': 'Dispute Resolution',
                'dispute_decision': 'Dispute Decision',
                'dispute_winner': 'Dispute Winner',
                'dispute_loser': 'Dispute Loser',
                'dispute_amount': 'Dispute Amount',
                'dispute_fee': 'Dispute Fee',
                'dispute_date': 'Dispute Date',
                'dispute_resolution_date': 'Resolution Date',
                'dispute_officer': 'Dispute Officer',
                'dispute_notes': 'Dispute Notes',
                
                // Commissions
                'commission_management': 'Commission Management',
                'commission_rates': 'Commission Rates',
                'commission_history': 'Commission History',
                'commission_type': 'Commission Type',
                'commission_rate': 'Commission Rate',
                'commission_amount': 'Commission Amount',
                'commission_percentage': 'Commission Percentage',
                'commission_fee': 'Commission Fee',
                'commission_date': 'Commission Date',
                'commission_status': 'Commission Status',
                'commission_paid': 'Commission Paid',
                'commission_pending': 'Commission Pending',
                'commission_total': 'Total Commission',
                'commission_monthly': 'Monthly Commission',
                'commission_yearly': 'Yearly Commission',
                
                // Reports
                'report_management': 'Report Management',
                'report_generation': 'Report Generation',
                'report_type': 'Report Type',
                'report_date': 'Report Date',
                'report_period': 'Report Period',
                'report_format': 'Report Format',
                'report_status': 'Report Status',
                'report_download': 'Download Report',
                'report_schedule': 'Report Schedule',
                'daily_report': 'Daily Report',
                'weekly_report': 'Weekly Report',
                'monthly_report': 'Monthly Report',
                'yearly_report': 'Yearly Report',
                'custom_report': 'Custom Report',
                'user_report': 'User Report',
                'trade_report': 'Trade Report',
                'financial_report': 'Financial Report',
                'security_report': 'Security Report',
                'performance_report': 'Performance Report',
                
                // Support
                'support_management': 'Support Management',
                'support_tickets': 'Support Tickets',
                'ticket_management': 'Ticket Management',
                'ticket_list': 'Ticket List',
                'ticket_details': 'Ticket Details',
                'ticket_id': 'Ticket ID',
                'ticket_subject': 'Ticket Subject',
                'ticket_message': 'Ticket Message',
                'ticket_status': 'Ticket Status',
                'ticket_priority': 'Ticket Priority',
                'ticket_category': 'Ticket Category',
                'ticket_assigned': 'Assigned To',
                'ticket_created': 'Created Date',
                'ticket_updated': 'Updated Date',
                'ticket_resolved': 'Resolved Date',
                'ticket_response': 'Ticket Response',
                'ticket_notes': 'Ticket Notes',
                'ticket_attachments': 'Ticket Attachments',
                
                // Settings
                'settings_management': 'Settings Management',
                'general_settings': 'General Settings',
                'security_settings': 'Security Settings',
                'notification_settings': 'Notification Settings',
                'email_settings': 'Email Settings',
                'sms_settings': 'SMS Settings',
                'payment_settings': 'Payment Settings',
                'trading_settings': 'Trading Settings',
                'commission_settings': 'Commission Settings',
                'kyc_settings': 'KYC Settings',
                'membership_settings': 'Membership Settings',
                'system_settings': 'System Settings',
                'backup_settings': 'Backup Settings',
                'maintenance_settings': 'Maintenance Settings',
                
                // Permissions
                'permission_management': 'Permission Management',
                'role_management': 'Role Management',
                'user_roles': 'User Roles',
                'role_permissions': 'Role Permissions',
                'permission_levels': 'Permission Levels',
                'admin_permissions': 'Admin Permissions',
                'moderator_permissions': 'Moderator Permissions',
                'support_permissions': 'Support Permissions',
                'view_permissions': 'View Permissions',
                'edit_permissions': 'Edit Permissions',
                'delete_permissions': 'Delete Permissions',
                'approve_permissions': 'Approve Permissions',
                'reject_permissions': 'Reject Permissions',
                
                // Status
                'active': 'Active',
                'inactive': 'Inactive',
                'suspended': 'Suspended',
                'banned': 'Banned',
                'pending': 'Pending',
                'approved': 'Approved',
                'rejected': 'Rejected',
                'completed': 'Completed',
                'cancelled': 'Cancelled',
                'processing': 'Processing',
                'failed': 'Failed',
                'success': 'Success',
                'error': 'Error',
                'warning': 'Warning',
                'info': 'Information',
                
                // Time
                'today': 'Today',
                'yesterday': 'Yesterday',
                'this_week': 'This Week',
                'this_month': 'This Month',
                'this_year': 'This Year',
                'last_week': 'Last Week',
                'last_month': 'Last Month',
                'last_year': 'Last Year',
                'ago': 'ago',
                'minutes': 'minutes',
                'hours': 'hours',
                'days': 'days',
                'weeks': 'weeks',
                'months': 'months',
                'years': 'years',
                
                // Actions
                'view_details': 'View Details',
                'edit_user': 'Edit User',
                'delete_user': 'Delete User',
                'suspend_user': 'Suspend User',
                'activate_user': 'Activate User',
                'approve_kyc': 'Approve KYC',
                'reject_kyc': 'Reject KYC',
                'view_documents': 'View Documents',
                'download_report': 'Download Report',
                'export_data': 'Export Data',
                'import_data': 'Import Data',
                'backup_system': 'Backup System',
                'restore_system': 'Restore System',
                'clear_cache': 'Clear Cache',
                'optimize_database': 'Optimize Database',
                
                // Messages
                'operation_successful': 'Operation completed successfully',
                'operation_failed': 'Operation failed',
                'data_saved': 'Data saved successfully',
                'data_deleted': 'Data deleted successfully',
                'data_updated': 'Data updated successfully',
                'data_imported': 'Data imported successfully',
                'data_exported': 'Data exported successfully',
                'user_created': 'User created successfully',
                'user_updated': 'User updated successfully',
                'user_deleted': 'User deleted successfully',
                'kyc_approved': 'KYC approved successfully',
                'kyc_rejected': 'KYC rejected successfully',
                'ticket_created': 'Ticket created successfully',
                'ticket_updated': 'Ticket updated successfully',
                'ticket_resolved': 'Ticket resolved successfully',
                'report_generated': 'Report generated successfully',
                'backup_created': 'Backup created successfully',
                'system_restored': 'System restored successfully',
                'cache_cleared': 'Cache cleared successfully',
                'database_optimized': 'Database optimized successfully',
                
                // Errors
                'network_error': 'Network error',
                'server_error': 'Server error',
                'database_error': 'Database error',
                'file_error': 'File error',
                'permission_error': 'Permission error',
                'validation_error': 'Validation error',
                'authentication_error': 'Authentication error',
                'authorization_error': 'Authorization error',
                'timeout_error': 'Timeout error',
                'try_again': 'Please try again',
                'contact_support': 'Please contact support',
                'no_data': 'No data available',
                'no_results': 'No results found',
                'data_not_found': 'Data not found',
                'user_not_found': 'User not found',
                'trade_not_found': 'Trade not found',
                'ticket_not_found': 'Ticket not found',
                'document_not_found': 'Document not found',
                'report_not_found': 'Report not found'
            },
            ar: {
                // Navigation
                'dashboard': 'لوحة التحكم',
                'users': 'المستخدمين',
                'trades': 'المعاملات',
                'wallet': 'المحفظة',
                'master_wallet': 'المحفظة الرئيسية',
                'membership': 'العضوية والتحقق',
                'kyc': 'التحقق من الهوية',
                'disputes': 'النزاعات',
                'commissions': 'العمولات',
                'reports': 'التقارير',
                'support': 'الدعم',
                'settings': 'الإعدادات',
                'permissions': 'الصلاحيات',
                
                // Common
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
                'logout': 'تسجيل الخروج',
                'email': 'البريد الإلكتروني',
                'password': 'كلمة المرور',
                'confirm_password': 'تأكيد كلمة المرور',
                'phone': 'رقم الهاتف',
                'verification_code': 'رمز التحقق',
                'forgot_password': 'نسيت كلمة المرور؟',
                'reset_password': 'إعادة تعيين كلمة المرور',
                'remember_me': 'تذكرني',
                'admin_login': 'تسجيل دخول المدير',
                'admin_panel': 'لوحة المدير',
                
                // Dashboard
                'total_users': 'إجمالي المستخدمين',
                'active_users': 'المستخدمين النشطين',
                'new_users': 'المستخدمين الجدد',
                'total_trades': 'إجمالي المعاملات',
                'completed_trades': 'المعاملات المكتملة',
                'pending_trades': 'المعاملات المعلقة',
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
                'user_ads': 'إعلانات المستخدم',
                'user_trades': 'معاملات المستخدم',
                'user_reports': 'تقارير المستخدم',
                'user_support': 'دعم المستخدم',
                
                // Trades
                'trade_management': 'إدارة المعاملات',
                'trade_list': 'قائمة المعاملات',
                'trade_details': 'تفاصيل المعاملة',
                'trade_id': 'معرف المعاملة',
                'trade_type': 'نوع المعاملة',
                'trade_status': 'حالة المعاملة',
                'trade_amount': 'مبلغ المعاملة',
                'trade_currency': 'عملة المعاملة',
                'trade_date': 'تاريخ المعاملة',
                'trade_fee': 'رسوم المعاملة',
                'trade_profit': 'ربح المعاملة',
                'buyer': 'المشتري',
                'seller': 'البائع',
                'payment_method': 'طريقة الدفع',
                'payment_status': 'حالة الدفع',
                'order_limit': 'حد الطلب',
                'completion_rate': 'معدل الإنجاز',
                'dispute_status': 'حالة النزاع',
                
                // Wallet
                'wallet_management': 'إدارة المحفظة',
                'wallet_balance': 'رصيد المحفظة',
                'available_balance': 'الرصيد المتاح',
                'frozen_balance': 'الرصيد المجمد',
                'total_balance': 'إجمالي الرصيد',
                'deposit_history': 'سجل الإيداعات',
                'withdrawal_history': 'سجل السحوبات',
                'transaction_history': 'سجل المعاملات',
                'transaction_id': 'معرف المعاملة',
                'transaction_type': 'نوع المعاملة',
                'transaction_status': 'حالة المعاملة',
                'transaction_date': 'تاريخ المعاملة',
                'transaction_amount': 'مبلغ المعاملة',
                'transaction_fee': 'رسوم المعاملة',
                'transaction_description': 'وصف المعاملة',
                'from_address': 'من العنوان',
                'to_address': 'إلى العنوان',
                'blockchain_hash': 'هاش البلوكتشين',
                'confirmation_count': 'عدد التأكيدات',
                
                // Master Wallet
                'master_wallet_management': 'إدارة المحفظة الرئيسية',
                'master_balance': 'رصيد المحفظة الرئيسية',
                'cold_storage': 'التخزين البارد',
                'hot_wallet': 'المحفظة الساخنة',
                'reserve_fund': 'الصندوق الاحتياطي',
                'operational_fund': 'الصندوق التشغيلي',
                'security_fund': 'صندوق الأمان',
                'backup_wallet': 'المحفظة الاحتياطية',
                'wallet_address': 'عنوان المحفظة',
                'private_key': 'المفتاح الخاص',
                'public_key': 'المفتاح العام',
                'wallet_type': 'نوع المحفظة',
                'wallet_status': 'حالة المحفظة',
                'last_backup': 'آخر نسخة احتياطية',
                'backup_status': 'حالة النسخة الاحتياطية',
                
                // Membership & KYC
                'membership_management': 'إدارة العضوية',
                'kyc_management': 'إدارة التحقق من الهوية',
                'membership_levels': 'مستويات العضوية',
                'kyc_applications': 'طلبات التحقق من الهوية',
                'verification_requests': 'طلبات التحقق',
                'pending_verifications': 'التحققات المعلقة',
                'approved_verifications': 'التحققات المعتمدة',
                'rejected_verifications': 'التحققات المرفوضة',
                'verification_documents': 'وثائق التحقق',
                'identity_document': 'وثيقة الهوية',
                'passport': 'جواز السفر',
                'national_id': 'الهوية الوطنية',
                'drivers_license': 'رخصة القيادة',
                'utility_bill': 'فاتورة الخدمات',
                'bank_statement': 'كشف حساب بنكي',
                'proof_of_address': 'إثبات العنوان',
                'selfie_photo': 'صورة شخصية',
                'document_type': 'نوع الوثيقة',
                'document_number': 'رقم الوثيقة',
                'document_expiry': 'تاريخ انتهاء الوثيقة',
                'document_upload': 'رفع الوثيقة',
                'verification_date': 'تاريخ التحقق',
                'verification_officer': 'موظف التحقق',
                'verification_notes': 'ملاحظات التحقق',
                
                // Disputes
                'dispute_management': 'إدارة النزاعات',
                'dispute_list': 'قائمة النزاعات',
                'dispute_details': 'تفاصيل النزاع',
                'dispute_id': 'معرف النزاع',
                'dispute_type': 'نوع النزاع',
                'dispute_status': 'حالة النزاع',
                'dispute_reason': 'سبب النزاع',
                'dispute_description': 'وصف النزاع',
                'dispute_evidence': 'أدلة النزاع',
                'dispute_resolution': 'حل النزاع',
                'dispute_decision': 'قرار النزاع',
                'dispute_winner': 'الفائز في النزاع',
                'dispute_loser': 'الخاسر في النزاع',
                'dispute_amount': 'مبلغ النزاع',
                'dispute_fee': 'رسوم النزاع',
                'dispute_date': 'تاريخ النزاع',
                'dispute_resolution_date': 'تاريخ الحل',
                'dispute_officer': 'موظف النزاع',
                'dispute_notes': 'ملاحظات النزاع',
                
                // Commissions
                'commission_management': 'إدارة العمولات',
                'commission_rates': 'معدلات العمولات',
                'commission_history': 'سجل العمولات',
                'commission_type': 'نوع العمولة',
                'commission_rate': 'معدل العمولة',
                'commission_amount': 'مبلغ العمولة',
                'commission_percentage': 'نسبة العمولة',
                'commission_fee': 'رسوم العمولة',
                'commission_date': 'تاريخ العمولة',
                'commission_status': 'حالة العمولة',
                'commission_paid': 'العمولة المدفوعة',
                'commission_pending': 'العمولة المعلقة',
                'commission_total': 'إجمالي العمولات',
                'commission_monthly': 'العمولات الشهرية',
                'commission_yearly': 'العمولات السنوية',
                
                // Reports
                'report_management': 'إدارة التقارير',
                'report_generation': 'إنشاء التقارير',
                'report_type': 'نوع التقرير',
                'report_date': 'تاريخ التقرير',
                'report_period': 'فترة التقرير',
                'report_format': 'صيغة التقرير',
                'report_status': 'حالة التقرير',
                'report_download': 'تحميل التقرير',
                'report_schedule': 'جدول التقارير',
                'daily_report': 'التقرير اليومي',
                'weekly_report': 'التقرير الأسبوعي',
                'monthly_report': 'التقرير الشهري',
                'yearly_report': 'التقرير السنوي',
                'custom_report': 'تقرير مخصص',
                'user_report': 'تقرير المستخدمين',
                'trade_report': 'تقرير المعاملات',
                'financial_report': 'التقرير المالي',
                'security_report': 'تقرير الأمان',
                'performance_report': 'تقرير الأداء',
                
                // Support
                'support_management': 'إدارة الدعم',
                'support_tickets': 'تذاكر الدعم',
                'ticket_management': 'إدارة التذاكر',
                'ticket_list': 'قائمة التذاكر',
                'ticket_details': 'تفاصيل التذكرة',
                'ticket_id': 'معرف التذكرة',
                'ticket_subject': 'موضوع التذكرة',
                'ticket_message': 'رسالة التذكرة',
                'ticket_status': 'حالة التذكرة',
                'ticket_priority': 'أولوية التذكرة',
                'ticket_category': 'فئة التذكرة',
                'ticket_assigned': 'مخصص إلى',
                'ticket_created': 'تاريخ الإنشاء',
                'ticket_updated': 'تاريخ التحديث',
                'ticket_resolved': 'تاريخ الحل',
                'ticket_response': 'رد التذكرة',
                'ticket_notes': 'ملاحظات التذكرة',
                'ticket_attachments': 'مرفقات التذكرة',
                
                // Settings
                'settings_management': 'إدارة الإعدادات',
                'general_settings': 'الإعدادات العامة',
                'security_settings': 'إعدادات الأمان',
                'notification_settings': 'إعدادات الإشعارات',
                'email_settings': 'إعدادات البريد الإلكتروني',
                'sms_settings': 'إعدادات الرسائل النصية',
                'payment_settings': 'إعدادات الدفع',
                'trading_settings': 'إعدادات التداول',
                'commission_settings': 'إعدادات العمولات',
                'kyc_settings': 'إعدادات التحقق من الهوية',
                'membership_settings': 'إعدادات العضوية',
                'system_settings': 'إعدادات النظام',
                'backup_settings': 'إعدادات النسخ الاحتياطي',
                'maintenance_settings': 'إعدادات الصيانة',
                
                // Permissions
                'permission_management': 'إدارة الصلاحيات',
                'role_management': 'إدارة الأدوار',
                'user_roles': 'أدوار المستخدمين',
                'role_permissions': 'صلاحيات الأدوار',
                'permission_levels': 'مستويات الصلاحيات',
                'admin_permissions': 'صلاحيات المدير',
                'moderator_permissions': 'صلاحيات المشرف',
                'support_permissions': 'صلاحيات الدعم',
                'view_permissions': 'صلاحيات العرض',
                'edit_permissions': 'صلاحيات التعديل',
                'delete_permissions': 'صلاحيات الحذف',
                'approve_permissions': 'صلاحيات الموافقة',
                'reject_permissions': 'صلاحيات الرفض',
                
                // Status
                'active': 'نشط',
                'inactive': 'غير نشط',
                'suspended': 'معلق',
                'banned': 'محظور',
                'pending': 'قيد الانتظار',
                'approved': 'معتمد',
                'rejected': 'مرفوض',
                'completed': 'مكتمل',
                'cancelled': 'ملغي',
                'processing': 'قيد المعالجة',
                'failed': 'فشل',
                'success': 'نجح',
                'error': 'خطأ',
                'warning': 'تحذير',
                'info': 'معلومات',
                
                // Time
                'today': 'اليوم',
                'yesterday': 'أمس',
                'this_week': 'هذا الأسبوع',
                'this_month': 'هذا الشهر',
                'this_year': 'هذا العام',
                'last_week': 'الأسبوع الماضي',
                'last_month': 'الشهر الماضي',
                'last_year': 'العام الماضي',
                'ago': 'منذ',
                'minutes': 'دقائق',
                'hours': 'ساعات',
                'days': 'أيام',
                'weeks': 'أسابيع',
                'months': 'أشهر',
                'years': 'سنوات',
                
                // Actions
                'view_details': 'عرض التفاصيل',
                'edit_user': 'تعديل المستخدم',
                'delete_user': 'حذف المستخدم',
                'suspend_user': 'تعليق المستخدم',
                'activate_user': 'تفعيل المستخدم',
                'approve_kyc': 'موافقة على التحقق من الهوية',
                'reject_kyc': 'رفض التحقق من الهوية',
                'view_documents': 'عرض الوثائق',
                'download_report': 'تحميل التقرير',
                'export_data': 'تصدير البيانات',
                'import_data': 'استيراد البيانات',
                'backup_system': 'نسخ احتياطي للنظام',
                'restore_system': 'استعادة النظام',
                'clear_cache': 'مسح الذاكرة المؤقتة',
                'optimize_database': 'تحسين قاعدة البيانات',
                
                // Messages
                'operation_successful': 'تمت العملية بنجاح',
                'operation_failed': 'فشلت العملية',
                'data_saved': 'تم حفظ البيانات بنجاح',
                'data_deleted': 'تم حذف البيانات بنجاح',
                'data_updated': 'تم تحديث البيانات بنجاح',
                'data_imported': 'تم استيراد البيانات بنجاح',
                'data_exported': 'تم تصدير البيانات بنجاح',
                'user_created': 'تم إنشاء المستخدم بنجاح',
                'user_updated': 'تم تحديث المستخدم بنجاح',
                'user_deleted': 'تم حذف المستخدم بنجاح',
                'kyc_approved': 'تم اعتماد التحقق من الهوية بنجاح',
                'kyc_rejected': 'تم رفض التحقق من الهوية بنجاح',
                'ticket_created': 'تم إنشاء التذكرة بنجاح',
                'ticket_updated': 'تم تحديث التذكرة بنجاح',
                'ticket_resolved': 'تم حل التذكرة بنجاح',
                'report_generated': 'تم إنشاء التقرير بنجاح',
                'backup_created': 'تم إنشاء النسخة الاحتياطية بنجاح',
                'system_restored': 'تم استعادة النظام بنجاح',
                'cache_cleared': 'تم مسح الذاكرة المؤقتة بنجاح',
                'database_optimized': 'تم تحسين قاعدة البيانات بنجاح',
                
                // Errors
                'network_error': 'خطأ في الشبكة',
                'server_error': 'خطأ في الخادم',
                'database_error': 'خطأ في قاعدة البيانات',
                'file_error': 'خطأ في الملف',
                'permission_error': 'خطأ في الصلاحيات',
                'validation_error': 'خطأ في التحقق',
                'authentication_error': 'خطأ في المصادقة',
                'authorization_error': 'خطأ في التفويض',
                'timeout_error': 'خطأ في المهلة الزمنية',
                'try_again': 'يرجى المحاولة مرة أخرى',
                'contact_support': 'يرجى الاتصال بالدعم',
                'no_data': 'لا توجد بيانات',
                'no_results': 'لا توجد نتائج',
                'data_not_found': 'لم يتم العثور على البيانات',
                'user_not_found': 'لم يتم العثور على المستخدم',
                'trade_not_found': 'لم يتم العثور على المعاملة',
                'ticket_not_found': 'لم يتم العثور على التذكرة',
                'document_not_found': 'لم يتم العثور على الوثيقة',
                'report_not_found': 'لم يتم العثور على التقرير'
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
        localStorage.setItem('iqx_admin_language', lang);
        document.documentElement.setAttribute('data-lang', lang);
        this.updatePageDirection();
        this.updateAllTexts();
        
        // Change currency based on language
        this.changeCurrencyForLanguage(lang);
    }
    
    updatePageDirection() {
        const isRTL = this.currentLanguage === 'ar';
        document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        document.body.classList.toggle('rtl', isRTL);
        document.body.classList.toggle('ltr', !isRTL);
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
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        });
        
        // Update title attributes
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.getText(key);
        });
        
        // Update alt attributes
        const altElements = document.querySelectorAll('[data-i18n-alt]');
        altElements.forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            element.alt = this.getText(key);
        });
    }
    
    toggleLanguage() {
        const newLang = this.currentLanguage === 'en' ? 'ar' : 'en';
        this.setLanguage(newLang);
        
        // Show notification
        this.showNotification(
            newLang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English'
        );
    }
    
    changeCurrencyForLanguage(lang) {
        console.log('Admin: Changing currency for language:', lang);
        
        // Find currency elements on the page with more specific selectors
        const currencyElements = document.querySelectorAll('.currency-dropdown span, .currency-selector span, [data-i18n="iqd"], [data-i18n="usd"], .currency-display, .balance-currency, #current-currency, .currency-value');
        
        console.log('Admin: Found currency elements:', currencyElements.length);
        
        if (lang === 'ar') {
            // Switch to IQD for Arabic interface
            currencyElements.forEach(element => {
                const originalText = element.textContent;
                if (originalText.includes('USD') || originalText.includes('USDT')) {
                    element.textContent = originalText.replace('USD', 'IQD').replace('USDT', 'IQD');
                    console.log('Admin: Changed element from', originalText, 'to', element.textContent);
                }
            });
            
            // Update any currency-related data attributes
            const currencyDataElements = document.querySelectorAll('[data-currency]');
            currencyDataElements.forEach(element => {
                element.setAttribute('data-currency', 'IQD');
            });
            
            // Save currency preference
            localStorage.setItem('admin_currency', 'IQD');
            console.log('Admin: Saved IQD currency preference');
        } else {
            // Switch to USD for English interface
            currencyElements.forEach(element => {
                const originalText = element.textContent;
                if (originalText.includes('IQD')) {
                    element.textContent = originalText.replace('IQD', 'USD');
                    console.log('Admin: Changed element from', originalText, 'to', element.textContent);
                }
            });
            
            // Update any currency-related data attributes
            const currencyDataElements = document.querySelectorAll('[data-currency]');
            currencyDataElements.forEach(element => {
                element.setAttribute('data-currency', 'USD');
            });
            
            // Save currency preference
            localStorage.setItem('admin_currency', 'USD');
            console.log('Admin: Saved USD currency preference');
        }
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'language-notification';
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-primary);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize admin language manager
const adminLanguageManager = new AdminLanguageManager();

// Global function to get translated text
function t(key) {
    return adminLanguageManager.getText(key);
}

// Global function to toggle language
function toggleLanguage() {
    adminLanguageManager.toggleLanguage();
} 