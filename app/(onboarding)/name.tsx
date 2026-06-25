import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GradientBackground } from '../../components/ui/GradientBackground';
import { Button } from '../../components/ui/Button';
import { Mascot } from '../../components/mascot/Mascot';
import { StepIndicator } from '../../components/onboarding/StepIndicator';
import { Card } from '../../components/ui/Card';
import { useHydrationStore } from '../../store/hydrationStore';
import { Colors } from '../../constants/colors';
import { Spacing, BorderRadius } from '../../constants/spacing';

export default function NameScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const saveUser = useHydrationStore((s) => s.saveUser);

  const handleContinue = () => {
    if (name.trim().length < 2) return;
    saveUser({ name: name.trim() });
    router.push('/(onboarding)/weight');
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.kav, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + Spacing.lg }]}
      >
          {/* Back */}
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <StepIndicator currentStep={2} totalSteps={4} style={styles.steps} />

          <View style={styles.content}>
            <Mascot character="droplet" pose="idle" size={100} style={styles.mascot} />

            <Text style={styles.title}>What should we{'\n'}call you?</Text>
            <Text style={styles.subtitle}>
              Enter your name to personalize your hydration journey.
            </Text>

            <View style={[styles.inputContainer, name.length > 0 && styles.inputFocused]}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={Colors.textTertiary}
                style={styles.input}
                autoCapitalize="words"
                returnKeyType="done"
                onSubmitEditing={handleContinue}
              />
            </View>

            <Card style={styles.infoCard} padding={12} shadow="none">
              <Text style={styles.infoText}>
                💙 We'll use your name to create personalized reminders and celebrate your progress!
              </Text>
            </Card>
          </View>

          <Button
            label="Continue →"
            onPress={handleContinue}
            disabled={name.trim().length < 2}
            style={styles.cta}
          />
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  kav: { flex: 1, paddingHorizontal: Spacing.lg },
  back: { marginBottom: Spacing.md },
  backText: { color: Colors.primary, fontSize: 16, fontWeight: '600' },
  steps: { marginBottom: Spacing.xl },
  content: { flex: 1, alignItems: 'center' },
  mascot: { marginBottom: Spacing.lg },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 21,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: '100%',
    marginBottom: Spacing.md,
    gap: 10,
  },
  inputFocused: { borderColor: Colors.primary },
  inputIcon: { fontSize: 18 },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: `${Colors.primary}12`,
    borderWidth: 1,
    borderColor: `${Colors.primary}22`,
    width: '100%',
  },
  infoText: {
    fontSize: 13,
    color: Colors.primaryDark,
    lineHeight: 20,
  },
  cta: {},
});
