import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Typography from '../constants/Typography';
import GlobalStyles from '../styles/GlobalStyles';

const HomeScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('buy');
  const [selectedCrypto, setSelectedCrypto] = useState('USDT');
  const [selectedAmount, setSelectedAmount] = useState('Any');
  const [selectedPayment, setSelectedPayment] = useState('All payments');
  const [selectedSort, setSelectedSort] = useState('Recommended');

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
    <SafeAreaView style={GlobalStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.navTabs}>
            <Text style={[styles.navTab, styles.navTabActive]}>P2P</Text>
            <Text style={styles.navTab}>Express</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Ionicons name="search" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="person-circle-outline" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <LinearGradient
          colors={[Colors.colorBuy, '#1D4ED8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
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
        </LinearGradient>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  
  header: {
    backgroundColor: Colors.bgSecondary,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
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
  
  banner: {
    margin: Layout.spacing.lg,
    padding: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  bannerDotActive: {
    backgroundColor: Colors.white,
  },
  
  tradingControls: {
    margin: Layout.spacing.lg,
    backgroundColor: Colors.bgCard,
    borderRadius: Layout.borderRadius.xl,
    padding: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  
  buySeelTabs: {
    flexDirection: 'row',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.lg,
  },
  
  tabBtn: {
    flex: 1,
    padding: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.bgElevated,
    alignItems: 'center',
  },
  
  tabBtnActive: {
    backgroundColor: Colors.colorBuy,
    borderColor: Colors.colorBuy,
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
    backgroundColor: Colors.bgElevated,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
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
    backgroundColor: Colors.bgElevated,
    borderRadius: Layout.borderRadius.sm,
    paddingHorizontal: Layout.spacing.md,
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
    margin: Layout.spacing.lg,
    marginTop: 0,
  },
  
  merchantCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: Layout.borderRadius.xl,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderColor,
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
    borderRadius: 24,
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
    borderRadius: 4,
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
    borderRadius: Layout.borderRadius.sm,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    alignItems: 'center',
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
