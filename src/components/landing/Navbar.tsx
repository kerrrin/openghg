"use client";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "22px 40px",
      borderBottom: "0.5px solid #D4E0D8",
    }}>
      <div style={{
        fontFamily: "var(--font-syne)",
        fontWeight: 800,
        fontSize: "17px",
        color: "#2D5C3F",
        letterSpacing: "-0.3px",
      }}>
        openghg
      </div>

      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <span style={{
          fontSize: "13px",
          color: "#1E1E1E",
          opacity: 0.5,
          cursor: "pointer",
        }}>
          About
        </span>
        <button style={{
          fontSize: "13px",
          color: "#1E1E1E",
          border: "0.5px solid #1E1E1E",
          padding: "8px 20px",
          borderRadius: "100px",
          background: "transparent",
          cursor: "pointer",
        }}>
          Sign in
        </button>
      </div>
    </nav>
  );
}