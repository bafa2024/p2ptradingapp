// Language Management System for IQX Mobile App
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('iqx_language') || 'en';
        this.translations = {
            en: {
                // Navigation
                'nav_p2p': 'P2P',
                'nav_wallet': 'Wallet',
                'nav_transfer': 'Transfer',
                'nav_profile': 'Profile',
                
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
                
                // Home Page
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
                'security': 'Security',
                'settings': 'Settings',
                'notifications': 'Notifications',
                'language': 'Language',
                'theme': 'Theme',
                'dark_mode': 'Dark Mode',
                'light_mode': 'Light Mode',
                'auto': 'Auto',
                'verification': 'Verification',
                'kyc_verification': 'KYC Verification',
                'phone_verification': 'Phone Verification',
                'email_verification': 'Email Verification',
                'verification_status': 'Verification Status',
                'verified': 'Verified',
                'unverified': 'Unverified',
                'pending': 'Pending',
                'rejected': 'Rejected',
                
                // Membership
                'membership': 'Membership',
                'membership_level': 'Membership Level',
                'free_trial': 'Free Trial',
                'premium': 'Premium',
                'vip': 'VIP',
                'membership_benefits': 'Membership Benefits',
                'upgrade_membership': 'Upgrade Membership',
                'membership_expiry': 'Membership Expiry',
                
                // Support
                'support': 'Support',
                'help': 'Help',
                'contact_us': 'Contact Us',
                'faq': 'FAQ',
                'ticket': 'Ticket',
                'tickets': 'Tickets',
                'create_ticket': 'Create Ticket',
                'ticket_subject': 'Ticket Subject',
                'ticket_message': 'Ticket Message',
                'ticket_status': 'Ticket Status',
                'ticket_priority': 'Ticket Priority',
                'low': 'Low',
                'medium': 'Medium',
                'high': 'High',
                'urgent': 'Urgent',
                
                // Notifications
                'notifications': 'Notifications',
                'all_notifications': 'All Notifications',
                'unread': 'Unread',
                'read': 'Read',
                'mark_as_read': 'Mark as Read',
                'mark_all_as_read': 'Mark All as Read',
                'clear_all': 'Clear All',
                
                // QR Scanner
                'qr_scanner': 'QR Scanner',
                'scan_qr_code': 'Scan QR Code',
                'qr_code_invalid': 'Invalid QR Code',
                'qr_code_success': 'QR Code Scanned Successfully',
                
                // Referrals
                'referrals': 'Referrals',
                'referral_code': 'Referral Code',
                'referral_link': 'Referral Link',
                'referral_bonus': 'Referral Bonus',
                'total_referrals': 'Total Referrals',
                'active_referrals': 'Active Referrals',
                'referral_earnings': 'Referral Earnings',
                
                // Chat
                'chat': 'Chat',
                'messages': 'Messages',
                'new_message': 'New Message',
                'send_message': 'Send Message',
                'type_message': 'Type a message...',
                'online': 'Online',
                'offline': 'Offline',
                'last_seen': 'Last seen',
                
                // Status Messages
                'success': 'Success',
                'error': 'Error',
                'warning': 'Warning',
                'info': 'Information',
                'operation_successful': 'Operation completed successfully',
                'operation_failed': 'Operation failed',
                'network_error': 'Network error',
                'try_again': 'Please try again',
                'no_data': 'No data available',
                'no_results': 'No results found',
                
                // Time
                'today': 'Today',
                'yesterday': 'Yesterday',
                'this_week': 'This Week',
                'this_month': 'This Month',
                'this_year': 'This Year',
                'ago': 'ago',
                'minutes': 'minutes',
                'hours': 'hours',
                'days': 'days',
                'weeks': 'weeks',
                'months': 'months',
                'years': 'years',
                
                // Payment Methods
                'al_rafdin': 'Al-Rafdin',
                'qi_services': 'QiServices',
                'western_union': 'Western Union',
                'zain_cash': 'Zain Cash',
                'first_iraqi_bank': 'First Iraqi Bank (FIB)',
                'fast_pay': 'Fast Pay',
                'moneygram': 'MoneyGram',
                'cash': 'Cash',
                'bank_transfer': 'Bank Transfer',
                
                // Currencies
                'iqd': 'IQD',
                'usd': 'USD',
                'eur': 'EUR',
                'gbp': 'GBP',
                
                // Trading Status
                'active': 'Active',
                'inactive': 'Inactive',
                'completed': 'Completed',
                'cancelled': 'Cancelled',
                'pending': 'Pending',
                'processing': 'Processing',
                'failed': 'Failed',
                
                // App Specific
                'iqx': 'IQX',
                'p2p_trading': 'P2P Trading',
                'express_trade': 'Express Trade',
                'block_trade': 'Block Trade',
                'quick_transfer': 'Quick Transfer',
                'secure_trading': 'Secure Trading',
                'trusted_platform': 'Trusted Platform',
                'best_rates': 'Best Rates',
                'fast_transactions': 'Fast Transactions',
                '24_7_support': '24/7 Support',
                
                // Additional UI Elements
                'enter': 'Enter',
                'reset': 'Reset',
                
                // Demo Page
                'english': 'English',
                'arabic': 'العربية',
                'navigation': 'Navigation',
                'navigation_description': 'This demonstrates how navigation elements adapt to different languages and RTL layout.',
                'trading_features': 'Trading Features',
                'buy_description': 'Purchase cryptocurrencies with local payment methods.',
                'sell_description': 'Sell your cryptocurrencies for local currency.',
                'wallet_description': 'Secure digital wallet for your assets.',
                'transfer_description': 'Quick and secure transfers between users.',
                'forms': 'Forms & Inputs',
                'email_placeholder': 'Enter your email',
                'password_placeholder': 'Enter your password',
                'amount_placeholder': 'Enter amount',
                'submit': 'Submit',
                'status_indicators': 'Status Indicators',
                'mobile_payment': 'Mobile Payment',
                'money_transfer': 'Money Transfer',
                'cash_payment': 'Cash Payment'
            },
            ar: {
                // Navigation
                'nav_p2p': 'P2P',
                'nav_wallet': 'المحفظة',
                'nav_transfer': 'تحويل',
                'nav_profile': 'الملف الشخصي',
                
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
                
                // Home Page
                'live_market_rates': 'أسعار السوق المباشرة',
                'updated_just_now': 'تم التحديث: الآن',
                'your_trades': 'صفقاتك',
                'success_rate': 'معدل النجاح',
                'active_trades': 'الصفقات النشطة',
                'excellent': 'ممتاز',
                'plus_12_this_week': '+12 هذا الأسبوع',
                'bank_transfer': 'تحويل بنكي',
                'all': 'الكل',
                'p2p': 'ند لند',
                'search_placeholder': 'البحث عن العملات المشفرة أو المستخدمين أو طرق الدفع...',
                
                // Wallet
                'balance': 'الرصيد',
                'available_balance': 'الرصيد المتاح',
                'frozen_balance': 'الرصيد المجمد',
                'deposit': 'إيداع',
                'withdraw': 'سحب',
                'transfer': 'تحويل',
                'history': 'السجل',
                'transaction_history': 'سجل المعاملات',
                'recent_transactions': 'المعاملات الحديثة',
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
                'security': 'الأمان',
                'settings': 'الإعدادات',
                'notifications': 'الإشعارات',
                'language': 'اللغة',
                'theme': 'المظهر',
                'dark_mode': 'الوضع الداكن',
                'light_mode': 'الوضع الفاتح',
                'auto': 'تلقائي',
                'verification': 'التحقق',
                'kyc_verification': 'التحقق من الهوية',
                'phone_verification': 'التحقق من الهاتف',
                'email_verification': 'التحقق من البريد الإلكتروني',
                'verification_status': 'حالة التحقق',
                'verified': 'متحقق',
                'unverified': 'غير متحقق',
                'pending': 'قيد الانتظار',
                'rejected': 'مرفوض',
                
                // Membership
                'membership': 'العضوية',
                'membership_level': 'مستوى العضوية',
                'free_trial': 'تجربة مجانية',
                'premium': 'مميز',
                'vip': 'VIP',
                'membership_benefits': 'مزايا العضوية',
                'upgrade_membership': 'ترقية العضوية',
                'membership_expiry': 'انتهاء العضوية',
                
                // Support
                'support': 'الدعم',
                'help': 'المساعدة',
                'contact_us': 'اتصل بنا',
                'faq': 'الأسئلة الشائعة',
                'ticket': 'تذكرة',
                'tickets': 'التذاكر',
                'create_ticket': 'إنشاء تذكرة',
                'ticket_subject': 'موضوع التذكرة',
                'ticket_message': 'رسالة التذكرة',
                'ticket_status': 'حالة التذكرة',
                'ticket_priority': 'أولوية التذكرة',
                'low': 'منخفضة',
                'medium': 'متوسطة',
                'high': 'عالية',
                'urgent': 'عاجلة',
                
                // Notifications
                'notifications': 'الإشعارات',
                'all_notifications': 'جميع الإشعارات',
                'unread': 'غير مقروء',
                'read': 'مقروء',
                'mark_as_read': 'تحديد كمقروء',
                'mark_all_as_read': 'تحديد الكل كمقروء',
                'clear_all': 'مسح الكل',
                
                // QR Scanner
                'qr_scanner': 'ماسح QR',
                'scan_qr_code': 'مسح رمز QR',
                'qr_code_invalid': 'رمز QR غير صحيح',
                'qr_code_success': 'تم مسح رمز QR بنجاح',
                
                // Referrals
                'referrals': 'الإحالات',
                'referral_code': 'رمز الإحالة',
                'referral_link': 'رابط الإحالة',
                'referral_bonus': 'مكافأة الإحالة',
                'total_referrals': 'إجمالي الإحالات',
                'active_referrals': 'الإحالات النشطة',
                'referral_earnings': 'أرباح الإحالات',
                
                // Chat
                'chat': 'الدردشة',
                'messages': 'الرسائل',
                'new_message': 'رسالة جديدة',
                'send_message': 'إرسال رسالة',
                'type_message': 'اكتب رسالة...',
                'online': 'متصل',
                'offline': 'غير متصل',
                'last_seen': 'آخر ظهور',
                
                // Status Messages
                'success': 'نجح',
                'error': 'خطأ',
                'warning': 'تحذير',
                'info': 'معلومات',
                'operation_successful': 'تمت العملية بنجاح',
                'operation_failed': 'فشلت العملية',
                'network_error': 'خطأ في الشبكة',
                'try_again': 'يرجى المحاولة مرة أخرى',
                'no_data': 'لا توجد بيانات',
                'no_results': 'لا توجد نتائج',
                
                // Time
                'today': 'اليوم',
                'yesterday': 'أمس',
                'this_week': 'هذا الأسبوع',
                'this_month': 'هذا الشهر',
                'this_year': 'هذا العام',
                'ago': 'منذ',
                'minutes': 'دقائق',
                'hours': 'ساعات',
                'days': 'أيام',
                'weeks': 'أسابيع',
                'months': 'أشهر',
                'years': 'سنوات',
                
                // Payment Methods
                'al_rafdin': 'الرافدين',
                'qi_services': 'كي سيرفيس',
                'western_union': 'ويسترن يونيون',
                'zain_cash': 'زين كاش',
                'first_iraqi_bank': 'البنك العراقي الأول',
                'fast_pay': 'فاست باي',
                'moneygram': 'موني جرام',
                'cash': 'نقداً',
                'bank_transfer': 'تحويل بنكي',
                
                // Currencies
                'iqd': 'دينار عراقي',
                'usd': 'دولار أمريكي',
                'eur': 'يورو',
                'gbp': 'جنيه إسترليني',
                
                // Trading Status
                'active': 'نشط',
                'inactive': 'غير نشط',
                'completed': 'مكتمل',
                'cancelled': 'ملغي',
                'pending': 'قيد الانتظار',
                'processing': 'قيد المعالجة',
                'failed': 'فشل',
                
                // App Specific
                'iqx': 'IQX',
                'p2p_trading': 'التداول P2P',
                'express_trade': 'التداول السريع',
                'block_trade': 'التداول بالكتل',
                'quick_transfer': 'التحويل السريع',
                'secure_trading': 'التداول الآمن',
                'trusted_platform': 'منصة موثوقة',
                'best_rates': 'أفضل الأسعار',
                'fast_transactions': 'معاملات سريعة',
                '24_7_support': 'دعم 24/7',
                
                // Additional UI Elements
                'enter': 'إدخال',
                'reset': 'إعادة تعيين',
                
                // Demo Page
                'english': 'English',
                'arabic': 'العربية',
                'navigation': 'التنقل',
                'navigation_description': 'هذا يوضح كيف تتكيف عناصر التنقل مع اللغات المختلفة وتخطيط RTL.',
                'trading_features': 'ميزات التداول',
                'buy_description': 'شراء العملات المشفرة بطرق الدفع المحلية.',
                'sell_description': 'بيع عملاتك المشفرة مقابل العملة المحلية.',
                'wallet_description': 'محفظة رقمية آمنة لأصولك.',
                'transfer_description': 'تحويلات سريعة وآمنة بين المستخدمين.',
                'forms': 'النماذج والمدخلات',
                'email_placeholder': 'أدخل بريدك الإلكتروني',
                'password_placeholder': 'أدخل كلمة المرور',
                'amount_placeholder': 'أدخل المبلغ',
                'submit': 'إرسال',
                'status_indicators': 'مؤشرات الحالة',
                'mobile_payment': 'الدفع عبر الهاتف',
                'money_transfer': 'تحويل الأموال',
                'cash_payment': 'الدفع نقداً'
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
        localStorage.setItem('iqx_language', lang);
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
        
        // Update placeholder attributes
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.getText(key);
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
        console.log('Changing currency for language:', lang);
        
        // Find currency elements on the page with more specific selectors
        const currencyElements = document.querySelectorAll('.currency-dropdown span, .currency-selector span, [data-i18n="iqd"], [data-i18n="usd"], #current-currency, .currency-value, .balance-currency');
        
        console.log('Found currency elements:', currencyElements.length);
        
        if (lang === 'ar') {
            // Switch to IQD for Arabic interface
            currencyElements.forEach(element => {
                const originalText = element.textContent;
                if (originalText.includes('USD') || originalText.includes('USDT')) {
                    element.textContent = originalText.replace('USD', 'IQD').replace('USDT', 'IQD');
                    console.log('Changed element from', originalText, 'to', element.textContent);
                }
            });
            
            // Update any currency-related data attributes
            const currencyDataElements = document.querySelectorAll('[data-currency]');
            currencyDataElements.forEach(element => {
                element.setAttribute('data-currency', 'IQD');
            });
            
            // Save currency preference
            localStorage.setItem('currency', 'IQD');
            console.log('Saved IQD currency preference');
        } else {
            // Switch to USD for English interface
            currencyElements.forEach(element => {
                const originalText = element.textContent;
                if (originalText.includes('IQD')) {
                    element.textContent = originalText.replace('IQD', 'USD');
                    console.log('Changed element from', originalText, 'to', element.textContent);
                }
            });
            
            // Update any currency-related data attributes
            const currencyDataElements = document.querySelectorAll('[data-currency]');
            currencyDataElements.forEach(element => {
                element.setAttribute('data-currency', 'USD');
            });
            
            // Save currency preference
            localStorage.setItem('currency', 'USD');
            console.log('Saved USD currency preference');
        }
        
        // Trigger balance display update if the function exists
        if (typeof updateBalanceDisplay === 'function') {
            updateBalanceDisplay();
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

// Initialize language manager
const languageManager = new LanguageManager();

// Global function to get translated text
function t(key) {
    return languageManager.getText(key);
}

// Global function to toggle language
function toggleLanguage() {
    languageManager.toggleLanguage();
} 