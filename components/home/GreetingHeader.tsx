import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Shadow } from '../../constants/spacing';
import { getGreeting } from '../../utils/calculations';
import { FlameIcon } from '../ui/Icons';

interface Props {
  name: string;
  streak: number;
  onBellPress?: () => void;
}

export function GreetingHeader({ name, streak, onBellPress }: Props) {
  const greeting = getGreeting();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.greeting}>{greeting}, 👋</Text>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.subtitle}>Stay Hydrated, Stay Healthy!</Text>
      </View>

      <View style={styles.streakCard}>
        <FlameIcon size={22} color={Colors.streakOrange} />
        <View>
          <Text style={styles.streakNumber}>{streak}</Text>
          <Text style={styles.streakLabel}>Day Streak</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  left: { flex: 1, gap: 2, paddingRight: 12 },
  greeting: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  name: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 2 },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    ...Shadow.sm,
  },
  streakNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    lineHeight: 22,
  },
  streakLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
