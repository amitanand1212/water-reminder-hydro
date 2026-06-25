import * as Notifications from 'expo-notifications';
import { NotificationSettings } from '../types';

const NOTIFICATION_MESSAGES = [
  '💧 Time to drink water!',
  '💧 Your body needs hydration.',
  '💧 One glass now, thank yourself later.',
  '💧 Stay on track with your daily goal!',
  '💧 You\'re one sip closer to your goal.',
  '💧 Hydration check! How much today?',
];

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleHydrationNotifications(settings: NotificationSettings): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (!settings.enabled) return;

  let index = 0;
  for (let h = settings.startHour; h < settings.endHour; h += settings.intervalHours) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hydro',
        body: NOTIFICATION_MESSAGES[index % NOTIFICATION_MESSAGES.length],
        sound: true,
        data: { screen: 'home' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: h,
        minute: 0,
      },
    });
    index++;
  }
}

export function configureNotificationHandler(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}
