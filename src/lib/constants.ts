/**
 * @file constants.ts
 * @description Global constants for OpenGHG.
 */

// ─────────────────────────────────────────────
// Colours
// ─────────────────────────────────────────────

export const COLORS = {
  greenDeep:     "#2D5C3F",  // primary
  greenElectric: "#C8F135",  // primary accent
  black:         "#1E1E1E",  // dark
  magenta:       "#B04F9D",  // secondary accent
  sage:          "#D4E0D8",  // light
  slate:         "#8A9EAA",  // muted
  lavender:      "#C4A0D4",  // tertiary accent
  red:           "#E82E57",  // alerts, errors, warnings
  white:         "#ffffff",  // background
} as const;

export type ColorKey = keyof typeof COLORS;
export type ColorValue = typeof COLORS[ColorKey];

// ─────────────────────────────────────────────
// Chart colours
// ─────────────────────────────────────────────

export const SCOPE_COLORS: [string, string, string] = [
  COLORS.greenDeep,            // Scope 1
  COLORS.magenta,             // Scope 2
  COLORS.greenElectric,      // Scope 3
];

// ─────────────────────────────────────────────
// App config
// ─────────────────────────────────────────────

export const SUPPORTED_LOCALES = ["en", "de", "fr"] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: Locale = "en";

export const SCOPES = [1, 2, 3, "L"] as const;
export type Scope = typeof SCOPES[number];

export const DATA_QUALITY = {
  HIGH:   1,
  MEDIUM: 2,
  LOW:    3,
} as const;
export type DataQuality = typeof DATA_QUALITY[keyof typeof DATA_QUALITY];

export const FONTS = {
  heading: "var(--font-unbounded)",
  body:    "var(--font-geist)",
  mono:    "var(--font-geist-mono)",
} as const;