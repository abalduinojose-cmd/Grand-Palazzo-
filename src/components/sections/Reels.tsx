import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { home, site } from "@/content/site";
import { VideoReel } from "./interactive/VideoReel";

/**
 * Reels do Instagram em cartões 9:16: no mobile viram trilho com snap,
 * no desktop três colunas. Créditos de autor quando o reel não é da
 * casa; o convite aponta para o perfil oficial.
 */
export function Reels() {
  const copy = home.reels;
  return (
    <Section theme="offwhite" id="reels" className="py-20 sm:py-24">
      <Container>
        <header className="max-w-3xl">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-titulo text-balance">
            {copy.titulo.antes} <em className="not-italic text-cafe">{copy.titulo.enfase}</em>
            {copy.titulo.depois}
          </h2>
          <p className="mt-4 max-w-xl font-sans text-corpo text-(--fg-suave)">
            {copy.texto.split(site.instagram.handle)[0]}
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener"
              className="font-medium text-(--acento) underline decoration-(--fio) underline-offset-4 transition-colors duration-300 ease-suave hover:decoration-current"
            >
              {site.instagram.handle}
            </a>
            {copy.texto.split(site.instagram.handle)[1]}
          </p>
        </header>
      </Container>

      <div className="mt-10 flex snap-x snap-proximity gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:mx-auto lg:max-w-6xl lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-10">
        {copy.videos.map((video) => (
          <figure
            key={video.src}
            className="reveal w-[72vw] flex-none snap-start sm:w-[44vw] lg:w-auto"
          >
            <VideoReel
              src={video.src}
              poster={video.poster}
              rotulo={video.rotulo}
              reproduzir={copy.reproduzir}
              pausar={copy.pausar}
              somAtivar={copy.somAtivar}
              somDesativar={copy.somDesativar}
            />

          </figure>
        ))}
      </div>
    </Section>
  );
}
