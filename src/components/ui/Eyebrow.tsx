import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

type EyebrowProps = {
  className?: string;
  children: ReactNode;
};

/** Rótulo de seção: micro, caixa alta e peso extremo (800) contra o
 *  display em regular. O contraste de peso é o que dá o ar
 *  contemporâneo.
 *
 *  A cor é --acento-texto, não --acento: em 11px o mínimo é 4,5:1, e o
 *  bege (o acento de grafismo dos temas escuros) entrega 3,8:1 sobre
 *  marrom. O porquê está no cabeçalho do globals.css. */
export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <p
      className={cx(
        "font-sans text-[0.6875rem] font-extrabold uppercase tracking-[0.28em] text-(--acento-texto)",
        className,
      )}
    >
      {children}
    </p>
  );
}
