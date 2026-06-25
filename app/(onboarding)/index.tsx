import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GradientBackground } from '../../components/ui/GradientBackground';
import { Button } from '../../components/ui/Button';
import { FeatureCard } from '../../components/onboarding/FeatureCard';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <GradientBackground>
      <ScrollView
        style={styles.safe}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 8, paddingBottom: insets.bottom + Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
          {/* Logo */}
          <View style={styles.logoRow}>
            <Text style={styles.dropEmoji}>💧</Text>
            <Text style={styles.logoText}>Hydro</Text>
          </View>

          {/* Hero text */}
          <Text style={styles.title}>Stay Hydrated,{'\n'}Stay Healthy 💙</Text>
          <Text style={styles.subtitle}>
            Drink water, track your progress and feel your best every day.
          </Text>

          {/* Mascot */}
          <View style={styles.mascotContainer}>
            <Image
              source={require('../../assets/mascot-drinking.png')}
              style={styles.mascotImage}
              resizeMode="contain"
            />
          </View>

          {/* Feature cards */}
          <View style={styles.featureRow}>
            <FeatureCard icon="💧" title="Track Intake" subtitle="Log daily water" />
            <FeatureCard icon="🔔" title="Smart Reminders" subtitle="Never forget" />
            <FeatureCard icon="📊" title="See Progress" subtitle="Build streaks" />
          </View>

          {/* CTA */}
          <Button label="Get Started →" onPress={() => router.push('/(onboarding)/name')} style={styles.cta} />

          {/* Steps */}
          <StepIndicator currentStep={1} totalSteps={4} style={styles.steps} />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.md,
  },
  dropEmoji: { fontSize: 32 },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  mascotContainer: {
    marginBottom: Spacing.lg,
  },
  mascotImage: {
    width: 275,
    height: 325,
  },
  featureRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
    width: '100%',
  },
  cta: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  steps: {
    marginBottom: Spacing.sm,
  },
});
