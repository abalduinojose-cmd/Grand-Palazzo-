import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

type EyebrowProps = {
  className?: string;
  children: ReactNode;
};

/** Rótulo de seção: micro, caixa alta e peso extremo (800) contra o
 *  display em regular. O contraste de peso é o que dá o ar
 *  contemporâneo; a cor vem do acento do tema local. */
export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <p
      className={cx(
        "font-sans text-[0.6875rem] font-extrabold uppercase tracking-[0.28em] text-(--acento)",
        className,
      )}
    >
      {children}
    </p>
  );
}
