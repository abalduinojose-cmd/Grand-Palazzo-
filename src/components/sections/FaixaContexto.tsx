import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { home } from "@/content/site";

/**
 * Faixa de contexto: quatro fatos, centrados, sem nada em volta.
 *
 * No formato da referência que o cliente mandou: o dado grande e em
 * NEGRITO, com uma passagem de cor (café -> dourado, ver .dado-degrade
 * no globals.css), a frase curta e miúda embaixo, e só o ar separando
 * uma coluna da outra.
 *
 * O peso 700 aqui é a exceção do site, que é todo de peso leve. Foi
 * pedido, e funciona: quatro dados soltos no meio da página precisam
 * de massa para segurar a seção, e o degradê pede corpo cheio para
 * aparecer (em haste fina a passagem de cor some). Saíram, em rodadas anteriores, o pictograma de
 * traço e depois a numeração e os fios da grade. O que sobrou é o que
 * a seção sempre foi, quatro fatos, e agora nada mais compete com eles.
 *
 * 2x2 no celular e quatro colunas do desktop para cima. Quatro linhas
 * empilhadas de altura igual é o desenho mais genérico que existe em
 * mobile, e ocupava o dobro da rolagem.
 *
 * O topo derrete o fim do vídeo do hero no creme com um gradiente, para
 * a passagem de seção não ser corte seco.
 */
export function FaixaContexto() {
  return (
    <section
      data-theme="claro"
      className="relative bg-(--bg) py-14 text-(--fg) sm:py-20"
    >
      {/* costura com o hero: o creme sobe por cima do vídeo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-20 h-20 bg-gradient-to-t from-creme to-transparent"
      />

      <Container className="relative">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 lg:grid-cols-4">
          {home.faixa.map((item, i) => (
            <div
              key={item.resto}
              style={{ "--reveal-atraso": `${i * 5}%` } as CSSProperties}
              className="reveal text-center"
            >
              <dt className="sr-only">{item.resto}</dt>
              <dd className="dado-degrade font-display text-[clamp(1.625rem,5.4vw,2.625rem)] font-bold leading-[1.05] tracking-[-0.032em]">
                {item.destaque}
              </dd>
              <dd className="mx-auto mt-3 max-w-[22ch] font-sans text-legenda text-(--fg-suave)">
                {item.resto}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
