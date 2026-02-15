import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { colors, spacing, radius, fontSize, fontWeight } from '@/src/ui/theme';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
}

export default function SettingsScreen() {
  const [protectionEnabled, setProtectionEnabled] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [biometricLock, setBiometricLock] = useState(false);
  const [locationTracking, setLocationTracking] = useState(false);

  const accountSettings: SettingItem[] = [
    { id: '1', title: 'Personal Information', subtitle: 'Name, email, phone', icon: '👤', type: 'navigation' },
    { id: '2', title: 'Linked Accounts', subtitle: '3 banks connected', icon: '🏦', type: 'navigation' },
    { id: '3', title: 'Security', subtitle: 'Password, 2FA', icon: '🔐', type: 'navigation' },
  ];

  const notificationSettings: SettingItem[] = [
    { id: '4', title: 'Push Notifications', subtitle: 'Real-time alerts', icon: '🔔', type: 'toggle', value: pushNotifications },
    { id: '5', title: 'Email Alerts', subtitle: 'Daily digest', icon: '📧', type: 'toggle', value: emailAlerts },
  ];

  const privacySettings: SettingItem[] = [
    { id: '6', title: 'Biometric Lock', subtitle: 'Face ID / Touch ID', icon: '👆', type: 'toggle', value: biometricLock },
    { id: '7', title: 'Location Tracking', subtitle: 'For transaction verification', icon: '📍', type: 'toggle', value: locationTracking },
  ];

  const protectionSettings: SettingItem[] = [
    { id: '8', title: 'Real-time Monitoring', subtitle: '24/7 fraud detection', icon: '🛡️', type: 'toggle', value: protectionEnabled },
    { id: '9', title: 'Credit Score Monitoring', subtitle: 'Weekly updates', icon: '📊', type: 'navigation' },
    { id: '10', title: 'Dark Web Scan', subtitle: 'Check for leaked data', icon: '🌐', type: 'action' },
  ];

  const handleToggle = (id: string, value: boolean) => {
    switch (id) {
      case '4': setPushNotifications(value); break;
      case '5': setEmailAlerts(value); break;
      case '6': setBiometricLock(value); break;
      case '7': setLocationTracking(value); break;
      case '8': setProtectionEnabled(value); break;
    }
  };

  const handleAction = (title: string) => {
    if (title === 'Dark Web Scan') {
      Alert.alert('Dark Web Scan', 'Scanning for compromised credentials...');
    }
  };

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      activeOpacity={item.type === 'toggle' ? 1 : 0.7}
      onPress={() => item.type === 'navigation' && Alert.alert(item.title, 'Navigate to settings')}
    >
      <View style={styles.settingIcon}>
        <Text style={styles.settingIconText}>{item.icon}</Text>
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        {item.subtitle && <Text style={styles.settingSubtitle}>{item.subtitle}</Text>}
      </View>
      {item.type === 'toggle' && (
        <Switch
          value={item.value}
          onValueChange={(val) => handleToggle(item.id, val)}
          trackColor={{ false: colors.neutral[300], true: colors.brand.primary }}
          thumbColor="#FFFFFF"
        />
      )}
      {item.type === 'navigation' && (
        <Text style={styles.chevron}>›</Text>
      )}
      {item.type === 'action' && (
        <TouchableOpacity style={styles.actionButton} onPress={() => handleAction(item.title)}>
          <Text style={styles.actionButtonText}>Run</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            {accountSettings.map(renderSettingItem)}
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionContent}>
            {notificationSettings.map(renderSettingItem)}
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.sectionContent}>
            {privacySettings.map(renderSettingItem)}
          </View>
        </View>

        {/* Protection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fraud Protection</Text>
          <View style={styles.sectionContent}>
            {protectionSettings.map(renderSettingItem)}
          </View>
        </View>

        {/* Premium Upgrade */}
        <TouchableOpacity style={styles.premiumCard} activeOpacity={0.8}>
          <View style={styles.premiumContent}>
            <View style={styles.premiumIcon}>
              <Text style={styles.premiumIconText}>⭐</Text>
            </View>
            <View style={styles.premiumText}>
              <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
              <Text style={styles.premiumSubtitle}>Advanced fraud detection + unlimited accounts</Text>
            </View>
          </View>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>$4.99/mo</Text>
          </View>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>FraudShield v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2026 FraudShield Inc.</Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSize.largeTitle,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.footnote,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  sectionContent: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingIconText: {
    fontSize: 18,
  },
  settingContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  settingTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  settingSubtitle: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: colors.neutral[300],
    fontWeight: fontWeight.medium,
  },
  actionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.brand.primary,
    borderRadius: radius.sm,
  },
  actionButtonText: {
    fontSize: fontSize.subhead,
    fontWeight: fontWeight.medium,
    color: '#FFFFFF',
  },
  premiumCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.neutral[900],
    borderRadius: radius.lg,
    padding: spacing.xl,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumIconText: {
    fontSize: 24,
  },
  premiumText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  premiumTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
  },
  premiumSubtitle: {
    fontSize: fontSize.caption,
    color: colors.neutral[400],
    marginTop: 2,
  },
  premiumBadge: {
    marginTop: spacing.lg,
    alignSelf: 'flex-start',
    backgroundColor: colors.brand.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  premiumBadgeText: {
    fontSize: fontSize.subhead,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
  },
  appInfo: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  appVersion: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
  },
  appCopyright: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  bottomSpacer: {
    height: spacing.xxxl,
  },
});
