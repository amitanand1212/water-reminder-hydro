import React from 'react';
import { fs } from '../../utils/responsive';

import { View, Text, StyleSheet } from 'react-native';
import { DailyRecord } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';
import { formatDisplayDate, isToday } from '../../utils/dateHelpers';
import { mlToLitres } from '../../utils/calculations';
import { Colors } from '../../constants/colors';
import { BorderRadius } from '../../constants/spacing';

interface Props {
  record: DailyRecord;
}

export function DayRecordRow({ record }: Props) {
  const pct = record.goalMl > 0 ? Math.min((record.totalMl / record.goalMl) * 100, 100) : 0;
  const color = record.goalMet ? Colors.success : pct >= 50 ? Colors.warning : Colors.error;

  return (
    <View style={styles.container}>
      <Text style={styles.dropIcon}>💧</Text>
      <View style={styles.main}>
        <View style={styles.topRow}>
          <Text style={styles.date}>
            {isToday(record.dateKey) ? 'Today' : formatDisplayDate(record.dateKey)}
          </Text>
          <View style={[styles.badge, { backgroundColor: `${color}20` }]}>
            <Text style={[styles.pct, { color }]}>{Math.round(pct)}%</Text>
          </View>
        </View>
        <ProgressBar
          progress={pct / 100}
          height={6}
          fillColor={color}
          style={styles.bar}
        />
        <Text style={styles.sub}>
          {mlToLitres(record.totalMl)}L / {mlToLitres(record.goalMl)}L
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: BorderRadius.lg,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  dropIcon: { fontSize: fs(24) },
  main: { flex: 1, gap: 6 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: fs(14), fontWeight: '600', color: Colors.textPrimary },
  badge: {
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pct: { fontSize: fs(12), fontWeight: '700' },
  bar: { width: '100%' },
  sub: { fontSize: fs(12), color: Colors.textSecondary },
});
