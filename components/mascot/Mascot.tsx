import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Circle, Ellipse, Path, G, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors } from '../../constants/colors';

export type MascotPose = 'idle' | 'drinking' | 'celebrating';
export type MascotCharacter = 'droplet' | 'boy';

interface Props {
  pose?: MascotPose;
  character?: MascotCharacter;
  size?: number;
  style?: ViewStyle;
}

// Friendly water-droplet mascot (smiling, with little arms) — used for tips & onboarding
function WaterDroplet({ size }: { size: number }) {
  return (
    <Svg width={size} height={size * 1.15} viewBox="0 0 100 115">
      <Defs>
        <LinearGradient id="dropFill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={Colors.primaryLight} />
          <Stop offset="1" stopColor={Colors.primary} />
        </LinearGradient>
      </Defs>
      {/* Little arms */}
      <Path d="M16 70 Q4 60 8 50" stroke={Colors.primary} strokeWidth="6" strokeLinecap="round" fill="none" />
      <Path d="M84 70 Q96 60 92 50" stroke={Colors.primary} strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Drop body */}
      <Path
        d="M50 4 C50 4 14 50 14 73 C14 93 30 106 50 106 C70 106 86 93 86 73 C86 50 50 4 50 4 Z"
        fill="url(#dropFill)"
      />
      {/* Shine */}
      <Ellipse cx="36" cy="46" rx="7" ry="13" fill="white" opacity={0.35} transform="rotate(-20, 36, 46)" />
      {/* Eyes */}
      <Circle cx="40" cy="72" r="6" fill="white" />
      <Circle cx="60" cy="72" r="6" fill="white" />
      <Circle cx="41" cy="73" r="3" fill="#1A1A2E" />
      <Circle cx="61" cy="73" r="3" fill="#1A1A2E" />
      <Circle cx="42.5" cy="71.5" r="1" fill="white" />
      <Circle cx="62.5" cy="71.5" r="1" fill="white" />
      {/* Smile */}
      <Path d="M42 84 Q50 92 58 84" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <Ellipse cx="33" cy="82" rx="4" ry="2.5" fill="#FF9CAD" opacity={0.6} />
      <Ellipse cx="67" cy="82" rx="4" ry="2.5" fill="#FF9CAD" opacity={0.6} />
    </Svg>
  );
}

// 3D-style boy drinking from a water bottle
function BoyCharacter({ pose, size }: { pose: MascotPose; size: number }) {
  const skin = '#F2B48C';
  const skinShade = '#E09A6F';
  const hair = '#2B2B33';
  const shorts = '#1A1A22';
  const drinking = pose === 'drinking';
  const celebrating = pose === 'celebrating';

  return (
    <Svg width={size} height={size * 1.7} viewBox="0 0 130 220">
      <Defs>
        <LinearGradient id="shirt" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={Colors.primaryLight} />
          <Stop offset="1" stopColor={Colors.primary} />
        </LinearGradient>
        <LinearGradient id="bottle" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#BBDEFB" stopOpacity={0.9} />
          <Stop offset="0.5" stopColor="#E3F2FD" stopOpacity={0.85} />
          <Stop offset="1" stopColor="#90CAF9" stopOpacity={0.9} />
        </LinearGradient>
      </Defs>

      {/* Legs */}
      <Path d="M52 168 L48 210" stroke={skin} strokeWidth="13" strokeLinecap="round" />
      <Path d="M78 168 L82 210" stroke={skin} strokeWidth="13" strokeLinecap="round" />
      {/* Shorts */}
      <Path d="M44 138 L86 138 L84 172 L70 170 L65 150 L60 170 L46 172 Z" fill={shorts} />
      {/* Shoes */}
      <Path d="M40 208 q-2 8 8 8 l8 0 q4 0 4 -5 l0 -4 z" fill="white" />
      <Path d="M90 208 q2 8 -8 8 l-8 0 q-4 0 -4 -5 l0 -4 z" fill="white" />
      <Path d="M40 213 q-1 4 8 4 l12 0 l0 -2 l-20 0 z" fill={Colors.primary} />
      <Path d="M90 213 q1 4 -8 4 l-12 0 l0 -2 l20 0 z" fill={Colors.primary} />

      {/* Torso - blue shirt */}
      <Path d="M40 100 Q40 86 65 84 Q90 86 90 100 L86 142 L44 142 Z" fill="url(#shirt)" />

      {/* Left arm on hip */}
      <Path d="M44 108 Q26 116 34 134 Q40 140 46 134" stroke="url(#shirt)" strokeWidth="13" strokeLinecap="round" fill="none" />
      <Circle cx="42" cy="135" r="6.5" fill={skin} />

      {/* Celebrating: both arms raised. (Drinking arm is drawn AFTER the face, below.) */}
      {celebrating && (
        <>
          <Path d="M86 104 L104 74" stroke="url(#shirt)" strokeWidth="13" strokeLinecap="round" />
          <Circle cx="106" cy="71" r="7" fill={skin} />
          <Path d="M44 108 L24 80" stroke="url(#shirt)" strokeWidth="13" strokeLinecap="round" />
          <Circle cx="22" cy="77" r="7" fill={skin} />
        </>
      )}
      {/* Idle: right arm resting down at side */}
      {!celebrating && !drinking && (
        <>
          <Path d="M86 106 Q96 124 90 138" stroke="url(#shirt)" strokeWidth="13" strokeLinecap="round" fill="none" />
          <Circle cx="89" cy="139" r="6.5" fill={skin} />
        </>
      )}

      {/* Neck */}
      <Path d="M58 84 L72 84 L70 96 L60 96 Z" fill={skinShade} />

      {/* Head */}
      <Circle cx="65" cy="62" r="30" fill={skin} />
      {/* Ear */}
      <Ellipse cx="37" cy="64" rx="5" ry="7" fill={skinShade} />
      {/* Hair */}
      <Path d="M35 58 C32 30 98 30 95 58 C95 50 92 40 84 36 C88 44 84 48 80 46 C82 40 76 34 68 34 C58 33 48 36 42 44 C40 48 38 52 35 58 Z" fill={hair} />
      <Path d="M35 58 C34 48 40 40 48 38 C42 44 40 52 40 58 Z" fill={hair} />

      {/* Eyes */}
      {drinking ? (
        <>
          {/* closed/content eyes while drinking */}
          <Path d="M50 60 Q54 64 58 60" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <Path d="M70 60 Q74 64 78 60" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <Ellipse cx="55" cy="60" rx="4.5" ry="6" fill="#1A1A2E" />
          <Ellipse cx="74" cy="60" rx="4.5" ry="6" fill="#1A1A2E" />
          <Circle cx="56.5" cy="58" r="1.5" fill="white" />
          <Circle cx="75.5" cy="58" r="1.5" fill="white" />
        </>
      )}
      {/* Eyebrows */}
      <Path d="M49 51 Q55 48 61 51" stroke={hair} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <Path d="M68 51 Q74 48 80 51" stroke={hair} strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Mouth */}
      {drinking ? (
        <Ellipse cx="78" cy="70" rx="4" ry="3" fill="#C76B6B" />
      ) : celebrating ? (
        <Path d="M56 70 Q65 80 74 70" stroke="#C76B6B" strokeWidth="3" fill="#C76B6B" strokeLinecap="round" />
      ) : (
        <Path d="M58 70 Q65 76 72 70" stroke="#C76B6B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}

      {/* Cheeks */}
      <Ellipse cx="49" cy="68" rx="5" ry="3.5" fill="#FF8A80" opacity={0.35} />
      <Ellipse cx="80" cy="68" rx="5" ry="3.5" fill="#FF8A80" opacity={0.35} />

      {/* Drinking: right arm bent up, bottle to the mouth — drawn last so it sits in front of the face */}
      {drinking && (
        <G>
          {/* upper arm: shoulder up to elbow */}
          <Path d="M88 104 Q102 98 100 84" stroke="url(#shirt)" strokeWidth="13" strokeLinecap="round" fill="none" />
          {/* forearm: elbow up to hand at the lips */}
          <Path d="M100 84 Q98 72 88 67" stroke={skin} strokeWidth="11" strokeLinecap="round" fill="none" />
          {/* sleeve cuff */}
          <Circle cx="100" cy="86" r="7.5" fill="url(#shirt)" />
          {/* Bottle — cap points down-left toward the mouth (~80,68) */}
          <G transform="rotate(118, 90, 70)">
            <Rect x="80" y="62" width="20" height="40" rx="9" fill="url(#bottle)" stroke="#90CAF9" strokeWidth="1" />
            {/* cap at the bottom, nearest the lips */}
            <Rect x="86" y="56" width="8" height="9" rx="2" fill="#64B5F6" />
            <Rect x="84" y="72" width="12" height="24" rx="5" fill="#42A5F5" opacity={0.45} />
            <Rect x="82" y="68" width="2.5" height="26" rx="1.2" fill="white" opacity={0.6} />
          </G>
          {/* hand wrapping the bottle */}
          <Circle cx="92" cy="78" r="6.5" fill={skin} />
        </G>
      )}
    </Svg>
  );
}

export function Mascot({ pose = 'idle', character = 'boy', size = 160, style }: Props) {
  if (character === 'droplet') {
    return (
      <View style={[{ width: size, height: size * 1.15, alignItems: 'center', justifyContent: 'center' }, style]}>
        <WaterDroplet size={size} />
      </View>
    );
  }

  return (
    <View style={[{ width: size, height: size * 1.7, alignItems: 'center', justifyContent: 'flex-end' }, style]}>
      <BoyCharacter pose={pose} size={size} />
    </View>
  );
}
