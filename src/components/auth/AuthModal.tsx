"use client";

import type { CSSProperties } from "react";
import { useState, useEffect } from "react";
import { COLORS } from "@/lib/constants";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

type Tab = "signin" | "signup";

type Props = {
  isOpen:  boolean;
  onClose: () => void;
};

const TABS: { id: Tab; label: string }[] = [
  { id: "signup", label: "New here" },
  { id: "signin", label: "Regular user" },
];

// ── Styles ──

const backdrop: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(14,21,32,0.7)",
  backdropFilter: "blur(4px)",
  zIndex: 1000,
};

const dialog: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: COLORS.white,
  borderRadius: "16px",
  padding: "32px",
  width: "100%",
  maxWidth: "420px",
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
  color: COLORS.textMuted,
  cursor: "pointer",
  lineHeight: 1,
};

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: "10px",
  color: "rgba(14,21,32,0.5)",
  textTransform: "uppercase",
  marginBottom: "16px",
};

const tabBar: CSSProperties = {
  display: "flex",
  gap: "4px",
  background: COLORS.page,
  borderRadius: "8px",
  padding: "4px",
  marginBottom: "24px",
};

function tabStyle(active: boolean): CSSProperties {
  return {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "var(--font-geist-mono)",
    fontWeight: 500,
    transition: "all 0.15s",
    background: active ? COLORS.white : "transparent",
    color: active ? COLORS.text : COLORS.textMuted,
    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
  };
}

// ── Component ──

export default function AuthModal({ isOpen, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("signup");

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

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sign in or create an account"
        style={dialog}
      >
        <button style={closeBtn} onClick={onClose} aria-label="Close">×</button>

        <p style={eyebrow}>Access OpenGHG</p>

        <div style={tabBar} role="tablist">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              style={tabStyle(tab === id)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "signup" ? <SignUpForm onClose={onClose} /> : <SignInForm onClose={onClose} />}
      </div>
    </>
  );
}
