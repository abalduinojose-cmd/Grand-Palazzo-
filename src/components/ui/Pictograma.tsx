import { cx } from "@/lib/utils";

/*
  Pictogramas autorais da faixa de contexto: traço fino, desenhados
  para estes quatro fatos e para mais nada. Ícone de biblioteca aqui
  entregaria o site como template.

  O "bangalo" repete o frontão do logo do cliente, que é o grafismo de
  assinatura da casa (ver Frontao.tsx).
*/

const DESENHOS = {
  /** A estrada que sobe da BR até o portão. */
  estrada: (
    <>
      <path pathLength={1} d="M6 34 C14 26 10 18 18 12 C24 7 30 9 34 5" />
      <circle cx="6" cy="34" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="34" cy="5" r="2.6" />
    </>
  ),
  /** A piscina: borda retangular e a água em movimento. */
  piscina: (
    <>
      <path pathLength={1} d="M6 12 H34 V32 H6 Z" />
      <path pathLength={1} d="M6 20 C11 17 15 23 20 20 C25 17 29 23 34 20" />
      <path pathLength={1} d="M6 27 C11 24 15 30 20 27 C25 24 29 30 34 27" />
    </>
  ),
  /** A hidromassagem: cuba redonda com vapor subindo. */
  hidro: (
    <>
      <path pathLength={1} d="M7 19 H33 V25 C33 30 28 34 20 34 C12 34 7 30 7 25 Z" />
      <path pathLength={1} d="M14 14 C14 10 18 10 18 6" />
      <path pathLength={1} d="M22 14 C22 10 26 10 26 6" />
    </>
  ),
  /** O frontão do bangalô, o mesmo do logo. */
  bangalo: (
    <>
      <path pathLength={1} d="M4 22 L20 8 L36 22" />
      <path pathLength={1} d="M7 26 H33" />
      <path pathLength={1} d="M11 30 V34" />
      <path pathLength={1} d="M20 30 V34" />
      <path pathLength={1} d="M29 30 V34" />
    </>
  ),
} as const;

export type NomePictograma = keyof typeof DESENHOS;

type PictogramaProps = { nome: NomePictograma; className?: string };

export function Pictograma({ nome, className }: PictogramaProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cx("size-10", className)}
    >
      {DESENHOS[nome]}
    </svg>
  );
}
