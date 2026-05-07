// ── Colours ──

export const COLORS = {
  // surface
  text:      "#0E1520",
  page:      "#F0F2F5",
  base:      "#1C2432",
  border:    "#3D4E68",
  textMuted: "#8A9AB8",

  // accent
  volt:      "#C8F135",
  voltLight: "#DCF56A",
  voltTint:  "#EEF9B0",

  // scopes
  scope1: "#1E2060",
  scope2: "#818CF8",
  scope3: "#DCF56A",

  // status
  accentOrange: "#ff8147",
  accentPurple: "#c092ff",
  danger:       "#E82E48",

  // misc
  sage:         "#D4E0D8",
  blue:         "#6366E8",
  blueMedium:   "#4F52D8",
  blueDark:     "#3B3EC8",
  blueVeryDark: "#2728A8",

  // NOTE: these diverge from --black (#0E1520) and --white (#f0f2f5) in globals.css
  black: "#1E1E1E",
  white: "#FFFFFF",
} as const;

export type ColorKey   = keyof typeof COLORS;
export type ColorValue = typeof COLORS[ColorKey];

export const SCOPE_COLORS: [string, string, string] = [
  COLORS.scope1,
  COLORS.scope2,
  COLORS.scope3,
];

// ── App config ──

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
