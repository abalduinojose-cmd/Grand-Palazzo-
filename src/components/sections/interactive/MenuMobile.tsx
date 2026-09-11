"use client";
// use client: estado de abrir/fechar do painel de navegação no toque.

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import type { Home } from "@/content/site";

type MenuMobileProps = {
  ariaLabel: string;
  ancoras: Home["nav"]["ancoras"];
  menu: Home["nav"]["menu"];
  instagram: { url: string; handle: string };
};

/** Botão + painel de navegação do mobile; some a partir de md.
 *  Recebe a copy por props para não puxar content/ (e zod) ao client. */
export function MenuMobile({
  ariaLabel,
  ancoras,
  menu,
  instagram,
}: MenuMobileProps) {
  const [aberto, setAberto] = useState(false);

  // Esc fecha o painel, como um diálogo de navegação se comporta no teclado.
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAberto(false);
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setAberto(true)}
        aria-expanded={aberto}
        // aria-controls só com o painel montado; id fantasma reprova no axe.
        {...(aberto ? { "aria-controls": "menu-mobile" } : {})}
        aria-label={menu.abrir}
        className="flex size-11 items-center justify-center text-creme drop-shadow-[0_1px_8px_rgb(0_0_0/0.5)] group-data-[solido=sim]/cabecalho:text-marrom group-data-[solido=sim]/cabecalho:drop-shadow-none"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      {aberto ? (
        <div
          id="menu-mobile"
          data-theme="claro"
          className="fixed inset-0 z-50 flex flex-col bg-creme text-marrom"
        >
          <div className="flex items-center justify-between px-5 py-5">
            <Logo className="text-[1.05rem]" />
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label={menu.fechar}
              className="flex size-11 items-center justify-center text-marrom"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label={ariaLabel}
            className="flex flex-1 flex-col justify-center gap-2 px-5"
          >
            {ancoras.map((ancora) => (
              <a
                key={ancora.href}
                href={ancora.href}
                onClick={() => setAberto(false)}
                className="border-b border-(--fio) py-4 font-display text-titulo transition-colors duration-300 ease-suave hover:text-cafe"
              >
                {ancora.rotulo}
              </a>
            ))}
          </nav>

          <div className="px-5 pb-10 pt-6">
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener"
              className="font-sans text-corpo font-medium text-cafe"
            >
              {instagram.handle}
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
