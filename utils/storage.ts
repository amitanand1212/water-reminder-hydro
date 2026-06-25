import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USER: 'hydro:user',
  RECORDS: 'hydro:records',
  STREAK: 'hydro:streak',
  XP: 'hydro:xp',
  BADGES: 'hydro:badges',
  SETTINGS: 'hydro:settings',
} as const;

export async function saveToStorage<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadFromStorage<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function clearAllStorage(): Promise<void> {
  const keys = Object.values(STORAGE_KEYS);
  await Promise.all(keys.map((k) => AsyncStorage.removeItem(k)));
}
