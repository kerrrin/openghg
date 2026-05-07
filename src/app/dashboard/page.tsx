"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/lib/constants";
import Dashboard from "@/components/dashboard/Dashboard";

const loadingScreen: CSSProperties = {
  minHeight: "100vh",
  background: COLORS.page,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-geist-mono)",
  fontSize: "12px",
  letterSpacing: "2px",
  color: COLORS.textMuted,
  textTransform: "uppercase",
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  if (loading) return <div style={loadingScreen}>Loading...</div>;
  if (!user)   return null;

  return <Dashboard />;
}
