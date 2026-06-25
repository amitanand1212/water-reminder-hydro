import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform, Linking } from 'react-native';
import * as StoreReview from 'expo-store-review';
import { format } from 'date-fns';

// Stored separately from app data so it survives a "Log Out" / reset —
// once a user has rated, we should never ask again.
const RATING_KEY = 'hydro:rating';

// How many distinct days of usage before the first prompt.
const DAYS_BEFORE_PROMPT = 3;
// If the user skips, wait this many days before asking again.
const DAYS_BETWEEN_PROMPTS = 3;

interface RatingState {
  usageDays: string[]; // distinct yyyy-MM-dd the app was opened
  hasRated: boolean; // user accepted the review flow — never ask again
  lastPromptDateKey: string | null; // last day we showed the prompt
}

const DEFAULT_STATE: RatingState = {
  usageDays: [],
  hasRated: false,
  lastPromptDateKey: null,
};

async function loadState(): Promise<RatingState> {
  try {
    const raw = await AsyncStorage.getItem(RATING_KEY);
    return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

async function saveState(state: RatingState): Promise<void> {
  try {
    await AsyncStorage.setItem(RATING_KEY, JSON.stringify(state));
  } catch {
    // ignore storage failures — rating is non-critical
  }
}

function daysBetween(fromKey: string, toKey: string): number {
  const from = new Date(fromKey + 'T00:00:00').getTime();
  const to = new Date(toKey + 'T00:00:00').getTime();
  return Math.round((to - from) / (1000 * 60 * 60 * 24));
}

/**
 * Record that the app was used today. Call once on app launch.
 * Tracks distinct days so the 3-day rule counts real days, not sessions.
 */
export async function recordAppUsage(): Promise<void> {
  const today = format(new Date(), 'yyyy-MM-dd');
  const state = await loadState();
  if (!state.usageDays.includes(today)) {
    state.usageDays = [...state.usageDays, today].slice(-14); // keep it small
    await saveState(state);
  }
}

/**
 * Decide whether the rate prompt should be shown right now.
 */
async function shouldPrompt(): Promise<boolean> {
  const state = await loadState();

  if (state.hasRated) return false; // already rated → never again
  if (state.usageDays.length < DAYS_BEFORE_PROMPT) return false; // not enough usage

  if (state.lastPromptDateKey) {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (daysBetween(state.lastPromptDateKey, today) < DAYS_BETWEEN_PROMPTS) {
      return false; // skipped recently → wait
    }
  }

  return true;
}

async function openStoreReview(): Promise<void> {
  try {
    if (await StoreReview.isAvailableAsync()) {
      await StoreReview.requestReview();
      return;
    }
  } catch {
    // fall through to manual store link
  }
  const url = StoreReview.storeUrl();
  if (url) {
    Linking.openURL(url).catch(() => {});
  }
}

/**
 * Show a friendly custom dialog, and only trigger the native review flow
 * if the user is happy. Call after a positive moment (app open, water logged).
 * Safe to call often — it self-gates with the 3-day / skip / rated rules.
 */
export async function maybeAskForRating(): Promise<void> {
  if (!(await shouldPrompt())) return;

  const today = format(new Date(), 'yyyy-MM-dd');

  // Mark that we prompted today regardless of the answer, so we don't re-ask
  // within the same day or before the cooldown.
  const state = await loadState();
  state.lastPromptDateKey = today;
  await saveState(state);

  Alert.alert(
    'Enjoying Hydro? 💙',
    "You've been staying hydrated for a few days! Would you mind leaving us a quick rating?",
    [
      {
        text: 'Not now',
        style: 'cancel',
        // lastPromptDateKey already set → will ask again after the cooldown
      },
      {
        text: 'Rate Hydro ⭐',
        onPress: async () => {
          const s = await loadState();
          s.hasRated = true; // user agreed → don't ask again
          await saveState(s);
          await openStoreReview();
        },
      },
    ],
    { cancelable: true }
  );
}
