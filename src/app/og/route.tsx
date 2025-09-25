import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const width = 1200;
  const height = 630;

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: "flex",
          backgroundColor: "#22c55e",
          color: "#0A0E34",
          fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans, Apple Color Emoji, Segoe UI Emoji",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 64,
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 16,
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Simple brand glyph */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  border: "6px solid #22c55e",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: 4,
                    width: 24,
                    height: 10,
                    background: "#22c55e",
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
            <div style={{ fontSize: 60, fontWeight: 800, color: "#0A0E34" }}>PantMig</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: "#0A0E34", lineHeight: 1.1 }}>
              Få pant væk, giv andre en skilling
            </div>
            <div style={{ fontSize: 28, fontWeight: 500, color: "#0A0E34" }}>
              Vi forbinder danskere med pant med lokale indsamlere – nem afhentning, fair belønning og klimavenligt.
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 22, color: "#0A0E34", fontWeight: 600 }}>pantmig.dk</div>
            <div
              style={{
                background: "#0A0E34",
                color: "#ffffff",
                padding: "10px 16px",
                borderRadius: 8,
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              Del og gør en forskel
            </div>
          </div>
        </div>
      </div>
    ),
    { width, height }
  );
}
