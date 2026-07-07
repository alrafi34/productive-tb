import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") ?? "Productive Toolbox";
  const subtitle = searchParams.get("subtitle") ?? "438+ Free Online Tools — No Sign-up Required";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(5, 133, 84, 0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(5, 133, 84, 0.06)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            height: "100%",
            gap: 0,
          }}
        >
          {/* Logo row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "#058554",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}
            >
              🧰
            </div>
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#058554",
                letterSpacing: "-0.5px",
              }}
            >
              Productive Toolbox
            </span>
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: title.length > 40 ? 52 : 64,
              fontWeight: 800,
              color: "#111827",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              marginBottom: 24,
              maxWidth: 900,
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: "#6b7280",
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: 700,
            }}
          >
            {subtitle}
          </div>

          {/* Badge row */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 48,
            }}
          >
            {["100% Browser-Based", "No Sign-up", "438+ Tools"].map((badge) => (
              <div
                key={badge}
                style={{
                  background: "white",
                  border: "2px solid #e5e7eb",
                  borderRadius: 100,
                  padding: "8px 20px",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#374151",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                ✓ {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Right accent bar */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 8,
            height: "100%",
            background: "#058554",
            display: "flex",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
