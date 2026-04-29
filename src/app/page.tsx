/**
 * @file page.tsx
 * @description Landing page for OpenGHG.
 */

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

// ─────────────────────────────────────────────
// Landing page
// ─────────────────────────────────────────────

export default function Home() {
  return (
    <main>
      {/* Top navigation */}
      <Navbar />

      {/* Hero — headline + quick estimate widget */}
      <Hero />

      {/* TODO: TrustStrip */}
      {/* TODO: HowItWorks */}
      {/* TODO: Transparency */}
      {/* TODO: FinalCTA */}
      {/* TODO: Footer */}
    </main>
  );
}