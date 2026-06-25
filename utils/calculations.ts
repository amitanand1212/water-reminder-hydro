export function goalFromWeightKg(weightKg: number): number {
  const rawMl = weightKg * 33;
  return Math.round(rawMl / 100) * 100;
}

export function lbToKg(lb: number): number {
  return Math.round(lb * 0.453592 * 10) / 10;
}

export function kgToLb(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10;
}

export function mlToLitres(ml: number): string {
  return (ml / 1000).toFixed(1);
}

export function percentComplete(totalMl: number, goalMl: number): number {
  if (goalMl === 0) return 0;
  return Math.min(Math.round((totalMl / goalMl) * 100), 100);
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}
