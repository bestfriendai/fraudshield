import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { colors, spacing, radius, fontSize, fontWeight, shadow } from '@/src/ui/theme';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  savings?: string;
  features: string[];
  popular?: boolean;
}

export default function PaywallScreen({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const plans: Plan[] = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$4.99',
      period: 'month',
      features: [
        'Real-time fraud monitoring',
        'Unlimited bank accounts',
        'Advanced threat detection',
        '24/7 priority support',
        'Dark web monitoring',
      ],
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: '$39.99',
      period: 'year',
      savings: 'Save 33%',
      popular: true,
      features: [
        'Everything in Monthly',
        'Credit score tracking',
        'Identity theft insurance',
        'Family coverage (up to 5)',
        'Early fraud warnings',
        'Priority 24/7 support',
      ],
    },
  ];

  const handleSubscribe = () => {
    // In production: Call RevenueCat purchase
    console.log('Subscribe to:', selectedPlan);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⭐ PREMIUM</Text>
            </View>
          </View>

          {/* Hero */}
          <View style={styles.hero}>
            <Text style={styles.heroIcon}>🛡️</Text>
            <Text style={styles.heroTitle}>Upgrade to Premium</Text>
            <Text style={styles.heroSubtitle}>
              Get advanced fraud protection for all your accounts
            </Text>
          </View>

          {/* Plans */}
          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && styles.planCardSelected,
                  plan.popular && styles.planCardPopular,
                ]}
                onPress={() => setSelectedPlan(plan.id as 'monthly' | 'yearly')}
                activeOpacity={0.8}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>BEST VALUE</Text>
                  </View>
                )}
                {plan.savings && (
                  <View style={styles.savingsBadge}>
                    <Text style={styles.savingsBadgeText}>{plan.savings}</Text>
                  </View>
                )}
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <View style={styles.planPriceRow}>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                    <Text style={styles.planPeriod}>/{plan.period}</Text>
                  </View>
                </View>
                <View style={styles.planFeatures}>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                      <Text style={styles.featureCheck}>✓</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                <View style={[
                  styles.radioOuter,
                  selectedPlan === plan.id && styles.radioOuterSelected,
                ]}>
                  <View style={[
                    styles.radioInner,
                    selectedPlan === plan.id && styles.radioInnerSelected,
                  ]} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Subscribe Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe} activeOpacity={0.8}>
              <Text style={styles.subscribeButtonText}>
                Start 7-Day Free Trial
              </Text>
            </TouchableOpacity>
            <Text style={styles.trialNote}>
              Cancel anytime. No charges for 7 days.
            </Text>
          </View>

          {/* Terms */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
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
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  closeIcon: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  badge: {
    backgroundColor: colors.brand.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
  },
  heroIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  heroTitle: {
    fontSize: fontSize.largeTitle,
    fontWeight: fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 24,
  },
  plansContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  planCard: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 2,
    borderColor: colors.border,
    position: 'relative',
  },
  planCardSelected: {
    borderColor: colors.brand.primary,
  },
  planCardPopular: {
    borderColor: colors.brand.primary,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: spacing.xl,
    backgroundColor: colors.brand.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  popularBadgeText: {
    fontSize: 10,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  savingsBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.semantic.success + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  savingsBadgeText: {
    fontSize: 11,
    fontWeight: fontWeight.bold,
    color: colors.semantic.success,
  },
  planHeader: {
    marginBottom: spacing.lg,
  },
  planName: {
    fontSize: fontSize.headline,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  planPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontSize: 36,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  planPeriod: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  planFeatures: {
    gap: spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureCheck: {
    fontSize: 14,
    color: colors.semantic.success,
    marginRight: spacing.sm,
    fontWeight: fontWeight.bold,
  },
  featureText: {
    fontSize: fontSize.subhead,
    color: colors.text,
    flex: 1,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutral[300],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: spacing.xl,
    right: spacing.xl,
  },
  radioOuterSelected: {
    borderColor: colors.brand.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  radioInnerSelected: {
    backgroundColor: colors.brand.primary,
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  subscribeButton: {
    backgroundColor: colors.brand.primary,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
  },
  trialNote: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  termsContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  termsText: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
