"use client";
// use client: só existe depois que a pessoa rola o hero, então o
// aparecer/esconder precisa de observador no navegador.

import { useEffect, useState } from "react";
import { IconeMarca } from "@/components/ui/IconeMarca";
import { cx, whatsappUrl } from "@/lib/utils";

type WhatsAppFlutuanteProps = {
  numero: string;
  mensagem: string;
  ariaLabel: string;
};

/**
 * Botão flutuante de WhatsApp com a mensagem já preenchida. Entra em
 * cena depois do hero, para não competir com os dois CTAs da dobra.
 */
export function WhatsAppFlutuante({
  numero,
  mensagem,
  ariaLabel,
}: WhatsAppFlutuanteProps) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("topo");
    if (!hero) {
      const id = window.setTimeout(() => setVisivel(true), 0);
      return () => window.clearTimeout(id);
    }
    const observador = new IntersectionObserver(
      ([entrada]) => setVisivel(!entrada.isIntersecting),
      { rootMargin: "-40% 0px 0px 0px" },
    );
    observador.observe(hero);
    return () => observador.disconnect();
  }, []);

  return (
    <a
      href={whatsappUrl(numero, mensagem)}
      target="_blank"
      rel="noopener"
      aria-label={ariaLabel}
      className={cx(
        "fixed bottom-6 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-marrom text-creme shadow-[0_8px_24px_-8px_rgb(23_18_11/0.7)]",
        "transition-[opacity,transform,background-color] duration-500 ease-suave hover:bg-noite",
        visivel
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <IconeMarca marca="whatsapp" className="size-7" />
    </a>
  );
}
