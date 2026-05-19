import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Store — Premium AI Tools Terpercaya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Brand accent stripe — mirrors .ai-stripe CSS */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background:
              "linear-gradient(90deg, #ef4444 0%, #f97316 50%, #3b82f6 100%)",
          }}
        />

        {/* Category label */}
        <p
          style={{
            color: "#ef4444",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Premium AI Tools
        </p>

        {/* Brand name */}
        <h1
          style={{
            color: "#ffffff",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.0,
            margin: "16px 0 24px",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          AI STORE
        </h1>

        {/* Tagline */}
        <p
          style={{
            color: "#a1a1aa",
            fontSize: 26,
            fontWeight: 300,
            margin: 0,
          }}
        >
          ChatGPT · Claude · Midjourney · dan lainnya
        </p>

        {/* URL */}
        <p
          style={{
            color: "#52525b",
            fontSize: 16,
            margin: "28px 0 0",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          ai-store.vercel.app
        </p>
      </div>
    ),
    { ...size },
  );
}
