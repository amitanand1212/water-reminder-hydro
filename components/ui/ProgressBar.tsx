import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { BorderRadius } from '../../constants/spacing';

interface Props {
  progress: number; // 0–1
  height?: number;
  trackColor?: string;
  fillColor?: string;
  style?: ViewStyle;
  animated?: boolean;
  duration?: number;
}

export function ProgressBar({
  progress,
  height = 8,
  trackColor = Colors.ringTrack,
  fillColor = Colors.primary,
  style,
  animated = true,
  duration = 600,
}: Props) {
  const width = useSharedValue(0);

  useEffect(() => {
    const clamped = Math.min(Math.max(progress, 0), 1);
    if (animated) {
      width.value = withTiming(clamped, { duration, easing: Easing.out(Easing.cubic) });
    } else {
      width.value = clamped;
    }
  }, [progress]);

  const animStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
  }));

  return (
    <View style={[{ height, backgroundColor: trackColor, borderRadius: height / 2, overflow: 'hidden' }, style]}>
      <Animated.View style={[{ height, backgroundColor: fillColor, borderRadius: height / 2 }, animStyle]} />
    </View>
  );
}
