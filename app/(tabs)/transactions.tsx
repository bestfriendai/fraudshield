import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { colors, spacing, radius, fontSize, fontWeight } from '@/src/ui/theme';
import { useAppStore } from '@/src/store/useAppStore';

interface TransactionViewModel {
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
  const transactions = useAppStore((state) => state.transactions);

  const transactionList: TransactionViewModel[] = transactions.map((tx) => ({
    ...tx,
    time: 'N/A',
    category: tx.risk === 'high' ? 'Transfer' : 'Purchase',
    icon: tx.risk === 'high' ? '⚠️' : tx.risk === 'medium' ? '⏳' : '💳',
    pending: tx.risk === 'medium',
  }));

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return colors.semantic.error;
      case 'medium': return colors.semantic.warning;
      default: return colors.semantic.success;
    }
  };

  const filteredTransactions = transactionList.filter(tx => {
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

  const renderTransaction = ({ item }: { item: TransactionViewModel }) => (
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
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>{transactionList.length} total transactions</Text>
      </View>

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

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.md },
  title: { fontSize: fontSize.largeTitle, fontWeight: fontWeight.bold, color: colors.text },
  subtitle: { fontSize: fontSize.subhead, color: colors.textSecondary, marginTop: 2 },
  searchContainer: { paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  searchIcon: { fontSize: 16, marginRight: spacing.sm },
  searchInput: { flex: 1, fontSize: fontSize.body, color: colors.text },
  filterContainer: { flexDirection: 'row', paddingHorizontal: spacing.lg, marginBottom: spacing.lg, gap: spacing.sm },
  filterButton: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.full, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  filterButtonActive: { backgroundColor: colors.brand.primary, borderColor: colors.brand.primary },
  filterText: { fontSize: fontSize.subhead, fontWeight: fontWeight.medium, color: colors.textSecondary },
  filterTextActive: { color: '#FFFFFF' },
  listContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl },
  transactionItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, backgroundColor: colors.background, borderRadius: radius.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  transactionIcon: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center' },
  transactionIconText: { fontSize: 22 },
  transactionDetails: { flex: 1, marginLeft: spacing.md },
  transactionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  transactionMerchant: { fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: colors.text },
  transactionAmount: { fontSize: fontSize.body, fontWeight: fontWeight.bold, color: colors.text },
  transactionBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xs },
  transactionMeta: { fontSize: fontSize.caption, color: colors.textSecondary },
  riskBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.sm },
  riskText: { fontSize: 10, fontWeight: fontWeight.bold },
});