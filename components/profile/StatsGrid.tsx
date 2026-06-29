import React from 'react';
import { fs } from '../../utils/responsive';

import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius } from '../../constants/spacing';

interface Stat {
  icon: string;
  value: string;
  label: string;
  color?: string;
}

interface Props {
  stats: Stat[];
}

export function StatsGrid({ stats }: Props) {
  return (
    <View style={styles.grid}>
      {stats.map((s) => (
        <View key={s.label} style={styles.cell}>
          <Text style={styles.icon}>{s.icon}</Text>
          <Text style={[styles.value, s.color ? { color: s.color } : undefined]}>{s.value}</Text>
          <Text style={styles.label}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cell: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: 14,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  icon: { fontSize: fs(24) },
  value: { fontSize: fs(20), fontWeight: '800', color: Colors.primary },
  label: { fontSize: fs(11), color: Colors.textSecondary, textAlign: 'center' },
});
