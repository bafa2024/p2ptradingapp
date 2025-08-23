import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/Text';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const OrdersScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  
  const orders = {
    active: [
      {
        id: '1',
        type: 'buy',
        amount: '100.00',
        coin: 'USDT',
        price: '1.01',
        status: 'pending',
        time: '2 mins ago',
        merchant: 'FastTrade',
      },
      {
        id: '2',
        type: 'sell',
        amount: '250.00',
        coin: 'USDC',
        price: '0.99',
        status: 'processing',
        time: '5 mins ago',
        merchant: 'CryptoExpress',
      },
    ],
    completed: [
      {
        id: '3',
        type: 'buy',
        amount: '500.00',
        coin: 'USDT',
        price: '1.00',
        status: 'completed',
        time: '2 hours ago',
        merchant: 'QuickBuy',
      },
      {
        id: '4',
        type: 'sell',
        amount: '1000.00',
        coin: 'USDT',
        price: '1.02',
        status: 'completed',
        time: 'Yesterday',
        merchant: 'TradePro',
      },
    ],
    cancelled: [],
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return Colors.colorWarning;
      case 'processing': return Colors.colorInfo;
      case 'completed': return Colors.colorBuy;
      case 'cancelled': return Colors.colorSell;
      default: return Colors.textMuted;
    }
  };

  const currentOrders = orders[activeTab] || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
      </View>
      
      <View style={styles.tabs}>
        {['active', 'completed', 'cancelled'].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.colorBuy} />
        }
      >
        {currentOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No {activeTab} orders</Text>
            <Text style={styles.emptySubtext}>Your {activeTab} orders will appear here</Text>
          </View>
        ) : (
          currentOrders.map((order) => (
            <Card key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={styles.orderTypeContainer}>
                  <Text style={[
                    styles.orderType,
                    { color: order.type === 'buy' ? Colors.colorBuy : Colors.colorSell }
                  ]}>
                    {order.type.toUpperCase()}
                  </Text>
                  <Text style={styles.orderCoin}>{order.coin}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.orderDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Amount</Text>
                  <Text style={styles.detailValue}>{order.amount} {order.coin}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Price</Text>
                  <Text style={styles.detailValue}>${order.price}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Total</Text>
                  <Text style={styles.detailValue}>
                    ${(parseFloat(order.amount) * parseFloat(order.price)).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Merchant</Text>
                  <Text style={styles.detailValue}>{order.merchant}</Text>
                </View>
              </View>
              
              <View style={styles.orderFooter}>
                <Text style={styles.orderTime}>{order.time}</Text>
                {activeTab === 'active' && (
                  <Pressable style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View Details</Text>
                  </Pressable>
                )}
              </View>
            </Card>
          ))
        )}
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
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.white,
  },
  content: {
    padding: Spacing.lg,
  },
  orderCard: {
    marginBottom: Spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  orderTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  orderType: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
  },
  orderCoin: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold,
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
    paddingTop: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  detailLabel: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textPrimary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
  },
  orderTime: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
  },
  viewButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 4,
    backgroundColor: Colors.colorBuy + '20',
  },
  viewButtonText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.colorBuy,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyText: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textMuted,
  },
});

export default OrdersScreen;