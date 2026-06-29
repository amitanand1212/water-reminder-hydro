import React from 'react';
import { fs } from '../../utils/responsive';

import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from '../ui/ProgressBar';
import { xpToNextLevel, calculateLevel } from '../../utils/badges';
import { Colors } from '../../constants/colors';
import { BorderRadius } from '../../constants/spacing';

interface Props {
  totalXP: number;
}

export function XPBar({ totalXP }: Props) {
  const level = calculateLevel(totalXP);
  const toNext = xpToNextLevel(totalXP);
  const xpInLevel = 500 - toNext;
  const progress = xpInLevel / 500;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>LVL {level}</Text>
        </View>
        <Text style={styles.xpText}>⭐ {totalXP} XP</Text>
      </View>
      <ProgressBar progress={progress} height={10} fillColor={Colors.xpGold} />
      <Text style={styles.nextText}>{toNext} XP to Level {level + 1}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelBadge: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  levelText: { color: '#fff', fontSize: fs(12), fontWeight: '800' },
  xpText: { fontSize: fs(16), fontWeight: '700', color: Colors.textPrimary },
  nextText: { fontSize: fs(11), color: Colors.textSecondary, textAlign: 'right' },
});
