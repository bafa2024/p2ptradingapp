import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Text from '../components/Text';
import Card from '../components/Card';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const BuySellScreen = ({ route, navigation }) => {
  const [activeTab, setActiveTab] = useState(route?.params?.tab || 'buy');
  const [amount, setAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('USDT');
  const [selectedPayment, setSelectedPayment] = useState(null);
  
  const isBuy = activeTab === 'buy';
  
  const paymentMethods = [
    { id: '1', name: 'Bank Transfer', icon: 'business', time: '5-10 min' },
    { id: '2', name: 'Mobile Wallet', icon: 'phone-portrait', time: '1-3 min' },
    { id: '3', name: 'Cash', icon: 'cash', time: 'Instant' },
  ];

  const merchants = [
    {
      id: '1',
      name: 'FastTrade',
      price: isBuy ? '1.01' : '0.99',
      limit: '100 - 5000',
      rating: 4.8,
      trades: 1567,
      completion: '98.5%',
      available: '45,000',
    },
    {
      id: '2',
      name: 'CryptoExpress',
      price: isBuy ? '1.02' : '0.98',
      limit: '50 - 10000',
      rating: 4.9,
      trades: 3421,
      completion: '99.2%',
      available: '120,000',
    },
    {
      id: '3',
      name: 'QuickBuy',
      price: isBuy ? '1.00' : '1.00',
      limit: '200 - 3000',
      rating: 4.7,
      trades: 892,
      completion: '97.8%',
      available: '28,000',
    },
  ];

  const handleMerchantSelect = (merchant) => {
    navigation.navigate('Trade', { 
      merchant: merchant, 
      type: activeTab,
      coin: selectedCoin,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>P2P Trading</Text>
        <Pressable>
          <Ionicons name="filter" size={24} color={Colors.textPrimary} />
        </Pressable>
      </View>

      <View style={styles.tabs}>
        <Pressable
          onPress={() => setActiveTab('buy')}
          style={[styles.tab, activeTab === 'buy' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'buy' && styles.activeTabText]}>
            Buy
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('sell')}
          style={[styles.tab, activeTab === 'sell' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'sell' && styles.activeTabText]}>
            Sell
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.inputCard}>
          <View style={styles.coinSelector}>
            <Pressable style={styles.coinButton} onPress={() => {}}>
              <Text style={styles.coinText}>{selectedCoin}</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.textPrimary} />
            </Pressable>
          </View>
          
          <TextInput
            style={styles.amountInput}
            placeholder={`Enter amount in ${selectedCoin}`}
            placeholderTextColor={Colors.textMuted}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          
          <Text style={styles.helperText}>
            Available: {isBuy ? 'Your balance' : 'Market liquidity'}
          </Text>
        </Card>

        <Text style={styles.sectionTitle}>Payment Methods</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.paymentScroll}>
          {paymentMethods.map((method) => (
            <Pressable
              key={method.id}
              onPress={() => setSelectedPayment(method.id)}
              style={[
                styles.paymentMethod,
                selectedPayment === method.id && styles.selectedPayment,
              ]}
            >
              <Ionicons 
                name={method.icon} 
                size={20} 
                color={selectedPayment === method.id ? Colors.colorBuy : Colors.textSecondary} 
              />
              <Text style={[
                styles.paymentText,
                selectedPayment === method.id && styles.selectedPaymentText,
              ]}>
                {method.name}
              </Text>
              <Text style={styles.paymentTime}>{method.time}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Available Merchants</Text>
        {merchants.map((merchant) => (
          <Card key={merchant.id} style={styles.merchantCard}>
            <View style={styles.merchantHeader}>
              <View>
                <View style={styles.merchantNameRow}>
                  <Text style={styles.merchantName}>{merchant.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color={Colors.colorWarning} />
                    <Text style={styles.rating}>{merchant.rating}</Text>
                  </View>
                </View>
                <View style={styles.merchantStats}>
                  <Text style={styles.statText}>{merchant.trades} trades</Text>
                  <Text style={styles.statDivider}>•</Text>
                  <Text style={styles.statText}>{merchant.completion} completion</Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.price}>${merchant.price}</Text>
              </View>
            </View>
            
            <View style={styles.merchantDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Limit</Text>
                <Text style={styles.detailValue}>{merchant.limit} {selectedCoin}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Available</Text>
                <Text style={styles.detailValue}>{merchant.available} {selectedCoin}</Text>
              </View>
            </View>
            
            <Button
              label={isBuy ? 'Buy Now' : 'Sell Now'}
              onPress={() => handleMerchantSelect(merchant)}
              style={styles.merchantButton}
            />
          </Card>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  title: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.bgTertiary,
  },
  activeTab: {
    backgroundColor: Colors.colorBuy,
  },
  tabText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.white,
    fontWeight: Typography.fontWeights.semibold,
  },
  content: {
    padding: Spacing.lg,
  },
  inputCard: {
    marginBottom: Spacing.lg,
  },
  coinSelector: {
    marginBottom: Spacing.md,
  },
  coinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.bgTertiary,
    borderRadius: 8,
  },
  coinText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  amountInput: {
    fontSize: Typography.fontSizes.lg,
    color: Colors.textPrimary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.bgTertiary,
    borderRadius: 8,
    marginBottom: Spacing.sm,
  },
  helperText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textMuted,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  paymentScroll: {
    marginBottom: Spacing.lg,
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  paymentMethod: {
    padding: Spacing.md,
    marginRight: Spacing.sm,
    borderRadius: 8,
    backgroundColor: Colors.bgSecondary,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    minWidth: 100,
  },
  selectedPayment: {
    borderColor: Colors.colorBuy,
    backgroundColor: Colors.colorBuy + '10',
  },
  paymentText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  selectedPaymentText: {
    color: Colors.colorBuy,
    fontWeight: Typography.fontWeights.semibold,
  },
  paymentTime: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  merchantCard: {
    marginBottom: Spacing.md,
  },
  merchantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  merchantNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  merchantName: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
  },
  merchantStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
  },
  statDivider: {
    color: Colors.textMuted,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  price: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.colorBuy,
  },
  merchantDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    marginBottom: Spacing.md,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textPrimary,
  },
  merchantButton: {
    width: '100%',
  },
});

export default BuySellScreen;