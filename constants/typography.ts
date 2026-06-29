import { TextStyle } from 'react-native';
import { fs } from '../utils/responsive';

export const FontFamily = {
  regular: 'Inter_400Regular',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extraBold: 'Inter_800ExtraBold',
} as const;

export const Typography: Record<string, TextStyle> = {
  display: { fontSize: fs(32), fontWeight: '800', lineHeight: fs(40) },
  h1: { fontSize: fs(24), fontWeight: '700', lineHeight: fs(32) },
  h2: { fontSize: fs(20), fontWeight: '700', lineHeight: fs(28) },
  h3: { fontSize: fs(18), fontWeight: '600', lineHeight: fs(26) },
  h4: { fontSize: fs(16), fontWeight: '600', lineHeight: fs(24) },
  body: { fontSize: fs(14), fontWeight: '400', lineHeight: fs(22) },
  bodyMedium: { fontSize: fs(14), fontWeight: '600', lineHeight: fs(22) },
  caption: { fontSize: fs(12), fontWeight: '400', lineHeight: fs(18) },
  captionMedium: { fontSize: fs(12), fontWeight: '600', lineHeight: fs(18) },
  tiny: { fontSize: fs(10), fontWeight: '400', lineHeight: fs(14) },
};
