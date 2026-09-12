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
 * legibilidade, luz alta, abertura e por fim o texto. O pôster é o LCP
 * e já vem no HTML; o vídeo entra depois, por cima.
 *
 * A colunata (as pilastras de 1px) NÃO entra aqui: sobre imagem em
 * movimento ela vira sujeira, não textura. Ela segue nas seções de
 * fundo chapado, que é onde tem o que fazer.
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
  const { titulo, argumentos, cta, ctaSecundario } = home.hero;

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

      {/* sombra curta, só onde o texto mora (ver .veu-dobra) */}
      <div aria-hidden className="veu-dobra absolute inset-0 -z-10" />
      {/* cortina de abertura: escurece e sai */}
      <div aria-hidden className="dobra-clarear absolute inset-0 -z-10 bg-noite" />

      <Container className="entrada relative pb-20 pt-40 sm:pb-24">
        {/* Pastilha de vidro em vez de texto solto sobre a cena.
            Resolve duas coisas de uma vez: dá ao rótulo o registro de
            etiqueta, que é o que se usa hoje, e carrega o próprio
            fundo, então ele não depende do véu para ser lido (o véu
            agora é curto e nem chega aqui em cima).

            85% de opacidade, e não os 35% de uma pastilha de vidro
            comum: medido, sobre céu claro os 35% davam 1,7:1. Com a
            borda e o desfoque ela continua lendo como vidro, e a área
            é pequena, então não esconde a cena. */}
        <p className="inline-flex items-center gap-2.5 rounded-full border border-creme/25 bg-noite/35 py-2 pl-3.5 pr-4 backdrop-blur-md">
          <span aria-hidden className="size-1.5 rounded-full bg-bege" />
          <span className="font-sans text-[0.6875rem] font-extrabold uppercase tracking-[0.28em] text-creme">
            {site.localizacao}
          </span>
        </p>

        {/* O título subiu de escala e a segunda metade vai em itálico,
            que é o mesmo destaque usado nos títulos de seção: amarra a
            dobra ao resto do site e dá dois registros numa frase só.

            O destaque NÃO é por cor de acento: bege sobre esta cena foi
            medido em 1,0:1, ou seja, some. Fica o itálico, e as duas
            metades vão em creme cheio, com uma sombra larga e suave
            atrás. A sombra é o que dá o destaque pedido: ela separa a
            letra da folhagem sem colocar caixa nenhuma por cima da
            cena, que é o que o cliente não quer mais ver.

            Peso 400, e não o 300 das seções claras: sobre folhagem em
            movimento a haste fina se desfaz, e isso a medição de
            contraste não pega, porque ela mede cor e não espessura. */}
        <h1 className="mt-7 max-w-[19ch] font-display text-[clamp(3rem,6.8vw,5.5rem)] font-normal leading-[0.98] tracking-[-0.04em] text-balance text-creme [text-shadow:0_2px_28px_rgb(23_18_11/0.55)]">
          {titulo.antes}{" "}
          <em className="italic">{titulo.enfase}</em>
          {titulo.depois}
        </h1>

        {/* Era uma frase corrida que ainda repetia "na represa de
            Areal", coisa que a etiqueta logo acima já diz. Virou os
            três argumentos em itens curtos, separados por ponto: lê-se
            de relance, que é o que uma dobra pede. */}
        <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-sans text-[1.0625rem] text-creme [text-shadow:0_1px_18px_rgb(23_18_11/0.6)] sm:text-[1.125rem]">
          {argumentos.map((argumento, i) => (
            <li key={argumento} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="size-1 rounded-full bg-bege" />
              )}
              {argumento}
            </li>
          ))}
        </ul>

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
