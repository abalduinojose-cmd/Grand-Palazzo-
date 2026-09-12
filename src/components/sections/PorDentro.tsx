import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Foto } from "@/components/ui/Foto";
import { Section } from "@/components/ui/Section";
import { ambientes } from "@/content/ambientes";
import { home } from "@/content/site";
import { cx } from "@/lib/utils";

/* Bento assimétrico nas duas pontas.
   No desktop os dois argumentos mais fortes (piscina e hidro) abrem em
   uma linha alta e os quatro cantos vêm embaixo.
   No CELULAR a grade é 2 colunas, e não uma pilha: seis cartões
   iguais, um embaixo do outro, é o desenho mais genérico de mobile que
   existe, e ainda dobra a rolagem. Aqui a piscina e a suíte ocupam a
   largura toda e os outros quatro vêm aos pares, então o ritmo quebra. */
const CELULAS = [
  "col-span-2 h-[22rem] sm:h-[28rem] lg:col-span-7 lg:h-[32rem]",
  "h-[15rem] sm:h-[22rem] lg:col-span-5 lg:h-[32rem]",
  "h-[15rem] sm:h-[22rem] lg:col-span-4 lg:h-[20rem]",
  "col-span-2 h-[18rem] sm:h-[24rem] lg:col-span-4 lg:h-[20rem]",
  "h-[15rem] sm:h-[22rem] lg:col-span-4 lg:h-[20rem]",
  "h-[15rem] sm:h-[22rem] lg:col-span-12 lg:h-[26rem]",
] as const;

/* Nas células estreitas do celular só cabe o nome. A frase volta a
   partir do sm, onde a célula tem largura para duas linhas. */
const FRASE_SO_DEPOIS_DO_SM = [false, true, true, false, true, true] as const;

/**
 * Os cantos da casa em bento fotográfico: cada ambiente com a foto
 * real que o prova e o texto sobre véu na base.
 */
export function PorDentro() {
  const { eyebrow, titulo } = home.porDentro;

  return (
    <Section theme="offwhite" id="por-dentro" className="py-16 sm:py-28">
      <Container>
        <header className="max-w-xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-titulo text-balance">
            {titulo.antes} <em className="italic text-cafe">{titulo.enfase}</em>
            {titulo.depois}
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-12">
          {ambientes.map((ambiente, i) => (
            <figure
              key={ambiente.slug}
              style={{ "--reveal-atraso": `${i * 5}%` } as CSSProperties}
              className={cx(
                "group reveal relative overflow-hidden rounded-3xl",
                CELULAS[i],
              )}
            >
              <Foto
                foto={ambiente.foto}
                preencher
                zoom
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 50vw"
              />
              <div className="veu-cartao absolute inset-0" aria-hidden="true" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-7">
                <h3 className="font-display text-entre text-creme [text-shadow:0_1px_16px_rgb(0_0_0/0.55)]">
                  {ambiente.nome}
                </h3>
                <p
                  className={cx(
                    "mt-1.5 max-w-md font-sans text-corpo text-creme/85 [text-shadow:0_1px_12px_rgb(0_0_0/0.55)]",
                    FRASE_SO_DEPOIS_DO_SM[i] && "hidden sm:block",
                  )}
                >
                  {ambiente.essencia}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
