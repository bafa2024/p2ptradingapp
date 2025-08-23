import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/Text';
import Card from '../components/Card';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const WalletScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  
  const balances = [
    { coin: 'USDT', balance: '0.00', network: 'TRC20', icon: '₮' },
    { coin: 'USDC', balance: '0.00', network: 'TRC20', icon: '$' },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wallet</Text>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.colorBuy} />
        }
      >
        <Card style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Balance</Text>
          <Text style={styles.totalAmount}>$0.00</Text>
          <Text style={styles.totalSubtext}>≈ 0.00 USDT</Text>
        </Card>

        <View style={styles.actions}>
          <Button 
            label="Deposit" 
            onPress={() => {}} 
            style={styles.actionButton}
          />
          <Button 
            label="Withdraw" 
            variant="outline" 
            onPress={() => {}} 
            style={styles.actionButton}
          />
        </View>

        <Text style={styles.sectionTitle}>Assets</Text>
        
        {balances.map((item, index) => (
          <Card key={index} style={styles.assetCard}>
            <View style={styles.assetRow}>
              <View style={styles.assetLeft}>
                <View style={styles.iconContainer}>
                  <Text style={styles.coinIcon}>{item.icon}</Text>
                </View>
                <View>
                  <Text style={styles.coinName}>{item.coin}</Text>
                  <Text style={styles.network}>{item.network}</Text>
                </View>
              </View>
              <View style={styles.assetRight}>
                <Text style={styles.balance}>{item.balance}</Text>
                <Text style={styles.balanceUsd}>≈ $0.00</Text>
              </View>
            </View>
          </Card>
        ))}

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>About TRC20 Network</Text>
          <Text style={styles.infoText}>
            • Fast transactions (3-5 seconds)
            • Low fees (~$1 per transaction)
            • Secure TRON blockchain
            • Perfect for P2P trading
          </Text>
        </Card>
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  title: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  content: {
    padding: Spacing.lg,
  },
  totalCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.bgSecondary,
  },
  totalLabel: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  totalAmount: {
    fontSize: Typography.fontSizes.xxxl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  totalSubtext: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textMuted,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  actionButton: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  assetCard: {
    marginBottom: Spacing.md,
  },
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bgTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinIcon: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.colorBuy,
  },
  coinName: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  network: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  balance: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  balanceUsd: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
  },
  infoCard: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.bgInfo,
  },
  infoTitle: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  infoText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.fontSizes.sm * 1.5,
  },
});

export default WalletScreen;