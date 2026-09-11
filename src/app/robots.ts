import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/* Arquivo fixo: sem isso o export estático (prévia do Pages) recusa a rota. */
export const dynamic = "force-static";

/* A prévia do cliente não deve ser indexada: se entrar no Google, passa
   a competir com o domínio definitivo pelo mesmo conteúdo. Fora da
   prévia (domínio real) o site libera tudo. */
const ehPrevia = Boolean(process.env.NEXT_PUBLIC_BASE_PATH);

export default function robots(): MetadataRoute.Robots {
  if (ehPrevia) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
