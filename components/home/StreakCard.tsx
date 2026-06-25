import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { Colors } from '../../constants/colors';

interface Props {
  streak: number;
  longestStreak: number;
}

export function StreakCard({ streak, longestStreak }: Props) {
  return (
    <Card style={styles.card} padding={14}>
      <View style={styles.row}>
        <Text style={styles.fireIcon}>🔥</Text>
        <View style={styles.info}>
          <Text style={styles.value}>{streak} Day Streak</Text>
          <Text style={styles.sub}>Best: {longestStreak} days</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  fireIcon: { fontSize: 28 },
  info: { gap: 2 },
  value: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  sub: { fontSize: 11, color: Colors.textSecondary },
});
