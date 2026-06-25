import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GradientBackground } from '../../components/ui/GradientBackground';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

export default function PrivacyPolicyScreen() {
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

        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.updated}>Last updated: June 24, 2026</Text>

        <Text style={styles.heading}>Your Data Stays on Your Device</Text>
        <Text style={styles.paragraph}>
          Hydro is built with your privacy in mind. All of the information you enter — your name,
          weight, daily water goal, intake history, streaks and badges — is stored only on your
          device. We do not have accounts or servers that collect or store your personal data, and
          the app works without an account.
        </Text>

        <Text style={styles.heading}>Advertising (Google AdMob)</Text>
        <Text style={styles.paragraph}>
          Hydro shows ads through Google AdMob to keep the app free. To serve ads, Google may
          collect and process certain information such as your device's advertising ID, IP address,
          and ad-interaction data, in accordance with Google's own policies. Where required (for
          example in the EEA/UK), the app asks for your consent before ads are personalized; you can
          change this choice later from your device settings. Learn more at
          https://policies.google.com/technologies/ads.
        </Text>

        <Text style={styles.heading}>Notifications</Text>
        <Text style={styles.paragraph}>
          Hydro uses local notifications to remind you to drink water. These reminders are scheduled
          on your device and are never sent through external services.
        </Text>

        <Text style={styles.heading}>Permissions</Text>
        <Text style={styles.paragraph}>
          The app may ask for notification and exact-alarm permissions so reminders can arrive on
          time. You can disable reminders anytime from the Profile screen. The advertising ID used
          for ads is managed by Google Play services and can be reset or limited in your device
          settings.
        </Text>

        <Text style={styles.heading}>Children's Privacy</Text>
        <Text style={styles.paragraph}>
          Hydro is intended for a general audience and is not directed at children under 13. We do
          not knowingly collect personal information from children.
        </Text>

        <Text style={styles.heading}>Deleting Your Data</Text>
        <Text style={styles.paragraph}>
          You can erase everything at any moment using “Log Out” in the Profile screen, which clears
          all stored data. Uninstalling the app also removes all data permanently.
        </Text>

        <Text style={styles.heading}>Contact</Text>
        <Text style={styles.paragraph}>
          If you have any questions about this policy, reach out to us at hello@lush-app.com.
        </Text>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  back: { alignSelf: 'flex-start', marginBottom: Spacing.md },
  backText: { color: Colors.primary, fontSize: 16, fontWeight: '600' },
  title: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  updated: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginTop: 4,
    marginBottom: Spacing.lg,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  paragraph: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
