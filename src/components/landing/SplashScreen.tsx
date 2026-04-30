"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onComplete: () => void;
};

export default function SplashScreen({ onComplete }: Props) {
  const polyRef   = useRef<SVGPolygonElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cx = 261, cy = 261;
    const R = 320;
    const GAP_START_DEG = -18;
    const TOTAL_DEG = 335;
    const DRAW_MS = 1050;
    const HOLD_MS = 600;
    const FADE_MS = 700;

    function toRad(deg: number) { return deg * Math.PI / 180; }

    function buildPoints(sweepDeg: number): string {
      const pts: [number, number][] = [[cx, cy]];
      const steps = Math.max(2, Math.ceil(sweepDeg / 4));
      for (let i = 0; i <= steps; i++) {
        const angle = GAP_START_DEG + (sweepDeg * i / steps);
        pts.push([
          cx + R * Math.cos(toRad(angle)),
          cy + R * Math.sin(toRad(angle)),
        ]);
      }
      return pts.map(p => p.join(",")).join(" ");
    }

    function ease(t: number): number {
      return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3) / 2;
    }

    let startTime: number | null = null;

    function animateDraw(ts: number) {
      if (!startTime) startTime = ts;
      const t = Math.min((ts - startTime) / DRAW_MS, 1);
      if (polyRef.current) {
        polyRef.current.setAttribute("points", buildPoints(ease(t) * TOTAL_DEG));
      }
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animateDraw);
      } else {
        setTimeout(() => {
          if (splashRef.current) {
            splashRef.current.style.opacity = "0";
          }
          setTimeout(() => {
            setVisible(false);
            onComplete();
          }, FADE_MS);
        }, HOLD_MS);
      }
    }

    const timer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animateDraw);
    }, 200);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={splashRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#C8F135",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        transition: "opacity 0.7s ease",
      }}
    >
      <svg
        viewBox="0 0 522 522"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "280px", height: "280px" }}
      >
        <defs>
          <clipPath id="sweep">
            <polygon ref={polyRef} points="261,261 261,261 261,261" />
          </clipPath>
        </defs>
        <g clipPath="url(#sweep)">
          <path fill="#111111" d="M39.885,256.936 C39.934,264.620 39.984,272.304 39.833,280.732 C39.908,281.491 39.982,282.250 39.938,283.861 C41.710,306.869 46.126,329.274 55.499,350.491 C78.016,401.459 116.775,434.942 168.332,454.201 C208.679,469.272 250.521,472.362 293.133,468.452 C324.418,465.582 354.301,457.843 382.178,443.180 C430.301,417.868 463.108,379.738 478.161,327.092 C485.845,300.218 487.501,272.762 484.848,245.014 C483.317,229.008 480.207,213.329 475.182,199.268 C456.655,217.348 438.028,235.637 419.219,253.736 C416.929,255.939 416.260,257.974 416.205,261.034 C416.028,270.996 416.113,281.043 414.825,290.891 C408.699,337.758 384.356,371.874 341.900,392.789 C319.586,403.782 295.546,407.603 270.071,408.750 C264.721,408.812 259.372,408.873 253.166,408.751 C236.835,407.948 220.705,405.824 205.046,400.961 C170.279,390.164 142.616,370.283 125.147,337.683 C110.323,310.018 106.644,280.268 110.102,249.551 C116.596,191.855 148.162,154.215 202.943,135.980 C228.403,127.505 254.717,125.980 281.358,128.039 C308.139,130.109 333.423,136.874 356.292,151.324 C358.927,152.989 360.462,152.603 362.797,151.092 C372.696,144.682 382.563,138.190 392.775,132.307 C401.582,127.233 410.841,122.943 420.048,118.231 C405.931,106.249 390.367,96.521 373.575,88.694 C343.289,74.580 311.243,68.043 278.046,66.561 C238.744,64.807 200.119,68.629 163.515,83.837 C88.237,115.114 46.230,171.077 39.839,253.729 C39.904,254.489 39.969,255.249 39.885,256.936z" />
          <path fill="#111111" d="M270.986,408.949 C295.546,407.603 319.586,403.782 341.900,392.789 C384.356,371.874 408.699,337.758 414.825,290.891 C416.113,281.043 416.028,270.996 416.205,261.034 C416.260,257.974 416.929,255.939 419.219,253.736 C438.028,235.637 456.655,217.348 475.182,199.268 C480.207,213.329 483.317,229.008 484.848,245.014 C487.501,272.762 485.845,300.218 478.161,327.092 C463.108,379.738 430.301,417.868 382.178,443.180 C354.301,457.843 324.418,465.582 293.133,468.452 C250.521,472.362 208.679,469.272 168.332,454.201 C116.775,433.942 78.016,400.459 55.499,350.491 C46.126,329.274 41.710,305.869 40.387,283.327 C41.201,282.291 41.878,281.792 41.883,281.286 C41.966,272.657 42.018,264.027 41.900,255.400 C41.889,254.589 40.699,253.793 40.056,252.991 C46.230,171.077 88.237,115.114 163.515,83.837 C200.119,68.629 238.744,64.807 278.046,66.561 C311.243,68.043 343.289,74.580 373.575,88.694 C390.367,96.521 405.931,106.249 420.048,118.231 C410.841,122.943 401.582,127.233 392.775,132.307 C382.563,138.190 372.696,144.682 362.797,151.092 C360.462,152.603 358.927,152.989 356.292,151.324 C333.423,136.874 308.139,130.109 281.358,128.039 C254.717,125.980 228.403,127.505 202.943,135.980 C148.162,154.215 116.596,191.855 110.102,249.551 C106.644,280.268 110.323,310.018 125.147,337.683 C142.616,370.283 170.279,390.164 205.046,400.961 C220.705,405.824 236.835,407.948 253.327,409.151 C250.723,409.812 247.959,410.074 245.194,410.335 C257.145,410.335 269.047,410.335 282.387,410.335 C277.626,409.012 274.306,408.480 270.986,408.949z" />
        </g>
      </svg>
    </div>
  );
}