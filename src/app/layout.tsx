import type { Metadata } from "next";
import { Bodoni_Moda, Instrument_Sans } from "next/font/google";
import { site, SITE_URL } from "@/content/site";
import "./globals.css";

/*
  Bodoni Moda no display. Bodoni era italiano e o nome da casa é
  italiano, mas a escolha não é só simbólica: a Prata que estava aqui
  tem UM peso só e nenhum itálico, então o display não tinha segundo
  registro nenhum. A Bodoni Moda é variável em três eixos e resolve os
  dois problemas de uma vez:

  - `opsz` (6 a 96) é o que mais muda o site. A serifa de alto contraste
    fica com fio finíssimo no título de 80px, que é onde ela é elegante,
    e engrossa sozinha nos 20px do nome de ambiente, que é onde a Prata
    sumia sobre fundo escuro. Uma família cobrindo os dois extremos.
  - itálico de verdade, que virou o destaque dos títulos de seção (antes
    era um <em> com not-italic e troca de cor, um meio-destaque).

  Instrument Sans no corpo: grotesca contemporânea, um tiquinho estreita,
  com itálico e peso variável. Entrou no lugar da Manrope, que é redonda
  e geométrica e brigava com a serifa em vez de contrastar com ela.
  Grotesca + didone é a dupla de revista, que é o registro do site.

  Zero requisição a fonts.googleapis.com em runtime (next/font self-host).
*/
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  style: ["normal", "italic"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
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
      className={`${bodoni.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
