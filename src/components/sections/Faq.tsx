import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { faq } from "@/content/faq";
import { home } from "@/content/site";

/** Perguntas frequentes com <details>/<summary> nativos, zero JS. */
export function Faq() {
  const { eyebrow, titulo } = home.faqSecao;
  return (
    <Section theme="claro" id="perguntas" className="py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <header>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-titulo">{titulo}</h2>
        </header>

        <div className="border-t border-(--fio)">
          {faq.map((item) => (
            <details
              key={item.pergunta}
              className="group border-b border-(--fio)"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-entre [&::-webkit-details-marker]:hidden">
                {item.pergunta}
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 text-(--acento) transition-transform duration-300 ease-suave group-open:rotate-180"
                />
              </summary>
              <p className="max-w-2xl pb-6 font-sans text-corpo text-(--fg-suave)">
                {item.resposta}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
