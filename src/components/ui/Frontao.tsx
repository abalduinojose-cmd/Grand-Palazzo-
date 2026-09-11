import { cx } from "@/lib/utils";

type FrontaoProps = {
  className?: string;
  /** Só o contorno, para usar como ornamento discreto sobre cor. */
  contorno?: boolean;
};

/**
 * O frontão do logo do cliente, redesenhado em vetor para servir de
 * grafismo de assinatura: divisor entre seções, ornamento de cabeçalho
 * e marca d'água. Herda currentColor, então funciona em qualquer tema.
 *
 * As proporções vêm do próprio logo: triângulo raso sobre arquitrave,
 * com a moldura interna acompanhando a inclinação.
 */
export function Frontao({ className, contorno = false }: FrontaoProps) {
  return (
    <svg
      viewBox="0 0 120 46"
      aria-hidden="true"
      className={cx("block h-auto", className)}
      fill={contorno ? "none" : "currentColor"}
      stroke={contorno ? "currentColor" : "none"}
      strokeWidth={contorno ? 2 : 0}
      strokeLinejoin="round"
    >
      {/* empena externa */}
      <path d="M60 2 L118 36 H104 L60 11 L16 36 H2 Z" />
      {/* moldura interna, acompanhando a inclinação */}
      <path d="M60 16 L96 36 H24 Z" opacity={contorno ? 1 : 0.55} />
      {/* arquitrave */}
      <path d="M10 40 H110 V46 H10 Z" />
    </svg>
  );
}
