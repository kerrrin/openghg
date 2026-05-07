// Font system:
//   --font-unbounded  → headings, display
//   --font-geist      → body, UI, labels
//   --font-geist-mono → data, numbers, code

import type { CSSProperties } from "react";
import { COLORS } from "./constants";

// ── Typography ──

export const headingStyle: CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontWeight: 900,
  fontSize: "52px",
  lineHeight: 1.02,
  letterSpacing: "-2.5px",
  color: COLORS.black,
  marginBottom: "24px",
};

export const subheadingStyle: CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontWeight: 700,
  fontSize: "34px",
  lineHeight: 1.08,
  letterSpacing: "-1.5px",
  color: COLORS.black,
  marginBottom: "16px",
};

export const eyebrowStyle: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 500,
  fontSize: "11px",
  letterSpacing: "2.5px",
  color: COLORS.text,
  textTransform: "uppercase",
  marginBottom: "24px",
};

export const bodyStyle: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 300,
  fontSize: "15px",
  lineHeight: 1.75,
  color: COLORS.black,
  opacity: 0.45,
};

export const mutedTextStyle: CSSProperties = {
  fontFamily: "var(--font-geist)",
  fontSize: "13px",
  lineHeight: 1.6,
  color: COLORS.black,
  opacity: 0.45,
};

// ── Data / quantitative ──

export const dataLargeStyle: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 400,
  fontSize: "40px",
  letterSpacing: "-1px",
  lineHeight: 1,
  color: COLORS.black,
};

export const dataMediumStyle: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 400,
  fontSize: "20px",
  lineHeight: 1.2,
  color: COLORS.black,
};

export const dataSmallStyle: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 300,
  fontSize: "13px",
  lineHeight: 1.4,
  color: COLORS.black,
};

export const dataUnitStyle: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 300,
  fontSize: "13px",
  color: COLORS.black,
  opacity: 0.4,
};

// ── Forms ──

export const inputStyle: CSSProperties = {
  width: "100%",
  background: "rgba(0,0,0,0.02)",
  border: "1px solid rgb(1,1,1)",
  borderRadius: "24px",
  padding: "12px",
  fontSize: "12px",
  fontWeight: 500,
  fontFamily: "var(--font-geist-mono)",
  color: COLORS.black,
  outline: "none",
  appearance: "none",
};

export const labelStyle: CSSProperties = {
  display: "block",
  fontFamily: "var(--font-unbounded)",
  fontSize: "12px",
  color: COLORS.black,
  opacity: 0.6,
  marginBottom: "8px",
};

// ── Buttons ──

export const buttonPrimaryStyle: CSSProperties = {
  background: COLORS.text,
  color: COLORS.volt,
  border: "none",
  borderRadius: "100px",
  padding: "14px 28px",
  fontSize: "14px",
  fontWeight: 500,
  fontFamily: "var(--font-geist)",
  cursor: "pointer",
};

export const buttonSecondaryStyle: CSSProperties = {
  background: "transparent",
  color: COLORS.black,
  border: `0.5px solid ${COLORS.black}`,
  borderRadius: "100px",
  padding: "14px 28px",
  fontSize: "14px",
  fontWeight: 500,
  fontFamily: "var(--font-geist)",
  cursor: "pointer",
};

// ── Cards ──

export const cardStyle: CSSProperties = {
  background: COLORS.white,
  borderRadius: "16px",
  border: `0.5px solid ${COLORS.sage}`,
  padding: "32px",
};

// ── Sections ──

const sectionBase: CSSProperties = { padding: "120px 40px" };

export const sectionStyle:      CSSProperties = { ...sectionBase };
export const sectionDarkStyle:  CSSProperties = { ...sectionBase, background: COLORS.black };
export const sectionSageStyle:  CSSProperties = { ...sectionBase, background: COLORS.sage };
export const sectionGreenStyle: CSSProperties = { ...sectionBase, background: COLORS.text };
