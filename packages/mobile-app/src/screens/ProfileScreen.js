import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Text from '../components/Text';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = React.useState(false);

  const menuItems = [
    {
      section: 'Account',
      items: [
        { icon: 'person-outline', label: 'Personal Information', onPress: () => {} },
        { icon: 'shield-checkmark-outline', label: 'Security Settings', onPress: () => {} },
        { icon: 'card-outline', label: 'Payment Methods', onPress: () => {} },
        { icon: 'document-text-outline', label: 'KYC Verification', badge: 'Pending', onPress: () => {} },
      ],
    },
    {
      section: 'Trading',
      items: [
        { icon: 'trending-up-outline', label: 'Trade History', onPress: () => {} },
        { icon: 'star-outline', label: 'My Ads', onPress: () => {} },
        { icon: 'people-outline', label: 'Trusted Merchants', onPress: () => {} },
      ],
    },
    {
      section: 'Settings',
      items: [
        { 
          icon: 'notifications-outline', 
          label: 'Push Notifications', 
          toggle: true,
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        { 
          icon: 'finger-print-outline', 
          label: 'Biometric Login', 
          toggle: true,
          value: biometricsEnabled,
          onToggle: setBiometricsEnabled,
        },
        { icon: 'globe-outline', label: 'Language', value: 'English', onPress: () => {} },
        { icon: 'moon-outline', label: 'Theme', value: 'Dark', onPress: () => {} },
      ],
    },
    {
      section: 'Support',
      items: [
        { icon: 'help-circle-outline', label: 'Help Center', onPress: () => {} },
        { icon: 'chatbubbles-outline', label: 'Live Chat', onPress: () => {} },
        { icon: 'information-circle-outline', label: 'About', onPress: () => {} },
        { icon: 'document-outline', label: 'Terms & Privacy', onPress: () => {} },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <Card style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color={Colors.white} />
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john.doe@example.com</Text>
              <View style={styles.verificationBadge}>
                <Ionicons name="checkmark-circle" size={14} color={Colors.colorBuy} />
                <Text style={styles.verificationText}>Verified</Text>
              </View>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Trades</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>98.5%</Text>
              <Text style={styles.statLabel}>Completion</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </Card>

        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <Card style={styles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <Pressable
                  key={itemIndex}
                  onPress={item.onPress}
                  style={[
                    styles.menuItem,
                    itemIndex < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                >
                  <View style={styles.menuItemLeft}>
                    <Ionicons name={item.icon} size={20} color={Colors.textSecondary} />
                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                    {item.badge && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                  </View>
                  {item.toggle ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: Colors.bgTertiary, true: Colors.colorBuy }}
                      thumbColor={Colors.white}
                    />
                  ) : item.value ? (
                    <View style={styles.menuItemRight}>
                      <Text style={styles.menuItemValue}>{item.value}</Text>
                      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                    </View>
                  ) : (
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  )}
                </Pressable>
              ))}
            </Card>
          </View>
        ))}

        <Pressable style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
          <Ionicons name="log-out-outline" size={20} color={Colors.colorSell} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  content: {
    paddingBottom: Spacing.xxxl,
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
  profileCard: {
    margin: Spacing.lg,
    padding: Spacing.lg,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.colorBuy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verificationText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.colorBuy,
    fontWeight: Typography.fontWeights.medium,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.borderColor,
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    marginHorizontal: Spacing.lg,
    textTransform: 'uppercase',
  },
  menuCard: {
    marginHorizontal: Spacing.lg,
    paddingVertical: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  menuItemLabel: {
    fontSize: Typography.fontSizes.md,
    color: Colors.textPrimary,
    flex: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  menuItemValue: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
  },
  badge: {
    backgroundColor: Colors.colorWarning,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.white,
    fontWeight: Typography.fontWeights.semibold,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    backgroundColor: Colors.colorSell + '10',
  },
  logoutText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.colorSell,
  },
  version: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
});

export default ProfileScreen;