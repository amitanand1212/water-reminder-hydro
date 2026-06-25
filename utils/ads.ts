import Constants, { ExecutionEnvironment } from 'expo-constants';

// AdMob is a native module that is NOT available in Expo Go — touching it there
// crashes the app. We only ever require it in a real/dev build.
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let initialized = false;

/**
 * Gathers user consent via Google's UMP (User Messaging Platform) SDK, then
 * initializes the Mobile Ads SDK.
 *
 * Google requires a consent mechanism before serving ads to users in the
 * EEA/UK. `gatherConsent()` shows a consent form only when one is required and
 * available; for users outside those regions it resolves immediately without
 * showing anything. Ads are initialized afterwards regardless — when consent is
 * not granted/required, ads are still served as non-personalized.
 *
 * Safe to call more than once; the actual work runs only on the first call.
 */
export async function initializeAdsWithConsent(): Promise<void> {
  if (isExpoGo || initialized) return;
  initialized = true;

  // Lazy-require keeps the native module out of the Expo Go JS bundle path.
  const mobileAds = require('react-native-google-mobile-ads').default;
  const { AdsConsent } = require('react-native-google-mobile-ads');

  try {
    // Requests the latest consent info and presents the consent form if the
    // UMP SDK decides one is required (EEA/UK users).
    await AdsConsent.gatherConsent();
  } catch (e) {
    // If consent gathering fails (e.g. no network), continue anyway — the SDK
    // falls back to non-personalized ads.
    console.warn('[ads] consent flow failed', e);
  }

  try {
    await mobileAds().initialize();
  } catch (e) {
    console.warn('[ads] initialize failed', e);
  }
}
