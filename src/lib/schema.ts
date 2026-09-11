import { ambientes } from "@/content/ambientes";
import { faq } from "@/content/faq";
import { site, SITE_URL } from "@/content/site";

/*
  Geradores de JSON-LD. Regra anti-dado-inventado: campo sem confirmação
  NUNCA vira propriedade no JSON. Por isso não existem aqui address de
  rua, geo, checkinTime, petsAllowed, priceRange nem aggregateRating: o
  endereço exato, as regras da casa, o preço e as avaliações seguem
  pendentes (ver CONTEUDO-PENDENTE.md). Quando vierem, entram.
*/

/** Endereço público conhecido: cidade e estado, sem rua. */
const ENDERECO = {
  "@type": "PostalAddress",
  addressLocality: "Areal",
  addressRegion: "RJ",
  addressCountry: "BR",
} as const;

/** LodgingBusiness da home: o bangalô e os ambientes que ele oferece. */
export function lodgingBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/#bangalo`,
    name: site.nome,
    description: site.descricaoCurta,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    telephone: site.whatsapp,
    address: ENDERECO,
    sameAs: [site.instagram.url],
    amenityFeature: ambientes.map((ambiente) => ({
      "@type": "LocationFeatureSpecification",
      name: ambiente.nome,
      value: true,
    })),
  };
}

/** FAQPage da home, direto de src/content/faq.ts. */
export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };
}
