import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  withDelay,
  useAnimatedStyle,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { maybeAskForRating } from '../../utils/rating';
import { useHydrationStore } from '../../store/hydrationStore';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { mlToLitres, percentComplete } from '../../utils/calculations';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Spacing, BorderRadius } from '../../constants/spacing';
import { fs, imageSize } from '../../utils/responsive';

type Phase = 0 | 1 | 2;

export default function DrinkingModal() {
  const { amount: amountParam } = useLocalSearchParams<{ amount: string }>();
  const amount = parseInt(amountParam ?? '250', 10);
  const insets = useSafeAreaInsets();

  const { getTodayRecord, addWater, streak, xp } = useHydrationStore();
  const todayRecord = getTodayRecord();

  const [phase, setPhase] = useState<Phase>(0);
  const [drinkProgress, setDrinkProgress] = useState(0);
  const savedRef = useRef(false);
  const exitedRef = useRef(false);

  const currentPct = percentComplete(todayRecord.totalMl, todayRecord.goalMl);
  const newTotalMl = todayRecord.totalMl + amount;
  const newPct = percentComplete(newTotalMl, todayRecord.goalMl);

  // Animations
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);
  const cardScale = useSharedValue(0.95);
  const statsOpacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withSpring(0, { damping: 18, stiffness: 200 });
    cardScale.value = withSpring(1, { damping: 14 });
  }, []);

  useEffect(() => {
    if (phase === 1) {
      // Animate drink progress bar
      let p = 0;
      const interval = setInterval(() => {
        p += 0.04;
        setDrinkProgress(Math.min(p, 1));
        if (p >= 1) {
          clearInterval(interval);
          setTimeout(() => setPhase(2), 400);
        }
      }, 80);
      return () => clearInterval(interval);
    }
    if (phase === 2) {
      statsOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
      // Save the intake as soon as the success screen appears, then head Home
      // automatically after 2.5s — tapping "Awesome!" is optional.
      if (!savedRef.current) {
        savedRef.current = true;
        addWater(amount);
      }
      const timer = setTimeout(saveAndExit, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const statsStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
    transform: [{ translateY: (1 - statsOpacity.value) * 20 }],
  }));

  const handleClose = () => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    router.back();
  };

  const handleStart = () => {
    setPhase(1);
  };

  // Save the intake (once) and return Home. Runs automatically 1s after the
  // "Great Job" screen; the "Awesome!" button just triggers it sooner — so
  // tapping is fully optional and the data is saved either way.
  const saveAndExit = () => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    if (!savedRef.current) {
      savedRef.current = true;
      addWater(amount);
    }
    router.back();
    // After a positive moment, gently ask for a rating (self-gated by the
    // 3-day / skip / already-rated rules).
    setTimeout(() => {
      maybeAskForRating();
    }, 600);
  };

  const bubbles = [
    { top: '10%', left: '15%', size: 12 },
    { top: '20%', right: '10%', size: 8 },
    { top: '35%', left: '8%', size: 16 },
    { top: '15%', right: '25%', size: 10 },
    { top: '50%', left: '5%', size: 8 },
  ];

  return (
    <LinearGradient
      colors={[Colors.background, '#D6EEFF', Colors.background]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.2, y: 1 }}
    >
      <View style={styles.safe}>
        {/* Floating bubbles */}
        {bubbles.map((b, i) => (
          <View
            key={i}
            style={[
              styles.bubble,
              {
                width: b.size,
                height: b.size,
                top: b.top as any,
                left: b.left as any,
                right: b.right as any,
              },
            ]}
          />
        ))}

        {/* Close button */}
        <TouchableOpacity
          style={[styles.closeBtn, { top: insets.top + Spacing.sm }]}
          onPress={handleClose}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <Animated.ScrollView
          style={[styles.scroll, containerStyle]}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + Spacing.xxl, paddingBottom: insets.bottom + Spacing.lg },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {phase === 0 && (
            <View style={styles.phaseContainer}>
              <Text style={styles.phaseTitle}>Hydration Time 💧</Text>

              <ProgressRing percentage={currentPct} size={100} strokeWidth={8}>
                <Text style={styles.smallPct}>{currentPct}%</Text>
              </ProgressRing>

              <Image
                source={require('../../assets/ready to drink and done image.png')}
                style={styles.mascotImage}
                resizeMode="contain"
              />

              <Animated.View style={[cardStyle]}>
                <Card style={styles.infoCard} padding={20}>
                  <Text style={styles.readyTitle}>Ready to drink!</Text>
                  <Text style={styles.readySub}>Drink water and stay healthy 💙</Text>
                  <View style={styles.amountChip}>
                    <Text style={styles.amountChipText}>+{amount}ml</Text>
                  </View>
                </Card>
              </Animated.View>

              <Button label="1. Start Drinking 💧" onPress={handleStart} style={styles.cta} />
            </View>
          )}

          {phase === 1 && (
            <View style={styles.phaseContainer}>
              <Text style={styles.phaseTitle}>Hydration Time 💧</Text>

              <Image
                source={require('../../assets/mascot-drinking.png')}
                style={styles.mascotImage}
                resizeMode="contain"
              />

              <Card style={styles.infoCard} padding={20}>
                <Text style={styles.drinkingTitle}>Drinking Water...</Text>
                <Text style={styles.drinkingSub}>Please wait a moment</Text>
                <ProgressBar
                  progress={drinkProgress}
                  height={10}
                  fillColor={Colors.primary}
                  style={styles.drinkBar}
                />
                <View style={styles.amountChip}>
                  <Text style={styles.amountIcon}>🥛</Text>
                  <Text style={styles.amountChipText}>+{amount}ml</Text>
                </View>
              </Card>

              <Text style={styles.quote}>
                "Every sip you take, brings you closer to a healthier you! 💙"
              </Text>
            </View>
          )}

          {phase === 2 && (
            <View style={styles.phaseContainer}>
              {/* Confetti emojis */}
              <View style={StyleSheet.absoluteFill} pointerEvents="none">
                {['🎉', '✨', '🎊', '💧', '⭐', '🎈'].map((emoji, i) => (
                  <Text
                    key={i}
                    style={[
                      styles.confetti,
                      {
                        top: `${10 + i * 12}%`,
                        left: `${5 + (i % 3) * 35}%`,
                        fontSize: fs(18) + (i % 3) * 6,
                        opacity: 0.7,
                      } as any,
                    ]}
                  >
                    {emoji}
                  </Text>
                ))}
              </View>

              <Text style={styles.greatJobTitle}>Great Job! 🎉</Text>
              <Text style={styles.greatJobSub}>Water Intake Added</Text>

              <Image
                source={require('../../assets/ready to drink and done image.png')}
                style={styles.mascotImage}
                resizeMode="contain"
              />

              <Card style={styles.infoCard} padding={16}>
                <View style={styles.addedRow}>
                  <Text style={styles.dropIcon}>💧</Text>
                  <View>
                    <Text style={styles.addedAmount}>+{amount}ml Added!</Text>
                    <Text style={styles.addedSub}>Keep it up, you're doing amazing! 💙</Text>
                  </View>
                </View>

                <View style={styles.progressSection}>
                  <ProgressRing percentage={newPct} size={80} strokeWidth={8}>
                    <Text style={{ fontSize: fs(14), fontWeight: '800', color: Colors.primary }}>{newPct}%</Text>
                  </ProgressRing>
                  <View style={styles.progressText}>
                    <Text style={styles.progressLabel}>Today's Progress</Text>
                    <Text style={styles.progressValue}>
                      {mlToLitres(newTotalMl)}L / {mlToLitres(todayRecord.goalMl)}L
                    </Text>
                    <Text style={styles.remaining}>
                      Remaining: {mlToLitres(Math.max(0, todayRecord.goalMl - newTotalMl))}L
                    </Text>
                  </View>
                </View>
              </Card>

              <Animated.View style={[styles.statsRow, statsStyle]}>
                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>🥛</Text>
                  <Text style={styles.statValue}>{todayRecord.entries.length + 1}</Text>
                  <Text style={styles.statLabel}>Glasses Today</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>🔥</Text>
                  <Text style={styles.statValue}>{streak.currentStreak}</Text>
                  <Text style={styles.statLabel}>Day Streak</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>⭐</Text>
                  <Text style={styles.statValue}>+{Math.round((amount / 250) * 10)}</Text>
                  <Text style={styles.statLabel}>XP Earned</Text>
                </View>
              </Animated.View>

              <Button label="Awesome! →" onPress={saveAndExit} style={styles.cta} />
            </View>
          )}
        </Animated.ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  closeBtn: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.textPrimary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { fontSize: fs(16), color: Colors.textSecondary, fontWeight: '700' },
  bubble: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: `${Colors.primary}20`,
  },
  scroll: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
  },
  phaseContainer: {
    flexGrow: 1,
    alignItems: 'center',
    gap: Spacing.md,
  },
  phaseTitle: {
    fontSize: fs(20),
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  mascot: { marginVertical: Spacing.sm },
  mascotImage: {
    ...imageSize(325, 375),
    marginVertical: Spacing.sm,
  },
  infoCard: { width: '100%' },
  readyTitle: {
    fontSize: fs(18),
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  readySub: {
    fontSize: fs(13),
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
  },
  amountChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.primary}15`,
    borderRadius: BorderRadius.pill,
    paddingVertical: 6,
    paddingHorizontal: 16,
    gap: 6,
    alignSelf: 'center',
  },
  amountChipText: { fontSize: fs(16), fontWeight: '700', color: Colors.primary },
  amountIcon: { fontSize: fs(18) },
  drinkingTitle: { fontSize: fs(18), fontWeight: '700', color: Colors.textPrimary, textAlign: 'center', marginBottom: 4 },
  drinkingSub: { fontSize: fs(13), color: Colors.textSecondary, textAlign: 'center', marginBottom: 12 },
  drinkBar: { marginBottom: 12 },
  quote: {
    fontSize: fs(13),
    color: Colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
    lineHeight: fs(20),
  },
  greatJobTitle: { fontSize: fs(24), fontWeight: '800', color: Colors.textPrimary, marginTop: Spacing.lg },
  greatJobSub: { fontSize: fs(14), color: Colors.textSecondary },
  addedRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  dropIcon: { fontSize: fs(32) },
  addedAmount: { fontSize: fs(18), fontWeight: '800', color: Colors.primary },
  addedSub: { fontSize: fs(12), color: Colors.textSecondary },
  progressSection: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  progressText: { flex: 1, gap: 4 },
  progressLabel: { fontSize: fs(12), color: Colors.textSecondary },
  progressValue: { fontSize: fs(18), fontWeight: '700', color: Colors.primary },
  remaining: { fontSize: fs(12), color: Colors.textSecondary },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statIcon: { fontSize: fs(22) },
  statValue: { fontSize: fs(18), fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: fs(10), color: Colors.textSecondary, textAlign: 'center' },
  statDivider: { width: 1, height: 40, backgroundColor: Colors.border },
  confetti: { position: 'absolute' },
  cta: { width: '100%', marginTop: 'auto' as any, marginBottom: Spacing.lg },
  smallPct: { fontSize: fs(14), fontWeight: '700', color: Colors.primary },
});
