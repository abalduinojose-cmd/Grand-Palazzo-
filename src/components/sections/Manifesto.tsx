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
/**
 * Primeira pausa escura: o manifesto do cliente como peça editorial.
 *
 * A foto era um par de cartões girados um sobre o outro, que é um
 * desenho de álbum de recorte e envelheceu. Virou uma coluna inteira
 * colada na borda direita da tela, sem giro e sem canto arredondado
 * flutuando: quem dissolve a emenda é o gradiente do marrom por cima
 * dela, não uma moldura.
 *
 * E no celular a seção deixou de ser só texto. Antes as duas fotos
 * eram `hidden lg:block`, ou seja, metade da força da seção só existia
 * no desktop; agora entra uma faixa de foto de borda a borda embaixo
 * do texto.
 *
 * A foto é a aérea, escolhida pelo cliente. É a única imagem do
 * acervo que mostra a planta inteira do bangalô numa tomada só, e ela
 * prova literalmente o que o texto ao lado afirma: um terreno que
 * desce até a água, com a piscina de um lado e a escada descendo.
 */
export function Manifesto() {
  return (
    <Section theme="marrom" className="pt-24 sm:pt-32 lg:pb-32">
      <Frontao className="pointer-events-none absolute -right-10 -top-10 w-72 text-bege opacity-[0.07] sm:w-96" />

      {/* coluna de foto colada na borda da tela, só do desktop para cima */}
      <div className="absolute inset-y-0 right-0 hidden w-[38%] max-w-[32rem] lg:block">
        <Foto foto={fotos.aereaDoBangalo} preencher sizes="38vw" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-marrom via-marrom/45 to-marrom/5"
        />
      </div>

      <Container className="relative">
        <div className="lg:max-w-[58%]">
          <Eyebrow>{home.manifesto.eyebrow}</Eyebrow>
          <p className="reveal mt-6 font-display text-[clamp(1.75rem,3.6vw,2.9rem)] font-light leading-[1.2] tracking-[-0.025em]">
            {comEnfase(site.manifesto, home.manifesto.destaques)}
          </p>
          <div className="mt-10 flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-14 bg-bege/70" />
            <Eyebrow className="mt-0">{home.manifesto.assinatura}</Eyebrow>
          </div>
        </div>
      </Container>

      {/* no celular a foto vem de borda a borda, fechando a seção */}
      <div className="reveal relative mt-14 lg:hidden">
        <Foto foto={fotos.aereaDoBangalo} proporcao="16/9" sizes="100vw" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-marrom to-transparent"
        />
      </div>
    </Section>
  );
}
