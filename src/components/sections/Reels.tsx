import { Container } from "@/components/ui/Container";
import { IconeMarca } from "@/components/ui/IconeMarca";
import { Section } from "@/components/ui/Section";
import { home, site } from "@/content/site";
import { VideoReel } from "./interactive/VideoReel";

/**
 * O perfil do cliente dentro do site.
 *
 * Layout de duas colunas: à esquerda a coluna editorial, que gruda no
 * scroll enquanto os vídeos passam; à direita um trilho horizontal.
 *
 * A largura dos cartões é fixa em rem de propósito, e soma mais que a
 * coluna que os abriga: o terceiro sempre fica cortado na borda, e é
 * esse corte (mais a máscara que dissolve o fim do trilho) que avisa
 * que dá para arrastar. Fica melhor do que seta ou texto "arraste",
 * porque não precisa ser lido.
 *
 * Cada cartão leva número e legenda curta embaixo, no lugar de flutuar
 * solto: dá a leitura de índice de conteúdo, não de grade de imagens.
 */
export function Reels() {
  const copy = home.reels;

  return (
    <Section theme="marrom" id="reels" className="colunata py-20 sm:py-28">
      <div className="luz-alta absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-14">
          <header className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-sans text-[0.6875rem] font-extrabold uppercase tracking-[0.28em] text-creme">
              {copy.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-balance text-[clamp(2rem,4.8vw,3.4rem)] font-light leading-[1.06] tracking-[-0.028em] text-creme">
              {copy.titulo.antes} <em className="italic text-bege">{copy.titulo.enfase}</em>
              {copy.titulo.depois}
            </h2>
            <p className="mt-5 font-sans text-corpo font-light text-creme/70">
              {copy.texto}
            </p>

            {/* o arroba como assinatura, não como link no meio do texto */}
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-creme/25 px-5 py-3 transition-colors duration-300 ease-suave hover:border-bege"
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

          <ul className="trilho-fade -mx-5 flex snap-x snap-proximity gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:gap-5 lg:px-0">
            {copy.videos.map((video, i) => (
              <li
                key={video.src}
                className="w-[72vw] flex-none snap-start sm:w-[44vw] lg:w-[19rem]"
              >
                <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-creme/15">
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
                <p className="mt-4 flex items-baseline gap-3">
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
        </div>
      </Container>
    </Section>
  );
}
