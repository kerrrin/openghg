/**
 * @file page.tsx
 * @description Landing page for OpenGHG.
 * Shows splash screen on first load, then reveals landing page.
 */

"use client";

import { useState, useEffect } from "react";
import SplashScreen from "@/components/landing/SplashScreen";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Only show splash once per session
    const seen = sessionStorage.getItem("splash_seen");
    if (seen) setShowSplash(false);
  }, []);

  function handleSplashComplete() {
    sessionStorage.setItem("splash_seen", "true");
    setShowSplash(false);
  }

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <main>
        <Navbar />
        <Hero />
      </main>
    </>
  );
}