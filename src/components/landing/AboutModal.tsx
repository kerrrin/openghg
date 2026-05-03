"use client";

import { useEffect } from "react";
import { COLORS } from "@/lib/constants";

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const UnlockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="11" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
)

type Props = {
  isOpen:  boolean;
  onClose: () => void;
};

export default function AboutModal({ isOpen, onClose }: Props) {

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(14,21,32,0.6)",
          zIndex: 1000,
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal */}
      <div style={{
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
      }}>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "18px",
            color: "rgba(14,21,32,0.4)",
            cursor: "pointer",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Eyebrow */}
        <p style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "10px",
          letterSpacing: "2px",
          color: "rgba(14,21,32,0.5)",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}>
          About OpenGHG
        </p>

        {/* Headline */}
        <h2 style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 900,
          fontSize: "28px",
          lineHeight: 1.05,
          letterSpacing: "-1px",
          color: COLORS.text,
          marginBottom: "20px",
        }}>
          Carbon accounting<br />should be accessible.
        </h2>

        {/* Body */}
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "12px",
          lineHeight: 1.75,
          color: "rgba(14,21,32,0.7)",
          marginBottom: "16px",
        }}>
          OpenGHG is a non-profit association built on the belief
          that carbon data should be a public good. <br />
          More Text
          




        </p>

        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: "12px",
          lineHeight: 1.75,
          color: "rgba(14,21,32,0.7)",
          marginBottom: "28px",
        }}>
        Text Text and Text
        </p>

        {/* Stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "12px",
          marginBottom: "28px",
        }}>
          {[
            { value: <LocationIcon />, label: "Registered in Geneva, Switzerland" },
            { value: <UnlockIcon />, label: "Funded by XYZ" },
            { value: <ShieldIcon />, label: "Committed to Transparency" },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                background: "rgba(14,21,32,0.08)",
                borderRadius: "10px",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <div style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 900,
                fontSize: "22px",
                color: COLORS.text,
                letterSpacing: "-1px",
                marginBottom: "4px",
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "10px",
                letterSpacing: "1px",
                color: "rgba(14,21,32,0.5)",
                textTransform: "uppercase",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Links row */}
        <div style={{ display: "flex", gap: "8px" }}>
          <a
            href="https://github.com/kerrrin/openghg"
            target="_blank"
            rel="noopener noreferrer"
            style={{
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
            }}
          >
            View on GitHub ↗
          </a>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
              background: "transparent",
              color: COLORS.text,
              border: `1px solid rgba(14,21,32,0.2)`,
              borderRadius: "8px",
              fontSize: "12px",
              fontFamily: "var(--font-geist-mono)",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>

      </div>
    </>
  );
}