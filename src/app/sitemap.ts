import type { MetadataRoute } from "next";

import { projects } from "@/lib/projects";
import { site, staticRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: route === "/" ? site.url : `${site.url}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/referanslar/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
