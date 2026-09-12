import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Pictograma } from "@/components/ui/Pictograma";
import { home } from "@/content/site";
import { cx } from "@/lib/utils";

/**
 * Faixa de contexto: quatro fatos numa grade de fios, sem caixa.
 *
 * No celular é 2x2, não lista empilhada: quatro linhas de altura igual
 * uma embaixo da outra é o desenho mais genérico que existe em mobile,
 * e ocupava o dobro da rolagem. Do desktop para cima abre em quatro
 * colunas na mesma grade.
 *
 * Cada célula é índice + pictograma na linha de cima, o fato em corpo
 * grande e a frase curta embaixo. O número dá leitura de ficha técnica,
 * que é o registro certo para dado objetivo.
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
                "reveal border-b border-(--fio) py-6 pr-5 sm:py-8",
                FIO_DIREITA[i],
                RECUO_ESQUERDA[i],
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-sans text-[0.625rem] font-extrabold tracking-[0.24em] text-bege tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Pictograma
                  nome={item.pictograma}
                  className="traco-anima size-6 shrink-0 text-dourado sm:size-7"
                />
              </div>

              <dt className="sr-only">{item.resto}</dt>
              <dd className="mt-6 font-display text-[clamp(1.5rem,5.2vw,2.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-cafe">
                {item.destaque}
              </dd>
              <dd className="mt-2.5 font-sans text-legenda text-(--fg-suave)">
                {item.resto}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
