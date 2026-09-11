"use client";
// use client: o autoplay mudo só é confiável setando muted na
// propriedade do elemento (o React não garante o atributo no HTML) e
// pedindo play() depois de montar.

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { cx } from "@/lib/utils";

type HeroLoopProps = {
  src: string;
  poster: string;
  /** Descrição do que o vídeo mostra, para leitor de tela. */
  rotulo: string;
};

/**
 * Vídeo da dobra em loop mudo. O pôster aparece primeiro e o vídeo
 * cruza por cima em fade quando começa a tocar, então nunca há quadro
 * preto.
 *
 * O loop roda para todos, sem gate de prefers-reduced-motion: foi
 * pedido explícito do cliente nas duas últimas rodadas. O vídeo é mudo
 * e sem corte brusco, que é o que mais incomoda nesses casos.
 */
export function HeroLoop({ src, poster, rotulo }: HeroLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div className="relative size-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- pôster do
          vídeo: precisa do mesmo object-fit e nada de otimização extra */}
      <img
        src={asset(poster)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
      />
      <video
        ref={ref}
        src={asset(src)}
        poster={asset(poster)}
        loop
        muted
        playsInline
        preload="auto"
        aria-label={rotulo}
        onPlaying={() => setTocando(true)}
        className={cx(
          "relative size-full object-cover transition-opacity duration-1000 ease-suave",
          tocando ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
