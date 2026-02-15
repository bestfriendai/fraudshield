import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { colors, spacing, radius, fontSize, fontWeight } from '@/src/ui/theme';

interface Alert {
  id: string;
  type: 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  timestamp: string;
  account: string;
  amount?: string;
  actionTaken: boolean;
  icon: string;
}

export default function AlertsScreen() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'high',
      title: 'Unusual Transfer Detected',
      description: 'A transfer of $299 was initiated from your account to an unknown recipient. This transaction was blocked.',
      timestamp: 'Feb 14, 2026 at 11:48 PM',
      account: 'Chase Checking ****4521',
      amount: '$299.00',
      actionTaken: true,
      icon: '🚨',
    },
    {
      id: '2',
      type: 'high',
      title: 'Multiple Failed Login Attempts',
      description: 'We detected 5 failed login attempts on your account from an unrecognized device.',
      timestamp: 'Feb 14, 2026 at 9:15 PM',
      account: 'All Accounts',
      actionTaken: true,
      icon: '🔒',
    },
    {
      id: '3',
      type: 'medium',
      title: 'Pending Transaction Review',
      description: 'A $250 transfer is pending your review. This transaction was flagged as medium risk due to unusual timing.',
      timestamp: 'Feb 13, 2026 at 1:15 PM',
      account: 'Bank of America ****8832',
      amount: '$250.00',
      actionTaken: false,
      icon: '⏳',
    },
    {
      id: '4',
      type: 'medium',
      title: 'New Device Added',
      description: 'A new device was added to your account. If this wasn\'t you, please review immediately.',
      timestamp: 'Feb 12, 2026 at 3:45 PM',
      account: 'Fidelity ****2291',
      actionTaken: false,
      icon: '📱',
    },
    {
      id: '5',
      type: 'low',
      title: 'Subscription Reminder',
      description: 'Netflix subscription will renew tomorrow for $15.99.',
      timestamp: 'Feb 12, 2026 at 10:00 AM',
      account: 'Chase Credit ****9988',
      amount: '$15.99',
      actionTaken: false,
      icon: '💳',
    },
    {
      id: '6',
      type: 'low',
      title: 'Weekly Spending Summary',
      description: 'You spent $347.82 this week across 12 transactions. 2 were flagged as potential fraud.',
      timestamp: 'Feb 11, 2026 at 6:00 PM',
      account: 'All Accounts',
      actionTaken: true,
      icon: '📊',
    },
    {
      id: '7',
      type: 'info',
      title: 'Protection Score Updated',
      description: 'Your fraud protection score has improved to 94/100. Great job!',
      timestamp: 'Feb 10, 2026 at 12:00 PM',
      account: 'All Accounts',
      actionTaken: true,
      icon: '✅',
    },
    {
      id: '8',
      type: 'high',
      title: 'Large Withdrawal Alert',
      description: 'A withdrawal of $1,500 was detected. This transaction has been temporarily held for review.',
      timestamp: 'Feb 10, 2026 at 3:33 AM',
      account: 'Chase Savings ****3344',
      amount: '$1,500.00',
      actionTaken: true,
      icon: '⚠️',
    },
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'high': return colors.semantic.error;
      case 'medium': return colors.semantic.warning;
      case 'low': return colors.semantic.success;
      default: return colors.semantic.info;
    }
  };

  const getAlertBgColor = (type: string) => {
    switch (type) {
      case 'high': return colors.semantic.error + '10';
      case 'medium': return colors.semantic.warning + '10';
      case 'low': return colors.semantic.success + '10';
      default: return colors.semantic.info + '10';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'unread') return !alert.actionTaken;
    return true;
  });

  const unreadCount = alerts.filter(a => !a.actionTaken).length;

  const renderAlert = ({ item }: { item: Alert }) => (
    <TouchableOpacity 
      style={[styles.alertCard, { borderLeftColor: getAlertColor(item.type) }]} 
      activeOpacity={0.7}
    >
      <View style={styles.alertHeader}>
        <View style={[styles.alertIconContainer, { backgroundColor: getAlertBgColor(item.type) }]}>
          <Text style={styles.alertIcon}>{item.icon}</Text>
        </View>
        <View style={styles.alertBadge}>
          <View style={[styles.alertTypeDot, { backgroundColor: getAlertColor(item.type) }]} />
          <Text style={[styles.alertType, { color: getAlertColor(item.type) }]}>
            {item.type.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertDescription}>{item.description}</Text>
      <View style={styles.alertMeta}>
        <Text style={styles.alertAccount}>{item.account}</Text>
        {item.amount && (
          <Text style={styles.alertAmount}>{item.amount}</Text>
        )}
      </View>
      <Text style={styles.alertTimestamp}>{item.timestamp}</Text>
      {!item.actionTaken && (
        <View style={styles.alertActions}>
          <TouchableOpacity style={styles.actionButtonPrimary} activeOpacity={0.7}>
            <Text style={styles.actionButtonPrimaryText}>Mark Safe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonDanger} activeOpacity={0.7}>
            <Text style={styles.actionButtonDangerText}>Report Fraud</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Alerts</Text>
          <Text style={styles.subtitle}>
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          </Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All ({alerts.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'unread' && styles.filterButtonActive]}
          onPress={() => setFilter('unread')}
        >
          <Text style={[styles.filterText, filter === 'unread' && styles.filterTextActive]}>
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Alert List */}
      <FlatList
        data={filteredAlerts}
        keyExtractor={(item) => item.id}
        renderItem={renderAlert}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyTitle}>No alerts</Text>
            <Text style={styles.emptySubtitle}>You're all caught up!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.largeTitle,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.subhead,
    color: colors.textSecondary,
    marginTop: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
  },
  filterText: {
    fontSize: fontSize.subhead,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  alertCard: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertIcon: {
    fontSize: 20,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertTypeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  alertType: {
    fontSize: 11,
    fontWeight: fontWeight.bold,
  },
  alertTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  alertDescription: {
    fontSize: fontSize.subhead,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  alertMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  alertAccount: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
  },
  alertAmount: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  alertTimestamp: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  alertActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  actionButtonPrimary: {
    flex: 1,
    paddingVertical: spacing.sm,
    backgroundColor: colors.semantic.success,
    borderRadius: radius.sm,
    alignItems: 'center',
  },
  actionButtonPrimaryText: {
    fontSize: fontSize.subhead,
    fontWeight: fontWeight.semibold,
    color: '#FFFFFF',
  },
  actionButtonDanger: {
    flex: 1,
    paddingVertical: spacing.sm,
    backgroundColor: colors.semantic.error,
    borderRadius: radius.sm,
    alignItems: 'center',
  },
  actionButtonDangerText: {
    fontSize: fontSize.subhead,
    fontWeight: fontWeight.semibold,
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: spacing.xxxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.headline,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  emptySubtitle: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
