import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { fs } from '../../utils/responsive';

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

export const Display = makeText({ fontSize: fs(32), fontWeight: '800', lineHeight: fs(40) });
export const H1 = makeText({ fontSize: fs(24), fontWeight: '700', lineHeight: fs(32) });
export const H2 = makeText({ fontSize: fs(20), fontWeight: '700', lineHeight: fs(28) });
export const H3 = makeText({ fontSize: fs(18), fontWeight: '600', lineHeight: fs(26) });
export const H4 = makeText({ fontSize: fs(16), fontWeight: '600', lineHeight: fs(24) });
export const Body = makeText({ fontSize: fs(14), fontWeight: '400', lineHeight: fs(22) });
export const BodyMedium = makeText({ fontSize: fs(14), fontWeight: '600', lineHeight: fs(22) });
export const Caption = makeText({ fontSize: fs(12), fontWeight: '400', lineHeight: fs(18) });
export const CaptionMedium = makeText({ fontSize: fs(12), fontWeight: '600', lineHeight: fs(18) });
export const Tiny = makeText({ fontSize: fs(10), fontWeight: '400', lineHeight: fs(14) });
