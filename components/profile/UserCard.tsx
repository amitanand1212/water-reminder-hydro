import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../ui/Card';
import { Colors } from '../../constants/colors';
import { BorderRadius } from '../../constants/spacing';

interface Props {
  name: string;
  streak: number;
  xp: number;
  level: number;
}

export function UserCard({ name, streak, xp, level }: Props) {
  const initial = name.trim().charAt(0).toUpperCase() || '?';

  return (
    <Card padding={0} style={styles.card}>
      <View style={styles.header}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>{initial}</Text>
        </LinearGradient>

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.tagline}>Stay hydrated, stay healthy! 💧</Text>
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>🔥</Text>
              <Text style={styles.badgeText}>{streak} Day Streak</Text>
            </View>
            <View style={[styles.badge, styles.xpBadge]}>
              <Text style={styles.badgeIcon}>⭐</Text>
              <Text style={[styles.badgeText, styles.xpBadgeText]}>
                {xp} XP · Lv.{level}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  info: { flex: 1, gap: 5 },
  name: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  tagline: { fontSize: 12.5, color: Colors.textSecondary },
  badges: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 6 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${Colors.streakOrange}18`,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  xpBadge: { backgroundColor: `${Colors.xpGold}18` },
  badgeIcon: { fontSize: 12 },
  badgeText: { fontSize: 11, fontWeight: '700', color: Colors.streakOrange },
  xpBadgeText: { color: Colors.xpGold },
});
