import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GradientBackground } from '../../components/ui/GradientBackground';
import { Colors } from '../../constants/colors';
import { Spacing, BorderRadius } from '../../constants/spacing';

const FEATURES = [
  { icon: '💧', title: 'Track Intake', text: 'Log every glass and watch your daily progress fill up.' },
  { icon: '🔔', title: 'Smart Reminders', text: 'Gentle nudges keep you hydrated throughout the day.' },
  { icon: '🔥', title: 'Streaks & Badges', text: 'Stay motivated by building streaks and earning rewards.' },
  { icon: '📊', title: 'History & Stats', text: 'Review your weekly trends and hydration habits.' },
];

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  return (
    <GradientBackground colors={[Colors.background, '#EBF5FF']}>
      <ScrollView
        style={styles.safe}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 8, paddingBottom: insets.bottom + Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.hero}>
          <Image
            source={require('../../assets/mascot-drinking.png')}
            style={styles.mascot}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Hydro</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.tagline}>Stay hydrated, stay healthy 💙</Text>
        </View>

        <Text style={styles.sectionTitle}>What Hydro does</Text>
        <View style={styles.featureList}>
          {FEATURES.map((f) => (
            <View key={f.title} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <View style={styles.featureTextWrap}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureText}>{f.text}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.credit}>Made with 💙 to help you drink more water.</Text>
        <Text style={styles.copyright}>© 2026 Hydro. All rights reserved.</Text>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  back: { alignSelf: 'flex-start', marginBottom: Spacing.sm },
  backText: { color: Colors.primary, fontSize: 16, fontWeight: '600' },
  hero: { alignItems: 'center', marginBottom: Spacing.lg },
  mascot: { width: 188, height: 225 },
  appName: { fontSize: 28, fontWeight: '800', color: Colors.primary, marginTop: Spacing.xs },
  version: { fontSize: 13, color: Colors.textTertiary, marginTop: 2 },
  tagline: { fontSize: 14, color: Colors.textSecondary, marginTop: Spacing.xs },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    marginLeft: 4,
  },
  featureList: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    gap: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  featureRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  featureIcon: { fontSize: 24 },
  featureTextWrap: { flex: 1, gap: 2 },
  featureTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  featureText: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  credit: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
  copyright: {
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
});
