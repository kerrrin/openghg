
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Dashboard from "@/components/dashboard/Dashboard";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#F0F2F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "12px",
        letterSpacing: "2px",
        color: "#8A9AB8",
        textTransform: "uppercase",
      }}>
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return <Dashboard />;
}