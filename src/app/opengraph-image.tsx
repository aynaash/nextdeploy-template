import { ImageResponse } from "next/og";

export const alt =
  "NextDeploy — deploy full-stack apps from the Silicon Savannah";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamic social-share card. Edit the copy/colors here; no image file to ship.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0c0a09",
          color: "white",
          padding: 80,
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        {/* Kenyan flag stripe */}
        <div style={{ display: "flex", height: 12, width: "100%" }}>
          <div style={{ flex: 1, background: "#000" }} />
          <div style={{ width: 6, background: "#fff" }} />
          <div style={{ flex: 2, background: "#BB0000" }} />
          <div style={{ width: 6, background: "#fff" }} />
          <div style={{ flex: 1, background: "#006600" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 28, color: "#a8a29e" }}>
            🇰🇪 Built in the Silicon Savannah · Nairobi
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Deploy full-stack Next.js apps to a VPS you own.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "#78716c" }}>
          Next.js · better-auth · Neon Postgres · one command
        </div>
      </div>
    ),
    size,
  );
}
