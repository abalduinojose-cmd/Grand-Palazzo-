import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

type EyebrowProps = {
  className?: string;
  children: ReactNode;
};

/** Rótulo de seção: caixa alta, tracking largo, cor de acento do tema local. */
export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <p
      className={cx(
        "font-sans text-legenda font-semibold uppercase tracking-eyebrow text-(--acento)",
        className,
      )}
    >
      {children}
    </p>
  );
}
