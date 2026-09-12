import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import { site, SITE_URL } from "@/content/site";
import "./globals.css";

/*
  Uma família só no site inteiro: Host Grotesk, grotesca contemporânea
  com peso variável de 300 a 800 e itálico de verdade.

  Por que trocar de novo, e por que uma só: o cliente pediu fonte
  moderna, e as duas anteriores (Prata e Bodoni Moda) eram serifas
  romanas de alto contraste, ou seja, o registro clássico. Aqui a
  hierarquia deixa de ser "serifa no título, sem serifa no texto" e
  passa a ser peso, tamanho e espacejamento:

    300 + entrelinha curta + tracking negativo  -> título grande
    400                                          -> corpo
    700/800 + tracking 0,28em em caixa alta      -> rótulo de seção
    itálico                                      -> destaque no título

  Peso leve em tamanho grande lê editorial, não tecnológico, que é o
  risco de usar grotesca em hospedagem. E a única serifa que sobra na
  página passa a ser o logotipo, que vira acento em vez de concorrente.

  Zero requisição a fonts.googleapis.com em runtime (next/font self-host).
*/
const host = Host_Grotesk({
  variable: "--font-host",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.nome} · Bangalô com piscina e hidro na represa de Areal`,
    template: `%s · ${site.nome}`,
  },
  description: site.descricaoCurta,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.nome,
    locale: "pt_BR",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${host.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
