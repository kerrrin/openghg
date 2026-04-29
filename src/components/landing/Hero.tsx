/**
 * @file Hero.tsx
 * @description Landing page section.
 *
 * @dependencies
 *   recharts        — PieChart / donut chart
 *   constants.ts    — COLORS, SCOPE_COLORS
 *   styles.ts       — inputStyle, labelStyle
 */

"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { COLORS, SCOPE_COLORS } from "@/lib/constants";
import { inputStyle, labelStyle, eyebrowStyle, headingStyle, bodyStyle, buttonPrimaryStyle } from "@/lib/styles";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type EstimateResult = {
  total: number;
  s1: number;
  s2: number;
  s3: number;
}

type ChartEntry = {
  name: string;
  value: number;
}

type Sector = {
  label: string;
  value: string; // kgCO2e per EUR revenue (millions)
}

// ─────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────

const SECTORS: Sector[] = [
  { label: "Select sector",            value: "" },
  { label: "Oil and Gas Extraction",   value: "2.1" },
  { label: "Mining and Quarrying",     value: "1.8" },
  { label: "Electricity and Gas Supply", value: "3.2" },
  { label: "Water and Waste Management", value: "1.4" },
  { label: "Food and Beverage",        value: "1.6" },
  { label: "Textiles and Apparel",     value: "1.3" },
  { label: "Chemicals and Plastics",   value: "2.8" },
  { label: "Manufacturing: Light",     value: "1.2" },
  { label: "Manufacturing: Heavy",     value: "3.8" },
  { label: "Construction",             value: "2.4" },
  { label: "Transport and Logistics",  value: "4.2" },
  { label: "Retail and Wholesale",     value: "0.9" },
  { label: "Financial Services",       value: "0.4" },
  { label: "Professional Services",    value: "0.8" },
  { label: "Technology and Software",  value: "0.6" },
  { label: "Healthcare",               value: "1.0" },
  { label: "Education",                value: "0.5" },
  { label: "Hospitality and Tourism",  value: "1.1" },
  { label: "Agriculture and Forestry", value: "3.5" },
  { label: "Real Estate",              value: "0.7" },
];

// TODO: replace with unit conversion from units table
// once Supabase is connected
const CURRENCIES: string[] = [
  "EUR", "GBP", "USD", "CHF", "AUD", "CAD", "JPY", "CNY", "INR",
];

// Rough global average scope split ratios
// TODO: make sector-specific when EF library is live
const SCOPE_1_SHARE = 0.08;
const SCOPE_2_SHARE = 0.12;

// ─────────────────────────────────────────────
// Styles local to this component
// ─────────────────────────────────────────────

const sectionStyle = {
  padding: "80px 40px 64px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "64px",
  alignItems: "start",
} satisfies React.CSSProperties;

const widgetStyle = {
  background: COLORS.greenElectric,
  borderRadius: "16px",
  padding: "32px",
} satisfies React.CSSProperties;

const widgetLabelStyle = {
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "2px",
  color: COLORS.black,
  textTransform: "uppercase" as const,
  marginBottom: "24px",
  opacity: 0.5,
} satisfies React.CSSProperties;

const estimateButtonStyle = {
  width: "100%",
  background: COLORS.greenDeep,
  color: COLORS.greenElectric,
  border: "none",
  borderRadius: "8px",
  padding: "13px",
  fontSize: "14px",
  fontWeight: 500,
  marginTop: "6px",
  cursor: "pointer",
  fontFamily: "var(--font-dm-sans)",
} satisfies React.CSSProperties;

const resultDividerStyle = {
  marginTop: "20px",
  paddingTop: "20px",
  borderTop: "0.5px solid rgba(0,0,0,0.1)",
} satisfies React.CSSProperties;

const totalLabelStyle = {
  fontSize: "11px",
  color: COLORS.black,
  opacity: 0.4,
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  marginBottom: "6px",
} satisfies React.CSSProperties;

const totalValueStyle = {
  fontFamily: "var(--font-syne)",
  fontWeight: 800,
  fontSize: "40px",
  color: COLORS.black,
  letterSpacing: "-1.5px",
  lineHeight: 1,
} satisfies React.CSSProperties;

const totalUnitStyle = {
  fontSize: "13px",
  color: COLORS.black,
  opacity: 0.4,
} satisfies React.CSSProperties;

const nudgeStyle = {
  marginTop: "16px",
  fontSize: "12px",
  color: COLORS.black,
  opacity: 0.45,
  lineHeight: 1.6,
} satisfies React.CSSProperties;

const nudgeLinkStyle = {
  color: COLORS.greenDeep,
  opacity: 1,
  cursor: "pointer",
  fontWeight: 500,
} satisfies React.CSSProperties;

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function Hero() {

  // ── State ──────────────────────────────────
  const [revenue, setRevenue]   = useState<string>("");
  const [currency, setCurrency] = useState<string>("EUR");
  const [sector, setSector]     = useState<string>("");
  const [result, setResult]     = useState<EstimateResult | null>(null);

  // ── Derived ────────────────────────────────

  /**
   * Builds chart data array from result state.
   * Returns empty array when no result yet — prevents chart render.
   */
  const chartData: ChartEntry[] = result ? [
    { name: "Scope 1", value: result.s1 },
    { name: "Scope 2", value: result.s2 },
    { name: "Scope 3", value: result.s3 },
  ] : [];

  // ── Handlers ───────────────────────────────

  /**
   * Calculates a rough emission estimate from revenue and sector.
   * Uses hardcoded intensity factors (kgCO2e per EUR of revenue).
   * Scope split is a rough global average — not sector specific.
   *
   * Formula: total = revenue × factor / 1,000,000
   * Rounded to 1 decimal place for display clarity.
   *
   * TODO: replace with API call to emission_factors table
   * TODO: apply currency conversion before calculation
   */
  function estimate(): void {
    const rev    = parseFloat(revenue);
    const factor = parseFloat(sector);

    // Guard: require both revenue and sector to proceed
    if (!rev || !factor) return;

    const total = Math.round(rev * factor / 1_000_000 * 10) / 10;
    const s1    = Math.round(total * SCOPE_1_SHARE * 10) / 10;
    const s2    = Math.round(total * SCOPE_2_SHARE * 10) / 10;
    const s3    = Math.round((total - s1 - s2) * 10) / 10;

    setResult({ total, s1, s2, s3 });
  }

  // TODO: wire up to auth flow when sign up is built
  function handleCreateAccount(): void {
    console.log("[Hero] create account clicked — auth flow not yet implemented");
  }

  // TODO: wire up to onboarding flow when built
  function handleStartInventory(): void {
    console.log("[Hero] start inventory clicked — onboarding not yet built");
  }

  // ── Render ─────────────────────────────────
  return (
    <section style={sectionStyle}>

      {/* ── Left — headline and CTA ── */}
      <div>
        <p style={eyebrowStyle}>
          Free · Open source · GHG Protocol
        </p>

        <h1 style={headingStyle}>
          Your title<br />
          goes <em style={{ color: COLORS.greenDeep, fontStyle: "normal" }}>here.</em>
        </h1>

        <p style={{ ...bodyStyle, maxWidth: "380px", marginBottom: "36px" }}>
          Placeholder text for your landing page description.
          A sentence or two about what OpenGHG does and why it exists.
        </p>

        <button
          style={buttonPrimaryStyle}
          onClick={handleStartInventory}
          aria-label="Start your full GHG inventory"
        >
          Start full inventory →
        </button>
      </div>

      {/* ── Right — quick estimate widget ── */}
      <div style={widgetStyle}>
        <p style={widgetLabelStyle}>Quick estimate</p>

        {/* Revenue and currency row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "14px",
        }}>
          <div>
            <label style={labelStyle}>Annual revenue</label>
            <input
              type="number"
              placeholder="5,000,000"
              value={revenue}
              onChange={e => setRevenue(e.target.value)}
              style={inputStyle}
              aria-label="Annual revenue"
            />
          </div>
          <div>
            <label style={labelStyle}>Currency</label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              style={inputStyle}
              aria-label="Select currency"
            >
              {CURRENCIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sector selector */}
        <div style={{ marginBottom: "14px" }}>
          <label style={labelStyle}>Sector</label>
          <select
            value={sector}
            onChange={e => setSector(e.target.value)}
            style={inputStyle}
            aria-label="Select your sector"
          >
            {SECTORS.map(s => (
              <option key={s.label} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Estimate button */}
        <button
          onClick={estimate}
          style={estimateButtonStyle}
          aria-label="Calculate emission estimate"
        >
          Estimate emissions →
        </button>

        {/* ── Result — shown after estimate is calculated ── */}
        {result && (
          <div style={resultDividerStyle}>

            {/* Total */}
            <p style={totalLabelStyle}>Estimated total</p>
            <div style={{
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
              marginBottom: "8px",
            }}>
              <span style={totalValueStyle}>
                {result.total.toLocaleString()}
              </span>
              <span style={totalUnitStyle}>tCO₂e / year</span>
            </div>

            {/* Donut chart */}
            <div style={{ width: "100%", height: "200px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`scope-${index}`}
                        fill={SCOPE_COLORS[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) =>
                      value != null
                        ? [`${Number(value).toLocaleString()} tCO₂e`, name]
                        : ["", ""]
                    }
                    contentStyle={{
                      background: COLORS.black,
                      border: "none",
                      borderRadius: "8px",
                      color: COLORS.greenElectric,
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "8px",
            }}>
              {chartData.map((entry, index) => (
                <div
                  key={entry.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: SCOPE_COLORS[index],
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: "12px",
                      color: COLORS.black,
                      opacity: 0.6,
                    }}>
                      {entry.name}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: COLORS.black,
                  }}>
                    {entry.value.toLocaleString()} tCO₂e
                  </span>
                </div>
              ))}
            </div>

            {/* Sign up nudge */}
            <p style={nudgeStyle}>
              This is a rough estimate only.{" "}
              <span
                style={nudgeLinkStyle}
                onClick={handleCreateAccount}
                role="button"
                tabIndex={0}
                aria-label="Create a free account for a full inventory"
              >
                Create a free account
              </span>{" "}
              to build a full GHG Protocol inventory.
            </p>

          </div>
        )}
      </div>

    </section>
  );
}