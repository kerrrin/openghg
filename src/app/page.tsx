"use client";

import { useState, useEffect } from "react";
import SplashScreen from "@/components/landing/SplashScreen";
import Layout from "@/components/landing/Layout";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
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
      <Layout />
    </>
  );
}