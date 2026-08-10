import { ImageResponse } from "next/og";

import { BRAND_ASPECT, BRAND_MARK_DATA_URI } from "@/lib/brand";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Sosyal paylaşımlarda görünen 1200×630 kapak görseli.
 * Build sırasında üretilir; elle görsel hazırlamaya gerek yok.
 */
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
          padding: 80,
          background: "#0b0d11",
          backgroundImage:
            "radial-gradient(900px circle at 15% -10%, rgba(109,141,255,0.28), transparent 60%)",
          color: "#f0f3f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img
            src={BRAND_MARK_DATA_URI}
            width={Math.round(46 * BRAND_ASPECT)}
            height={46}
            alt=""
          />
          <div style={{ fontSize: 26, color: "#a2abbb" }}>{site.url.replace("https://", "")}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              maxWidth: 900,
            }}
          >
            Fikirden mağazaya, tek elden mobil uygulama.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#a2abbb" }}>
            {site.name} · iOS &amp; Android · REST API &amp; Backend
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["SwiftUI", "Kotlin", "Jetpack Compose", ".NET", "Next.js"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 10,
                border: "1px solid #2f3644",
                background: "#13171f",
                color: "#a2abbb",
                fontSize: 22,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
