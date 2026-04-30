
"use client";

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
        {["Tile 1", "Tile 2", "Tile 3"].map(t => (
          <div key={t} style={{
            background: "#4F52D8",
            borderRadius: "8px",
            minHeight: "350px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#3D4E68", textTransform: "uppercase" }}>
              {t}
            </span>
          </div>
        ))}
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