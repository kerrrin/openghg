
"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { createClient } from "@/lib/supabase/client";
import { COLORS, SCOPE_COLORS } from "@/lib/constants";
import { inputStyle, labelStyle } from "@/lib/styles";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Benchmark = {
  scope1_avg: number;
  scope2_avg: number;
  scope3_avg: number;
  total_avg:  number;
  source:     string | null;
};

type Sector = {
  sector_code:     string;
  display_name_en: string;
  sector_group:    string;
};

type Region = {
  region_code:     string;
  display_name_en: string;
  region_group:    string;
};

type Unit = {
  unit_code:         string;
  conversion_factor: number;
};

type EstimateResult = {
  total:  number;
  scope1: number;
  scope2: number;
  scope3: number;
};

type Currency = {
  unit_code:       string;
  display_name_en: string;
};

type View = "input" | "result";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const REPORTING_YEAR = 2025;

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function Estimator() {
  const supabase = createClient();

  // ── State ──
  const [view,          setView]          = useState<View>("input");
  const [sectors,       setSectors]       = useState<Sector[]>([]);
  const [regions,       setRegions]       = useState<Region[]>([]);
  const [revenue,       setRevenue]       = useState<string>("");
  const [currency,      setCurrency]      = useState<string>("EUR");
  const [sectorCode,    setSectorCode]    = useState<string>("");
  const [regionCode,    setRegionCode]    = useState<string>("");
  const [result,        setResult]        = useState<EstimateResult | null>(null);
  const [benchmark,     setBenchmark]     = useState<Benchmark | null>(null);
  const [loading,       setLoading]       = useState<boolean>(false);
  const [error,         setError]         = useState<string | null>(null);
  const [dataLoading,   setDataLoading]   = useState<boolean>(true);
  const [currencies,    setCurrencies]    = useState<Currency[]>([]);
  const [displayTotal,  setDisplayTotal]  = useState<number>(0);
  const [showDQ,        setShowDQ]        = useState(false);
  const [hovered,       setHovered]       = useState(false);

  // ── Load sectors and regions on mount ──
  useEffect(() => {
    async function loadReferenceData() {
      setDataLoading(true);

      const [sectorsRes, regionsRes, currenciesRes] = await Promise.all([
        supabase
          .from("sectors")
          .select("sector_code, display_name_en, sector_group")
          .order("sector_group")
          .order("display_order"),
        supabase
          .from("regions")
          .select("region_code, display_name_en, region_group")
          .order("region_group")
          .order("display_order"),
        supabase
            .from("units")
            .select("unit_code, display_name_en")
            .eq("unit_type", "currency")
            .eq("reporting_year", 2025)
            .order("display_order"),
      ]);

      if (sectorsRes.data) setSectors(sectorsRes.data);
      if (regionsRes.data) setRegions(regionsRes.data);
      if (currenciesRes.data) setCurrencies(currenciesRes.data);
      setDataLoading(false);
    }

    loadReferenceData();
  }, []);

  const sectorsByGroup = sectors.reduce<Record<string, Sector[]>>((acc, s) => {
    if (!acc[s.sector_group]) acc[s.sector_group] = [];
    acc[s.sector_group].push(s);
    return acc;
  }, {});

  const regionsByGroup = regions.reduce<Record<string, Region[]>>((acc, r) => {
    if (!acc[r.region_group]) acc[r.region_group] = [];
    acc[r.region_group].push(r);
    return acc;
  }, {});

  const CURRENCIES = [
    "eur", "gbp", "usd", "chf",
    "aud", "cad", "jpy", "cny",
    "inr", "brl", "krw", "mxn",
    "nok", "sek", "zar", "try",
    "idr", "nzd", "rub", "dkk",
    "ron", "pln", "bgn", "czk",
  ];

  /**
   * Converts revenue to EUR using units table exchange rates.
   * Falls back to 1.0 if currency is EUR or rate not found.
   */
  async function convertToEUR(amount: number, currency: string): Promise<number> {
    if (currency === "EUR") return amount;

    const { data, error } = await supabase
      .from("units")
      .select("conversion_factor")
      .eq("unit_code", currency)
      .eq("reporting_year", REPORTING_YEAR)
      .single();

    if (error || !data) {
      console.warn(`[Estimator] no exchange rate for ${currency} — using 1.0`);
      return amount;
    }

    return amount * (data as Unit).conversion_factor;
  }

  /**
   * Main estimate function.
   * 1. Convert revenue to EUR
   * 2. Fetch benchmark for sector + region
   * 3. Calculate scope totals
   * 4. Set result state
   */
  async function handleEstimate() {
    const rev = parseFloat(revenue);

    if (!rev || rev <= 0) {
      setError("Please enter a valid revenue amount.");
      return;
    }
    if (!sectorCode) {
      setError("Please select a sector.");
      return;
    }
    if (!regionCode) {
      setError("Please select a region.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setBenchmark(null);

    // Step 1 — convert revenue to EUR
    const revenueEUR = await convertToEUR(rev, currency);

    // Step 2 — fetch benchmark
    const { data: benchmarkData, error: benchmarkError } = await supabase
      .from("sector_benchmarks")
      .select("scope1_avg, scope2_avg, scope3_avg, total_avg, source")
      .eq("sector_code", sectorCode)
      .eq("region_code", regionCode)
      .eq("reporting_year", REPORTING_YEAR)
      .single();

    if (benchmarkError || !benchmarkData) {
      // Try global average as fallback
      const { data: globalData } = await supabase
        .from("sector_benchmarks")
        .select("scope1_avg, scope2_avg, scope3_avg, total_avg, source")
        .eq("sector_code", sectorCode)
        .eq("region_code", "GLOBAL")
        .eq("reporting_year", REPORTING_YEAR)
        .single();

      if (!globalData) {
        setError("No benchmark data available for this sector and region combination.");
        setLoading(false);
        return;
      }

      setBenchmark(globalData as Benchmark);
      calculateResult(revenueEUR, globalData as Benchmark);
    } else {
      setBenchmark(benchmarkData as Benchmark);
      calculateResult(revenueEUR, benchmarkData as Benchmark);
    }

    setLoading(false);
    setView("result");
  }

  function calculateResult(revenueEUR: number, b: Benchmark) {
    // Round to 1 decimal place
    const round = (n: number) => Math.round(n * 10) / 10;

    setResult({
      total:  round(revenueEUR * b.total_avg),
      scope1: round(revenueEUR * b.scope1_avg),
      scope2: round(revenueEUR * b.scope2_avg),
      scope3: round(revenueEUR * b.scope3_avg),
    });
  }

  // ── Chart data ──
  const chartData = result ? [
    { name: "Scope 1", value: result.scope1 },
    { name: "Scope 2", value: result.scope2 },
    { name: "Scope 3", value: result.scope3 },
  ] : [];
    
  useEffect(() => {
  if (!result) return;

  const duration = 900; // ms
  const steps = 60;
  let step = 0;
  function easeOut(t: number): number {
    return 1 - Math.pow(1 - t, 5);
  }

  const timer = setInterval(() => {
    step++;
    const progress = step / steps;
    const easedProgress = easeOut(progress);

   if (step >= steps) {
      setDisplayTotal(result.total);
      clearInterval(timer);
    } else {
      setDisplayTotal(
        Math.round(easedProgress * result.total * 10) / 10
      );
    }
  }, duration / steps);

  return () => clearInterval(timer);
}, [result]);

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const sectionStyle: React.CSSProperties = {
  padding: "12px",
  paddingTop: "35px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const widgetLabelStyle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: 600,
  letterSpacing: "-1px",
  color: COLORS.black,
  marginBottom: "20px",
  opacity: 1,
  fontFamily: "var(--font-unbounded)",
};

const resultLabelStyle: React.CSSProperties = {
  fontSize: "12px",
  color: COLORS.black,
  opacity: 0.6,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  marginBottom: "6px",
  fontFamily: "var(--font-geist-mono)",
};

const totalValueStyle: React.CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontWeight: 900,
  fontSize: "40px",
  color: COLORS.black,
  letterSpacing: "-1.5px",
  lineHeight: 1,
};

const totalUnitStyle: React.CSSProperties = {
  fontSize: "13px",
  color: COLORS.black,
  opacity: 0.6,
  fontFamily: "var(--font-geist-mono)",
};

const disclaimerStyle: React.CSSProperties = {
  background: "rgba(0,0,0,0.07)",
  borderRadius: "8px",
  padding: "14px 16px",
  marginBottom: "8px",
};

const disclaimerTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: "14px",
  fontWeight: 500,
  color: COLORS.black,
  letterSpacing: "0.5px",
  marginBottom: "8px",
};

const disclaimerBodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: "12px",
  color: COLORS.black,
  opacity: 0.8,
  lineHeight: 1.6,
  marginBottom: "8px",
};

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
  <div style={sectionStyle}>

    {dataLoading ? (
      <p style={{
        fontSize: "12px",
        color: COLORS.textMuted,
        fontFamily: "var(--font-geist-mono)",
      }}>
        Loading data...
      </p>
    ) : view === "input" ? (

      /* ── Input view ── */
     <div className="fade-up" style={{ display: "flex", flexDirection: "column" }}>

        <div style={{ marginBottom: "40px" }}>
          <p style={widgetLabelStyle}>Estimate Your Footprint.</p>
          <h2 style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 600,
            fontSize: "14px",
            color: COLORS.text,
            letterSpacing: "-0.px",
            marginBottom: "16px",
          }}>
            Open source GHG modelling based on sector, region, and annual revenue.
          </h2>
          <p style={{
            fontSize: "12px",
            fontWeight: 500,
            color: COLORS.black,
            opacity: 0.6,
            fontFamily: "var(--font-geist-mono)",
          }}>
            Powered by Exiobase 3 EEIO data.
          </p>
        </div>

        {/* Revenue + currency */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "30px",
        }}>
          <div>
            <label style={labelStyle}>Revenue</label>
            <input
              type="number"
              placeholder="5,000,000"
              value={revenue}
              onChange={e => setRevenue(e.target.value)}
              style={inputStyle}
              aria-label="Revenue"
            />
          </div>
          <div>
            <label style={labelStyle}>Currency</label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              style={inputStyle}
              aria-label="Currency"
            >
              {currencies.map(c => (
                <option key={c.unit_code} value={c.unit_code}>
                  {c.display_name_en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sector + region */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "50px",
        }}>
          <div>
            <label style={labelStyle}>Sector</label>
            <select
              value={sectorCode}
              onChange={e => setSectorCode(e.target.value)}
              style={inputStyle}
              aria-label="Sector"
            >
              <option value="">Select sector</option>
              {Object.entries(sectorsByGroup).map(([group, items]) => (
                <optgroup key={group} label={group}>
                  {items.map(s => (
                    <option key={s.sector_code} value={s.sector_code}>
                      {s.display_name_en}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Region</label>
            <select
              value={regionCode}
              onChange={e => setRegionCode(e.target.value)}
              style={inputStyle}
              aria-label="Region"
            >
              <option value="">Select region</option>
              {Object.entries(regionsByGroup).map(([group, items]) => (
                <optgroup key={group} label={group}>
                  {items.map(r => (
                    <option key={r.region_code} value={r.region_code}>
                      {r.display_name_en}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{
            fontSize: "12px",
            color: COLORS.danger,
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "16px",
          }}>
            {error}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handleEstimate}
          disabled={loading}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: "100%",
            background: COLORS.text,
            color: COLORS.volt,
            border: "none",
            borderRadius: "48px",
            padding: "18px",
            fontSize: "16px",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "var(--font-unbounded)",
            opacity: loading ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          aria-label="Calculate emission estimate"
        >
          {loading ? "Calculating..." : (
            <>
                Estimate 
                <span style={{
                display: "inline-block",
                transition: "transform 0.2s ease",
                transform: hovered ? "translateX(5px)" : "translateX(0)",
            }}>→</span>
            </>
          )}
        </button>

      </div>

    ) : (

      /* ── Result view ── */
      <div className="fade-up" style={{ display: "flex", flexDirection: "column" }}>

        {/* Back button */}
        <button
          onClick={() => {
            setView("input");
            setResult(null);
            setBenchmark(null);
          }}
          style={{
            background: "none",
            border: "none",
            color: COLORS.black,
            opacity: 0.6,
            fontSize: "14px",
            fontFamily: "var(--font-geist-mono)",
            cursor: "pointer",
            textAlign: "left",
            padding: "0",
            marginBottom: "20px",
          }}
        >
          ← Recalculate
        </button>

        {result && benchmark && (
          <>
            {/* Total */}
            <p style={resultLabelStyle}>Estimated total</p>
            <div style={{
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
              marginBottom: "16px",
            }}>
              <span style={totalValueStyle}>
                {displayTotal.toLocaleString()}
              </span>
              <span style={totalUnitStyle}>tCO₂e / year</span>
            </div>

            {/* Donut chart */}
            <div style={{ width: "100%", height: "160px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={44}
                    outerRadius={70}
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
                      background: COLORS.text,
                      border: "none",
                      borderRadius: "8px",
                      color: COLORS.volt,
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Scope breakdown */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              marginBottom: "16px",
            }}>
              {[
                { label: "Scope 1: Operations",           value: result.scope1 },
                { label: "Scope 2: Purchased Energy",    value: result.scope2 },
                { label: "Scope 3: Value Chain",         value: result.scope3 },
              ].map((entry, index) => (
                <div key={entry.label} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: SCOPE_COLORS[index],
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: "11px",
                      color: COLORS.black,
                      opacity: 0.6,
                      fontFamily: "var(--font-unbounded)",
                    }}>
                      {entry.label}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: COLORS.text,
                  }}>
                    {entry.value.toLocaleString()} tCO₂e
                  </span>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
<div style={disclaimerStyle}>
  <p style={disclaimerTitleStyle}>Indicative Estimate</p>
  <p style={disclaimerBodyStyle}>
    Uses sector-average EEIO emission intensities as a proxy.
    Your organisation's actual emissions may differ significantly.
  </p>
  <p style={{ ...disclaimerBodyStyle, marginBottom: 0 }}>
    <strong>Source:</strong>{" "}
    {benchmark.source ?? "Exiobase 3.8, own calculations"} · 
    GWP: IPCC AR6 · {REPORTING_YEAR}
  </p>
  <p style={{ ...disclaimerBodyStyle, marginBottom: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
    <strong>Data Quality Score:</strong> 3
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShowDQ(true)}
      onMouseLeave={() => setShowDQ(false)}
    >
      <span style={{
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        border: '1px solid currentColor',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        cursor: 'help',
        opacity: 0.6,
      }}>i</span>
      {showDQ && (
        <span style={{
          position: 'absolute',
          bottom: '120%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1a1a1a',
          color: '#fff',
          borderRadius: '6px',
          padding: '8px 10px',
          fontSize: '11px',
          lineHeight: '1.5',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          <strong>1 — High:</strong> Directly measured and verified<br/>
          <strong>2 — Medium:</strong> Based on activity data combined with industry averages<br/>
          <strong>3 — Low:</strong> Derived from broad averages or proxies 
        </span>
      )}
    </span>
  </p>
</div>
</>
        )}
      </div>
    )}
  </div>
);
} 
