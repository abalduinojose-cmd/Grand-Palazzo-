import { fotos } from "@/assets/fotos";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Foto } from "@/components/ui/Foto";
import { Section } from "@/components/ui/Section";
import { ambientes } from "@/content/ambientes";
import { home, site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";

/**
 * O coração da conversão. Como aqui existe uma única unidade, em vez de
 * um grid de cartas repetidas a seção é uma carta imersiva só, grande,
 * com a lista dos ambientes ao lado servindo de índice do que vem nas
 * seções seguintes.
 */
export function OBangalo() {
  const copy = home.bangalo;

  return (
    <Section theme="claro" id="bangalo" className="py-20 sm:py-28">
      <Container>
        <header className="max-w-2xl">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-balance text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.1]">
            {copy.titulo.antes} <em className="not-italic text-cafe">{copy.titulo.enfase}</em>
            {copy.titulo.depois}
          </h2>
          <p className="mt-5 font-sans text-corpo text-(--fg-suave)">
            {copy.texto}
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-stretch lg:gap-12">
          <figure className="group reveal relative min-h-[60svh] overflow-hidden rounded-3xl lg:min-h-[70svh]">
            <Foto
              foto={fotos.fachadaFrontal}
              preencher
              zoom
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
            <div className="veu-cartao absolute inset-0" aria-hidden="true" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="font-display text-entre text-creme [text-shadow:0_1px_16px_rgb(0_0_0/0.55)]">
                {site.tagline}
              </p>
            </figcaption>
          </figure>

          <div className="flex flex-col justify-between gap-8">
            <ul className="divide-y divide-(--fio)">
              {ambientes.map((ambiente, i) => (
                <li
                  key={ambiente.slug}
                  style={{ "--reveal-atraso": `${i * 4}%` } as React.CSSProperties}
                  className="reveal py-4 first:pt-0"
                >
                  <h3 className="font-display text-entre">{ambiente.nome}</h3>
                  <p className="mt-1 font-sans text-legenda text-(--fg-suave)">
                    {ambiente.essencia}
                  </p>
                </li>
              ))}
            </ul>

            <Button
              href={whatsappUrl(site.whatsapp, home.whatsapp.mensagem)}
              target="_blank"
              rel="noopener"
              className="self-start"
            >
              {copy.reservar}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
