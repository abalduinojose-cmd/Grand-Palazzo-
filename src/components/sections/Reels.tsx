import { Container } from "@/components/ui/Container";
import { IconeMarca } from "@/components/ui/IconeMarca";
import { Section } from "@/components/ui/Section";
import { home, site } from "@/content/site";
import { ReelsEmbla } from "./interactive/ReelsEmbla";

/**
 * O perfil do cliente dentro do site: os três reels lado a lado num
 * trilho que se arrasta, com marcadores embaixo no lugar da barra de
 * rolagem nativa (o porquê está no ReelsEmbla).
 *
 * Cada cartão leva número e legenda curta embaixo, o que dá leitura de
 * índice de conteúdo, não de grade de imagens.
 */
export function Reels() {
  const copy = home.reels;

  return (
    <Section theme="marrom" id="reels" className="colunata py-20 sm:py-28">
      <div className="luz-alta absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <header className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="max-w-xl">
            <p className="font-sans text-[0.6875rem] font-extrabold uppercase tracking-[0.28em] text-creme">
              {copy.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-balance text-[clamp(2rem,4.8vw,3.4rem)] font-light leading-[1.06] tracking-[-0.028em] text-creme">
              {copy.titulo.antes}{" "}
              <em className="italic text-bege">{copy.titulo.enfase}</em>
              {copy.titulo.depois}
            </h2>
            <p className="mt-5 font-sans text-corpo font-light text-creme/70">
              {copy.texto}
            </p>
          </div>

          {/* o arroba como assinatura, não como link no meio do texto */}
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-3 justify-self-start self-start rounded-full border border-creme/25 px-5 py-3 transition-colors duration-300 ease-suave hover:border-bege lg:self-auto"
          >
            <IconeMarca
              marca="instagram"
              className="size-5 text-creme transition-colors duration-300 ease-suave group-hover:text-bege"
            />
            <span className="font-sans text-[0.9375rem] font-medium tracking-[-0.01em] text-creme">
              {site.instagram.handle}
            </span>
          </a>
        </header>

        <div className="mt-12 sm:mt-16">
          <ReelsEmbla
            videos={copy.videos}
            reproduzir={copy.reproduzir}
            pausar={copy.pausar}
            somAtivar={copy.somAtivar}
            somDesativar={copy.somDesativar}
            irPara={copy.irPara}
          />
        </div>
      </Container>
    </Section>
  );
}
