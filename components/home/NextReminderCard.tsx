import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { Colors } from '../../constants/colors';

interface Props {
  nextHour: number;
  enabled: boolean;
}

function formatHour(h: number): string {
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:00 ${period}`;
}

export function NextReminderCard({ nextHour, enabled }: Props) {
  return (
    <Card style={styles.card} padding={14}>
      <View style={styles.row}>
        <Text style={styles.icon}>⏰</Text>
        <View style={styles.info}>
          <Text style={styles.label}>Next Reminder</Text>
          <Text style={styles.value}>{enabled ? formatHour(nextHour) : 'Off'}</Text>
          <Text style={styles.sub}>{enabled ? 'Stay on track!' : 'Enable in Profile'}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  icon: { fontSize: 28 },
  info: { gap: 1 },
  label: { fontSize: 11, color: Colors.textSecondary },
  value: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  sub: { fontSize: 11, color: Colors.textSecondary },
});
