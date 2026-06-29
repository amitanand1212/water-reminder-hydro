import React from 'react';
import { fs } from '../../utils/responsive';

import { View, Text, StyleSheet } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';

// ── AdMob configuration ──────────────────────────────────────────────────
// Keep this `false` during development AND closed testing — we serve Google's
// TEST ads so we never show real ads to ourselves/testers. Viewing or clicking
// your own REAL ads counts as invalid traffic and can get the AdMob account
// banned.
//
// To go live (production Play Store release) do BOTH:
//   1. Paste your real banner Ad Unit ID into REAL_BANNER_AD_UNIT_ID below.
//   2. Replace the test `androidAppId` in app.json with your real AdMob App ID.
//   3. Set USE_REAL_ADS = true.
//
// Even with USE_REAL_ADS = true, dev builds (__DEV__) still serve Google's TEST
// ads — only production release builds show your real ads. This protects the
// AdMob account from invalid-traffic strikes while you develop/test.
const USE_REAL_ADS = true;

// Your real AdMob banner Ad Unit ID — "Main Banner" (looks like
// 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY'):
const REAL_BANNER_AD_UNIT_ID = 'ca-app-pub-7760368408975742/7161821631';
// ─────────────────────────────────────────────────────────────────────────

// AdMob is a native module that is NOT available in Expo Go — importing it
// there crashes the app. We only require it in a real/dev build.
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export function AdBanner() {
  if (isExpoGo) {
    // Placeholder so the layout still reserves space while testing in Expo Go.
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Ad banner (visible in a dev build)</Text>
      </View>
    );
  }

  // Lazy-require keeps the native module out of the Expo Go JS bundle path.
  const {
    BannerAd,
    BannerAdSize,
    TestIds,
  } = require('react-native-google-mobile-ads');

  // Serve real ads only in a production build with USE_REAL_ADS enabled.
  // Dev builds always fall back to Google's official TEST unit.
  const adUnitId = USE_REAL_ADS && !__DEV__ ? REAL_BANNER_AD_UNIT_ID : TestIds.BANNER;

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  placeholderText: {
    fontSize: fs(11),
    color: '#9CA3AF',
  },
});
