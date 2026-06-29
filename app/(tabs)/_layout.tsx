import React from 'react';
import { fs } from '../../utils/responsive';

import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Shadow } from '../../constants/spacing';
import {
  HomeTabIcon,
  HistoryTabIcon,
  RewardsTabIcon,
  ProfileTabIcon,
} from '../../components/ui/Icons';

type IconComponent = (props: { size?: number; color?: string; fill?: string }) => React.JSX.Element;

interface TabIconProps {
  Icon: IconComponent;
  label: string;
  focused: boolean;
  filled?: boolean;
}

function TabIcon({ Icon, label, focused, filled }: TabIconProps) {
  const color = focused ? Colors.primary : Colors.textTertiary;
  return (
    <View style={styles.tab}>
      <View style={[styles.iconPill, focused && styles.iconPillActive]}>
        <Icon size={22} color={color} fill={focused && filled ? `${Colors.primary}22` : 'none'} />
      </View>
      <Text style={[styles.label, focused && styles.labelFocused]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Edge-to-edge is on by default (SDK 54), so the app draws behind the
        // Android navigation bar. Reserve the bottom inset so 3-button nav never
        // overlaps the tab icons/labels (gesture nav reports ~0 and stays compact).
        tabBarStyle: [
          styles.tabBar,
          { height: 60 + insets.bottom, paddingBottom: insets.bottom },
        ],
        tabBarShowLabel: false,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={HomeTabIcon} label="Home" focused={focused} filled />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={HistoryTabIcon} label="History" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={RewardsTabIcon} label="Rewards" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={ProfileTabIcon} label="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 0,
    paddingTop: 8,
    ...Shadow.lg,
  },
  tabItem: {
    height: '100%',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    width: 72,
  },
  iconPill: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 14,
  },
  iconPillActive: {
    backgroundColor: `${Colors.primary}14`,
  },
  label: {
    fontSize: fs(11),
    color: Colors.textTertiary,
    fontWeight: '500',
  },
  labelFocused: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
