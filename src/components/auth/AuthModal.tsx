/**
 * - Tab state: 'signin' | 'signup'
 */

"use client";

import { useState, useEffect } from "react";
import { COLORS } from "@/lib/constants";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

type Tab = "signin" | "signup";

type Props = {
  isOpen:  boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("signup");

  // Close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(14,21,32,0.7)",
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
        background: COLORS.white,
        borderRadius: "16px",
        padding: "32px",
        width: "100%",
        maxWidth: "420px",
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
            color: COLORS.textMuted,
            cursor: "pointer",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Logo */}
        <p style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "10px",
          color: "rgba(14,21,32,0.5)",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}>
          Access OpenGHG
        </p>

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: "4px",
          background: COLORS.page,
          borderRadius: "8px",
          padding: "4px",
          marginBottom: "24px",
        }}>
          {(["signup", "signin"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                fontFamily: "var(--font-geist-mono)",
                fontWeight: 500,
                background: tab === t ? COLORS.white : "transparent",
                color: tab === t ? COLORS.text : COLORS.textMuted,
                boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.15s",
              }}
            >
              {t === "signup" ? "New here" : "Regular user"}
            </button>
          ))}
        </div>

        {/* Form */}
        {tab === "signup"
          ? <SignUpForm onClose={onClose} />
          : <SignInForm onClose={onClose} />
        }

      </div>
    </>
  );
}