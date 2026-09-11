import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Pictograma } from "@/components/ui/Pictograma";
import { home } from "@/content/site";

/**
 * Faixa de contexto: quatro fatos sem caixa, o ar é que separa.
 *
 * No celular vira lista em linhas curtas (pictograma · número · frase)
 * com fio entre elas, que ocupa metade da altura de uma grade 2x2. No
 * desktop abre em quatro colunas.
 *
 * O topo derrete o fim do vídeo do hero no branco com um gradiente de
 * 5rem, então a passagem de seção deixa de ser corte seco. Não há
 * hover: a faixa informa e não é clicável.
 */
export function FaixaContexto() {
  return (
    <section
      data-theme="claro"
      className="relative bg-(--bg) py-10 text-(--fg) sm:py-14"
    >
      {/* costura com o hero: o branco sobe por cima do vídeo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-20 h-20 bg-gradient-to-t from-creme to-transparent"
      />

      <Container className="relative">
        <dl className="divide-y divide-(--fio) lg:grid lg:grid-cols-4 lg:gap-x-12 lg:divide-y-0">
          {home.faixa.map((item, i) => (
            <div
              key={item.resto}
              style={{ "--reveal-atraso": `${i * 5}%` } as CSSProperties}
              className="reveal flex items-center gap-4 py-4 lg:block lg:py-0"
            >
              <Pictograma
                nome={item.pictograma}
                className="traco-anima size-6 shrink-0 text-dourado lg:size-8"
              />
              <dt className="sr-only">{item.resto}</dt>
              {/* 5.75rem é a medida justa do maior número ("15 min" dá
                  87px): as frases nascem na mesma coluna sem vão sobrando */}
              <dd className="min-w-[5.75rem] font-display text-[1.75rem] leading-none text-cafe tabular-nums lg:mt-6 lg:min-w-0 lg:text-[clamp(2rem,3vw,2.75rem)]">
                {item.destaque}
              </dd>
              <span
                aria-hidden="true"
                className="hidden h-px w-8 bg-marrom/25 lg:mt-5 lg:block"
              />
              <dd className="font-sans text-legenda text-(--fg-suave) lg:mt-4">
                {item.resto}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
