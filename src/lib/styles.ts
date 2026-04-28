import { COLORS } from "./constants";

export const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(0,0,0,0.06)",
  border: "0.5px solid rgba(0,0,0,0.12)",
  borderRadius: "8px",
  padding: "11px 14px",
  color: COLORS.black,
  fontSize: "14px",
  fontFamily: "var(--font-dm-sans)",
  outline: "none",
  appearance: "none" as const,
};

export const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  color: COLORS.black,
  opacity: 0.55,
  marginBottom: "6px",
  display: "block",
  fontFamily: "var(--font-dm-sans)",
};

export const eyebrowStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "2.5px",
  color: COLORS.greenDeep,
  textTransform: "uppercase",
  marginBottom: "24px",
  fontFamily: "var(--font-dm-sans)",
};

export const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-syne)",
  fontWeight: 800,
  fontSize: "52px",
  lineHeight: 1.02,
  color: COLORS.black,
  letterSpacing: "-2.5px",
  marginBottom: "24px",
};

export const subheadingStyle: React.CSSProperties = {
  fontFamily: "var(--font-syne)",
  fontWeight: 800,
  fontSize: "34px",
  lineHeight: 1.08,
  color: COLORS.black,
  letterSpacing: "-1.5px",
  marginBottom: "16px",
};

export const bodyStyle: React.CSSProperties = {
  fontSize: "15px",
  color: COLORS.black,
  opacity: 0.45,
  lineHeight: 1.75,
  fontWeight: 300,
  fontFamily: "var(--font-dm-sans)",
};

export const buttonPrimaryStyle: React.CSSProperties = {
  background: COLORS.greenDeep,
  color: COLORS.greenElectric,
  padding: "14px 28px",
  borderRadius: "100px",
  fontSize: "14px",
  fontWeight: 500,
  border: "none",
  cursor: "pointer",
  fontFamily: "var(--font-dm-sans)",
};

export const buttonSecondaryStyle: React.CSSProperties = {
  background: "transparent",
  color: COLORS.black,
  padding: "14px 28px",
  borderRadius: "100px",
  fontSize: "14px",
  fontWeight: 500,
  border: `0.5px solid ${COLORS.black}`,
  cursor: "pointer",
  fontFamily: "var(--font-dm-sans)",
};

export const cardStyle: React.CSSProperties = {
  background: COLORS.white,
  borderRadius: "16px",
  border: `0.5px solid ${COLORS.sage}`,
  padding: "32px",
};

export const sectionStyle: React.CSSProperties = {
  padding: "120px 40px",
};

export const sectionDarkStyle: React.CSSProperties = {
  padding: "120px 40px",
  background: COLORS.black,
};

export const sectionSageStyle: React.CSSProperties = {
  padding: "120px 40px",
  background: COLORS.sage,
};

export const sectionGreenStyle: React.CSSProperties = {
  padding: "120px 40px",
  background: COLORS.greenDeep,
};

export const mutedTextStyle: React.CSSProperties = {
  fontSize: "13px",
  color: COLORS.black,
  opacity: 0.45,
  fontFamily: "var(--font-dm-sans)",
  lineHeight: 1.6,
};