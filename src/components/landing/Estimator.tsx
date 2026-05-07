"use client";

import type { CSSProperties } from "react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { createClient } from "@/lib/supabase/client";
import { COLORS, SCOPE_COLORS } from "@/lib/constants";
import { inputStyle, labelStyle } from "@/lib/styles";

// ── Types ──

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

// ── Constants ──

const REPORTING_YEAR = 2025;

const SCOPES = [
  { label: "Scope 1: Operations",       key: "scope1" as const },
  { label: "Scope 2: Purchased Energy", key: "scope2" as const },
  { label: "Scope 3: Value Chain",      key: "scope3" as const },
];

// ── Helpers ──

const round1 = (n: number) => Math.round(n * 10) / 10;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 5);

// ── Styles ──

const section: CSSProperties = {
  padding: "12px",
  paddingTop: "100px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const widgetLabel: CSSProperties = {
  fontSize: "32px",
  fontWeight: 600,
  letterSpacing: "-1px",
  color: COLORS.black,
  marginBottom: "20px",
  fontFamily: "var(--font-unbounded)",
};

const subtitle: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontWeight: 500,
  fontSize: "13px",
  color: COLORS.text,
  marginBottom: "5px",
};

const poweredBy: CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: COLORS.black,
  fontFamily: "var(--font-geist-mono)",
};

const twoColGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
};

const errorText: CSSProperties = {
  fontSize: "12px",
  color: COLORS.danger,
  fontFamily: "var(--font-geist-mono)",
  marginBottom: "16px",
};

const estimateBtn: CSSProperties = {
  width: "100%",
  background: COLORS.text,
  color: COLORS.volt,
  border: "none",
  borderRadius: "48px",
  padding: "18px",
  fontSize: "16px",
  fontWeight: 600,
  fontFamily: "var(--font-unbounded)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const backBtn: CSSProperties = {
  background: "none",
  border: "none",
  color: COLORS.black,
  fontSize: "13px",
  fontWeight: 500,
  fontFamily: "var(--font-geist-mono)",
  cursor: "pointer",
  textAlign: "left",
  padding: "0",
  marginBottom: "20px",
};

const resultLabel: CSSProperties = {
  fontSize: "13px",
  color: COLORS.black,
  opacity: 0.6,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  marginBottom: "6px",
  fontFamily: "var(--font-geist-mono)",
};

const totalValue: CSSProperties = {
  fontFamily: "var(--font-unbounded)",
  fontWeight: 900,
  fontSize: "40px",
  color: COLORS.black,
  letterSpacing: "-1.5px",
  lineHeight: 1,
};

const totalUnit: CSSProperties = {
  fontSize: "13px",
  color: COLORS.black,
  opacity: 0.6,
  fontFamily: "var(--font-geist-mono)",
};

const scopeLabel: CSSProperties = {
  fontSize: "11px",
  color: COLORS.black,
  opacity: 0.6,
  fontFamily: "var(--font-unbounded)",
};

const scopeValue: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: "12px",
  fontWeight: 500,
  color: COLORS.text,
};

const disclaimerBox: CSSProperties = {
  background: "rgba(0,0,0,0.07)",
  borderRadius: "8px",
  padding: "14px 16px",
  marginBottom: "8px",
};

const disclaimerTitle: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: "14px",
  fontWeight: 500,
  color: COLORS.black,
  letterSpacing: "0.5px",
  marginBottom: "8px",
};

const disclaimerBody: CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: "12px",
  color: COLORS.black,
  opacity: 0.8,
  lineHeight: 1.6,
  marginBottom: "8px",
};

const tooltipTrigger: CSSProperties = {
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  border: "1px solid currentColor",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  cursor: "help",
  opacity: 0.6,
};

const tooltipBubble: CSSProperties = {
  position: "absolute",
  bottom: "120%",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#1a1a1a",
  color: "#fff",
  borderRadius: "6px",
  padding: "8px 10px",
  fontSize: "11px",
  lineHeight: 1.5,
  whiteSpace: "nowrap",
  pointerEvents: "none",
  zIndex: 10,
};

// ── Supabase client ──

const supabase = createClient();

// ── Component ──

export default function Estimator() {
  const [view,         setView]         = useState<View>("input");
  const [sectors,      setSectors]      = useState<Sector[]>([]);
  const [regions,      setRegions]      = useState<Region[]>([]);
  const [currencies,   setCurrencies]   = useState<Currency[]>([]);
  const [revenue,      setRevenue]      = useState("");
  const [currency,     setCurrency]     = useState("EUR");
  const [sectorCode,   setSectorCode]   = useState("");
  const [regionCode,   setRegionCode]   = useState("");
  const [result,       setResult]       = useState<EstimateResult | null>(null);
  const [benchmark,    setBenchmark]    = useState<Benchmark | null>(null);
  const [loading,      setLoading]      = useState(false);
  const [dataLoading,  setDataLoading]  = useState(true);
  const [error,        setError]        = useState<string | null>(null);
  const [displayTotal, setDisplayTotal] = useState(0);
  const [showDQ,       setShowDQ]       = useState(false);
  const [hovered,      setHovered]      = useState(false);

  useEffect(() => {
    async function loadReferenceData() {
      const [sectorsRes, regionsRes, currenciesRes] = await Promise.all([
        supabase.from("sectors").select("sector_code, display_name_en, sector_group").order("sector_group").order("display_order"),
        supabase.from("regions").select("region_code, display_name_en, region_group").order("region_group").order("display_order"),
        supabase.from("units").select("unit_code, display_name_en").eq("unit_type", "currency").eq("reporting_year", REPORTING_YEAR).order("display_order"),
      ]);
      if (sectorsRes.data)    setSectors(sectorsRes.data);
      if (regionsRes.data)    setRegions(regionsRes.data);
      if (currenciesRes.data) setCurrencies(currenciesRes.data);
      setDataLoading(false);
    }
    loadReferenceData();
  }, []);

  useEffect(() => {
    if (!result) return;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setDisplayTotal(result.total);
        clearInterval(timer);
      } else {
        setDisplayTotal(round1(easeOut(step / steps) * result.total));
      }
    }, 900 / steps);
    return () => clearInterval(timer);
  }, [result]);

  const sectorsByGroup = sectors.reduce<Record<string, Sector[]>>((acc, s) => {
    (acc[s.sector_group] ??= []).push(s);
    return acc;
  }, {});

  const regionsByGroup = regions.reduce<Record<string, Region[]>>((acc, r) => {
    (acc[r.region_group] ??= []).push(r);
    return acc;
  }, {});

  async function convertToEUR(amount: number, currencyCode: string): Promise<number> {
    if (currencyCode === "EUR") return amount;
    const { data } = await supabase
      .from("units")
      .select("conversion_factor")
      .eq("unit_code", currencyCode)
      .eq("reporting_year", REPORTING_YEAR)
      .single();
    return data ? amount * (data as Unit).conversion_factor : amount;
  }

  async function handleEstimate() {
    const rev = parseFloat(revenue);
    if (!rev || rev <= 0) return setError("Please enter a valid revenue amount.");
    if (!sectorCode)      return setError("Please select a sector.");
    if (!regionCode)      return setError("Please select a region.");

    setLoading(true);
    setError(null);
    setResult(null);
    setBenchmark(null);

    const revenueEUR = await convertToEUR(rev, currency);

    const fetchBenchmark = (regionOverride: string) =>
      supabase
        .from("sector_benchmarks")
        .select("scope1_avg, scope2_avg, scope3_avg, total_avg, source")
        .eq("sector_code", sectorCode)
        .eq("region_code", regionOverride)
        .eq("reporting_year", REPORTING_YEAR)
        .single();

    let { data: bm } = await fetchBenchmark(regionCode);
    if (!bm) ({ data: bm } = await fetchBenchmark("GLOBAL"));

    if (!bm) {
      setError("No benchmark data available for this sector and region combination.");
      setLoading(false);
      return;
    }

    const b = bm as Benchmark;
    setBenchmark(b);
    setResult({
      total:  round1(revenueEUR * b.total_avg),
      scope1: round1(revenueEUR * b.scope1_avg),
      scope2: round1(revenueEUR * b.scope2_avg),
      scope3: round1(revenueEUR * b.scope3_avg),
    });
    setLoading(false);
    setView("result");
  }

  const chartData = result
    ? SCOPES.map(({ label, key }) => ({ name: label.split(":")[0], value: result[key] }))
    : [];

  return (
    <div style={section}>
      {dataLoading ? (
        <p style={{ fontSize: "12px", color: COLORS.textMuted, fontFamily: "var(--font-geist-mono)" }}>
          Loading data...
        </p>
      ) : view === "input" ? (

        <div className="fade-up" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "50px" }}>
            <p style={widgetLabel}>Estimate Your Footprint.</p>
            <h2 style={subtitle}>Full-scope GHG modelling based on sector, region, and annual revenue.</h2>
            <p style={poweredBy}>Powered by Exiobase 3 EEIO data.</p>
          </div>

          <div style={{ ...twoColGrid, marginBottom: "30px" }}>
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
              <select value={currency} onChange={e => setCurrency(e.target.value)} style={inputStyle} aria-label="Currency">
                {currencies.map(c => (
                  <option key={c.unit_code} value={c.unit_code}>{c.display_name_en}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ ...twoColGrid, marginBottom: "50px" }}>
            <div>
              <label style={labelStyle}>Sector</label>
              <select value={sectorCode} onChange={e => setSectorCode(e.target.value)} style={inputStyle} aria-label="Sector">
                <option value="">Select sector</option>
                {Object.entries(sectorsByGroup).map(([group, items]) => (
                  <optgroup key={group} label={group}>
                    {items.map(s => <option key={s.sector_code} value={s.sector_code}>{s.display_name_en}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Region</label>
              <select value={regionCode} onChange={e => setRegionCode(e.target.value)} style={inputStyle} aria-label="Region">
                <option value="">Select region</option>
                {Object.entries(regionsByGroup).map(([group, items]) => (
                  <optgroup key={group} label={group}>
                    {items.map(r => <option key={r.region_code} value={r.region_code}>{r.display_name_en}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {error && <p style={errorText}>{error}</p>}

          <button
            onClick={handleEstimate}
            disabled={loading}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ ...estimateBtn, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
            aria-label="Calculate emission estimate"
          >
            {loading ? "Calculating..." : (
              <>
                Estimate
                <span style={{ display: "inline-block", transition: "transform 0.2s ease", transform: hovered ? "translateX(5px)" : "translateX(0)" }}>
                  →
                </span>
              </>
            )}
          </button>
        </div>

      ) : (

        <div className="fade-up" style={{ display: "flex", flexDirection: "column", marginTop: "-24px" }}>
          <button
            onClick={() => { setView("input"); setResult(null); setBenchmark(null); }}
            style={backBtn}
          >
            ← Recalculate
          </button>

          {result && benchmark && (
            <>
              <p style={resultLabel}>Estimated total</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "16px" }}>
                <span style={totalValue}>{displayTotal.toLocaleString()}</span>
                <span style={totalUnit}>tCO₂e / year</span>
              </div>

              <div style={{ width: "100%", height: "160px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={44} outerRadius={70} paddingAngle={2} dataKey="value">
                      {chartData.map((_, i) => <Cell key={i} fill={SCOPE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) =>
                        value != null ? [`${Number(value).toLocaleString()} tCO₂e`, name] : ["", name]
                      }
                      contentStyle={{
                        background: COLORS.white,
                        border: "1px solid rgba(0,0,0,0.81)",
                        borderRadius: "24px",
                        color: COLORS.black,
                        fontSize: "12px",
                        fontFamily: "var(--font-geist-mono)",
                        padding: "2px 8px",
                      }}
                      itemStyle={{ color: COLORS.black }}
                      labelStyle={{ color: COLORS.black }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                {SCOPES.map(({ label, key }, i) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: SCOPE_COLORS[i], flexShrink: 0 }} />
                      <span style={scopeLabel}>{label}</span>
                    </div>
                    <span style={scopeValue}>{result[key].toLocaleString()} tCO₂e</span>
                  </div>
                ))}
              </div>

              <div style={disclaimerBox}>
                <p style={disclaimerTitle}>Indicative Estimate</p>
                <p style={disclaimerBody}>
                  Uses sector-average EEIO emission intensities as a proxy.
                  Your organisation's actual emissions may differ significantly.
                </p>
                <p style={{ ...disclaimerBody, marginBottom: "8px" }}>
                  <strong>Source:</strong>{" "}
                  {benchmark.source ?? "Exiobase 3.8, own calculations"} · GWP: IPCC AR6 · {REPORTING_YEAR}
                </p>
                <p style={{ ...disclaimerBody, marginBottom: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                  <strong>Data Quality Score:</strong> 3
                  <span
                    style={{ position: "relative", display: "inline-flex" }}
                    onMouseEnter={() => setShowDQ(true)}
                    onMouseLeave={() => setShowDQ(false)}
                  >
                    <span style={tooltipTrigger}>i</span>
                    {showDQ && (
                      <span style={tooltipBubble}>
                        <strong>1 — High:</strong> Directly measured and verified<br />
                        <strong>2 — Medium:</strong> Based on activity data combined with industry averages<br />
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
