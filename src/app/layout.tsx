import type { Metadata } from "next";
import { Manrope, Prata } from "next/font/google";
import { site, SITE_URL } from "@/content/site";
import "./globals.css";

/*
  Prata: romana de alto contraste, na mesma família visual das serifas
  lapidares do logo, mas fina o suficiente para não competir com ele.
  Só existe no peso 400, o que aqui é vantagem: título grande em regular
  com contraste alto é mais elegante que um display em bold.
  Manrope: humanista geométrica para o corpo, com latin-ext.
  Zero requisição a fonts.googleapis.com em runtime (next/font self-host).
*/
const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
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
      className={`${prata.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
