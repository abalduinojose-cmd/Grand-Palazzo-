import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { home } from "@/content/site";
import { cx } from "@/lib/utils";

/**
 * Faixa de contexto: quatro fatos numa grade de fios, sem caixa.
 *
 * Os pictogramas de traço saíram. Eram a única coisa ilustrada da
 * página e puxavam a seção para o registro de "lista de vantagens com
 * iconzinho", que é o mais batido que existe. No lugar entrou o próprio
 * número, grande e em bege, no canto de cada célula: ele ancora o olho
 * do mesmo jeito que o ícone ancorava, e é tipografia, que é a
 * linguagem do resto do site.
 *
 * 2x2 no celular e quatro colunas no desktop. Quatro linhas empilhadas
 * de altura igual é o desenho mais genérico que existe em mobile, e
 * ocupava o dobro da rolagem.
 *
 * O topo derrete o fim do vídeo do hero no creme com um gradiente, para
 * a passagem de seção não ser corte seco.
 */

/* Fios da grade. Na borda direita de cada linha não entra fio vertical,
   e a linha muda entre celular (2 colunas) e desktop (4). */
const FIO_DIREITA = ["border-r", "lg:border-r", "border-r", ""] as const;
/* Respiro interno: só quem não encosta na borda esquerda da linha. */
const RECUO_ESQUERDA = ["", "pl-5", "lg:pl-5", "pl-5"] as const;

export function FaixaContexto() {
  return (
    <section
      data-theme="claro"
      className="relative bg-(--bg) py-12 text-(--fg) sm:py-16"
    >
      {/* costura com o hero: o creme sobe por cima do vídeo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-20 h-20 bg-gradient-to-t from-creme to-transparent"
      />

      <Container className="relative">
        <dl className="grid grid-cols-2 border-t border-(--fio) lg:grid-cols-4">
          {home.faixa.map((item, i) => (
            <div
              key={item.resto}
              style={{ "--reveal-atraso": `${i * 5}%` } as CSSProperties}
              className={cx(
                "reveal border-b border-(--fio) py-7 pr-5 sm:py-9",
                FIO_DIREITA[i],
                RECUO_ESQUERDA[i],
              )}
            >
              {/* O número no lugar do ícone: mesma âncora, sem desenho.
                  Fica no fluxo, e não posicionado por cima: em célula
                  estreita de celular o valor quebra em duas linhas e
                  passava por baixo dele. */}
              <p
                aria-hidden="true"
                className="text-right font-display text-[2.5rem] font-light leading-[0.8] tracking-[-0.04em] text-bege/40 tabular-nums sm:text-[3.25rem]"
              >
                {String(i + 1).padStart(2, "0")}
              </p>

              <dt className="sr-only">{item.resto}</dt>
              <dd className="mt-7 font-display text-[clamp(1.5rem,5.2vw,2.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-cafe sm:mt-9">
                {item.destaque}
              </dd>
              <dd className="mt-3 max-w-[22ch] font-sans text-legenda text-(--fg-suave)">
                {item.resto}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
