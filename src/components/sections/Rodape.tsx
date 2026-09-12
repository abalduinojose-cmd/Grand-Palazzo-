import { Container } from "@/components/ui/Container";
import { IconeMarca } from "@/components/ui/IconeMarca";
import { LogoMascara } from "@/components/ui/Logo";
import { home, site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";

const iconeSocial =
  "flex size-12 items-center justify-center rounded-full border border-creme/25 text-creme transition-colors duration-300 ease-suave hover:border-bege hover:text-bege";

/**
 * Rodapé centralizado: marca, frase, os dois canais reais, o menu e
 * onde fica, tudo no eixo do meio. O fio separa só o crédito.
 */
export function Rodape() {
  const copy = home.rodape;
  const ano = new Date().getFullYear();

  return (
    /* A colunata (as pilastras de 1px da casa) entra aqui: é fundo
       chapado e sem imagem, que é justamente onde ela tem o que fazer.
       Saiu da dobra e da seção do Instagram porque sobre vídeo e sobre
       cartaz colorido ela vira sujeira. */
    <footer data-theme="noite" className="colunata relative bg-(--bg) text-(--fg)">
      <div className="luz-alta absolute inset-x-0 top-0 h-40" aria-hidden="true" />

      <Container className="relative flex flex-col items-center gap-8 pt-20 text-center sm:pt-24">
        <LogoMascara className="h-20 text-creme sm:h-24" />

        <p className="max-w-md font-sans text-corpo text-(--fg-suave)">
          {site.tagline}
        </p>

        <div className="flex gap-3">
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

        <nav
          aria-label={home.nav.ariaLabel}
          className="flex flex-wrap justify-center gap-x-7 gap-y-3"
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

        <p className="font-sans text-legenda text-(--fg-suave)">
          {site.localizacao}
          <span className="mx-1.5" aria-hidden="true">
            ·
          </span>
          {site.distancias.doCentroDeAreal}
        </p>
      </Container>

      <Container className="relative mt-14 border-t border-creme/15 py-8">
        <p className="text-center font-sans text-legenda text-(--fg-suave)">
          © {ano} {site.nome}
          <span className="mx-1.5" aria-hidden="true">
            ·
          </span>
          {copy.direitos}
        </p>
      </Container>
    </footer>
  );
}
