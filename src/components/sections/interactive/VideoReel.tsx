"use client";
// use client: play/pause e volume controlados pelo toque do visitante.

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { cx } from "@/lib/utils";

type VideoReelProps = {
  src: string;
  poster: string;
  rotulo: string;
  reproduzir: string;
  pausar: string;
  somAtivar: string;
  somDesativar: string;
};

/**
 * Reel 9:16 sob demanda: nada roda sozinho. O pôster espera com o play
 * grande no centro; o toque inicia com som, e o volume alterna ali
 * mesmo. Pausar é tocar de novo (os controles voltam no hover/foco).
 */
export function VideoReel({
  src,
  poster,
  rotulo,
  reproduzir,
  pausar,
  somAtivar,
  somDesativar,
}: VideoReelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  const [mudo, setMudo] = useState(false);

  const alternar = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div className="group/reel relative overflow-hidden rounded-3xl bg-noite">
      <video
        ref={videoRef}
        src={asset(src)}
        poster={asset(poster)}
        loop
        playsInline
        preload="none"
        muted={mudo}
        aria-label={rotulo}
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        className="aspect-[9/16] w-full object-cover"
      />

      {/* controles no centro: aparecem parados e no hover/foco; tocando,
          um tap em qualquer ponto pausa (não há hover no celular) */}
      <div
        onClick={alternar}
        className={cx(
          "absolute inset-0 flex cursor-pointer items-center justify-center gap-3 transition-opacity duration-300 ease-suave",
          tocando
            ? "opacity-0 focus-within:opacity-100 group-hover/reel:opacity-100"
            : "bg-noite/30 opacity-100",
        )}
      >
        <button
          type="button"
          onClick={(evento) => {
            evento.stopPropagation();
            alternar();
          }}
          aria-label={tocando ? pausar : reproduzir}
          className="flex size-16 items-center justify-center rounded-full bg-creme/95 text-marrom shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)] transition-transform duration-300 ease-suave hover:scale-105"
        >
          {tocando ? (
            <Pause className="size-7" aria-hidden="true" />
          ) : (
            <Play className="ml-1 size-7" aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          onClick={(evento) => {
            evento.stopPropagation();
            setMudo((m) => !m);
          }}
          aria-label={mudo ? somAtivar : somDesativar}
          className="flex size-11 items-center justify-center rounded-full bg-noite/65 text-creme backdrop-blur-sm transition-colors duration-300 ease-suave hover:bg-noite/90"
        >
          {mudo ? (
            <VolumeX className="size-5" aria-hidden="true" />
          ) : (
            <Volume2 className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
