import Image from "next/image";
import logoPalazzo from "@/assets/logo/palazzo.png";
import logoSimbolo from "@/assets/logo/palazzo-simbolo.png";
import { asset } from "@/lib/asset";
import { cx } from "@/lib/utils";

const NOME = "Grand Palazzo";

type LogoProps = { className?: string };

/**
 * Logo oficial do cliente: frontão sobre o wordmark em serifa romana,
 * marrom com filete dourado. O fundo branco do arquivo original foi
 * removido por scripts/logo.mjs, que também limpa o lixo de cor dos
 * pixels invisíveis (sem isso o resize cria franja amarela na borda).
 */
export function Logo({ className }: LogoProps) {
  return (
    <Image src={logoPalazzo} alt={NOME} className={cx("h-16 w-auto", className)} />
  );
}

/** Só o frontão, para espaços apertados e para o ícone da aba. */
export function LogoSimbolo({ className }: LogoProps) {
  return (
    <Image
      src={logoSimbolo}
      alt={NOME}
      className={cx("h-10 w-auto", className)}
    />
  );
}

/**
 * A mesma arte em uma cor só, via máscara: pinta com currentColor.
 * Para o cabeçalho sobre foto e para o rodapé escuro, onde o marrom do
 * original desapareceria.
 */
export function LogoMascara({ className }: LogoProps) {
  return (
    <span
      role="img"
      aria-label={NOME}
      style={{ maskImage: `url(${asset("/logo/palazzo-mask.png")})` }}
      className={cx(
        "block aspect-[900/477] bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]",
        className,
      )}
    />
  );
}
