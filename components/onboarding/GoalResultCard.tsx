import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadow } from '../../constants/spacing';

interface Props {
  weightKg: number;
  goalMl: number;
  weightUnit: 'kg' | 'lb';
}

export function GoalResultCard({ weightKg, goalMl, weightUnit }: Props) {
  const goalLitres = goalMl / 1000;
  const displayWeight = weightUnit === 'kg' ? `${weightKg} KG` : `${Math.round(weightKg * 2.205)} LB`;

  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    scale.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.5)) });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.card, animStyle]}>
      <View style={styles.row}>
        <Text style={styles.label}>Your Weight</Text>
        <Text style={styles.value}>{displayWeight}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.goalRow}>
        <Text style={styles.goalLabel}>Recommended Daily Goal</Text>
        <View style={styles.goalValue}>
          <Text style={styles.goalNumber}>{goalLitres.toFixed(1)}</Text>
          <Text style={styles.goalUnit}>L/Day</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: 20,
    gap: 12,
    ...Shadow.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  goalRow: {
    gap: 8,
  },
  goalLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  goalValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  goalNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.primary,
  },
  goalUnit: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
  },
});
