import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { colors, spacing, radius, fontSize, fontWeight } from '@/src/ui/theme';

interface Transaction {
  id: string;
  merchant: string;
  amount: string;
  date: string;
  time: string;
  risk: 'low' | 'medium' | 'high';
  category: string;
  icon: string;
  pending: boolean;
}

export default function TransactionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const transactions: Transaction[] = [
    { id: '1', merchant: 'Amazon', amount: '$47.99', date: 'Feb 14', time: '10:32 AM', risk: 'low', category: 'Shopping', icon: '📦', pending: false },
    { id: '2', merchant: 'Netflix', amount: '$15.99', date: 'Feb 13', time: '2:15 PM', risk: 'low', category: 'Entertainment', icon: '🎬', pending: false },
    { id: '3', merchant: 'Unknown Source', amount: '$299.00', date: 'Feb 12', time: '11:48 PM', risk: 'high', category: 'Transfer', icon: '⚠️', pending: false },
    { id: '4', merchant: 'Uber', amount: '$24.50', date: 'Feb 11', time: '6:22 PM', risk: 'low', category: 'Transport', icon: '🚗', pending: false },
    { id: '5', merchant: 'Apple', amount: '$0.99', date: 'Feb 11', time: '9:00 AM', risk: 'low', category: 'Apps', icon: '🍎', pending: false },
    { id: '6', merchant: 'Suspicious Transfer', amount: '$1,500.00', date: 'Feb 10', time: '3:33 AM', risk: 'high', category: 'Transfer', icon: '🚨', pending: false },
    { id: '7', merchant: 'Starbucks', amount: '$6.45', date: 'Feb 10', time: '8:45 AM', risk: 'low', category: 'Food', icon: '☕', pending: false },
    { id: '8', merchant: 'Spotify', amount: '$9.99', date: 'Feb 09', time: '12:00 PM', risk: 'low', category: 'Entertainment', icon: '🎵', pending: false },
    { id: '9', merchant: 'Gas Station', amount: '$45.00', date: 'Feb 08', time: '5:30 PM', risk: 'low', category: 'Transport', icon: '⛽', pending: false },
    { id: '10', merchant: 'Pending Transfer', amount: '$250.00', date: 'Feb 08', time: '1:15 PM', risk: 'medium', category: 'Transfer', icon: '⏳', pending: true },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return colors.semantic.error;
      case 'medium': return colors.semantic.warning;
      default: return colors.semantic.success;
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || tx.risk === filter;
    return matchesSearch && matchesFilter;
  });

  const filterButtons: { key: 'all' | 'high' | 'medium' | 'low'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'high', label: 'High' },
    { key: 'medium', label: 'Medium' },
    { key: 'low', label: 'Low' },
  ];

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity style={styles.transactionItem} activeOpacity={0.7}>
      <View style={styles.transactionIcon}>
        <Text style={styles.transactionIconText}>{item.icon}</Text>
      </View>
      <View style={styles.transactionDetails}>
        <View style={styles.transactionTop}>
          <Text style={styles.transactionMerchant}>{item.merchant}</Text>
          <Text style={styles.transactionAmount}>{item.amount}</Text>
        </View>
        <View style={styles.transactionBottom}>
          <Text style={styles.transactionMeta}>{item.category} • {item.date} at {item.time}</Text>
          <View style={[styles.riskBadge, { backgroundColor: getRiskColor(item.risk) + '20' }]}>
            <Text style={[styles.riskText, { color: getRiskColor(item.risk) }]}>
              {item.pending ? 'PENDING' : item.risk.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>{transactions.length} total transactions</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {filterButtons.map((btn) => (
          <TouchableOpacity
            key={btn.key}
            style={[styles.filterButton, filter === btn.key && styles.filterButtonActive]}
            onPress={() => setFilter(btn.key)}
          >
            <Text style={[styles.filterText, filter === btn.key && styles.filterTextActive]}>
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No transactions found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search or filters</Text>
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.text,
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
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionIconText: {
    fontSize: 22,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  transactionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionMerchant: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  transactionAmount: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  transactionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  transactionMeta: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  riskText: {
    fontSize: 10,
    fontWeight: fontWeight.bold,
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
