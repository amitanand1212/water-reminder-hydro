import React from 'react';
import { fs } from '../../utils/responsive';

import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHydrationStore } from '../../store/hydrationStore';
import { GradientBackground } from '../../components/ui/GradientBackground';
import { XPBar } from '../../components/rewards/XPBar';
import { BadgeCard } from '../../components/rewards/BadgeCard';
import { Card } from '../../components/ui/Card';
import { ALL_BADGES } from '../../constants/badges';
import { Colors } from '../../constants/colors';
import { Spacing, BorderRadius } from '../../constants/spacing';

export default function RewardsScreen() {
  const insets = useSafeAreaInsets();
  const { streak, xp, unlockedBadges } = useHydrationStore();
  const unlockedIds = unlockedBadges.map((b) => b.id);

  const badgePairs = [];
  for (let i = 0; i < ALL_BADGES.length; i += 3) {
    badgePairs.push(ALL_BADGES.slice(i, i + 3));
  }

  return (
    <GradientBackground colors={[Colors.background, '#EBF5FF']}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.headerTitle}>Rewards 🏆</Text>

          {/* Streak display */}
          <Card style={styles.streakCard} padding={20}>
            <View style={styles.streakRow}>
              <Text style={styles.streakFire}>🔥</Text>
              <View>
                <Text style={styles.streakValue}>{streak.currentStreak} Day Streak</Text>
                <Text style={styles.streakBest}>Best: {streak.longestStreak} days</Text>
              </View>
            </View>
          </Card>

          {/* XP Progress */}
          <XPBar totalXP={xp.totalXP} />

          {/* Badges */}
          <Text style={styles.sectionTitle}>Your Badges</Text>
          <Text style={styles.sectionSub}>
            {unlockedBadges.length} / {ALL_BADGES.length} unlocked
          </Text>

          {badgePairs.map((row, ri) => (
            <View key={ri} style={styles.badgeRow}>
              {row.map((badge) => (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  unlocked={unlockedIds.includes(badge.id)}
                />
              ))}
              {row.length < 3 && <View style={{ flex: 3 - row.length }} />}
            </View>
          ))}

          {/* Milestones */}
          <Text style={styles.sectionTitle}>Milestones</Text>
          {[
            { icon: '💧', label: 'First Drop', desc: 'Log your first water intake', target: 1, current: unlockedIds.includes('first_drop') ? 1 : 0 },
            { icon: '🔥', label: '7-Day Streak', desc: 'Drink for 7 consecutive days', target: 7, current: Math.min(streak.currentStreak, 7) },
            { icon: '🔥', label: '30-Day Streak', desc: 'Drink for 30 consecutive days', target: 30, current: Math.min(streak.currentStreak, 30) },
            { icon: '👑', label: 'Monthly Master', desc: 'Complete 30-day streak', target: 30, current: Math.min(streak.currentStreak, 30) },
          ].map((m) => (
            <Card key={m.label} style={styles.milestoneCard} padding={14}>
              <View style={styles.milestoneRow}>
                <Text style={styles.milestoneIcon}>{m.icon}</Text>
                <View style={styles.milestoneInfo}>
                  <Text style={styles.milestoneLabel}>{m.label}</Text>
                  <Text style={styles.milestoneDesc}>{m.desc}</Text>
                </View>
                <Text style={styles.milestoneProgress}>{m.current}/{m.target}</Text>
              </View>
            </Card>
          ))}
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
  headerTitle: { fontSize: fs(24), fontWeight: '800', color: Colors.textPrimary },
  streakCard: {},
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  streakFire: { fontSize: fs(44) },
  streakValue: { fontSize: fs(22), fontWeight: '800', color: Colors.streakOrange },
  streakBest: { fontSize: fs(13), color: Colors.textSecondary },
  sectionTitle: { fontSize: fs(18), fontWeight: '700', color: Colors.textPrimary, marginTop: 4 },
  sectionSub: { fontSize: fs(12), color: Colors.textSecondary, marginTop: -8 },
  badgeRow: { flexDirection: 'row', gap: Spacing.sm },
  milestoneCard: {},
  milestoneRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  milestoneIcon: { fontSize: fs(28) },
  milestoneInfo: { flex: 1 },
  milestoneLabel: { fontSize: fs(14), fontWeight: '700', color: Colors.textPrimary },
  milestoneDesc: { fontSize: fs(12), color: Colors.textSecondary },
  milestoneProgress: { fontSize: fs(14), fontWeight: '700', color: Colors.primary },
});
