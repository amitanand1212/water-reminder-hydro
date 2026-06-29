import React from 'react';
import { fs } from '../../utils/responsive';

import { View, Text, StyleSheet } from 'react-native';
import { Badge } from '../../types';
import { Colors } from '../../constants/colors';
import { BorderRadius } from '../../constants/spacing';

interface Props {
  badge: Omit<Badge, 'unlockedAt'>;
  unlocked: boolean;
}

export function BadgeCard({ badge, unlocked }: Props) {
  return (
    <View style={[styles.card, !unlocked && styles.locked]}>
      <View style={[styles.iconBg, !unlocked && styles.iconBgLocked]}>
        <Text style={[styles.icon, !unlocked && styles.iconLocked]}>{unlocked ? badge.icon : '🔒'}</Text>
      </View>
      <Text style={[styles.name, !unlocked && styles.nameLocked]} numberOfLines={2}>
        {badge.name}
      </Text>
      {unlocked && (
        <View style={styles.xpChip}>
          <Text style={styles.xpText}>+{badge.xpReward} XP</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: 12,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#1E88FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 110,
  },
  locked: {
    backgroundColor: '#F5F5F5',
    shadowOpacity: 0,
    elevation: 0,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBgLocked: { backgroundColor: '#E5E5E5' },
  icon: { fontSize: fs(24) },
  iconLocked: { opacity: 0.5 },
  name: {
    fontSize: fs(11),
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: fs(15),
  },
  nameLocked: { color: Colors.textTertiary },
  xpChip: {
    backgroundColor: `${Colors.xpGold}25`,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  xpText: { fontSize: fs(10), fontWeight: '700', color: Colors.xpGold },
});
