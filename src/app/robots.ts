import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/* Arquivo fixo: sem isso o export estático (prévia do Pages) recusa a rota. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
