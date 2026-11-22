/** Unit helpers. All geometry is converted to CSS pixels at 96 DPI. */

/**
 * SkyOwl patch 2 (21 Nov 2026, docker/deck-render/README.md): lay the slide out at twice CSS-pixel size. The player
 * scales the stage to the window anyway, so it looks the same, but small type stays above a browser's minimum font
 * size: at 1x, 6–8 pt table text is 8–10.7 px before the scale, a browser with "never use font sizes smaller than
 * 12" enlarges it, and the rows grow off the slide. Upstream: 1.
 */
export const LAYOUT_SCALE = Number(globalThis.process?.env?.PPTX2HTML_LAYOUT_SCALE) || 2;
export const EMU_PER_PX = 9525 / LAYOUT_SCALE;
export const EMU_PER_PT = 12700;
export const PX_PER_PT = (96 / 72) * LAYOUT_SCALE;

export const emu2px = (v) => (Number(v) || 0) / EMU_PER_PX;
export const pt2px = (v) => (Number(v) || 0) * PX_PER_PT;
/** DrawingML angle (60000ths of a degree) to degrees. */
export const ang2deg = (v) => (Number(v) || 0) / 60000;
/** DrawingML percentage (1000ths of a percent) to a fraction. */
export const pct = (v, def = 0) => {
  if (v === undefined || v === null || v === '') return def;
  if (typeof v === 'string' && v.endsWith('%')) return parseFloat(v) / 100;
  const n = Number(v);
  return Number.isNaN(n) ? def : n / 100000;
};

/** Round for compact CSS output. */
export function r2(n) {
  if (!Number.isFinite(n)) return 0;
  const v = Math.round(n * 100) / 100;
  return Object.is(v, -0) ? 0 : v;
}

export function r4(n) {
  if (!Number.isFinite(n)) return 0;
  const v = Math.round(n * 10000) / 10000;
  return Object.is(v, -0) ? 0 : v;
}

export const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
