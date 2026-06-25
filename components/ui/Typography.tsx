import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

interface TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  color?: string;
  align?: 'left' | 'center' | 'right';
}

function makeText(base: TextStyle) {
  return ({ children, style, color, align }: TextProps) => (
    <Text
      style={[
        base,
        { color: color ?? Colors.textPrimary },
        align ? { textAlign: align } : undefined,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export const Display = makeText({ fontSize: 32, fontWeight: '800', lineHeight: 40 });
export const H1 = makeText({ fontSize: 24, fontWeight: '700', lineHeight: 32 });
export const H2 = makeText({ fontSize: 20, fontWeight: '700', lineHeight: 28 });
export const H3 = makeText({ fontSize: 18, fontWeight: '600', lineHeight: 26 });
export const H4 = makeText({ fontSize: 16, fontWeight: '600', lineHeight: 24 });
export const Body = makeText({ fontSize: 14, fontWeight: '400', lineHeight: 22 });
export const BodyMedium = makeText({ fontSize: 14, fontWeight: '600', lineHeight: 22 });
export const Caption = makeText({ fontSize: 12, fontWeight: '400', lineHeight: 18 });
export const CaptionMedium = makeText({ fontSize: 12, fontWeight: '600', lineHeight: 18 });
export const Tiny = makeText({ fontSize: 10, fontWeight: '400', lineHeight: 14 });
