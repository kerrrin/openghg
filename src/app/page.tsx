"use client";

import { useState, useEffect } from "react";
import SplashScreen from "@/components/landing/SplashScreen";
import Layout from "@/components/landing/Layout";
import ScrollSections from "@/components/landing/ScrollSections";
import Estimator from "@/components/landing/Estimator";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setShowSplash(true);
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
      <ScrollSections />
    </>
  );
}