import React from 'react';
import { fs } from '../../utils/responsive';

import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadow } from '../../constants/spacing';

interface Props {
  icon: string;
  title: string;
  subtitle?: string;
}

export function FeatureCard({ icon, title, subtitle }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBg}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
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
    ...Shadow.sm,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.add250Bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: fs(20),
  },
  title: {
    fontSize: fs(12),
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fs(10),
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
