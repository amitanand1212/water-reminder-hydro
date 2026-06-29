import { Dimensions } from 'react-native';

/**
 * Proportional scaling so the UI fits every phone, not just the device it was
 * designed on (Motorola Edge 50 Fusion, logical ~393 × 873 dp).
 *
 * React Native `dp` units are density-independent but NOT screen-size
 * independent — a fixed 220dp image is a different *fraction* of the screen on
 * a narrow 360dp phone than on a wide 412dp one. These helpers re-express fixed
 * sizes relative to a base device so they shrink on smaller screens (and grow,
 * gently, on larger ones).
 *
 * The app is locked to portrait (see app.json), so width is always the short
 * edge — these values are read once at module load and never go stale.
 *
 * TUNING: If the design device itself looks slightly off after this change, log
 * `Dimensions.get('window')` on that device and set BASE_WIDTH / BASE_HEIGHT to
 * the printed values so the scale factor there becomes exactly 1 (no change).
 */
const BASE_WIDTH = 393;
const BASE_HEIGHT = 873;

const { width, height } = Dimensions.get('window');
const shortDim = Math.min(width, height);
const longDim = Math.max(width, height);

/** Live window width (short edge in portrait). Handy for fraction-based layout. */
export const screenWidth = shortDim;
export const screenHeight = longDim;

/** Scale a horizontal size proportionally to screen width. */
export const scale = (size: number) => (shortDim / BASE_WIDTH) * size;

/** Scale a vertical size proportionally to screen height. */
export const verticalScale = (size: number) => (longDim / BASE_HEIGHT) * size;

/**
 * Softer scaling — moves only `factor` of the way toward the fully-scaled
 * value. Good for fonts/spacing so small screens shrink gently instead of
 * collapsing.
 */
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/**
 * Font size that shrinks gently on screens narrower than the base device but
 * never grows beyond the original (keeps the design device — the widest common
 * phone — exactly as drawn, just makes smaller phones fit). Mirrors the
 * shrink-only behaviour of `imageSize` and the home hero so nothing on the
 * design device changes even if BASE_WIDTH is estimated slightly low.
 */
export const fs = (size: number) => Math.round(Math.min(size, moderateScale(size, 0.5)));

/**
 * Size for a fixed-dimension image. Scales DOWN on screens narrower than the
 * base device (prevents overflow/clipping) but never grows beyond the original
 * design size, so wider phones keep the intended look. Aspect ratio preserved.
 */
export const imageSize = (w: number, h: number) => {
  const factor = Math.min(shortDim / BASE_WIDTH, 1);
  return { width: Math.round(w * factor), height: Math.round(h * factor) };
};
