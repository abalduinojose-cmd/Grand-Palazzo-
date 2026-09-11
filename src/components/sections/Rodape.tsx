import { Container } from "@/components/ui/Container";
import { IconeMarca } from "@/components/ui/IconeMarca";
import { LogoMascara } from "@/components/ui/Logo";
import { home, site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";

const iconeSocial =
  "flex size-12 items-center justify-center rounded-full border border-creme/25 text-creme transition-colors duration-300 ease-suave hover:border-bege hover:text-bege";

/**
 * Rodapé centralizado, continuando a noite da seção anterior: a marca
 * em creme, os dois canais reais de contato (Instagram e WhatsApp), a
 * navegação e a localização.
 */
export function Rodape() {
  const copy = home.rodape;
  const ano = new Date().getFullYear();

  return (
    <footer data-theme="noite" className="bg-(--bg) text-(--fg)">
      <Container className="flex flex-col items-center gap-8 pt-16 text-center sm:pt-20">
        <LogoMascara className="h-24 text-creme sm:h-28" />
        <p className="max-w-md font-sans text-corpo text-(--fg-suave)">
          {site.tagline}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener"
            aria-label={copy.redesAria.instagram}
            className={iconeSocial}
          >
            <IconeMarca marca="instagram" className="size-5" />
          </a>
          <a
            href={whatsappUrl(site.whatsapp, home.whatsapp.mensagem)}
            target="_blank"
            rel="noopener"
            aria-label={copy.redesAria.whatsapp}
            className={iconeSocial}
          >
            <IconeMarca marca="whatsapp" className="size-5" />
          </a>
        </div>
        <p className="font-sans text-legenda text-(--fg-suave)">
          {site.instagram.handle}
        </p>

        <nav
          aria-label={home.nav.ariaLabel}
          className="flex flex-wrap justify-center gap-x-7 gap-y-2"
        >
          {home.nav.ancoras.map((ancora) => (
            <a
              key={ancora.href}
              href={ancora.href}
              className="font-sans text-corpo text-creme/85 transition-colors duration-300 ease-suave hover:text-bege"
            >
              {ancora.rotulo}
            </a>
          ))}
        </nav>

        <p className="font-sans text-legenda text-(--fg-suave)">
          {site.localizacao} · {site.distancias.doCentroDeAreal} ·{" "}
          <a
            href={site.googleMapsUrl}
            target="_blank"
            rel="noopener"
            className="text-creme underline decoration-bege/60 underline-offset-4 transition-colors duration-300 ease-suave hover:decoration-bege"
          >
            {copy.mapaLink}
          </a>
        </p>
      </Container>

      <Container className="mt-12 flex justify-center border-t border-creme/15 py-6 text-center">
        <p className="font-sans text-legenda text-(--fg-suave)">
          © {ano} {site.nome} · {copy.aviso}
        </p>
      </Container>
    </footer>
  );
}
