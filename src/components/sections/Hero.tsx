import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { home, site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";
import { HeroLoop } from "./interactive/HeroLoop";

/**
 * Dobra editorial: o marrom da marca domina, o vídeo do bangalô roda em
 * loop numa moldura vertical e o texto ocupa a coluna larga.
 *
 * O vídeo é 720x928 (recortado do reel, sem a legenda do Instagram),
 * então entra em moldura em vez de fundo de tela cheia: em 1920px de
 * largura ele seria esticado quase três vezes e ficaria mole. Assim
 * fica nítido, e o LCP passa a ser o título, que é texto.
 *
 * A entrada é uma orquestração só, no carregamento (.entrada), em vez
 * de microanimação espalhada pela seção.
 */
export function Hero() {
  const { titulo, microlinha, cta, ctaSecundario } = home.hero;

  return (
    <Section theme="marrom" id="topo" className="colunata">
      <div className="luz-alta absolute inset-0" aria-hidden="true" />

      <Container className="relative flex min-h-[100svh] flex-col justify-center pb-16 pt-32 sm:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="entrada">
            <p className="font-sans text-[0.6875rem] font-extrabold uppercase tracking-[0.28em] text-bege">
              {site.localizacao}
            </p>

            {/* escala propria da dobra: o token display (96px) quebrava
                em quatro linhas na coluna de 580px e deixava orfa a
                ultima palavra. O balance distribui o resto. */}
            <h1 className="mt-7 font-display text-[clamp(2.75rem,5.2vw,4.5rem)] leading-[1.04] tracking-[-0.015em] text-balance text-creme">
              {titulo.antes} {titulo.enfase}
              {titulo.depois}
            </h1>

            <p className="mt-7 max-w-md font-sans text-[1.0625rem] font-light leading-relaxed text-creme/70">
              {microlinha}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                href={whatsappUrl(site.whatsapp, home.whatsapp.mensagem)}
                target="_blank"
                rel="noopener"
                variante="sobre-marrom"
                className="px-7 py-3.5"
              >
                {cta}
              </Button>
              <Button href="#bangalo" variante="vidro" className="px-7 py-3.5">
                {ctaSecundario}
              </Button>
            </div>
          </div>

          {/* moldura do vídeo: 4:5 no celular, vertical cheio no desktop */}
          <div className="entrada-video relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] ring-1 ring-creme/15 lg:aspect-[720/928]">
            <HeroLoop
              src="/videos/hero-loop.mp4"
              poster="/videos/hero-loop.jpg"
              rotulo="Vista aérea do bangalô, o caminho de entrada, o deck e a hidromassagem"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
