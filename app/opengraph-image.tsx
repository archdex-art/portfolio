import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          backgroundColor: "#0b0a09",
          color: "#f6f1e9",
          padding: "80px",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Fine grid accent */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, #2e2926 1px, transparent 1px), linear-gradient(to bottom, #2e2926 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            opacity: 0.5,
          }}
        />
        {/* Copper glow */}
        <div
          style={{
            position: "absolute",
            top: "-260px",
            right: "-180px",
            width: "760px",
            height: "760px",
            display: "flex",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(224,101,58,0.32) 0%, rgba(224,101,58,0.10) 45%, rgba(11,10,9,0) 72%)",
          }}
        />

        {/* Top row: eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "2px",
              backgroundColor: "#e0653a",
              marginRight: "20px",
            }}
          />
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "24px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "#e0653a",
            }}
          >
            Editorial Engineering
          </div>
        </div>

        {/* Center block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "serif",
              fontSize: "216px",
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: "-4px",
              color: "#f6f1e9",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: "900px",
              marginTop: "36px",
              fontSize: "42px",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
              color: "#b8afa3",
            }}
          >
            Independent Software Engineer — AI Systems &amp; Developer Tooling
          </div>
        </div>

        {/* Bottom row: mono tech line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid #2e2926",
            paddingTop: "28px",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "28px",
              letterSpacing: "2px",
              color: "#8a8078",
            }}
          >
            Go · Rust · TypeScript · Python
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "9999px",
                backgroundColor: "#a6c77e",
                marginRight: "14px",
              }}
            />
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "26px",
                letterSpacing: "1px",
                color: "#a6c77e",
              }}
            >
              Available for select work
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
