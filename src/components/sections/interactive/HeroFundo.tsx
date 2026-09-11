"use client";
// use client: o arquivo certo depende da largura da tela, o autoplay
// mudo só é confiável setando muted na propriedade (o React não garante
// o atributo no HTML do servidor) e o fade precisa saber quando tocou.

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { cx } from "@/lib/utils";

type HeroFundoProps = {
  /** Faixa horizontal, para telas largas. */
  src: string;
  /** Vertical no tamanho nativo, para telas em pé. */
  srcMobile: string;
  /** Descrição do que o vídeo mostra, para leitor de tela. */
  rotulo: string;
  className?: string;
};

/** Acima disso a tela é mais larga que alta e pede a faixa horizontal. */
const TELA_LARGA = "(min-width: 768px)";

/**
 * Vídeo de fundo da dobra, mudo e em loop.
 *
 * O src só é definido depois de montar: assim a primeira pintura é o
 * pôster (que é o LCP) e o vídeo não disputa banda com ele. Quando o
 * navegador avisa que dá para tocar, o vídeo aparece por cima num fade
 * longo. Se o autoplay for bloqueado, o pôster continua lá e a dobra
 * não perde nada.
 *
 * Dois arquivos porque um só não serve: o material do cliente é reel
 * vertical de 720px, e esticar isso numa tela de 1920 fica mole. A
 * escolha acontece depois da montagem, então o HTML do servidor é
 * sempre o mesmo e a hidratação não quebra.
 *
 * O loop roda para todos, sem porteira de prefers-reduced-motion: foi
 * pedido explícito do cliente nas últimas rodadas. É mudo, sem corte
 * (o arquivo é espelhado) e a câmera é uma órbita lenta, que é o
 * oposto do movimento que incomoda.
 */
export function HeroFundo({ src, srcMobile, rotulo, className }: HeroFundoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const consulta = window.matchMedia(TELA_LARGA);
    video.muted = true;

    const tocar = () => {
      void video.play().catch(() => {
        /* autoplay bloqueado: fica o pôster, que já está pintado */
      });
    };

    const aplicar = () => {
      const escolhido = asset(consulta.matches ? src : srcMobile);
      // Só recarrega quando a largura muda o arquivo de verdade.
      if (!video.currentSrc.endsWith(escolhido)) {
        video.src = escolhido;
        video.load();
      }
      /* O pedido de tocar fica fora do if de propósito: em
         desenvolvimento o React monta, desmonta e remonta o efeito, e
         se a segunda passada saísse cedo por já ter o arquivo certo
         ninguém mandaria tocar. */
      if (video.readyState >= 3) tocar();
      else video.addEventListener("canplay", tocar, { once: true });
    };

    aplicar();
    consulta.addEventListener("change", aplicar);
    return () => {
      consulta.removeEventListener("change", aplicar);
      video.removeEventListener("canplay", tocar);
    };
  }, [src, srcMobile]);

  return (
    <video
      ref={ref}
      loop
      muted
      playsInline
      preload="none"
      aria-label={rotulo}
      onPlaying={() => setTocando(true)}
      className={cx(
        "size-full object-cover transition-opacity duration-1000 ease-suave",
        tocando ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
