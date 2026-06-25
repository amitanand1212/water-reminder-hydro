import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

interface Props {
  currentStep: number;
  totalSteps: number;
  style?: object;
}

export function StepIndicator({ currentStep, totalSteps, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i < currentStep ? styles.active : styles.inactive,
            i === currentStep - 1 ? styles.current : undefined,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  current: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  active: {
    width: 8,
    backgroundColor: Colors.primary,
    opacity: 0.4,
  },
  inactive: {
    width: 8,
    backgroundColor: '#D1D5DB',
  },
});
