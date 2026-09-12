import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { home, site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";

/**
 * O fim do scroll é a noite: o creme desce em gradiente até o marrom
 * escuro e a decisão acontece sem concorrência.
 *
 * Saíram a foto ao lado e o frontão da transição: no fecho a página já
 * mostrou tudo que tinha para mostrar, e mais uma imagem só divide a
 * atenção com o botão. O bloco ficou centrado e curto, que é o formato
 * que uma última chamada pede.
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
        <div className="h-24" />
      </div>

      <Section theme="noite" className="pb-24 sm:pb-28">
        <Container className="pt-16 text-center sm:pt-20">
          <Eyebrow className="[&]:inline-block">{eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-titulo text-balance sm:text-display">
            {titulo.antes} {titulo.enfase}
            {titulo.depois}
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-corpo text-(--fg-suave)">
            {texto}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
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
        </Container>
      </Section>
    </>
  );
}
