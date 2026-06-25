import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DailyRecord } from '../../types';
import { ProgressRing } from '../ui/ProgressRing';
import { mlToLitres } from '../../utils/calculations';
import { Colors } from '../../constants/colors';
import { BorderRadius } from '../../constants/spacing';

interface Props {
  records: DailyRecord[];
}

export function WeeklyStats({ records }: Props) {
  const activeDays = records.filter((r) => r.totalMl > 0);
  const totalMl = records.reduce((sum, r) => sum + r.totalMl, 0);
  const avgMl = activeDays.length > 0 ? totalMl / activeDays.length : 0;
  const avgGoalMl = activeDays.length > 0
    ? activeDays.reduce((sum, r) => sum + r.goalMl, 0) / activeDays.length
    : 2000;
  const avgPct = avgGoalMl > 0 ? Math.min(Math.round((avgMl / avgGoalMl) * 100), 100) : 0;
  const daysGoalMet = records.filter((r) => r.goalMet).length;

  return (
    <View style={styles.container}>
      <View style={styles.ringSection}>
        <ProgressRing percentage={avgPct} size={90} strokeWidth={10}>
          <Text style={styles.ringPct}>{avgPct}%</Text>
        </ProgressRing>
        <Text style={styles.ringLabel}>Weekly Average</Text>
        <Text style={styles.ringValue}>{mlToLitres(avgMl)}L / day</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{mlToLitres(totalMl)}L</Text>
          <Text style={styles.statLabel}>Total This Week</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: Colors.success }]}>{daysGoalMet}/7</Text>
          <Text style={styles.statLabel}>Goals Met</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  ringSection: { alignItems: 'center', gap: 4 },
  ringPct: { fontSize: 14, fontWeight: '800', color: Colors.primary },
  ringLabel: { fontSize: 10, color: Colors.textSecondary, fontWeight: '600' },
  ringValue: { fontSize: 12, color: Colors.primary, fontWeight: '700' },
  statsGrid: { flex: 1, gap: 12 },
  stat: { gap: 2 },
  statValue: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: 11, color: Colors.textSecondary },
});
