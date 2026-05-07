"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { COLORS } from "@/lib/constants";

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
  marginTop: "4px",
};

const hint: CSSProperties = {
  fontSize: "11px",
  color: COLORS.textMuted,
  lineHeight: 1.6,
  fontFamily: "var(--font-unbounded)",
};

// ── Component ──

const supabase = createClient();

export default function SignInForm({ onClose }: Props) {
  const [email,   setEmail]   = useState("");
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) throw error;
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div style={{ fontSize: "32px", marginBottom: "16px" }}>✉️</div>
        <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 700, fontSize: "15px", color: COLORS.text, marginBottom: "8px" }}>
          Check your email
        </p>
        <p style={hint}>
          We sent a sign in link to<br />
          <strong style={{ color: COLORS.text }}>{email}</strong>
        </p>
        <p style={{ ...hint, marginTop: "16px" }}>You can close this window.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <p style={hint}>Enter your email and we'll send you a sign in link.</p>

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

      {error && <p style={{ fontSize: "11px", color: COLORS.danger }}>{error}</p>}

      <button type="submit" disabled={loading} style={{ ...button, opacity: loading ? 0.6 : 1 }}>
        {loading ? "Sending..." : "Send sign in link →"}
      </button>
    </form>
  );
}
