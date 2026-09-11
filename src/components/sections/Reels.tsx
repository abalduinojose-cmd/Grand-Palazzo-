import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { IconeMarca } from "@/components/ui/IconeMarca";
import { Section } from "@/components/ui/Section";
import { home, site } from "@/content/site";
import { cx } from "@/lib/utils";
import { VideoReel } from "./interactive/VideoReel";

/* Deslocamento vertical dos cartões: a coluna do meio sobe, as das
   pontas descem, então a fileira tem respiro em vez de bloco maciço. */
const DESLOCAMENTO = ["lg:translate-y-6", "lg:-translate-y-4", "lg:translate-y-10"];

/**
 * O perfil do cliente dentro do site: fundo marrom com a textura de
 * colunata, o arroba tratado como peça tipográfica e os três reels em
 * cartões 9:16 escalonados. No celular vira trilho com snap.
 */
export function Reels() {
  const copy = home.reels;

  return (
    <Section theme="marrom" id="reels" className="colunata py-20 sm:py-28">
      <div className="luz-alta absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <header className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div className="max-w-xl">
            <p className="font-sans text-[0.6875rem] font-extrabold uppercase tracking-[0.28em] text-creme">
              {copy.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-balance text-[clamp(2rem,4.8vw,3.8rem)] leading-[1.05] text-creme">
              {copy.titulo.antes} {copy.titulo.enfase}
              {copy.titulo.depois}
            </h2>
            <p className="mt-5 max-w-md font-sans text-corpo font-light text-creme/70">
              {copy.texto}
            </p>
          </div>

          {/* o arroba como assinatura, não como link perdido no meio do texto */}
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-3 rounded-full border border-creme/25 px-5 py-3 transition-colors duration-300 ease-suave hover:border-bege"
          >
            <IconeMarca
              marca="instagram"
              className="size-5 text-creme transition-colors duration-300 ease-suave group-hover:text-bege"
            />
            <span className="font-display text-entre text-creme">
              {site.instagram.handle}
            </span>
          </a>
        </header>
      </Container>

      <div className="relative mt-12 flex snap-x snap-proximity gap-4 overflow-x-auto px-5 pb-4 sm:mt-16 sm:px-8 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-10 lg:pb-0">
        {copy.videos.map((video, i) => (
          <figure
            key={video.src}
            style={{ "--reveal-atraso": `${i * 5}%` } as CSSProperties}
            className={cx(
              "reveal w-[74vw] flex-none snap-start sm:w-[46vw] lg:w-auto",
              DESLOCAMENTO[i],
            )}
          >
            <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-creme/15">
              <VideoReel
                src={video.src}
                poster={video.poster}
                rotulo={video.rotulo}
                reproduzir={copy.reproduzir}
                pausar={copy.pausar}
                somAtivar={copy.somAtivar}
                somDesativar={copy.somDesativar}
              />
            </div>
          </figure>
        ))}
      </div>
    </Section>
  );
}
