import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { colors, spacing, radius, fontSize, fontWeight, shadow } from '@/src/ui/theme';
import { useAppStore } from '@/src/store/useAppStore';

interface AlertSummary {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  count: number;
  color: string;
}

export default function DashboardScreen() {
  const [protectionActive] = useState(true);
  const transactions = useAppStore((state) => state.transactions);

  const highRiskCount = transactions.filter((tx) => tx.risk === 'high').length;
  const mediumRiskCount = transactions.filter((tx) => tx.risk === 'medium').length;
  const lowRiskCount = transactions.filter((tx) => tx.risk === 'low').length;

  const alertSummaries: AlertSummary[] = [
    { id: '1', title: 'High Risk', subtitle: 'Needs attention', icon: '🔴', count: highRiskCount, color: colors.semantic.error },
    { id: '2', title: 'Medium Risk', subtitle: 'Review suggested', icon: '🟡', count: mediumRiskCount, color: colors.semantic.warning },
    { id: '3', title: 'Low Risk', subtitle: 'Auto-approved', icon: '🟢', count: lowRiskCount, color: colors.semantic.success },
  ];

  const recentTransactions = transactions.slice(0, 4).map((tx) => ({
    ...tx,
    icon: tx.risk === 'high' ? '⚠️' : tx.risk === 'medium' ? '⏳' : '✅',
    date: tx.date,
  }));

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return colors.semantic.error;
      case 'medium': return colors.semantic.warning;
      default: return colors.semantic.success;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>FraudShield</Text>
            <Text style={styles.subtitle}>Your financial guardian</Text>
          </View>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🛡</Text>
          </View>
        </View>

        <View style={styles.protectionCard}>
          <View style={styles.protectionHeader}>
            <View style={styles.protectionStatus}>
              <View style={[styles.statusDot, { backgroundColor: protectionActive ? colors.semantic.success : colors.semantic.error }]} />
              <Text style={styles.statusText}>{protectionActive ? 'Protection Active' : 'Protection Off'}</Text>
            </View>
            <Text style={styles.protectionScore}>Score: 94/100</Text>
          </View>
          <View style={styles.protectionBar}>
            <View style={[styles.protectionProgress, { width: '94%' }]} />
          </View>
          <Text style={styles.protectionSubtext}>All accounts monitored in real-time</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{transactions.length}</Text>
            <Text style={styles.statLabel}>Transactions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{highRiskCount}</Text>
            <Text style={styles.statLabel}>High Risk</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{mediumRiskCount + lowRiskCount}</Text>
            <Text style={styles.statLabel}>Reviewed</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Overview</Text>
          <View style={styles.alertGrid}>
            {alertSummaries.map((item) => (
              <TouchableOpacity key={item.id} style={styles.alertCard} activeOpacity={0.7}>
                <View style={styles.alertCardHeader}>
                  <Text style={styles.alertIcon}>{item.icon}</Text>
                  <View style={[styles.alertBadge, { backgroundColor: item.color }]}>
                    <Text style={styles.alertBadgeText}>{item.count}</Text>
                  </View>
                </View>
                <Text style={styles.alertTitle}>{item.title}</Text>
                <Text style={styles.alertSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionList}>
            {recentTransactions.map((tx) => (
              <View key={tx.id} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.transactionIconText}>{tx.icon}</Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionMerchant}>{tx.merchant}</Text>
                  <Text style={styles.transactionDate}>{tx.date}</Text>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={styles.transactionAmount}>{tx.amount}</Text>
                  <View style={[styles.riskBadge, { backgroundColor: getRiskColor(tx.risk) + '20' }]}>
                    <Text style={[styles.riskText, { color: getRiskColor(tx.risk) }]}>{tx.risk.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.addAccountButton} activeOpacity={0.8}>
          <Text style={styles.addAccountIcon}>+</Text>
          <Text style={styles.addAccountText}>Add Account to Monitor</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  greeting: {
    fontSize: fontSize.largeTitle,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.subhead,
    color: colors.textSecondary,
    marginTop: 2,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 24,
  },
  protectionCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.neutral[900],
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadow.lg,
  },
  protectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  protectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
  },
  protectionScore: {
    color: colors.brand.primaryLight,
    fontSize: fontSize.subhead,
    fontWeight: fontWeight.medium,
  },
  protectionBar: {
    height: 6,
    backgroundColor: colors.neutral[700],
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  protectionProgress: {
    height: '100%',
    backgroundColor: colors.brand.primary,
    borderRadius: 3,
  },
  protectionSubtext: {
    color: colors.neutral[400],
    fontSize: fontSize.caption,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: fontSize.headline,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  statLabel: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.headline,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  seeAll: {
    fontSize: fontSize.subhead,
    color: colors.brand.primary,
    fontWeight: fontWeight.medium,
  },
  alertGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  alertCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  alertCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  alertIcon: {
    fontSize: 20,
  },
  alertBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  alertBadgeText: {
    fontSize: 12,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
  },
  alertTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginTop: spacing.xs,
  },
  alertSubtitle: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  transactionList: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionIconText: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  transactionMerchant: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  transactionDate: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.sm,
    marginTop: 4,
  },
  riskText: {
    fontSize: 10,
    fontWeight: fontWeight.bold,
  },
  addAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    padding: spacing.lg,
    backgroundColor: colors.brand.primary,
    borderRadius: radius.md,
    gap: spacing.sm,
  },
  addAccountIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: fontWeight.bold,
  },
  addAccountText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: '#FFFFFF',
  },
  bottomSpacer: {
    height: spacing.xxxl,
  },
});