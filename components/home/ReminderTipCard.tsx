import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { Colors } from '../../constants/colors';
import { ClockIcon } from '../ui/Icons';
import { Mascot } from '../mascot/Mascot';

interface Props {
  nextHour: number;
  enabled: boolean;
  tip?: string;
}

function formatHour(h: number): string {
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:00 ${period}`;
}

export function ReminderTipCard({ nextHour, enabled, tip = 'Drink water now to boost your energy!' }: Props) {
  return (
    <Card style={styles.card} padding={16}>
      <View style={styles.row}>
        {/* Reminder */}
        <View style={styles.half}>
          <View style={styles.clockWrap}>
            <ClockIcon size={26} color={Colors.primary} />
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Next Reminder</Text>
            <Text style={styles.value}>{enabled ? formatHour(nextHour) : 'Off'}</Text>
            <Text style={styles.sub}>{enabled ? 'Stay on track!' : 'Enable in Profile'}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Tip of the Day */}
        <View style={styles.half}>
          <Mascot character="droplet" pose="celebrating" size={42} />
          <View style={styles.info}>
            <Text style={styles.tipLabel}>Tip of the Day</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%' },
  row: { flexDirection: 'row', alignItems: 'center' },
  half: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  clockWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.add250Bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.border,
    marginHorizontal: 12,
  },
  info: { flex: 1, gap: 1 },
  label: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  value: { fontSize: 16, fontWeight: '800', color: Colors.primary },
  sub: { fontSize: 12, color: Colors.textSecondary },
  tipLabel: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  tipText: { fontSize: 12, color: Colors.textPrimary, lineHeight: 16 },
});
