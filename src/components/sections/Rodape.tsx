import { Container } from "@/components/ui/Container";
import { Frontao } from "@/components/ui/Frontao";
import { IconeMarca } from "@/components/ui/IconeMarca";
import { LogoMascara } from "@/components/ui/Logo";
import { home, site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";

/* Canal de contato como pílula COM rótulo, não círculo com ícone solto.
   Ícone sozinho obriga a adivinhar para onde vai; com o arroba e o
   número à vista a pessoa já sabe, e ainda pode copiar. */
const canal =
  "group inline-flex items-center gap-3 rounded-full border border-creme/25 px-5 py-3 transition-colors duration-300 ease-suave hover:border-bege";
const canalIcone =
  "size-5 shrink-0 text-creme transition-colors duration-300 ease-suave group-hover:text-bege";
const canalTexto = "font-sans text-[0.9375rem] font-medium tracking-[-0.01em] text-creme";

/**
 * Rodapé em três faixas separadas por fio, no lugar da coluna
 * centralizada de antes.
 *
 * A coluna centralizada empilhava logo, frase, dois círculos, arroba,
 * menu e endereço um debaixo do outro: sete blocos de leitura na mesma
 * medida, que é o desenho de rodapé mais repetido que existe. Aqui a
 * marca e os canais dividem a primeira faixa, o menu e o endereço
 * dividem a segunda, e o frontão fecha a terceira como assinatura.
 */
export function Rodape() {
  const copy = home.rodape;
  const ano = new Date().getFullYear();

  return (
    <footer data-theme="noite" className="relative bg-(--bg) text-(--fg)">
      <Container className="relative pt-20 sm:pt-24">
        {/* faixa 1: a marca de um lado, os dois canais reais do outro */}
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <LogoMascara className="h-20 text-creme sm:h-24" />
            <p className="mt-6 max-w-sm font-sans text-corpo text-(--fg-suave)">
              {site.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={whatsappUrl(site.whatsapp, home.whatsapp.mensagem)}
              target="_blank"
              rel="noopener"
              aria-label={copy.redesAria.whatsapp}
              className={canal}
            >
              <IconeMarca marca="whatsapp" className={canalIcone} />
              <span className={canalTexto}>{site.whatsapp}</span>
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener"
              aria-label={copy.redesAria.instagram}
              className={canal}
            >
              <IconeMarca marca="instagram" className={canalIcone} />
              <span className={canalTexto}>{site.instagram.handle}</span>
            </a>
          </div>
        </div>

        {/* faixa 2: menu de um lado, onde fica do outro */}
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

          {/* o link do mapa fica em linha própria nas duas larguras: com
              <br> só no sm ele colava no texto no celular */}
          <div className="font-sans text-legenda text-(--fg-suave) sm:text-right">
            <p>
              {site.localizacao}
              <span className="mx-1.5" aria-hidden="true">
                ·
              </span>
              {site.distancias.doCentroDeAreal}
            </p>
            <a
              href={site.googleMapsUrl}
              target="_blank"
              rel="noopener"
              className="mt-1.5 inline-block text-creme underline decoration-bege/60 underline-offset-4 transition-colors duration-300 ease-suave hover:decoration-bege"
            >
              {copy.mapaLink}
            </a>
          </div>
        </div>
      </Container>

      {/* faixa 3: o frontão fecha, o crédito fica miúdo embaixo dele */}
      <Container className="relative mt-16 border-t border-creme/15 pt-10 pb-10">
        <Frontao className="mx-auto w-24 text-bege/45 sm:w-28" />
        <p className="mt-6 text-center font-sans text-legenda text-(--fg-suave)">
          © {ano} {site.nome}
        </p>
      </Container>
    </footer>
  );
}
