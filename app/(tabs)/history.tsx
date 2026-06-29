import React, { useState } from 'react';
import { fs } from '../../utils/responsive';

import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHydrationStore } from '../../store/hydrationStore';
import { GradientBackground } from '../../components/ui/GradientBackground';
import { WeeklyBarChart } from '../../components/history/WeeklyBarChart';
import { WeeklyStats } from '../../components/history/WeeklyStats';
import { DayRecordRow } from '../../components/history/DayRecord';
import { AdBanner } from '../../components/ui/AdBanner';
import { getWeekDateKeys } from '../../utils/dateHelpers';
import { Colors } from '../../constants/colors';
import { Spacing, BorderRadius } from '../../constants/spacing';

type TabType = 'overview' | 'daily';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { getWeekRecords } = useHydrationStore();

  const weekDateKeys = getWeekDateKeys();
  const weekRecords = getWeekRecords(weekDateKeys);

  const dailyRecords = [...weekRecords].reverse().filter((r) => r !== undefined);

  return (
    <GradientBackground colors={[Colors.background, '#EBF5FF']}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>History 📊</Text>
          </View>

          {/* Tab pills */}
          <View style={styles.tabs}>
            {([['overview', 'Weekly Overview'], ['daily', 'Daily History']] as const).map(([key, label]) => (
              <TouchableOpacity
                key={key}
                style={[styles.tab, activeTab === key && styles.tabActive]}
                onPress={() => setActiveTab(key)}
              >
                <Text style={[styles.tabText, activeTab === key && styles.tabTextActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'overview' && (
            <>
              <WeeklyStats records={weekRecords} />
              <View style={styles.chartSection}>
                <Text style={styles.sectionTitle}>This Week</Text>
                <WeeklyBarChart records={weekRecords} dateKeys={weekDateKeys} />
              </View>
            </>
          )}

          {activeTab === 'daily' && (
            <View style={styles.dailyList}>
              <Text style={styles.sectionTitle}>Daily Records</Text>
              {dailyRecords.length === 0 ? (
                <View style={styles.empty}>
                  <Text style={styles.emptyIcon}>💧</Text>
                  <Text style={styles.emptyText}>No records yet. Start drinking!</Text>
                </View>
              ) : (
                dailyRecords.map((r) => <DayRecordRow key={r.dateKey} record={r} />)
              )}
            </View>
          )}
        </ScrollView>

        {/* Banner ad pinned above the tab bar */}
        <AdBanner />
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: fs(24), fontWeight: '800', color: Colors.textPrimary },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.pill,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: BorderRadius.pill,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: fs(13), fontWeight: '600', color: Colors.textSecondary },
  tabTextActive: { color: '#fff' },
  chartSection: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: { fontSize: fs(16), fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.sm },
  dailyList: { gap: 0 },
  empty: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyIcon: { fontSize: fs(48) },
  emptyText: { fontSize: fs(14), color: Colors.textSecondary },
});
