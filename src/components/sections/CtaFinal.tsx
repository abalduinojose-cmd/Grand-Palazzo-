import { fotos } from "@/assets/fotos";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Foto } from "@/components/ui/Foto";
import { Frontao } from "@/components/ui/Frontao";
import { Section } from "@/components/ui/Section";
import { home, site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";

/**
 * O fim do scroll é a noite: o creme desce em gradiente até o marrom
 * escuro, o frontão da marca fecha a transição e a decisão acontece
 * diante da foto do deck aceso. As luzes aqui são reais, da própria
 * foto, em vez de simuladas.
 */
export function CtaFinal() {
  const { eyebrow, titulo, texto, linhaNoite, whatsappRotulo, instagramRotulo } =
    home.ctaFinal;

  return (
    <>
      <div className="grad-anoitecer textura-ruido">
        <p className="relative z-[2] mx-auto max-w-2xl px-5 pt-28 text-center font-display text-entre text-creme [text-shadow:0_1px_16px_rgb(0_0_0/0.45)] sm:pt-36">
          {linhaNoite}
        </p>
        <Frontao className="relative z-[2] mx-auto mt-10 w-24 text-creme/80 sm:w-32" />
        <div className="h-16" />
      </div>

      <Section theme="noite" className="pb-24 sm:pb-28">
        <Container className="pt-16 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-titulo text-balance sm:text-display">
                {titulo.antes} {titulo.enfase}
                {titulo.depois}
              </h2>
              <p className="mt-5 max-w-xl font-sans text-corpo text-(--fg-suave)">
                {texto}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  href={whatsappUrl(site.whatsapp, home.whatsapp.mensagem)}
                  target="_blank"
                  rel="noopener"
                  variante="sobre-marrom"
                  className="px-7 py-3.5"
                >
                  {whatsappRotulo}
                </Button>
                <Button
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener"
                  variante="vidro"
                  className="px-7 py-3.5"
                >
                  {instagramRotulo}
                </Button>
              </div>
            </div>

            <Foto
              foto={fotos.deckANoite}
              proporcao="3/2"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="reveal rounded-3xl"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
