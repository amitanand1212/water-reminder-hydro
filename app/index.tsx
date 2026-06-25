import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useHydrationStore } from '../store/hydrationStore';
import { Colors } from '../constants/colors';

export default function Index() {
  const { user, isLoading } = useHydrationStore();

  useEffect(() => {
    if (!isLoading) {
      if (user?.onboardingComplete) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(onboarding)');
      }
    }
  }, [isLoading, user]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}
