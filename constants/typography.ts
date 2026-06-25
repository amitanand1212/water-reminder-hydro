import { TextStyle } from 'react-native';

export const FontFamily = {
  regular: 'Inter_400Regular',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extraBold: 'Inter_800ExtraBold',
} as const;

export const Typography: Record<string, TextStyle> = {
  display: { fontSize: 32, fontWeight: '800', lineHeight: 40 },
  h1: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  h2: { fontSize: 20, fontWeight: '700', lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 26 },
  h4: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 22 },
  bodyMedium: { fontSize: 14, fontWeight: '600', lineHeight: 22 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 18 },
  captionMedium: { fontSize: 12, fontWeight: '600', lineHeight: 18 },
  tiny: { fontSize: 10, fontWeight: '400', lineHeight: 14 },
};
