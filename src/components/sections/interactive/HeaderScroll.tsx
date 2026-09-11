"use client";
// use client: observa o scroll para solidificar o cabeçalho fixo.

import { useEffect } from "react";

/** Marca data-solido="sim" no elemento alvo depois de 32px de scroll;
 *  o CSS (variantes data-*) faz toda a transição. Zero re-render. */
export function HeaderScroll({ alvo }: { alvo: string }) {
  useEffect(() => {
    const elemento = document.getElementById(alvo);
    if (!elemento) return;
    const aoRolar = () => {
      elemento.dataset.solido = window.scrollY > 32 ? "sim" : "nao";
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [alvo]);
  return null;
}
