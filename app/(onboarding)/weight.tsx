import React, { useState } from 'react';
import { fs } from '../../utils/responsive';

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GradientBackground } from '../../components/ui/GradientBackground';
import { Button } from '../../components/ui/Button';
import { Mascot } from '../../components/mascot/Mascot';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { WeightPicker } from '../../components/onboarding/WeightPicker';
import { Card } from '../../components/ui/Card';
import { useHydrationStore } from '../../store/hydrationStore';
import { lbToKg } from '../../utils/calculations';
import { Colors } from '../../constants/colors';
import { Spacing, BorderRadius } from '../../constants/spacing';

export default function WeightScreen() {
  const insets = useSafeAreaInsets();
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const [weight, setWeight] = useState(70);
  const saveUser = useHydrationStore((s) => s.saveUser);

  const handleContinue = () => {
    const weightKg = unit === 'kg' ? weight : lbToKg(weight);
    saveUser({ weightKg, weightUnit: unit });
    router.push('/(onboarding)/goal');
  };

  return (
    <GradientBackground>
      <ScrollView
        style={styles.safe}
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 8, paddingBottom: insets.bottom + Spacing.lg },
        ]}
        showsVerticalScrollIndicator={false}
      >
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <StepIndicator currentStep={3} totalSteps={4} style={styles.steps} />

          <Mascot character="droplet" pose="idle" size={90} style={styles.mascot} />

          <Text style={styles.title}>What's your weight?</Text>
          <Text style={styles.subtitle}>
            This helps us calculate your perfect daily water goal.
          </Text>

          {/* Unit Toggle */}
          <View style={styles.toggle}>
            {(['kg', 'lb'] as const).map((u) => (
              <TouchableOpacity
                key={u}
                style={[styles.toggleBtn, unit === u && styles.toggleActive]}
                onPress={() => {
                  setUnit(u);
                  setWeight(u === 'kg' ? 70 : 154);
                }}
              >
                <Text style={[styles.toggleText, unit === u && styles.toggleTextActive]}>
                  {u.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <WeightPicker value={weight} onChange={setWeight} unit={unit} />

          <Card style={styles.infoCard} padding={12} shadow="none">
            <Text style={styles.infoTitle}>💡 Why we ask this?</Text>
            <Text style={styles.infoText}>
              The general recommendation is to drink 33ml of water per kg of body weight daily.
            </Text>
          </Card>

          <Button label="Continue →" onPress={handleContinue} style={styles.cta} />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  back: { alignSelf: 'flex-start', marginBottom: Spacing.md },
  backText: { color: Colors.primary, fontSize: fs(16), fontWeight: '600' },
  steps: { marginBottom: Spacing.lg, alignSelf: 'stretch' },
  mascot: { marginBottom: Spacing.md },
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
  toggle: {
    flexDirection: 'row',
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.pill,
    padding: 4,
    marginBottom: Spacing.lg,
    gap: 4,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.pill,
  },
  toggleActive: { backgroundColor: Colors.primary },
  toggleText: { fontSize: fs(14), fontWeight: '600', color: Colors.textSecondary },
  toggleTextActive: { color: '#fff' },
  infoCard: {
    backgroundColor: `${Colors.primary}10`,
    borderWidth: 1,
    borderColor: `${Colors.primary}22`,
    width: '100%',
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  infoTitle: { fontSize: fs(13), fontWeight: '700', color: Colors.primaryDark, marginBottom: 4 },
  infoText: { fontSize: fs(12), color: Colors.textSecondary, lineHeight: fs(18) },
  cta: { width: '100%', marginTop: 'auto' },
});
