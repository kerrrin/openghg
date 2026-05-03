
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/lib/constants";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type NavItem = {
  id:    string;
  label: string;
  icon:  string;
};

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: "periods",   label: "Reporting periods", icon: "◎" },
  { id: "inventory", label: "Inventory",          icon: "⊞" },
  { id: "results",   label: "Results",            icon: "↗" },
  { id: "library",   label: "EF Library",         icon: "⊙" },
  { id: "settings",  label: "Settings",           icon: "⊛" },
];

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const rootStyle: React.CSSProperties = {
  background: COLORS.page,
  minHeight: "100vh",
  display: "grid",
  gridTemplateColumns: "220px 1fr",
  gap: "2px",
  padding: "2px",
};

const sidebarStyle: React.CSSProperties = {
  background: COLORS.text,
  borderRadius: "12px",
  padding: "24px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  minHeight: "calc(100vh - 4px)",
};

const sidebarLogoStyle: React.CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontWeight: 900,
  fontSize: "13px",
  color: COLORS.volt,
  marginBottom: "32px",
  paddingLeft: "12px",
};

const mainStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

const topBarStyle: React.CSSProperties = {
  background: COLORS.white,
  borderRadius: "12px",
  padding: "14px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const contentStyle: React.CSSProperties = {
  background: COLORS.white,
  borderRadius: "12px",
  padding: "32px",
  flex: 1,
  minHeight: "calc(100vh - 80px)",
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function NavItemButton({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        background: active ? "rgba(200,241,53,0.1)" : "transparent",
        color: active ? COLORS.volt : "rgba(240,242,245,0.45)",
        fontFamily: "var(--font-geist)",
        fontSize: "13px",
        fontWeight: active ? 500 : 400,
        textAlign: "left",
        width: "100%",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      <span style={{ fontSize: "14px", opacity: 0.8 }}>{item.icon}</span>
      {item.label}
    </button>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "400px",
      gap: "16px",
    }}>
      <div style={{
        width: "64px",
        height: "64px",
        borderRadius: "16px",
        background: COLORS.page,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
      }}>
        ◎
      </div>
      <div style={{ textAlign: "center" }}>
        <h2 style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 700,
          fontSize: "18px",
          color: COLORS.text,
          letterSpacing: "-0.5px",
          marginBottom: "8px",
        }}>
          No reporting periods yet
        </h2>
        <p style={{
          fontFamily: "var(--font-geist)",
          fontSize: "13px",
          color: COLORS.textMuted,
          lineHeight: 1.6,
          maxWidth: "320px",
        }}>
          Create your first reporting period to start
          building your GHG inventory.
        </p>
      </div>
      <button
        onClick={onAdd}
        style={{
          background: COLORS.text,
          color: COLORS.volt,
          border: "none",
          borderRadius: "8px",
          padding: "12px 24px",
          fontSize: "12px",
          fontFamily: "var(--font-geist-mono)",
          fontWeight: 500,
          cursor: "pointer",
          marginTop: "8px",
        }}
      >
        + Add reporting period
      </button>
    </div>
  );
}

function ReportingPeriodCard({
  year,
  label,
  status,
}: {
  year: number;
  label: string;
  status: "draft" | "complete";
}) {
  return (
    <div style={{
      background: COLORS.page,
      borderRadius: "10px",
      padding: "20px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      transition: "background 0.15s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: COLORS.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-unbounded)",
          fontWeight: 700,
          fontSize: "12px",
          color: COLORS.text,
        }}>
          {year}
        </div>
        <div>
          <p style={{
            fontFamily: "var(--font-geist)",
            fontWeight: 500,
            fontSize: "14px",
            color: COLORS.text,
            marginBottom: "2px",
          }}>
            {label}
          </p>
          <p style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "11px",
            color: COLORS.textMuted,
            letterSpacing: "0.5px",
          }}>
            {status === "complete" ? "Complete" : "In progress"}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{
          display: "inline-block",
          padding: "3px 10px",
          borderRadius: "100px",
          fontSize: "10px",
          fontFamily: "var(--font-geist-mono)",
          letterSpacing: "0.5px",
          background: status === "complete"
            ? "rgba(200,241,53,0.15)"
            : "rgba(138,154,184,0.15)",
          color: status === "complete"
            ? COLORS.volt
            : COLORS.textMuted,
        }}>
          {status === "complete" ? "Complete" : "Draft"}
        </span>
        <span style={{
          color: COLORS.textMuted,
          fontSize: "16px",
        }}>→</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeNav, setActiveNav] = useState("periods");

  // TODO: replace with real data from Supabase
  const reportingPeriods: {
    id: string;
    year: number;
    label: string;
    status: "draft" | "complete";
  }[] = [];

  // TODO: implement add period modal
  function handleAddPeriod() {
    console.log("[Dashboard] add period — not yet implemented");
  }

  const isAnonymous = user?.is_anonymous ?? true;

  return (
    <div style={rootStyle}>

      {/* ── Sidebar ── */}
      <div style={sidebarStyle}>

        {/* Logo */}
        <div style={sidebarLogoStyle}>OpenGHG</div>

        {/* Nav items */}
        {NAV_ITEMS.map(item => (
          <NavItemButton
            key={item.id}
            item={item}
            active={activeNav === item.id}
            onClick={() => setActiveNav(item.id)}
          />
        ))}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Anonymous warning */}
        {isAnonymous && (
          <div style={{
            background: "rgba(200,241,53,0.08)",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "8px",
          }}>
            <p style={{
              fontFamily: "var(--font-geist)",
              fontSize: "11px",
              color: "rgba(200,241,53,0.7)",
              lineHeight: 1.5,
              marginBottom: "8px",
            }}>
              Add an email to secure your account.
            </p>
            <button style={{
              width: "100%",
              background: "rgba(200,241,53,0.15)",
              border: "none",
              borderRadius: "6px",
              padding: "8px",
              fontSize: "11px",
              color: COLORS.volt,
              fontFamily: "var(--font-geist-mono)",
              cursor: "pointer",
            }}>
              Add email →
            </button>
          </div>
        )}

        {/* Sign out */}
        <button
          onClick={signOut}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "transparent",
            color: "rgba(240,242,245,0.3)",
            fontFamily: "var(--font-geist)",
            fontSize: "13px",
            width: "100%",
            textAlign: "left",
          }}
        >
          ← Sign out
        </button>

      </div>

      {/* ── Main area ── */}
      <div style={mainStyle}>

        {/* Top bar */}
        <div style={topBarStyle}>
          <div>
            <p style={{
              fontFamily: "var(--font-unbounded)",
              fontWeight: 700,
              fontSize: "14px",
              color: COLORS.text,
              letterSpacing: "-0.3px",
            }}>
              {activeNav === "periods" && "Reporting periods"}
              {activeNav === "inventory" && "Inventory"}
              {activeNav === "results" && "Results"}
              {activeNav === "library" && "Emission factor library"}
              {activeNav === "settings" && "Settings"}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {activeNav === "periods" && (
              <button
                onClick={handleAddPeriod}
                style={{
                  background: COLORS.text,
                  color: COLORS.volt,
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontFamily: "var(--font-geist-mono)",
                  cursor: "pointer",
                }}
              >
                + New period
              </button>
            )}
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: COLORS.page,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              color: COLORS.textMuted,
            }}>
              {isAnonymous ? "?" : "U"}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={contentStyle}>
          {activeNav === "periods" && (
            <>
              {reportingPeriods.length === 0 ? (
                <EmptyState onAdd={handleAddPeriod} />
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {reportingPeriods.map(period => (
                    <ReportingPeriodCard
                      key={period.id}
                      year={period.year}
                      label={period.label}
                      status={period.status}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {activeNav !== "periods" && (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              flexDirection: "column",
              gap: "12px",
            }}>
              <p style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "11px",
                letterSpacing: "2px",
                color: COLORS.border,
                textTransform: "uppercase",
              }}>
                Coming soon
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}