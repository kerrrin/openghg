"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { COLORS, SCOPE_COLORS } from "@/lib/constants";
import { inputStyle, labelStyle } from "@/lib/styles";

const SECTORS = [
  { label: "Select sector", value: "" },
  { label: "Oil and Gas Extraction", value: "2.1" },
  { label: "Mining and Quarrying", value: "1.8" },
  { label: "Electricity and Gas Supply", value: "3.2" },
  { label: "Water and Waste Management", value: "1.4" },
  { label: "Food and Beverage", value: "1.6" },
  { label: "Textiles and Apparel", value: "1.3" },
  { label: "Chemicals and Plastics", value: "2.8" },
  { label: "Manufacturing: Light", value: "1.2" },
  { label: "Manufacturing: Heavy", value: "3.8" },
  { label: "Construction", value: "2.4" },
  { label: "Transport and Logistics", value: "4.2" },
  { label: "Retail and Wholesale", value: "0.9" },
  { label: "Financial Services", value: "0.4" },
  { label: "Professional Services", value: "0.8" },
  { label: "Technology and Software", value: "0.6" },
  { label: "Healthcare", value: "1.0" },
  { label: "Education", value: "0.5" },
  { label: "Hospitality and Tourism", value: "1.1" },
  { label: "Agriculture and Forestry", value: "3.5" },
  { label: "Real Estate", value: "0.7" },
];

const CURRENCIES = ["EUR", "GBP", "USD", "CHF", "AUD", "CAD", "JPY", "CNY", "INR"];

export default function Hero() {
  const [revenue, setRevenue] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [sector, setSector] = useState("");
  const [result, setResult] = useState<{
    total: number;
    s1: number;
    s2: number;
    s3: number;
  } | null>(null);

  function estimate() {
    const rev = parseFloat(revenue);
    const factor = parseFloat(sector);
    if (!rev || !factor) return;
    const total = Math.round(rev * factor / 1000000 * 10) / 10;
    const s1 = Math.round(total * 0.08 * 10) / 10;
    const s2 = Math.round(total * 0.12 * 10) / 10;
    const s3 = Math.round((total - s1 - s2) * 10) / 10;
    setResult({ total, s1, s2, s3 });
  }

  const chartData = result ? [
    { name: "Scope 1", value: result.s1 },
    { name: "Scope 2", value: result.s2 },
    { name: "Scope 3", value: result.s3 },
  ] : [];

  return (
    <section style={{
      padding: "80px 40px 64px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "64px",
      alignItems: "start",
    }}>

      {/* Left — text */}
      <div>
        <p style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "2.5px",
          color: COLORS.greenDeep,
          textTransform: "uppercase",
          marginBottom: "24px",
        }}>
          Free · Open source · GHG Protocol
        </p>

        <h1 style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 800,
          fontSize: "52px",
          lineHeight: 1.02,
          color: COLORS.black,
          letterSpacing: "-2.5px",
          marginBottom: "24px",
        }}>
          Your title<br />goes <em style={{ color: "#2D5C3F", fontStyle: "normal" }}>here.</em>
        </h1>

        <p style={{
          fontSize: "15px",
          color: COLORS.black,
          opacity: 0.45,
          lineHeight: 1.75,
          fontWeight: 300,
          maxWidth: "380px",
          marginBottom: "36px",
        }}>
          Placeholder text for your landing page description. A sentence or two about what OpenGHG does and why it exists.
        </p>

        <button style={{
          background: COLORS.greenDeep,
          color: COLORS.greenElectric,
          padding: "14px 28px",
          borderRadius: "100px",
          fontSize: "14px",
          fontWeight: 500,
          border: "none",
          cursor: "pointer",
        }}>
          Start full inventory →
        </button>
      </div>

      {/* Right — estimate widget */}
      <div style={{
        background: COLORS.greenElectric,
        borderRadius: "16px",
        padding: "32px",
      }}>
        <p style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "2px",
          color: COLORS.black,
          textTransform: "uppercase",
          marginBottom: "24px",
          opacity: 0.5,
        }}>
          Quick estimate
        </p>

        {/* Revenue + currency row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
          <div>
            <label style={labelStyle}>Annual revenue</label>
            <input
              type="number"
              placeholder="5,000,000"
              value={revenue}
              onChange={e => setRevenue(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Currency</label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              style={inputStyle}
            >
              {CURRENCIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Sector */}
        <div style={{ marginBottom: "14px" }}>
          <label style={labelStyle}>Sector</label>
          <select
            value={sector}
            onChange={e => setSector(e.target.value)}
            style={inputStyle}
          >
            {SECTORS.map(s => (
              <option key={s.label} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={estimate}
          style={{
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
          }}
        >
          Estimate emissions →
        </button>

        {/* Result */}
        {result && (
          <div style={{
            marginTop: "20px",
            paddingTop: "20px",
            borderTop: "0.5px solid rgba(0,0,0,0.1)",
          }}>

            {/* Total number */}
            <p style={{
              fontSize: "11px",
              color: COLORS.black,
              opacity: 0.4,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}>
              Estimated total
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "8px" }}>
              <span style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "40px",
                color: COLORS.black,
                letterSpacing: "-1.5px",
                lineHeight: 1,
              }}>
                {result.total.toLocaleString()}
              </span>
              <span style={{ fontSize: "13px", color: COLORS.black, opacity: 0.4 }}>
                tCO₂e / year
              </span>
            </div>

            {/* Donut chart */}
            <div style={{ width: "100%", height: "200px", position: "relative" }}>
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
                      <Cell key={index} fill={SCOPE_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => value != null ? [`${value.toLocaleString()} tCO₂e`, name] : ["", ""]}
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
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              {chartData.map((entry, index) => (
                <div key={entry.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: SCOPE_COLORS[index],
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: "12px", color: COLORS.black, opacity: 0.6 }}>{entry.name}</span>
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

            {/* Nudge */}
            <p style={{ marginTop: "16px", fontSize: "12px", color: COLORS.black, opacity: 0.45, lineHeight: 1.6 }}>
              This is a rough estimate only.{" "}
              <span style={{ color: COLORS.greenDeep, opacity: 1, cursor: "pointer", fontWeight: 500 }}>
                Create a free account
              </span>{" "}
              to build a full inventory.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}