/**
 * @file styles.ts
 * @description Shared inline style objects for OpenGHG.
 *
 * Font system:
 *   --font-unbounded  → titles, headings, display text
 *   --font-geist      → body, UI, labels, buttons
 *   --font-geist-mono → all quantitative / data / numbers
 *
 * @usage
 * import { inputStyle, labelStyle } from "@/lib/styles"
 */

import type { CSSProperties } from "react";
import { COLORS } from "./constants";

// ─────────────────────────────────────────────
// Typography — headings (Unbounded)
// ─────────────────────────────────────────────

/** Large display heading — Unbounded 900, page titles */
export const headingStyle: CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontWeight: 900,
  fontSize: "52px",
  lineHeight: 1.02,
  color: COLORS.black,
  letterSpacing: "-2.5px",
  marginBottom: "24px",
};

/** Mid-size section heading — Unbounded 700 */
export const subheadingStyle: CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontWeight: 700,
  fontSize: "34px",
  lineHeight: 1.08,
  color: COLORS.black,
  letterSpacing: "-1.5px",
  marginBottom: "16px",
};

// ─────────────────────────────────────────────
// Typography — body (Geist)
// ─────────────────────────────────────────────

/**
 * Eyebrow label — small uppercase text above headings.
 * Geist 500, wide tracking.
 */
export const eyebrowStyle: CSSProperties = {
  fontFamily: "var(--font-geist)",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "2.5px",
  color: COLORS.greenDeep,
  textTransform: "uppercase",
  marginBottom: "24px",
};

/** Body text — Geist 300, muted */
export const bodyStyle: CSSProperties = {
  fontFamily: "var(--font-geist)",
  fontSize: "15px",
  color: COLORS.black,
  opacity: 0.45,
  lineHeight: 1.75,
  fontWeight: 300,
};

/** Small muted text — captions, footnotes */
export const mutedTextStyle: CSSProperties = {
  fontFamily: "var(--font-geist)",
  fontSize: "13px",
  color: COLORS.black,
  opacity: 0.45,
  lineHeight: 1.6,
};

// ─────────────────────────────────────────────
// Typography — data / quantitative (Geist Mono)
// ─────────────────────────────────────────────

/** Large data figure — tCO2e totals, big numbers in results */
export const dataLargeStyle: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 400,
  fontSize: "40px",
  color: COLORS.black,
  letterSpacing: "-1px",
  lineHeight: 1,
};

/** Medium data figure — scope subtotals, table values */
export const dataMediumStyle: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 400,
  fontSize: "20px",
  color: COLORS.black,
  lineHeight: 1.2,
};

/** Small data figure — table cells, legend values */
export const dataSmallStyle: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 300,
  fontSize: "13px",
  color: COLORS.black,
  lineHeight: 1.4,
};

/** Data unit label — "tCO2e", "kWh", "%" etc. */
export const dataUnitStyle: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 300,
  fontSize: "13px",
  color: COLORS.black,
  opacity: 0.4,
};

// ─────────────────────────────────────────────
// Form elements
// ─────────────────────────────────────────────

/** Standard input / select field */
export const inputStyle: CSSProperties = {
  width: "100%",
  background: "rgba(0,0,0,0.06)",
  border: "0.5px solid rgba(0,0,0,0.12)",
  borderRadius: "8px",
  padding: "11px 14px",
  color: COLORS.black,
  fontSize: "14px",
  fontFamily: "var(--font-geist)",
  outline: "none",
  appearance: "none",
};

/** Form field label */
export const labelStyle: CSSProperties = {
  fontSize: "12px",
  color: COLORS.black,
  opacity: 0.55,
  marginBottom: "6px",
  display: "block",
  fontFamily: "var(--font-geist)",
};

// ─────────────────────────────────────────────
// Buttons
// ─────────────────────────────────────────────

/** Primary CTA — dark green with electric lime text */
export const buttonPrimaryStyle: CSSProperties = {
  background: COLORS.greenDeep,
  color: COLORS.greenElectric,
  padding: "14px 28px",
  borderRadius: "100px",
  fontSize: "14px",
  fontWeight: 500,
  border: "none",
  cursor: "pointer",
  fontFamily: "var(--font-geist)",
};

/** Secondary button — outlined */
export const buttonSecondaryStyle: CSSProperties = {
  background: "transparent",
  color: COLORS.black,
  padding: "14px 28px",
  borderRadius: "100px",
  fontSize: "14px",
  fontWeight: 500,
  border: `0.5px solid ${COLORS.black}`,
  cursor: "pointer",
  fontFamily: "var(--font-geist)",
};

// ─────────────────────────────────────────────
// Cards
// ─────────────────────────────────────────────

/** Standard content card */
export const cardStyle: CSSProperties = {
  background: COLORS.white,
  borderRadius: "16px",
  border: `0.5px solid ${COLORS.sage}`,
  padding: "32px",
};

// ─────────────────────────────────────────────
// Section containers
// ─────────────────────────────────────────────

export const sectionStyle: CSSProperties = {
  padding: "120px 40px",
};

export const sectionDarkStyle: CSSProperties = {
  padding: "120px 40px",
  background: COLORS.black,
};

export const sectionSageStyle: CSSProperties = {
  padding: "120px 40px",
  background: COLORS.sage,
};

export const sectionGreenStyle: CSSProperties = {
  padding: "120px 40px",
  background: COLORS.greenDeep,
};