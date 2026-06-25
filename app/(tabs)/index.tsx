import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useHydrationStore } from '../../store/hydrationStore';
import { GradientBackground } from '../../components/ui/GradientBackground';
import { GreetingHeader } from '../../components/home/GreetingHeader';
import { HydrationRing } from '../../components/home/HydrationRing';
import { QuickAddButton } from '../../components/home/QuickAddButton';
import { ReminderTipCard } from '../../components/home/ReminderTipCard';
import { DropletIcon } from '../../components/ui/Icons';
import { AdBanner } from '../../components/ui/AdBanner';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { user, streak, settings, getTodayRecord } = useHydrationStore();
  const todayRecord = getTodayRecord();

  const nextHour = useMemo(() => {
    const now = new Date().getHours();
    const { startHour, endHour, intervalHours } = settings.notifications;
    for (let h = startHour; h < endHour; h += intervalHours) {
      if (h > now) return h;
    }
    return startHour;
  }, [settings.notifications]);

  const handleQuickAdd = (amount: number) => {
    router.push({ pathname: '/modal/drinking', params: { amount: String(amount) } });
  };

  return (
    <GradientBackground colors={[Colors.background, '#EBF5FF']}>
      <View style={styles.safe}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <GreetingHeader
            name={user?.name ?? 'Friend'}
            streak={streak.currentStreak}
          />

          {/* Ring + Mascot side by side */}
          <View style={styles.hero}>
            {/* Floating drops decoration */}
            <View style={styles.drop1}>
              <DropletIcon size={20} color={Colors.primaryLight} />
            </View>
            <View style={styles.drop2}>
              <DropletIcon size={14} color={Colors.primaryLight} />
            </View>

            <HydrationRing
              totalMl={todayRecord.totalMl}
              goalMl={todayRecord.goalMl}
              size={210}
            />
            <Image
              source={require('../../assets/mascot-drinking.png')}
              style={styles.mascotImage}
              resizeMode="contain"
            />
          </View>

          {/* Quick Add buttons — 2x2 grid */}
          <View style={styles.grid}>
            <View style={styles.row}>
              <QuickAddButton amount={250} glasses={1} onPress={handleQuickAdd} />
              <QuickAddButton amount={500} glasses={2} onPress={handleQuickAdd} />
            </View>
            <View style={styles.row}>
              <QuickAddButton amount={750} glasses={3} onPress={handleQuickAdd} />
              <QuickAddButton amount={1000} glasses={4} onPress={handleQuickAdd} />
            </View>
          </View>

          {/* Combined Reminder + Tip card */}
          <ReminderTipCard
            nextHour={nextHour}
            enabled={settings.notifications.enabled}
          />
        </ScrollView>

        {/* Banner ad pinned above the tab bar */}
        <AdBanner />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    minHeight: 314,
  },
  mascotImage: {
    width: 220,
    height: 314,
    marginLeft: -28,
    marginBottom: -10,
  },
  drop1: { position: 'absolute', top: 10, left: 8 },
  drop2: { position: 'absolute', top: 34, left: 30 },
  grid: { gap: Spacing.sm },
  row: { flexDirection: 'row', gap: Spacing.sm },
});
