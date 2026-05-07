"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { COLORS } from "@/lib/constants";
import styles from "./Layout.module.css";
import AuthModal from "@/components/auth/AuthModal";
import AboutModal from "@/components/landing/AboutModal";
import Estimator from "@/components/landing/Estimator";

// ── Types ──

type NavItem = {
  label:   string;
  href:    string;
  action?: "about";
};

// ── Constants ──

const ACCENT = "#4F52D8";

const STANDARDS = ["GHG Protocol", "ISO 14064", "SBTi"] as const;

const NAV_ITEMS: NavItem[] = [
  { label: "Library", href: "/library" },
  { label: "GitHub",  href: "https://github.com/kerrrin/openghg" },
  { label: "About",   href: "#", action: "about" },
];

// ── Styles ──

const root: CSSProperties = {
  background: COLORS.black,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1px",
  padding: "1px",
  minHeight: "100vh",
  borderRadius: "1px",
  overflow: "hidden",
  fontFamily: "var(--font-geist)",
};

const left: CSSProperties = {
  background: COLORS.white,
  borderRadius: "8px",
  padding: "18px",
  paddingBottom: "24px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
};

const right: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1px",
};

const navBar: CSSProperties = {
  background: COLORS.white,
  borderRadius: "8px",
  padding: "10px 14px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const estimatorPanel: CSSProperties = {
  background: COLORS.white,
  borderRadius: "8px",
  flex: 1,
  padding: "28px 32px",
  display: "flex",
  flexDirection: "column",
};

const hero: CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontWeight: 700,
  fontSize: "clamp(62px, 4.2vw, 96px)",
  lineHeight: 1.1,
  letterSpacing: "-1.5px",
  color: COLORS.black,
};

const complianceLabel: CSSProperties = {
  fontSize: "14px",
  fontFamily: "var(--font-unbounded)",
  fontWeight: 600,
  color: COLORS.black,
  marginBottom: "12px",
  letterSpacing: "0.02em",
};

const badgeRow: CSSProperties = {
  display: "flex",
  gap: "18px",
  marginTop: "20px",
  flexWrap: "wrap",
};

const badge: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "6px 12px",
  borderRadius: "24px",
  border: "1px solid rgba(0,0,0,0.81)",
  fontSize: "13px",
  fontWeight: 500,
  fontFamily: "var(--font-geist-mono)",
  color: COLORS.black,
};

// ── Component ──

export default function Layout() {
  const [authOpen,  setAuthOpen]  = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  function handleNavClick(item: NavItem, e: React.MouseEvent) {
    if (!item.action) return;
    e.preventDefault();
    if (item.action === "about") setAboutOpen(true);
  }

  return (
    <>
      <AuthModal  isOpen={authOpen}  onClose={() => setAuthOpen(false)} />
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />

      <div style={root}>

        {/* Left panel */}
        <div style={left}>
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <div>
              <h1 style={hero}>Carbon Accounting<br />for</h1>
              <h1 style={{ ...hero, color: ACCENT }}>Everyone.</h1>

              <div style={{ marginTop: "60px" }}>
                <p style={complianceLabel}>Free to use. Compliant with:</p>
                <div style={badgeRow}>
                  {STANDARDS.map((label) => (
                    <div key={label} style={badge}>
                      <CheckIcon />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={right}>
          <nav style={navBar}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={styles.navItem}
                aria-label={item.label}
                onClick={(e) => handleNavClick(item, e)}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#"
              className={styles.navItemLogin}
              aria-label="Open full inventory"
              onClick={(e) => { e.preventDefault(); setAuthOpen(true); }}
            >
              Full Inventory
            </a>
          </nav>

          <div style={estimatorPanel}>
            <Estimator />
          </div>
        </div>

      </div>
    </>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <circle cx="5" cy="5" r="5" fill={ACCENT} opacity="0.15" />
      <path
        d="M2.5 5l1.8 1.8 3.2-3.2"
        stroke={ACCENT}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
