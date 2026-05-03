/**
 * - Anonymous: signInAnonymously → /onboarding
 * - Email: signInWithOtp → check email state
 * - emailRedirectTo points to /onboarding
 */

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { COLORS } from "@/lib/constants";

type Mode = "choose" | "email" | "sent";

export default function SignUpForm({ onClose }: { onClose: () => void }) {
  const supabase = createClient();
  const router   = useRouter();

  const [mode,    setMode]    = useState<Mode>("choose");
  const [email,   setEmail]   = useState("");
  const [error,   setError]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ── Anonymous sign up ──
  async function handleAnonymous() {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInAnonymously();

    if (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    onClose();
    router.push("/onboarding");
  }

  // ── Email magic link sign up ──
  async function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/onboarding`,
        shouldCreateUser: true,
      },
    });

    if (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setMode("sent");
    setLoading(false);
  }

  // ── Sent state ──
  if (mode === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div style={{ fontSize: "32px", marginBottom: "16px" }}>✉️</div>
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 700,
          fontSize: "15px",
          color: COLORS.text,
          marginBottom: "8px",
        }}>
          Please check your email.
        </p>
        <p style={{
          fontSize: "11px",
          color: COLORS.textMuted,
          lineHeight: 1.6,
          fontFamily: "var(--font-unbounded)",
        }}>
          We sent a sign in link to<br />
          <strong style={{ color: COLORS.text }}>{email}</strong>
        </p>
        <p style={{
          fontSize: "11px",
          color: COLORS.textMuted,
          marginTop: "16px",
          fontFamily: "var(--font-unbounded)",
        }}>
          Click the link to complete your account setup.
        </p>
      </div>
    );
  }

  // ── Email form state ──
  if (mode === "email") {
    return (
      <form
        onSubmit={handleEmailSignUp}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <button
          type="button"
          onClick={() => setMode("choose")}
          style={backButtonStyle}
        >
          ← Back
        </button>

        <p style={{
          fontSize: "11px",
          color: COLORS.textMuted,
          lineHeight: 1.6,
          fontFamily: "var(--font-unbounded)",
        }}>
          Enter your email and we'll send you a sign up link.
        </p>

        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoFocus
            style={inputStyle}
          />
        </div>

        {error && (
          <p style={{ fontSize: "12px", color: COLORS.danger }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{ ...buttonStyle, opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Sending..." : "Send sign up link →"}
        </button>

        <p style={{
          fontSize: "9px",
          color: COLORS.textMuted,
          textAlign: "center",
          fontFamily: "var(--font-unbounded)",
          lineHeight: 1.6,
        }}>
          By continuing you agree to our privacy policy.
          Your data is stored on EU servers.
        </p>
      </form>
    );
  }

  // ── Choose state (default) ──
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

      <p style={{
        fontSize: "11px",
        color: COLORS.textMuted,
        lineHeight: 1.6,
        fontFamily: "var(--font-unbounded)",
        marginBottom: "4px",
      }}>
        Get started instantly. No password required.
      </p>

      {/* Anonymous option */}
      <button
        onClick={handleAnonymous}
        disabled={loading}
        style={{
          ...buttonStyle,
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Creating session..." : "Continue without account →"}
      </button>

      {/* Divider */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        margin: "4px 0",
      }}>
        <div style={{ flex: 1, height: "1px", background: COLORS.border }} />
        <span style={{
          fontSize: "11px",
          color: COLORS.textMuted,
          fontFamily: "var(--font-geist-mono)",
        }}>
          or
        </span>
        <div style={{ flex: 1, height: "1px", background: COLORS.border }} />
      </div>

      {/* Email option */}
      <button
        onClick={() => setMode("email")}
        style={outlineButtonStyle}
      >
        Sign up with email
      </button>

      {error && (
        <p style={{ fontSize: "12px", color: COLORS.danger }}>{error}</p>
      )}

      <p style={{
        fontSize: "9px",
        color: COLORS.textMuted,
        textAlign: "center",
        fontFamily: "var(--font-unbounded)",
        lineHeight: 1.6,
      }}>
        Anonymous sessions are not recoverable without an email.
        You can add one later in settings.
      </p>

    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  letterSpacing: "1px",
  color: COLORS.textMuted,
  textTransform: "uppercase",
  marginBottom: "6px",
  fontFamily: "var(--font-geist-mono)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: COLORS.page,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "8px",
  padding: "10px 14px",
  fontSize: "11px",
  color: COLORS.text,
  fontFamily: "var(--font-unbounded)",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  background: COLORS.text,
  color: COLORS.volt,
  border: "none",
  borderRadius: "8px",
  padding: "12px",
  fontSize: "13px",
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "var(--font-geist-mono)",
};

const outlineButtonStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  color: COLORS.text,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "8px",
  padding: "12px",
  fontSize: "13px",
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "var(--font-geist-mono)",
};

const backButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: COLORS.textMuted,
  fontSize: "12px",
  cursor: "pointer",
  fontFamily: "var(--font-geist-mono)",
  padding: "0",
  textAlign: "left",
};