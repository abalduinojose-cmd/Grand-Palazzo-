import type { NextConfig } from "next";

/* PAGES=1 gera a prévia estática do GitHub Pages, que serve o site numa
   subpasta e não tem servidor para otimizar imagem. O basePath é o nome
   do repositório, hífen final incluído. */
const pages = process.env.PAGES === "1";
const basePath = pages ? "/Grand-Palazzo-" : "";
const previa = `https://abalduinojose-cmd.github.io${basePath}`;

const nextConfig: NextConfig = {
  /* O botão "N" flutuante é só a devtools do Next em modo dev; fora. */
  devIndicators: false,
  ...(pages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
        // distDir próprio: o build da prévia não atropela o .next local
        distDir: ".next-pages",
        /* A prévia precisa da própria URL: sem isso o canonical, o
           sitemap e a imagem de compartilhamento apontam para o domínio
           definitivo, que ainda não existe, e o cartão do WhatsApp sai
           sem imagem quando o cliente manda o link para alguém. */
        env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: previa },
      }
    : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    // Qualidades usadas pelo site (60 nos heros de dobra, 75 no resto).
    qualities: [60, 75],
    // Sem servidor não há otimização sob demanda: as fotos vão inteiras.
    unoptimized: pages,
  },
};

export default nextConfig;
