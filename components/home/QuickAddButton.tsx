import React from 'react';
import { fs } from '../../utils/responsive';

import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadow } from '../../constants/spacing';
import { GlassIcon } from '../ui/Icons';

interface Props {
  amount: number; // ml
  onPress: (amount: number) => void;
  glasses: number;
}

const CONFIG: Record<number, { iconBg: string; iconColor: string; label: string }> = {
  250: { iconBg: Colors.add250Bg, iconColor: Colors.add250Icon, label: '1 Glass' },
  500: { iconBg: Colors.add500Bg, iconColor: Colors.add500Icon, label: '2 Glasses' },
  750: { iconBg: Colors.add750Bg, iconColor: Colors.add750Icon, label: '3 Glasses' },
  1000: { iconBg: Colors.add1000Bg, iconColor: Colors.add1000Icon, label: '4 Glasses' },
};

export function QuickAddButton({ amount, onPress }: Props) {
  const config = CONFIG[amount] ?? { iconBg: Colors.add250Bg, iconColor: Colors.primary, label: '' };

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress(amount);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <View style={[styles.iconWrap, { backgroundColor: config.iconBg }]}>
        <GlassIcon size={26} color={config.iconColor} />
      </View>
      <View style={styles.text}>
        <Text style={styles.amount}>+{amount}ml</Text>
        <Text style={styles.glasses}>{config.label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: 12,
    gap: 12,
    ...Shadow.sm,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1 },
  amount: {
    fontSize: fs(17),
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  glasses: {
    fontSize: fs(12),
    color: Colors.textSecondary,
    fontWeight: '400',
  },
});
