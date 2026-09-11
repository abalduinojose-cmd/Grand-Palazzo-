import { galeria } from "@/assets/fotos";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { home } from "@/content/site";
import { GaleriaEmbla } from "./interactive/GaleriaEmbla";

/** Trilho arrastavel com a galeria do bangalo, em ordem de narrativa:
 *  chegar, entrar, ficar (a sequencia mora em assets/fotos). */
export function Momentos() {
  const { eyebrow, titulo, texto, anterior, proxima } = home.momentos;
  return (
    <Section theme="claro" id="momentos" className="py-20 sm:py-24">
      <Container>
        <header className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <div className="max-w-xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-balance text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.08]">
              {titulo.antes} <em className="not-italic text-cafe">{titulo.enfase}</em>
              {titulo.depois}
            </h2>
          </div>
          <p className="max-w-sm pb-1.5 font-sans text-corpo text-(--fg-suave) lg:text-right">
            {texto}
          </p>
        </header>
      </Container>
      <div className="mt-10">
        <GaleriaEmbla anterior={anterior} proxima={proxima} fotos={galeria} />
      </div>
    </Section>
  );
}
