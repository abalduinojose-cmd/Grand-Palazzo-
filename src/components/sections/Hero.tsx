import { heroFoto } from "@/assets/fotos";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Foto } from "@/components/ui/Foto";
import { Frontao } from "@/components/ui/Frontao";
import { Section } from "@/components/ui/Section";
import { home, site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";

/**
 * Hero fotográfico: a foto da fachada preenche a dobra e é o LCP da
 * página (priority). Sem vídeo de fundo, porque os três reels do
 * cliente têm legenda do Instagram queimada na imagem e o texto
 * colidiria com o H1 (ver CONTEUDO-PENDENTE.md).
 *
 * Seção inteira em Server Component: nada aqui precisa de JavaScript.
 */
export function Hero() {
  const { titulo, microlinha, cta, ctaSecundario } = home.hero;

  return (
    <Section theme="marrom" id="topo">
      <div className="relative flex min-h-[94svh] flex-col justify-end">
        <Foto foto={heroFoto} preencher priority qualidade={60} sizes="100vw" />
        <div className="veu-hero-mobile absolute inset-0 md:hidden" aria-hidden="true" />
        <div
          className="veu-hero-desktop absolute inset-0 hidden md:block"
          aria-hidden="true"
        />

        <Container className="relative z-10 pb-24 pt-40 sm:pb-28">
          <Frontao className="w-16 text-creme/85 sm:w-20" />
          <h1 className="mt-6 max-w-3xl font-display text-display text-balance text-creme [text-shadow:0_2px_30px_rgb(0_0_0/0.5)]">
            {titulo.antes}
            <br className="hidden sm:block" /> {titulo.enfase}
            {titulo.depois}
          </h1>
          <p className="mt-5 max-w-xl font-sans text-corpo text-creme/85 [text-shadow:0_1px_18px_rgb(0_0_0/0.55)]">
            {microlinha}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href={whatsappUrl(site.whatsapp, home.whatsapp.mensagem)}
              target="_blank"
              rel="noopener"
              variante="creme"
              className="px-7 py-3.5"
            >
              {cta}
            </Button>
            <Button href="#bangalo" variante="vidro" className="px-7 py-3.5">
              {ctaSecundario}
            </Button>
          </div>
        </Container>
      </div>
    </Section>
  );
}
