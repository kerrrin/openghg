"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import { COLORS } from "@/lib/constants";

// ── Icons ──

const iconProps = {
  width: "16", height: "16", viewBox: "0 0 24 24",
  fill: "none", stroke: "currentColor", strokeWidth: "2",
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const LocationIcon = () => (
  <svg {...iconProps}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UnlockIcon = () => (
  <svg {...iconProps}>
    <rect width="11" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>
);

const ShieldIcon = () => (
  <svg {...iconProps}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// ── Types ──

type Props = {
  isOpen:  boolean;
  onClose: () => void;
};

type Stat = {
  icon:  React.ReactNode;
  label: string;
};

// ── Data ──

const STATS: Stat[] = [
  { icon: <LocationIcon />, label: "Registered in Switzerland" },
  { icon: <UnlockIcon />,   label: "Open source development" },
  { icon: <ShieldIcon />,   label: "Private by design" },
];

// ── Styles ──

const backdrop: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(14,21,32,0.6)",
  backdropFilter: "blur(4px)",
  zIndex: 1000,
};

const dialog: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: COLORS.volt,
  borderRadius: "16px",
  padding: "40px",
  width: "100%",
  maxWidth: "520px",
  zIndex: 1001,
  boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
};

const closeBtn: CSSProperties = {
  position: "absolute",
  top: "16px",
  right: "16px",
  background: "none",
  border: "none",
  fontSize: "18px",
  color: "rgba(14,21,32,0.4)",
  cursor: "pointer",
  lineHeight: 1,
};

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: "10px",
  letterSpacing: "2px",
  color: "rgba(14,21,32,0.5)",
  textTransform: "uppercase",
  marginBottom: "16px",
};

const headline: CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontWeight: 900,
  fontSize: "28px",
  lineHeight: 1.05,
  letterSpacing: "-1px",
  color: COLORS.text,
  marginBottom: "20px",
};

const body: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: "12px",
  lineHeight: 1.5,
  color: "rgba(14,21,32,0.75)",
};

const statsGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "12px",
  marginBottom: "28px",
};

const statCard: CSSProperties = {
  background: "rgba(14,21,32,0.08)",
  borderRadius: "10px",
  padding: "16px",
  textAlign: "center",
};

const statIcon: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "8px",
  color: COLORS.text,
};

const statLabel: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: "10px",
  letterSpacing: "1px",
  color: "rgba(14,21,32,0.5)",
  textTransform: "uppercase",
};

const linkRow: CSSProperties = { display: "flex", gap: "8px" };

const githubLink: CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  background: COLORS.text,
  color: COLORS.volt,
  borderRadius: "8px",
  fontSize: "12px",
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 500,
  textDecoration: "none",
};

const closeSecondary: CSSProperties = {
  flex: 1,
  padding: "10px",
  background: "transparent",
  color: COLORS.text,
  border: "1px solid rgba(14,21,32,0.2)",
  borderRadius: "8px",
  fontSize: "12px",
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 500,
  cursor: "pointer",
};

// ── Component ──

export default function AboutModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div style={backdrop} onClick={onClose} aria-hidden="true" />

      <div role="dialog" aria-modal="true" aria-label="About OpenGHG" style={dialog}>
        <button style={closeBtn} onClick={onClose} aria-label="Close">×</button>

        <p style={eyebrow}>About OpenGHG</p>
        <h2 style={headline}>Behind the Tool.</h2>

        <p style={{ ...body, marginBottom: "16px" }}>
          OpenGHG is a Swiss non-profit association. Behind the platform is a dedicated
          team of volunteers — people who have worked with emissions data professionally
          and grew frustrated by the barriers to accessing it.
          <br /><br />
          Everything we build is free to use, transparent, and secure. The codebase is
          publicly available, the methodology is documented, and the roadmap is shaped
          by the people who use it.
        </p>

        <p style={{ ...body, marginBottom: "28px" }}>
          Contributions are always welcome. Reach out at{" "}
          <a href="mailto:hello@open-ghg.org" style={{ textDecoration: "underline" }}>
            hello@open-ghg.org
          </a>
          {" "}or contribute directly on GitHub.
        </p>

        <div style={statsGrid}>
          {STATS.map(({ icon, label }) => (
            <div key={label} style={statCard}>
              <div style={statIcon}>{icon}</div>
              <div style={statLabel}>{label}</div>
            </div>
          ))}
        </div>

        <div style={linkRow}>
          <a
            href="https://github.com/kerrrin/openghg"
            target="_blank"
            rel="noopener noreferrer"
            style={githubLink}
          >
            View on GitHub ↗
          </a>
          <button onClick={onClose} style={closeSecondary}>Close</button>
        </div>
      </div>
    </>
  );
}
