import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lalla AI - Code for Health";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fff1f2 0%, #fdf2f8 50%, #fae8ff 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 60,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(244, 63, 94, 0.1)",
            color: "#e11d48",
            padding: "10px 24px",
            borderRadius: 999,
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          ❤️ The Da Vinci Code
        </div>

        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 32,
            background: "linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
            boxShadow: "0 20px 40px rgba(244, 63, 94, 0.4)",
          }}
        >
          <div style={{ fontSize: 80 }}>❤️</div>
        </div>

        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            background: "linear-gradient(135deg, #be123c 0%, #be185d 50%, #a21caf 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 16,
            letterSpacing: -2,
          }}
        >
          Lalla AI
        </div>

        <div
          style={{
            fontSize: 36,
            color: "#52525b",
            textAlign: "center",
            maxWidth: 900,
            marginBottom: 8,
          }}
        >
          Code for Health · Build for Impact
        </div>

        <div
          style={{
            fontSize: 26,
            color: "#71717a",
            textAlign: "center",
          }}
        >
          AI breast cancer awareness for Moroccan women · in Darija
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 50,
            display: "flex",
            gap: 16,
            fontSize: 22,
            color: "#a1a1aa",
          }}
        >
          <div>💬 Lalla Chat</div>
          <div>📋 Self-check</div>
          <div>📊 Risk Quiz</div>
          <div>🔔 Reminder</div>
        </div>
      </div>
    ),
    size,
  );
}
