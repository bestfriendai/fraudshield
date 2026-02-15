import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { colors, spacing, radius, fontSize, fontWeight } from '@/src/ui/theme';
import { useAppStore } from '@/src/store/useAppStore';

interface AlertViewModel {
  id: string;
  type: 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  timestamp: string;
  account: string;
  actionTaken: boolean;
  icon: string;
}

export default function AlertsScreen() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const alerts = useAppStore((state) => state.alerts);
  const markAlertRead = useAppStore((state) => state.markAlertRead);

  const alertList: AlertViewModel[] = alerts.map((alert) => ({
    id: alert.id,
    type: alert.type,
    title: alert.title,
    description: alert.description,
    timestamp: 'Recent',
    account: 'Linked account',
    actionTaken: alert.read,
    icon: alert.type === 'high' ? '🚨' : alert.type === 'medium' ? '⏳' : '✅',
  }));

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

  const filteredAlerts = alertList.filter(alert => (filter === 'unread' ? !alert.actionTaken : true));
  const unreadCount = alertList.filter(a => !a.actionTaken).length;

  const renderAlert = ({ item }: { item: AlertViewModel }) => (
    <TouchableOpacity style={[styles.alertCard, { borderLeftColor: getAlertColor(item.type) }]} activeOpacity={0.7}>
      <View style={styles.alertHeader}>
        <View style={[styles.alertIconContainer, { backgroundColor: getAlertBgColor(item.type) }]}>
          <Text style={styles.alertIcon}>{item.icon}</Text>
        </View>
        <View style={styles.alertBadge}>
          <View style={[styles.alertTypeDot, { backgroundColor: getAlertColor(item.type) }]} />
          <Text style={[styles.alertType, { color: getAlertColor(item.type) }]}>{item.type.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertDescription}>{item.description}</Text>
      <View style={styles.alertMeta}><Text style={styles.alertAccount}>{item.account}</Text></View>
      <Text style={styles.alertTimestamp}>{item.timestamp}</Text>
      {!item.actionTaken && (
        <View style={styles.alertActions}>
          <TouchableOpacity style={styles.actionButtonPrimary} activeOpacity={0.7} onPress={() => markAlertRead(item.id)}>
            <Text style={styles.actionButtonPrimaryText}>Mark Safe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonDanger} activeOpacity={0.7} onPress={() => markAlertRead(item.id)}>
            <Text style={styles.actionButtonDangerText}>Report Fraud</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Alerts</Text>
          <Text style={styles.subtitle}>{unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]} onPress={() => setFilter('all')}>
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>All ({alertList.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, filter === 'unread' && styles.filterButtonActive]} onPress={() => setFilter('unread')}>
          <Text style={[styles.filterText, filter === 'unread' && styles.filterTextActive]}>Unread ({unreadCount})</Text>
        </TouchableOpacity>
      </View>

      <FlatList data={filteredAlerts} keyExtractor={(item) => item.id} renderItem={renderAlert} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.md },
  title: { fontSize: fontSize.largeTitle, fontWeight: fontWeight.bold, color: colors.text },
  subtitle: { fontSize: fontSize.subhead, color: colors.textSecondary, marginTop: 2 },
  filterContainer: { flexDirection: 'row', paddingHorizontal: spacing.lg, marginBottom: spacing.lg, gap: spacing.sm },
  filterButton: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.full, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  filterButtonActive: { backgroundColor: colors.brand.primary, borderColor: colors.brand.primary },
  filterText: { fontSize: fontSize.subhead, fontWeight: fontWeight.medium, color: colors.textSecondary },
  filterTextActive: { color: '#FFFFFF' },
  listContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl },
  alertCard: { backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border, borderLeftWidth: 4 },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  alertIconContainer: { width: 40, height: 40, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center' },
  alertIcon: { fontSize: 20 },
  alertBadge: { flexDirection: 'row', alignItems: 'center' },
  alertTypeDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  alertType: { fontSize: 11, fontWeight: fontWeight.bold },
  alertTitle: { fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: colors.text, marginBottom: spacing.xs },
  alertDescription: { fontSize: fontSize.subhead, color: colors.textSecondary, lineHeight: 22 },
  alertMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  alertAccount: { fontSize: fontSize.caption, color: colors.textTertiary },
  alertTimestamp: { fontSize: fontSize.caption, color: colors.textTertiary, marginTop: spacing.xs },
  alertActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  actionButtonPrimary: { flex: 1, paddingVertical: spacing.sm, backgroundColor: colors.semantic.success, borderRadius: radius.sm, alignItems: 'center' },
  actionButtonPrimaryText: { fontSize: fontSize.subhead, fontWeight: fontWeight.semibold, color: '#FFFFFF' },
  actionButtonDanger: { flex: 1, paddingVertical: spacing.sm, backgroundColor: colors.semantic.error, borderRadius: radius.sm, alignItems: 'center' },
  actionButtonDangerText: { fontSize: fontSize.subhead, fontWeight: fontWeight.semibold, color: '#FFFFFF' },
});