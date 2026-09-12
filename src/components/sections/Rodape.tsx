import { Container } from "@/components/ui/Container";
import { IconeMarca } from "@/components/ui/IconeMarca";
import { LogoMascara } from "@/components/ui/Logo";
import { home, site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";

const iconeSocial =
  "flex size-12 items-center justify-center rounded-full border border-creme/25 text-creme transition-colors duration-300 ease-suave hover:border-bege hover:text-bege";

/**
 * Rodapé em faixas separadas por fio, no lugar da coluna centralizada
 * de antes, que empilhava tudo na mesma medida.
 *
 * Faixa 1: a marca de um lado, os dois canais reais do outro.
 * Faixa 2: o menu de um lado, onde fica do outro.
 * Faixa 3: só o crédito, miúdo.
 */
export function Rodape() {
  const copy = home.rodape;
  const ano = new Date().getFullYear();

  return (
    <footer data-theme="noite" className="relative bg-(--bg) text-(--fg)">
      <Container className="relative pt-20 sm:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <LogoMascara className="h-20 text-creme sm:h-24" />
            <p className="mt-6 max-w-sm font-sans text-corpo text-(--fg-suave)">
              {site.tagline}
            </p>
          </div>

          <div className="flex gap-3 lg:justify-end">
            <a
              href={whatsappUrl(site.whatsapp, home.whatsapp.mensagem)}
              target="_blank"
              rel="noopener"
              aria-label={copy.redesAria.whatsapp}
              className={iconeSocial}
            >
              <IconeMarca marca="whatsapp" className="size-5" />
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener"
              aria-label={copy.redesAria.instagram}
              className={iconeSocial}
            >
              <IconeMarca marca="instagram" className="size-5" />
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-creme/15 pt-10 sm:grid-cols-[1fr_auto] sm:gap-12">
          <nav
            aria-label={home.nav.ariaLabel}
            className="flex flex-wrap gap-x-7 gap-y-3"
          >
            {home.nav.ancoras.map((ancora) => (
              <a
                key={ancora.href}
                href={ancora.href}
                className="font-sans text-corpo text-creme/85 transition-colors duration-300 ease-suave hover:text-creme"
              >
                {ancora.rotulo}
              </a>
            ))}
          </nav>

          <p className="font-sans text-legenda text-(--fg-suave) sm:text-right">
            {site.localizacao}
            <span className="mx-1.5" aria-hidden="true">
              ·
            </span>
            {site.distancias.doCentroDeAreal}
          </p>
        </div>
      </Container>

      <Container className="relative mt-14 border-t border-creme/15 py-8">
        <p className="text-center font-sans text-legenda text-(--fg-suave)">
          © {ano} {site.nome}
        </p>
      </Container>
    </footer>
  );
}
