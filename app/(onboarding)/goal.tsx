import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GradientBackground } from '../../components/ui/GradientBackground';
import { Button } from '../../components/ui/Button';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { GoalResultCard } from '../../components/onboarding/GoalResultCard';
import { useHydrationStore } from '../../store/hydrationStore';
import { goalFromWeightKg } from '../../utils/calculations';
import { requestNotificationPermissions, scheduleHydrationNotifications } from '../../utils/notifications';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { fs, imageSize } from '../../utils/responsive';

export default function GoalScreen() {
  const insets = useSafeAreaInsets();
  const { user, saveUser, settings } = useHydrationStore();

  const weightKg = user?.weightKg ?? 70;
  const weightUnit = user?.weightUnit ?? 'kg';
  const goalMl = goalFromWeightKg(weightKg);

  const handleStart = async () => {
    saveUser({ dailyGoalMl: goalMl, onboardingComplete: true });

    // Request notification permissions and schedule
    const granted = await requestNotificationPermissions();
    if (granted) {
      await scheduleHydrationNotifications(settings.notifications);
    }

    router.replace('/(tabs)');
  };

  const features = [
    { icon: '💧', label: 'Stay Hydrated' },
    { icon: '🔔', label: 'Smart Reminders' },
    { icon: '📊', label: 'Track Progress' },
  ];

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
          <StepIndicator currentStep={4} totalSteps={4} style={styles.steps} />

          <Image
            source={require('../../assets/mascot-drinking.png')}
            style={styles.mascotImage}
            resizeMode="contain"
          />

          <Text style={styles.title}>Your Daily Water Goal</Text>
          <Text style={styles.subtitle}>Based on your weight, here's what we recommend:</Text>

          <GoalResultCard weightKg={weightKg} goalMl={goalMl} weightUnit={weightUnit} />

          <View style={styles.featuresRow}>
            {features.map((f) => (
              <View key={f.label} style={styles.feature}>
                <Text style={styles.featureIcon}>{f.icon}</Text>
                <Text style={styles.featureLabel}>{f.label}</Text>
              </View>
            ))}
          </View>

          <Button label="Let's Start Hydrating! 💧" onPress={handleStart} style={styles.cta} />

          <Text style={styles.note}>You can change these later in Settings</Text>
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
  steps: { marginBottom: Spacing.lg, alignSelf: 'stretch' },
  mascot: { marginBottom: Spacing.md },
  mascotImage: {
    ...imageSize(250, 300),
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: fs(26),
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: fs(14),
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  feature: { alignItems: 'center', gap: 6, flex: 1 },
  featureIcon: { fontSize: fs(28) },
  featureLabel: { fontSize: fs(12), fontWeight: '600', color: Colors.textSecondary, textAlign: 'center' },
  cta: { width: '100%', marginBottom: Spacing.md },
  note: { fontSize: fs(12), color: Colors.textTertiary, textAlign: 'center' },
});
