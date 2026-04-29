/**
 * @file Navbar.tsx
 * @description Top navigation bar for the OpenGHG landing page.
 */

"use client";

import { COLORS } from "@/lib/constants";

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "22px 40px",
  borderBottom: `0.5px solid ${COLORS.sage}`,
} satisfies React.CSSProperties;

const logoStyle = {
  fontFamily: "var(--font-syne)",
  fontWeight: 800,
  fontSize: "17px",
  color: COLORS.greenDeep,
  letterSpacing: "-0.3px",
} satisfies React.CSSProperties;

const navLinkStyle = {
  fontSize: "13px",
  color: COLORS.black,
  opacity: 0.5,
  cursor: "pointer",
} satisfies React.CSSProperties;

const signInButtonStyle = {
  fontSize: "13px",
  color: COLORS.black,
  border: `0.5px solid ${COLORS.black}`,
  padding: "8px 20px",
  borderRadius: "100px",
  background: "transparent",
  cursor: "pointer",
  fontFamily: "var(--font-dm-sans)",
} satisfies React.CSSProperties;

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function Navbar() {

  function handleSignIn() {
    console.log("[Navbar] sign in clicked — auth flow not yet implemented");
  }

  function handleAbout() {
    console.log("[Navbar] about clicked — page not yet built");
  }

  return (
    <nav style={navStyle}>

      {/* Logo — text only until logomark is ready */}
      <div style={logoStyle}>
        openghg
      </div>

      {/* Navigation actions */}
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <span
          style={navLinkStyle}
          onClick={handleAbout}
          role="button"
          tabIndex={0}
          aria-label="About OpenGHG"
        >
          About
        </span>
        <button
          style={signInButtonStyle}
          onClick={handleSignIn}
          aria-label="Sign in to your account"
        >
          Sign in
        </button>
      </div>

    </nav>
  );
}