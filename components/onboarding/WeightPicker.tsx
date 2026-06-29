import React, { useRef, useCallback } from 'react';
import { fs } from '../../utils/responsive';

import { View, ScrollView, Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Colors } from '../../constants/colors';

const ITEM_HEIGHT = 52;
const VISIBLE_ITEMS = 5;

interface Props {
  value: number;
  onChange: (value: number) => void;
  unit: 'kg' | 'lb';
}

function getRange(unit: 'kg' | 'lb') {
  if (unit === 'kg') {
    return Array.from({ length: 171 }, (_, i) => 30 + i); // 30–200
  }
  return Array.from({ length: 375 }, (_, i) => 66 + i); // 66–440
}

export function WeightPicker({ value, onChange, unit }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const values = getRange(unit);
  const currentIndex = Math.max(0, values.indexOf(Math.round(value)));

  const handleScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
      const clamped = Math.min(Math.max(index, 0), values.length - 1);
      onChange(values[clamped]);
    },
    [values, onChange]
  );

  return (
    <View style={styles.container}>
      {/* Selection highlight */}
      <View style={styles.highlight} pointerEvents="none" />

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
        onMomentumScrollEnd={handleScrollEnd}
        contentOffset={{ x: 0, y: currentIndex * ITEM_HEIGHT }}
        style={styles.scroll}
      >
        {values.map((v, i) => {
          const isSelected = v === value;
          const diff = Math.abs(i - currentIndex);
          const opacity = diff === 0 ? 1 : diff === 1 ? 0.5 : 0.25;
          return (
            <View key={v} style={styles.item}>
              <Text
                style={[
                  styles.itemText,
                  isSelected && styles.selectedText,
                  { opacity },
                ]}
              >
                {v}
              </Text>
              {isSelected && (
                <Text style={styles.unitLabel}>{unit}</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
    position: 'relative',
  },
  highlight: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.primary,
    zIndex: 10,
    borderRadius: 4,
    backgroundColor: `${Colors.primary}10`,
  },
  scroll: {
    flex: 1,
  },
  item: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  itemText: {
    fontSize: fs(20),
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  selectedText: {
    fontSize: fs(28),
    color: Colors.primary,
    fontWeight: '700',
  },
  unitLabel: {
    fontSize: fs(16),
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 4,
  },
});
