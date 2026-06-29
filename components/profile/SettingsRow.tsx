import React from 'react';
import { fs } from '../../utils/responsive';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Toggle } from '../ui/Toggle';
import { Colors } from '../../constants/colors';

interface Props {
  icon: string;
  title: string;
  description?: string;
  value?: string;
  isToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (val: boolean) => void;
  onPress?: () => void;
  destructive?: boolean;
}

export function SettingsRow({
  icon,
  title,
  description,
  value,
  isToggle,
  toggleValue,
  onToggle,
  onPress,
  destructive,
}: Props) {
  const inner = (
    <View style={styles.row}>
      <View style={styles.iconBg}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.textSection}>
        <Text style={[styles.title, destructive && { color: Colors.error }]}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      {isToggle && onToggle ? (
        <Toggle value={toggleValue ?? false} onValueChange={onToggle} />
      ) : (
        <View style={styles.right}>
          {value && <Text style={styles.value}>{value}</Text>}
          {onPress && <Text style={styles.chevron}>›</Text>}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.wrapper}>
        {inner}
      </TouchableOpacity>
    );
  }

  return <View style={styles.wrapper}>{inner}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${Colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: fs(18) },
  textSection: { flex: 1, gap: 2 },
  title: { fontSize: fs(14), fontWeight: '600', color: Colors.textPrimary },
  description: { fontSize: fs(12), color: Colors.textSecondary },
  right: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  value: { fontSize: fs(13), color: Colors.textSecondary },
  chevron: { fontSize: fs(20), color: Colors.textTertiary, marginTop: -2 },
});
