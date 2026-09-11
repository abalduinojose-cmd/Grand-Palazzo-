"use client";
// use client: escolhe o corte do vídeo (retrato/paisagem) e o revela
// com crossfade quando os primeiros frames estão prontos.

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import { cx } from "@/lib/utils";

type HeroVideoProps = {
  poster: { src: StaticImageData; alt: string };
  /** Arquivos em public/videos, cortes 16:9 e 9:16 do mesmo passeio. */
  desktopSrc: string;
  mobileSrc: string;
};

/**
 * Fundo do hero: a foto real é o LCP (priority) e segura a dobra; o
 * vídeo entra por cima num fade de 1s quando começa a tocar, sempre em
 * loop automático (pedido do cliente). Sem JS, a foto fica.
 */
export function HeroVideo({ poster, desktopSrc, mobileSrc }: HeroVideoProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    const retrato = window.matchMedia("(max-width: 767px)").matches;
    // Callback assíncrono: evita render em cascata e deixa o LCP passar.
    const id = window.setTimeout(
      () => setSrc(asset(retrato ? mobileSrc : desktopSrc)),
      0,
    );
    return () => window.clearTimeout(id);
  }, [desktopSrc, mobileSrc]);

  return (
    <div className="absolute inset-0 isolate">
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        sizes="100vw"
        quality={60}
        priority
        fetchPriority="high"
        placeholder="blur"
        className="object-cover"
      />

      {src ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onPlaying={() => setTocando(true)}
          className={cx(
            "absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-suave",
            tocando ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}

      {/* Véus de legibilidade: vertical no mobile, diagonal no desktop. */}
      <div className="veu-hero-mobile absolute inset-0 md:hidden" aria-hidden="true" />
      <div className="veu-hero-desktop absolute inset-0 hidden md:block" aria-hidden="true" />
    </div>
  );
}
