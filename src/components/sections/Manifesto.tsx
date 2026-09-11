import type { ReactNode } from "react";
import { fotos } from "@/assets/fotos";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Foto } from "@/components/ui/Foto";
import { Frontao } from "@/components/ui/Frontao";
import { Section } from "@/components/ui/Section";
import { home, site } from "@/content/site";

function escapar(trecho: string): string {
  return trecho.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Envolve os trechos de destaque com o marca-texto em bege, que é
 *  grafismo e não tinta de texto (bege não tem contraste para ler). */
function comEnfase(texto: string, destaques: string[]): ReactNode[] {
  const padrao = new RegExp(`(${destaques.map(escapar).join("|")})`, "g");
  return texto
    .split(padrao)
    .map((parte, i) =>
      destaques.includes(parte) ? (
        <em key={i} className="marca-texto not-italic">
          {parte}
        </em>
      ) : (
        parte
      ),
    );
}

/**
 * Primeira pausa escura: o manifesto do cliente tratado como peça
 * editorial, com duas fotos que o texto cita empilhadas à direita no
 * desktop. O frontão da marca fecha a assinatura.
 */
export function Manifesto() {
  return (
    <Section theme="marrom" className="py-24 sm:py-32">
      <Frontao
        className="pointer-events-none absolute -right-10 -top-10 w-72 text-bege opacity-[0.07] sm:w-96"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[7fr_4fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow>{home.manifesto.eyebrow}</Eyebrow>
            <p className="reveal mt-6 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] leading-[1.25]">
              {comEnfase(site.manifesto, home.manifesto.destaques)}
            </p>
            <div className="mt-10 flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-14 bg-bege/70" />
              <Eyebrow className="mt-0">{home.manifesto.assinatura}</Eyebrow>
            </div>
          </div>

          <div className="reveal relative hidden justify-self-end pb-12 pr-10 lg:block">
            <Foto
              foto={fotos.hidroComFrios}
              proporcao="4/5"
              sizes="288px"
              className="w-72 rotate-2 rounded-3xl"
            />
            <Foto
              foto={fotos.piscinaBambuzal}
              proporcao="1/1"
              sizes="192px"
              className="absolute -left-16 bottom-0 w-48 -rotate-3 rounded-2xl border-4 border-marrom"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
