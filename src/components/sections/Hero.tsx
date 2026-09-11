import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { heroFoto } from "@/assets/fotos";
import { home, site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";
import { HeroFundo } from "./interactive/HeroFundo";

/**
 * Dobra em vídeo de tela cheia.
 *
 * A ordem das camadas, de baixo para cima: pôster, vídeo, véu de
 * legibilidade, colunata, luz alta, abertura e por fim o texto. O
 * pôster é o LCP e já vem no HTML; o vídeo entra depois, por cima.
 *
 * O texto mora na base à esquerda, e o véu é diagonal no desktop: a
 * leitura fica sobre a parte escura e a represa continua aparecendo do
 * outro lado. No celular o véu é vertical, porque o texto ocupa a
 * largura toda.
 *
 * Movimento: uma orquestração só na chegada (.entrada nos filhos,
 * .dobra-assenta na mídia, .dobra-clarear na cortina) e a deriva lenta
 * enquanto a dobra sai de cena. Nada de microanimação espalhada.
 */
export function Hero() {
  const { titulo, microlinha, cta, ctaSecundario } = home.hero;

  return (
    <Section
      theme="noite"
      id="topo"
      className="isolate flex min-h-[100svh] flex-col justify-end"
    >
      <div aria-hidden className="dobra-deriva absolute inset-0 -z-20">
        <div className="dobra-assenta absolute inset-0">
          <Image
            src={heroFoto.src}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            placeholder="blur"
            quality={60}
            className="object-cover object-[50%_38%] md:object-center"
          />
          <HeroFundo
            src="/videos/hero-desktop.mp4"
            srcMobile="/videos/hero-mobile.mp4"
            rotulo={heroFoto.alt}
            className="absolute inset-0"
          />
        </div>
      </div>

      {/* véu: vertical no celular, diagonal no desktop */}
      <div aria-hidden className="veu-hero-mobile absolute inset-0 -z-10 md:hidden" />
      <div
        aria-hidden
        className="veu-hero-desktop absolute inset-0 -z-10 hidden md:block"
      />
      {/* a assinatura da casa por cima da cena, quase invisível */}
      <div aria-hidden className="colunata absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden className="luz-alta absolute inset-x-0 top-0 -z-10 h-1/3" />
      {/* cortina de abertura: escurece e sai */}
      <div aria-hidden className="dobra-clarear absolute inset-0 -z-10 bg-noite" />

      <Container className="entrada relative pb-20 pt-40 sm:pb-24">
        {/* o texto vai de creme (medido: bege sobre esta cena dá 2,5:1);
            o bege fica no fio, que é grafismo e não precisa ser lido */}
        <p className="flex items-center gap-3 font-sans text-[0.6875rem] font-extrabold uppercase tracking-[0.28em] text-creme">
          <span aria-hidden className="h-px w-8 bg-bege" />
          {site.localizacao}
        </p>

        {/* A dobra cheia dá mais largura que a versão em duas colunas,
            então o título sobe de escala. O balance distribui as linhas
            e evita a última palavra sozinha.

            O opsz travado em 34 é de propósito: por padrão ele segue o
            tamanho da letra, e em 80px a Bodoni entrega o fio mais fino
            que tem. Isso é bonito sobre papel creme e frágil sobre
            folhagem em movimento. Fixando o corte de texto, a letra
            continua com 80px mas com haste de 34, que aguenta o fundo.
            O tamanho grande já dá a elegância; o fio não precisa. */}
        <h1 className="mt-6 max-w-[46rem] font-display text-[clamp(2.75rem,6.2vw,5rem)] leading-[1.03] tracking-[-0.01em] text-balance text-creme [font-optical-sizing:none] [font-variation-settings:'opsz'_34]">
          {titulo.antes} {titulo.enfase}
          {titulo.depois}
        </h1>

        <p className="mt-6 max-w-md font-sans text-[1.0625rem] font-light leading-relaxed text-creme/80">
          {microlinha}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
      </Container>
    </Section>
  );
}
