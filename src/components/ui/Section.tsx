import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

export type SectionTheme = "claro" | "offwhite" | "marrom" | "noite";

type SectionProps = {
  theme?: SectionTheme;
  /** id para âncoras de navegação. */
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Seção temática: declara data-theme e pinta com as vars --bg/--fg
 * definidas no globals.css. Os filhos herdam --acento, --fio, --fg-suave.
 */
export function Section({ theme = "claro", id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      data-theme={theme}
      className={cx("relative overflow-hidden bg-(--bg) text-(--fg)", className)}
    >
      {children}
    </section>
  );
}
