
"use client";
import { COLORS } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

function CounterTile({
  target,
  prefix = "",
  suffix = "",
  label,
  duration = 2000,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: React.ReactNode;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const stepDuration = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.round(progress * target));
      if (step >= steps) clearInterval(timer);
    }, stepDuration);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return (
    <div ref={ref} style={{
      background: "#4F52D8",
      borderRadius: "8px",
      minHeight: "250px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-end",
      padding: "28px",
    }}>
      <span style={{
        fontFamily: "var(--font-unbounded)",
        fontWeight: 900,
        fontSize: "clamp(72px, 9vw, 85px)",
        lineHeight: 1,
        letterSpacing: "-2px",
        color: "#F0F2F5",
      }}>
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <span style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: "12px",
        fontWeight: 500,
        textTransform: "uppercase",
        color: "#F0F2F5",
        marginTop: "12px",
        lineHeight: 1.5,
        maxWidth: "220px",
      }}>
        {label}
      </span>
    </div>
  );
}

export default function ScrollSections() {
  return (
    <div style={{ background: "#1E1E1E", paddingBottom: "8px" }}>

      {/* 3 tiles */}
      <div style={{
        padding: "5px 1px 0",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "1px",
      }}>
        <CounterTile
          target={15}
          label={<>Scope 3 categories<br/>covered</>}
          duration={1200}
        />
        <CounterTile
          target={9500}
          label={<>Emission factors from<br/>vetted public sources</>}
          duration={1350}
        />
        <CounterTile
          target={100}
          suffix="%"
          label={<>Commitment to transparency<br/>and data ownership</>}
          duration={1500}
        />
      </div>

      {/* Big white field */}
      <div style={{
        margin: "5px 1px 0",
        background: "#FFFFFF",
        borderRadius: "8px",
        minHeight: "750px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <span style={{ fontSize: "11px", letterSpacing: "2px", color: "#8A9AB8", textTransform: "uppercase" }}>
          Content placeholder
        </span>
      </div>

      {/* Bottom bar */}
      <div style={{
        margin: "1px",
        background: "#FFFFFF",
        borderRadius: "8px",
        minHeight: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}>
        <span style={{ fontSize: "11px", color: "#3D4E68", fontFamily: "var(--font-geist-mono)" }}>
          © 2026 OpenGHG
        </span>
        <span style={{ fontSize: "11px", color: "#3D4E68", fontFamily: "var(--font-geist-mono)" }}>
          open-ghg.org
        </span>
      </div>

    </div>
  );
}