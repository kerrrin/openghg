"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { COLORS } from "@/lib/constants";

type Mode = "choose" | "email" | "sent";
type Props = { onClose: () => void };

// ── Styles ──

const label: CSSProperties = {
  display: "block",
  fontSize: "11px",
  letterSpacing: "1px",
  color: COLORS.textMuted,
  textTransform: "uppercase",
  marginBottom: "6px",
  fontFamily: "var(--font-geist-mono)",
};

const input: CSSProperties = {
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

const button: CSSProperties = {
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

const outlineButton: CSSProperties = {
  ...button,
  background: "transparent",
  color: COLORS.text,
  border: `1px solid ${COLORS.border}`,
};

const backButton: CSSProperties = {
  background: "none",
  border: "none",
  color: COLORS.textMuted,
  fontSize: "12px",
  cursor: "pointer",
  fontFamily: "var(--font-geist-mono)",
  padding: "0",
  textAlign: "left",
};

const hint: CSSProperties = {
  fontSize: "11px",
  color: COLORS.textMuted,
  lineHeight: 1.6,
  fontFamily: "var(--font-unbounded)",
};

const finePrint: CSSProperties = {
  fontSize: "9px",
  color: COLORS.textMuted,
  textAlign: "center",
  fontFamily: "var(--font-unbounded)",
  lineHeight: 1.6,
};

const divider: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  margin: "4px 0",
};

// ── Component ──

const supabase = createClient();

export default function SignUpForm({ onClose }: Props) {
  const router = useRouter();

  const [mode,    setMode]    = useState<Mode>("choose");
  const [email,   setEmail]   = useState("");
  const [error,   setError]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnonymous() {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
      onClose();
      router.push("/onboarding");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/onboarding`,
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
      setMode("sent");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (mode === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div style={{ fontSize: "32px", marginBottom: "16px" }}>✉️</div>
        <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 700, fontSize: "15px", color: COLORS.text, marginBottom: "8px" }}>
          Please check your email.
        </p>
        <p style={hint}>
          We sent a sign in link to<br />
          <strong style={{ color: COLORS.text }}>{email}</strong>
        </p>
        <p style={{ ...hint, marginTop: "16px" }}>Click the link to complete your account setup.</p>
      </div>
    );
  }

  if (mode === "email") {
    return (
      <form onSubmit={handleEmailSignUp} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <button type="button" onClick={() => setMode("choose")} style={backButton}>← Back</button>

        <p style={hint}>Enter your email and we'll send you a sign up link.</p>

        <div>
          <label style={label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoFocus
            style={input}
          />
        </div>

        {error && <p style={{ fontSize: "12px", color: COLORS.danger }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ ...button, opacity: loading ? 0.6 : 1 }}>
          {loading ? "Sending..." : "Send sign up link →"}
        </button>

        <p style={finePrint}>By continuing you agree to our privacy policy. Your data is stored on EU servers.</p>
      </form>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <p style={{ ...hint, marginBottom: "4px" }}>Get started instantly. No password required.</p>

      <button onClick={handleAnonymous} disabled={loading} style={{ ...button, opacity: loading ? 0.6 : 1 }}>
        {loading ? "Creating session..." : "Continue without account →"}
      </button>

      <div style={divider}>
        <div style={{ flex: 1, height: "1px", background: COLORS.border }} />
        <span style={{ fontSize: "11px", color: COLORS.textMuted, fontFamily: "var(--font-geist-mono)" }}>or</span>
        <div style={{ flex: 1, height: "1px", background: COLORS.border }} />
      </div>

      <button onClick={() => setMode("email")} style={outlineButton}>Sign up with email</button>

      {error && <p style={{ fontSize: "12px", color: COLORS.danger }}>{error}</p>}

      <p style={finePrint}>Anonymous sessions are not recoverable without an email. You can add one later in settings.</p>
    </div>
  );
}
