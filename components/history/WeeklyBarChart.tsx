import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DailyRecord } from '../../types';
import { formatShortDay } from '../../utils/dateHelpers';
import { Colors } from '../../constants/colors';

interface Props {
  records: DailyRecord[];
  dateKeys: string[];
}

export function WeeklyBarChart({ records, dateKeys }: Props) {
  const maxMl = Math.max(...records.map((r) => r.totalMl), 500);

  return (
    <View style={styles.container}>
      {records.map((record, i) => {
        const height = Math.max((record.totalMl / maxMl) * 120, 4);
        const pct = record.goalMl > 0 ? Math.round((record.totalMl / record.goalMl) * 100) : 0;
        const isGoalMet = record.goalMet;
        const barColor = isGoalMet ? Colors.success : pct >= 50 ? Colors.warning : Colors.primaryLight;

        return (
          <View key={dateKeys[i]} style={styles.barCol}>
            <Text style={styles.pct}>{pct > 0 ? `${Math.min(pct, 100)}%` : ''}</Text>
            <View style={styles.barBg}>
              <View style={[styles.bar, { height, backgroundColor: barColor }]} />
            </View>
            <Text style={styles.day}>{formatShortDay(dateKeys[i])}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingVertical: 8,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  pct: {
    fontSize: 9,
    color: Colors.textSecondary,
    fontWeight: '500',
    height: 14,
  },
  barBg: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.ringTrack,
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 6,
  },
  day: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
