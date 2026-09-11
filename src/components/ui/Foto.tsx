import Image from "next/image";
import type { Foto as FotoTipo } from "@/assets/fotos";
import { cx } from "@/lib/utils";

const PROPORCOES = {
  "4/5": "4 / 5",
  "3/2": "3 / 2",
  "16/9": "16 / 9",
  "1/1": "1 / 1",
  "21/9": "21 / 9",
} as const;

type FotoProps = {
  foto: FotoTipo;
  /** Obrigatório: o navegador escolhe o arquivo certo por este hint. */
  sizes: string;
  /** Só na foto LCP da página. */
  priority?: boolean;
  /** Recorte editorial; sem ela vale a proporção real do arquivo (CLS zero). */
  proporcao?: keyof typeof PROPORCOES;
  /** Fundo de cartão: cobre o pai posicionado, sem reservar proporção. */
  preencher?: boolean;
  /** Qualidade do otimizador (padrão 75); heros de dobra usam 60. */
  qualidade?: number;
  /** Zoom sutil quando o ancestral .group recebe hover (só transform). */
  zoom?: boolean;
  className?: string;
};

/**
 * Foto do catálogo em next/image: import estático dá width/height e blur
 * automáticos. O recorte é sempre por object-cover dentro da proporção.
 */
export function Foto({
  foto,
  sizes,
  priority,
  proporcao,
  preencher,
  qualidade,
  zoom,
  className,
}: FotoProps) {
  return (
    <div
      style={
        preencher
          ? undefined
          : {
              aspectRatio: proporcao
                ? PROPORCOES[proporcao]
                : `${foto.src.width} / ${foto.src.height}`,
            }
      }
      className={cx(
        preencher ? "absolute inset-0" : "relative overflow-hidden",
        className,
      )}
    >
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        sizes={sizes}
        quality={qualidade}
        priority={priority}
        placeholder="blur"
        className={cx(
          "object-cover",
          zoom &&
            "transition-transform duration-700 ease-suave group-hover:scale-[1.04]",
        )}
      />
    </div>
  );
}
