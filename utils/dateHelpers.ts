import { format, subDays, startOfWeek, addDays } from 'date-fns';

export function todayKey(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function yesterdayKey(): string {
  return format(subDays(new Date(), 1), 'yyyy-MM-dd');
}

export function dateKeyToDate(key: string): Date {
  return new Date(key + 'T00:00:00');
}

export function formatDisplayDate(dateKey: string): string {
  const d = dateKeyToDate(dateKey);
  return format(d, 'MMM d, yyyy');
}

export function formatShortDay(dateKey: string): string {
  const d = dateKeyToDate(dateKey);
  return format(d, 'EEE');
}

export function getWeekDateKeys(referenceDate: Date = new Date()): string[] {
  const start = startOfWeek(referenceDate, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => format(addDays(start, i), 'yyyy-MM-dd'));
}

export function isToday(dateKey: string): boolean {
  return dateKey === todayKey();
}
