import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressRing } from '../ui/ProgressRing';
import { DropletIcon } from '../ui/Icons';
import { Colors } from '../../constants/colors';
import { mlToLitres, percentComplete } from '../../utils/calculations';
import { fs } from '../../utils/responsive';

interface Props {
  totalMl: number;
  goalMl: number;
  size?: number;
}

export function HydrationRing({ totalMl, goalMl, size = 230 }: Props) {
  const pct = percentComplete(totalMl, goalMl);
  const totalL = mlToLitres(totalMl);
  const goalL = mlToLitres(goalMl);

  return (
    <ProgressRing percentage={pct} size={size} strokeWidth={16}>
      <View style={styles.center}>
        <DropletIcon size={28} color={Colors.primary} />
        <Text style={styles.percent}>
          {pct}<Text style={styles.percentSign}>%</Text>
        </Text>
        <Text style={styles.intake}>
          <Text style={styles.current}>{totalL}L</Text>
          <Text style={styles.separator}> / {goalL}L</Text>
        </Text>
        <Text style={styles.label}>Today's Goal</Text>
        <Text style={styles.goalValue}>{goalL} Liters</Text>
      </View>
    </ProgressRing>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  percent: {
    fontSize: fs(50),
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: fs(56),
  },
  percentSign: {
    fontSize: fs(24),
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  intake: {
    fontSize: fs(20),
    marginTop: 2,
  },
  current: {
    fontWeight: '800',
    color: Colors.primary,
    fontSize: fs(20),
  },
  separator: {
    color: Colors.textTertiary,
    fontSize: fs(18),
    fontWeight: '600',
  },
  label: {
    fontSize: fs(13),
    color: Colors.textSecondary,
    marginTop: 6,
  },
  goalValue: {
    fontSize: fs(13),
    color: Colors.primary,
    fontWeight: '700',
  },
});
