import React from 'react';
import { fs } from '../../utils/responsive';

import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/colors';
import { BorderRadius } from '../../constants/spacing';

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  style?: ViewStyle;
}

export function Button({ label, onPress, disabled, loading, variant = 'primary', style }: Props) {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.85}
        style={[styles.wrapper, style]}
      >
        <LinearGradient
          colors={disabled ? ['#B0C4DE', '#A0B4CE'] : [Colors.primary, Colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.label}>{label}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.85}
        style={[styles.outlineWrapper, style]}
      >
        <Text style={styles.outlineLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled} activeOpacity={0.7} style={style}>
      <Text style={styles.ghostLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: BorderRadius.pill,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  label: {
    color: '#fff',
    fontSize: fs(16),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  outlineWrapper: {
    borderRadius: BorderRadius.pill,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  outlineLabel: {
    color: Colors.primary,
    fontSize: fs(16),
    fontWeight: '600',
  },
  ghostLabel: {
    color: Colors.textSecondary,
    fontSize: fs(14),
    fontWeight: '400',
  },
});
