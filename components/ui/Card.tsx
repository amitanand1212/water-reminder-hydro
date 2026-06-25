import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadow } from '../../constants/spacing';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
}

export function Card({ children, style, padding = 16, shadow = 'sm' }: Props) {
  return (
    <View style={[styles.card, shadow !== 'none' ? Shadow[shadow] : undefined, { padding }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
  },
});
