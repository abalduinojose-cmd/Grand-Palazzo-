import { Container } from "@/components/ui/Container";
import { Logo, LogoMascara } from "@/components/ui/Logo";
import { home, site } from "@/content/site";
import { asset } from "@/lib/asset";
import { HeaderScroll } from "./interactive/HeaderScroll";
import { MenuMobile } from "./interactive/MenuMobile";

type HeaderProps = {
  /** Em páginas internas as âncoras apontam para a home ("/#chales"). */
  paginaInterna?: boolean;
};

const linkNav =
  "font-sans text-legenda font-medium text-creme/90 [text-shadow:0_1px_10px_rgb(0_0_0/0.45)] transition-colors duration-300 ease-suave hover:text-creme group-data-[solido=sim]/cabecalho:text-marrom/75 group-data-[solido=sim]/cabecalho:[text-shadow:none] group-data-[solido=sim]/cabecalho:hover:text-cafe";

/**
 * Header fixo que atravessa dois mundos (padrão herdado da Cabana
 * Afrodite): sobre o vídeo do hero é transparente com o logo em creme;
 * depois de 32px de scroll solidifica em creme translúcida e o logo
 * colorido oficial assume. HeaderScroll só alterna data-solido.
 */
export function Header({ paginaInterna = false }: HeaderProps) {
  const ancoras = home.nav.ancoras.map((ancora) => ({
    ...ancora,
    href: paginaInterna ? asset(`/${ancora.href}`) : ancora.href,
  }));
  const logoHref = paginaInterna ? asset("/") : "#topo";

  return (
    <header
      id="cabecalho"
      data-solido="nao"
      className="group/cabecalho fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-marrom/55 to-transparent pb-4 transition-[background-color,box-shadow] duration-500 ease-suave data-[solido=sim]:bg-creme/95 data-[solido=sim]:bg-none data-[solido=sim]:pb-0 data-[solido=sim]:shadow-[0_12px_30px_-24px_rgb(23_23_23/0.45)] data-[solido=sim]:backdrop-blur-md"
    >
      <HeaderScroll alvo="cabecalho" />
      <Container className="flex items-center justify-between py-4 sm:py-5">
        <a href={logoHref} className="relative block shrink-0">
          {/* creme sobre a foto; o colorido cruza quando o fundo solidifica */}
          <LogoMascara className="h-12 text-creme drop-shadow-[0_1px_10px_rgb(0_0_0/0.45)] transition-opacity duration-500 ease-suave group-data-[solido=sim]/cabecalho:opacity-0 sm:h-14" />
          <span className="absolute inset-0 flex items-center opacity-0 transition-opacity duration-500 ease-suave group-data-[solido=sim]/cabecalho:opacity-100">
            <Logo className="h-12 sm:h-14" />
          </span>
        </a>

        <nav
          aria-label={home.nav.ariaLabel}
          className="hidden items-center gap-7 md:flex"
        >
          {ancoras.map((ancora) => (
            <a key={ancora.href} href={ancora.href} className={linkNav}>
              {ancora.rotulo}
            </a>
          ))}
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener"
            className="font-sans text-legenda font-semibold text-creme underline decoration-bege/70 underline-offset-4 [text-shadow:0_1px_10px_rgb(0_0_0/0.45)] transition-colors duration-300 ease-suave hover:decoration-bege group-data-[solido=sim]/cabecalho:text-cafe group-data-[solido=sim]/cabecalho:decoration-cafe/40 group-data-[solido=sim]/cabecalho:[text-shadow:none] group-data-[solido=sim]/cabecalho:hover:decoration-cafe"
          >
            {site.instagram.handle}
          </a>
        </nav>

        <MenuMobile
          ariaLabel={home.nav.ariaLabel}
          ancoras={ancoras}
          menu={home.nav.menu}
          instagram={{
            url: site.instagram.url,
            handle: site.instagram.handle,
          }}
        />
      </Container>
    </header>
  );
}
