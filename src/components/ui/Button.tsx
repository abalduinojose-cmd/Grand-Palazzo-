import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/utils";

type Variante = "primaria" | "secundaria" | "sobre-marrom" | "creme" | "vidro";

const estilos: Record<Variante, string> = {
  /* hover ESCURECE (nunca clareia): marrom da casa vai ao noite */
  primaria: "bg-marrom text-creme hover:bg-noite",
  secundaria:
    "border border-(--fio) text-(--fg) hover:border-(--acento) hover:text-(--acento)",
  /* sobre fundo escuro o botão é claro: bege de fundo daria 3,8:1 com
     texto marrom e dourado só 2,1:1, então quem entra é o creme */
  "sobre-marrom": "bg-creme text-marrom hover:bg-offwhite",
  /* par do hero sobre vídeo: sólido claro + fantasma de vidro */
  creme: "bg-creme text-marrom hover:bg-offwhite",
  vidro:
    "border border-creme/30 bg-creme/10 text-creme backdrop-blur-sm hover:bg-creme/20",
};

/* Lift de 1px no hover: só transform, volta ao chão no clique. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-corpo font-medium leading-none transition-[background-color,border-color,color,transform] duration-300 ease-suave motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0";

type PropsComuns = { variante?: Variante };
type PropsLink = PropsComuns &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type PropsBotao = PropsComuns &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export type ButtonProps = PropsLink | PropsBotao;

/** Renderiza <a> quando recebe href; <button> caso contrário. */
export function Button(props: ButtonProps) {
  const { variante = "primaria", className, ...resto } = props;
  const classes = cx(base, estilos[variante], className);

  if (typeof resto.href === "string") {
    const linkProps = resto as AnchorHTMLAttributes<HTMLAnchorElement>;
    return <a {...linkProps} className={classes} />;
  }

  const { type = "button", ...botaoProps } =
    resto as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type={type} {...botaoProps} className={classes} />;
}
