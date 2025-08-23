import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Typography from '../constants/Typography';
import GlobalStyles from '../styles/GlobalStyles';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('buy');
  const [selectedCrypto, setSelectedCrypto] = useState('USDT');
  const [selectedAmount, setSelectedAmount] = useState('Any');
  const [selectedPayment, setSelectedPayment] = useState('All payments');
  const [selectedSort, setSelectedSort] = useState('Recommended');
  
  // Header state
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [currentCurrency, setCurrency] = useState('USD');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState('P2P');

  const navTabs = ['P2P', 'Express', 'Block trade'];
  const languages = [
    { code: 'EN', name: 'English', currency: 'USD' },
    { code: 'AR', name: 'العربية', currency: 'IQD' },
    { code: 'KU', name: 'کوردی', currency: 'IQD' },
  ];

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Implement search logic here
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setSearchQuery('');
    }
  };

  const openQRScanner = () => {
    // Implement QR scanner functionality
    console.log('Opening QR Scanner...');
  };

  const toggleLanguageCurrency = () => {
    setShowLanguageModal(true);
  };

  const selectLanguage = (language) => {
    setCurrentLanguage(language.code);
    setCurrency(language.currency);
    setShowLanguageModal(false);
  };

  // Ensure safe area is maintained
  useEffect(() => {
    // Force a re-render to ensure safe area is applied
    const timer = setTimeout(() => {
      // This helps prevent the overlap issue
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const cryptos = [
    { code: 'USDT', name: 'Tether', icon: '₮' },
    { code: 'BTC', name: 'Bitcoin', icon: '₿' },
    { code: 'ETH', name: 'Ethereum', icon: 'Ξ' },
    { code: 'LTC', name: 'Litecoin', icon: 'Ł' },
  ];

  const amounts = [
    'Any',
    '1,000 - 5,000 IQD',
    '5,000 - 10,000 IQD',
    '10,000 - 50,000 IQD',
    '50,000+ IQD',
  ];

  const paymentMethods = [
    { id: 'all', name: 'All payments', icon: 'globe-outline' },
    { id: 'al-rafdin', name: 'Al-Rafdin QiServices', icon: 'business-outline' },
    { id: 'western-union', name: 'Western Union', icon: 'card-outline' },
    { id: 'zain-cash', name: 'Zain Cash', icon: 'phone-portrait-outline' },
    { id: 'fib', name: 'First Iraqi Bank', icon: 'business-outline' },
    { id: 'fast-pay', name: 'Fast Pay', icon: 'flash-outline' },
  ];

  const sortOptions = [
    { id: 'recommended', name: 'Recommended', desc: 'Best overall merchants', icon: 'star' },
    { id: 'price-low', name: 'Price: Low to High', desc: 'Best rates first', icon: 'arrow-up' },
    { id: 'price-high', name: 'Price: High to Low', desc: 'Premium rates first', icon: 'arrow-down' },
    { id: 'completion-rate', name: 'Completion Rate', desc: 'Most reliable merchants', icon: 'checkmark-circle' },
    { id: 'trade-count', name: 'Trade Count', desc: 'Most active merchants', icon: 'swap-horizontal' },
  ];

  const merchants = [
    {
      id: 1,
      name: 'CryptoMaster',
      avatar: 'CM',
      verified: true,
      star: true,
      trades: '2,847',
      completionRate: '98.5%',
      avgTime: '15 min',
      price: '1,520.50',
      currency: 'IQD',
      limits: '1,000 - 50,000 IQD',
      paymentMethods: ['Zain Cash', 'Fast Pay'],
    },
    {
      id: 2,
      name: 'TradeExpert',
      avatar: 'TE',
      verified: true,
      star: false,
      trades: '1,945',
      completionRate: '97.8%',
      avgTime: '12 min',
      price: '1,518.75',
      currency: 'IQD',
      limits: '500 - 25,000 IQD',
      paymentMethods: ['Al-Rafdin', 'Western Union'],
    },
    {
      id: 3,
      name: 'FastTrade',
      avatar: 'FT',
      verified: false,
      star: false,
      trades: '892',
      completionRate: '96.2%',
      avgTime: '18 min',
      price: '1,525.00',
      currency: 'IQD',
      limits: '2,000 - 100,000 IQD',
      paymentMethods: ['FIB', 'Zain Cash'],
    },
  ];

  const renderMerchantCard = (merchant) => (
    <View key={merchant.id} style={styles.merchantCard}>
      <View style={styles.merchantHeader}>
        <View style={styles.merchantInfo}>
          <View style={styles.merchantAvatar}>
            <Text style={styles.avatarText}>{merchant.avatar}</Text>
          </View>
          <View style={styles.merchantDetails}>
            <View style={styles.merchantNameRow}>
              <Text style={styles.merchantName}>{merchant.name}</Text>
              {merchant.verified && (
                <View style={[styles.badge, styles.badgeVerified]}>
                  <Text style={styles.badgeText}>VERIFIED</Text>
                </View>
              )}
              {merchant.star && (
                <View style={[styles.badge, styles.badgeStar]}>
                  <Text style={styles.badgeText}>STAR</Text>
                </View>
              )}
            </View>
            <View style={styles.merchantStats}>
              <Text style={styles.statText}>{merchant.trades} trades</Text>
              <Text style={styles.statText}>{merchant.completionRate}</Text>
              <Text style={styles.statText}>~{merchant.avgTime}</Text>
            </View>
          </View>
        </View>
        <View style={styles.merchantPrice}>
          <Text style={styles.priceAmount}>{merchant.price}</Text>
          <Text style={styles.priceLabel}>{merchant.currency}</Text>
        </View>
      </View>
      
      <View style={styles.merchantDetailsRow}>
        <View>
          <Text style={styles.detailLabel}>Limits</Text>
          <Text style={styles.detailValue}>{merchant.limits}</Text>
        </View>
        <View>
          <Text style={styles.detailLabel}>Payment</Text>
          <Text style={styles.detailValue}>{merchant.paymentMethods.join(', ')}</Text>
        </View>
      </View>
      
      <View style={styles.merchantActions}>
        <TouchableOpacity 
          style={[styles.actionButton, selectedTab === 'buy' ? styles.buyBtn : styles.sellBtn]}
          onPress={() => navigation.navigate('Trade', { merchant, type: selectedTab })}
        >
          <Text style={styles.actionButtonText}>
            {selectedTab === 'buy' ? 'Buy' : 'Sell'} {selectedCrypto}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={true} />
      
      {/* Header */}
      <View style={styles.header}>
        {!isSearchActive ? (
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.navTabs}>
                {navTabs.map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={styles.navTabContainer}
                    onPress={() => setActiveNavTab(tab)}
                  >
                    <Text style={[
                      styles.navTab,
                      activeNavTab === tab && styles.navTabActive
                    ]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.headerActions}>
              {/* QR Code Button */}
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={openQRScanner}
              >
                <Ionicons name="qr-code-outline" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
              
              {/* Language/Currency Toggle */}
              <TouchableOpacity 
                style={styles.languageToggle}
                onPress={toggleLanguageCurrency}
              >
                <Ionicons name="globe-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.languageText}>{currentLanguage}/{currentCurrency}</Text>
              </TouchableOpacity>
              
              {/* Search Button */}
              <TouchableOpacity
                style={styles.searchButton}
                onPress={toggleSearch}
              >
                <Ionicons name="search" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.searchFullContainer}>
            <TextInput
              style={styles.searchInputFull}
              placeholder="Search merchants..."
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus={true}
            />
            <TouchableOpacity
              style={styles.searchCloseButton}
              onPress={toggleSearch}
            >
              <Ionicons name="close" size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Language/Currency Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowLanguageModal(false)}
        >
          <View style={styles.languageModal}>
            <Text style={styles.modalTitle}>Select Language & Currency</Text>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  currentLanguage === language.code && styles.languageOptionActive
                ]}
                onPress={() => selectLanguage(language)}
              >
                <Text style={styles.languageOptionText}>
                  {language.name} ({language.currency})
                </Text>
                {currentLanguage === language.code && (
                  <Ionicons name="checkmark" size={20} color={Colors.colorBuy} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerGradient}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Trade with confidence</Text>
              <Text style={styles.bannerSubtitle}>Secure P2P trading platform</Text>
              <View style={styles.bannerDots}>
                <View style={[styles.bannerDot, styles.bannerDotActive]} />
                <View style={styles.bannerDot} />
                <View style={styles.bannerDot} />
              </View>
            </View>
            <Ionicons name="trending-up" size={24} color={Colors.white} />
          </View>
        </View>

        {/* Trading Controls */}
        <View style={styles.tradingControls}>
          {/* Buy/Sell Tabs */}
          <View style={styles.buySeelTabs}>
            <TouchableOpacity
              style={[styles.tabBtn, selectedTab === 'buy' && styles.tabBtnActive]}
              onPress={() => setSelectedTab('buy')}
            >
              <Text style={[styles.tabBtnText, selectedTab === 'buy' && styles.tabBtnTextActive]}>
                Buy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, selectedTab === 'sell' && styles.tabBtnActive]}
              onPress={() => setSelectedTab('sell')}
            >
              <Text style={[styles.tabBtnText, selectedTab === 'sell' && styles.tabBtnTextActive]}>
                Sell
              </Text>
            </TouchableOpacity>
          </View>

          {/* Currency Selector */}
          <TouchableOpacity style={styles.dropdown}>
            <View style={styles.dropdownContent}>
              <Text style={styles.dropdownText}>{selectedCrypto}</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {/* Filters Row */}
          <View style={styles.filtersRow}>
            <TouchableOpacity style={styles.filterDropdown}>
              <Text style={styles.filterText}>{selectedAmount}</Text>
              <Ionicons name="chevron-down" size={14} color={Colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.filterDropdown}>
              <Text style={styles.filterText}>{selectedPayment}</Text>
              <Ionicons name="chevron-down" size={14} color={Colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.filterDropdown}>
              <Ionicons name="options-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.filterText}>More</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.filterDropdown}>
              <Ionicons name="funnel-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.filterText}>{selectedSort}</Text>
              <Ionicons name="chevron-down" size={14} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Merchant List */}
        <View style={styles.merchantList}>
          {merchants.map(renderMerchantCard)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 0, // Let manual insets handle top padding
    position: 'relative',
    zIndex: 1,
  },
  
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  
  header: {
    backgroundColor: '#000000',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
  },
  
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  navTabs: {
    flexDirection: 'row',
    marginLeft: Layout.spacing.lg,
    gap: Layout.spacing.xl,
  },
  
  navTab: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textMuted,
  },
  
  navTabActive: {
    color: Colors.textPrimary,
  },
  
  headerActions: {
    flexDirection: 'row',
    gap: Layout.spacing.lg,
    alignItems: 'center',
  },
  
  searchFullContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: Layout.spacing.sm,
  },
  
  searchInputFull: {
    flex: 1,
    height: 40,
    paddingHorizontal: Layout.spacing.md,
    fontSize: Typography.fontSizes.md,
    color: Colors.textPrimary,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: Layout.spacing.sm,
  },
  
  searchCloseButton: {
    padding: Layout.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  languageToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  
  languageText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.medium,
  },
  
  searchButton: {
    padding: 6,
  },
  
  navTabContainer: {
    padding: 4,
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  languageModal: {
    backgroundColor: '#000000',
    padding: Layout.spacing.lg,
    margin: Layout.spacing.lg,
    minWidth: 280,
  },
  
  modalTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.lg,
    textAlign: 'center',
  },
  
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.sm,
    marginBottom: Layout.spacing.xs,
  },
  
  languageOptionActive: {
    backgroundColor: '#000000',
  },
  
  languageOptionText: {
    fontSize: Typography.fontSizes.md,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeights.medium,
  },
  
  banner: {
    marginHorizontal: Layout.spacing.lg,
    marginVertical: Layout.spacing.md,
    backgroundColor: '#000000',
  },
  
  bannerGradient: {
    padding: Layout.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  
  bannerContent: {
    flex: 1,
  },
  
  bannerTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.white,
    marginBottom: 4,
  },
  
  bannerSubtitle: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.white,
    opacity: 0.8,
  },
  
  bannerDots: {
    flexDirection: 'row',
    gap: 4,
    marginTop: Layout.spacing.sm,
  },
  
  bannerDot: {
    width: 6,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  bannerDotActive: {
    backgroundColor: Colors.white,
  },
  
  tradingControls: {
    marginHorizontal: Layout.spacing.lg,
    marginTop: Layout.spacing.md,
    paddingVertical: Layout.spacing.md,
    backgroundColor: '#000000',
  },
  
  buySeelTabs: {
    flexDirection: 'row',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.lg,
  },
  
  tabBtn: {
    flex: 1,
    padding: Layout.spacing.md,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  
  tabBtnActive: {
  },
  
  tabBtnText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
  },
  
  tabBtnTextActive: {
    color: Colors.white,
  },
  
  dropdown: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
    backgroundColor: '#000000',
  },
  
  dropdownContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  dropdownText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textPrimary,
  },
  
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.sm,
  },
  
  filterDropdown: {
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
    minWidth: 80,
  },
  
  filterText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
  },
  
  merchantList: {
    marginTop: Layout.spacing.md,
  },
  
  merchantCard: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    marginBottom: Layout.spacing.sm,
    backgroundColor: '#000000',
  },
  
  merchantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.md,
  },
  
  merchantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  merchantAvatar: {
    width: 48,
    height: 48,
    backgroundColor: Colors.colorBuy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.md,
  },
  
  avatarText: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.white,
  },
  
  merchantDetails: {
    flex: 1,
  },
  
  merchantNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: 4,
  },
  
  merchantName: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 0,
  },
  
  badgeVerified: {
    backgroundColor: Colors.colorVerified,
  },
  
  badgeStar: {
    backgroundColor: Colors.colorStar,
  },
  
  badgeText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.white,
  },
  
  merchantStats: {
    flexDirection: 'row',
    gap: Layout.spacing.md,
  },
  
  statText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textMuted,
  },
  
  merchantPrice: {
    alignItems: 'flex-end',
  },
  
  priceAmount: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.colorBuy,
    marginBottom: 2,
  },
  
  priceLabel: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textMuted,
  },
  
  merchantDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.sm,
  },
  
  detailLabel: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  
  detailValue: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textPrimary,
  },
  
  merchantActions: {
    marginTop: Layout.spacing.sm,
  },
  
  actionButton: {
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
    alignItems: 'center',
    minWidth: 120,
  },
  
  buyBtn: {
    backgroundColor: Colors.colorBuy,
  },
  
  sellBtn: {
    backgroundColor: Colors.colorSell,
  },
  
  actionButtonText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.white,
  },
});

export default HomeScreen;
