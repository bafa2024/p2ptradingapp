import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Typography from '../constants/Typography';
import GlobalStyles from '../styles/GlobalStyles';

const TradeScreen = ({ navigation, route }) => {
  const { merchant, type } = route.params;
  const [amount, setAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentMethods = [
    { id: 'zain-cash', name: 'Zain Cash', icon: 'phone-portrait-outline', fees: '0.5%' },
    { id: 'fast-pay', name: 'Fast Pay', icon: 'flash-outline', fees: '1.0%' },
    { id: 'fib', name: 'First Iraqi Bank', icon: 'business-outline', fees: '0.8%' },
    { id: 'al-rafdin', name: 'Al-Rafdin QiServices', icon: 'business-outline', fees: '0.7%' },
  ];

  const calculateTotal = () => {
    if (!amount || !merchant.price) return '0.00';
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    const price = parseFloat(merchant.price.replace(/,/g, ''));
    return (numAmount / price).toFixed(6);
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {type === 'buy' ? 'Buy' : 'Sell'} USDT
        </Text>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Merchant Info */}
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
            </View>
            <View style={styles.merchantStats}>
              <Text style={styles.statText}>{merchant.trades} trades</Text>
              <Text style={styles.statText}>{merchant.completionRate}</Text>
              <Text style={styles.statText}>~{merchant.avgTime}</Text>
            </View>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.priceAmount}>{merchant.price}</Text>
            <Text style={styles.priceLabel}>IQD per USDT</Text>
          </View>
        </View>

        {/* Trade Form */}
        <View style={styles.tradeForm}>
          {/* Amount Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>
              {type === 'buy' ? 'I want to pay' : 'I want to receive'}
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.amountInput}
                placeholder="Enter amount"
                placeholderTextColor={Colors.textMuted}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
              <Text style={styles.currencyLabel}>IQD</Text>
            </View>
            <Text style={styles.helperText}>
              Limits: {merchant.limits}
            </Text>
          </View>

          {/* Receive Amount */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>
              {type === 'buy' ? 'I will receive' : 'I will pay'}
            </Text>
            <View style={styles.receiveContainer}>
              <Text style={styles.receiveAmount}>{calculateTotal()}</Text>
              <Text style={styles.receiveCurrency}>USDT</Text>
            </View>
          </View>

          {/* Payment Methods */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Payment Method</Text>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedPayment === method.id && styles.paymentMethodSelected
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <View style={styles.paymentLeft}>
                  <Ionicons 
                    name={method.icon} 
                    size={24} 
                    color={selectedPayment === method.id ? Colors.white : Colors.textSecondary} 
                  />
                  <View style={styles.paymentInfo}>
                    <Text style={[
                      styles.paymentName,
                      selectedPayment === method.id && styles.paymentNameSelected
                    ]}>
                      {method.name}
                    </Text>
                    <Text style={[
                      styles.paymentFee,
                      selectedPayment === method.id && styles.paymentFeeSelected
                    ]}>
                      Fee: {method.fees}
                    </Text>
                  </View>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedPayment === method.id && styles.radioButtonSelected
                ]}>
                  {selectedPayment === method.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Trade Summary */}
          <View style={styles.tradeSummary}>
            <Text style={styles.summaryTitle}>Trade Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Price</Text>
              <Text style={styles.summaryValue}>{merchant.price} IQD/USDT</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount</Text>
              <Text style={styles.summaryValue}>{amount || '0'} IQD</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Payment Method</Text>
              <Text style={styles.summaryValue}>
                {selectedPayment ? paymentMethods.find(p => p.id === selectedPayment)?.name : 'Select method'}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={styles.summaryTotalLabel}>
                {type === 'buy' ? 'You will receive' : 'You will pay'}
              </Text>
              <Text style={styles.summaryTotalValue}>{calculateTotal()} USDT</Text>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            style={[
              styles.tradeButton,
              type === 'buy' ? styles.buyButton : styles.sellButton,
              (!amount || !selectedPayment) && styles.tradeButtonDisabled
            ]}
            disabled={!amount || !selectedPayment}
            onPress={() => {
              // Handle trade submission
              navigation.navigate('TradeConfirmation', { 
                merchant, 
                type, 
                amount, 
                paymentMethod: selectedPayment,
                total: calculateTotal()
              });
            }}
          >
            <Text style={styles.tradeButtonText}>
              {type === 'buy' ? 'Buy' : 'Sell'} USDT
            </Text>
          </TouchableOpacity>
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
  
  headerTitle: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  
  merchantInfo: {
    backgroundColor: Colors.bgCard,
    margin: Layout.spacing.lg,
    padding: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
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
  
  priceInfo: {
    alignItems: 'flex-end',
  },
  
  priceAmount: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.colorBuy,
  },
  
  priceLabel: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textMuted,
  },
  
  tradeForm: {
    margin: Layout.spacing.lg,
    marginTop: 0,
  },
  
  inputSection: {
    marginBottom: Layout.spacing.xl,
  },
  
  inputLabel: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.sm,
  },
  
  inputContainer: {
    backgroundColor: Colors.bgCard,
    borderRadius: Layout.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    paddingHorizontal: Layout.spacing.lg,
  },
  
  amountInput: {
    flex: 1,
    fontSize: Typography.fontSizes.lg,
    color: Colors.textPrimary,
    paddingVertical: Layout.spacing.lg,
  },
  
  currencyLabel: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
  },
  
  helperText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textMuted,
    marginTop: Layout.spacing.xs,
  },
  
  receiveContainer: {
    backgroundColor: Colors.bgElevated,
    borderRadius: Layout.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  
  receiveAmount: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.colorBuy,
  },
  
  receiveCurrency: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
  },
  
  paymentMethod: {
    backgroundColor: Colors.bgCard,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  paymentMethodSelected: {
    backgroundColor: Colors.colorBuy,
    borderColor: Colors.colorBuy,
  },
  
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  paymentInfo: {
    marginLeft: Layout.spacing.md,
  },
  
  paymentName: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textPrimary,
  },
  
  paymentNameSelected: {
    color: Colors.white,
  },
  
  paymentFee: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  
  paymentFeeSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  radioButtonSelected: {
    borderColor: Colors.white,
  },
  
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.white,
  },
  
  tradeSummary: {
    backgroundColor: Colors.bgCard,
    borderRadius: Layout.borderRadius.xl,
    padding: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginBottom: Layout.spacing.xl,
  },
  
  summaryTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.lg,
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  
  summaryLabel: {
    fontSize: Typography.fontSizes.md,
    color: Colors.textSecondary,
  },
  
  summaryValue: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textPrimary,
  },
  
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
    paddingTop: Layout.spacing.md,
    marginTop: Layout.spacing.md,
    marginBottom: 0,
  },
  
  summaryTotalLabel: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  
  summaryTotalValue: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.colorBuy,
  },
  
  tradeButton: {
    borderRadius: Layout.borderRadius.md,
    paddingVertical: Layout.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buyButton: {
    backgroundColor: Colors.colorBuy,
  },
  
  sellButton: {
    backgroundColor: Colors.colorSell,
  },
  
  tradeButtonDisabled: {
    backgroundColor: Colors.bgElevated,
  },
  
  tradeButtonText: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.white,
  },
});

export default TradeScreen;
