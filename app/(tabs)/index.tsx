import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Image, useWindowDimensions } from 'react-native';
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
  const { width: winW } = useWindowDimensions();
  const { user, streak, settings, getTodayRecord } = useHydrationStore();
  const todayRecord = getTodayRecord();

  // Ring + mascot sit side by side. At design size their combined footprint is
  // ~410dp, which only fits on wide screens — derive a fit factor from the
  // available width (content has Spacing.md padding each side) so the row never
  // overflows on narrow phones, but never grows past the original design size.
  const heroFit = Math.min(1, (winW - Spacing.md * 2) / 410);
  const ringSize = Math.round(210 * heroFit);
  const mascotW = Math.round(220 * heroFit);
  const mascotH = Math.round((mascotW * 314) / 220);
  const mascotOverlap = Math.round(28 * heroFit);
  const mascotDrop = Math.round(10 * heroFit);

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
          <View style={[styles.hero, { minHeight: mascotH }]}>
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
              size={ringSize}
            />
            <Image
              source={require('../../assets/mascot-drinking.png')}
              style={{
                width: mascotW,
                height: mascotH,
                marginLeft: -mascotOverlap,
                marginBottom: -mascotDrop,
              }}
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
  },
  drop1: { position: 'absolute', top: 10, left: 8 },
  drop2: { position: 'absolute', top: 34, left: 30 },
  grid: { gap: Spacing.sm },
  row: { flexDirection: 'row', gap: Spacing.sm },
});
