import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter';
import { useHydrationStore } from '../store/hydrationStore';
import { configureNotificationHandler } from '../utils/notifications';
import { recordAppUsage, maybeAskForRating } from '../utils/rating';
import { initializeAdsWithConsent } from '../utils/ads';

SplashScreen.preventAutoHideAsync();
configureNotificationHandler();

export default function RootLayout() {
  const initStore = useHydrationStore((s) => s.initStore);
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    initStore();
    // Gather ad consent (UMP) and initialize the Mobile Ads SDK. No-op in Expo Go.
    initializeAdsWithConsent();
    // Track usage and, once the user has used the app on 3+ days,
    // gently ask for a rating shortly after opening.
    recordAppUsage().then(() => {
      setTimeout(() => {
        maybeAskForRating();
      }, 2500);
    });
  }, []);

  // When the user taps a reminder notification, take them to the home tab
  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      router.navigate('/(tabs)');
    }
  }, [lastNotificationResponse]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="modal/drinking"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="legal/privacy" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="legal/about" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </>
  );
}
