"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { COLORS } from "@/lib/constants";
import styles from "./Layout.module.css";

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const rootStyle: CSSProperties = {
  background: COLORS.black,
  padding: "1px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1px",
  fontFamily: "var(--font-geist)",
  minHeight: "100vh",
  borderRadius: "15px",
  overflow: "hidden",
};

const leftStyle: CSSProperties = {
  background: COLORS.white,
  borderRadius: "8px",  // all corners rounded
  padding: "18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
};

const rightStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1px",
};

const navBarStyle: CSSProperties = {
  background: COLORS.white,
  borderRadius: "8px",  // all corners rounded
  padding: "10px 14px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const estimatorStyle: CSSProperties = {
  background: COLORS.white,
  borderRadius: "8px",  // all corners rounded
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

      {/* ── Left panel ── */}
      <div style={leftStyle}>

          {/* Landing text — vertically centred */}
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <div>
              <h1 style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 700,
              fontSize: "clamp(90px, 3.5vw, 52px)",
              lineHeight: 1.2,
              letterSpacing: "-1.5px",
              color: COLORS.black,
            }}>
              Carbon Accounting<br />for
            </h1>
            <h1 style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 700,
              fontSize: "clamp(90px, 3.5vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              color:" #4F52D8",
            }}>
              Everyone.
            </h1>
          </div>
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
              className={styles.navItem}
              aria-label={item.label}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/login"
            className={styles.navItemLogin}
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
            Enter your revenue for an instant estimate.
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