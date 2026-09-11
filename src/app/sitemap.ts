import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/* Arquivo fixo: sem isso o export estático (prévia do Pages) recusa a rota. */
export const dynamic = "force-static";

/** Site de uma página só: a home é a única rota indexável. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
