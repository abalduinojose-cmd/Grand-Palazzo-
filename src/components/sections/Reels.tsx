import { Container } from "@/components/ui/Container";
import { IconeMarca } from "@/components/ui/IconeMarca";
import { Section } from "@/components/ui/Section";
import { home, site } from "@/content/site";
import { cx } from "@/lib/utils";
import { VideoReel } from "./interactive/VideoReel";

/**
 * O perfil do cliente dentro do site.
 *
 * Sem trilho e sem arrastar: os três vídeos cabem na tela. O trilho
 * horizontal deixava uma barra de rolagem embaixo dos cartões no
 * desktop e escondia parte do conteúdo atrás de um gesto, o que é
 * cobrar um esforço para ver três vídeos que cabem à vista.
 *
 * No celular a grade é 2x2 com o primeiro em largura cheia: assim o
 * mais forte abre grande e os outros dois entram lado a lado, sem
 * empilhar três vídeos de tela inteira um embaixo do outro. No desktop
 * são três colunas iguais.
 *
 * Cada cartão leva número e legenda curta embaixo, o que dá a leitura
 * de índice de conteúdo, não de grade de imagens.
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
            className="group inline-flex items-center gap-3 self-start rounded-full border border-creme/25 px-5 py-3 transition-colors duration-300 ease-suave hover:border-bege lg:self-auto"
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

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {copy.videos.map((video, i) => (
            <li
              key={video.src}
              className={cx(i === 0 && "col-span-2 lg:col-span-1")}
            >
              <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-creme/15 sm:rounded-[1.75rem]">
                <VideoReelDoTrilho video={video} copy={copy} />
              </div>
              <p className="mt-3 flex items-baseline gap-3 sm:mt-4">
                <span className="font-sans text-[0.625rem] font-extrabold tracking-[0.24em] text-bege tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-legenda text-creme/70">
                  {video.titulo}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* Extraído só para a lista acima não virar um bloco de dez props. */
function VideoReelDoTrilho({
  video,
  copy,
}: {
  video: (typeof home.reels.videos)[number];
  copy: typeof home.reels;
}) {
  return (
    <VideoReel
      src={video.src}
      poster={video.poster}
      rotulo={video.rotulo}
      reproduzir={copy.reproduzir}
      pausar={copy.pausar}
      somAtivar={copy.somAtivar}
      somDesativar={copy.somDesativar}
    />
  );
}

