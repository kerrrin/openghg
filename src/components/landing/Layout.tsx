"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { COLORS } from "@/lib/constants";

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const rootStyle: CSSProperties = {
  background: COLORS.black,
  padding: "1px",
  display: "grid",
  gridTemplateColumns: "1fr 1.6fr",
  gap: "1px",
  fontFamily: "var(--font-geist)",
  minHeight: "100vh",
  borderRadius: "15px",
  overflow: "hidden",
};

const leftStyle: CSSProperties = {
  background: COLORS.white,
  borderRadius: "12px",  // all corners rounded
  padding: "18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const rightStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

const navBarStyle: CSSProperties = {
  background: COLORS.white,
  borderRadius: "12px",  // all corners rounded
  padding: "10px 14px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const navItemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  padding: "5px 14px",
  border: "0.5px solid rgba(0,0,0,0.12)",
  borderRadius: "100px",
  cursor: "pointer",
  textDecoration: "none",
  fontSize: "12px",
  fontWeight: 500,
  color: COLORS.black,
  fontFamily: "var(--font-geist)",
  whiteSpace: "nowrap",
};

const navItemLoginStyle: CSSProperties = {
  ...navItemStyle,
  background: COLORS.black,
  border: `1px solid ${COLORS.black}`,
  color: COLORS.greenElectric,
  marginLeft: "auto",
};

const estimatorStyle: CSSProperties = {
  background: COLORS.white,
  borderRadius: "12px",  // all corners rounded
  flex: 1,
  padding: "28px 32px",
  display: "flex",
  flexDirection: "column",
};

const estLabelStyle: CSSProperties = {
  fontSize: "10px",
  letterSpacing: "2px",
  color: COLORS.slate,
  textTransform: "uppercase",
  marginBottom: "12px",
  fontFamily: "var(--font-geist)",
};

const estTitleStyle: CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontWeight: 700,
  fontSize: "17px",
  color: COLORS.black,
  letterSpacing: "-0.3px",
  marginBottom: "6px",
};

const estSubStyle: CSSProperties = {
  fontSize: "12px",
  color: COLORS.slate,
  marginBottom: "24px",
  fontFamily: "var(--font-geist)",
};

const estPlaceholderStyle: CSSProperties = {
  flex: 1,
  border: "1px dashed rgba(0,0,0,0.08)",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const logoLockupStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const wordmarkStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  marginLeft: "-2px",
};

const penStyle: CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontWeight: 400,
  fontSize: "36px",
  lineHeight: 0.9,
  letterSpacing: "-1.5px",
  color: COLORS.black,
};

const ghgStyle: CSSProperties = {
  fontFamily: "var(--font-geist)",
  fontWeight: 300,
  fontSize: "9px",
  letterSpacing: "4px",
  color: COLORS.black,
  marginTop: "3px",
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function Layout() {

  // TODO: wire nav items to Next.js router when pages are built
  const NAV_ITEMS: { label: string; href: string; arrow: string }[] = [
    { label: "Library", href: "/library", arrow: "→" },
    { label: "GitHub",  href: "https://github.com/kerrrin/openghg", arrow: "↗" },
    { label: "About",   href: "/about", arrow: "→" },
  ];

  return (
    <div style={rootStyle}>
      <div style={leftStyle}>
        <div style={logoLockupStyle}>
          <Image
            src="OGHG_Logo_Black.svg"
            alt="OpenGHG Logo"
            width={120}
            height={60.1}
            style={{ flexShrink: 0 }}
          />
       </div>
      </div>

      {/* ── Right panel ── */}
      <div style={rightStyle}>

        {/* Nav bar */}
        <div style={navBarStyle}>
          {NAV_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              style={navItemStyle}
              aria-label={item.label}
            >
              {item.label} <span style={{ marginLeft: "4px" }}>{item.arrow}</span>
            </a>
          ))}
          <a
            href="/login"
            style={navItemLoginStyle}
            aria-label="Log in to your account"
          >
            Log in
          </a>
        </div>

        {/* Estimator */}
        <div style={estimatorStyle}>
          <p style={estLabelStyle}>Quick estimate</p>
          <h1 style={estTitleStyle}>
            How much does your organisation emit?
          </h1>
          <p style={estSubStyle}>
            Enter your revenue and sector for an instant estimate.
          </p>
          <div style={estPlaceholderStyle}>
            <span style={{ fontSize: "11px", color: "#ddd", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              Estimator — coming soon
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}