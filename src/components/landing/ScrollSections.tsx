
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
      minHeight: "280px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-end",
      padding: "24px",
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
        lineHeight: 1,
        maxWidth: "220px",
      }}>
        {label}
      </span>
    </div>
  );
}

function FadeSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
      ...style,
    }}>
      {children}
    </div>
  );
}

const pillButton: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: "12px",
  fontWeight: 500,
  color: COLORS.black,
  border: "1px solid rgba(0, 0, 0, 0.81)",
  borderRadius: "24px",
  padding: "6px 12px",
  display: "inline-block",
  marginBottom: "30px",
};

const pillButtonLight: React.CSSProperties = {
  ...pillButton,
  color: "#F0F2F5",
  border: "1px solid #F0F2F5",
};

function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        margin: "5px 1px 0",
        background: "#FFFFFF",
        borderRadius: "8px",
        minHeight: "350px",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        padding: "60px 24px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        <span style={pillButton}>Why?</span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "end",
      }}>
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        }}>
          <p style={{
            fontFamily: "var(--font-unbounded)",
            fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 42px)",
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            color: "#0E1520",
          }}>
            Decarbonisation is a global challenge.<br /> Carbon data should not be a luxury.
          </p>
        </div>

        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
        }}>
        
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "13px", lineHeight: 1.5, color: COLORS.black, fontWeight: 500, maxWidth: "480px" }}>
            Audit-ready emissions calculations come at a cost that puts them out of reach for many organisations.
          </p>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "13px", lineHeight: 1.5, color: COLORS.black, fontWeight: 500, maxWidth: "480px", marginTop: "20px" }}>
            OpenGHG is built on the belief that access to rigorous, transparent carbon accounting is a common good. Decarbonisation cannot succeed if the tools to measure it remain behind a paywall.
          </p>
        </div>
      </div>

      <div style={{ marginTop: "80px", opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.45s" }} />
    </div>
  );
}

function PlatformSection() {
  const features = [
    { label: "Quick estimator", desc: "Spend-based GHG estimate across all three scopes in minutes." },
    { label: "Full inventory", desc: "Complete GHG inventory across Scopes 1, 2, and 3 with detailed category breakdowns." },
    { label: "Multi-entity support", desc: "Calculate consolidated results across subsidiaries and complex organisational structures." },
    { label: "Public library", desc: "Access the underlying emission factors, methodology, and documentation." },
    { label: "Audit-ready export", desc: "Export results in a format ready for disclosure, reporting, or external review." },
  ];

  return (
    <div style={{
      margin: "1px 1px 0",
      background: "#FFFFFF",
      borderRadius: "8px",
      padding: "60px 24px",
    }}>
      <FadeSection>
        <span style={pillButton}>Features</span>
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 700,
          fontSize: "clamp(32px, 2.8vw, 42px)",
          lineHeight: 1.15,
          letterSpacing: "-0.5px",
          color: "#0E1520",
          maxWidth: "600px",
        }}>
          Quick estimate in seconds. <br />
          Full inventory when you need it.
        </p>
      </FadeSection>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1px",
        marginTop: "40px",
        background: "#F0F2F5",
        borderRadius: "8px",
        overflow: "hidden",
      }}>
        {features.map((f, i) => (
          <FadeSection key={f.label} style={{ transitionDelay: `${i * 0.08}s` }}>
            <div style={{
              background: "#FFFFFF",
              padding: "28px 24px",
              height: "100%",
            }}>
              <div style={{ width: "24px", height: "3px", background: "#C8F135", marginBottom: "16px" }} />
              <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 700, fontSize: "13px", color: "#0E1520", marginBottom: "10px" }}>
                {f.label}
              </p>
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "12px", lineHeight: 1.7, color: "#3D4E68" }}>
                {f.desc}
              </p>
            </div>
          </FadeSection>
        ))}
      </div>
    </div>
  );
}

function WhatsNextSection() {
  const items = [
    { label: "Analytics", desc: "Explore emissions data in depth — benchmark against sector peers, identify hotspots, and track performance over time." },
    { label: "Reduction strategy", desc: "Set targets, model net zero pathways, and move from measurement to action with structured roadmap tools." },
  ];

  return (
    <div style={{
      margin: "1px 1px 0",
      background: COLORS.black,
      borderRadius: "8px",
      padding: "60px 24px",
    }}>
      <FadeSection>
        <span style={pillButtonLight}>Development</span>
        <p style={{
          fontFamily: "var(--font-unbounded)",
          fontWeight: 700,
          fontSize: "clamp(32px, 2.8vw, 42px)",
          lineHeight: 1.15,
          letterSpacing: "-0.5px",
          color: "#F0F2F5",
          maxWidth: "600px",
        }}>
          What's Next.
        </p>
      </FadeSection>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1px",
        marginTop: "40px",
        background: "#3D4E68",
        borderRadius: "8px",
        overflow: "hidden",
      }}>
        {items.map((item, i) => (
          <FadeSection key={item.label} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div style={{
              background: "#1C2432",
              padding: "36px 28px",
              height: "100%",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C8F135" }} />
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "10px", letterSpacing: "2px", color: "#8A9AB8", textTransform: "uppercase" }}>
                  Coming soon
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 700, fontSize: "15px", color: "#F0F2F5", marginBottom: "12px" }}>
                {item.label}
              </p>
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "13px", lineHeight: 1.7, color: "#8A9AB8" }}>
                {item.desc}
              </p>
            </div>
          </FadeSection>
        ))}
      </div>
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
        <CounterTile target={15} label={<>Scope 3 categories<br />covered</>} duration={1200} />
        <CounterTile target={9500} label={<>Emission factors from<br />vetted public sources</>} duration={1350} />
        <CounterTile target={100} suffix="%" label={<>Commitment to transparency<br />and data ownership</>} duration={1500} />
      </div>

      {/* Why section */}
      <WhySection />

      {/* Scope visualisation — placeholder */}
      <div style={{
      margin: "1px 1px 0",
      background: COLORS.black,
      borderRadius: "8px",
      minHeight: "1000px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
    <span style={{
    fontFamily: "var(--font-geist-mono)",
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#3D4E68",
    textTransform: "uppercase",
    }}>
    Scope 1 · 2 · 3 — visualisation coming
    </span>
  </div>

      {/* Platform section */}
      <PlatformSection />

      {/* What's next section */}
      <WhatsNextSection />

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
          OPEN SOURCE. OPEN DATA. OPEN ACCESS.
        </span>
        <span style={{ fontSize: "11px", color: "#3D4E68", fontFamily: "var(--font-geist-mono)" }}>
          open-ghg.org
        </span>
      </div>

    </div>
  );
}