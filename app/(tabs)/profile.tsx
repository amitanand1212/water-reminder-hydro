import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, Image, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useHydrationStore, DEFAULT_NOTIFICATION_SETTINGS } from '../../store/hydrationStore';
import { GradientBackground } from '../../components/ui/GradientBackground';
import { UserCard } from '../../components/profile/UserCard';
import { StatsGrid } from '../../components/profile/StatsGrid';
import { SettingsRow } from '../../components/profile/SettingsRow';
import { scheduleHydrationNotifications, requestNotificationPermissions } from '../../utils/notifications';
import { mlToLitres } from '../../utils/calculations';
import { calculateLevel } from '../../utils/badges';
import { Colors } from '../../constants/colors';
import { Spacing, BorderRadius } from '../../constants/spacing';
import { fs, imageSize } from '../../utils/responsive';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, streak, xp, unlockedBadges, settings, updateSettings, resetSettings, resetApp, getTodayRecord } =
    useHydrationStore();

  const todayRecord = getTodayRecord();
  const level = calculateLevel(xp.totalXP);

  const applyNotificationSettings = async (newNotif: typeof settings.notifications) => {
    updateSettings({ notifications: newNotif });
    await scheduleHydrationNotifications(newNotif);
  };

  const handleNotificationToggle = async (val: boolean) => {
    if (val) {
      const granted = await requestNotificationPermissions();
      if (!granted) {
        Alert.alert(
          'Notifications Disabled',
          'Please enable notifications for Hydro in your device settings to receive reminders.'
        );
        return;
      }
    }
    await applyNotificationSettings({ ...settings.notifications, enabled: val });
  };

  const cycleInterval = () => {
    const options = [1, 2, 3, 4];
    const current = settings.notifications.intervalHours;
    const next = options[(options.indexOf(current) + 1) % options.length];
    applyNotificationSettings({ ...settings.notifications, intervalHours: next });
  };

  const cycleStartHour = () => {
    const options = [5, 6, 7, 8, 9, 10];
    const current = settings.notifications.startHour;
    const next = options[(options.indexOf(current) + 1) % options.length];
    // keep start before end
    const safeNext = next >= settings.notifications.endHour ? options[0] : next;
    applyNotificationSettings({ ...settings.notifications, startHour: safeNext });
  };

  const cycleEndHour = () => {
    const options = [18, 19, 20, 21, 22, 23];
    const current = settings.notifications.endHour;
    const next = options[(options.indexOf(current) + 1) % options.length];
    // keep end after start
    const safeNext = next <= settings.notifications.startHour ? options[options.length - 1] : next;
    applyNotificationSettings({ ...settings.notifications, endHour: safeNext });
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'This will restore reminders and preferences to their defaults. Your intake history, streak and badges will not be affected.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            resetSettings();
            await scheduleHydrationNotifications(DEFAULT_NOTIFICATION_SETTINGS);
          },
        },
      ]
    );
  };

  const SUPPORT_EMAIL = 'hello@lush-app.com';
  const SUPPORT_PHONE = '+917307247026';

  const openLink = async (url: string, fallbackMessage: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Unavailable', fallbackMessage);
      }
    } catch {
      Alert.alert('Unavailable', fallbackMessage);
    }
  };

  const handleEmailSupport = () =>
    openLink(
      `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Hydro Support')}`,
      `Please email us at ${SUPPORT_EMAIL}`
    );

  const handleCallSupport = () =>
    openLink(`tel:${SUPPORT_PHONE}`, `Please call us at ${SUPPORT_PHONE}`);

  const handleLogOut = () => {
    Alert.alert('Log Out', 'This will clear all your data. Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await resetApp();
          router.replace('/(onboarding)');
        },
      },
    ]);
  };

  const statsData = [
    { icon: '⚖️', value: `${user?.weightKg ?? '--'} ${user?.weightUnit?.toUpperCase() ?? 'KG'}`, label: 'Weight' },
    { icon: '🎯', value: `${mlToLitres(user?.dailyGoalMl ?? 2000)}L`, label: 'Daily Goal', color: Colors.primary },
    { icon: '💧', value: `${mlToLitres(todayRecord.totalMl)}L`, label: 'Today Intake' },
    { icon: '🏆', value: `${unlockedBadges.length}`, label: 'Badges Earned', color: Colors.xpGold },
  ];

  const intervalLabel = `Every ${settings.notifications.intervalHours} Hour${settings.notifications.intervalHours > 1 ? 's' : ''}`;
  const startLabel = `${settings.notifications.startHour > 12 ? settings.notifications.startHour - 12 : settings.notifications.startHour}:00 ${settings.notifications.startHour >= 12 ? 'PM' : 'AM'}`;
  const endLabel = `${settings.notifications.endHour > 12 ? settings.notifications.endHour - 12 : settings.notifications.endHour}:00 ${settings.notifications.endHour >= 12 ? 'PM' : 'AM'}`;

  return (
    <GradientBackground colors={[Colors.background, '#EBF5FF']}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.headerTitle}>Profile 👤</Text>

          <View style={styles.mascotContainer}>
            <Image
              source={require('../../assets/mascot-drinking.png')}
              style={styles.mascotImage}
              resizeMode="contain"
            />
          </View>

          <UserCard
            name={user?.name ?? 'Friend'}
            streak={streak.currentStreak}
            xp={xp.totalXP}
            level={level}
          />

          <StatsGrid stats={statsData} />

          {/* Settings */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionLabel}>Reminders</Text>
            <View style={styles.settingsGroup}>
              <SettingsRow
                icon="🔔"
                title="Notifications"
                description={settings.notifications.enabled ? 'Reminders are on' : 'Reminders are off'}
                isToggle
                toggleValue={settings.notifications.enabled}
                onToggle={handleNotificationToggle}
              />
              <SettingsRow
                icon="⏱️"
                title="Reminder Interval"
                value={intervalLabel}
                onPress={cycleInterval}
              />
              <SettingsRow
                icon="🌅"
                title="Start Time"
                value={startLabel}
                onPress={cycleStartHour}
              />
              <SettingsRow
                icon="🌙"
                title="End Time"
                value={endLabel}
                onPress={cycleEndHour}
              />
            </View>

            <Text style={styles.sectionLabel}>Preferences</Text>
            <View style={styles.settingsGroup}>
              <SettingsRow
                icon="📏"
                title="Units"
                value={settings.volumeUnit === 'l' ? 'Liters (L)' : 'Milliliters (ml)'}
                onPress={() => {
                  updateSettings({ volumeUnit: settings.volumeUnit === 'l' ? 'ml' : 'l' });
                }}
              />
              <SettingsRow
                icon="♻️"
                title="Reset Settings"
                description="Restore reminders & preferences to defaults"
                onPress={handleResetSettings}
              />
            </View>

            <Text style={styles.sectionLabel}>About</Text>
            <View style={styles.settingsGroup}>
              <SettingsRow
                icon="📄"
                title="Privacy Policy"
                onPress={() => router.push('/legal/privacy')}
              />
              <SettingsRow
                icon="ℹ️"
                title="About Hydro"
                value="v1.0.0"
                onPress={() => router.push('/legal/about')}
              />
            </View>

            <Text style={styles.sectionLabel}>Support</Text>
            <View style={styles.settingsGroup}>
              <SettingsRow
                icon="✉️"
                title="Contact Support"
                description="hello@lush-app.com"
                onPress={handleEmailSupport}
              />
              <SettingsRow
                icon="📞"
                title="Call Us"
                description="+91 7307247026"
                onPress={handleCallSupport}
              />
            </View>

            <View style={styles.settingsGroup}>
              <SettingsRow
                icon="🚪"
                title="Log Out"
                description="Clear all data and start fresh"
                onPress={handleLogOut}
                destructive
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  headerTitle: { fontSize: fs(26), fontWeight: '800', color: Colors.textPrimary },
  mascotContainer: {
    alignItems: 'center',
    marginTop: -Spacing.sm,
    marginBottom: -Spacing.sm,
  },
  mascotImage: {
    ...imageSize(212, 250),
  },
  settingsSection: { gap: Spacing.sm },
  sectionLabel: {
    fontSize: fs(12),
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: Spacing.sm,
    marginLeft: 4,
  },
  settingsGroup: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
});
