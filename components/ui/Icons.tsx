import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polyline, G } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  fill?: string;
}

// A glass of water — fill color tints the liquid
export function GlassIcon({ size = 28, color = '#1E88FF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 3 L18 3 L16.5 20 Q16.3 21 15.3 21 L8.7 21 Q7.7 21 7.5 20 Z" fill={color} opacity={0.18} />
      <Path d="M7 11 L17 11 L16.5 20 Q16.3 21 15.3 21 L8.7 21 Q7.7 21 7.5 20 Z" fill={color} opacity={0.9} />
      <Path d="M6 3 L18 3 L16.5 20 Q16.3 21 15.3 21 L8.7 21 Q7.7 21 7.5 20 Z" stroke={color} strokeWidth={1.4} fill="none" strokeLinejoin="round" />
    </Svg>
  );
}

// Water droplet
export function DropletIcon({ size = 28, color = '#1E88FF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2.5 C12 2.5 5 10 5 14.5 C5 18.6 8.1 21 12 21 C15.9 21 19 18.6 19 14.5 C19 10 12 2.5 12 2.5 Z" fill={color} />
      <Path d="M9 14.5 C9 16.5 10.3 18 12 18.3" stroke="white" strokeWidth={1.4} strokeLinecap="round" opacity={0.6} fill="none" />
    </Svg>
  );
}

// Clock / reminder
export function ClockIcon({ size = 28, color = '#1E88FF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} fill="none" />
      <Polyline points="12 7 12 12 15.5 14" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

// Flame / streak
export function FlameIcon({ size = 28, color = '#FF6B35' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2 C12 2 6 7 6 13 a6 6 0 0 0 12 0 c0 -2.5 -1.5 -4.5 -2.5 -5.8 c-0.3 1.6 -1.4 2.3 -2 1.8 C14.5 8.5 15 5 12 2 Z" fill={color} />
      <Path d="M12 12 C10 13 9.5 15 11 16.5 a2.4 2.4 0 0 0 3.4 -0.2 C15.5 15 14.5 13.5 13.5 13 C13.4 13.9 12.8 14.2 12.4 14 C12 13.7 12.3 12.8 12 12 Z" fill="#FFC93C" />
    </Svg>
  );
}

// Bell / notifications
export function BellIcon({ size = 24, color = '#1A1A2E' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 9 a6 6 0 0 1 12 0 c0 5 2 6 2 6 H4 s2 -1 2 -6 Z" stroke={color} strokeWidth={2} strokeLinejoin="round" fill="none" />
      <Path d="M10 19 a2 2 0 0 0 4 0" stroke={color} strokeWidth={2} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

// ----- Tab bar icons -----
export function HomeTabIcon({ size = 24, color = '#1E88FF', fill = 'none' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 11 L12 3 L21 11 V20 a1 1 0 0 1 -1 1 H4 a1 1 0 0 1 -1 -1 Z" stroke={color} strokeWidth={2} strokeLinejoin="round" fill={fill} />
    </Svg>
  );
}

export function HistoryTabIcon({ size = 24, color = '#9CA3AF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="6" y1="20" x2="6" y2="13" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <Line x1="12" y1="20" x2="12" y2="8" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <Line x1="18" y1="20" x2="18" y2="4" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  );
}

export function RewardsTabIcon({ size = 24, color = '#9CA3AF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M7 4 H17 V9 a5 5 0 0 1 -10 0 Z" stroke={color} strokeWidth={2} strokeLinejoin="round" fill="none" />
      <Path d="M7 5 H4 a0 0 0 0 0 0 0 c0 3 1 4 3 4" stroke={color} strokeWidth={2} fill="none" />
      <Path d="M17 5 H20 c0 3 -1 4 -3 4" stroke={color} strokeWidth={2} fill="none" />
      <Line x1="12" y1="14" x2="12" y2="18" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1="8" y1="20" x2="16" y2="20" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function ProfileTabIcon({ size = 24, color = '#9CA3AF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={2} fill="none" />
      <Path d="M4 21 c0 -4.5 3.5 -7 8 -7 s8 2.5 8 7" stroke={color} strokeWidth={2} strokeLinecap="round" fill="none" />
    </Svg>
  );
}
