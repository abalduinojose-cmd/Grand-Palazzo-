import { fotos } from "@/assets/fotos";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Foto } from "@/components/ui/Foto";
import { Pictograma } from "@/components/ui/Pictograma";
import { Section } from "@/components/ui/Section";
import { home, site } from "@/content/site";

/**
 * Como chegar. Sem mapa de imagem por enquanto: o endereço exato não
 * foi confirmado, e um pino em local aproximado seria pior que nenhum
 * (ver CONTEUDO-PENDENTE.md). No lugar dele, a foto da vista para o
 * vale e o que se sabe de verdade sobre o trajeto.
 */
export function Localizacao() {
  const { eyebrow, titulo, texto, mapaLink, porPerto } = home.localizacao;

  return (
    <Section theme="claro" id="como-chegar" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-balance text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[1.08] tracking-[-0.028em]">
              {titulo.antes}{" "}
              <em className="italic text-cafe">{titulo.enfase}</em>
              {titulo.depois}
            </h2>
            <p className="mt-5 max-w-xl font-sans text-corpo text-(--fg-suave)">
              {texto}
            </p>

            <p className="mt-8 flex items-center gap-3 font-display text-entre">
              <Pictograma nome="estrada" className="size-8 shrink-0 text-dourado" />
              {site.distancias.doCentroDeAreal}
            </p>

            <h3 className="mt-10 font-sans text-legenda font-semibold uppercase tracking-eyebrow text-(--acento)">
              {porPerto.titulo}
            </h3>
            <ul className="mt-4">
              {porPerto.itens.map((item) => (
                <li
                  key={item}
                  className="border-b border-(--fio) py-3 font-sans text-corpo text-(--fg-suave)"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                variante="secundaria"
                href={site.googleMapsUrl}
                target="_blank"
                rel="noopener"
              >
                {mapaLink}
              </Button>
            </div>
          </div>

          <Foto
            foto={fotos.daybedJardim}
            proporcao="4/5"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="reveal rounded-3xl"
          />
        </div>
      </Container>
    </Section>
  );
}
