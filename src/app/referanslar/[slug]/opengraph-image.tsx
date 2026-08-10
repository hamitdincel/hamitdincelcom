import { ImageResponse } from "next/og";

import { getProject, projects } from "@/lib/projects";
import { BRAND_ASPECT, BRAND_MARK_DATA_URI } from "@/lib/brand";
import { site } from "@/lib/site";

export const alt = "Proje detayı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Her proje için ayrı sosyal paylaşım görseli — build sırasında üretilir. */
export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

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
          {/* Satori: birden fazla çocuğu olan her kapsayıcı ya flex olmalı ya da
              tek bir metin düğümü taşımalı — bu yüzden tek ifadede birleştirildi */}
          <div style={{ fontSize: 24, color: "#a2abbb" }}>
            {`${site.url.replace("https://", "")}/referanslar`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 24, color: "#90a8ff" }}>
            {`${project?.category ?? "Referans"} · ${project?.platforms ?? "iOS + Android"}`}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              maxWidth: 940,
            }}
          >
            {project?.name ?? "Proje"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 27,
              lineHeight: 1.4,
              color: "#a2abbb",
              maxWidth: 900,
            }}
          >
            {project?.tagline ?? ""}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {(project?.tags ?? []).slice(0, 5).map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 10,
                border: "1px solid #2f3644",
                background: "#13171f",
                color: "#a2abbb",
                fontSize: 21,
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
