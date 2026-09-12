"use client";
// use client: Embla precisa de refs e listeners de arraste no navegador.

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { cx } from "@/lib/utils";
import { VideoReel } from "./VideoReel";

type Reel = {
  src: string;
  poster: string;
  titulo: string;
  rotulo: string;
};

type ReelsEmblaProps = {
  videos: Reel[];
  reproduzir: string;
  pausar: string;
  somAtivar: string;
  somDesativar: string;
  /* Prefixo do rótulo do marcador. Vem como TEXTO e não como função:
     Server Component não consegue passar função para Client Component
     (o React não sabe serializar), e o erro só aparece em tempo de
     execução, não na compilação. */
  irPara: string;
};

/**
 * Trilho arrastável dos reels, lado a lado.
 *
 * Embla no lugar de `overflow-x: auto` por um motivo prático: o
 * overflow nativo desenha uma barra de rolagem embaixo dos cartões no
 * desktop, e foi ela que o cliente pediu para tirar. O arraste é o
 * mesmo; quem avisa que há mais conteúdo são os marcadores embaixo.
 *
 * `dragFree` deixa o trilho correr solto em vez de encaixar de cartão
 * em cartão: com larguras diferentes por tela, o encaixe dá solavanco
 * de fim de curso.
 *
 * Recebe tudo por props para não puxar content/ (e o zod junto) para o
 * lado do cliente.
 */
export function ReelsEmbla({
  videos,
  reproduzir,
  pausar,
  somAtivar,
  somDesativar,
  irPara,
}: ReelsEmblaProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });
  const [marcadores, setMarcadores] = useState<number[]>([]);
  const [ativo, setAtivo] = useState(0);

  const atualizar = useCallback(() => {
    if (!emblaApi) return;
    setMarcadores(emblaApi.scrollSnapList().map((_, i) => i));
    setAtivo(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", atualizar).on("reInit", atualizar);
    const quadro = requestAnimationFrame(atualizar);
    return () => {
      cancelAnimationFrame(quadro);
      emblaApi.off("select", atualizar).off("reInit", atualizar);
    };
  }, [emblaApi, atualizar]);

  return (
    <div>
      <div ref={emblaRef} className="overflow-hidden">
        <ul className="flex gap-4 sm:gap-5 lg:gap-6">
          {videos.map((video, i) => (
            <li
              key={video.src}
              className="w-[72vw] flex-none sm:w-[46vw] lg:w-[21rem]"
            >
              <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-creme/15 sm:rounded-[1.75rem]">
                <VideoReel
                  src={video.src}
                  poster={video.poster}
                  rotulo={video.rotulo}
                  reproduzir={reproduzir}
                  pausar={pausar}
                  somAtivar={somAtivar}
                  somDesativar={somDesativar}
                />
              </div>
              <p className="mt-3 flex items-baseline gap-3 sm:mt-4">
                <span className="font-sans text-[0.625rem] font-extrabold tracking-[0.24em] text-bege tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-legenda text-creme/70">
                  {video.titulo}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* marcadores: dizem que há mais e levam até lá, sem barra à vista */}
      {marcadores.length > 1 && (
        <div className="mt-8 flex justify-center gap-2 lg:justify-start">
          {marcadores.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => emblaApi?.scrollTo(m)}
              aria-label={`${irPara} ${m + 1}`}
              aria-current={m === ativo}
              className={cx(
                "h-1 rounded-full transition-all duration-300 ease-suave",
                m === ativo ? "w-8 bg-bege" : "w-4 bg-creme/25 hover:bg-creme/45",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
