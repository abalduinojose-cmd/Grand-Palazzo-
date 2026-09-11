import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.nome} · ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
/* Arte fixa: sem isso o export estático (prévia do Pages) recusa a rota. */
export const dynamic = "force-static";

/* O frontão do logo, desenhado em path para o runtime do next/og (que
   não carrega componente React externo nem imagem local sem fetch). */
const FRONTAO_EMPENA = "M60 2 L118 36 H104 L60 11 L16 36 H2 Z";
const FRONTAO_INTERNO = "M60 16 L96 36 H24 Z";
const FRONTAO_BASE = "M10 40 H110 V46 H10 Z";

/**
 * Cartão de compartilhamento: fundo marrom da marca, o frontão em bege
 * como grafismo e a tagline em creme. Sem nota agregada, porque ainda
 * não existe fonte real de avaliação.
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
          background: "#50452f",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <svg width="132" height="51" viewBox="0 0 120 46" fill="#b5a47e">
          <path d={FRONTAO_EMPENA} />
          <path d={FRONTAO_INTERNO} opacity="0.55" />
          <path d={FRONTAO_BASE} />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1,
              color: "#f6efe3",
              letterSpacing: "-0.02em",
            }}
          >
            {site.nome}
          </div>
          <div style={{ fontSize: 34, color: "#b5a47e", lineHeight: 1.3 }}>
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 24,
            color: "rgba(246,239,227,0.72)",
          }}
        >
          <span>{site.localizacao}</span>
          <span>·</span>
          <span>{site.instagram.handle}</span>
        </div>
      </div>
    ),
    size,
  );
}
