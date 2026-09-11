"use client";
// use client: Embla precisa de refs e listeners de arraste no navegador.

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cx } from "@/lib/utils";

/* Alturas em rodízio + desnível: o ritmo de filmstrip vem daqui. A
   largura de cada foto sai da proporção real (CLS zero). */
const RITMO = [
  "h-72 sm:h-[26rem]",
  "h-60 self-center sm:h-80",
  "h-64 self-end sm:h-72",
] as const;

const botao =
  "flex size-11 items-center justify-center rounded-full border border-(--fio) text-(--fg) transition-colors duration-300 ease-suave hover:border-(--acento) hover:text-(--acento) disabled:pointer-events-none disabled:opacity-30";

type FotoTrilho = { src: StaticImageData; alt: string };

type GaleriaEmblaProps = {
  anterior: string;
  proxima: string;
  fotos: FotoTrilho[];
};

/** Trilho arrastável de fotos reais, sem autoplay, com prev/next
 *  acessíveis e fade na borda direita. Recebe tudo por props para não
 *  puxar content/ (e zod) ao client. */
export function GaleriaEmbla({ anterior, proxima, fotos }: GaleriaEmblaProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(true);

  const atualizar = useCallback(() => {
    if (!emblaApi) return;
    setPodeVoltar(emblaApi.canScrollPrev());
    setPodeAvancar(emblaApi.canScrollNext());
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
      <div ref={emblaRef} className="trilho-fade overflow-hidden">
        <div className="flex items-start gap-4 px-5 sm:px-8 lg:px-10">
          {fotos.map((foto, i) => (
            <div
              key={foto.alt}
              style={{ aspectRatio: `${foto.src.width} / ${foto.src.height}` }}
              className={cx(
                "group relative min-w-0 flex-none overflow-hidden rounded-xl",
                RITMO[i % 3],
              )}
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(min-width: 640px) 40rem, 95vw"
                placeholder="blur"
                className="object-cover transition-transform duration-700 ease-suave group-hover:scale-[1.04]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-6xl justify-end gap-3 px-5 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!podeVoltar}
          aria-label={anterior}
          className={botao}
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!podeAvancar}
          aria-label={proxima}
          className={botao}
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
