import { JsonLd } from "@/components/JsonLd";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { FaixaContexto } from "@/components/sections/FaixaContexto";
import { Faq } from "@/components/sections/Faq";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Localizacao } from "@/components/sections/Localizacao";
import { Manifesto } from "@/components/sections/Manifesto";
import { Momentos } from "@/components/sections/Momentos";
import { OBangalo } from "@/components/sections/OBangalo";
import { PorDentro } from "@/components/sections/PorDentro";
import { Reels } from "@/components/sections/Reels";
import { Rodape } from "@/components/sections/Rodape";
import { WhatsAppFlutuante } from "@/components/sections/interactive/WhatsAppFlutuante";
import { home, site } from "@/content/site";
import { faqPageJsonLd, lodgingBusinessJsonLd } from "@/lib/schema";

/*
  O scroll conta o dia no bangalô: chega de manhã pela fachada, entra
  nos ambientes, passa pelos vídeos e termina de noite, no deck aceso,
  onde fica o CTA. Seção de avaliações não existe porque ainda não há
  fonte real (ver CONTEUDO-PENDENTE.md).
*/
export default function Home() {
  return (
    <>
      <JsonLd data={lodgingBusinessJsonLd()} />
      <JsonLd data={faqPageJsonLd()} />
      <Header />
      <main className="flex-1">
        <Hero />
        <FaixaContexto />
        <Manifesto />
        <OBangalo />
        <PorDentro />
        <Momentos />
        <Reels />
        <Localizacao />
        <Faq />
        <CtaFinal />
      </main>
      <Rodape />
      <WhatsAppFlutuante
        numero={site.whatsapp}
        mensagem={home.whatsapp.mensagem}
        ariaLabel={home.whatsapp.ariaLabel}
      />
    </>
  );
}
